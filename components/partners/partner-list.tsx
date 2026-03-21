"use client"

import { PARTNER_TIERS } from "@/lib/data"
import { Partner, PartnerTier } from "@/types"
import { PartnerCard } from "./partner-card"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const sponsors: Record<PartnerTier, Partner[]> = {
  university: [
    { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "university" },
  ],
  platinum: [
    { name: "Bosch", logoUrl: "/placeholder.svg?height=80&width=200", website: "https://www.bosch.com", tier: "platinum" },
    { name: "Continental", logoUrl: "/placeholder.svg?height=80&width=200", website: "https://www.continental.com", tier: "platinum" },
    { name: "Garrett Motion", logoUrl: "/placeholder.svg?height=80&width=200", website: "https://www.garrettmotion.com", tier: "platinum" },
  ],
  gold: [
    { name: "Brno University of Technology", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.vut.cz", tier: "gold" },
    { name: "CSO", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.cso.cz", tier: "gold" },
    { name: "Ansys", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.ansys.com", tier: "gold" },
    { name: "SolidWorks", logoUrl: "/placeholder.svg?height=64&width=160", website: "https://www.solidworks.com", tier: "gold" },
  ],
  silver: [
    { name: "Hexagon", logoUrl: "/placeholder.svg?height=48&width=130", website: "https://www.hexagon.com", tier: "silver" },
    { name: "Stilo", logoUrl: "/placeholder.svg?height=48&width=130", website: "https://www.stilo.com", tier: "silver" },
    { name: "Hella", logoUrl: "/placeholder.svg?height=48&width=130", website: "https://www.hella.com", tier: "silver" },
    { name: "Brose", logoUrl: "/placeholder.svg?height=48&width=130", website: "https://www.brose.com", tier: "silver" },
    { name: "KSR Group", logoUrl: "/placeholder.svg?height=48&width=130", website: "https://www.ksr-group.com", tier: "silver" },
    { name: "KSR Group 2", logoUrl: "/placeholder.svg?height=48&width=130", website: "https://www.ksr-group.com", tier: "silver" },
  ],
  bronze: [
    { name: "Motul", logoUrl: "/placeholder.svg?height=40&width=110", website: "https://www.motul.com", tier: "bronze" },
    { name: "AMS", logoUrl: "/placeholder.svg?height=40&width=110", website: "https://www.ams.com", tier: "bronze" },
    { name: "Partner F", logoUrl: "/placeholder.svg?height=40&width=110", website: "#", tier: "bronze" },
    { name: "Partner G", logoUrl: "/placeholder.svg?height=40&width=110", website: "#", tier: "bronze" },
    { name: "Partner H", logoUrl: "/placeholder.svg?height=40&width=110", website: "#", tier: "bronze" },
    { name: "Partner I", logoUrl: "/placeholder.svg?height=40&width=110", website: "#", tier: "bronze" },
    { name: "Partner I2", logoUrl: "/placeholder.svg?height=40&width=110", website: "#", tier: "bronze" },
  ],
}

export function PartnerList() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tiers = gsap.utils.toArray<HTMLElement>(".partner-tier-section")

    tiers.forEach((tier) => {
      gsap.from(tier.querySelector(".tier-header"), {
        y: 40,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tier,
          start: "top 82%",
        }
      })

      // Stagger the cards inside this specific tier
      gsap.from(tier.querySelectorAll(".partner-card"), {
        scale: 0.95,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: tier,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        clearProps: "all"
      })
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="flex flex-col gap-16">
      {Object.entries(PARTNER_TIERS).map(([name, tier], index) => (

        <div
          key={name}
          className="partner-tier-section"
        >
          <div className="flex items-center gap-4 mb-3">
            <div
              className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em]"
              style={{
                clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)",
                background: tier.color,
                color: "#0a0a0a",
              }}
            >
              {name}
            </div>
            <div className="flex-1 h-px" style={{ background: tier.border }} />
            <span
              className="shrink-0 text-[10px] font-heading uppercase tracking-[0.22em]"
              style={{ color: `${tier.color}/90` }}
            >
              {sponsors[name as PartnerTier].length} {sponsors[name as PartnerTier].length === 1 ? "partner" : "partners"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-6 ml-1">{tier.description}</p>
          <div className="flex flex-wrap items-stretch justify-center gap-4">
            {sponsors[name as PartnerTier].map((sponsor) => (
              <PartnerCard
                key={sponsor.name}
                partner={sponsor}
                variant={name as PartnerTier}
                className="partner-card"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
