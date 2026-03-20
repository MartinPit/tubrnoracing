"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export function Hero({ title }: { title: string }) {

  useGSAP(() => {
    gsap.from(".about-hero", { y: 48, opacity: 0, duration: 0.75, ease: "power3.out" });
  })

  const parts = title.split(" ")
  const lastPart = parts.pop()

  return (
    <div className="about-hero mb-24" >
      <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Who We Are</p>
      <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight text-balance">
        <span className="block text-foreground">{parts.join(" ")}</span>
        <span className="block text-primary">{lastPart}</span>
      </h1>
    </div >
  )
}
