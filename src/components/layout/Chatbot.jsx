import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatTeardropText,
  X,
  PaperPlaneRight,
  ArrowUpRight,
  Sparkle,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import "../../styles/Chatbot.css";

const KNOWLEDGE_BASE = [
  {
    id: "projects",
    chip: "Projects & Benchmarks",
    keywords: ["project", "work", "athlete", "verivaan", "rescue", "job", "rps", "k6", "load"],
    reply:
      "Harsh built Athlete Arena (verified at 4,021 RPS with 0% failure in k6 using Spring Boot, Redis & MongoDB 2dsphere), Verivaan (tamper-evident audit logs & RBAC), Emergency Rescue (~40ms Socket.IO dispatch), and a Spring Security Job Portal.",
    action: { label: "Inspect Featured Projects", href: "#projects" },
  },
  {
    id: "stack",
    chip: "Tech Stack",
    keywords: ["skill", "stack", "tech", "java", "spring", "react", "redis", "sql", "mongo", "backend"],
    reply:
      "Core stack: Java, Spring Boot, Spring Security (JWT/RBAC), REST APIs, Socket.IO, React JS, MySQL, MongoDB, and Redis — backed by k6/JMeter load testing and JUnit.",
    action: { label: "View Capabilities", href: "#skills" },
  },
  {
    id: "achievements",
    chip: "GATE & Milestones",
    keywords: ["gate", "achievement", "rank", "dsa", "leetcode", "intern", "education", "college", "btech"],
    reply:
      "B.Tech CSE graduate (June 2026) from Allenhouse Institute of Technology, GATE CSE 2026 qualified (IIT Guwahati), #1 ranked capstone team lead, MERN Stack intern, and 200+ DSA problems solved.",
    action: { label: "View Verified Milestones", href: "#achievements" },
  },
  {
    id: "contact",
    chip: "Hire / Contact",
    keywords: ["contact", "email", "hire", "role", "job", "relocate", "location", "phone", "noida", "gurugram"],
    reply:
      "Open to Backend & Full-Stack Software Engineer roles and ready to relocate anywhere in India. Reach out directly at harshkumarr9251@gmail.com or +91 95556 17287.",
    action: { label: "Open Contact Seal", href: "#contact" },
  },
  {
    id: "resume",
    chip: "Resume PDF",
    keywords: ["resume", "cv", "pdf", "download"],
    reply:
      "You can view or download Harsh Kumar's latest Software Engineer resume PDF directly.",
    action: {
      label: "Open Resume PDF",
      href: "/Harsh_Kumar_Resume.pdf",
      external: true,
    },
  },
];

const INITIAL_MESSAGE = {
  id: "welcome",
  sender: "bot",
  text: "Hi — I'm Harsh's portfolio assistant. Ask about his Spring Boot systems, 4,021 RPS benchmarks, GATE 2026, or hiring availability.",
};

function resolveReply(rawInput) {
  const query = rawInput.trim().toLowerCase();
  if (!query) return null;

  const matched = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((kw) => query.includes(kw))
  );

  if (matched) {
    return {
      text: matched.reply,
      action: matched.action,
    };
  }

  return {
    text: "I can share details on Harsh's backend/full-stack projects, Java & Spring Boot stack, GATE CSE 2026 qualification, or direct contact info. Pick a topic below or ask directly.",
    action: { label: "Jump to Contact", href: "#contact" },
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const replyTimerRef = useRef(null);

  // Subtle greeting pill after initial load
  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowTooltip(true), 1400);
    const hideTimer = window.setTimeout(() => setShowTooltip(false), 6800);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  // Close on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) window.clearTimeout(replyTimerRef.current);
    };
  }, []);

  const pushConversation = (userLabel, resolved) => {
    if (!resolved) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: userLabel,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (replyTimerRef.current) window.clearTimeout(replyTimerRef.current);
    replyTimerRef.current = window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: resolved.text,
          action: resolved.action,
        },
      ]);
    }, 340);
  };

  const handleChipClick = (item) => {
    pushConversation(item.chip, {
      text: item.reply,
      action: item.action,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setInputValue("");
    pushConversation(trimmed, resolveReply(trimmed));
  };

  const handleReset = () => {
    setIsTyping(false);
    setMessages([INITIAL_MESSAGE]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setShowTooltip(false);
  };

  return (
    <div ref={chatRef} className="cb-root">
      {/* Side Greeting Pill */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 14, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="cb-tooltip"
          >
            <button
              type="button"
              className="cb-tooltip-trigger"
              onClick={toggleChat}
            >
              <Sparkle size={13} weight="fill" aria-hidden="true" />
              <span>Ask about Harsh&apos;s systems</span>
            </button>

            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="cb-tooltip-close"
              aria-label="Dismiss greeting"
            >
              <X size={12} weight="bold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        type="button"
        onClick={toggleChat}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`cb-fab ${isOpen ? "is-open" : ""}`}
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="cb-fab-icon"
            >
              <X size={20} weight="bold" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="cb-fab-icon"
            >
              <ChatTeardropText size={21} weight="fill" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Assistant Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="cb-window"
            role="dialog"
            aria-label="Harsh Kumar Portfolio Assistant"
          >
            {/* Header */}
            <div className="cb-header">
              <div className="cb-header-id">
                <span className="cb-live-dot" aria-hidden="true" />
                <div>
                  <h4 className="cb-title">Harsh · Assistant</h4>
                  <span className="cb-subtitle">Systems &amp; Hiring Guide</span>
                </div>
              </div>

              <div className="cb-header-actions">
                <button
                  type="button"
                  onClick={handleReset}
                  className="cb-icon-btn"
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  <ArrowCounterClockwise size={14} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cb-icon-btn"
                  title="Close"
                  aria-label="Close chat"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="cb-messages" role="log" aria-live="polite">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={`cb-bubble-row ${
                    msg.sender === "user" ? "is-user" : "is-bot"
                  }`}
                >
                  <div className="cb-bubble">
                    <p>{msg.text}</p>
                    {msg.action && (
                      <a
                        href={msg.action.href}
                        target={msg.action.external ? "_blank" : undefined}
                        rel={msg.action.external ? "noreferrer" : undefined}
                        onClick={() => {
                          if (!msg.action.external) setIsOpen(false);
                        }}
                        className="cb-action-link"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="cb-bubble-row is-bot">
                  <div className="cb-bubble cb-typing" aria-label="Typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="cb-chips">
              {KNOWLEDGE_BASE.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleChipClick(item)}
                  className="cb-chip"
                >
                  {item.chip}
                </button>
              ))}
            </div>

            {/* Free-Text Input Bar */}
            <form className="cb-input-bar" onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, stack, GATE..."
                aria-label="Ask a question"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="cb-send-btn"
                aria-label="Send message"
              >
                <PaperPlaneRight size={15} weight="bold" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}