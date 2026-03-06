"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play } from "lucide-react"
import { NavigationButton } from "./racing-button"

gsap.registerPlugin(ScrollTrigger)

const mediaItems = [
  { type: "image", src: "/placeholder.svg?height=500&width=700" },
  { type: "video", src: "/placeholder.svg?height=500&width=700" },
  { type: "image", src: "/placeholder.svg?height=500&width=700" },
  { type: "image", src: "/placeholder.svg?height=500&width=700" },
  { type: "video", src: "/placeholder.svg?height=500&width=700" },
  { type: "image", src: "/placeholder.svg?height=500&width=700" },
  { type: "image", src: "/placeholder.svg?height=500&width=700" },
]

export function MediaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContent = scrollContentRef.current
      const scrollContainer = scrollContainerRef.current

      if (scrollContent && scrollContainer) {
        const scrollWidth = scrollContent.scrollWidth - scrollContainer.offsetWidth

        gsap.to(scrollContent, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="media" ref={sectionRef} className="h-screen overflow-hidden">
      <div ref={scrollContainerRef} className="h-full flex flex-col justify-center">
        <div className="px-6 mb-8">
          <div className="container mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight">
              Media <span className="text-primary">Gallery</span>
            </h2>
            <NavigationButton href="/media" variant="outline">
              View All
            </NavigationButton>
          </div>
        </div>

        <div ref={scrollContentRef} className="flex gap-6 px-6 items-center">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="media-item relative flex-shrink-0 w-[70vw] sm:w-[50vw] lg:w-[35vw] aspect-[4/3] overflow-hidden group cursor-pointer"
            >
              <img
                src={item.src || "/placeholder.svg"}
                alt="Media"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        <div className="px-6 mt-8">
          <div className="container mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Scroll to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
