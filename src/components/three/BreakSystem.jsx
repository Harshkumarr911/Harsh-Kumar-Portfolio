import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 13

const BASE_POSITIONS = [
  [0, 0, 0],

  [-1.8, 0.9, 0],
  [-1.8, -0.9, 0],

  [1.8, 0.9, 0],
  [1.8, -0.9, 0],

  [-0.8, 1.8, 0],
  [0.8, 1.8, 0],

  [-0.8, -1.8, 0],
  [0.8, -1.8, 0],

  [-2.7, 0, 0],
  [2.7, 0, 0],

  [0, 2.7, 0],
  [0, -2.7, 0],
]

const COLORS = {
  core: '#7fe7c4',
  node: '#9bead3',
  dim: '#3fae86',
  warning: '#f2c14e',
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function smoothstep(t) {
  return t * t * (3 - 2 * t)
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function BreakSystem({ activeValue = 'thinks' }) {
  const groupRef = useRef(null)
  const coreRef = useRef(null)

  const nodesRef = useRef([])
  const nodeMeshesRef = useRef([])
  const lineRef = useRef(null)

  const timeRef = useRef(0)
  const phaseRef = useRef(0)

  const { pointer } = useThree()

  /*
   * --------------------------------------------------------
   * SYSTEM PHASE
   *
   * 0 = THINK
   * 1 = SOLVE
   * 2 = CODE
   * 3 = BUILD
   * 4 = SHIP
   * --------------------------------------------------------
   */

  const phaseMap = {
    thinks: 0,
    solves: 1,
    codes: 2,
    builds: 3,
    ships: 4,
  }

  const targetPhase =
    phaseMap[activeValue] ?? 0

  /*
   * --------------------------------------------------------
   * NODE DATA
   * --------------------------------------------------------
   */

  const nodeData = useMemo(() => {
    return BASE_POSITIONS.map((position, index) => {
      const angle = Math.random() * Math.PI * 2
      const distance = 2.5 + Math.random() * 1.5

      return {
        base: new THREE.Vector3(
          position[0],
          position[1],
          position[2]
        ),

        broken: new THREE.Vector3(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance,
          (Math.random() - 0.5) * 1.8
        ),

        speed: 0.4 + Math.random() * 0.6,

        phaseOffset: Math.random() * Math.PI * 2,

        scale: index === 0 ? 1.45 : 0.55 + Math.random() * 0.2,
      }
    })
  }, [])

  /*
   * --------------------------------------------------------
   * CONNECTING SYSTEM
   * --------------------------------------------------------
   */

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry()
  }, [])

  /*
   * --------------------------------------------------------
   * CURRENT TARGET PHASE
   * --------------------------------------------------------
   */

  useEffect(() => {
    phaseRef.current = targetPhase
  }, [targetPhase])

  /*
   * --------------------------------------------------------
   * UPDATE LINES
   * --------------------------------------------------------
   */

  const updateLines = () => {
    if (!lineRef.current) return

    const positions = []

    /*
     * Only connect meaningful structural nodes.
     *
     * We deliberately DON'T connect every node to every node.
     * This avoids the "too many lines/waves" problem.
     */

    const connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],

      [1, 5],
      [5, 6],
      [6, 3],

      [2, 7],
      [7, 8],
      [8, 4],

      [1, 9],
      [3, 10],

      [5, 11],
      [7, 12],
    ]

    connections.forEach(([a, b]) => {
      const A = nodesRef.current[a]
      const B = nodesRef.current[b]

      if (!A || !B) return

      positions.push(
        A.x,
        A.y,
        A.z,

        B.x,
        B.y,
        B.z
      )
    })

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    lineGeometry.attributes.position.needsUpdate = true
  }

  /*
   * --------------------------------------------------------
   * ANIMATION
   * --------------------------------------------------------
   */

  useFrame((state, delta) => {
    timeRef.current += delta

    const time = timeRef.current

    /*
     * Slowly rotate entire system.
     */

    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(time * 0.25) * 0.08

      groupRef.current.rotation.x =
        Math.sin(time * 0.18) * 0.04

      /*
       * Cursor interaction.
       */

      groupRef.current.position.x = lerp(
        groupRef.current.position.x,
        pointer.x * 0.35,
        0.025
      )

      groupRef.current.position.y = lerp(
        groupRef.current.position.y,
        pointer.y * 0.22,
        0.025
      )
    }

    /*
     * ------------------------------------------------------
     * PHASE ANIMATION
     * ------------------------------------------------------
     */

    nodeData.forEach((node, index) => {
      const mesh = nodeMeshesRef.current[index]

      if (!mesh) return

      const base = node.base
      const broken = node.broken

      /*
       * -----------------------------------------------
       * THINK
       *
       * Stable system.
       * -----------------------------------------------
       */

      let target = base.clone()

      /*
       * -----------------------------------------------
       * SOLVE
       *
       * Small scan movement.
       * -----------------------------------------------
       */

      if (targetPhase === 1) {
        const scan =
          Math.sin(
            time * 2.5 + node.phaseOffset
          ) * 0.12

        target.x += scan
        target.y += scan * 0.5
      }

      /*
       * -----------------------------------------------
       * CODE
       *
       * System starts separating.
       * -----------------------------------------------
       */

      if (targetPhase === 2) {
        const separation =
          0.35 +
          0.15 *
            Math.sin(
              time * 3 + node.phaseOffset
            )

        target.x +=
          Math.sign(base.x || 1) * separation

        target.y +=
          Math.sign(base.y || 1) * separation
      }

      /*
       * -----------------------------------------------
       * BUILD
       *
       * Reconstruct toward original positions.
       * -----------------------------------------------
       */

      if (targetPhase === 3) {
        const breathe =
          Math.sin(
            time * 2 + node.phaseOffset
          ) * 0.05

        target.x += breathe
        target.y += breathe
      }

      /*
       * -----------------------------------------------
       * SHIP
       *
       * System compresses toward center.
       * -----------------------------------------------
       */

      if (targetPhase === 4) {
        const shipProgress =
          (Math.sin(time * 1.7) + 1) / 2

        target.lerp(
          new THREE.Vector3(0, 0, -0.2),
          shipProgress * 0.75
        )
      }

      /*
       * -----------------------------------------------
       * MOVE
       * -----------------------------------------------
       */

      mesh.position.x = lerp(
        mesh.position.x,
        target.x,
        1 - Math.pow(0.001, delta)
      )

      mesh.position.y = lerp(
        mesh.position.y,
        target.y,
        1 - Math.pow(0.001, delta)
      )

      mesh.position.z = lerp(
        mesh.position.z,
        target.z,
        1 - Math.pow(0.001, delta)
      )

      /*
       * -----------------------------------------------
       * NODE BREATHING
       * -----------------------------------------------
       */

      const breathe =
        1 +
        Math.sin(
          time * 1.5 +
            node.phaseOffset
        ) *
          0.08

      const finalScale =
        node.scale * breathe

      mesh.scale.setScalar(finalScale)
    })

    /*
     * Update structural lines.
     */

    updateLines()

    /*
     * ------------------------------------------------------
     * CORE
     * ------------------------------------------------------
     */

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.25
      coreRef.current.rotation.y += delta * 0.4

      const pulse =
        1 +
        Math.sin(time * 2.5) * 0.08

      coreRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group
      ref={groupRef}
      position={[4.5, 0.3, 0]}
    >

      {/* ===================================================
          STRUCTURAL LINES
      =================================================== */}

      <lineSegments
        ref={lineRef}
        geometry={lineGeometry}
      >
        <lineBasicMaterial
          color={COLORS.dim}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>


      {/* ===================================================
          NODES
      =================================================== */}

      {nodeData.map((node, index) => (
        <mesh
          key={index}
          ref={(el) => {
            nodeMeshesRef.current[index] = el
            nodesRef.current[index] =
              el?.position || null
          }}
          position={[
            node.base.x,
            node.base.y,
            node.base.z,
          ]}
        >

          <octahedronGeometry
            args={[
              index === 0
                ? 0.55
                : 0.22,
              1,
            ]}
          />

          <meshBasicMaterial
            color={
              index === 0
                ? COLORS.core
                : COLORS.node
            }
            wireframe={index !== 0}
            transparent
            opacity={
              index === 0
                ? 0.9
                : 0.65
            }
          />

        </mesh>
      ))}


      {/* ===================================================
          INNER CORE
      =================================================== */}

      <mesh ref={coreRef}>

        <icosahedronGeometry
          args={[0.42, 1]}
        />

        <meshBasicMaterial
          color={COLORS.core}
          wireframe
          transparent
          opacity={0.9}
        />

      </mesh>


      {/* ===================================================
          CORE GLOW
      =================================================== */}

      <pointLight
        color={COLORS.core}
        intensity={1.3}
        distance={4}
      />


      {/* ===================================================
          SMALL ORBITING DATA PARTICLES
      =================================================== */}

      <DataParticles phase={targetPhase} />

    </group>
  )
}


