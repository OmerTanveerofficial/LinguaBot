import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ChatIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
)

const BrainIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 017 7c0 2.5-1.5 4.5-3 6l-1 3h-6l-1-3c-1.5-1.5-3-3.5-3-6a7 7 0 017-7z" />
    <path strokeLinecap="round" d="M9 18h6M10 21h4" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="12" width="4" height="9" rx="1" strokeLinejoin="round" />
    <rect x="10" y="6" width="4" height="15" rx="1" strokeLinejoin="round" />
    <rect x="17" y="3" width="4" height="18" rx="1" strokeLinejoin="round" />
  </svg>
)

const TagIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M2 12V8.5a2.5 2.5 0 012.5-2.5H9l10 10-4.5 4.5L2 12z" />
  </svg>
)

const LightningIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const HeroBotIcon = () => (
  <svg className="w-16 h-16 text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="8" r="5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="3" x2="12" y2="1" strokeLinecap="round" />
    <line x1="9" y1="3.5" x2="8" y2="1.5" strokeLinecap="round" />
    <line x1="15" y1="3.5" x2="16" y2="1.5" strokeLinecap="round" />
    <circle cx="10" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="14" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
    <path d="M10 10.5c0 0 1 1 2 1s2-1 2-1" strokeLinecap="round" />
    <path d="M7 13v5a2 2 0 002 2h6a2 2 0 002-2v-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const features = [
  {
    icon: <ChatIcon />,
    title: 'Intelligent Chat',
    description: 'Have natural conversations powered by NLP intent classification and entity recognition.',
    link: '/chat',
  },
  {
    icon: <SearchIcon />,
    title: 'Text Analysis',
    description: 'Analyze any text to see intent prediction, confidence scores, entities, and preprocessing steps.',
    link: '/analyze',
  },
  {
    icon: <BrainIcon />,
    title: 'NLP Pipeline',
    description: 'TF-IDF vectorization + Naive Bayes classification with lemmatization and entity extraction.',
  },
  {
    icon: <ChartIcon />,
    title: 'Confidence Scores',
    description: 'See how confident the model is about each prediction with top-3 intent rankings.',
  },
  {
    icon: <TagIcon />,
    title: 'Entity Extraction',
    description: 'Automatically detects programming languages, frameworks, and CS concepts mentioned in text.',
  },
  {
    icon: <LightningIcon />,
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
    <div className="min-h-screen relative">
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <HeroBotIcon />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">
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
                className="btn-glow px-8 py-3 bg-gradient-to-r from-primary to-primary-dark rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all no-underline"
              >
                Start Chatting
              </Link>
              <Link
                to="/analyze"
                className="glass px-8 py-3 border border-white/10 rounded-xl text-gray-300 font-semibold hover:bg-white/5 transition-all no-underline"
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
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass card-hover p-8 rounded-3xl"
            >
              <div className="text-primary-light mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
              {feature.link && (
                <Link to={feature.link} className="text-primary-light text-sm mt-4 inline-block no-underline hover:underline">
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
        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map(tech => (
            <div
              key={tech.name}
              className="glass px-4 py-2 rounded-xl text-sm"
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
        <div className="space-y-4">
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
              className="glass flex gap-4 items-start p-4 rounded-xl"
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
      <footer className="py-8 px-4 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>LinguaBot - NLP-powered chatbot for intelligent conversations</p>
      </footer>
    </div>
  )
}
