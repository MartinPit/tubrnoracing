"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { X, Play } from "lucide-react"
import { GalleryFile } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import directusLoader, { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

interface Props {
  item: GalleryFile
  onClose: () => void
}

export function Lightbox({ item, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const isTall = item.aspectRatio === "tall"
  const isSquare = item.aspectRatio === "square"
  const isWide = !isTall && !isSquare

  useGSAP(() => {
    gsap.from(overlayRef.current, { opacity: 0, buttonduration: 0.3, ease: "power2.out" })
    gsap.from(panelRef.current, { scale: 0.94, opacity: 0, duration: 0.35, ease: "power2.out" })
  }, { scope: overlayRef })

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const ratio = isTall ? 2 / 3 : isSquare ? 1 / 1 : 16 / 9

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 md:p-10"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className={cn(
          "relative flex flex-col bg-card border border-border/30 overflow-hidden shadow-2xl transition-all duration-500",
          isWide ? "w-full max-w-6xl" : cn(
            "w-full md:flex-row",
            isTall ? "max-w-2xl md:max-w-5xl" : "max-w-6xl"
          )
        )}
        style={{
          clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        }}
      >

        <div className={cn(
          "relative bg-muted overflow-hidden transition-all duration-500",
          !isWide ? "flex-[3.5]" : "w-full"
        )}>
          <AspectRatio ratio={ratio}>
            <Image
              src={item.id}
              loader={directusLoader}
              alt={item.title || "Gallery Image"}
              fill
              className="object-cover"
              loading="eager"
              fetchPriority="high"
            />

            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="group w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:fill-current transition-colors" />
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/40" />
          </AspectRatio>
        </div>

        <div className={cn(
          "flex p-8 bg-card shrink-0 z-10 transition-all",
          isWide ? "w-full flex-row items-center justify-between border-t border-border/10" : cn(
            "flex-col justify-between",
            "w-full md:w-80 lg:w-96 md:border-l border-border/10"
          )
        )}>
          <div className={cn(isWide && "flex items-center gap-10 flex-1")}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-heading">
                  {item.type === "video" ? "Video" : "Photo"}
                </p>
                <div className="h-px w-4 md:w-6 bg-primary" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-heading">
                  {item.categories.join(", ")}
                </p>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase leading-tight tracking-tighter text-foreground max-w-sm">
                {item.title}
              </h2>
              {item.description && (
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xs opacity-70">
                  {item.description}
                </p>
              )}
            </div>

            <Separator
              orientation={isWide ? "vertical" : "horizontal"}
              className={cn(
                "bg-primary shrink-0 transition-opacity",
                isWide
                  ? "mx-8 !h-8 md:!h-12 lg:!h-20 !w-[2px] opacity-40"
                  : "mt-8 w-10 !h-[2px] opacity-100"
              )}
            />
          </div>

        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className={cn(
            "absolute top-6 right-6 z-20 rounded-none bg-background/60 backdrop-blur-md size-12",
            "border-white/30 hover:border-primary/50 hover:text-primary transition-all",
            "active:scale-95 cursor-pointer"
          )}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
