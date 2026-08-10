import 'dotenv/config';
import { File as NodeFile } from 'node:buffer';
if (typeof globalThis.File === 'undefined') globalThis.File = NodeFile;
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, mkdtempSync, rmSync, createReadStream } from 'fs';
import { tmpdir } from 'os';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import multer from 'multer';
import { connectDB, User, Code, isConnected } from './models.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });
const upload = multer({ storage: multer.memoryStorage() });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

function setupJava() {
  try {
    const out = execSync('bash /home/ranjith/Downloads/Full_Stack/fix-java.sh', { timeout: 15000 }).toString().trim();
    if (out) process.env.JAVA_HOME = out;
  } catch {}
}
setupJava();

function execCapture(cmd, opts = {}) {
  try {
    const out = execSync(cmd, { ...opts, stdio: 'pipe' });
    return { ok: true, stdout: out.toString().trim(), stderr: '' };
  } catch (e) {
    return { ok: false, stdout: '', stderr: (e.stderr || '').toString() || e.message };
  }
}

const LANG_NAMES = { javascript: 'JavaScript', typescript: 'TypeScript', python: 'Python', cpp: 'C++', java: 'Java' };

app.post('/execute', (req, res) => {
  const { code, language, funcName, testCases } = req.body;
  if (!code || !language || !funcName || !testCases || testCases.length === 0) {
    return res.json({ error: 'Missing required fields' });
  }

  // Filter out empty test cases
  const validTestCases = testCases.filter(tc => tc.input && typeof tc.input === 'object' && Object.keys(tc.input).length > 0);
  if (validTestCases.length === 0) {
    return res.json({ error: 'Test cases are not fully defined for this problem yet' });
  }

  let tmpDir;
  try {
    tmpDir = mkdtempSync(path.join(tmpdir(), 'dsa-exec-'));
    let cleanCode = code;
    if (language === 'cpp') {
      cleanCode = code.replace(/^\s*#include\s+<[^>]+>\s*$/gm, '').trim();
    } else if (language === 'java') {
      cleanCode = code.replace(/^\s*import\s+[^;]+;\s*$/gm, '').trim();
    } else if (language === 'python') {
      cleanCode = code.replace(/^\s*import\s+.+$/gm, '').replace(/^\s*from\s+.+\s+import\s+.+$/gm, '').trim();
    }
    const tcJson = JSON.stringify(validTestCases.map(tc => tc.input));
    let srcPath, cmd, wrapper = '';
    const javaHome = process.env.JAVA_HOME;

    if (language === 'javascript') {
      wrapper = `${cleanCode}\nconst _testCases = ${tcJson};\nconst _results = [];\nfor (const _tc of _testCases) {\n    const _args = Object.values(_tc);\n    const _r = ${funcName}(..._args);\n    _results.push(_r);\n}\nconsole.log(JSON.stringify(_results));`;
      srcPath = path.join(tmpDir, 'script.js');
      writeFileSync(srcPath, wrapper);
      cmd = `node "${srcPath}"`;
    } else if (language === 'typescript') {
      wrapper = `${cleanCode}\nconst _testCases = ${tcJson} as any[];\nconst _results: any[] = [];\nfor (const _tc of _testCases) {\n    const _args = Object.values(_tc);\n    const _r = ${funcName}(..._args);\n    _results.push(_r);\n}\nconsole.log(JSON.stringify(_results));`;
      srcPath = path.join(tmpDir, 'script.ts');
      writeFileSync(srcPath, wrapper);
      cmd = `npx tsx "${srcPath}"`;
    } else if (language === 'python') {
      const tcFile = path.join(tmpDir, 'testcases.json');
      writeFileSync(tcFile, tcJson);
      wrapper = `${cleanCode}\n\nimport json, sys\nwith open('${tcFile}') as f:\n    _test_cases = json.load(f)\n_results = []\nfor _tc in _test_cases:\n    _args = list(_tc.values())\n    _r = ${funcName}(*_args)\n    _results.append(_r)\nprint(json.dumps(_results))`;
      srcPath = path.join(tmpDir, 'script.py');
      writeFileSync(srcPath, wrapper);
      cmd = `python3 "${srcPath}"`;
    } else if (language === 'cpp') {
      const hasClass = cleanCode.includes('class Solution');
      const cb = testCases.map((tc, i) => {
        const entries = Object.entries(tc.input);
        const decls = entries.map(([k, v]) => {
          if (Array.isArray(v) && v.length > 0 && Array.isArray(v[0])) return `vector<vector<int>> ${k}_${i} = {${v.map(a => `{${a.join(',')}}`).join(',')}};`;
          if (Array.isArray(v)) return `vector<int> ${k}_${i} = {${v.join(',')}};`;
          if (typeof v === 'string') return `string ${k}_${i} = "${v.replace(/"/g, '\\"')}";`;
          if (typeof v === 'boolean') return `bool ${k}_${i} = ${v};`;
          return `int ${k}_${i} = ${v};`;
        });
        const refs = entries.map(([k, v]) => {
          return `${k}_${i}`;
        }).join(', ');
        const d = decls.length ? decls.join('\n    ') + '\n    ' : '';
        if (hasClass) {
          return `${d}Solution _sol${i};\n    _out(_sol${i}.${funcName}(${refs}));`;
        }
        return `${d}_out(${funcName}(${refs}));`;
      }).join('\n    ');
      wrapper = `#include <iostream>\n#include <string>\n#include <vector>\n#include <climits>\n#include <algorithm>\n#include <unordered_set>\n#include <unordered_map>\n#include <set>\n#include <map>\n#include <stack>\n#include <queue>\n#include <sstream>\nusing namespace std;\n\nvoid _print(bool v) { cout << (v ? "true" : "false"); }\nvoid _print(int v) { cout << v; }\nvoid _print(long long v) { cout << v; }\nvoid _print(double v) { cout << v; }\nvoid _print(const string& v) { cout << v; }\nvoid _print(const vector<int>& v) { cout << "["; for (int i = 0; i < v.size(); i++) { if (i) cout << ","; cout << v[i]; } cout << "]"; }\nvoid _print(const vector<vector<int>>& v) { cout << "["; for (int i = 0; i < v.size(); i++) { if (i) cout << ","; _print(v[i]); } cout << "]"; }\ntemplate<typename T> void _out(T r) { _print(r); cout << "\\n"; }\n\n${cleanCode}\n\nint main() {\n    ${cb}\n    return 0;\n}`;
      srcPath = path.join(tmpDir, 'script.cpp');
      writeFileSync(srcPath, wrapper);
      const binPath = path.join(tmpDir, 'script');
      const comp = execCapture(`g++ -std=c++17 "${srcPath}" -o "${binPath}"`, { timeout: 15000 });
      if (!comp.ok) {
        return res.json({ error: `C++ compile error:\n${comp.stderr}` });
      }
      cmd = `"${binPath}"`;
    } else if (language === 'java') {
      if (!javaHome) return res.json({ error: 'Java is not available on this server. Please use JavaScript, Python, or C++.' });
      writeFileSync(path.join(tmpDir, 'Solution.java'), 'import java.util.*;\nimport java.util.stream.*;\n\n' + cleanCode);
      const comp1 = execCapture(`"${javaHome}/bin/javac" "${path.join(tmpDir, 'Solution.java')}" -d "${tmpDir}"`, { timeout: 15000 });
      if (!comp1.ok) {
        return res.json({ error: `Java compile error (Solution.java):\n${comp1.stderr}` });
      }
       const calls = validTestCases.map((tc, i) => {
         const vals = Object.values(tc.input).map(v => {
           if (typeof v === 'string') return `"${v}"`;
           if (Array.isArray(v)) return `new int[]{${v.join(',')}}`;
           return String(v);
         }).join(', ');
         return `Object _result${i} = _sol.${funcName}(${vals}); if (_result${i} instanceof int[]) { System.out.println(java.util.Arrays.toString((int[])_result${i})); } else { System.out.println(_result${i}); }`;
       }).join('\n');
      wrapper = `public class Test { public static void main(String[] args) {\n    Solution _sol = new Solution();\n    ${calls}\n} }`;
      writeFileSync(path.join(tmpDir, 'Test.java'), wrapper);
      const comp2 = execCapture(`"${javaHome}/bin/javac" "${path.join(tmpDir, 'Test.java')}" -cp "${tmpDir}" -d "${tmpDir}"`, { timeout: 15000 });
      if (!comp2.ok) {
        return res.json({ error: `Java compile error (Test.java):\n${comp2.stderr}\n\n--- Test.java ---\n${wrapper}` });
      }
      cmd = `"${javaHome}/bin/java" -cp "${tmpDir}" Test`;
    } else {
      return res.json({ error: `Execution for ${LANG_NAMES[language] || language} is not supported` });
    }

    const runTimeout = language === 'typescript' ? 30000 : 5000;
    const run = execCapture(cmd, { timeout: runTimeout, maxBuffer: 1024 * 1024 });
    if (!run.ok) {
      return res.json({ error: `Runtime error (${LANG_NAMES[language] || language}):\n${run.stderr || run.stdout || 'unknown error'}` });
    }

    const raw = run.stdout;
    let parsed;
    if (language === 'cpp' || language === 'java') {
      const lines = raw.split('\n').filter(l => l.length > 0);
      parsed = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed === 'true') return true;
        if (trimmed === 'false') return false;
        if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
        if (/^-?\d+\.\d+$/.test(trimmed)) return Number(trimmed);
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          try { return JSON.parse(trimmed); } catch {}
          try {
            const content = trimmed.slice(1, -1).trim();
            if (!content) return [];
            const items = [];
            let depth = 0, start = 0;
            for (let j = 0; j <= content.length; j++) {
              if (j === content.length || (content[j] === ',' && depth === 0)) {
                const item = content.slice(start, j).trim();
                if (item.startsWith('[')) {
                  try { items.push(JSON.parse(item)); } catch { items.push(item); }
                } else if (/^-?\d+$/.test(item)) {
                  items.push(Number(item));
                } else {
                  items.push(item);
                }
                start = j + 1;
              } else if (content[j] === '[') depth++;
              else if (content[j] === ']') depth--;
            }
            return items;
          } catch { return trimmed; }
        }
        return trimmed;
      });
    } else {
      try { parsed = JSON.parse(raw); } catch { parsed = []; }
    }

    const results = validTestCases.map((tc, i) => ({
      passed: JSON.stringify(parsed[i]) === JSON.stringify(tc.output),
      expected: tc.output,
      actual: parsed[i],
    }));
    return res.json({ results });
  } catch (e) {
    return res.json({ error: `Server error: ${e.message}` });
  } finally {
    if (tmpDir) try { rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
});

