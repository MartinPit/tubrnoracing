"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { GalleryGrid } from "@/components/media/gallery-grid"
import { Media, MediaCategory } from "@/types"
import { Lightbox } from "@/components/media/ligthbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const CATEGORIES = ["All", "Car", "Team", "Competition", "Workshop"] as const

const mediaItems: Media[] = [
  { type: "image", name: "Dragon X — Front Wing Detail", src: "/placeholder.svg?height=506&width=900", category: "Car", aspectRatio: "wide", description: "oy cunt watafak is this" },
  { type: "image", name: "Team Photo 2024", src: "/placeholder.svg?height=700&width=700", category: "Team", aspectRatio: "square" },
  { type: "video", name: "Season Highlights 2024", src: "/placeholder.svg?height=900&width=600", category: "Competition", aspectRatio: "tall" },
  { type: "image", name: "Formula Student Germany", src: "/placeholder.svg?height=506&width=900", category: "Competition", aspectRatio: "wide" },
  { type: "image", name: "Aerodynamics Workshop", src: "/placeholder.svg?height=700&width=700", category: "Workshop", aspectRatio: "square" },
  { type: "image", name: "Dragon E — Reveal", src: "/placeholder.svg?height=506&width=900", category: "Car", aspectRatio: "wide" },
  { type: "video", name: "Dynamic Event Run", src: "/placeholder.svg?height=700&width=700", category: "Competition", aspectRatio: "square" },
  { type: "image", name: "Carbon Fibre Layup", src: "/placeholder.svg?height=900&width=600", category: "Workshop", aspectRatio: "tall" },
  { type: "image", name: "Scrutineering", src: "/placeholder.svg?height=506&width=900", category: "Competition", aspectRatio: "wide" },
  { type: "image", name: "Powertrain Assembly", src: "/placeholder.svg?height=700&width=700", category: "Workshop", aspectRatio: "square" },
  { type: "image", name: "Leadership Team", src: "/placeholder.svg?height=506&width=900", category: "Team", aspectRatio: "wide" },
  { type: "video", name: "Autocross Lap 2024", src: "/placeholder.svg?height=700&width=700", category: "Competition", aspectRatio: "square" },
  { type: "image", name: "Cockpit View", src: "/placeholder.svg?height=900&width=600", category: "Car", aspectRatio: "tall", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { type: "image", name: "Team Celebration", src: "/placeholder.svg?height=506&width=900", category: "Team", aspectRatio: "wide" },
  { type: "image", name: "Suspension Geometry", src: "/placeholder.svg?height=700&width=700", category: "Workshop", aspectRatio: "square" },
  { type: "video", name: "Behind The Build", src: "/placeholder.svg?height=506&width=900", category: "Car", aspectRatio: "wide" },
]

export default function MediaPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<MediaCategory>("All")
  const [lightboxItem, setLightboxItem] = useState<(typeof mediaItems)[number] | null>(null)

  const filtered = activeCategory === "All" ? mediaItems : mediaItems.filter((m) => m.category === activeCategory)

  useGSAP(() => {
    gsap.from(".media-hero", {
      y: 48, opacity: 0, duration: 0.75, ease: "power3.out",
    })
    gsap.from(".media-filters", {
      y: 24, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.2,
    })
  }, { scope: containerRef })

  return (
    <>
      <main
        ref={containerRef}
        className="bg-background text-foreground min-h-screen pb-32"
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Hero */}
          <div className="media-hero mb-16">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Team Gallery</p>
            <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight text-balance">
              Media<br />
              <span className="text-primary">Gallery</span>
            </h1>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-lg">
              Behind every lap is a season of work. Browse photos and videos from our workshops, competitions, and events worldwide.
            </p>
          </div>

          {/* Filter bar */}
          <div className="media-filters mb-12 border-b border-border/20">

            {/* MOBILE: Select Component */}
            <div className="flex md:hidden items-center justify-between pb-4">
              <Select
                value={activeCategory}
                onValueChange={(val) => setActiveCategory(val as MediaCategory)}
              >
                <SelectTrigger className="w-[180px] font-heading text-[10px] uppercase tracking-[0.2em] border-border/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="font-heading text-[10px] uppercase tracking-[0.1em]">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {filtered.length} Items
              </div>
            </div>

            {/* DESKTOP: Tabs Component */}
            <div className="hidden md:flex items-center gap-1">
              <Tabs
                value={activeCategory}
                onValueChange={(val) => setActiveCategory(val as MediaCategory)}
                className="w-full"
              >
                <TabsList className="bg-transparent h-auto p-0 flex items-center justify-start gap-1">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      className={`
                        relative shrink-0 font-heading text-xs uppercase tracking-[0.2em] px-5 py-3 transition-colors duration-200
                        bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none
                        data-[state=active]:text-primary text-muted-foreground hover:text-foreground
                      `}
                    >
                      {cat}
                      {activeCategory === cat && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                      )}
                    </TabsTrigger>
                  ))}

                </TabsList>
              </Tabs>
              <div className="ml-auto shrink-0 font-heading text-[10px] uppercase tracking-[0.25em] text-muted-foreground py-3 pl-6 border-l border-border/20">
                {filtered.length} items
              </div>
            </div>
          </div>

          {/* Gallery */}
          <GalleryGrid items={filtered} onItemClick={setLightboxItem} />

        </div>
      </main>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </>
  )
}
