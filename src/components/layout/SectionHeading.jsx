import React from 'react'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * The oversized outlined word sits behind the breadcrumb + title, cropped
 * by the section's overflow-hidden wrapper — same move as the reference
 * ("ABOUT" bleeding off both edges behind "ABOUT ME").
 */
export default function SectionHeading({ word, crumb, title }) {
  const bgSize = Math.max(70, Math.min(260, 1500 / word.length))

  return (
    <div className="relative overflow-hidden select-none mb-14 md:mb-16 -mt-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span
          className="font-serif font-black uppercase whitespace-nowrap"
          style={{
            fontSize: `${bgSize}px`,
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(127,231,196,0.12)',
          }}
        >
          {word}
        </span>
      </div>

      <div className="relative z-10 pt-10 pb-2">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 font-mono text-[11.5px] tracking-[0.12em] text-slate uppercase mb-4"
        >
          <span>Home</span>
          <ChevronRight size={12} className="text-mint" />
          <span className="text-amber">{crumb}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-sans font-extrabold uppercase tracking-tight text-paper text-center"
          style={{ fontSize: 'clamp(30px,5vw,52px)' }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  )
}