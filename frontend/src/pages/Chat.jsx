import { useState, useRef, useEffect } from 'react'

const API_BASE = '/api'

const quickReplies = [
  'What is AI?',
  'Tell me a joke',
  'What can you do?',
  'Explain machine learning',
  'Fun fact',
  'What is React?',
]

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm LinguaBot 🤖 Ask me about programming, AI, data structures, or just have a chat!",
      analysis: null,
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
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

    setMessages(prev => [...prev, { role: 'user', text: msg, analysis: null }])
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
        {
          role: 'bot',
          text: data.response,
          analysis: data.analysis,
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: "Sorry, I couldn't connect to the server. Make sure the backend is running on port 5200.",
          analysis: null,
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
    setMessages([
      {
        role: 'bot',
        text: "Chat cleared! How can I help you?",
        analysis: null,
      },
    ])
    fetch(`${API_BASE}/history/web-client`, { method: 'DELETE' }).catch(() => {})
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-white">Chat</h1>
          <div className={`w-2 h-2 rounded-full ${backendOnline === true ? 'bg-green-500' : backendOnline === false ? 'bg-red-500' : 'bg-yellow-500'}`} />
          <span className="text-xs text-gray-500">
            {backendOnline === true ? 'Online' : backendOnline === false ? 'Offline' : 'Checking...'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showAnalysis ? 'bg-primary/20 text-primary-light' : 'bg-surface-lighter text-gray-400'
            }`}
          >
            {showAnalysis ? 'Hide' : 'Show'} Analysis
          </button>
          <button
            onClick={clearChat}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-lighter text-gray-400 hover:text-white transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-user-bubble text-white rounded-br-sm'
                    : 'bg-bot-bubble text-gray-200 rounded-bl-sm border border-surface-lighter'
                }`}
              >
                {msg.text}
              </div>

              {showAnalysis && msg.analysis && (
                <div className="mt-2 p-3 bg-surface-light/50 rounded-xl border border-surface-lighter text-xs space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary/20 text-primary-light">
                      Intent: {msg.analysis.intent}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-accent/20 text-accent">
                      Confidence: {(msg.analysis.confidence * 100).toFixed(1)}%
                    </span>
                  </div>

                  {msg.analysis.top_intents && (
                    <div className="space-y-1">
                      <div className="text-gray-500">Top Predictions:</div>
                      {msg.analysis.top_intents.map((ti, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="flex-1 bg-surface-lighter rounded-full h-1.5">
                            <div
                              className="bg-primary-light rounded-full h-1.5"
                              style={{ width: `${ti.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-gray-400 w-24 text-right">{ti.intent}</span>
                          <span className="text-gray-500 w-12 text-right">{(ti.confidence * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.analysis.entities && msg.analysis.entities.length > 0 && (
                    <div>
                      <div className="text-gray-500 mb-1">Entities:</div>
                      <div className="flex flex-wrap gap-1">
                        {msg.analysis.entities.map((e, j) => (
                          <span key={j} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                            {e.value} ({e.type})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-gray-500">
                    Preprocessed: <span className="text-gray-400 font-mono">{msg.analysis.preprocessed}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="bg-bot-bubble border border-surface-lighter px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="flex flex-wrap gap-2 mb-3">
        {quickReplies.map(q => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={isTyping}
            className="px-3 py-1.5 rounded-full text-xs bg-surface-light border border-surface-lighter text-gray-400 hover:text-white hover:border-primary/50 transition-all disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isTyping}
          className="flex-1 bg-surface-light border border-surface-lighter rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-primary outline-none transition-colors disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
          className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}
