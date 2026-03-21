"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

interface Props {
  title: string
  subtitle: string
}

export function PartnerHero({ title, subtitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const firstWord = title.split(" ")[0]
  const rest = title.substring(firstWord.length)

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 48, opacity: 0, duration: 0.8, ease: "power3.out",
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="mb-20">
      <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Our Partners</p>
      <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight">
        {firstWord}<br />
        <span className="text-primary">{rest}</span>
      </h1>
      <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-lg">
        {subtitle}
      </p>
    </div>
  )
}
