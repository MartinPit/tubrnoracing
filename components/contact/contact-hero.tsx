"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface Props {
  title: string
  subtitle: string
}

export function ContactHero({ title = "Contact Us", subtitle }: Props) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from(ref.current, { y: 48, opacity: 0, duration: 0.75, ease: "power3.out" })
  }, { scope: ref })

  const parts = title.split(" ")
  const lastPart = parts.pop()

  return (
    <div ref={ref} className="mb-20">
      <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Get In Touch</p>
      <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight">
        <span className="block text-foreground">{parts.join(" ")}</span>
        <span className="block text-primary">{lastPart}</span>
      </h1>
      <p className="mt-6 text-sm text-muted-foreground max-w-lg">
        {subtitle}
      </p>
    </div>
  )
}
