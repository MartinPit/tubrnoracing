"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { NavigationButton } from "../navigation-button"
import { PartnerCard } from "../partners/partner-card"
import { Partner } from "@/types"

gsap.registerPlugin(ScrollTrigger)

const partners: Partner[] = [
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
]

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partner-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsref.current,
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
        <div className="text-center mb-8">
          <h2 className="font-heading text-5xl sm:text-7xl font-bold uppercase tracking-tight mb-4">
            Our <span className="text-primary">Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are proud to collaborate with industry-leading companies that support our mission.
          </p>
        </div>

        <div ref={cardsref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <PartnerCard key={index} partner={partner} className="partner-card" />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Interested in partnering with us?</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NavigationButton href="/partners" variant="outline">
              View All Partners
            </NavigationButton>
            <NavigationButton href="/partners#form">Become A Partner</NavigationButton>
          </div>
        </div>
      </div>
    </section>
  )
}
