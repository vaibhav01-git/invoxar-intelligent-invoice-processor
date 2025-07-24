# 🔐 Security Setup Guide

## API Key Configuration

This project requires a Google Gemini API key to function properly. Follow these steps to set it up securely:

### 1. Get Your Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable the Generative AI API
4. Create a new API key
5. Copy your API key

### 2. Local Development Setup

1. **Copy the environment template:**
   ```bash
   copy .env.example .env
   ```

2. **Edit the `.env` file and add your API key:**
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

3. **Never commit the `.env` file** - it's already in `.gitignore`

### 3. Streamlit Cloud Deployment

1. Go to your Streamlit Cloud app settings
2. Navigate to "Secrets"
3. Add your API key:
   ```toml
   GOOGLE_API_KEY = "your_actual_api_key_here"
   ```

### 4. Other Cloud Platforms

Set the `GOOGLE_API_KEY` environment variable in your deployment platform:

- **Heroku:** `heroku config:set GOOGLE_API_KEY=your_key`
- **Vercel:** Add to environment variables in dashboard
- **Railway:** Add to environment variables in project settings

### 5. Verify Setup

Run the application - if the API key is properly configured, you'll see:
- ✅ No error messages about missing API key
- 🤖 Gemini AI extraction working properly

### 🚨 Security Best Practices

- ✅ **DO:** Use environment variables for API keys
- ✅ **DO:** Keep `.env` files in `.gitignore`
- ✅ **DO:** Use different API keys for development and production
- ❌ **DON'T:** Hardcode API keys in source code
- ❌ **DON'T:** Commit `.env` files to version control
- ❌ **DON'T:** Share API keys in chat, email, or documentation

### Troubleshooting

**Error: "Google API key not found"**
- Check that your `.env` file exists and contains `GOOGLE_API_KEY=your_key`
- Ensure the `.env` file is in the project root directory
- Verify there are no extra spaces around the `=` sign

**API quota exceeded errors:**
- Check your Google Cloud Console for usage limits
- Consider upgrading your API plan if needed
- Monitor your API usage regularly