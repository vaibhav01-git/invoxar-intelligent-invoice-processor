@echo off
echo ===================================================
echo Starting Streamlit Invoice Extraction Application...
echo ===================================================
echo.
echo Checking for Google API Key...
if "%GOOGLE_API_KEY%"=="" (
    echo WARNING: GOOGLE_API_KEY not found!
    echo Gemini AI will use fallback extraction.
    echo To set up API key, run: set_api_key.bat
    echo.
) else (
    echo Google API Key found - Gemini AI ready!
    echo.
)

echo Access the application at http://localhost:8501
echo.

:: Install required packages
pip install fpdf pyyaml dicttoxml

:: Run the Streamlit app properly
streamlit run streamlit_app.py

pause