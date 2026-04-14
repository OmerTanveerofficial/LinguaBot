import os
import sys

# Make the backend package importable and point NLTK data to a writable path
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND_DIR)

# Vercel serverless only allows writes to /tmp
NLTK_DATA_DIR = '/tmp/nltk_data'
os.makedirs(NLTK_DATA_DIR, exist_ok=True)
os.environ['NLTK_DATA'] = NLTK_DATA_DIR

import nltk
if NLTK_DATA_DIR not in nltk.data.path:
    nltk.data.path.insert(0, NLTK_DATA_DIR)
for pkg in ('punkt', 'punkt_tab', 'wordnet', 'stopwords'):
    try:
        nltk.download(pkg, download_dir=NLTK_DATA_DIR, quiet=True)
    except Exception:
        pass

# Ensure intents.json is resolvable no matter the cwd Vercel picks
os.chdir(BACKEND_DIR)

from app import app  # noqa: E402
