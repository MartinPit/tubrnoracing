"use client"

import type React from "react"
import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"

interface RacingButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "outline"
}

export function RacingButton({ href, children, variant = "primary" }: RacingButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const bgRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const handleMouseEnter = () => {
    gsap.to(bgRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out",
    })
    gsap.to(textRef.current, {
      x: 4,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.in",
    })
    gsap.to(textRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const isPrimary = variant === "primary"

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative inline-flex items-center gap-6 px-8 py-4 overflow-hidden
        font-heading uppercase tracking-[0.15em] text-sm font-semibold
        border transition-colors duration-300
        ${
          isPrimary
            ? "border-primary text-primary hover:text-primary-foreground"
            : "border-foreground/30 text-foreground hover:text-background"
        }
      `}
    >
      <span
        ref={bgRef}
        className={`absolute inset-0 origin-left scale-x-0 ${isPrimary ? "bg-primary" : "bg-foreground"}`}
      />

      <span ref={textRef} className="relative z-10 flex items-center gap-4">
        {children}
        <svg
          className="w-5 h-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  )
}
