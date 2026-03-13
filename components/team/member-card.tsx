"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"
import { Member } from "@/types"

export function MemberCard({ member, className }: { member: Member; className?: string }) {
  const container = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({
    scope: container,
  }, []);

  useGSAP(() => {
    gsap.set(".parallax-img", { scale: 1.1 });
  }, { scope: container });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    gsap.to(".parallax-text", { x: x * 20, y: y * 20, duration: 0.5, ease: "power2.out" })
  })

  const handleMouseEnter = contextSafe(() => {
    gsap.to(".parallax-img", {
      scale: 1.18,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    })
  })
  const handleMouseLeave = contextSafe(() => {
    gsap.to(".parallax-img", {
      scale: 1.1,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: "auto"
    })
    gsap.to(".parallax-text", { x: 0, y: 0, duration: 0.6 })
  })

  const hexClip = "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)"

  return (
    <div
      ref={container}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative aspect-[3/4] overflow-hidden bg-zinc-950 cursor-pointer",
        className
      )}
      style={{ clipPath: hexClip }}
    >
      <div className="parallax-img absolute inset-0 w-full h-full grayscale transition-opacity duration-700 will-change-transform">
        <Image
          src={member.imageUrl || "/placeholder.svg"}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-15 pointer-events-none" />

      <div className="parallax-text absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 font-black italic">
          {member.role.name}
        </div>
        <div className="font-heading text-3xl font-bold text-white tracking-tighter uppercase leading-none">
          {member.name}
        </div>
      </div>

<div className="absolute bottom-[1px] w-0 h-[2px] bg-primary group-hover:w-[90%] transition-all duration-500 z-40" />    </div>
  )
}
