"use client"

import { Partner } from "@/types"
import { PartnerCard } from "../partners/partner-card"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

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

export function PartnersCards() {
  useGSAP(() => {
    gsap.from(".partner-card", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#partners",
        start: "top 85%",
        toggleActions: "play none none reverse",
        refreshPriority: 0,
      },
    })
  }, { dependencies: [partners] })

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {partners.map((partner, index) => (
        <PartnerCard key={index} partner={partner} className="partner-card" />
      ))}
    </div>
  )
}
