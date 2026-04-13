import json
import random
import re
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('stopwords', quiet=True)


class NLPEngine:
    def __init__(self, intents_path='intents.json'):
        self.lemmatizer = WordNetLemmatizer()
        self.intents = self._load_intents(intents_path)
        self.pipeline = None
        self.intent_responses = {}
        self.confidence_threshold = 0.3
        self._train()

    def _load_intents(self, path):
        with open(path, 'r') as f:
            return json.load(f)

    def _preprocess(self, text):
        text = text.lower().strip()
        text = re.sub(r'[^\w\s]', '', text)
        tokens = nltk.word_tokenize(text)
        tokens = [self.lemmatizer.lemmatize(t) for t in tokens]
        return ' '.join(tokens)

    def _train(self):
        training_data = []
        labels = []

        for intent in self.intents['intents']:
            tag = intent['tag']
            self.intent_responses[tag] = intent['responses']

            for pattern in intent['patterns']:
                processed = self._preprocess(pattern)
                training_data.append(processed)
                labels.append(tag)

        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(
                ngram_range=(1, 2),
                max_features=5000,
                sublinear_tf=True
            )),
            ('clf', MultinomialNB(alpha=0.1))
        ])

        self.pipeline.fit(training_data, labels)
        print(f"NLP Engine trained on {len(training_data)} patterns across {len(self.intent_responses)} intents")

    def predict_intent(self, text):
        processed = self._preprocess(text)
        probabilities = self.pipeline.predict_proba([processed])[0]
        max_idx = np.argmax(probabilities)
        confidence = probabilities[max_idx]
        intent = self.pipeline.classes_[max_idx]

        top_intents = []
        sorted_indices = np.argsort(probabilities)[::-1][:3]
        for idx in sorted_indices:
            top_intents.append({
                'intent': self.pipeline.classes_[idx],
                'confidence': round(float(probabilities[idx]), 4)
            })

        return {
            'intent': intent if confidence >= self.confidence_threshold else 'fallback',
            'confidence': round(float(confidence), 4),
            'top_intents': top_intents
        }

    def get_response(self, text):
        prediction = self.predict_intent(text)
        intent = prediction['intent']
        responses = self.intent_responses.get(intent, self.intent_responses['fallback'])
        response = random.choice(responses)

        return {
            'response': response,
            'intent': intent,
            'confidence': prediction['confidence'],
            'top_intents': prediction['top_intents']
        }

    def extract_entities(self, text):
        entities = []
        text_lower = text.lower()

        lang_patterns = {
            'programming_language': [
                'python', 'javascript', 'java', 'c\\+\\+', 'c#', 'ruby', 'go',
                'rust', 'typescript', 'swift', 'kotlin', 'php', 'sql', 'r',
                'scala', 'perl', 'matlab', 'dart', 'lua'
            ],
            'framework': [
                'react', 'angular', 'vue', 'django', 'flask', 'spring',
                'express', 'node\\.js', 'nodejs', 'tensorflow', 'pytorch',
                'next\\.js', 'nextjs', 'svelte', 'fastapi', 'laravel'
            ],
            'concept': [
                'machine learning', 'deep learning', 'artificial intelligence',
                'neural network', 'nlp', 'computer vision', 'blockchain',
                'cloud computing', 'devops', 'microservices', 'api',
                'database', 'algorithm', 'data structure'
            ]
        }

        for entity_type, patterns in lang_patterns.items():
            for pattern in patterns:
                if re.search(r'\b' + pattern + r'\b', text_lower):
                    match = re.search(r'\b' + pattern + r'\b', text_lower)
                    entities.append({
                        'type': entity_type,
                        'value': match.group(),
                        'start': match.start(),
                        'end': match.end()
                    })

        return entities

    def analyze(self, text):
        result = self.get_response(text)
        result['entities'] = self.extract_entities(text)
        result['preprocessed'] = self._preprocess(text)

        words = text.split()
        result['metadata'] = {
            'word_count': len(words),
            'char_count': len(text),
        }

        return result
