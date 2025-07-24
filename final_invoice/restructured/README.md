# Invoice Extraction Platform

A comprehensive solution for extracting data from invoice images using AI and computer vision.

## Project Structure

```
invoice-extractor/
│
├── app/                        # Main application directory
│   ├── uploads/                # Uploaded invoice images
│   ├── model_detector.py       # Model integration utilities
│   ├── streamlit_app.py        # Streamlit application
│   ├── requirements.txt        # Application dependencies
│   ├── run_app.bat             # Script to run the app
│   └── start.bat               # Script to install and run
│
└── training/                   # Model training resources
    └── exported-models/        # Exported trained models
```

## Features

- **Real-time Invoice Data Extraction** using Google's Gemini AI
- **Object Detection** using trained TensorFlow models
- **Visual Bounding Boxes** to highlight detected fields
- **Search Functionality** to find specific information
- **Multiple Export Formats** (JSON, CSV, YAML, XML, HTML, Text, PNG)

## Quick Start

1. **Run the application directly**
   - Navigate to the `app` directory
   - Double-click `run_app.bat`, or run from terminal:
     ```
     run_app.bat
     ```

2. **First-time setup and run**
   - If this is your first time running the application, use:
     ```
     start.bat
     ```
   - This will install all requirements and start the Streamlit app

## Notes

- The application will use Gemini AI for extraction if available
- If Gemini AI is unavailable, it will use a trained object detection model
- If neither is available, it will use a fallback extraction method
- Uploads are stored in the app/uploads directory