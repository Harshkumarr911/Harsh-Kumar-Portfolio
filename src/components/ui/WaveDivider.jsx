import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * The signature transition motif carried over from the design reference:
 * an organic wave that "flows" from one section's color into the next.
 * `color` is the fill of the section that follows. `flip` mirrors it so
 * the wave can read as either a floor or a ceiling.
 */
export default function WaveDivider({ color, flip = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-14, 14])

  return (
    <div ref={ref} className="relative leading-[0] -mt-px z-[5]" style={{ color }}>
      <motion.svg
        style={{ y, transform: flip ? 'scaleY(-1)' : 'none' }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-auto"
      >
        <path
          fill="currentColor"
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,128 1440,72 L1440,120 L0,120 Z"
        />
      </motion.svg>
    </div>
  )
}
