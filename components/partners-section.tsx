"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { NavigationButton } from "./navigation-button"

gsap.registerPlugin(ScrollTrigger)

const partners = [
  { name: "Bosch", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Continental", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Garrett", logo: "/placeholder.svg?height=80&width=160" },
  { name: "CSO", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Stilo", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Siemens", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Dassault", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Ansys", logo: "/placeholder.svg?height=80&width=160" },
]

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partner-logo", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: logosRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="partners" ref={sectionRef} className="py-24 px-6 bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl font-bold uppercase tracking-tight mb-4">
            Our <span className="text-primary">Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are proud to collaborate with industry-leading companies that support our mission.
          </p>
        </div>

        <div ref={logosRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="partner-logo group bg-card p-8 flex items-center justify-center cursor-pointer relative overflow-hidden transition-colors duration-300 hover:bg-card/80"
              style={{
                clipPath:
                  index % 2 === 0
                    ? "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
                    : "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)",
              }}
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-h-12 w-auto opacity-50 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Interested in partnering with us?</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NavigationButton href="/partners" variant="outline">
              View All Partners
            </NavigationButton>
            <NavigationButton href="#contact">Become A Partner</NavigationButton>
          </div>
        </div>
      </div>
    </section>
  )
}