/*
 * ==========================================================
 * DATA PARTICLES
 * ==========================================================
 */

function DataParticles({ phase }) {
  const ref = useRef(null)

  const particles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      angle:
        (i / 14) * Math.PI * 2,

      radius:
        2.1 + Math.random() * 0.7,

      speed:
        0.15 + Math.random() * 0.25,

      y:
        (Math.random() - 0.5) * 2,
    }))
  }, [])

  useFrame((state) => {
    if (!ref.current) return

    const time = state.clock.elapsedTime

    ref.current.children.forEach(
      (particle, index) => {
        const data = particles[index]

        const angle =
          data.angle +
          time * data.speed

        const radius =
          data.radius +
          Math.sin(
            time * 1.2 +
              index
          ) *
            0.12

        particle.position.x =
          Math.cos(angle) * radius

        particle.position.y =
          data.y +
          Math.sin(
            time * 1.5 +
              index
          ) *
            0.15

        particle.position.z =
          Math.sin(angle) *
          radius *
          0.35

        /*
         * During CODE phase particles move faster.
         */

        const scale =
          phase === 2
            ? 1.5
            : 1

        particle.scale.setScalar(scale)
      }
    )
  })

  return (
    <group ref={ref}>
      {particles.map((_, index) => (
        <mesh key={index}>

          <sphereGeometry
            args={[0.035, 6, 6]}
          />

          <meshBasicMaterial
            color={COLORS.core}
            transparent
            opacity={0.65}
          />

        </mesh>
      ))}
    </group>
  )
}