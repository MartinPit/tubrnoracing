"use client"

import { Social } from "@/types"
import { SocialCard } from "../media/social-card"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

const socialPosts: Social[] = [
  { platform: "instagram", image: "/placeholder.png?height=400&width=400", link: "#", name: "Instagram Post" },
  { platform: "youtube", image: "/placeholder.png?height=400&width=600", link: "#", name: "YouTube Video" },
  { platform: "instagram", image: "/placeholder.png?height=400&width=400", link: "#", name: "Instagram Post" },
  { platform: "facebook", image: "/placeholder.png?height=400&width=500", link: "#", name: "Facebook Post" },
  { platform: "instagram", image: "/placeholder.png?height=400&width=400", link: "#", name: "Instagram Post" },
  { platform: "youtube", image: "/placeholder.png?height=400&width=600", link: "#", name: "YouTube Video" },
  { platform: "youtube", image: "/placeholder.png?height=400&width=600", link: "#", name: "YouTube Video" },
]

export function SocialTrack() {
  const container = useRef<HTMLDivElement>(null)

  const allPosts = [...socialPosts, ...socialPosts]

  useGSAP(() => {
    gsap.to("#track", {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    })
  })

  return (
    <div ref={container} className="relative">
      <div id="track" className="flex gap-4">
        {allPosts.map((post, index) => (

          <SocialCard key={index} item={post} />
        ))}
      </div>
    </div>
  )
}
