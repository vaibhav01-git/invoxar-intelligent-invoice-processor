"""
Streamlit App Entry Point for Deployment
This file serves as the main entry point for Streamlit Cloud deployment.
"""

import streamlit as st
import os
import sys

# Add the current directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

# Import and run the main streamlit app
from streamlit_app import *

if __name__ == "__main__":
    # This will be executed when running with streamlit run app.py
    pass