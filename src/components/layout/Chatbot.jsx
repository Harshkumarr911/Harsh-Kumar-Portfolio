import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'

const BOT_KNOWLEDGE = {
  skills: "I specialize in React, GSAP, Tailwind CSS, Node.js, and Java Spring Boot!",
  experience: "I have built high-performance web applications, interactive UI components, and modern full-stack platforms.",
  contact: "You can drop a mail at your-email@example.com or use the contact form below!",
  resume: "You can download my resume directly from the Hero section!"
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I am Harsh's AI Assistant. How can I help you today?" }
  ])

  const chatRef = useRef(null)

  // 1. Show Tooltip after site loads & Auto-hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 1000)

    const hideTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 6000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  // 2. Close chatbot when tapping/clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const handleOptionClick = (key) => {
    const userText = key.charAt(0).toUpperCase() + key.slice(1)
    const botReply = BOT_KNOWLEDGE[key]

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'bot', text: botReply }
    ])
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
    setShowTooltip(false) // Hide popup tooltip when clicked
  }

  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-[99] flex items-center gap-3">
      {/* SIDE TOOLTIP POPUP */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="relative bg-[#0f1626]/90 border border-mint/30 backdrop-blur-md text-paper px-3.5 py-2 rounded-xl text-xs font-mono shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-2"
          >
            <span className="text-mint font-medium">How can I help you? 👋</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-paperDim hover:text-paper ml-1"
            >
              <X size={12} />
            </button>
            {/* Pointer arrow pointing to the icon */}
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-[#0f1626]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON */}
      <button
        onClick={toggleChat}
        className="w-12 h-12 rounded-full bg-mint text-ink flex items-center justify-center shadow-[0_0_20px_rgba(127,231,196,0.3)] hover:scale-110 active:scale-95 transition-transform"
        aria-label="Toggle Assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-[#0f1626]/95 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-2xl text-paper"
          >
            <div className="border-b border-white/10 pb-2 mb-3 flex items-center justify-between">
              <h4 className="font-mono text-sm font-bold text-mint">Portfolio Assistant</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-paperDim hover:text-paper"
              >
                <X size={14} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="h-48 overflow-y-auto space-y-2 mb-3 pr-1 text-xs font-mono">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2.5 rounded-lg max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-mint/20 text-mint ml-auto text-right'
                      : 'bg-white/5 text-paperDim'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* QUICK OPTIONS */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              {Object.keys(BOT_KNOWLEDGE).map((key) => (
                <button
                  key={key}
                  onClick={() => handleOptionClick(key)}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 hover:border-mint hover:text-mint transition-colors"
                >
                  {key}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}