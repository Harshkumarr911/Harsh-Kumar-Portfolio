import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'


export default function Preloader({ onDone }) {

  const rootRef = useRef(null)

  const topPanelRef = useRef(null)
  const bottomPanelRef = useRef(null)

  const harshRef = useRef(null)
  const kumarRef = useRef(null)

  const glowRef = useRef(null)
  const lineRef = useRef(null)

  useLayoutEffect(() => {

    const root = rootRef.current

    const topPanel = topPanelRef.current
    const bottomPanel = bottomPanelRef.current

    const harsh = harshRef.current
    const kumar = kumarRef.current

    const glow = glowRef.current
    const line = lineRef.current

    if (
      !root ||
      !topPanel ||
      !bottomPanel ||
      !harsh ||
      !kumar
    ) {
      return
    }


    // =====================================================
    // LOCK SCROLL DURING INTRO
    // =====================================================

    document.body.style.overflow = 'hidden'


    // =====================================================
    // GSAP CONTEXT
    // =====================================================

    const ctx = gsap.context(() => {

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches


      // ===================================================
      // INITIAL STATE
      // ===================================================

      gsap.set(topPanel, {
        height: '50%',
        yPercent: 0,
      })

      gsap.set(bottomPanel, {
        height: '50%',
        yPercent: 0,
      })


      gsap.set(harsh, {
        y: 0,
        opacity: 1,
      })

      gsap.set(kumar, {
        y: 0,
        opacity: 1,
      })


      gsap.set(glow, {
        opacity: 0,
        scale: 0.35,
      })


      gsap.set(line, {
        opacity: 0,
        scaleX: 0,
      })


      // ===================================================
      // REDUCED MOTION
      // ===================================================

      if (reducedMotion) {

        finish()

        return
      }


      // ===================================================
      // MAIN TIMELINE
      // ===================================================

      const tl = gsap.timeline({
        defaults: {
          overwrite: 'auto',
        },
      })


      // ===================================================
      // PHASE 1
      //
      // NAME JUST SITS THERE
      //
      // Harsh
      // Kumar
      // ===================================================

      tl.to({}, {
        duration: 0.9,
      })


      // ===================================================
      // PHASE 2
      //
      // SOMETHING STARTS HAPPENING IN THE CENTER
      // ===================================================

      tl.to(glow, {
        opacity: 0.85,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      })


      tl.to(line, {
        opacity: 1,
        scaleX: 1,
        duration: 0.4,
        ease: 'power3.out',
      }, '<0.05')


      // ===================================================
      // PHASE 3
      //
      // THE ACTUAL OPENING
      //
      // HARSH → UP
      // KUMAR → DOWN
      // ===================================================

      const OPEN = 'open'


      // ---------------------------------------------------
      // HARSH GOES UP
      // ---------------------------------------------------

      tl.to(
        harsh,
        {
          y: '-43vh',
          duration: 2.0,
          ease: 'expo.inOut',
        },
        OPEN
      )


      // ---------------------------------------------------
      // KUMAR GOES DOWN
      // ---------------------------------------------------

      tl.to(
        kumar,
        {
          y: '43vh',
          duration: 2.0,
          ease: 'expo.inOut',
        },
        OPEN
      )


      // ===================================================
      // PHASE 4
      //
      // TOP PANEL OPENS UP
      //
      // WEBSITE BECOMES VISIBLE
      // ===================================================

      tl.to(
        topPanel,
        {
          height: '0%',
          duration: 2.0,
          ease: 'expo.inOut',
        },
        OPEN
      )


      // ===================================================
      // BOTTOM PANEL OPENS DOWN
      //
      // WEBSITE BECOMES VISIBLE
      // ===================================================

      tl.to(
        bottomPanel,
        {
          height: '0%',
          duration: 2.0,
          ease: 'expo.inOut',
        },
        OPEN
      )


      // ===================================================
      // CENTER LIGHT
      //
      // GROWS WHILE WEBSITE IS REVEALED
      // ===================================================

      tl.to(
        glow,
        {
          scale: 4.5,
          opacity: 0,
          duration: 1.6,
          ease: 'power3.out',
        },
        OPEN
      )


      // ===================================================
      // CENTER LINE
      // ===================================================

      tl.to(
        line,
        {
          scaleX: 7,
          opacity: 0,
          duration: 1.35,
          ease: 'power3.out',
        },
        OPEN
      )


      // ===================================================
      // PHASE 5
      //
      // NAME FINALLY DISAPPEARS
      //
      // IMPORTANT:
      // It doesn't disappear immediately.
      // Website gets time to reveal underneath.
      // ===================================================

      tl.to(
        harsh,
        {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        'open+=1.25'
      )


      tl.to(
        kumar,
        {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        'open+=1.25'
      )


      // ===================================================
      // PHASE 6
      //
      // FINAL FADE
      // ===================================================

      tl.to(
        root,
        {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.inOut',

          onComplete: finish,
        },
        'open+=1.55'
      )

    }, root)


    // =====================================================
    // FINISH
    // =====================================================

    function finish() {

      document.body.style.overflow = ''

      if (root) {
        root.style.display = 'none'
      }

      if (onDone) {
        onDone()
      }
    }


    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {

      ctx.revert()

      document.body.style.overflow = ''

    }

  }, [onDone])


  return (
    <div
      ref={rootRef}
      className="
        fixed
        inset-0
        z-[9999]
        overflow-hidden
        pointer-events-auto
        select-none
      "
      style={{
        background: 'transparent',
      }}
    >


      {/* ==================================================
          TOP BLACK PANEL
          
          Initially covers:
          
          ┌─────────────────┐
          │                 │
          │      HARSH      │
          │                 │
          └─────────────────┘
          
          Then shrinks upward.
          ================================================== */}

      <div
        ref={topPanelRef}
        className="
          absolute
          top-0
          left-0
          w-full
          h-1/2
          z-[2]
          overflow-hidden
        "
        style={{
          background:
            'radial-gradient(100% 100% at 50% 100%, #101b18 0%, #080b13 65%)',
        }}
      />


      {/* ==================================================
          BOTTOM BLACK PANEL
          
          Initially covers:
          
          ┌─────────────────┐
          │                 │
          │      KUMAR      │
          │                 │
          └─────────────────┘
          
          Then shrinks downward.
          ================================================== */}

      <div
        ref={bottomPanelRef}
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-1/2
          z-[2]
          overflow-hidden
        "
        style={{
          background:
            'radial-gradient(100% 100% at 50% 0%, #101b18 0%, #080b13 65%)',
        }}
      />


      {/* ==================================================
          HARSH
          
          THIS IS INDEPENDENT FROM TOP PANEL.
          
          It travels upward.
          ================================================== */}

      <div
        ref={harshRef}
        className="
          absolute
          top-0
          left-0
          w-full
          h-1/2
          flex
          items-end
          justify-center
          z-[5]
          pointer-events-none
          will-change-transform
        "
        style={{
          paddingBottom: 'clamp(4px, 0.8vw, 12px)',
        }}
      >

        <span
          className="
            font-serif
            font-semibold
            text-paper
            leading-none
            whitespace-nowrap
          "
          style={{
            fontSize: 'clamp(64px, 11vw, 170px)',
            letterSpacing: '-0.065em',
          }}
        >
          Harsh
        </span>

      </div>


      {/* ==================================================
          KUMAR
          
          THIS IS INDEPENDENT FROM BOTTOM PANEL.
          
          It travels downward.
          ================================================== */}

      <div
        ref={kumarRef}
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-1/2
          flex
          items-start
          justify-center
          z-[5]
          pointer-events-none
          will-change-transform
        "
        style={{
          paddingTop: 'clamp(4px, 0.8vw, 12px)',
        }}
      >

        <span
          className="
            font-serif
            font-semibold
            text-paper
            leading-none
            whitespace-nowrap
          "
          style={{
            fontSize: 'clamp(64px, 11vw, 170px)',
            letterSpacing: '-0.065em',
          }}
        >
          Kumar
        </span>

      </div>


      {/* ==================================================
          CENTER GLOW
          
          This gives the opening a cinematic focal point.
          ================================================== */}

      <div
        ref={glowRef}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[200px]
          h-[200px]
          rounded-full
          z-[4]
          pointer-events-none
        "
        style={{
          background:
            'radial-gradient(circle, rgba(127,231,196,0.28) 0%, rgba(127,231,196,0.08) 32%, transparent 72%)',
          filter: 'blur(20px)',
        }}
      />


      ```jsx
{/* CENTER REVEAL LINE */}
<div
  ref={lineRef}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[1px] z-[6] pointer-events-none"
  style={{
    background:
      'linear-gradient(90deg, transparent, rgba(127,231,196,0.9), transparent)',
    boxShadow: '0 0 20px rgba(127,231,196,0.55)',
  }}
/>
```


    </div>
  )
}