@echo off
echo ===================================================
echo Starting Invoice Extraction Application...
echo ===================================================
echo.

echo Access the application at http://localhost:8501
echo.

cd %~dp0
streamlit run streamlit_app.py

pause