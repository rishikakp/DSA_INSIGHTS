# DSA INSIGHTS AI

A full-stack DSA coding platform with AI-powered mock interviews, real-time multi-language code execution, voice (TTS/STT) support, and performance tracking.

**Backend is Java / Spring Boot.** The React frontend is kept as-is and built into the Spring Boot jar as static resources.

## Tech Stack

| Layer      | Technology                                             |
|------------|--------------------------------------------------------|
| Frontend   | React 18, TypeScript, Vite, custom CSS (GitHub Dark editor theme) |
| Backend    | Java 17, Spring Boot 3.3, Spring MVC, Jackson          |
| Database   | MongoDB (Spring Data MongoDB) with localStorage fallback |
| AI         | Groq (Llama 3.3-70b chat, Whisper large v3 STT)        |
| Auth       | Clerk (frontend-side, optional)                        |
| Code exec  | Node.js, `tsx`, Python 3, g++ (C++17), JDK `javac`/`java` |

## Core Concepts

- **`/execute` (Code Runner):** Runs user code against test cases in JavaScript, TypeScript, Python, C++, or Java. For each language a temp wrapper file is generated that calls the user's `funcName` per test case; the backend compiles/runs it with a per-language timeout, parses the output, and compares it (numerically-tolerant JSON equality) against the expected output.
- **DSA Mock Interview:** A Groq Llama 3.3 system prompt enforces a strict question flow (approach → time complexity → space complexity → edge cases → optimization → write code → test cases). Chat is streamed through `/api/interview/chat`; `/api/interview/score` evaluates the full transcript out of 10.
- **Resume Mock Interview:** `/api/resume-interview/start` builds a system prompt ("Surya") from the uploaded resume text and greets the candidate by first name; `/api/resume-interview/score` scores communication, technical depth, and resume alignment.
- **Voice (TTS / STT):** `/api/interview/voice` runs `edge-tts` to synthesize MP3 audio (falls back to browser TTS via JSON `{ useBrowserTTS: true }`). `/api/interview/speech-to-text` transcribes uploaded audio (`multipart`, `audio` field) via Groq Whisper.
- **MongoDB routes:** User profiles (streak, total solved, daily history), solved-problem tracking, saved code per `(userId, problemId, language)`, and a sorted leaderboard. If MongoDB is unreachable, every route returns `{ fallback: true }` and the frontend uses localStorage — same as the original Express version.
- **Single-jar deployment:** Vite builds the React app into `backend/src/main/resources/static`; Spring Boot serves it and the REST API on one port (3001).

## Setup

### Prerequisites

- Java 17+ (JDK, for `javac`)
- Maven 3.9+ (or use the included `backend/mvnw`)
- Node.js 18+ and npm
- Optional: MongoDB running on `localhost:27017` (works without it via localStorage fallback)
- Optional: `edge-tts` on PATH for server-side TTS
- Code execution runtimes: Node, `tsx` (via npx), Python 3, g++ (C++17)

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` (or create `.env`):

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
GROQ_API_KEY=your_groq_key          # AI chat + speech-to-text
MONGO_URI=mongodb://localhost:27017/dsa_insights
EDGE_TTS_PATH=edge-tts              # optional, absolute path to edge-tts
```

## Running

### Backend only (REST API on http://localhost:3001)

