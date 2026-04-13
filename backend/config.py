import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'linguabot-secret-key')
    MODEL_NAME = os.environ.get('MODEL_NAME', 'distilbert-base-uncased')
    HOST = os.environ.get('HOST', '0.0.0.0')
    PORT = int(os.environ.get('PORT', 5200))
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    MAX_HISTORY = 50
