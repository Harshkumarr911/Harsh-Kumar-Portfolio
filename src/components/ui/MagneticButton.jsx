import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useSound } from '../../context/SoundContext.jsx'

/**
 * A button/link that gently pulls toward the cursor while hovered,
 * using Framer Motion's spring physics — a small, deliberate motion
 * moment rather than a generic hover-lift.
 */
export default function MagneticButton({ as = 'a', href, onClick, variant = 'solid', children, className = '', ...rest }) {
  const ref = useRef(null)
  const { play } = useSound()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.28)
    y.set(relY * 0.45)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'font-sans font-semibold text-[14.5px] px-[26px] py-[15px] rounded-full inline-flex items-center gap-[9px] border cursor-pointer select-none'
  const styles =
    variant === 'solid'
      ? 'bg-paper text-ink border-transparent'
      : 'bg-transparent text-paper border-white/10'

  const Component = motion[as] || motion.a

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => play(520)}
      style={{ x: springX, y: springY }}
      className={`${base} ${styles} ${className}`}
      data-cursor="link"
      {...rest}
    >
      {children}
    </Component>
  )
}
