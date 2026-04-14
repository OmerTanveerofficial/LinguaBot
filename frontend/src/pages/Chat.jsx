import { useState, useRef, useEffect } from 'react'

const API_BASE = '/api'

const quickReplies = [
  'What is AI?',
  'Explain machine learning',
  'What is React?',
  'Fun fact',
  'What can you do?',
]

function timestamp() {
  const d = new Date()
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="dot w-1 h-1 rounded-full bg-ink-soft" />
      <span className="dot w-1 h-1 rounded-full bg-ink-soft" />
      <span className="dot w-1 h-1 rounded-full bg-ink-soft" />
    </div>
  )
}

function MessageAnalysis({ analysis }) {
  if (!analysis) return null
  return (
    <div className="footnote mt-3 pl-4 border-l-2 border-accent-soft max-w-2xl">
      Intent{' '}
      <span className="mono not-italic text-ink text-[12px]">{analysis.intent}</span>
      {' · '}
      <span className="mono not-italic text-ink text-[12px]">
        {(analysis.confidence * 100).toFixed(1)}%
      </span>
      {analysis.entities?.length > 0 && (
        <>
          {' · entities '}
          <span className="mono not-italic text-ink text-[12px]">
            {analysis.entities.map(e => e.value).join(', ')}
          </span>
        </>
      )}
      {analysis.preprocessed && (
        <div className="mt-1 mono not-italic text-ink-faded text-[11px]">
          ↳ preprocessed: {analysis.preprocessed}
        </div>
      )}
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi — I'm LinguaBot. Ask me about programming, machine learning, data structures, or anything on your mind.",
      analysis: null,
      time: timestamp(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(true)
  const [backendOnline, setBackendOnline] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(r => r.json())
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false))
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return

    setMessages(prev => [...prev, { role: 'user', text: msg, analysis: null, time: timestamp() }])
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, session_id: 'web-client' }),
      })
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: data.response, analysis: data.analysis, time: timestamp() },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: "I couldn't reach the server — make sure the backend is running on port 5200.",
          analysis: null,
          time: timestamp(),
        },
      ])
    }

    setIsTyping(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{
      role: 'bot',
      text: 'Chat cleared. How can I help you?',
      analysis: null,
      time: timestamp(),
    }])
    fetch(`${API_BASE}/history/web-client`, { method: 'DELETE' }).catch(() => {})
  }

  const statusLabel =
    backendOnline === null ? 'checking' :
    backendOnline ? 'online' : 'offline'

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 flex flex-col h-[calc(100vh-56px)]">
      {/* Header */}
      <header className="pt-8 pb-6 border-b border-rule flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="label mb-2">Dialogue</p>
          <h1 className="display text-3xl text-ink">Conversation</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 dateline">
            <span className={`w-1 h-1 rounded-full ${backendOnline ? 'bg-ok' : backendOnline === false ? 'bg-danger' : 'bg-ink-faded'}`} />
            <span>{statusLabel}</span>
          </div>
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="btn-ghost"
          >
            {showAnalysis ? 'Hide' : 'Show'} analysis
          </button>
          <button onClick={clearChat} className="btn-ghost">
            Clear
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-8 space-y-8">
        {messages.map((msg, i) => (
          msg.role === 'user' ? (
            <div key={i} className="flex justify-end fade-in">
              <div className="max-w-[75%]">
                <p className="dateline text-right mb-1.5">you · {msg.time}</p>
                <div className="bg-ink text-paper px-4 py-2.5 inline-block" style={{ borderRadius: '2px' }}>
                  <p className="text-[14.5px] leading-relaxed text-paper">{msg.text}</p>
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className="fade-in">
              <p className="dateline mb-1.5">LinguaBot · {msg.time}</p>
              <p className="prose text-[17px] text-ink max-w-2xl">{msg.text}</p>
              {showAnalysis && <MessageAnalysis analysis={msg.analysis} />}
            </div>
          )
        ))}

        {isTyping && (
          <div className="fade-in">
            <p className="dateline mb-1.5">LinguaBot · thinking</p>
            <TypingDots />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies + Input */}
      <div className="py-5 border-t border-rule">
        <div className="flex flex-wrap gap-2 mb-4">
          {quickReplies.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={isTyping}
              className="btn-ghost"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message…"
            disabled={isTyping}
            aria-label="Message"
            className="field-serif flex-1"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="btn-primary shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
