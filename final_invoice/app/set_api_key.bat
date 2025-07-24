@echo off
echo Setting up Google API Key for Gemini AI...
echo.
echo Please enter your Google API Key (or press Enter to skip):
set /p API_KEY=API Key: 

if "%API_KEY%"=="" (
    echo No API key provided. The app will use fallback extraction.
    echo.
    pause
    exit /b
)

echo Setting GOOGLE_API_KEY environment variable...
setx GOOGLE_API_KEY "%API_KEY%"

echo.
echo API Key has been set successfully!
echo Please restart your command prompt or IDE for changes to take effect.
echo.
echo To get a Google API Key:
echo 1. Go to https://ai.google.dev/
echo 2. Click "Get API Key"
echo 3. Create a new project or select existing one
echo 4. Generate API key and copy it
echo.
pause