```bash
cd backend
mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

### Frontend dev server (http://localhost:4173, proxies /api and /execute to :3001)

```bash
npm run dev
```

### Full-stack single jar

```bash
npm run fullstack:build      # builds React into backend/src/main/resources/static, then packages the jar
java -jar backend/target/dsa-insights-backend-0.1.0.jar
# Open http://localhost:3001
```

## API Endpoints

### POST /execute — run user code against test cases

Request:

```json
{
  "code": "function twoSum(nums, target) { ... }",
  "language": "javascript",
  "funcName": "twoSum",
  "testCases": [{ "input": { "nums": [2,7,11,15], "target": 9 }, "output": [0,1] }]
}
```

Supported languages: `javascript`, `typescript`, `python`, `cpp`, `java`.

Response:

```json
{ "results": [ { "passed": true, "expected": [0,1], "actual": [0,1] } ] }
```

Error response: `{ "error": "..." }`

### POST /api/interview/start

Request: `{ "problemId": 1, "problem": { "title", "description", "constraints": [...] } }`
Response: `{ "systemPrompt": "...", "initialMessage": "..." }`

### POST /api/interview/chat

Request: `{ "messages": [{ "role": "user", "content": "..." }] }`
Response: `{ "reply": "...", "usage": { "prompt_tokens": 100, "completion_tokens": 50 } }`

### POST /api/interview/score

Request: `{ "messages": [...], "problem": { "title": "Two Sum" } }`
Response: `{ "score": "Score: 8/10 ..." }`

### POST /api/interview/voice

Request: `{ "text": "Explain your approach..." }`
Response: `audio/mpeg` (MP3) or `{ "useBrowserTTS": true, "text": "..." }`

### POST /api/interview/speech-to-text

Request: `multipart/form-data` with field `audio` (webm/mp3)
Response: `{ "text": "I would use a hash map..." }`

### POST /api/resume-interview/start

Request: `{ "resumeText": "...", "userName": "John" }`
Response: `{ "systemPrompt": "...", "initialMessage": "..." }`

### POST /api/resume-interview/score

Request: `{ "messages": [...], "resumeText": "..." }`
Response: `{ "score": "Score: 7/10 ..." }`

### MongoDB routes (all return `{ fallback: true }` when MongoDB is down)

| Method | Endpoint                          | Body / Response |
|--------|-----------------------------------|-----------------|
| GET    | `/api/db/status`                  | `{ connected: bool }` |
| GET    | `/api/user/{userId}`              | get or create → `{ user }` |
| PUT    | `/api/user/{userId}`              | `{ name, email, profile }` → `{ user }` |
| GET    | `/api/user/{userId}/solved`       | `{ solved: [1,5,12] }` |
| POST   | `/api/user/{userId}/solved`       | `{ problemId }` → `{ solved }` |
| GET    | `/api/leaderboard`                | `{ leaderboard: [{name, solved, streak, userId}] }` |
| PUT    | `/api/user/{userId}/code`         | `{ problemId, language, code }` → `{ saved: true }` |
| GET    | `/api/user/{userId}/code/{problemId}/{language}` | `{ code: "..." }` |

### Health

| Method | Endpoint           | Response |
|--------|--------------------|----------|
| GET    | `/api/health`      | `{ "status": "ok", "service": "java-spring" }` |
| POST   | `/api/python/analyze` | code-analysis placeholder |

## Data Storage (localStorage fallback)

| Key | Data |
|-----|------|
| `dsa-profile-{userId}` | totalSolved, currentStreak, lastActiveDate, dailyHistory |
| `dsa-solved-{userId}`  | solved problem IDs |
| `dsa-leaderboard`      | global leaderboard entries |
| `dsa-code-{problemId}-{language}` | saved source code |

## Project Structure

```
.
├── src/                     # React + TypeScript frontend
│   ├── App.tsx              # Landing, Editor, Leaderboard, CodeEditor, Interviews
│   ├── problems.ts          # 150 DSA problems with examples + test cases
│   ├── complexity.ts        # complexity analysis helpers
│   └── styles.css           # all styles (GitHub Dark editor theme)
├── backend/                 # Java 17 + Spring Boot 3.3 backend
│   ├── pom.xml              # Maven build (web, data-mongodb)
│   └── src/main/
│       ├── java/com/dsainsights/
│       │   ├── controller/  # Execute, Interview, ResumeInterview, User, Health
│       │   ├── service/     # GroqClient, CodeExecutorService, TtsService, UserService, Prompts
│       │   ├── repository/  # Spring Data MongoDB repositories
│       │   ├── model/       # UserProfile, SavedCode, Profile, DailyRecord
│       │   └── config/      # CORS
│       └── resources/
│           ├── application.properties
│           └── static/      # built React app (served by Spring Boot)
├── vite.config.ts           # port 4173, proxies /api + /execute to :3001, builds into backend static
├── index.html
├── server.js                # LEGACY Express backend (superseded by backend/)
├── models.js                # LEGACY Mongoose models
└── python_server.py         # LEGACY Flask alternate server
```

## Legacy Node/Python servers

The original Express (`server.js`) + Mongoose (`models.js`) and Flask (`python_server.py`) backends are kept in the repo for reference but are **superseded** by the Spring Boot backend in `backend/`.
