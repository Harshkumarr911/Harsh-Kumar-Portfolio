import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy, Gauge, Brain, Code2, Award } from 'lucide-react'
import { useGSAP } from '../../hooks/useGSAP.js'
import WaveDivider from '../ui/WaveDivider.jsx'
import { featuredAchievement, achievements } from '../../data/content.js'
import SectionHeading from '../layout/SectionHeading.jsx'

gsap.registerPlugin(ScrollTrigger)

const icons = { Trophy, Gauge, Brain, Code2, Award }

export default function Achievements() {
  const listRef = useRef(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray('.achievement-card')
    gsap.from(cards, {
      opacity: 0,
      x: 24,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: listRef.current, start: 'top 82%' },
    })

    const bar = document.querySelector('.success-bar-fill')
    if (bar) {
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
        }
      )
    }
  }, [])

  return (
    <>
      
      <WaveDivider color="#0e0929" />
      
      <section id="achievements" className="bg-ink py-[130px]">
        <SectionHeading word="ACHIEVEMENTS" crumb="My Achievements" title="What I've Done" />
        <div className="wrap">
          
          <div className="eyebrow mb-4">ACHIEVEMENTS</div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <div
              className="rounded-xl2 p-11 flex flex-col justify-between border border-line"
              style={{
                background:
                  'linear-gradient(160deg, rgba(127,231,196,0.06), transparent 60%), #111a2e',
              }}
            >
              <div>
                <div className="font-serif text-mint text-[56px] leading-[0.5]">"</div>
                <p
                  className="font-serif leading-[1.5] mt-5 max-w-[540px]"
                  style={{ fontSize: 'clamp(20px,2.2vw,27px)' }}
                >
                  {featuredAchievement.quote}
                </p>
              </div>
              <div className="font-mono text-[12px] text-slate mt-7">
                — {featuredAchievement.attribution}
              </div>

              <div className="mt-9">
                <div className="flex justify-between font-mono text-[11px] text-slate mb-2">
                  <span>LOAD-TEST SUCCESS RATE</span>
                  <span className="text-mint">100%</span>
                </div>
                <div className="h-[6px] rounded-full bg-white/10 overflow-hidden">
                  <div className="success-bar-fill h-full bg-mint rounded-full" style={{ width: 0 }} />
                </div>
              </div>
            </div>

            <div ref={listRef} className="flex flex-col gap-3.5">
              {achievements.map((item) => {
                const Icon = icons[item.icon]
                return (
                  <div
                    key={item.label}
                    className="achievement-card flex items-center gap-4 border border-line rounded-2xl p-5 bg-panel"
                  >
                    <div className="w-11 h-11 rounded-full bg-mintDim flex items-center justify-center text-mint flex-none">
                      {Icon && <Icon size={19} />}
                    </div>
                    <div>
                      <div className="font-serif text-[19px] text-paper leading-tight">
                        {item.value}
                      </div>
                      <div className="font-mono text-[11px] text-slate mt-1 leading-snug">
                        {item.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
