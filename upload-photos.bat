@echo off
REM ============================================================
REM  JSR Studio - Upload Photos to GitHub
REM ============================================================
REM  One-time setup (only needed once, on a new computer):
REM    1. Install Git for Windows: https://git-scm.com/download/win
REM    2. Clone the project once:
REM         git clone https://github.com/manoranjan2050/JSRstudio.git
REM    3. Make sure this .bat file is saved INSIDE that JSRstudio
REM       folder (next to index.html).
REM    4. Ask the website developer to add your GitHub account as a
REM       collaborator on the repo, so you're allowed to upload.
REM
REM  Every time after that:
REM    1. Copy/replace your photos into the matching images\ folder
REM       (images\wedding, images\events, images\portraits, etc).
REM    2. Double-click this file.
REM    3. Type a short note when asked (or just press Enter), then
REM       wait for "Done." at the end.
REM ============================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ============================================
echo   JSR Studio - Upload Photos to GitHub
echo ============================================
echo.

where git >nul 2>nul
if errorlevel 1 (
    echo ERROR: Git is not installed on this computer.
    echo Install it from https://git-scm.com/download/win and try again.
    echo.
    pause
    exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
    echo ERROR: This does not look like the JSR Studio project folder.
    echo Make sure this file is saved inside the "JSRstudio" folder you
    echo got from "git clone", right next to index.html.
    echo.
    pause
    exit /b 1
)

git config user.name >nul 2>nul
if errorlevel 1 git config user.name "JSR Studio Team"
git config user.email >nul 2>nul
if errorlevel 1 git config user.email "studio@jsrstudio.local"

echo Checking for new or changed photos...
git add images data assets
git diff --cached --quiet
if not errorlevel 1 (
    echo.
    echo No new or changed files found in images, data, or assets.
    echo Nothing to upload.
    echo.
    pause
    exit /b 0
)

echo.
echo These files will be uploaded:
git diff --cached --name-status
echo.

set "msg="
set /p "msg=Type a short note about what you added (or press Enter to skip): "
if "!msg!"=="" set "msg=Update photos - %date% %time%"

git commit -m "!msg!" >nul
if errorlevel 1 (
    echo.
    echo ERROR: Could not save your changes. Scroll up to see why.
    echo.
    pause
    exit /b 1
)

echo.
echo Syncing with GitHub...
git pull --rebase origin main
if errorlevel 1 (
    echo.
    echo ERROR: Could not sync with GitHub - someone else's changes
    echo may conflict with yours. Do NOT try to fix this yourself.
    echo Please contact the website developer for help.
    echo.
    pause
    exit /b 1
)

echo.
echo Uploading your photos...
git push origin main
if errorlevel 1 (
    echo.
    echo ERROR: Upload failed. Check your internet connection, and
    echo make sure you're signed in to GitHub when prompted, then
    echo run this file again. Still stuck? Contact the developer.
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Done. Your photos are now on GitHub.
echo   The live website updates in 1-2 minutes.
echo ============================================
echo.
pause
