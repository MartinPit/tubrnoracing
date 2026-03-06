"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { RacingButton } from "./racing-button"

gsap.registerPlugin(ScrollTrigger)

const teamPreview = [
  { role: "Team Principal", name: "Team Leadership", image: "/placeholder.svg?height=400&width=300" },
  { role: "Technical Director", name: "Engineering Lead", image: "/placeholder.svg?height=400&width=300" },
  { role: "Aerodynamics", name: "Aero Team", image: "/placeholder.svg?height=400&width=300" },
  { role: "Powertrain", name: "Engine Team", image: "/placeholder.svg?height=400&width=300" },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="team" ref={sectionRef} className="min-h-screen py-24 px-6 bg-muted">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl font-bold uppercase tracking-tight">
            Our <span className="text-primary">Team</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamPreview.map((member, index) => (
            <div
              key={index}
              className="team-card group relative overflow-hidden cursor-pointer"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-card">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs uppercase tracking-widest text-primary mb-1">{member.role}</div>
                <div className="font-heading text-xl font-semibold">{member.name}</div>
              </div>
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-muted-foreground">200+ passionate students working together to push the limits</p>
          <RacingButton href="/team">Meet The Full Team</RacingButton>
        </div>
      </div>
    </section>
  )
}
