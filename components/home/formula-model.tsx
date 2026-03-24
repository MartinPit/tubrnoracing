"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, Float, ContactShadows, PresentationControls, Center } from "@react-three/drei"
import gsap from "gsap"
import type * as THREE from "three"
import { env } from "@/env"
import { useGSAP } from "@gsap/react"

function FormulaModel({ modelId }: { modelId: string }) {
  const meshRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(`${env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${modelId}`)
  const { viewport } = useThree()

  useGSAP(() => {
    if (!meshRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    tl.to(meshRef.current.rotation, { y: Math.PI * 2 }, 0)
      .to(meshRef.current.position, { y: -2 }, 0)
      .to(meshRef.current.rotation, { x: 0.3 }, 0.5);

  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <PresentationControls
        global
        snap={true}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 2, Math.PI / 2]}
        damping={0.5}
      >
        <group ref={meshRef} scale={viewport.width > 10 ? 3 : 2} position={[0, 1, 0]}>
          <Center top>
          <primitive object={scene} scale={0.16} />
          </Center>
        </group>
      </PresentationControls>
    </Float>
  )
}

export function FormulaScene({ modelId }: { modelId: string }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 80 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <spotLight
          position={[5, 10, 5]}
          angle={0.15}
          penumbra={1}
          intensity={5}
          color="#e31937"
          castShadow
        />
        <spotLight
          position={[-5, 5, -5]}
          angle={0.2}
          penumbra={1}
          intensity={3}
          color="#4e54c8"
        />
        <FormulaModel modelId={modelId} />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={8} blur={2} color="#e31937" />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
