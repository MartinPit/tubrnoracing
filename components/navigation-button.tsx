"use client"
import type React from "react"
import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface RacingButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "outline"
}

export function NavigationButton({ href, children, variant = "primary" }: RacingButtonProps) {
  const bgRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const handleMouseEnter = () => {
    gsap.to(bgRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out", overwrite: true })
    gsap.to(textRef.current, { x: 4, duration: 0.3, ease: "power2.out", overwrite: true })
  }

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in", overwrite: true })
    gsap.to(textRef.current, { x: 0, duration: 0.3, ease: "power2.out", overwrite: true })
  }

  const isPrimary = variant === "primary"
  const hexClip = "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)"

  return (
    <Button
      asChild
      variant="ghost"
      className="p-0 h-auto rounded-none bg-transparent hover:bg-transparent w-fit overflow-visible group"
    >
      <Link
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
      >
        <div
          className={cn(
            "absolute inset-0 transition-colors duration-300",
            isPrimary ? "bg-primary" : "bg-foreground/30"
          )}
          style={{ clipPath: hexClip }}
        />
        <div
          className="relative m-[1px] bg-background overflow-hidden"
          style={{ clipPath: hexClip }}
        >
          <span
            ref={bgRef}
            className={cn(
              "absolute inset-0 origin-left scale-x-0 z-0",
              isPrimary ? "bg-primary" : "bg-foreground"
            )}
          />

          <div
            className={cn(
              "relative z-10 flex items-center gap-4 px-8 py-4 whitespace-nowrap transition-colors duration-300",
              isPrimary
                ? "text-primary group-hover:text-primary-foreground"
                : "text-foreground group-hover:text-background"
            )}
          >
            <span ref={textRef} className="flex items-center gap-4 pointer-events-none">
              {children}
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </Button>
  )
}
