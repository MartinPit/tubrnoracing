"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SocialCard } from "../media/social-card"
import { Social } from "@/types"
import Link from "next/link"
import { SOCIALS } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

const socialPosts: Social[] = [
  { platform: "instagram", image: "/placeholder.svg?height=400&width=400", link: "#", name: "Instagram Post" },
  { platform: "youtube", image: "/placeholder.svg?height=400&width=600", link: "#", name: "YouTube Video" },
  { platform: "instagram", image: "/placeholder.svg?height=400&width=400", link: "#", name: "Instagram Post" },
  { platform: "facebook", image: "/placeholder.svg?height=400&width=500", link: "#", name: "Facebook Post" },
  { platform: "instagram", image: "/placeholder.svg?height=400&width=400", link: "#", name: "Instagram Post" },
  { platform: "youtube", image: "/placeholder.svg?height=400&width=600", link: "#", name: "YouTube Video" },
  { platform: "youtube", image: "/placeholder.svg?height=400&width=600", link: "#", name: "YouTube Video" },
]

export function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite horizontal scroll animation
      const track = trackRef.current
      if (!track) return

      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const allPosts = [...socialPosts, ...socialPosts]

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden border-t border-border">
      <div className="px-6 mb-12">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Stay Connected</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tight">Follow Our Journey</h2>
          </div>
          <div className="flex gap-4">
            {SOCIALS.filter(({ name }) => name != "LinkedIn").map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary pb-1"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div ref={trackRef} className="flex gap-4">
          {allPosts.map((post, index) => (

            <SocialCard key={index} item={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
