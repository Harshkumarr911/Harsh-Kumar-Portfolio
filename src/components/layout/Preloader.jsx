import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onDone }) {
  const rootRef = useRef(null)

  const textHarshRef = useRef(null)
  const textKumarRef = useRef(null)
  const previewRef = useRef(null)
  const previewImageRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const harsh = textHarshRef.current
    const kumar = textKumarRef.current
    const preview = previewRef.current
    const previewImage = previewImageRef.current

    if (!root || !harsh || !kumar || !preview || !previewImage) return

    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      /* INITIAL STATE */
      gsap.set([harsh, kumar], {
        opacity: 0,
        y: 0,
        scale: 0.98,
      })

      gsap.set(preview, {
        opacity: 0,
        scale: 0.5,
        filter: 'blur(8px)',
        clipPath: 'inset(0% 0% 0% 0% round 14px)',
      })

      gsap.set(previewImage, {
        scale: 1.08,
      })

      /* REDUCED MOTION */
      if (reducedMotion) {
        gsap.set([harsh, kumar, preview], { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' })
        finish()
        return
      }

      const tl = gsap.timeline({
        defaults: { overwrite: 'auto' },
      })

      /* PHASE 1: TEXT APPEARS (HARSH & KUMAR CENTERED TOGETHER) */
      tl.to([harsh, kumar], {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power4.out',
      })

      /* PHASE 2: PAUSE */
      tl.to({}, { duration: 0.3 })

      /* PHASE 3: TEXT SPLITS APART & IMAGE EMERGES IN BETWEEN */
      tl.to(
        harsh,
        {
          y: -120,
          duration: 0.8,
          ease: 'power3.out',
        },
        'split'
      )

      tl.to(
        kumar,
        {
          y: 120,
          duration: 0.8,
          ease: 'power3.out',
        },
        'split'
      )

      tl.to(
        preview,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
        },
        'split'
      )

      tl.to(
        previewImage,
        {
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        'split'
      )

      /* PHASE 4: CINEMATIC EXPANSION (FAST & DIRECT) */
      tl.to(
        harsh,
        {
          y: '-100vh',
          opacity: 0,
          duration: 0.7,
          ease: 'expo.inOut',
        },
        'expand'
      )

      tl.to(
        kumar,
        {
          y: '100vh',
          opacity: 0,
          duration: 0.7,
          ease: 'expo.inOut',
        },
        'expand'
      )

      tl.to(
        preview,
        {
          left: 0,
          top: 0,
          xPercent: 0,
          yPercent: 0,
          width: '100vw',
          height: '100vh',
          scale: 1,
          borderRadius: 0,
          duration: 0.9,
          ease: 'power4.inOut',
        },
        'expand'
      )

      /* PHASE 5: INSTANT TEARDOWN (NO SLOW CROSSFADE / NO SETTLE PAUSE) */
      tl.to(root, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out',
        onComplete: finish,
      })
    }, root)

    function finish() {
      document.body.style.overflow = ''
      if (root) root.style.display = 'none'
      onDone?.()
    }

    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#080b13]"
    >
      {/* TEXT CONTAINER (HARSH & KUMAR SPLIT) */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none select-none">
        <h1
          ref={textHarshRef}
          className="font-serif font-semibold text-paper leading-none tracking-[-0.06em] whitespace-nowrap"
          style={{ fontSize: 'clamp(50px, 10vw, 150px)' }}
        >
          HARSH
        </h1>
        <h1
          ref={textKumarRef}
          className="font-serif font-semibold text-paper leading-none tracking-[-0.06em] whitespace-nowrap"
          style={{ fontSize: 'clamp(50px, 10vw, 150px)' }}
        >
          KUMAR
        </h1>
      </div>

      {/* HOMEPAGE PREVIEW */}
      <div
        ref={previewRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-[3] bg-[#080b13] will-change-transform"
        style={{
          width: 'clamp(150px, 18vw, 280px)',
          height: 'clamp(105px, 12vw, 190px)',
          borderRadius: '14px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        }}
      >
        <img
          ref={previewImageRef}
          src="/images/image.png"
          alt=""
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
        />
      </div>
    </div>
  )
}