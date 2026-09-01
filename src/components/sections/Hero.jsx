import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '../../hooks/useGSAP.js'
import HeroScene from '../three/HeroScene.jsx'
import MagneticButton from '../ui/MagneticButton.jsx'
import { useEffect, useRef, useState } from 'react'



const VALUES = ['thinks', 'solves', 'codes', 'builds', 'ships']

export default function Hero() {


  const [activeValue, setActiveValue] = useState(VALUES[0])
  const wordRef = useRef(null)

  /*
   * ------------------------------------------
   * ROTATING VALUES
   * ------------------------------------------
   * THINKS → SOLVES → CODES → BUILDS → SHIPS
   * Every 2 seconds
   */
  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      index = (index + 1) % VALUES.length

      // Exit animation
      gsap.to(wordRef.current, {
        y: -18,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveValue(VALUES[index])

          // Entry animation
          gsap.fromTo(
            wordRef.current,
            {
              y: 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: 'power3.out',
            }
          )
        },
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])


const scope = useGSAP(() => {
const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
tl.from('#hero-eyebrow', { opacity: 0, y: 14, duration: 0.6 })
.from('#hero-title', { opacity: 0, y: 40, duration: 0.9 }, '-=0.3')
.from('#hero-sub', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
.from('#hero-ctas', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
return () => tl.kill()
}, [])

return (
<section
id="hero"
ref={scope}
className="relative min-h-screen flex items-end pt-[140px] overflow-hidden"
style={{
background:
'radial-gradient(120% 90% at 78% 8%, #16321f 0%, #0f2436 34%, #0a1220 62%, #080b13 100%)',
}}
>
<HeroScene />

  <div className="relative z-[3] w-full pb-[110px]">
    <div className="wrap">
      
      <div id="hero-eyebrow" className="eyebrow mb-[22px]">
        <div
        className="font-serif text-paper font-semibold leading-none"
        style={{ fontSize: 'clamp(25px, 3vw, 58px)' }}
        >
        Harsh Kumar
        </div>

        
      </div>
      <div id="hero-eyebrow" className="eyebrow mb-[22px]"> SOFTWARE DEVELOPER — B.TECH CSE, GRAD 2026 </div>

      {/* <h1
        id="hero-title"
        className="font-serif font-semibold leading-[0.98] tracking-tight max-w-[980px]"
        style={{ fontSize: 'clamp(48px, 8.4vw, 118px)' }}
      >
        Backend that
        <br />
        holds the line
        <br />
        <em className="not-italic italic text-mint">under load.</em>
      </h1> */}

      {/* ------------------------------------------
              MAIN HERO
              ------------------------------------------ */}
          <h1
            id="hero-title"
            className="
              font-serif
              font-semibold
              leading-[0.92]
              tracking-tight
              max-w-[1200px]
              text-paper
            "
            style={{
              fontSize: 'clamp(58px, 9.2vw, 138px)',
            }}
          >
            A Engineer <br/>
            who {" "}
            

            {/* ROTATING WORD */}
            <span
              ref={wordRef}
              className="
                inline-block
                italic
                text-mint
                min-w-[4ch]
                [text-align:inherit]
                [text-wrap:balance]
              "
            >
              {activeValue}
            </span>
            <span className="text-paper">.</span>
          </h1>

          
      <p id="hero-sub" className="mt-7 max-w-[520px] text-paperDim text-[16.5px] leading-[1.6]">
        I build APIs and systems in Java and Spring Boot — then load-test them until I trust
        them. Frontend in React when the product needs a face.
      </p>
      <div id="hero-ctas" className="flex gap-3.5 mt-[38px] flex-wrap">
        <MagneticButton href="#work" variant="solid">
          See the work
        </MagneticButton>
        <MagneticButton href="#contact" variant="ghost">
          Say hello
        </MagneticButton>
      </div>
    </div>
  </div>

  <div className="hidden md:flex absolute right-11 bottom-9 z-[3] [writing-mode:vertical-rl] font-mono text-[11px] text-slate tracking-[0.12em] items-center gap-2.5">
    SCROLL
    <span className="w-px h-[46px] bg-gradient-to-b from-mint to-transparent" />
  </div>
</section>

)
}