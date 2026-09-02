import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

import NebulaBackdrop from './NebulaBackdrop.jsx'
import ParticleField from './ParticleField.jsx'
import BreakSystem from './BreakSystem.jsx'

export default function HeroScene({
  activeValue = 'thinks',
}) {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

  return (
    <Canvas
      className="!absolute inset-0 z-[1]"
      camera={{
        position: [0, 0, 18],
        fov: 55,
      }}
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >

      <Suspense fallback={null}>

        {/* Existing background */}
        <NebulaBackdrop />

        {/* Existing particles */}
        <ParticleField />

        {/* NEW SYSTEM */}
        <BreakSystem
          activeValue={activeValue}
        />

        {!reduceMotion && (
          <Sparkles
            count={35}
            scale={[24, 14, 8]}
            size={1.7}
            speed={0.18}
            color="#f2c14e"
            opacity={0.3}
          />
        )}

      </Suspense>

    </Canvas>
  )
}