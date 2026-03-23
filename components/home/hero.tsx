"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface Props {
  title: string
  subtitle: string
}

export function Hero({ title = "TU BRNO RACING", subtitle}: Props) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    }).from(
      ".hero-subtitle",
      {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6"
    )
  }, { scope: container })

  const parts = title.split(" ")
  const lastPart = parts.pop()

  return (
    <div ref={container} className="relative z-20 text-center px-6">
      <h1 className="hero-title font-heading text-6xl sm:text-8xl lg:text-[12rem] font-bold uppercase tracking-normal leading-40">
        <span className="block text-foreground">{parts.join(" ")}</span>
        <span className="block text-primary">{lastPart}</span>
      </h1>
      <p className="hero-subtitle mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto tracking-wide">
        {subtitle}
      </p>
    </div>
  )
}
