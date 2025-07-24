@echo off
echo ========================================
echo    SECURE INVOICE EXTRACTOR SETUP
echo ========================================
echo.

echo [1/4] Installing dependencies...
pip install python-dotenv
pip install -r app\requirements.txt

echo.
echo [2/4] Checking .env file...
if not exist .env (
    echo WARNING: .env file not found!
    echo Please create .env file and add your Google API key.
    echo See API_SECURITY_GUIDE.md for instructions.
    pause
    exit /b 1
)

echo.
echo [3/4] Verifying .gitignore...
findstr /C:".env" .gitignore >nul
if errorlevel 1 (
    echo Adding .env to .gitignore...
    echo .env >> .gitignore
)

echo.
echo [4/4] Starting application...
echo.
echo ========================================
echo    SECURITY REMINDER
echo ========================================
echo - Never commit API keys to git
echo - Keep your .env file secure
echo - Regularly rotate API keys
echo ========================================
echo.

cd app
streamlit run streamlit_app.py