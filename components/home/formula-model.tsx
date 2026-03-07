"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, Float, ContactShadows } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

function FormulaModel() {
  const meshRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("https://cdn.tinyglb.com/models/12a3d06872f64153bc9803bc2d504f12.glb")
  const { viewport } = useThree()

  useEffect(() => {
    if (!meshRef.current) return

    // Spin animation on scroll
    gsap.to(meshRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })

    // Move down on scroll
    gsap.to(meshRef.current.position, {
      y: -2,
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })

    // Slight x rotation for dynamic feel
    gsap.to(meshRef.current.rotation, {
      x: 0.3,
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={meshRef} scale={viewport.width > 10 ? 3 : 2} position={[0, 1, 0]}>
        <primitive object={scene} scale={0.16} />
      </group>
    </Float>
  )
}

export function FormulaScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 1, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={0.5} intensity={4} color="#e31937" />
        <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <FormulaModel />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={8} blur={2} color="#e31937" />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
