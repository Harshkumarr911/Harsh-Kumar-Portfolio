import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton.jsx'
import { profile } from '../../data/content.js'
import SectionHeading from '../layout/SectionHeading.jsx'

function CopyRow({ label, value, display }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="flex justify-between items-center gap-2.5 flex-wrap border-b border-dashed border-line py-2.5 last:border-b-0">
      
      <span className="text-slate">{label}</span>
      <button
        onClick={handleCopy}
        className="text-paper font-medium font-mono text-[13.5px] flex items-center gap-2"
        data-cursor="link"
      >
        {display}
        {copied ? <Check size={13} className="text-mint" /> : <Copy size={13} className="opacity-50" />}
      </button>
    </div>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="pt-[140px] pb-[60px]"
      style={{
        background:
          'radial-gradient(120% 100% at 50% 0%, #16321f 0%, #0e2434 40%, #0a1120 75%)',
      }}
    >
      <SectionHeading word="CONTACT" crumb="Contact" title="Get in touch" />
      <div className="wrap text-center max-w-[760px] mx-auto">
        <div className="eyebrow justify-center mb-[18px]">CONTACT</div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="font-serif font-medium leading-[1.06]"
          style={{ fontSize: 'clamp(38px,6vw,72px)' }}
        >
          Let's build something
          <br />
          <em className="not-italic italic text-mint">that doesn't go down.</em>
        </motion.h2>
        <p className="mt-[22px] text-paperDim text-base">
          Open to full-stack and backend developer roles —  Can relocate
          anywhere in India *
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-[46px] max-w-[640px] mx-auto text-left border border-line rounded-2xl bg-black/30 backdrop-blur-md overflow-hidden"
        >
          <div className="flex gap-1.5 px-3 py-2.5 border-b border-line">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <div className="p-[22px_24px] font-mono text-[13.5px] leading-[2.1]">
            <CopyRow label="email" value={profile.email} display={profile.email} />
            <div className="flex justify-between items-center gap-2.5 flex-wrap border-b border-dashed border-line py-2.5">
              <span className="text-slate">phone</span>
              <a href={`tel:${profile.phone}`} className="text-paper font-medium">
                {profile.phoneDisplay}
              </a>
            </div>
            <div className="flex justify-between items-center gap-2.5 flex-wrap border-b border-dashed border-line py-2.5">
              <span className="text-slate">linkedin</span>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-paper font-medium">
                {profile.links.linkedinLabel} ↗
              </a>
            </div>
            <div className="flex justify-between items-center gap-2.5 flex-wrap border-b border-dashed border-line py-2.5">
              <span className="text-slate">github</span>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-paper font-medium">
                {profile.links.githubLabel} ↗
              </a>
            </div>
            <div className="flex justify-between items-center gap-2.5 flex-wrap py-2.5">
              <span className="text-slate">leetcode</span>
              <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" className="text-paper font-medium">
                {profile.links.leetcodeLabel} ↗
              </a>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-3.5 mt-[34px] flex-wrap">
          <MagneticButton href={`mailto:${profile.email}`} variant="solid">
            Email me
          </MagneticButton>
          <MagneticButton href={`tel:${profile.phone}`} variant="ghost">
            Call me
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
