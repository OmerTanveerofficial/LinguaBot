import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  {
    icon: '💬',
    title: 'Intelligent Chat',
    description: 'Have natural conversations powered by NLP intent classification and entity recognition.',
    link: '/chat',
  },
  {
    icon: '🔍',
    title: 'Text Analysis',
    description: 'Analyze any text to see intent prediction, confidence scores, entities, and preprocessing steps.',
    link: '/analyze',
  },
  {
    icon: '🧠',
    title: 'NLP Pipeline',
    description: 'TF-IDF vectorization + Naive Bayes classification with lemmatization and entity extraction.',
  },
  {
    icon: '📊',
    title: 'Confidence Scores',
    description: 'See how confident the model is about each prediction with top-3 intent rankings.',
  },
  {
    icon: '🏷️',
    title: 'Entity Extraction',
    description: 'Automatically detects programming languages, frameworks, and CS concepts mentioned in text.',
  },
  {
    icon: '⚡',
    title: 'Real-Time Processing',
    description: 'Instant responses with preprocessing visualization and metadata analysis.',
  },
]

const techStack = [
  { name: 'Python', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'NLTK', category: 'NLP' },
  { name: 'Scikit-learn', category: 'ML' },
  { name: 'TF-IDF', category: 'NLP' },
  { name: 'Naive Bayes', category: 'ML' },
  { name: 'React', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🤖</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-light via-accent to-primary-light bg-clip-text text-transparent">
                LinguaBot
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4">
              NLP-Powered Intelligent Chatbot
            </p>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto">
              A chatbot built with Natural Language Processing, featuring intent classification,
              entity extraction, and real-time text analysis. Powered by TF-IDF and Naive Bayes.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/chat"
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all no-underline"
              >
                Start Chatting
              </Link>
              <Link
                to="/analyze"
                className="px-8 py-3 border border-surface-lighter rounded-xl text-gray-300 font-semibold hover:bg-surface-lighter/50 transition-all no-underline"
              >
                Try Text Analysis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-surface-light rounded-2xl border border-surface-lighter hover:border-primary/30 transition-all"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
              {feature.link && (
                <Link to={feature.link} className="text-primary-light text-sm mt-3 inline-block no-underline hover:underline">
                  Try it →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map(tech => (
            <div
              key={tech.name}
              className="px-4 py-2 bg-surface-light rounded-xl border border-surface-lighter text-sm"
            >
              <span className="text-white font-medium">{tech.name}</span>
              <span className="text-gray-500 ml-2">{tech.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
        <div className="space-y-6">
          {[
            { step: '1', title: 'Preprocessing', desc: 'Text is lowercased, tokenized, and lemmatized using NLTK to normalize input.' },
            { step: '2', title: 'Feature Extraction', desc: 'TF-IDF vectorizer converts text to numerical features with unigram and bigram support.' },
            { step: '3', title: 'Intent Classification', desc: 'Multinomial Naive Bayes classifier predicts the intent with confidence scores.' },
            { step: '4', title: 'Entity Extraction', desc: 'Pattern matching identifies programming languages, frameworks, and CS concepts.' },
            { step: '5', title: 'Response Generation', desc: 'Matched intent selects an appropriate response from the knowledge base.' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start p-4 bg-surface-light rounded-xl border border-surface-lighter"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-light font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-surface-lighter text-center text-gray-500 text-sm">
        <p>LinguaBot - NLP-powered chatbot for intelligent conversations</p>
      </footer>
    </div>
  )
}
