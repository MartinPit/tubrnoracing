"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { TeamControlDeck } from "@/components/team/team-control-deck"
import { Season, Subsection } from "@/types/directus-schema"
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface TeamSidebarProps {
  currentSeason: string
  seasons: Pick<Season, "id" | "label">[]
  subsections: Subsection[]
}

export function Sidebar({
  currentSeason,
  seasons,
  subsections
}: TeamSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [activeSub, setActiveSub] = useState(subsections[0]);

  const { smoothNavigate } = useSmoothNavigate({
    root: "/team",
    slugs: [currentSeason],
    elements: [".parallax-img", ".member-card", ".sidebar-content", ".parallax-text"]
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.getAll().forEach(t => t.kill())

    subsections.forEach((sub: any) => {
      const section = document.querySelector(`[id="${sub.id}"]`)

      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveSub(sub),
          onEnterBack: () => setActiveSub(sub),
          onToggle: (self) => {
            if (self.isActive) setActiveSub(sub)
          },
        })
      }
    })

  }, { dependencies: [subsections], scope: sidebarRef })

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".sidebar-content",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4 }
    );
  }, { dependencies: [activeSub] });

  return (
    <>
      <div className="sidebar-content md:hidden fixed top-24 left-0 right-0 z-[45] bg-background/80 backdrop-blur-xl border-b border-border/10 px-5 py-3">
        <TeamControlDeck
          currentSeason={currentSeason}
          seasons={seasons}
          subsections={subsections}
          currentSubsection={activeSub}
          onNavigate={(yr, sec) => smoothNavigate([yr ?? currentSeason, sec ?? activeSub.id])}
        />
      </div>

      <aside className="w-full md:w-[40%] lg:w-[35%] md:sticky md:top-16 pt-8 z-30 self-start">
        <div className="h-[72px] md:hidden" />

        <div ref={sidebarRef} className="sidebar-content px-5 py-6 md:px-10 md:py-12 space-y-6 md:space-y-10">

          <div className="hidden md:block">
            <TeamControlDeck
              currentSeason={currentSeason}
              seasons={seasons}
              subsections={subsections}
              currentSubsection={activeSub}
              onNavigate={(yr, sec) => smoothNavigate([yr ?? currentSeason, sec ?? activeSub.id])}
            />
          </div>

          <div className="info space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 md:w-8 bg-primary" />
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary font-heading">
                SEASON {currentSeason}
              </p>
            </div>

            <h1 className="font-heading text-3xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-tighter">
              {activeSub.label.includes(" ") ? (
                <>
                  <span className="text-foreground">{activeSub.label.split(" ")[0]}</span>
                  <br className="hidden md:block" />{" "}
                  <span className="text-primary">{activeSub.label.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <span className="text-foreground">{activeSub.label}</span>
              )}
            </h1>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-sm opacity-80">
              {activeSub.description}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
