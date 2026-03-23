"use client"

import { PARTNER_TIERS } from "@/lib/data"
import { PartnerTier } from "@/types"
import { PartnerCard } from "./partner-card"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Partner } from "@/types/directus-schema"
import { cn } from "@/lib/utils"

interface Props {
  partners: Record<PartnerTier, Partner[]>
}

export function PartnerList({ partners }: Props) {
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
      {Object.entries(PARTNER_TIERS).map(([name, tier]) => {
        if (partners[name as PartnerTier].length === 0) return null
        return (
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
                {tier.name}
              </div>
              <div className="flex-1 h-px" style={{ background: tier.border }} />
              <span
                className="shrink-0 text-[10px] font-heading uppercase tracking-[0.22em]"
                style={{ color: `${tier.color}/90` }}
              >
                {partners[name as PartnerTier].length} {partners[name as PartnerTier].length === 1 ? "partner" : "partners"}
              </span>
            </div>
            <div className={cn("grid items-stretch justify-center gap-4", tier.columns)}>
              {partners[name as PartnerTier].map((partner) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  variant={name as PartnerTier}
                  className="partner-card"
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
