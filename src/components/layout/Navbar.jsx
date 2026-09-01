import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Volume2, VolumeX, MapPin } from 'lucide-react'
import { navLinks, profile } from '../../data/content.js'
import { useSound } from '../../context/SoundContext.jsx'

export default function Navbar() {
  const [active, setActive] = useState('about')
  const [open, setOpen] = useState(false)
  const { enabled, toggle } = useSound()

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div className="wrap flex items-center justify-between py-5">
        <div className="flex items-center gap-2 font-mono text-[12.5px] text-paperDim">
          <MapPin size={13} className="opacity-80" />
          {profile.location}
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-[rgba(15,22,38,0.55)] border border-white/10 backdrop-blur-md rounded-full px-2 py-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-4 py-1.5 rounded-full font-mono text-[12px] tracking-wide transition-colors ${
                active === link.id ? 'bg-mint text-ink' : 'text-paperDim hover:text-paper'
              }`}
              data-cursor="link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggle}
            aria-label="Toggle sound"
            title="Toggle UI sound"
            className="w-[38px] h-[38px] rounded-full border flex items-center justify-center transition-colors"
            style={{
              borderColor: enabled ? '#7fe7c4' : 'rgba(233,231,222,0.12)',
              color: enabled ? '#7fe7c4' : '#f2efe6',
              background: 'rgba(15,22,38,0.5)',
            }}
            data-cursor="link"
          >
            {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            className="md:hidden w-[38px] h-[38px] rounded-full border border-white/10 bg-[rgba(15,22,38,0.5)] flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            data-cursor="link"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-5 mb-3 rounded-2xl border border-white/10 bg-ink2/95 backdrop-blur-md overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-6 py-4 font-mono text-[13px] border-b border-white/5 last:border-b-0 ${
                  active === link.id ? 'text-mint' : 'text-paperDim'
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
