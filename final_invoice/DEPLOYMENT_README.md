# 🗒️ Intelligent Invoice Processor

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://intelligent-invoice-processor.streamlit.app)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AI-powered invoice data extraction platform with dual extraction methods and comprehensive export capabilities.

## 🚀 Live Demo

**[Try the Live App →](https://intelligent-invoice-processor.streamlit.app)**

## ✨ Features

- 🤖 **Dual AI Extraction**: Traditional computer vision + Google Gemini AI
- 📊 **Visual Field Detection**: Bounding box visualization with color coding
- 🔍 **Smart Search**: AI-powered search functionality
- 📤 **Multiple Export Formats**: JSON, CSV, YAML, XML, HTML, PNG, Text
- 🖥️ **Modern Interface**: Clean, responsive Streamlit UI
- ⚡ **Real-time Processing**: Instant results with fallback systems
- 🛡️ **Secure Deployment**: API keys protected via environment variables

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Streamlit UI  │────│  Processing Core │────│  Export Engine  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌────────┴────────┐             │
         │              │                 │             │
         │         ┌────▼────┐    ┌──────▼──────┐      │
         │         │ Dataset │    │ Gemini AI   │      │
         │         │ Model   │    │ Vision API  │      │
         │         └─────────┘    └─────────────┘      │
         │                                             │
         └─────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

- **Frontend**: Streamlit, HTML/CSS/JavaScript
- **Backend**: Python 3.10+
- **AI/ML**: TensorFlow 2.12+, Google Gemini AI
- **Image Processing**: OpenCV, Pillow, PIL
- **Data Processing**: pandas, numpy
- **Export**: Multiple format support

## 📋 Prerequisites

- Python 3.10 or higher
- Google Gemini AI API key
- Modern web browser
- 4GB+ RAM recommended

## 🚀 Quick Start

### Option 1: Use Live App (Recommended)
Visit **[intelligent-invoice-processor.streamlit.app](https://intelligent-invoice-processor.streamlit.app)**

### Option 2: Local Development

1. **Clone Repository**
```bash
git clone https://github.com/YOUR_USERNAME/intelligent-invoice-processor.git
cd intelligent-invoice-processor/final_invoice_streamlit
```

2. **Create Virtual Environment**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure Environment**
```bash
# Copy environment template
copy ..\.env.example .env  # Windows
# cp ../.env.example .env  # Linux/Mac

# Edit .env file and add your API key:
# GOOGLE_API_KEY=your_actual_api_key_here
```

5. **Run Application**
```bash
streamlit run streamlit_app.py
```

## 🔒 Security & Configuration

### API Key Management

**For Local Development:**
- Create `.env` file with your API key
- Never commit `.env` to version control

**For Production (Streamlit Cloud):**
- Add API key to Streamlit Cloud secrets
- Use the app settings interface

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google Gemini AI API key | Yes |

## 📖 Usage Guide

### 1. Upload Invoice
- Drag and drop or select invoice image
- Supported formats: JPEG, JPG, PNG
- Maximum file size: 10MB

### 2. Choose Extraction Method
- **Dataset Model**: Traditional computer vision (6 fields)
- **Gemini AI**: Advanced AI extraction (comprehensive)

### 3. View Results
- Extracted data displayed in structured format
- Visual bounding boxes show detected fields
- Color-coded field categories

### 4. Search & Export
- Use AI search to find specific information
- Export in multiple formats
- Download results instantly

## 🎯 Extracted Fields

### Dataset Model (6 Fields)
- Company Name & Address
- Customer Address
- Invoice Number & Date
- Total Amount

### Gemini AI (Comprehensive)
- All basic fields plus:
- Line items with quantities/prices
- Subtotal, tax, and totals
- Due dates and payment terms
- Customer details

## 📊 Performance

- **Processing Time**: 2-5 seconds per invoice
- **Accuracy**: 85-95% (varies by image quality)
- **Supported Languages**: English (primary)
- **Concurrent Users**: Scales automatically

## 🔧 Development

### Project Structure
```
final_invoice_streamlit/
├── streamlit_app.py      # Main application
├── model_detector.py     # ML model utilities
├── requirements.txt      # Dependencies
├── .streamlit/          # Configuration
│   ├── config.toml      # App settings
│   └── secrets.toml     # Local secrets (not committed)
├── static/              # CSS/JS assets
└── uploads/             # Temporary file storage
```

### Adding New Features

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test locally
4. Commit changes: `git commit -m "Add new feature"`
5. Push branch: `git push origin feature/new-feature`
6. Create Pull Request

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**
- Verify API key is correctly configured
- Check Google Cloud Console for API limits
- Ensure Gemini AI API is enabled

**Upload Failures**
- Check file format (JPEG, JPG, PNG only)
- Verify file size is under 10MB
- Try different image if quality is poor

**Extraction Errors**
- App automatically falls back to mock data
- Check internet connection for Gemini AI
- Try Dataset Model if Gemini AI fails

**Performance Issues**
- Large images may take longer to process
- Consider resizing images before upload
- Check system memory availability

## 📚 Documentation

- **[User Guide](USER_GUIDE.md)** - Detailed usage instructions
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Development setup
- **[API Documentation](docs/api.md)** - Technical reference
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Deployment instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Set up local development environment
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for advanced text extraction
- TensorFlow team for computer vision models
- Streamlit for the amazing web framework
- Open source community for various libraries

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/intelligent-invoice-processor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/intelligent-invoice-processor/discussions)
- **Documentation**: [Project Wiki](https://github.com/YOUR_USERNAME/intelligent-invoice-processor/wiki)

---

**Made with ❤️ using Python, TensorFlow, and Google Gemini AI**

*© 2024 Intelligent Invoice Processor. All rights reserved.*