import { useState } from 'react'

const API_BASE = '/api'

const sampleTexts = [
  'What is machine learning and how does it work?',
  'Tell me about React and Node.js',
  'Explain the difference between a stack and a queue',
  'Hello! How are you doing today?',
]

function confidenceTint(c) {
  if (c >= 0.7) return 'text-ok'
  if (c >= 0.4) return 'text-warn'
  return 'text-danger'
}

function confidenceBar(c) {
  if (c >= 0.7) return 'bg-ok'
  if (c >= 0.4) return 'bg-warn'
  return 'bg-danger'
}

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
      setError('Could not reach the backend. Make sure the server is running on port 5200.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10">
      {/* Masthead */}
      <header className="pt-14 pb-8 border-b border-rule">
        <p className="label mb-4">Under the glass</p>
        <h1 className="display text-4xl md:text-5xl text-ink mb-3">Sentence analysis</h1>
        <p className="prose text-[17px] text-ink-soft max-w-2xl">
          Paste a sentence. See how the model preprocesses it, which intent it chooses,
          what entities it notices, and how sure it is.
        </p>
      </header>

      {/* Input */}
      <section className="py-8 border-b border-rule">
        <label className="label block mb-3" htmlFor="analyze-input">Your sentence</label>
        <textarea
          id="analyze-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something the model can read…"
          rows={3}
          className="field-serif"
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button onClick={() => analyze()} disabled={!text.trim() || loading} className="btn-primary">
            {loading ? 'Analyzing…' : 'Analyze'}
          </button>
          <span className="dateline mx-2">or try</span>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((s, i) => (
              <button key={i} onClick={() => analyze(s)} disabled={loading} className="btn-ghost">
                {s.length > 38 ? s.slice(0, 38) + '…' : s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="footnote mt-4 text-danger">{error}</p>
        )}
      </section>

      {/* Report */}
      {result && (
        <section className="py-10 space-y-10">
          {/* Verdict */}
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 pb-8 border-b border-rule">
            <div>
              <p className="label mb-2">Predicted intent</p>
              <p className="display text-4xl text-ink capitalize">{result.intent}</p>
              <p className={`mono text-sm mt-2 ${confidenceTint(result.confidence)}`}>
                {(result.confidence * 100).toFixed(1)}% confidence
              </p>
            </div>
            <div>
              <p className="label mb-2">Response</p>
              <p className="prose text-[17px] text-ink">{result.response}</p>
            </div>
          </div>

          {/* Top intents */}
          {result.top_intents && (
            <div>
              <p className="label mb-5">Top predictions</p>
              <div className="space-y-3">
                {result.top_intents.map((ti, i) => (
                  <div key={i} className="grid grid-cols-[140px_1fr_auto] items-center gap-4">
                    <span className="serif text-ink text-[15px] capitalize">{ti.intent}</span>
                    <div className="h-[3px] bg-rule rounded-full overflow-hidden">
                      <div
                        className={`h-full ${confidenceBar(ti.confidence)}`}
                        style={{ width: `${Math.max(ti.confidence * 100, 2)}%` }}
                      />
                    </div>
                    <span className={`mono text-xs w-14 text-right ${confidenceTint(ti.confidence)}`}>
                      {(ti.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entities */}
          <div>
            <p className="label mb-4">Entities</p>
            {result.entities && result.entities.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {result.entities.map((entity, i) => (
                  <li key={i} className="px-3 py-1.5 border border-rule" style={{ borderRadius: '2px' }}>
                    <span className="serif text-ink text-[14px]">{entity.value}</span>
                    <span className="mono text-[10px] text-ink-faded ml-2">{entity.type.replace('_', ' ')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="footnote">No entities surfaced.</p>
            )}
          </div>

          {/* Preprocessing + Metadata */}
          <div className="grid md:grid-cols-2 gap-10 pt-8 border-t border-rule">
            <div>
              <p className="label mb-4">Preprocessing</p>
              <div className="space-y-3">
                <div>
                  <p className="dateline mb-1">original</p>
                  <p className="mono text-[13px] text-ink-soft leading-relaxed">{text}</p>
                </div>
                <div className="border-l-2 border-accent pl-4 py-1">
                  <p className="dateline mb-1" style={{ color: 'var(--accent)' }}>normalized</p>
                  <p className="mono text-[13px] text-ink leading-relaxed">{result.preprocessed}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="label mb-4">Measurements</p>
              {result.metadata && (
                <dl className="grid grid-cols-2 gap-6">
                  <div>
                    <dt className="dateline mb-1">words</dt>
                    <dd className="display text-4xl text-ink">{result.metadata.word_count}</dd>
                  </div>
                  <div>
                    <dt className="dateline mb-1">characters</dt>
                    <dd className="display text-4xl text-ink">{result.metadata.char_count}</dd>
                  </div>
                </dl>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="py-10 text-center">
        <p className="dateline">— fin —</p>
      </footer>
    </div>
  )
}
