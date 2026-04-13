from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_engine import NLPEngine
from config import Config
from datetime import datetime

app = Flask(__name__)
CORS(app)

engine = NLPEngine()
chat_sessions = {}


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model': 'TF-IDF + Naive Bayes NLP Pipeline',
        'intents': len(engine.intent_responses),
        'timestamp': datetime.now().isoformat()
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400

    message = data['message'].strip()
    if not message:
        return jsonify({'error': 'Message cannot be empty'}), 400

    session_id = data.get('session_id', 'default')

    result = engine.analyze(message)

    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    chat_sessions[session_id].append({
        'role': 'user',
        'message': message,
        'timestamp': datetime.now().isoformat()
    })
    chat_sessions[session_id].append({
        'role': 'bot',
        'message': result['response'],
        'intent': result['intent'],
        'confidence': result['confidence'],
        'timestamp': datetime.now().isoformat()
    })

    if len(chat_sessions[session_id]) > Config.MAX_HISTORY * 2:
        chat_sessions[session_id] = chat_sessions[session_id][-Config.MAX_HISTORY * 2:]

    return jsonify({
        'response': result['response'],
        'analysis': {
            'intent': result['intent'],
            'confidence': result['confidence'],
            'top_intents': result['top_intents'],
            'entities': result['entities'],
            'metadata': result['metadata'],
            'preprocessed': result['preprocessed']
        }
    })


@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Text is required'}), 400

    text = data['text'].strip()
    if not text:
        return jsonify({'error': 'Text cannot be empty'}), 400

    result = engine.analyze(text)
    return jsonify(result)


@app.route('/api/intents', methods=['GET'])
def get_intents():
    intents_summary = []
    for intent in engine.intents['intents']:
        intents_summary.append({
            'tag': intent['tag'],
            'pattern_count': len(intent['patterns']),
            'sample_patterns': intent['patterns'][:3],
            'response_count': len(intent['responses'])
        })
    return jsonify({'intents': intents_summary})


@app.route('/api/history/<session_id>', methods=['GET'])
def get_history(session_id):
    history = chat_sessions.get(session_id, [])
    return jsonify({'history': history})


@app.route('/api/history/<session_id>', methods=['DELETE'])
def clear_history(session_id):
    if session_id in chat_sessions:
        del chat_sessions[session_id]
    return jsonify({'message': 'History cleared'})


if __name__ == '__main__':
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
