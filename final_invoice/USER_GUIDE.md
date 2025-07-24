📖 Invoice Extraction Platform - User Guide

Welcome to the Invoice Extraction Platform! This guide will walk you through everything you need to know to effectively use the application for extracting data from your invoices.

🎯 Table of Contents

1. [Getting Started](#-getting-started)
2. [Interface Overview](#-interface-overview)
3. [Uploading Invoices](#-uploading-invoices)
4. [Extraction Methods](#-extraction-methods)
5. [Viewing Results](#-viewing-results)
6. [Search Functionality](#-search-functionality)
7. [Visual Field Detection](#-visual-field-detection)
8. [Exporting Data](#-exporting-data)
9. [Tips for Best Results](#-tips-for-best-results)
10. [Troubleshooting](#-troubleshooting)

🚀 Getting Started

System Requirements
- Windows operating system
- Modern web browser (Chrome, Firefox, Edge)
- Internet connection (for AI features)
- Python 3.10+ (automatically handled by setup scripts)

Quick Launch
1. Navigate to the `app` folder in your project directory
2. Double-click `start_app.bat` to launch the application
3. Your browser will automatically open to `http://localhost:8501`
4. You're ready to start extracting invoice data!

🖥️ Interface Overview

The application features a clean, modern interface with several key sections:

Main Navigation
- **Upload Section**: Drag and drop area for invoice files
- **Preview Panel**: Shows your uploaded invoice image
- **Extraction Tabs**: Choose between different processing methods
- **Results Display**: Shows extracted data in organized tables
- **Export Options**: Download your data in various formats

Color Coding
- 🔴 **Red**: Company information fields
- 🟢 **Green**: Customer information fields  
- 🔵 **Blue**: Invoice details (number, dates)
- 🟠 **Orange**: Financial information (amounts, totals)

📤 Uploading Invoices

Supported Formats
- **JPEG/JPG**: Standard image format
- **PNG**: High-quality image format
- **PDF**: Automatically converted to images

Upload Methods
1. **Drag & Drop**: Simply drag your invoice file into the upload area
2. **File Browser**: Click "Browse files" to select from your computer
3. **File Size**: Maximum 10MB per file for optimal performance

Image Quality Tips
- **Resolution**: 300 DPI or higher recommended
- **Clarity**: Ensure text is clearly readable
- **Orientation**: Upload images in correct orientation
- **Lighting**: Avoid shadows or glare on the document

🤖 Extraction Methods

The platform offers multiple extraction approaches to suit different needs:

1. Dataset Model Extraction
Best for: Standard invoices, consistent layouts, offline processing

Features:
- Traditional computer vision approach
- Works without internet connection
- Fast processing (2-3 seconds)
- Reliable for common invoice formats

Extracted Fields:
- Company Name and Address
- Customer Address
- Invoice Number
- Invoice Date
- Total Amount

How to Use:
1. Upload your invoice image
2. Click the "Dataset Model" tab
3. Click "Run Dataset Extraction"
4. View results in the data table below

2. Gemini AI Extraction
Best for: Complex layouts, handwritten text, maximum accuracy

Features:
- Advanced AI-powered extraction
- Handles complex and varied layouts
- Extracts detailed line items
- Superior accuracy for difficult invoices

Extracted Fields:
- All Dataset Model fields plus:
- Detailed line items with descriptions
- Quantities and unit prices
- Subtotals and tax breakdowns
- Due dates and payment terms

How to Use:
1. Upload your invoice image
2. Click the "Gemini AI" tab
3. Click "Run Gemini AI Extraction"
4. Wait for AI processing (3-5 seconds)
5. View comprehensive results

3. Fallback System
If AI services are unavailable, the system automatically generates realistic sample data based on your image characteristics for testing purposes.

📊 Viewing Results

Data Tables
Extracted information is displayed in clean, organized tables:

- Basic Information: Key invoice details
- Line Items: Detailed product/service breakdown (Gemini AI only)
- Financial Summary: Totals, taxes, and amounts

Data Validation
- Automatic Formatting: Dates converted to YYYY-MM-DD format
- Currency Handling: Monetary values cleaned and standardized
- Data Types: Proper numeric conversion for calculations

🔍 Search Functionality

Dataset Search
- **Exact Matching**: Finds fields containing your search term
- **Case Insensitive**: Searches regardless of capitalization
- **Field and Value Search**: Searches both field names and values

AI Search
Intelligent search that understands context:

Search Examples:
- "total" → Shows all amount-related fields
- "date" → Displays invoice and due dates
- "company" → Returns company information
- "customer" → Shows customer details
- "items" → Lists all line items

How to Use:
1. Click the "Search" tab
2. Enter your search term
3. Choose "Dataset Search" or "AI Search"
4. View filtered results

👁️ Visual Field Detection

Bounding Boxes
See exactly where data was detected on your invoice:

1. Click the "Show Boxes" tab
2. Click "Show Bounding Boxes"
3. View your invoice with colored overlays
4. Reference the color legend for field types

Benefits
- Verification: Confirm extraction accuracy
- Debugging: Identify missed or incorrect fields
- Understanding: See how the AI interprets your document

💾 Exporting Data

Available Formats

Structured Data
- JSON: Machine-readable format for developers
- CSV: Spreadsheet-compatible format
- YAML: Human-readable configuration format
- XML: Standard markup format

Documents
- HTML: Web-ready formatted document
- Text: Simple plain text format
- PNG: Visual table representation

Export Process
1. Complete invoice extraction
2. Scroll to "Export Options" section
3. Click your preferred format button
4. File downloads automatically to your Downloads folder

File Naming
All exports use the format: `invoice_data_YYYYMMDD_HHMMSS.extension`

💡 Tips for Best Results

Image Preparation
- Scan Quality: Use 300 DPI or higher
- Straight Alignment: Ensure document is not skewed
- Full Document: Include entire invoice in the image
- Good Lighting: Avoid shadows and reflections

Invoice Types
- Standard Formats: Work best with both extraction methods
- Handwritten Elements: Use Gemini AI for better accuracy
- Multiple Languages: Gemini AI handles multilingual content better
- Complex Layouts: Gemini AI recommended for non-standard formats

Performance Optimization
- File Size: Keep images under 5MB for faster processing
- Format: JPEG typically processes faster than PNG
- Resolution: Balance quality with file size

🔧 Troubleshooting

Common Issues

Upload Problems
Issue: File won't upload
Solutions:
- Check file format (JPEG, PNG, PDF only)
- Verify file size is under 10MB
- Try refreshing the browser page
- Clear browser cache

Extraction Errors
Issue: No data extracted
Solutions:
- Ensure image is clear and readable
- Try the alternative extraction method
- Check internet connection (for Gemini AI)
- Verify invoice contains standard fields

Poor Accuracy
Issue: Incorrect data extracted
Solutions:
- Use higher resolution image
- Ensure proper document orientation
- Try Gemini AI for complex layouts
- Manually verify critical fields

Export Issues
Issue: Download doesn't work
Solutions:
- Check browser download settings
- Ensure popup blockers are disabled
- Try a different export format
- Refresh page and re-extract

Error Messages

"Gemini API Error"
- Cause: Internet connection or API key issue
- Solution: Check connection, system uses fallback automatically

"Failed to extract data"
- Cause: Image quality or format issue
- Solution: Try different image or extraction method

"No matches found" (Search)
- Cause: Search term not found in extracted data
- Solution: Try broader search terms or re-extract data

Getting Help

1. **Check Image Quality**: Ensure your invoice image is clear and complete
2. **Try Both Methods**: Test both Dataset Model and Gemini AI extraction
3. **Review This Guide**: Reference relevant sections above
4. **Contact Support**: Report persistent issues with sample images

📈 Advanced Features

Batch Processing Tips
- Process similar invoices using the same extraction method
- Use consistent file naming for organization
- Export in the same format for easy data compilation

Data Integration
- JSON format works well with databases
- CSV format imports easily into Excel/Google Sheets
- XML format suitable for enterprise systems

Quality Assurance
- Always verify critical fields (amounts, dates)
- Use bounding boxes to confirm field detection
- Cross-reference with original document

---

🎉 Congratulations!

You're now ready to efficiently extract data from your invoices using the Invoice Extraction Platform. Remember to experiment with both extraction methods to find what works best for your specific invoice types.

For technical questions or development information, see the [Developer Guide](DEVELOPER_GUIDE.md).

Happy extracting! 🚀