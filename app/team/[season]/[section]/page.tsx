"use client"

import { useRef, useCallback, Suspense, useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import gsap from "gsap"
import { Canvas } from "@react-three/fiber"
import { MemberCard } from "@/components/team/member-card"
import type { Member } from "@/types"
import { SectionSelector } from "@/components/team/section-selector"
import { SeasonSelector } from "@/components/team/season-selector"
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

const subsectionIds = subsections.map((s) => s.id)

const getTeamMembers = (_year: string, section: string): Member[] => {
  const role = subsections.find((s) => s.id === section) ?? subsections[0]
  return [
    { name: "Sarah Johnson", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Mike Chen", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Emma Davis", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Alex Rodriguez", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Nina Patel", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Tom Wilson", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Lisa Martinez", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "David Kim", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Rachel Green", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "James Park", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Sophie Turner", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
    { name: "Chris Evans", role: { name: role.label, short: role.short, description: role.description }, imageUrl: "/placeholder.svg?height=400&width=300" },
  ]
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const router = useRouter()
  const params = useParams<{ season: string; section: string }>()

  const season = params?.season ?? "2024"
  const section = params?.section ?? "leadership"

  const yearIdx = years.indexOf(season)
  const [yearStart, setYearStart] = useState(() => Math.max(0, Math.min(yearIdx - 1, years.length - 3)))
  const visibleYears = years.slice(yearStart, yearStart + 3)

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)

  const navigate = useCallback((newSeason: string, newSection: string) => {
    if (busyRef.current) return
    busyRef.current = true

    gsap.to([leftRef.current, rightRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => router.push(`/team/${newSeason}/${newSection}`)
    })
  }, [router, season, section])

  useEffect(() => {
    busyRef.current = false
    gsap.fromTo([leftRef.current, rightRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    )
  }, [season, section])

  const current = subsections.find((s) => s.id === section)!
  const teamMembers = getTeamMembers(season, section)

  return (
    // Parent must NOT have overflow-hidden for sticky to work
    <main className="relative flex flex-col md:flex-row items-start pt-20 bg-background min-h-screen">

      {/* ── LEFT COLUMN ── */}
      {/* Removed h-full and overflow-y-auto to allow sticky to track the body scroll */}
      <aside className="w-full md:w-[40%] lg:w-[35%] md:sticky md:top-20 z-10 border-b md:border-b-0 md:border-r border-border/10">
        <div
          ref={leftRef}
          className="px-6 py-8 md:px-10 md:py-12 space-y-10"
        >
          {/* Dashboard Selectors */}
          <TeamControlDeck
            currentSeason={season}
            years={years}
            sections={subsections}
            currentSection={section}
            onNavigate={(yr, sec) => navigate(yr ?? season, sec ?? section)}
          />

          {/* Section Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-heading">
                TBR SEASON {season}
              </p>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-tighter">
              {current.label.includes(" ") ? (
                <>
                  <span className="text-foreground">{current.label.split(" ")[0]}</span>
                  <br />
                  <span className="text-primary">{current.label.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <span className="text-foreground">{current.label}</span>
              )}
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm opacity-80">
              {current.description}
            </p>
          </div>

          {/* 3D Model Viewport */}
          <div className="h-60 md:h-72 w-full relative">
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

      {/* ── RIGHT COLUMN ── */}
      <section
        ref={rightRef}
        className="flex-1 px-6 py-10 md:px-12 md:py-12"
      >
        <div className="md:hidden mb-8 flex items-center gap-4">
          <h2 className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground">Team Roster</h2>
          <div className="h-px flex-1 bg-border/20" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {teamMembers.map((member, i) => (
            <MemberCard
              key={`${season}-${section}-${i}`}
              member={member}
              className={i % 2 === 1 ? "mt-4 md:mt-0 lg:mt-12" : "md:mt-0 lg:mt-6"}
            />
          ))}
        </div>

        <div className="h-20 md:h-32" />
      </section>

      {/* Decorative BG */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#e31937_0%,transparent_30%)]" />
      </div>
    </main>
  )
}
