import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Minimal stand-in for @gsap/react's useGSAP: runs `callback` inside a
 * gsap.context() scoped to the calling component and reverts every
 * tween/ScrollTrigger it created on unmount or dependency change.
 */
export function useGSAP(callback, deps = []) {
  const scope = useRef(null)

  useEffect(() => {
    let cleanup
    const ctx = gsap.context(() => {
      cleanup = callback()
    }, scope)

    return () => {
      if (typeof cleanup === 'function') cleanup()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}
