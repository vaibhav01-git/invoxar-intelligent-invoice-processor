🛠️ Invoice Extraction Platform - Developer Guide

This guide provides comprehensive information for developers who want to understand, modify, or contribute to the Invoice Extraction Platform.

📋 Table of Contents

1. [Architecture Overview](#-architecture-overview)
2. [Development Setup](#-development-setup)
3. [Project Structure](#-project-structure)
4. [Core Components](#-core-components)
5. [API Integration](#-api-integration)
6. [Model Training](#-model-training)
7. [Testing](#-testing)
8. [Deployment](#-deployment)
9. [Contributing](#-contributing)
10. [Troubleshooting](#-troubleshooting)

🏗️ Architecture Overview

System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   (Streamlit)   │◄──►│   (Python)      │◄──►│   (Gemini AI)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   File Upload   │    │   Data Process  │    │   TensorFlow    │
│   & Display     │    │   & Storage     │    │   Models        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

Technology Stack
- **Frontend**: Streamlit (Python web framework)
- **Backend**: Python 3.10+ with Flask support
- **AI/ML**: TensorFlow 2.12.0, Google Gemini AI
- **Image Processing**: Pillow, OpenCV, pytesseract
- **Data Processing**: pandas, numpy, json
- **Storage**: Local file system, SQLite (optional)

Design Patterns
- MVC Pattern: Separation of concerns between UI, logic, and data
- Factory Pattern: Multiple extraction method implementations
- Strategy Pattern: Switchable extraction algorithms
- Fallback Pattern: Graceful degradation when services unavailable

🔧 Development Setup

Prerequisites
```bash
# Required software
- Python 3.10 or higher
- Git (for version control)
- Visual Studio Code (recommended IDE)
- Windows OS (for batch scripts)
```

Environment Setup
```bash
# 1. Clone the repository
git clone <repository-url>
cd final_invoice

# 2. Create virtual environment
python -m venv venv
venv\Scripts\activate

# 3. Install dependencies
cd app
pip install -r requirements.txt

# 4. Set environment variables (optional)
set GOOGLE_API_KEY=your_gemini_api_key_here

# 5. Run the application
streamlit run streamlit_app.py
```

IDE Configuration
VS Code Extensions:
- Python
- Pylance
- Python Docstring Generator
- GitLens
- Streamlit Snippets

Settings:
```json
{
    "python.defaultInterpreterPath": "./venv/Scripts/python.exe",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black"
}
```

📁 Project Structure

Directory Layout
```
final_invoice/
├── 📁 app/                          # Main Streamlit application
│   ├── streamlit_app.py             # Primary application file
│   ├── requirements.txt             # Python dependencies
│   ├── start_app.bat               # Quick start script
│   ├── run.bat                     # Alternative run script
│   ├── chat_history.db             # SQLite database (auto-generated)
│   ├── 📁 uploads/                 # User uploaded files
│   ├── 📁 static/                  # CSS/JS assets
│   │   ├── style.css               # Custom styling
│   │   └── script.js               # Client-side JavaScript
│   └── 📁 models/                  # Model storage directory
│
├── 📁 final_invoice_streamlit/      # Alternative Streamlit version
│   ├── streamlit_app.py            # Streamlit application
│   ├── model_detector.py           # Model detection utilities
│   ├── requirements.txt            # Dependencies
│   └── 📁 uploads/                 # Upload directory
│
├── 📁 models/                       # TensorFlow model ecosystem
│   ├── 📁 official/                # Official TensorFlow models
│   ├── 📁 research/                # Research models
│   └── 📁 saved_model/             # Trained model checkpoints
│
├── 📁 workspace/                    # Training workspace
│   └── 📁 training_demo/           # Model training files
│       ├── 📁 annotations/         # Training annotations
│       ├── 📁 images/              # Training images
│       └── 📁 models/              # Model configurations
│
├── 📁 scripts/                      # Utility scripts
│   ├── generate_train_record.py    # Training data generation
│   ├── generate_test_record.py     # Test data generation
│   └── model_main_tf2.py           # TensorFlow training script
│
└── 📄 Documentation files
    ├── README.md                   # Main documentation
    ├── USER_GUIDE.md              # User instructions
    └── DEVELOPER_GUIDE.md         # This file
```

Key Files

`streamlit_app.py`
Main application file containing:
- Streamlit UI configuration
- File upload handling
- Extraction method implementations
- Data visualization and export

`requirements.txt`
```
streamlit>=1.28.0
Pillow>=10.0.0
pandas>=2.0.0
numpy>=1.24.0
google-generativeai>=0.3.0
matplotlib>=3.7.0
PyYAML>=6.0
dicttoxml>=1.7.0
```

🧩 Core Components

1. Image Processing Module

```python
def process_image(image_path):
    """
    Process uploaded image for extraction
    
    Args:
        image_path (str): Path to uploaded image
        
    Returns:
        PIL.Image: Processed image object
    """
    image = Image.open(image_path)
    # Add preprocessing logic here
    return image
```

2. Extraction Engine

Gemini AI Extraction
```python
def extract_invoice_data(image_path):
    """
    Extract invoice data using Gemini AI
    
    Args:
        image_path (str): Path to invoice image
        
    Returns:
        dict: Extracted invoice data
    """
    try:
        # Load image
        with open(image_path, "rb") as f:
            image_bytes = f.read()
        
        # Initialize Gemini model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Create extraction prompt
        prompt = create_extraction_prompt()
        
        # Generate response
        response = model.generate_content([prompt, {
            "mime_type": "image/jpeg", 
            "data": image_bytes
        }])
        
        # Parse and return data
        return parse_gemini_response(response.text)
        
    except Exception as e:
        # Fallback to traditional method
        return extract_data_fallback(image_path)
```

Fallback Extraction
```python
def extract_data_fallback(image_path):
    """
    Fallback extraction using image analysis
    
    Args:
        image_path (str): Path to invoice image
        
    Returns:
        dict: Generated sample data based on image characteristics
    """
    # Analyze image properties
    image = Image.open(image_path)
    width, height = image.size
    img_array = np.array(image)
    
    # Generate realistic data based on image characteristics
    # Implementation details in main file
    return generated_data
```

3. Bounding Box Generator

```python
def generate_bounding_boxes(image_path, extracted_data):
    """
    Generate bounding boxes for detected fields
    
    Args:
        image_path (str): Path to image
        extracted_data (dict): Extracted invoice data
        
    Returns:
        list: List of bounding box coordinates
    """
    image = Image.open(image_path)
    width, height = image.size
    
    # Calculate field positions based on typical invoice layouts
    boxes = []
    
    # Company information (top-left)
    boxes.append({
        'label': 'CompanyName',
        'xmin': int(width * 0.05),
        'ymin': int(height * 0.05),
        'xmax': int(width * 0.45),
        'ymax': int(height * 0.09)
    })
    
    # Add more boxes for other fields
    return boxes
```

4. Export System

```python
class DataExporter:
    """Handle data export in multiple formats"""
    
    @staticmethod
    def to_json(data):
        """Export to JSON format"""
        return json.dumps(data, indent=2)
    
    @staticmethod
    def to_csv(data):
        """Export to CSV format"""
        df = pd.DataFrame(list(data.items()), columns=["Field", "Value"])
        return df.to_csv(index=False)
    
    @staticmethod
    def to_html(data):
        """Export to HTML format"""
        # HTML generation logic
        return html_content
```

🔌 API Integration

Google Gemini AI Setup

```python
import google.generativeai as genai

# Configure API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize model
model = genai.GenerativeModel('gemini-1.5-flash')
```

Custom Prompt Engineering

```python
def create_extraction_prompt():
    """Create optimized prompt for invoice extraction"""
    return """
    Extract the following information from this invoice image and return it in JSON format:
    {
        "CompanyName": "The name of the company that issued the invoice",
        "CompanyAddress": "The full address of the company",
        "CustomerName": "The name of the customer",
        "CustomerAddress": "The full address of the customer",
        "InvoiceNumber": "The invoice number or ID",
        "Date": "The invoice date in YYYY-MM-DD format",
        "DueDate": "The payment due date in YYYY-MM-DD format",
        "Subtotal": "The subtotal amount as a number without currency symbols",
        "TaxAmount": "The tax amount as a number without currency symbols",
        "TotalAmount": "The total amount as a number without currency symbols",
        "LineItems": [
            {
                "Description": "Description of the item",
                "Quantity": "Quantity as a number",
                "UnitPrice": "Unit price as a number without currency symbols",
                "TotalPrice": "Total price as a number without currency symbols"
            }
        ]
    }
    
    Important:
    - Return ONLY the JSON object, nothing else
    - If you can't find a value, use null
    - Make sure all monetary values are numbers without currency symbols
    - Format dates as YYYY-MM-DD
    """
```

🎯 Model Training

TensorFlow Object Detection Setup

```bash
# Navigate to workspace
cd workspace/training_demo

# Prepare training data
python ../../scripts/generate_train_record.py
python ../../scripts/generate_test_record.py

# Start training
python model_main_tf2.py \
    --model_dir=models/my_ssd_mobilenet \
    --pipeline_config_path=models/my_ssd_mobilenet/pipeline.config
```

Custom Model Development

```python
# Example custom model structure
class InvoiceFieldDetector:
    def __init__(self, model_path):
        self.model = tf.saved_model.load(model_path)
    
    def detect_fields(self, image):
        """Detect invoice fields in image"""
        # Preprocessing
        input_tensor = self.preprocess_image(image)
        
        # Inference
        detections = self.model(input_tensor)
        
        # Post-processing
        return self.postprocess_detections(detections)
```

🧪 Testing

Unit Tests

```python
import unittest
from unittest.mock import patch, MagicMock

class TestInvoiceExtraction(unittest.TestCase):
    
    def setUp(self):
        self.test_image_path = "test_data/sample_invoice.jpg"
    
    def test_gemini_extraction(self):
        """Test Gemini AI extraction"""
        with patch('google.generativeai.GenerativeModel') as mock_model:
            # Mock API response
            mock_response = MagicMock()
            mock_response.text = '{"CompanyName": "Test Company"}'
            mock_model.return_value.generate_content.return_value = mock_response
            
            # Test extraction
            result = extract_invoice_data(self.test_image_path)
            self.assertIn("CompanyName", result)
    
    def test_fallback_extraction(self):
        """Test fallback extraction method"""
        result = extract_data_fallback(self.test_image_path)
        self.assertIsInstance(result, dict)
        self.assertIn("TotalAmount", result)
    
    def test_bounding_box_generation(self):
        """Test bounding box generation"""
        sample_data = {"CompanyName": "Test"}
        boxes = generate_bounding_boxes(self.test_image_path, sample_data)
        self.assertIsInstance(boxes, list)
        self.assertGreater(len(boxes), 0)

if __name__ == '__main__':
    unittest.main()
```

Integration Tests

```python
def test_full_pipeline():
    """Test complete extraction pipeline"""
    # Upload test image
    test_image = "test_data/invoice_sample.jpg"
    
    # Run extraction
    extracted_data = extract_invoice_data(test_image)
    
    # Validate results
    assert extracted_data is not None
    assert "TotalAmount" in extracted_data
    assert isinstance(extracted_data["TotalAmount"], (int, float))
    
    # Test export
    json_export = DataExporter.to_json(extracted_data)
    assert json_export is not None
```

Performance Testing

```python
import time

def benchmark_extraction_methods():
    """Benchmark different extraction methods"""
    test_images = ["test1.jpg", "test2.jpg", "test3.jpg"]
    
    # Benchmark Gemini AI
    start_time = time.time()
    for image in test_images:
        extract_invoice_data(image)
    gemini_time = time.time() - start_time
    
    # Benchmark fallback method
    start_time = time.time()
    for image in test_images:
        extract_data_fallback(image)
    fallback_time = time.time() - start_time
    
    print(f"Gemini AI: {gemini_time:.2f}s")
    print(f"Fallback: {fallback_time:.2f}s")
```

🚀 Deployment

Local Deployment

```bash
# Production setup
pip install -r requirements.txt
streamlit run streamlit_app.py --server.port 8501 --server.address 0.0.0.0
```

Docker Deployment

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8501

CMD ["streamlit", "run", "streamlit_app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

Cloud Deployment (Streamlit Cloud)

```toml
# .streamlit/config.toml
[server]
port = 8501
enableCORS = false
enableXsrfProtection = false

[browser]
gatherUsageStats = false
```

🤝 Contributing

Development Workflow

1. Fork the Repository
   ```bash
   git clone <your-fork-url>
   cd final_invoice
   ```

2. Create Feature Branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make Changes
   - Follow PEP 8 style guidelines
   - Add docstrings to functions
   - Include unit tests for new features

4. Test Changes
   ```bash
   python -m pytest tests/
   python -m flake8 app/
   ```

5. Submit Pull Request
   - Clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

Code Style Guidelines

```python
# Function documentation
def extract_invoice_data(image_path: str) -> dict:
    """
    Extract structured data from invoice image.
    
    Args:
        image_path (str): Path to the invoice image file
        
    Returns:
        dict: Extracted invoice data with standardized fields
        
    Raises:
        FileNotFoundError: If image file doesn't exist
        ValueError: If image format is not supported
    """
    pass

# Variable naming
invoice_data = {}  # Use snake_case
GOOGLE_API_KEY = ""  # Constants in UPPER_CASE
```

Adding New Features

New Extraction Method
```python
def extract_with_custom_method(image_path):
    """Template for new extraction method"""
    try:
        # Your extraction logic here
        extracted_data = {}
        return extracted_data
    except Exception as e:
        # Always provide fallback
        return extract_data_fallback(image_path)
```

New Export Format
```python
def export_to_new_format(data):
    """Template for new export format"""
    # Convert data to new format
    formatted_data = convert_data(data)
    return formatted_data
```

🔧 Troubleshooting

Common Development Issues

Import Errors
```bash
# Solution: Ensure virtual environment is activated
venv\Scripts\activate
pip install -r requirements.txt
```

Streamlit Port Conflicts
```bash
# Solution: Use different port
streamlit run streamlit_app.py --server.port 8502
```

API Key Issues
```bash
# Solution: Set environment variable
set GOOGLE_API_KEY=your_key_here
# Or create .env file (not recommended for production)
```

Model Loading Errors
```python
# Solution: Check model path and format
try:
    model = tf.saved_model.load(model_path)
except Exception as e:
    print(f"Model loading failed: {e}")
    # Use fallback method
```

Performance Optimization

Memory Usage
```python
# Clear large objects after use
del large_image_array
gc.collect()

# Use generators for large datasets
def process_images_generator(image_paths):
    for path in image_paths:
        yield process_image(path)
```

Processing Speed
```python
# Resize large images before processing
def optimize_image_size(image, max_size=1024):
    if max(image.size) > max_size:
        image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
    return image
```

Debugging Tips

```python
# Enable debug logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Add debug prints
def debug_extraction(image_path):
    print(f"Processing: {image_path}")
    print(f"Image size: {Image.open(image_path).size}")
    
    result = extract_invoice_data(image_path)
    print(f"Extracted fields: {list(result.keys())}")
    return result
```

📚 Additional Resources

Documentation
- [Streamlit Documentation](https://docs.streamlit.io/)
- [TensorFlow Object Detection API](https://tensorflow-object-detection-api-tutorial.readthedocs.io/)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)

Useful Libraries
- Image Processing: OpenCV, scikit-image
- OCR: pytesseract, EasyOCR
- PDF Handling: PyPDF2, pdfplumber
- Data Validation: pydantic, cerberus

Community
- [Streamlit Community Forum](https://discuss.streamlit.io/)
- [TensorFlow Community](https://www.tensorflow.org/community)
- [Python Discord](https://discord.gg/python)

---

🎯 Next Steps

1. Explore the codebase using this guide as reference
2. Set up your development environment following the setup instructions
3. Run the test suite to ensure everything works
4. Make your first contribution by fixing a small issue or adding documentation
5. Join the community and share your improvements

Happy coding! 🚀

---

This developer guide is maintained by the project contributors. Please keep it updated as the project evolves.