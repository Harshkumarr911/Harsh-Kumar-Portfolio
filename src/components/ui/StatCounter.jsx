import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../../hooks/useGSAP.js'

gsap.registerPlugin(ScrollTrigger)

export default function StatCounter({ value, suffix, label }) {
  const numRef = useRef(null)
  const boxRef = useRef(null)

  useGSAP(() => {
    const obj = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: boxRef.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = Math.floor(obj.val).toLocaleString()
          },
        })
      },
    })
    return () => trigger.kill()
  }, [value])

  return (
    <div ref={boxRef} className="p-[26px_28px] border-b border-line last:border-b-0">
      <div className="font-serif text-[40px] font-semibold text-paper flex items-baseline gap-1">
        <span ref={numRef}>0</span>
        <span className="text-[22px] text-mint">{suffix}</span>
      </div>
      <div className="font-mono text-[12px] text-slate mt-1.5 tracking-wide">{label}</div>
    </div>
  )
}
