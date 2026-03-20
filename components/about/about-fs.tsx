"use client"

import { useGSAP } from "@gsap/react"
import { StatDisplay } from "./stat-display"
import { useRef } from "react"
import gsap from "gsap"
import { CompetitionInfo } from "@/types"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import directusLoader from "@/lib/utils"
import ScrollTrigger from "gsap/ScrollTrigger"

interface Props {
  data: CompetitionInfo
}

export function AboutFS({ data }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)

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
    ScrollTrigger.refresh()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="mb-28">
      <div className="flex items-center gap-4 mb-12 anim-text">
        <div
          className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] bg-primary text-background"
          style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
        >
          01
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Formula Student
        </h2>
        <div className="flex-1 h-px bg-border/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        <div
          className="anim-img relative overflow-hidden border border-border/20"
          style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
        >
          <Image
            src={data.competition_image.id}
            loader={directusLoader}
            alt={data.competition_image.title || "Competition Image"}
            sizes="(max-width: 768px) 100vw, 50vw"
            width={data.competition_image.width || 600}
            height={data.competition_image.height || 400}
            preload
            fetchPriority="high"
            loading="eager"
            className="w-full h-80 md:h-[420px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-background/90 to-transparent">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading">
              {data.competition_image.title}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 anim-text">
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              <ReactMarkdown>
                {data.competition_info}
              </ReactMarkdown>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {data.competition_stats.map((s, i) => (
              <StatDisplay
                key={i}
                stat={s}
                className="anim-stat"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
