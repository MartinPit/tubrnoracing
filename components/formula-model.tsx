"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, Float, ContactShadows } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

function FormulaCarModel() {
  const meshRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("https://cdn.tinyglb.com/models/1923b11c70754de8ac22be7b80113eff.glb")

  useEffect(() => {
    if (!meshRef.current) return

    gsap.to(meshRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    gsap.to(meshRef.current.position, {
      z: -2,
      y: -1,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} scale={2} position={[0, -0.5, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

export function FormulaScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#e31937" />
        <spotLight position={[-10, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
        <FormulaCarModel />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} color="#e31937" />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
