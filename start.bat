@echo off
setlocal
cd /d "%~dp0"
title DSA INSIGHTS

echo.
echo  ============================================
echo    DSA INSIGHTS - starting
echo  ============================================
echo.

where java >nul 2>nul
if errorlevel 1 goto :nojava
where node >nul 2>nul
if errorlevel 1 goto :nonode
where npm >nul 2>nul
if errorlevel 1 goto :nonode

netstat -ano | findstr ":3001" | findstr "LISTENING" >nul 2>nul
if not errorlevel 1 (
    echo  Server is already running on port 3001.
    echo  Opening http://localhost:3001
    start "" http://localhost:3001
    goto :done
)

if exist "node_modules" (
    echo  [1/3] npm packages: already installed
) else (
    echo  [1/3] npm packages: installing...
    call npm install --no-fund --no-audit
    if errorlevel 1 goto :fail
)

if exist "backend\target\dsa-insights-backend-0.1.0.jar" (
    echo  [2/3] Build: already present
) else (
    echo  [2/3] First run: building frontend + jar, this needs internet once...
    call npm run backend:build
    if errorlevel 1 goto :fail
)

echo  [3/3] Starting server on http://localhost:3001
echo.

start "DSA INSIGHTS server" cmd /k java -jar backend\target\dsa-insights-backend-0.1.0.jar

powershell -NoProfile -Command "$ok=$false; for($i=0; $i -lt 60; $i++){ try{ Invoke-WebRequest 'http://localhost:3001/api/health' -UseBasicParsing -TimeoutSec 2 | Out-Null; $ok=$true; break }catch{ Start-Sleep -Seconds 1 } }; if(-not $ok){ exit 1 }"

if errorlevel 1 (
    echo.
    echo  The server did not answer in 60 seconds.
    echo  Check the "DSA INSIGHTS server" window for the error.
    goto :done
)

echo  Ready. Opening http://localhost:3001
start "" http://localhost:3001
goto :done

:nojava
echo  ERROR: Java 17 or newer is not installed on this PC.
echo.
echo  Install a JDK, then double-click this file again:
echo     winget install Microsoft.OpenJDK.17
echo.
echo  Download page: https://learn.microsoft.com/java/openjdk/download
set ERRMSG=1
goto :pausefail

:nonode
echo  ERROR: Node.js is not installed on this PC.
echo.
echo  Install Node.js 18 or newer, then double-click this file again:
echo     winget install OpenJS.NodeJS.LTS
echo.
echo  Download page: https://nodejs.org
set ERRMSG=1
goto :pausefail

:fail
echo.
echo  Build failed - see the messages above.
echo  On the very first run Maven needs internet access to download Spring Boot.
set ERRMSG=1
goto :pausefail

:pausefail
echo.
pause
exit /b 1

:done
endlocal
exit /b 0