app.post('/api/interview/start', (req, res) => {
  const { problemId, problem } = req.body;
  if (!problem) {
    return res.json({ error: 'Problem not provided' });
  }
  
  const systemPrompt = `You are a STRICT technical interviewer for DSA. You MUST follow this exact question flow:

Problem: ${problem.title}
Description: ${problem.description}
Constraints: ${(problem.constraints || []).join(', ')}

MANDATORY QUESTION FLOW (follow this order strictly):
1. First ask: "What approach would you use to solve this? Describe your algorithm step by step."
2. After they describe approach: ask about TIME COMPLEXITY - "What is the time complexity of your approach? Explain why."
3. Then ask about SPACE COMPLEXITY - "What is the space complexity?"
4. Then ask about EDGE CASES - "What edge cases would you consider?"
5. Then ask about OPTIMIZATION - "Can you optimize further? What's a better approach?"
6. Then ask them to WRITE CODE - "Now write the code for your solution."
7. Then ask about TEST CASES - "What test cases would you use to verify this?"

ABSOLUTE RULES:
- ALWAYS ask about time and space complexity at steps 2 and 3. This is MANDATORY.
- NEVER skip complexity questions. NEVER.
- NEVER ask personal questions, "tell me about yourself", hobbies, or anything non-technical.
- NEVER give long explanations - ask SHORT questions only (1-2 sentences max per question).
- If they go off-topic, SCOLD them: "Focus. This is a technical interview." or "I don't have time for nonsense. Answer the question." Then REPEAT the same question.
- If they type gibberish or irrelevant text 2+ times, say: "This interview is over. You're not taking this seriously." and stop asking questions.
- After each answer, give brief feedback (good/partial/wrong) then ask the NEXT question in the flow.
- Maximum 8 rounds total.
- Be professional, direct, and concise.`;

  res.json({ 
    systemPrompt,
    initialMessage: `Let's solve "${problem.title}" together! Walk me through your approach.`
  });
});

