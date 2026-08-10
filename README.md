# DSA INSIGHTS AI

A full-stack DSA coding platform with AI-powered mock interviews, real-time code execution in 5 languages, voice support, and performance tracking.

> **Backend:** Java 17 + Spring Boot 3 (REST API, MongoDB, AI integrations)
> **Frontend:** React 18 + TypeScript + Vite (served as static resources from the Spring Boot jar)

---

## Features

- **150+ curated DSA problems** across 10 categories (Arrays, Trees, Graphs, DP, etc.)
- **Multi-language code editor** with GitHub Dark theme and syntax highlighting
- **Real-time code execution** for JavaScript, TypeScript, Python, C++ and Java
- **Automatic test-case validation** with pass/fail reporting
- **AI DSA mock interviews** powered by Groq Llama 3.3-70B (strict interviewer flow: approach → time complexity → space complexity → edge cases → optimization → coding → test cases)
- **Resume-based AI mock interviews** ("Surya" interviewer persona) with voice support
- **Text-to-Speech (edge-tts)** and **Speech-to-Text (Whisper)** for voice interviews
- **User profile** with daily streaks, solved-problem tracking, and progress history
- **Leaderboard** with real-time rankings (MongoDB)
- **Clerk authentication** (sign in / sign up / logout)
- **Single-jar deployment** — React app is bundled inside the Spring Boot jar

---

## Core Concepts

### 1. Code Execution Engine
`POST /execute` runs user submissions in an isolated temp directory and validates them against test cases:

1. Input test cases are filtered (only cases with a non-empty object `input` are used).
2. The user's function is wrapped with a generated test harness for the target language.
3. The harness compiles/runs the code with a per-language timeout (5s, 30s for TS) and captures stdout.
4. Output is parsed back into JSON values (arrays, numbers, strings, booleans).
5. Each actual output is compared with the expected output (numerically tolerant: `1` == `1.0`).
6. Response: `{ results: [{ passed, expected, actual }] }`.

| Language | Runtime | Timeout |
|----------|---------|---------|
| JavaScript | `node` | 5s |
| TypeScript | `npx tsx` | 30s |
| Python | `python3` | 5s |
| C++ | `g++ -std=c++17` | 5s (15s compile) |
| Java | `javac`/`java` (JDK) | 5s (15s compile) |

### 2. AI DSA Interview Flow
`/api/interview/start` returns a **system prompt** that enforces a strict 7-step question flow and an **initial greeting**. Every user answer is sent to `/api/interview/chat` together with the stored system prompt. The interviewer:
- Always asks about **time and space complexity**
- Never asks personal/non-technical questions
- Scolds off-topic answers and repeats the question
- Ends the session after 8 rounds or when the timer expires

### 3. Resume Interview Flow
`/api/resume-interview/start` builds a "Surya" interviewer prompt from the pasted resume (first 8000 chars). The AI extracts skills, projects, technologies and work experience, and asks **only resume-specific** questions with strict answer evaluation (correct / partial / wrong + feedback).

### 4. Voice Support
- **TTS:** `POST /api/interview/voice` runs `edge-tts` (Jenny Neural voice) and returns `audio/mpeg`. If TTS is unavailable, it returns `{ "useBrowserTTS": true }` and the browser falls back to the Web Speech API.
- **STT:** `POST /api/interview/speech-to-text` uploads an audio blob which is transcribed with Groq `whisper-large-v3-turbo`.

### 5. Scoring
`/api/interview/score` and `/api/resume-interview/score` send the full conversation to the LLM with an evaluator system prompt that returns a score out of 10, complexity analysis, strengths, weaknesses and improvement areas.

### 6. Persistence
- **MongoDB** stores user profiles (streaks, solved problems, daily history) and saved code.
- If MongoDB is unavailable, all `/api/user/*` routes return `{ "fallback": true }` and the frontend automatically switches to **localStorage** storage.
- Leaderboard ranks users by `totalSolved` then `currentStreak` (top 50).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Backend | Java 17, Spring Boot 3.3 |
| Build | Maven (with wrapper) |
| Database | MongoDB (Spring Data MongoDB) |
| AI | Groq API (Llama 3.3-70B chat, Whisper STT) |
| Voice | edge-tts (server) + Web Speech API (browser fallback) |
| Auth | Clerk (frontend) |
| HTTP Client | Spring `RestClient` |

