# Invoice Extraction Platform - Streamlit Version

## 🚀 Quick Start

1. **Run the application directly**
   - Double-click `run_app.bat` in the project root, or run from terminal:
     ```
     run_app.bat
     ```

2. **First-time setup and run**
   - If this is your first time running the application, use:
     ```
     start.bat
     ```
   - This will install all requirements and start the Streamlit app

## Features

- **Real-time Invoice Data Extraction** using Google's Gemini AI
- **Fallback Extraction** when AI is unavailable
- **Visual Bounding Boxes** to highlight detected fields
- **Search Functionality** to find specific information
- **Multiple Export Formats** (JSON, CSV, YAML, XML, HTML, Text, PNG)

## Project Structure

```
final_invoice_streamlit/
│
├── static/                     # Static files (JS, CSS)
├── uploads/                    # Uploaded invoice images
├── streamlit_app.py            # Main Streamlit application
├── requirements.txt            # Project dependencies
├── run_app.bat                 # Batch file to run the app
├── start.bat                   # Batch file to install and run
└── README.md                   # This documentation
```

## Notes

- The application will use Gemini AI for extraction if available
- If Gemini AI is unavailable, it will use a fallback extraction method
- Uploads are stored in the uploads directory