"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    }).from(
      subtitleRef.current,
      {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6",
    )

    // Parallax background
    gsap.to(bgRef.current, {
      y: 200,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(227,25,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227,25,55,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

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

      <div className="absolute top-0 left-8 w-px h-32 bg-gradient-to-b from-primary to-transparent z-20" />
      <div className="absolute top-0 right-8 w-px h-32 bg-gradient-to-b from-primary to-transparent z-20" />
    </section>
  )
}
