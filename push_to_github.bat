@echo off
echo ===================================================
echo   Pushing URMIRA.COM to GitHub Repository
echo   Target: https://github.com/ashikurrahmanshaon/urmira.foods
echo ===================================================
echo.

echo [1/3] Adding all updated files and illustrations...
"C:\Users\MY PC\.git-portable\cmd\git.exe" add .

echo [2/3] Committing changes...
"C:\Users\MY PC\.git-portable\cmd\git.exe" commit -m "Fix illustrations rendering, icons, and update UI"

echo [3/3] Pushing to GitHub main branch...
"C:\Users\MY PC\.git-portable\cmd\git.exe" push -u origin main

echo.
echo ===================================================
echo   Successfully pushed to GitHub!
echo ===================================================
pause
