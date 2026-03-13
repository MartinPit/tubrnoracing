"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Media } from "@/types"

type LightboxMedia = Media & { category: string; aspectRatio?: string }

interface Props {
  item: LightboxMedia
  onClose: () => void
}

export function Lightbox({ item, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" })
      gsap.from(panelRef.current, { scale: 0.94, opacity: 0, duration: 0.35, ease: "power2.out" })
    })

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"

    return () => {
      ctx.revert()
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      <div
        ref={panelRef}
        className="relative flex flex-col lg:flex-row w-full max-w-5xl max-h-[90vh] bg-card border border-border/30 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        }}
      >
        {/* Image / Video area */}
        <div className="relative flex-1 min-h-[40vh] lg:min-h-[60vh] bg-muted overflow-hidden">
          <Image
            src={item.src || "/placeholder.svg"}
            alt={item.name}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
            priority
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm shadow-xl">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </div>
          )}
          {/* Corner accents */}
          <div className="pointer-events-none absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/60" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/60" />
        </div>

        {/* Info panel */}
        <div className="flex flex-col justify-between p-8 lg:w-72 shrink-0 bg-card">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-heading mb-3">
              {item.type === "video" ? "Video" : "Photo"} — {item.category}
            </p>
            <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-foreground mb-6 text-balance">
              {item.name}
            </h2>
            <div className="w-8 h-[2px] bg-primary" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              TU Brno Racing
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border/30 text-foreground hover:text-primary hover:border-primary/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
