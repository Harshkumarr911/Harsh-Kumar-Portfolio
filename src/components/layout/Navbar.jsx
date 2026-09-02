import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Volume2, VolumeX, MapPin } from 'lucide-react'
import { navLinks, profile } from '../../data/content.js'
import { useSound } from '../../context/SoundContext.jsx'

export default function Navbar() {
  const [active, setActive] = useState('about')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pt-4 px-4 md:px-8 transition-all duration-300">
      <div className={`wrap flex items-center justify-between py-3 px-5 rounded-full border transition-all duration-500 ${
  scrolled
    ? 'bg-[#080b13]/60 border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
    : 'bg-[#080b13]/20 border-white/5 backdrop-blur-md'
}`}>
        <div className="flex items-center gap-2 font-mono text-[12.5px] text-paperDim">
          <MapPin size={13} className="opacity-80" />
          {profile.location}
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0f1626]/40 border border-white/10 backdrop-blur-xl rounded-full p-1.5 shadow-inner">
          {navLinks.map((link) => {
            // ---> CHANGE 5: Calculated isActive variable within scope to prevent scope errors
            const isActive = active === link.id
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-1.5 rounded-full font-mono text-[12px] tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'text-ink font-medium'
                    : 'text-paperDim hover:text-paper'
                }`}
                data-cursor="link"
              >
                {/* ---> CHANGE 6: Added Framer Motion layoutId pill indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-mint rounded-full -z-10 shadow-[0_0_15px_rgba(127,231,196,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            )
          })}
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
