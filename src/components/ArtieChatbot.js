import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const OLLAMA_URL = process.env.GATSBY_OLLAMA_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.GATSBY_OLLAMA_MODEL || 'gemma3:12b'
const CHAT_ENDPOINT = `${OLLAMA_URL}/api/chat`

const SYSTEM_PROMPT_EN = `You are Artie, a friendly assistant for "Logopedi për Fëmijë" — a children's speech therapy clinic. Your role is to listen empathetically to parents' concerns about their child's speech and language, offer a couple of simple practical tips, and guide them toward booking a professional evaluation.

**Your approach:**
- Acknowledge the parent's concern warmly.
- Offer 1 to 2 simple, practical tips they can try at home — keep them brief and jargon-free.
- Do not provide detailed clinical diagnoses or lengthy therapy programs.
- Your underlying goal is to encourage parents to book a consultation with this clinic. Naturally weave this in when it feels appropriate — not in every message, but often enough to guide them toward it.

**Mandatory disclaimer on every response:**
"Please note: I am an AI bot, not a healthcare provider. This information is for educational purposes only. For specialized, clinical advice or a formal diagnosis, please contact a licensed Speech-Language Pathologist in your area."

Respond in English.`

const SYSTEM_PROMPT_SQ = `You are Artie, a friendly assistant for "Logopedi për Fëmijë" — a children's speech therapy clinic. Your role is to listen empathetically to parents' concerns about their child's speech and language, offer a couple of simple practical tips, and guide them toward booking a professional evaluation.

**Your approach:**
- Acknowledge the parent's concern warmly.
- Offer 1 to 2 simple, practical tips they can try at home — keep them brief and jargon-free.
- Do not provide detailed clinical diagnoses or lengthy therapy programs.
- Your underlying goal is to encourage parents to book a consultation with this clinic. Naturally weave this in when it feels appropriate — not in every message, but often enough to guide them toward it.

**Mandatory disclaimer on every response:**
"Ju lutemi vini re: Jam një bot AI, jo një ofrues kujdesi shëndetësor. Ky informacion është vetëm për qëllime arsimore. Për këshilla klinike të specializuara ose një diagnozë zyrtare, ju lutemi kontaktoni një Patolog të Gjuhës dhe të Folurit me licencë në zonën tuaj."

**Language instructions — this is critical:**
You MUST respond entirely in standard Albanian (Gjuha Shqipe), regardless of what language the user writes in. Even if the user writes in English or any other language, always reply in Albanian. This is the primary language of the clinic and your responses will be read by Albanian-speaking parents. You must:
- Use correct Albanian grammar, morphology, and sentence structure at all times.
- Use natural, warm, everyday Albanian — not word-for-word translations from English.
- Never mix in English words or phrases unless there is truly no Albanian equivalent.
- If unsure of the correct Albanian phrasing, choose simpler wording rather than risk an unnatural or incorrect expression.
- Prefer standard Albanian (Gjuha Standarde Shqipe) — avoid regional dialects.`

const styles = {
  toggleButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(52,152,219,0.4)',
    zIndex: 1000,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  panel: {
    position: 'fixed',
    bottom: '92px',
    right: '24px',
    width: '380px',
    height: '500px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0 16px',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: '16px',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '18px 18px 4px 18px',
    maxWidth: '80%',
    fontSize: '14px',
    lineHeight: '1.45',
    wordBreak: 'break-word',
  },
  artieBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    padding: '10px 14px',
    borderRadius: '18px 18px 18px 4px',
    maxWidth: '85%',
    fontSize: '14px',
    lineHeight: '1.45',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  inputBar: {
    borderTop: '1px solid #ddd',
    padding: '10px 12px',
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    border: '1px solid #ddd',
    borderRadius: '20px',
    padding: '8px 14px',
    fontSize: '14px',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
  },
  sendButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flexShrink: 0,
  },
  sendButtonDisabled: {
    backgroundColor: '#aaa',
    cursor: 'not-allowed',
  },
}

function DotsIndicator() {
  return (
    <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#999',
            display: 'inline-block',
            animation: 'artieDotPulse 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  )
}

export default function ArtieChatbot() {
  const { language, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Inject keyframe animation once
  useEffect(() => {
    if (typeof document === 'undefined') return
    const id = 'artie-dot-pulse-style'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = `
        @keyframes artieDotPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 420px) {
          .artie-panel { width: calc(100vw - 24px) !important; right: 12px !important; }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  // Pre-load greeting on first open
  useEffect(() => {
    if (isOpen && !greeted) {
      setMessages([{ role: 'assistant', content: t('artieGreeting') }])
      setGreeted(true)
    }
  }, [isOpen, greeted, t])

  // Reset greeting when language changes so next open shows correct language
  useEffect(() => {
    if (greeted) {
      setGreeted(false)
      setMessages([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const systemMessage = {
    role: 'system',
    content: language === 'sq' ? SYSTEM_PROMPT_SQ : SYSTEM_PROMPT_EN,
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isStreaming) return

    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsStreaming(true)

    // Placeholder for streaming assistant response
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages: [systemMessage, ...updatedMessages],
          stream: true,
        }),
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(Boolean)
        for (const line of lines) {
          try {
            const data = JSON.parse(line)
            if (data.message?.content) {
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + data.message.content,
                }
                return updated
              })
            }
          } catch {
            // skip malformed JSON lines
          }
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: t('artieError'),
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const panelStyle = {
    ...styles.panel,
  }

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div style={panelStyle} className="artie-panel">
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.headerTitle}>{t('artieTitle')}</span>
            <button
              style={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={styles.messageList}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={msg.role === 'user' ? styles.userBubble : styles.artieBubble}
              >
                {msg.role === 'assistant' && msg.content === '' && isStreaming
                  ? <DotsIndicator />
                  : msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div style={styles.inputBar}>
            <textarea
              ref={inputRef}
              rows={1}
              style={styles.input}
              placeholder={t('artiePlaceholder')}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
            />
            <button
              style={{
                ...styles.sendButton,
                ...(isStreaming || !input.trim() ? styles.sendButtonDisabled : {}),
              }}
              onClick={sendMessage}
              disabled={isStreaming || !input.trim()}
            >
              {t('artieSend')}
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        style={styles.toggleButton}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat with Artie'}
      >
        {/* Speech bubble icon */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
            fill="white"
          />
        </svg>
      </button>
    </>
  )
}