---

## Prerequisites

- **JDK 17+** (required for compiling/running Java; also used to execute user Java code)
- **Maven 3.8+** (or use the included `mvnw` wrapper)
- **Node.js 18+** and npm (for the React frontend)
- **MongoDB** (optional — app falls back to localStorage)
- **Groq API key** (required for AI chat, scoring, STT)
- **edge-tts** (optional — for server-side TTS; falls back to browser TTS)

---

## Setup

### 1. Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | For AI features | Groq API key (chat completions + Whisper STT) |
| `MONGO_URI` | Optional | MongoDB connection string (default `mongodb://localhost:27017/dsa_insights`) |
| `EDGE_TTS_PATH` | Optional | Path to `edge-tts` binary (default `edge-tts`) |
| `VITE_CLERK_PUBLISHABLE_KEY` | Optional | Clerk publishable key (disables Clerk UI if empty) |

### 2. Install dependencies

```bash
npm install
```

### 3. Build the frontend into the Spring Boot jar

```bash
npm run fullstack:build
```

This runs `tsc && vite build` (outputs to `backend/src/main/resources/static`) and then `mvn clean package` (produces `backend/target/dsa-insights-backend-0.1.0.jar`).

### 4. Run

**Option A — single jar (production):**

```bash
java -jar backend/target/dsa-insights-backend-0.1.0.jar
# Open http://localhost:3001
```

**Option B — development (hot reload):**

```bash
# Terminal 1 - Spring Boot backend (port 3001)
npm run backend:dev

# Terminal 2 - Vite dev server (port 4173, proxies /api and /execute to 3001)
npm run dev
# Open http://localhost:4173
```

---

## API Endpoints

All endpoints are served by the Spring Boot backend on **port 3001**.

### Code Execution

#### `POST /execute`
Executes user code against test cases and validates outputs.

**Request:**
```json
{
  "code": "function twoSum(nums, target) { ... }",
  "language": "javascript",
  "funcName": "twoSum",
  "testCases": [
    { "input": { "nums": [2,7,11,15], "target": 9 }, "output": [0,1] }
  ]
}
```
`language` ∈ `javascript | typescript | python | cpp | java`

**Response:**
```json
{
  "results": [
    { "passed": true, "expected": [0,1], "actual": [0,1] }
  ]
}
```

### AI DSA Interviews

#### `POST /api/interview/start`
Starts a DSA problem-based mock interview.

**Request:**
```json
{ "problemId": 1, "problem": { "title": "Two Sum", "description": "...", "constraints": ["1 <= n <= 10^5"] } }
```
**Response:**
```json
{ "systemPrompt": "...", "initialMessage": "Let's solve \"Two Sum\" together! ..." }
```

#### `POST /api/interview/chat`
Sends messages (including the stored system prompt) to Groq Llama 3.3-70B.

**Request:**
```json
{ "messages": [{ "role": "user", "content": "I would use a hash map..." }] }
```
**Response:**
```json
{ "reply": "Good approach. What's the time complexity?", "usage": { "prompt_tokens": 120, "completion_tokens": 40 } }
```

#### `POST /api/interview/score`
Scores a DSA interview session out of 10.

**Request:**
```json
{ "messages": [ ... ], "problem": { "title": "Two Sum" } }
```
**Response:**
```json
{ "score": "Score: 8/10\nTime Complexity: ...\n..." }
```

#### `POST /api/interview/voice`
Server-side text-to-speech using edge-tts.

**Request:**
```json
{ "text": "What is the time complexity of your approach?" }
```
**Response:** `audio/mpeg` binary (or `{ "useBrowserTTS": true, "text": "..." }` when TTS is unavailable)

#### `POST /api/interview/speech-to-text`
Transcribes a recorded audio clip using Groq Whisper.

**Request:** `multipart/form-data` with field `audio` (webm/mp3)
**Response:**
```json
{ "text": "I would use a hash map to solve this problem..." }
```

### Resume-Based Interviews

#### `POST /api/resume-interview/start`
Builds the "Surya" interviewer prompt from a resume.

**Request:**
```json
{ "resumeText": "John Doe - Software Engineer...", "userName": "John" }
```
**Response:**
```json
{ "systemPrompt": "...", "initialMessage": "Hi John! I'm Surya, your interviewer today. ..." }
```

