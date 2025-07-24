# 🔐 Security Setup Guide

## Environment Variables Configuration

### Local Development Setup

1. **Copy the example environment file:**
   ```bash
   copy .env.example .env
   ```

2. **Edit the `.env` file and add your actual API keys:**
   ```
   GOOGLE_API_KEY=your_actual_google_api_key_here
   ```

3. **Never commit the `.env` file** - it's already in `.gitignore`

### Production Deployment (Streamlit Cloud)

1. **In Streamlit Cloud Dashboard:**
   - Go to your app settings
   - Navigate to "Secrets" section
   - Add your environment variables:
   ```toml
   GOOGLE_API_KEY = "your_actual_google_api_key_here"
   ```

### Docker Deployment

1. **Using environment variables:**
   ```bash
   docker run -e GOOGLE_API_KEY=your_key your_app
   ```

2. **Using .env file:**
   ```bash
   docker run --env-file .env your_app
   ```

### Security Best Practices

✅ **DO:**
- Use environment variables for all secrets
- Keep `.env` files local only
- Use different API keys for different environments
- Regularly rotate API keys
- Use `.env.example` for documentation

❌ **DON'T:**
- Hardcode API keys in source code
- Commit `.env` files to version control
- Share API keys in chat/email
- Use production keys in development

### API Key Management

1. **Google Cloud Console:**
   - Go to APIs & Services > Credentials
   - Create new API key or manage existing ones
   - Restrict API key usage by IP/domain
   - Enable only required APIs

2. **Key Rotation:**
   - Generate new API key
   - Update environment variables
   - Test functionality
   - Revoke old API key

### Troubleshooting

- **API key not working?** Check if it's properly set in environment variables
- **Local vs Production issues?** Ensure both environments have the correct keys
- **Still seeing warnings?** Restart your application after setting environment variables