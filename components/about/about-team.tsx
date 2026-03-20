"use client"

import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { StatDisplay } from "./stat-display"
import gsap from "gsap"
import { TeamInfo } from "@/types"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import directusLoader from "@/lib/utils"

const tuStats = [
  { value: "100+", label: "Active team members" },
  { value: "15", label: "Combustion cars built" },
  { value: "5", label: "Electric cars built" },
  { value: "2004", label: "Year founded" },
]

interface Props {
  data: TeamInfo
}

export function AboutTeam({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(".anim-text", {
      y: 32,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      },
    })

    gsap.from(".anim-img", {
      scale: 1.04,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      },
    })

    gsap.from(".anim-stat", {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.07,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 72%"
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef}>
      <div className="flex items-center gap-4 mb-12 anim-text">
        <div
          className="shrink-0 p-[1px] bg-primary/40"
          style={{
            clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)"
          }}
        >
          <div
            className="px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] text-primary bg-background"
            style={{
              clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)"
            }}
          >
            02
          </div>
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
          TUBrnoRacing
        </h2>
        <div className="flex-1 h-px bg-border/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        <div className="flex flex-col gap-8 lg:order-1">
          <div className="flex flex-col gap-4 anim-text">
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              <ReactMarkdown>
                {data.team_info}
              </ReactMarkdown>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {data.team_stats.map((s, i) => (
              <StatDisplay
                key={i}
                stat={s}
                className="anim-stat"
              />
            ))}
          </div>
        </div>

        <div
          className="anim-img relative overflow-hidden border border-border/20 lg:order-2"
          style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
        >
          <Image
            src={data.team_image.id}
            loader={directusLoader}
            alt={data.team_image.title || "Team Image"}
            sizes="(max-width: 768px) 100vw, 50vw"
            width={data.team_image.width || 600}
            height={data.team_image.height || 400}
            priority
            className="w-full h-80 md:h-[420px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-background/90 to-transparent">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading">
              {data.team_image.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
