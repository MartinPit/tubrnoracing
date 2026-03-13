"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { Play } from "lucide-react"
import { Media } from "@/types"

interface Props {
  items: Media[]
  onItemClick: (item: Media) => void
}

export function GalleryGrid({ items, onItemClick }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll(".gallery-card")
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "transform",
      }
    )
  }, [items])

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="font-heading text-4xl font-bold uppercase text-muted-foreground/30 mb-3">No items</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Select a different category</p>
      </div>
    )
  }

  return (
    <div
      ref={gridRef}
      className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
    >
      {items.map((item, index) => (
        <GalleryCard key={`${item.name}-${index}`} item={item} onClick={() => onItemClick(item)} />
      ))}
    </div>
  )
}

function GalleryCard({
  item,
  onClick,
}: {
  item: Media
  onClick: () => void
}) {
  const aspectClass =
    item.aspectRatio === "tall"
      ? "aspect-[2/3]"
      : item.aspectRatio === "square"
        ? "aspect-square"
        : "aspect-video"

  return (
    <button
      onClick={onClick}
      className="gallery-card relative w-full overflow-hidden group cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
      aria-label={`View ${item.name}`}
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        <Image
          src={item.src || "/placeholder.svg"}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Video play button */}
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Play className="w-5 h-5 text-primary-foreground ml-1" />
            </div>
          </div>
        )}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-heading text-sm font-bold uppercase tracking-tight text-foreground text-left line-clamp-1">
            {item.name}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary mt-0.5 text-left">
            {item.category}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Corner accent */}
        <div className="pointer-events-none absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/80 transition-colors duration-300" />
      </div>
    </button>
  )
}

