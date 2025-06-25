@echo off
echo ========================================
echo EPA Ethics App - Local Development Setup
echo Developed by St. Michael Enterprises LLC
echo EPA Contract 68HERD25Q0050
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: package.json not found
    echo Please run this script from the EPA Ethics App root directory
    pause
    exit /b 1
)

echo Installing dependencies...
echo.

REM Install root dependencies
echo [1/4] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
echo [2/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

REM Install admin portal dependencies
echo [3/4] Installing admin portal dependencies...
cd admin-portal
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install admin portal dependencies
    pause
    exit /b 1
)
cd ..

REM Install mobile app dependencies
echo [4/4] Installing mobile app dependencies...
cd mobile
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install mobile app dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo The EPA Ethics App is now ready for local testing.
echo.
echo To start the application:
echo   1. Backend API: cd backend && npm run dev
echo   2. Admin Portal: cd admin-portal && npm run dev  
echo   3. Mobile App: cd mobile && npm start
echo.
echo Or run all at once: npm run dev:all
echo.
echo Access points:
echo   - Backend API: http://localhost:3001
echo   - Admin Portal: http://localhost:3000
echo   - Mobile App: http://localhost:19006
echo.
echo For detailed testing instructions, see LOCAL_TESTING_GUIDE.md
echo.
pause