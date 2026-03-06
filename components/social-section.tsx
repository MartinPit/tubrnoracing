"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Youtube, Facebook, Linkedin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socialPosts = [
  { platform: "instagram", image: "/placeholder.svg?height=400&width=400", link: "#" },
  { platform: "youtube", image: "/placeholder.svg?height=400&width=600", link: "#" },
  { platform: "instagram", image: "/placeholder.svg?height=400&width=400", link: "#" },
  { platform: "facebook", image: "/placeholder.svg?height=400&width=500", link: "#" },
  { platform: "instagram", image: "/placeholder.svg?height=400&width=400", link: "#" },
  { platform: "youtube", image: "/placeholder.svg?height=400&width=600", link: "#" },
  { platform: "linkedin", image: "/placeholder.svg?height=400&width=500", link: "#" },
]

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconClass = "w-5 h-5"
  switch (platform) {
    case "instagram":
      return <Instagram className={iconClass} />
    case "youtube":
      return <Youtube className={iconClass} />
    case "facebook":
      return <Facebook className={iconClass} />
    case "linkedin":
      return <Linkedin className={iconClass} />
    default:
      return null
  }
}

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

  // Duplicate posts for infinite scroll effect
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
            {["Instagram", "YouTube", "Facebook", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary pb-1"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div ref={trackRef} className="flex gap-4">
          {allPosts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              className="relative flex-shrink-0 w-64 sm:w-80 aspect-square overflow-hidden group"
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <PlatformIcon platform={post.platform} />
                </div>
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <PlatformIcon platform={post.platform} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
