# 🔐 API Security Guide

## ⚠️ IMPORTANT: Never Commit API Keys to Git!

This project now uses secure environment variable handling to protect your Google Gemini API key.

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Your API Key
Create a `.env` file in the project root and add your API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
```

### 3. Run the Application
```bash
cd app
streamlit run streamlit_app.py
```

## 🛡️ Security Features

- ✅ API keys stored in `.env` file (not in code)
- ✅ `.env` file added to `.gitignore`
- ✅ Automatic environment variable loading
- ✅ Graceful fallback when API key is missing

## 📝 Best Practices

1. **Never hardcode API keys** in your source code
2. **Always use `.gitignore`** to exclude sensitive files
3. **Use environment variables** for configuration
4. **Rotate API keys regularly** for security
5. **Restrict API key permissions** in Google Cloud Console

## 🔄 If You Accidentally Commit an API Key

1. **Immediately revoke** the leaked key in Google Cloud Console
2. **Generate a new API key**
3. **Update your `.env` file** with the new key
4. **Clean your git history** using BFG Repo-Cleaner or git filter-repo
5. **Force push** the cleaned repository

## 📞 Need Help?

If you encounter any issues with API key setup, check:
- Your `.env` file exists and contains the correct key
- The key is valid in Google Cloud Console
- You have enabled the Generative AI API