app.post('/api/interview/chat', async (req, res) => {
  const { messages } = req.body;
  
  if (!process.env.GROQ_API_KEY) {
    return res.json({ error: 'Groq API key not configured' });
  }
  
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      max_tokens: 400,
      temperature: 0.6,
    });
    
    return res.json({
      reply: response.choices[0].message.content,
      usage: response.usage
    });
  } catch (e) {
    return res.json({ error: `AI Error: ${e.message}` });
  }
});

app.post('/api/interview/score', async (req, res) => {
  const { messages, problem } = req.body;
  if (!process.env.GROQ_API_KEY) {
    return res.json({ error: 'Groq API key not configured' });
  }
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: `You are a DSA interview evaluator. Score the candidate's performance on this problem: ${problem?.title || 'Unknown'}.

Analyze the conversation and give a score out of 10 (not 100).

Rate these areas:
1. Score out of 10
2. Time Complexity Analysis - did they correctly identify it?
3. Space Complexity Analysis - did they correctly identify it?
4. Strengths (1-2 points)
5. Weaknesses (1-2 points)
6. Areas to improve

Be strict but fair. Format:
Score: X/10
Time Complexity: ...
Space Complexity: ...
Strengths: ...
Weaknesses: ...
Improvement: ...` },
        ...messages
      ],
      max_tokens: 300,
      temperature: 0.3,
    });
    return res.json({ score: response.choices[0].message.content });
  } catch (e) {
    return res.json({ error: `Score Error: ${e.message}` });
  }
});

