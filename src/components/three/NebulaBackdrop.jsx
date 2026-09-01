import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { nebulaVertexShader, nebulaFragmentShader } from './shaders/nebulaShader.js'

export default function NebulaBackdrop() {
  const materialRef = useRef(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(0x0a1512) },
      uColorB: { value: new THREE.Color(0x226b52) },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[60, 40, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
      />
    </mesh>
  )
}
