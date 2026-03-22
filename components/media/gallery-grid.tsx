"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GalleryCard } from "./gallery-card"
import { Lightbox } from "./ligthbox"
import { GalleryFile } from "@/types"
import { getGalleryItems } from "@/lib/directus/gallery"

gsap.registerPlugin(ScrollTrigger);

export function GalleryGrid({
  items: initialItems,
  activeCategory
}: {
  items: GalleryFile[],
  activeCategory: string
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  const [items, setItems] = useState<GalleryFile[]>(initialItems)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [lightboxItem, setLightboxItem] = useState<GalleryFile | null>(null)

  useEffect(() => {
    setItems(initialItems)
    setPage(1)
    setHasMore(true)
  }, [initialItems])

  useGSAP(() => {
    if (!gridRef.current || items.length === 0) return

    const cards = gridRef.current.querySelectorAll(".gallery-card")

    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          }
        )
      },
      start: "top 95%",
      once: true
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, { dependencies: [items], scope: gridRef })

  const loadMore = useCallback(async () => {
    if (!hasMore) return

    const nextPage = page + 1
    const newItems = await getGalleryItems(activeCategory, 12, nextPage)

    if (newItems.length === 0) {
      setHasMore(false)
    } else {
      setItems(prev => [...prev, ...newItems])
      setPage(nextPage)
    }
  }, [page, hasMore, activeCategory])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loadMore, hasMore])

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="font-heading text-4xl font-bold uppercase text-muted-foreground/30 mb-3">No items</p>
      </div>
    )
  }

  return (
    <>
      <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((item) => (
          <GalleryCard key={item.id} item={item} onClick={() => setLightboxItem(item)} />
        ))}
      </div>

      <div ref={loaderRef} className="h-20 flex items-center justify-center w-full">
        {hasMore ? (
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <p className="text-xs uppercase tracking-widest text-muted-foreground/50">End of Gallery</p>
        )}
      </div>

      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </>
  )
}
