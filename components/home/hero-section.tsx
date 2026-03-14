"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline()

    // Keep opacity at 1 from the start so the browser can measure/report LCP
    // immediately — only animate the y-translate as a progressive enhancement.
    tl.from(titleRef.current, {
      y: 100,
      duration: 1.2,
      ease: "power4.out",
      clearProps: "transform",
    }).from(
      subtitleRef.current,
      {
        y: 50,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform",
      },
      "-=0.6",
    )
  })

  return () => ctx.revert()
}, [])

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-10 pointer-events-none" />
      <div className="relative z-20 text-center px-6">
        <h1
          ref={titleRef}
          className="font-heading text-6xl sm:text-8xl lg:text-[12rem] font-bold uppercase tracking-tighter leading-none"
        >
          <span className="block text-foreground">TU Brno</span>
          <span className="block text-primary">Racing</span>
        </h1>
        <p ref={subtitleRef} className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto tracking-wide">
          Engineering the Future of Motorsport
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>

    </section>
  )
}
