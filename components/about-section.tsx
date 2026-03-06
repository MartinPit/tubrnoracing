"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "200+", label: "Team Members" },
  { value: "10", label: "Vehicles Built" },
  { value: "50+", label: "Competitions" },
]

function AboutModel() {
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

function AboutScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 1, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={0.5} intensity={4} color="#e31937" />
        <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <AboutModel />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={8} blur={2} color="#e31937" />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content parallax
      gsap.from(leftContentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Right content parallax
      gsap.from(rightContentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Stats stagger animation
      gsap.from(".stat-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative min-h-[150vh] py-32">
      <div className="sticky top-0 h-screen w-full">
        <AboutScene />
      </div>

      <div className="relative z-10 -mt-[100vh] pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="min-h-screen flex items-center">
            <div className="grid lg:grid-cols-2 gap-16 w-full">
              <div ref={leftContentRef} className="pointer-events-auto">
                <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
                  About
                  <span className="block text-primary">Us</span>
                </h2>

                <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-md">
                  We are a student team from the Brno University of Technology, which annually participates in the
                  worldwide competition - Formula Student.
                </p>
              </div>

              <div className="hidden lg:block" />
            </div>
          </div>

          <div className="min-h-[50vh] flex items-center justify-end">
            <div
              ref={rightContentRef}
              className="max-w-lg pointer-events-auto bg-background/80 backdrop-blur-sm p-8"
              style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                Every year, we design and build a Formula Student racing car, with which we then compete with other
                universities at races around the world. The goal is to develop and provide a platform for student
                engineers to experience, build, and learn.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Students gain and develop skills such as engineering, project management, and teamwork in a practical
                context.
              </p>
            </div>
          </div>

          <div className="py-24">
            <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item bg-background/80 backdrop-blur-sm p-6 border-l-2 border-primary">
                  <div className="font-heading text-4xl sm:text-5xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
