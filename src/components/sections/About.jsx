import React from 'react'
import { motion } from 'framer-motion'
import WaveDivider from '../ui/WaveDivider.jsx'
import StatCounter from '../ui/StatCounter.jsx'
import { stats, aboutTimeline } from '../../data/content.js'
import { Section } from 'lucide-react'
import SectionHeading from '../layout/SectionHeading.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  return (
    <>
      <WaveDivider color="#0e1526" />
      <section id="about" className="bg-ink2 pt-[130px] pb-[110px]">
        <SectionHeading word="ABOUT" crumb="About Me" title="Who I Am" />
        <div className="wrap grid grid-cols-1 md:grid-cols-[1.25fr_0.85fr] gap-14 md:gap-20 items-start">
          <div>
            <div className="eyebrow mb-[22px] ">ABOUT</div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="font-serif font-normal text-paperDim leading-[1.38]"
              style={{ fontSize: 'clamp(24px,3vw,34px)' }}
            >
              Computer Science Graduated from Allenhouse Institute of Technology,
              June 2026. Most of my time goes into backend architecture — layered
              Spring Boot services, JWT security, Redis caching — and DSA, because clean code
              still has to run fast under pressure.
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1 }}
              className="font-serif font-medium text-paper leading-[1.38] mt-6"
              style={{ fontSize: 'clamp(24px,3vw,34px)' }}
            >
              I'd rather ship something that{' '}
              <em className="not-italic italic text-mint">survives 100,000 requests</em> than
              something that just looks finished in a demo.
            </motion.p>

            <div className="mt-12 border-t border-line pt-8">
              <div className="font-mono text-[11px] tracking-[0.1em] text-amber uppercase mb-5">
                My Journey
              </div>
              <ul className="space-y-4">
                {aboutTimeline.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex gap-4 text-[14px] text-paperDim"
                  >
                    <span className="font-mono text-mint w-11 flex-none">{item.year}</span>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-line rounded-xl2 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
            {stats.map((s, i) => (
              <StatCounter key={i} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>
      <WaveDivider color="#0a0e17" flip />
    </>
  )
}
