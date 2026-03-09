"use client"

import { useRef, useCallback, Suspense } from "react"
import { useRouter, useParams } from "next/navigation"
import gsap from "gsap"
import { Canvas } from "@react-three/fiber"
import { MemberCard } from "@/components/team/member-card"
import type { Member } from "@/types"
import { SubsectionModel } from "@/components/team/subsection-model"
import { TeamControlDeck } from "@/components/team/team-control-deck"
import { useGSAP } from "@gsap/react"

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

const getTeamMembers = (_year: string, section: string): Member[] => {
  const role = subsections.find((s) => s.id === section) ?? subsections[0]
  return Array(12).fill(null).map((_, i) => ({
    name: ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez"][i % 4],
    role: { name: role.label, short: role.short, description: role.description },
    imageUrl: "/placeholder.svg?height=400&width=300"
  }))
}

gsap.registerPlugin(useGSAP);

export default function TeamPage() {
  const router = useRouter()
  const params = useParams<{ season: string; section: string }>()
  const container = useRef<HTMLDivElement>(null)

  const season = params?.season ?? "2024"
  const section = params?.section ?? "leadership"

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)

  const navigate = useCallback((newSeason: string, newSection: string) => {
    if (busyRef.current) return
    if (newSeason === season && newSection === section) return

    busyRef.current = true
    gsap.killTweensOf([leftRef.current, rightRef.current])

    gsap.to([leftRef.current, rightRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        router.push(`/team/${newSeason}/${newSection}`)
      }
    })
  }, [router, season, section])

  useGSAP(() => {
    busyRef.current = false
    gsap.set([leftRef.current, rightRef.current], { opacity: 0, y: -20 })

    gsap.to([leftRef.current, rightRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, { dependencies: [season, section], scope: container })

  const current = subsections.find((s) => s.id === section)!
  const teamMembers = getTeamMembers(season, section)

  return (
    <main ref={container} className="relative flex flex-col md:flex-row items-start pt-16 md:pt-20 bg-background min-h-screen">

      {/* ── STICKY CONTROL PANEL ── */}
      {/* On mobile: sticks to top (top-16 for navbar offset), full width, glass effect */}
      <aside className="w-full md:w-[40%] lg:w-[35%] sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md md:bg-transparent border-b border-border/10 md:border-b-0 md:border-r">
        <div ref={leftRef} className="px-5 py-6 md:px-10 md:py-12 space-y-6 md:space-y-10">

          <TeamControlDeck
            currentSeason={season}
            years={years}
            sections={subsections}
            currentSection={section}
            onNavigate={(yr, sec) => navigate(yr ?? season, sec ?? section)}
          />

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 md:w-8 bg-primary" />
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary font-heading">
                TBR SEASON {season}
              </p>
            </div>

            <h1 className="font-heading text-3xl md:text-6xl lg:text-7xl font-bold uppercase italic leading-[0.9] tracking-tighter">
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

          {/* HIDDEN ON MOBILE: The 3D Viewport */}
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

      {/* ── MEMBER GRID ── */}
      <section ref={rightRef} className="flex-1 px-5 py-8 md:px-12 md:py-12">
        {/* Mobile-friendly grid: 1 column on very small, 2 on most mobiles, 3 on large desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {teamMembers.map((member, i) => (
            <MemberCard
              key={`${season}-${section}-${i}`}
              member={member}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
