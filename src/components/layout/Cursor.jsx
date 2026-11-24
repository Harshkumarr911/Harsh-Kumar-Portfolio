import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isFine, setIsFine] = useState(false)
  const [onLink, setOnLink] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 22 })
  const ringY = useSpring(y, { stiffness: 260, damping: 22 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsFine(fine)
    if (!fine) return

    document.body.classList.add('cursor-enabled')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor="link"]')) setOnLink(true)
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor="link"]')) setOnLink(false)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      document.body.classList.remove('cursor-enabled')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [x, y])

  if (!isFine) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-mint"
        style={{ width: 6, height: 6, x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border"
        animate={{
          width: onLink ? 56 : 34,
          height: onLink ? 56 : 34,
          backgroundColor: onLink ? 'rgba(127,231,196,0.08)' : 'rgba(127,231,196,0)',
          borderColor: onLink ? '#e07fe7' : 'rgba(137, 25, 119, 0.5)',
        }}
        transition={{ duration: 0.25 }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
