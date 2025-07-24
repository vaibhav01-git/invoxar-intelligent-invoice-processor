#!/usr/bin/env python3
"""Configuration validator for secure API key setup."""

import os
import sys
from pathlib import Path

def validate_environment():
    """Validate that all required environment variables are set."""
    required_vars = ['GOOGLE_API_KEY']
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print("❌ Missing required environment variables:")
        for var in missing_vars:
            print(f"   - {var}")
        print("\n📋 Setup instructions:")
        print("1. Copy .env.example to .env")
        print("2. Add your actual API keys to .env")
        print("3. Restart the application")
        return False
    
    print("✅ All required environment variables are configured")
    return True

if __name__ == "__main__":
    print("🔍 Validating configuration...")
    if validate_environment():
        print("🎉 Configuration is secure and ready!")
        sys.exit(0)
    else:
        print("❌ Please fix configuration issues before running the app.")
        sys.exit(1)