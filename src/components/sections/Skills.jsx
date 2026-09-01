import React from 'react'
import { motion } from 'framer-motion'
import WaveDivider from '../ui/WaveDivider.jsx'
import Chip from '../ui/Chip.jsx'
import { skillGroups, beyondSkills } from '../../data/content.js'
import SectionHeading from '../layout/SectionHeading.jsx'

export default function Skills() {
  return (
    <>
      <WaveDivider color="#0e1526" />
      <section id="skills" className="bg-ink2 py-[120px]">
        <SectionHeading word="SKILLS" crumb="My Skills" title="What I Know" />
        <div className="wrap">
          <div className="flex justify-between items-end gap-7 mb-14 flex-wrap">
            <div>
              <div className="eyebrow">SKILLS</div>
              <h2
                className="font-serif font-medium mt-3.5"
                style={{ fontSize: 'clamp(34px,4.4vw,56px)' }}
              >
                What I build with.
              </h2>
            </div>
            <p className="max-w-[360px] text-slate text-[14.5px] leading-[1.6]">
              Six groups on the technical side, and a few things I've picked up leading a team
              that don't show up in a stack trace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-xl2 overflow-hidden">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="bg-panel p-[30px_26px]"
              >
                <h3 className="font-mono text-[11.5px] tracking-[0.1em] text-mint uppercase mb-4.5">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="font-mono text-[11.5px] tracking-[0.1em] text-amber uppercase mt-16 mb-6">
            Beyond the stack
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {beyondSkills.map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="border border-line rounded-2xl p-[22px] bg-ink2"
              >
                <div className="font-mono text-[11px] text-slate">{card.num}</div>
                <h4 className="font-serif font-medium text-[19px] mt-2.5 mb-2">{card.title}</h4>
                <p className="text-[13px] text-slate leading-[1.55]">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
