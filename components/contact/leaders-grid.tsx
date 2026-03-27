"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { ContactCard } from "./contact-card"
import { LeaderContactDisplay } from "@/types"

interface Props {
  leaders: LeaderContactDisplay[]
}

export function LeadersGrid({ leaders }: Props) {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from(".leader-card", {
      y: 24, opacity: 0, duration: 0.4, ease: "power2.out", stagger: 0.05,
      scrollTrigger: { trigger: container.current, start: "top 82%" },
    })
  }, { scope: container })


  const technicalLead = leaders.find(leader => leader.custom_title === "Technical Leader");

  return (
    <div ref={container} className="border-t border-border/20">
      <div className="flex items-center gap-4 mb-8">
        <div
          className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] bg-primary text-background"
          style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
        >
          Section Leaders
        </div>
        <div className="flex-1 h-px bg-border/30" />
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-heading shrink-0">
          {leaders.length} contacts
        </span>
      </div>

      <div className="leaders-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          technicalLead!,
          ...leaders.filter(leader => ![technicalLead!.id].includes(leader.id))
        ].map((leader, i) => (
          <ContactCard key={i} leader={leader} />
        ))}
      </div>
    </div>
  )
}
