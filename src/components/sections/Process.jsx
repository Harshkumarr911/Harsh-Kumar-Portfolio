import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { processSteps } from '../../data/content.js'
import SectionHeading from '../layout/SectionHeading.jsx'

const cardLayout = [
  { top: '2%', left: '4%', rotate: -4 },
  { top: '14%', left: '54%', rotate: 3 },
  { top: '46%', left: '18%', rotate: -2 },
  { top: '62%', left: '58%', rotate: 4 },
]

function ProcessCard({ step, index }) {
  const ref = useRef(null)
  const isActive = useInView(ref, { margin: '-40% 0px -40% 0px' })
  const layout = cardLayout[index]

  return (
    <motion.div
      ref={ref}
      style={{ top: layout.top, left: layout.left }}
      animate={{ rotate: isActive ? 0 : layout.rotate, scale: isActive ? 1.04 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`absolute w-[280px] rounded-2xl border p-6 transition-colors duration-500 ${
        isActive
          ? 'bg-mint text-ink border-mint shadow-[0_0_50px_rgba(127,231,196,0.35)]'
          : 'bg-panel text-paper border-line'
      }`}
    >
      <div className={`font-mono text-[12px] mb-2 ${isActive ? 'text-ink/60' : 'text-slate'}`}>
        {step.num}
      </div>
      <h3 className="font-serif text-[21px] font-semibold mb-2">{step.title}</h3>
      <p className={`text-[13.5px] leading-[1.6] ${isActive ? 'text-ink/80' : 'text-paperDim'}`}>
        {step.text}
      </p>
    </motion.div>
  )
}

function ProcessCardMobile({ step }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-6">
      <div className="font-mono text-[12px] text-slate mb-2">{step.num}</div>
      <h3 className="font-serif text-[20px] font-semibold mb-2">{step.title}</h3>
      <p className="text-[13.5px] leading-[1.6] text-paperDim">{step.text}</p>
    </div>
  )
}

export default function Process() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 80%', 'end 40%'] })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="bg-ink py-[120px]">
      <SectionHeading word="PROCESS" crumb="My Process" title="How I Work" />
      <div className="wrap">
        <div className="max-w-[640px] mb-16">
          <div className="eyebrow mb-4">PROCESS</div>
          <h2
            className="font-serif font-medium leading-[1.05]"
            style={{ fontSize: 'clamp(32px,4.6vw,54px)' }}
          >
            Here's how I turn ideas into systems that ship.
          </h2>
          <p className="text-slate text-[14.5px] leading-[1.6] mt-5">
            A structured, load-tested approach for turning a spec into a full-stack application
            that still behaves correctly when real traffic hits it.
          </p>
        </div>

        {/* Desktop: staggered cards with an animated connector path */}
        <div ref={containerRef} className="relative hidden md:block" style={{ height: 620 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 620" preserveAspectRatio="none">
            <motion.path
              d="M170,110 C 380,20 470,180 660,210 C 520,270 360,300 340,380 C 520,430 620,450 780,520"
              stroke="#7fe7c4"
              strokeWidth="2"
              strokeDasharray="7 9"
              fill="none"
              style={{ pathLength, opacity: 0.7 }}
            />
          </svg>

          {processSteps.map((step, i) => (
            <ProcessCard key={step.num} step={step} index={i} />
          ))}

          <motion.div
            initial={{ opacity: 0, rotate: -6, y: 10 }}
            whileInView={{ opacity: 1, rotate: -6, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute font-hand text-mint text-[26px]"
            style={{ top: '58%', left: '4%' }}
          >
            Shipped, not just demoed.
          </motion.div>
        </div>

        {/* Mobile: simple vertical stack */}
        <div className="grid grid-cols-1 gap-5 md:hidden">
          {processSteps.map((step) => (
            <ProcessCardMobile key={step.num} step={step} />
          ))}
          <div className="font-hand text-mint text-[24px] pl-1">Shipped, not just demoed.</div>
        </div>
      </div>
    </section>
  )
}
