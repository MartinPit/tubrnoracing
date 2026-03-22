"use client"

import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"

interface Props {
  title: string
  subtitle: string
}

export function Hero(
  { title, subtitle }: Props
) {
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 48, opacity: 0, duration: 0.75, ease: "power3.out",
    })
  }, { scope: containerRef })

  const firstWord = title.split(" ")[0]
  const rest = title.split(" ").slice(1).join(" ")

  return (
    <div ref={containerRef} className="hero mb-16">
      <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Team Gallery</p>
      <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight text-balance">
        {firstWord}<br />
        <span className="text-primary">{rest}</span>
      </h1>
      <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-lg">
        {subtitle}
      </p>
    </div>
  )
}
