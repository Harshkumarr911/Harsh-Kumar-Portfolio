import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const rootRef = useRef(null)

  useEffect(() => {
    let raf
    let value = 0
    const tick = () => {
      value += Math.random() * 14
      if (value >= 100) {
        value = 100
        setPct(100)
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.25,
          ease: 'power2.out',
          onComplete: onDone,
        })
        return
      }
      setPct(Math.floor(value))
      raf = setTimeout(tick, 130)
    }
    raf = setTimeout(tick, 130)
    return () => clearTimeout(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center gap-[18px]"
    >
      <div className="font-mono text-[12.5px] text-slate tracking-wide">INITIALIZING PORTFOLIO...</div>
      <div className="w-[220px] h-[2px] bg-white/10 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-mint" style={{ width: `${pct}%` }} />
      </div>
      <div className="font-mono text-[12.5px] text-paper">{pct}%</div>
    </div>
  )
}
