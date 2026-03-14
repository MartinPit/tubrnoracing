"use client"

import { useRef, Suspense } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Canvas } from "@react-three/fiber"
import { SubsectionModel } from "@/components/team/subsection-model"
import { TeamControlDeck } from "@/components/team/team-control-deck"

const years = Array.from({ length: 15 }, (_, i) => String(2012 + i))
const subsections = [
  { id: "leadership", label: "Leadership", short: "LEAD", description: "Strategic direction and team coordination for Formula Student excellence." },
  { id: "aerodynamics", label: "Aerodynamics", short: "AERO", description: "Designing airflow solutions for maximum downforce and minimal drag." },
  { id: "chassis", label: "Chassis", short: "CHAS", description: "Engineering the structural backbone and safety cell of the vehicle." },
  { id: "suspension", label: "Suspension", short: "SUSP", description: "Optimizing handling dynamics and tire contact for peak performance." },
  { id: "software", label: "Software", short: "SOFT", description: "Developing data acquisition and vehicle control systems." },
  { id: "vehicle-performance", label: "Vehicle Performance", short: "PERF", description: "Analyzing telemetry and optimizing setup for competitive advantage." },
  { id: "electric-powertrain", label: "Electric Powertrain", short: "ELEC", description: "Designing battery systems and electric motor integration." },
  { id: "drivetrain-cooling", label: "Drivetrain & Cooling", short: "DRIV", description: "Managing power delivery and thermal management systems." },
  { id: "marketing", label: "Marketing", short: "MRKT", description: "Building brand presence and engaging with partners and community." },
]

interface TeamSidebarProps {
  season: string
  section: string
}

export function Sidebar({ season, section }: TeamSidebarProps) {
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)
  const current = subsections.find((s) => s.id === section)!

  const navigate = (newSeason: string, newSection: string) => {
    if (busyRef.current) return
    if (newSeason === season && newSection === section) return

    busyRef.current = true

    gsap.to(sidebarRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        router.push(`/team/${newSeason}/${newSection}`)
      }
    })
  }

  useGSAP(() => {
    busyRef.current = false

    const tl = gsap.timeline()

    tl.set(sidebarRef.current, { opacity: 0, y: -20 })
    tl.to(sidebarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "all"
    })
  }, { dependencies: [season, section], scope: sidebarRef })

  return (
    <>
      <div className="md:hidden fixed top-24 left-0 right-0 z-[45] bg-background/80 backdrop-blur-xl border-b border-border/10 px-5 py-3">
        <TeamControlDeck
          currentSeason={season}
          years={years}
          sections={subsections}
          currentSection={section}
          onNavigate={(yr, sec) => navigate(yr ?? season, sec ?? section)}
        />
      </div>

      <aside className="w-full md:w-[40%] lg:w-[35%] md:sticky md:top-16 pt-8 z-30 self-start">
        <div className="h-[72px] md:hidden" />

        <div ref={sidebarRef} className="px-5 py-6 md:px-10 md:py-12 space-y-6 md:space-y-10">

          <div className="hidden md:block">
            <TeamControlDeck
              currentSeason={season}
              years={years}
              sections={subsections}
              currentSection={section}
              onNavigate={(yr, sec) => navigate(yr ?? season, sec ?? section)}
            />
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 md:w-8 bg-primary" />
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary font-heading">
                SEASON {season}
              </p>
            </div>

            <h1 className="font-heading text-3xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-tighter">
              {current.label.includes(" ") ? (
                <>
                  <span className="text-foreground">{current.label.split(" ")[0]}</span>
                  <br className="hidden md:block" />{" "}
                  <span className="text-primary">{current.label.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <span className="text-foreground">{current.label}</span>
              )}
            </h1>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-sm opacity-80">
              {current.description}
            </p>
          </div>

          <div className="hidden md:block h-60 md:h-72 w-full relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <SubsectionModel id={section} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </aside>
    </>
  )
}