app.post('/api/resume-interview/start', (req, res) => {
  const { resumeText, userName } = req.body;
  if (!resumeText) {
    return res.json({ error: 'Resume text not provided' });
  }

  const fullResume = resumeText.slice(0, 8000);

  const firstName = userName.split(' ')[0];
  const systemPrompt = `You are Surya, a senior technical interviewer at a FAANG company conducting a 15-minute mock interview. The candidate's name is ${firstName}.

CANDIDATE'S FULL RESUME (read every line carefully):
========================================
${fullResume}
========================================

YOUR TASK:
1. READ EVERY LINE of the resume above. Extract ALL skills, technologies, tools, frameworks, projects, certifications, education details, work experience, and achievements.
2. Create a MENTAL MAP of the candidate's profile:
   - What are their CORE TECHNICAL SKILLS?
   - What PROJECTS have they worked on? What was their role?
   - What TECHNOLOGIES/TOOLS do they use?
   - What is their WORK EXPERIENCE?
   - What is their EDUCATION BACKGROUND?
   - Any CERTIFICATIONS or ACHIEVEMENTS?

INTERVIEW RULES:
1. Ask questions ONLY about what is explicitly mentioned in the resume above.
2. Start with a warm greeting using the candidate's FIRST NAME only, mention something specific from their resume, then ask your first question.
3. After each answer the candidate gives:
   a. First evaluate their answer clearly - say if it is CORRECT, PARTIALLY CORRECT, or NEEDS IMPROVEMENT.
   b. Provide BRIEF FEEDBACK (2-3 sentences): what was good, what was wrong, and exactly how to improve.
   c. If their answer is WRONG, give them the correct approach or concept briefly, then ask a follow-up on the same topic.
   d. If their answer is GOOD, acknowledge it and move to a DEEPER question on a different resume aspect.
   e. Then ask a FOLLOW-UP question about a DIFFERENT aspect of their resume.
4. Go DEEP into each topic - ask about implementation details, architecture decisions, challenges faced, metrics achieved.
5. If they mention a technology from their resume, ask how they used it, what problems it solved, what alternatives they considered.
6. Mix question types:
   - Resume-specific: "Tell me about project X", "How did you implement Y in project Z?"
   - Technical deep-dive: "What was the architecture?", "How did you handle scaling?"
   - Behavioral: "What challenges did you face?", "How did you collaborate with your team?"
   - Problem-solving: "If you had to redo this, what would you change?"
7. Keep each response SHORT (2-3 sentences). Ask ONE question at a time.
8. Reference SPECIFIC details from their resume in every question.
9. NEVER ask generic questions not related to their resume.
10. After 8-10 exchanges, provide a detailed summary with score and thank them.
11. ALWAYS refer to yourself as "Surya" when introducing yourself.

IMPORTANT: You MUST extract and use keywords from the resume. If the resume mentions "Python", ask about Python. If it mentions "React", ask about React. If it mentions "AWS", ask about AWS. Match their EXACT technologies.

OFF-TOPIC / IRRELEVANT ANSWERS:
If the candidate types something unrelated to the interview (jokes, random text, "hi", "hello", gibberish, flirting, or anything not answering your question):
1. Be STERN and SCOLD them firmly. Say things like:
   - "This is a serious interview. Please focus."
   - "I don't have time for nonsense. Answer the question."
   - "Are you here to waste my time? Get back to the topic."
   - "That's completely irrelevant. I asked you a specific question."
   - "Stop wasting time. This interview is being evaluated."
2. Then REPEAT the exact same question you asked before.
3. If they continue being off-topic 2 more times, say: "I'm ending this interview due to lack of seriousness." and stop responding with questions.

ANSWER EVALUATION GUIDELINES:
- WRONG answer: Politely say "That's not quite right" or "I think there's a gap here", explain the correct concept briefly, then ask a follow-up to verify understanding.
- PARTIAL answer: Say "That's a good start, but..." and guide them to the complete answer.
- CORRECT answer: Say "Excellent!" or "That's spot on!" then go deeper or move to next topic.
- Always end your feedback with a question to keep the conversation flowing.`;

  res.json({
    systemPrompt,
    initialMessage: `Hi ${firstName}! I'm Surya, your interviewer today. I've carefully reviewed your resume. I can see you have experience with ${fullResume.split(',').slice(0, 3).join(', ').trim() || 'several technologies'}. Let's dive in - can you tell me about one of your most challenging projects and walk me through the technical decisions you made?`
  });
});

