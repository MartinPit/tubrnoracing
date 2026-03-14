"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"

// Lazy-load the Three.js canvas: it fetches a GLB file and initialises WebGL,
// both of which block main-thread during initial load if imported eagerly.
const FormulaScene = dynamic(
  () => import("./formula-model").then((m) => m.FormulaScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-transparent" /> }
)

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "200+", label: "Team Members" },
  { value: "10", label: "Vehicles Built" },
  { value: "50+", label: "Competitions" },
]

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
        <FormulaScene />
      </div>

      <div className="relative z-10 -mt-[120vh] pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="min-h-screen flex items-center">
            <div className="grid lg:grid-cols-2 gap-16 w-full">
              <div
                ref={leftContentRef}
                className="max-w-lg pointer-events-auto bg-background/80 backdrop-blur-sm p-8"
              >
                <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
                  About
                  <span className="block text-primary">Us</span>
                </h2>

                <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-md">
                  We are a student team from the Brno University of Technology, which annually participates in the
                  worldwide competition - Formula Student.
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[50vh] flex items-center justify-end">
            <div
              ref={rightContentRef}
              className="max-w-lg pointer-events-auto bg-background/80 backdrop-blur-sm p-8"
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
