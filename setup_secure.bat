@echo off
echo 🔐 Secure Setup for Intelligent Invoice Processor
echo.

REM Check if .env.example exists
if not exist ".env.example" (
    echo ❌ Error: .env.example file not found
    echo Please ensure you're running this from the project root directory
    pause
    exit /b 1
)

REM Copy .env.example to .env if it doesn't exist
if not exist ".env" (
    echo 📋 Creating .env file from template...
    copy ".env.example" ".env" >nul
    echo ✅ .env file created successfully
) else (
    echo ⚠️  .env file already exists, skipping creation
)

echo.
echo 🔑 IMPORTANT: Edit the .env file and add your Google API key:
echo    GOOGLE_API_KEY=your_actual_api_key_here
echo.
echo 🌐 Get your API key from: https://console.cloud.google.com/apis/credentials
echo.
echo 📖 For detailed setup instructions, see SECURITY_SETUP.md
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo 🐍 Creating Python virtual environment...
    python -m venv venv
    echo ✅ Virtual environment created
)

echo 🚀 Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat
cd app
pip install -r requirements.txt

echo.
echo ✅ Setup complete! 
echo.
echo 📝 Next steps:
echo    1. Edit .env file with your Google API key
echo    2. Run: cd app && streamlit run streamlit_app.py
echo.
pause