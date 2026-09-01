import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import WaveDivider from '../ui/WaveDivider.jsx'
import TerminalWindow from '../ui/TerminalWindow.jsx'
import { projects } from '../../data/content.js'
import SectionHeading from '../layout/SectionHeading.jsx'

function ProjectCard({ project, reverse }) {
  return (
    
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`border border-line rounded-xl2 bg-panel overflow-hidden grid grid-cols-1 md:grid-cols-2 ${
        reverse ? 'md:[direction:rtl]' : ''
      }`}
    >
      
      <div
        className={`[direction:ltr] relative p-8 flex flex-col justify-center gap-5 min-h-[280px] ${
          reverse ? 'md:border-l' : 'md:border-r'
        } border-line border-b md:border-b-0`}
        style={{
          background:
            'radial-gradient(120% 140% at 10% 0%, rgba(127,231,196,0.10), transparent 60%), #0c1424',
        }}
      >
        <TerminalWindow lines={project.terminal} />
        <div className="flex gap-5 flex-wrap">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-serif text-2xl text-paper">{m.value}</div>
              <div className="font-mono text-[10.5px] text-slate mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="[direction:ltr] p-9 md:p-11 flex flex-col justify-center gap-4">
        <div className="font-mono text-[11px] text-slate tracking-wide">{project.period}</div>
        <h3 className="font-serif font-semibold" style={{ fontSize: 'clamp(24px,2.6vw,32px)' }}>
          {project.title}
        </h3>
        <p className="text-paperDim text-[14.5px] leading-[1.65]">{project.description}</p>
        <ul className="flex flex-col gap-2">
          {project.bullets.map((b, i) => (
            <li key={i} className="text-[13.5px] text-paperDim pl-4 relative">
              <span className="absolute left-0 text-mint">—</span>
              {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 border border-line rounded-md text-slate"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2">
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-[13.5px] font-semibold inline-flex items-center gap-1.5 border-b border-mint pb-0.5"
          >
            {project.link.label} <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <>
      <WaveDivider color="#0a0e17" flip />
      <SectionHeading word="WORK" crumb="My Work" title="Selected Projects" />
      <section id="work" className="bg-ink py-[120px]">
        
        <div className="wrap">
          <div className="flex justify-between items-end gap-7 mb-14 flex-wrap">
            <div>
              <div className="eyebrow">SELECTED WORK</div>
              <h2
                className="font-serif font-medium mt-3.5"
                style={{ fontSize: 'clamp(34px,4.4vw,56px)' }}
              >
                Three systems, three kinds of pressure.
              </h2>
            </div>
            <p className="max-w-[360px] text-slate text-[14.5px] leading-[1.6]">
              Traffic load, real-time latency, and production observability — each project leans
              on a different constraint.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} reverse={i === 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
