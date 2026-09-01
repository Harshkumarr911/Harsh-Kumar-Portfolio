import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { fresnelVertexShader, fresnelFragmentShader } from './shaders/fresnelShader.js'

/**
 * The 3D "signature element" for the hero: a distributed-systems node,
 * rendered as a wireframe icosahedron with an inner fresnel-glow shell,
 * gently bobbing via drei's <Float>.
 */
export default function EnergyCore() {
  const coreRef = useRef(null)
  const glowMaterialRef = useRef(null)

  const glowUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#7fe7c4') },
      uIntensity: { value: 1.4 },
    }),
    []
  )

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.30
      coreRef.current.rotation.x += delta * 0.10
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={[5.2, 0.6, -1]} ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#0f2a22" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh scale={1.02}>
          <icosahedronGeometry args={[1.6, 1]} />
          <shaderMaterial
            ref={glowMaterialRef}
            uniforms={glowUniforms}
            vertexShader={fresnelVertexShader}
            fragmentShader={fresnelFragmentShader}
            transparent
            side={THREE.FrontSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  )
}
