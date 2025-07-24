# 🚀 Quick Start Guide

## Prerequisites
- Git installed on your system
- GitHub account
- Google API key for Gemini AI

## 1. Initialize Git Repository

```bash
# Navigate to your project
cd "d:\Intelligent_Invoice_Processor\final_invoice"

# Initialize git
git init
git add .
git commit -m "Initial commit: Intelligent Invoice Processor"
```

## 2. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Name: `intelligent-invoice-processor`
4. Set to Public
5. Don't add README (we have one)

## 3. Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/intelligent-invoice-processor.git
git branch -M main
git push -u origin main
```

## 4. Deploy to Streamlit Cloud

1. Go to [share.streamlit.io](https://share.streamlit.io)
2. Sign in with GitHub
3. Click "New app"
4. Settings:
   - Repository: `YOUR_USERNAME/intelligent-invoice-processor`
   - Branch: `main`
   - Main file: `final_invoice_streamlit/streamlit_app.py`

## 5. Add Secrets

In Streamlit Cloud:
1. Go to App Settings → Secrets
2. Add:
```toml
GOOGLE_API_KEY = "your_actual_api_key_here"
```

## 6. Enable GitHub Pages

1. Go to repository Settings
2. Pages section
3. Source: Deploy from branch
4. Branch: `main`
5. Folder: `/docs`

## ✅ Done!

Your app will be available at:
- **Live App**: `https://your-app-name.streamlit.app`
- **Documentation**: `https://your-username.github.io/intelligent-invoice-processor`