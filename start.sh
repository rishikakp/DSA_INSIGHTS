#!/usr/bin/env bash
# Double-clickable / one-command launcher for macOS and Linux.
set -euo pipefail
cd "$(dirname "$0")"

JAR="backend/target/dsa-insights-backend-0.1.0.jar"
URL="http://localhost:3001"

echo
echo " ============================================"
echo "   DSA INSIGHTS - starting"
echo " ============================================"
echo

if ! command -v java >/dev/null 2>&1; then
    echo " ERROR: Java 17+ not found."
    echo
    echo "   macOS:  brew install openjdk@17"
    echo "   Ubuntu: sudo apt install openjdk-17-jdk"
    echo "   Or download: https://learn.microsoft.com/java/openjdk/download"
    exit 1
fi

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    echo " ERROR: Node.js 18+ not found."
    echo
    echo "   macOS:  brew install node"
    echo "   Ubuntu: sudo apt install nodejs npm"
    echo "   Or download: https://nodejs.org"
    exit 1
fi

if curl -fsS -m 2 "$URL/api/health" >/dev/null 2>&1; then
    echo " Server already running on $URL"
    open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || true
    exit 0
fi

if [ ! -d node_modules ]; then
    echo " [1/3] npm packages: installing..."
    npm install --no-fund --no-audit
else
    echo " [1/3] npm packages: already installed"
fi

if [ ! -f "$JAR" ]; then
    echo " [2/3] First run: building frontend + jar (needs internet once)..."
    npm run backend:build
else
    echo " [2/3] Build: already present"
fi

echo " [3/3] Starting server on $URL"
echo
java -jar "$JAR" &
SERVER_PID=$!

for i in $(seq 1 60); do
    if curl -fsS -m 2 "$URL/api/health" >/dev/null 2>&1; then
        echo " Ready. Opening $URL"
        open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || true
        wait "$SERVER_PID"
        exit 0
    fi
    sleep 1
done

echo " Server did not answer in 60s - check the output above."
kill "$SERVER_PID" 2>/dev/null || true
exit 1
