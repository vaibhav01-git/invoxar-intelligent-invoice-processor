@echo off
echo ===================================================
echo Setting up and starting Invoice Extraction Application...
echo ===================================================
echo.

echo Installing essential packages...
pip install -r requirements.txt --quiet

echo.
echo Starting application...
echo Access the application at http://localhost:8501
echo.

streamlit run streamlit_app.py

pause