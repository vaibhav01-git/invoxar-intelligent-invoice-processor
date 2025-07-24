# Google Gemini API Setup Guide

## Quick Setup

1. **Run the setup script:**
   ```bash
   set_api_key.bat
   ```

2. **Or set manually:**
   ```bash
   set GOOGLE_API_KEY=your_api_key_here
   ```

## Getting Your API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new project or select existing one
4. Generate API key and copy it
5. Run `set_api_key.bat` and paste your key

## Without API Key

The application will work without an API key using fallback extraction methods. You'll see a warning message but all features will still function.

## Troubleshooting

- **Error: "No API_KEY or ADC found"** - Run `set_api_key.bat` to set your key
- **API key not working** - Verify the key is correct and has Gemini API access enabled
- **Environment variable not found** - Restart your command prompt after setting the key