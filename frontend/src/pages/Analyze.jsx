import { useState } from 'react'

const API_BASE = '/api'

const sampleTexts = [
  'What is machine learning and how does it work?',
  'Tell me about React and Node.js',
  'How to prepare for software engineering interviews?',
  'Explain the difference between a stack and a queue',
  'Hello! How are you doing today?',
]

export default function Analyze() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = async (input) => {
    const t = input || text.trim()
    if (!t) return

    setLoading(true)
    setError(null)
    setText(t)

    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: t }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setError('Failed to connect to backend. Make sure the server is running on port 5200.')
    }

    setLoading(false)
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.7) return 'text-green-400'
    if (confidence >= 0.4) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getConfidenceBarColor = (confidence) => {
    if (confidence >= 0.7) return 'bg-green-500'
    if (confidence >= 0.4) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Text Analysis</h1>
        <p className="text-gray-400">Enter any text to see how the NLP pipeline processes it</p>
      </div>

      {/* Input */}
      <div className="glass rounded-3xl p-8 mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-primary outline-none resize-none mb-4"
        />

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => analyze()}
            disabled={!text.trim() || loading}
            className="btn-glow px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>

          <div className="text-xs text-gray-500">Try a sample:</div>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((s, i) => (
              <button
                key={i}
                onClick={() => analyze(s)}
                disabled={loading}
                className="glass px-3 py-1.5 rounded-full text-xs text-gray-400 hover:text-white hover:border-primary/50 transition-all disabled:opacity-50"
              >
                {s.length > 40 ? s.slice(0, 40) + '...' : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-8">
          {/* Intent & Confidence */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Predicted Intent</h3>
              <div className="text-3xl font-bold text-white mb-2 capitalize">{result.intent}</div>
              <div className={`text-lg font-mono ${getConfidenceColor(result.confidence)}`}>
                {(result.confidence * 100).toFixed(1)}% confidence
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Response</h3>
              <p className="text-gray-200 text-sm leading-relaxed">{result.response}</p>
            </div>
          </div>

          {/* Top Intents */}
          {result.top_intents && (
            <div className="glass rounded-3xl p-8">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Top Intent Predictions</h3>
              <div className="space-y-4">
                {result.top_intents.map((ti, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-28 text-sm text-gray-300 capitalize font-medium">{ti.intent}</div>
                    <div className="flex-1 bg-white/5 rounded-full h-3">
                      <div
                        className={`${getConfidenceBarColor(ti.confidence)} rounded-full h-3 transition-all`}
                        style={{ width: `${Math.max(ti.confidence * 100, 2)}%` }}
                      />
                    </div>
                    <div className={`w-16 text-right text-sm font-mono ${getConfidenceColor(ti.confidence)}`}>
                      {(ti.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entities */}
          <div className="glass rounded-3xl p-8">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Extracted Entities</h3>
            {result.entities && result.entities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.entities.map((entity, i) => (
                  <div key={i} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white font-medium text-sm">{entity.value}</span>
                    <span className="text-gray-500 text-xs ml-2">{entity.type.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No entities detected</p>
            )}
          </div>

          {/* Preprocessing */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Preprocessing</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Original</div>
                  <div className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 font-mono">{text}</div>
                </div>
                <div className="flex justify-center text-gray-500">↓</div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">After Preprocessing</div>
                  <div className="px-3 py-2 bg-white/5 rounded-lg text-sm text-primary-light font-mono">{result.preprocessed}</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Metadata</h3>
              {result.metadata && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl text-center">
                    <div className="text-2xl font-bold text-white">{result.metadata.word_count}</div>
                    <div className="text-xs text-gray-500">Words</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl text-center">
                    <div className="text-2xl font-bold text-white">{result.metadata.char_count}</div>
                    <div className="text-xs text-gray-500">Characters</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