#### `POST /api/resume-interview/score`
Scores a resume-based interview.

**Request:**
```json
{ "messages": [ ... ], "resumeText": "John Doe - Software Engineer..." }
```
**Response:**
```json
{ "score": "Score: 7/10\nCommunication: ...\n..." }
```

### User / MongoDB Routes

All routes return `{ "fallback": true }` when MongoDB is not connected (frontend then uses localStorage).

#### `GET /api/db/status`
```json
{ "connected": true }
```

#### `GET /api/user/{userId}`
Get (or create) a user profile.
```json
{ "user": { "userId": "user_123", "name": "User", "profile": { "totalSolved": 3, "currentStreak": 2 }, "solvedProblems": [1, 5] } }
```

#### `PUT /api/user/{userId}`
Update name, email, and/or profile object.
```json
{ "name": "John", "email": "j@x.com", "profile": { "totalSolved": 4 } }
```

#### `GET /api/user/{userId}/solved`
```json
{ "solved": [1, 5, 12] }
```

#### `POST /api/user/{userId}/solved`
Mark a problem as solved (idempotent add).
```json
{ "problemId": 12 }  →  { "solved": [1, 5, 12] }
```

#### `GET /api/leaderboard`
Top 50 users by `totalSolved` then `currentStreak`.
```json
{ "leaderboard": [ { "name": "John", "solved": 42, "streak": 7, "userId": "user_123" } ] }
```

#### `PUT /api/user/{userId}/code`
Save source code for a problem in a language (upsert).
```json
{ "problemId": 1, "language": "javascript", "code": "function twoSum(nums) {...}" }
→ { "saved": true }
```

#### `GET /api/user/{userId}/code/{problemId}/{language}`
```json
{ "code": "function twoSum(nums) {...}" }
```

### Health / Misc

#### `GET /api/health`
```json
{ "status": "ok", "service": "java-spring" }
```

#### `POST /api/python/analyze`
Legacy placeholder analysis endpoint (compatibility with the old Python server).

---

## Data Storage

| Key / Collection | Data Stored | Scope |
|------------------|-------------|-------|
| `users` (MongoDB) | profile, solvedProblems, streaks | Per user |
| `codes` (MongoDB) | saved source code per problem+language | Per user |
| `dsa-profile-{userId}` (localStorage) | totalSolved, currentStreak, lastActiveDate, dailyHistory | Fallback |
| `dsa-solved-{userId}` (localStorage) | solved problem IDs `[1, 5, 12]` | Fallback |
| `dsa-leaderboard` (localStorage) | `[{name, solved, streak}]` | Fallback |
| `dsa-code-{problemId}-{language}` (localStorage) | source code | Fallback |

---

## Project Structure

```
DSA_INSIGHTS/
├── backend/                          # Java Spring Boot backend
│   ├── pom.xml                       # Maven build (Spring Boot 3.3)
│   ├── mvnw / mvnw.cmd               # Maven wrapper
│   └── src/main/
│       ├── java/com/dsainsights/
│       │   ├── DsaInsightsApplication.java
│       │   ├── config/               # CORS, SPA fallback
│       │   ├── controller/           # REST controllers (Execute, Interview, Resume, User, Health)
│       │   ├── dto/                  # Request DTOs
│       │   ├── model/                # MongoDB entities (UserProfile, SavedCode)
│       │   ├── repository/           # Spring Data repositories
│       │   └── service/              # CodeExecutor, GroqClient, Tts, UserService, Prompts
│       └── resources/
│           ├── application.properties
│           └── static/               # Built React app (from `npm run build`)
├── src/                              # React frontend
│   ├── App.tsx                       # Landing, Editor, Leaderboard, CodeEditor, Interviews
│   ├── main.tsx                      # React entry (optional ClerkProvider)
│   ├── problems.ts                   # 150 DSA problems + test cases + starter code
│   ├── complexity.ts
│   └── styles.css
├── index.html
├── vite.config.ts                    # Vite + proxy + build.outDir → backend static
└── package.json
```

---

## Legacy Files

`server.js`, `models.js`, `python_server.py` and `fix-java.sh` are the original Node.js/Express backend. They are kept for reference only — the active backend is the Spring Boot application in `backend/`.
