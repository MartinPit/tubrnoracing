"use client"

import { PARTNER_TIERS } from "@/lib/data"
import { PartnerTier } from "@/types"
import { PartnerCard } from "./partner-card"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Partner } from "@/types/directus-schema"
import { cn } from "@/lib/utils"
import { WidthContainer } from "../width-container"

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
    <div ref={containerRef} className="flex flex-col gap-24">
      {Object.entries(PARTNER_TIERS).map(([name, tier]) => {
        const tierPartners = partners[name as PartnerTier]
        if (tierPartners.length === 0) return null

        return (
          <section
            key={name}
            className="partner-tier-section relative"
          >
            <div className="sticky top-24 z-20 py-4 bg-background/80 backdrop-blur-sm">
              <div className="tier-header-content flex items-center gap-4">
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
              </div>
            </div>

            <div className={cn("grid items-stretch justify-center gap-4 mt-8", tier.columns)}>
              {tierPartners.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  variant={name as PartnerTier}
                  className="partner-card"
                  imageLoading="lazy"
                />
              ))}
            </div>
          </section>
        )
      })}
    </div >
  )
}
