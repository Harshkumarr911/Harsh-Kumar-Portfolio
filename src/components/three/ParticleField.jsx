import React, { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 90
const MAX_DIST = 4.0

export default function ParticleField() {
  const pointsRef = useRef(null)
  const linesRef = useRef(null)
  const frame = useRef(0)
  const { pointer } = useThree()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const speeds = []
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
      speeds.push({ x: (Math.random() - 0.5) * 0.0018, y: (Math.random() - 0.5) * 0.0018 })
    }
    return { positions, speeds }
  }, [])

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), [])

  const updateLines = (posAttr) => {
    const arr = []
    for (let a = 0; a < COUNT; a++) {
      for (let b = a + 1; b < COUNT; b++) {
        const dx = posAttr[a * 3] - posAttr[b * 3]
        const dy = posAttr[a * 3 + 1] - posAttr[b * 3 + 1]
        const dz = posAttr[a * 3 + 2] - posAttr[b * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < MAX_DIST) {
          arr.push(posAttr[a * 3], posAttr[a * 3 + 1], posAttr[a * 3 + 2])
          arr.push(posAttr[b * 3], posAttr[b * 3 + 1], posAttr[b * 3 + 2])
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
  }

  useFrame(({ camera }) => {
    frame.current++
    const posAttr = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      posAttr[i * 3] += speeds[i].x
      posAttr[i * 3 + 1] += speeds[i].y
      if (posAttr[i * 3] > 15 || posAttr[i * 3] < -15) speeds[i].x *= -1
      if (posAttr[i * 3 + 1] > 9 || posAttr[i * 3 + 1] < -9) speeds[i].y *= -1
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    if (frame.current % 4 === 0) updateLines(posAttr)

    camera.position.x += (pointer.x * 3 - camera.position.x) * 0.03
    camera.position.y += (-pointer.y * 2 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#7fe7c4" size={0.14} transparent opacity={0.9} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#3fae86" transparent opacity={0.18} />
      </lineSegments>
    </group>
  )
}
