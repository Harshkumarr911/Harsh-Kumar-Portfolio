import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initializes Lenis smooth scrolling and keeps GSAP's ScrollTrigger
 * in sync with it. Respects prefers-reduced-motion by skipping the
 * smoothing layer entirely and falling back to native scroll.
 */
export default function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isFinePointer = window.matchMedia('(pointer: fine)').matches

    if (reduceMotion || !isFinePointer) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
    }
  }, [])
}
