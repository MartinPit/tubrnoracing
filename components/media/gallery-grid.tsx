"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { GalleryCard } from "./gallery-card"
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
