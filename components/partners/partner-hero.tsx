"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

export function PartnerHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 48, opacity: 0, duration: 0.8, ease: "power3.out",
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="mb-20">
      <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Our Partners</p>
      <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight">
        Sponsors<br />
        <span className="text-primary">&amp; Partners</span>
      </h1>
      <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-lg">
        TUBrnoRacing is made possible by the generosity and technical expertise of our partners. Every sponsor plays a direct role in putting our car on the track.
      </p>
    </div>
  )
}
