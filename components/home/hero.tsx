"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { FlipWords } from "@/components/ui/flip-words"

const TARGET_DATE = new Date("2026-05-15T00:00:00")

const FLIP_WORDS = [
  "new challenges",
  "new opportunities",
  "new victories",
  "the next race",
  "the season",
]

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = Math.max(TARGET_DATE.getTime() - now.getTime(), 0)

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

interface Props {
  title: string
  subtitle: string
}

export function Hero({ title = "TU BRNO RACING" }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          ".hero-flip",
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .from(
          ".hero-countdown-unit",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-label",
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
    },
    { scope: container }
  )

  const parts = title.split(" ")
  const lastPart = parts.pop()

  const units: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div ref={container} className="relative z-20 text-center px-6 flex flex-col items-center gap-10">
      {/* Title */}
      <h1 className="hero-title font-heading text-5xl sm:text-7xl lg:text-[10rem] font-bold uppercase tracking-normal lg:leading-none leading-none">
        <span className="block text-foreground">{parts.join(" ")}</span>
        <span className="block text-primary">{lastPart}</span>
      </h1>

      {/* Flip words line */}
      <p className="hero-flip text-lg sm:text-xl text-muted-foreground tracking-wide flex flex-wrap items-center justify-center gap-1">
        <span>Expect</span>
        <FlipWords
          words={FLIP_WORDS}
          duration={2800}
          className="text-primary font-semibold px-0"
        />
      </p>

      {/* Countdown */}
      <div className="flex items-end gap-6 sm:gap-10">
        {units.map(({ label, value }, i) => (
          <div key={label} className="flex items-end gap-6 sm:gap-10">
            <div className="hero-countdown-unit flex flex-col items-center gap-1">
              <span className="font-heading font-bold text-5xl sm:text-7xl lg:text-8xl text-foreground tabular-nums inline-block w-[2.2ch] text-center">
                <AnimatedNumber
                  value={value}
                  stiffness={120}
                  damping={20}
                  format={(v) => String(Math.round(v)).padStart(2, "0")}
                />
              </span>
              <span className="hero-label text-xs sm:text-sm uppercase tracking-widest text-muted-foreground font-heading">
                {label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-primary font-bold text-4xl sm:text-6xl lg:text-7xl pb-5 select-none leading-none">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Date label */}
      <p className="hero-label text-sm text-muted-foreground tracking-widest uppercase font-heading">
        15 · 05 · 2026
      </p>
    </div>
  )
}