app.post('/api/resume-interview/score', async (req, res) => {
  const { messages, resumeText } = req.body;
  if (!process.env.GROQ_API_KEY) {
    return res.json({ error: 'Groq API key not configured' });
  }
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: `You are a technical interview evaluator. The candidate had a resume-based mock interview.

Resume excerpt:
${(resumeText || '').slice(0, 2000)}

Analyze the conversation and give a score out of 10 (not 100).

Rate these areas:
1. Score out of 10
2. Communication Skills - clarity, articulation, structure
3. Technical Depth - how well they explained technical concepts
4. Resume Alignment - did their answers match what's on their resume
5. Strengths (1-2 points)
6. Areas for Improvement (1-2 points)
7. Overall Advice

Format:
Score: X/10
Communication: ...
Technical Depth: ...
Resume Alignment: ...
Strengths: ...
Improvement: ...
Advice: ...` },
        ...messages
      ],
      max_tokens: 400,
      temperature: 0.3,
    });
    return res.json({ score: response.choices[0].message.content });
  } catch (e) {
    return res.json({ error: `Score Error: ${e.message}` });
  }
});

app.post('/api/interview/voice', async (req, res) => {
  const { text } = req.body;
  
  const cleanText = (text || '')
    .replace(/[*_`#\[\]{}|]/g, '')
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000);
  
  if (!cleanText) return res.json({ error: 'No text' });

  const outputPath = path.join(tmpdir(), `tts-${Date.now()}.mp3`);
  const inputPath = path.join(tmpdir(), `tts-in-${Date.now()}.txt`);
  try {
    writeFileSync(inputPath, cleanText);
    execSync(`/home/ranjith/.local/bin/edge-tts --voice "en-US-JennyNeural" --file "${inputPath}" --write-media "${outputPath}"`, { timeout: 15000 });
    const buffer = readFileSync(outputPath);
    try { rmSync(outputPath); } catch {}
    try { rmSync(inputPath); } catch {}
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(buffer);
  } catch (e) {
    try { rmSync(outputPath); } catch {}
    try { rmSync(inputPath); } catch {}
    return res.json({ useBrowserTTS: true, text: text });
  }
});

app.post('/api/interview/speech-to-text', upload.single('audio'), async (req, res) => {
  if (!process.env.GROQ_API_KEY) {
    return res.json({ error: 'Groq API key not configured' });
  }
  if (!req.file) {
    return res.json({ error: 'No audio file provided' });
  }
  try {
    const tempPath = path.join(tmpdir(), `stt-${Date.now()}.webm`);
    writeFileSync(tempPath, req.file.buffer);
    const response = await groq.audio.transcriptions.create({
      model: 'whisper-large-v3-turbo',
      file: createReadStream(tempPath),
      language: 'en',
    });
    try { rmSync(tempPath); } catch {}
    return res.json({ text: response.text });
  } catch (e) {
    return res.json({ error: `STT Error: ${e.message}` });
  }
});

// ============ MongoDB API Routes ============

app.get('/api/db/status', (req, res) => {
  res.json({ connected: isConnected() });
});

// Get or create user profile
app.get('/api/user/:userId', async (req, res) => {
  if (!isConnected()) return res.json({ fallback: true });
  try {
    let user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      user = await User.create({ userId: req.params.userId, name: req.body.name || 'User' });
    }
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update user profile
app.put('/api/user/:userId', async (req, res) => {
  if (!isConnected()) return res.json({ fallback: true });
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { name: req.body.name, email: req.body.email, profile: req.body.profile } },
      { new: true, upsert: true }
    );
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get solved problems
app.get('/api/user/:userId/solved', async (req, res) => {
  if (!isConnected()) return res.json({ fallback: true });
  try {
    const user = await User.findOne({ userId: req.params.userId });
    res.json({ solved: user?.solvedProblems || [] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Mark problem as solved
app.post('/api/user/:userId/solved', async (req, res) => {
  if (!isConnected()) return res.json({ fallback: true });
  try {
    const { problemId } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $addToSet: { solvedProblems: problemId } },
      { new: true, upsert: true }
    );
    res.json({ solved: user.solvedProblems });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  if (!isConnected()) return res.json({ fallback: true });
  try {
    const users = await User.find({}).sort({ 'profile.totalSolved': -1, 'profile.currentStreak': -1 }).limit(50);
    const leaderboard = users.map(u => ({
      name: u.name,
      solved: u.profile.totalSolved,
      streak: u.profile.currentStreak,
      userId: u.userId,
    }));
    res.json({ leaderboard });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Save code
app.put('/api/user/:userId/code', async (req, res) => {
  if (!isConnected()) return res.json({ fallback: true });
  try {
    const { problemId, language, code } = req.body;
    await Code.findOneAndUpdate(
      { userId: req.params.userId, problemId, language },
      { $set: { code } },
      { upsert: true }
    );
    res.json({ saved: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get saved code
app.get('/api/user/:userId/code/:problemId/:language', async (req, res) => {
  if (!isConnected()) return res.json({ fallback: true });
  try {
    const doc = await Code.findOne({
      userId: req.params.userId,
      problemId: parseInt(req.params.problemId),
      language: req.params.language,
    });
    res.json({ code: doc?.code || '' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============ End MongoDB Routes ============

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
