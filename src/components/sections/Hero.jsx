import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from '../ui/Icons.jsx'
import '../../styles/portfolio.css'

const EASE = [0.76, 0, 0.24, 1]

/* Optional: transparent PNG cutout of yourself.
   import photo from '../../assets/harsh-cutout.png'  →  const PHOTO = photo */
const PHOTO = null

const PROJECTS = [
  {
    n: '01',
    short: 'Emergency Rescue',
    title: 'Emergency Rescue Platform',
    tag: 'Real-time',
    sub: 'Spring Boot · Socket.IO · React',
    desc: 'Real-time campus emergency dispatch. Spring Boot backend, live updates over Socket.IO, React frontend.',
    art: 'radar',
  },
  {
    n: '02',
    short: 'Athlete Arena',
    title: 'Athlete Arena',
    tag: 'Final year project',
    sub: 'Sports training platform',
    desc: 'All-in-one sports training platform.',
    art: 'diamond',
  },
  {
    n: '03',
    short: 'Log Monitoring',
    title: 'Log Monitoring & Alerting',
    tag: 'Observability',
    sub: 'Java full-stack',
    desc: 'Distributed log monitoring and alerting system, built as a Java full-stack project.',
    art: 'bars',
  },
]

/* ───────── masked line reveal ───────── */
function Line({ children, delay = 0 }) {
  return (
    <span className="hk-line">
      <motion.span
        initial={{ y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* ───────── flowing ribbon (decorative) ───────── */
const ribbon = (o, s) => {
  const a = s ? 50 : 0
  const b = s ? -40 : 0
  return `M-40 ${560 + o} C 200 ${420 + a + o}, 380 ${660 + b + o}, 580 ${500 + a + o} S 900 ${
    210 + b + o
  }, 1460 ${40 + o} L 1460 ${200 + o} C 1000 ${340 + a + o}, 760 ${640 + b + o}, 560 ${
    660 + o
  } S 180 ${740 + a + o}, -40 ${700 + o} Z`
}
const strand = (i, s) => {
  const a = s ? 50 : 0
  const b = s ? -40 : 0
  const o = i * 9
  return `M-40 ${610 + o} C 200 ${470 + a + o}, 380 ${710 + b + o}, 580 ${550 + a + o} S 900 ${
    260 + b + o
  }, 1460 ${90 + o}`
}

function Ribbon() {
  const loop = (fn, dur) => ({
    initial: { d: fn(0) },
    animate: { d: [fn(0), fn(1), fn(0)] },
    transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' },
  })
  return (
    <svg className="hk-ribbon" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="hk-r1" x1="0" x2="1">
          <stop offset="0" stopColor="#5b3fd6" stopOpacity=".05" />
          <stop offset=".45" stopColor="#7a5cff" stopOpacity=".75" />
          <stop offset="1" stopColor="#b9a6ff" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="hk-r2" x1="0" x2="1">
          <stop offset="0" stopColor="#e8482b" stopOpacity=".05" />
          <stop offset=".5" stopColor="#ff7a55" stopOpacity=".65" />
          <stop offset="1" stopColor="#ffb38a" stopOpacity=".45" />
        </linearGradient>
        <linearGradient id="hk-r3" x1="0" x2="1">
          <stop offset="0" stopColor="#e8482b" stopOpacity="0" />
          <stop offset=".6" stopColor="#e8482b" />
          <stop offset="1" stopColor="#7a5cff" />
        </linearGradient>
      </defs>

      <motion.path fill="url(#hk-r1)" {...loop((s) => ribbon(0, s), 11)} />
      <motion.path fill="url(#hk-r2)" {...loop((s) => ribbon(46, s), 13)} />
      {Array.from({ length: 8 }, (_, i) => (
        <motion.path
          key={i}
          fill="none"
          stroke="url(#hk-r3)"
          strokeWidth="1"
          opacity={0.25 + i * 0.07}
          {...loop((s) => strand(i, s), 9 + i * 0.5)}
        />
      ))}
    </svg>
  )
}

/* ───────── orb: circle + rotating text ring + monogram/photo ───────── */
function Orb() {
  return (
    <div className="hk-orb">
      <div className="hk-circle" />
      <svg className="hk-ring" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <path id="hk-ringpath" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
        </defs>
        <text
          fontSize="7.4"
          fill="#0d0d0c"
          style={{ fontFamily: 'Geist Mono, monospace', textTransform: 'uppercase' }}
        >
          <textPath href="#hk-ringpath" textLength="574" lengthAdjust="spacing">
            Harsh Kumar · Software Developer · Kanpur · 2026 · Java · Spring Boot ·
          </textPath>
        </text>
      </svg>
      <div className="hk-fg">
        {PHOTO ? (
          <img className="hk-photo" src={PHOTO} alt="Harsh Kumar" />
        ) : (
          <span className="hk-mono-hk">HK</span>
        )}
      </div>
    </div>
  )
}

/* ───────── project card art ───────── */
function Art({ kind }) {
  if (kind === 'radar') {
    return (
      <div className="hk-radar">
        {[0, 1, 2].map((i) => (
          <i key={i} style={{ '--d': `${i * 1.5}s` }} />
        ))}
        <b />
      </div>
    )
  }
  if (kind === 'diamond') {
    return (
      <div className="hk-diamond">
        <i>
          <b />
        </i>
      </div>
    )
  }
  const bars = [
    ['38%', '2.1s'], ['62%', '2.7s'], ['48%', '1.9s'], ['80%', '3.1s'],
    ['55%', '2.4s'], ['70%', '2.9s'], ['42%', '2.2s'], ['88%', '3.3s'],
    ['58%', '2.5s'], ['66%', '2.0s'], ['46%', '2.8s'], ['74%', '3.0s'],
  ]
  return (
    <div className="hk-bars">
      {bars.map(([h, d], i) => (
        <i key={i} style={{ '--h': h, '--d': d }} />
      ))}
    </div>
  )
}

function Card({ p, active, delay, onHover }) {
  return (
    <motion.a
      href="#work"
      className="hk-card"
      data-active={active}
      onMouseEnter={onHover}
      onFocus={onHover}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <div className="hk-art">
        <Art kind={p.art} />
      </div>
      <div className="hk-card-top">
        <span className="hk-label">{p.n}</span>
        <span className="hk-label">{p.tag}</span>
      </div>
      <div className="hk-card-bot">
        <div>
          <div className="hk-title">{p.title}</div>
          <p className="hk-desc">{p.desc}</p>
        </div>
        <span className="hk-go">
          <ArrowRight />
        </span>
      </div>
    </motion.a>
  )
}

/* ───────── hero ───────── */
export default function Hero() {
  const [step, setStep] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setStep((s) => (s + 1) % PROJECTS.length), 4500)
    return () => clearInterval(t)
  }, [reduce, step])

  const current = PROJECTS[step]

  return (
    <section id="hero" className="hk-hero">
      <div className="hk-poster">
        <Ribbon />

        {/* top meta (desktop) */}
        <div className="hk-top">
          <span className="hk-label">Java / Spring Boot / React</span>
          <span className="hk-label">
            0{step + 1} / 0{PROJECTS.length}
          </span>
        </div>

        {/* copy */}
        <div className="hk-copy">
          <div className="hk-label hk-eyebrow">Software developer</div>

          <h1 className="hk-h1">
            <Line delay={0.2}>Backend</Line>
            <Line delay={0.32}>
              <span className="hk-bold">
                Systems
                {[1, 2, 3].map((i) => (
                  <span key={i} className="hk-ghost" style={{ '--i': i }} aria-hidden>
                    Systems
                  </span>
                ))}
              </span>
            </Line>
            <Line delay={0.44}>that hold.</Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="hk-label hk-who">Harsh Kumar · B.Tech CSE &apos;26 · Kanpur</div>
            <p className="hk-lede">
              I build APIs and real-time systems in <strong>Java and Spring Boot</strong>, and
              load-test them before I ship. React when the product needs a face. Open to
              software developer roles across India.
            </p>
            <div className="hk-actions">
              <a className="hk-btn hk-btn--solid" href="#work">
                View projects <ArrowUpRight />
              </a>
              <a className="hk-btn" href="#contact">
                Contact <ArrowRight />
              </a>
            </div>
          </motion.div>
        </div>

        {/* orb (SKIPER UI SLOT: a Skiper UI component can replace <Orb /> or sit beside it) */}
        <div className="hk-stage">
          <Orb />
        </div>

        {/* project stepper (desktop) */}
        <nav className="hk-steps" aria-label="Featured projects">
          {PROJECTS.map((p, i) => (
            <button
              key={p.n}
              data-on={step === i}
              aria-current={step === i}
              onClick={() => setStep(i)}
            >
              <em>{p.n}</em>
              {p.short}
            </button>
          ))}
        </nav>

        {/* now showing (desktop) */}
        <div className="hk-now">
          <div className="hk-label">Now showing</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.n}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <strong>{current.title}</strong>
              <span className="hk-label">{current.sub}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* cards */}
      <div className="hk-cards">
        {PROJECTS.map((p, i) => (
          <Card
            key={p.n}
            p={p}
            active={step === i}
            delay={0.8 + i * 0.1}
            onHover={() => setStep(i)}
          />
        ))}
      </div>
    </section>
  )
}