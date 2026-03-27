"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import directusLoader, { cn } from "@/lib/utils"
import { Member } from "@/types/directus-schema"
import { TeamMemberDisplay } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Mail, Phone } from "lucide-react"

interface Props {
  member: TeamMemberDisplay
  index: number
  className?: string,
  isScrollAnimated?: boolean
  imageLoading?: "eager" | "lazy"
};

export function MemberCard({
  member,
  className,
  index,
  isScrollAnimated = true,
  imageLoading = "eager"
}: Props) {
  const container = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({
    scope: container,
  }, []);

  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 40,
      rotateX: -10,
      duration: 1,
      delay: index * 0.08,
      ease: "power4.out",
      clearProps: "opacity, transform",
      scrollTrigger: isScrollAnimated ? {
        trigger: container.current,
        start: "top 90%",
        toggleActions: "play none none none",
      } : undefined
    })
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
      overwrite: "auto",
    })
    gsap.to(".parallax-text", { x: 0, y: 0, duration: 0.6 })
  })

  const hexClip = "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)"
  const person = member.member as Member

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={container}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "member-card group relative aspect-[3/4] overflow-hidden bg-zinc-950 cursor-pointer",
            className
          )}
          style={{ clipPath: hexClip }}
        >
          <div className={cn("parallax-img absolute inset-0 w-full h-full")}>
            <Image
              src={member.image?.id || "placeholder"}
              loader={directusLoader}
              alt={person.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="parallax-text absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 font-black italic">
              {member.custom_title || `${member.season_subsection.subsection.label}`}
            </div>
            <div className="font-heading text-3xl font-bold text-white uppercase leading-none">
              {person.name}
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "bg-zinc-950 border-zinc-800 text-white p-0 overflow-hidden",
          "max-w-[90vw] md:max-w-[700px] lg:max-w-[1000px]",
          "h-auto max-h-[95vh]"
        )}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-[45%] aspect-[3/4] bg-zinc-900">
            <Image
              src={member.image?.id || "placeholder"}
              loader={directusLoader}
              alt={person.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              loading={imageLoading}
            />
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center min-w-[300px] max-w-[450px]">
            <DialogHeader className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 font-black italic">
                {member.custom_title ? member.custom_title : `${member.season_subsection.subsection.label}`}
              </div>
              <DialogTitle className="font-heading text-3xl lg:text-4xl font-bold text-white tracking-tighter uppercase leading-[0.9] break-words">
                {person.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              <div className="grid gap-3">
                {person.email && (
                  <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group/link">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-mono lowercase tracking-tight">{person.email}</span>
                  </a>
                )}
                {person.phone && (
                  <a href={`tel:${person.phone}`} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-mono tracking-tight">{person.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
