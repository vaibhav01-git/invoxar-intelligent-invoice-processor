@echo off
echo ===================================================
echo Starting Streamlit Invoice Extraction Application...
echo ===================================================
echo.
echo Access the application at http://localhost:8501
echo.

:: Install required packages
pip install fpdf pyyaml dicttoxml

:: Run the Streamlit app properly
streamlit run streamlit_app.py

pause