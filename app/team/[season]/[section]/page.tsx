"use client"

import { useRef, useCallback, Suspense, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import gsap from "gsap"
import { Canvas, useFrame } from "@react-three/fiber"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type * as THREE from "three"
import { MemberCard } from "@/components/team/member-card"
import type { Member } from "@/types"

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

// ── 3-D models ───────────────────────────────────────────────────────────────

function useRotate(ref: React.RefObject<THREE.Group | null>) {
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.004
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06
    }
  })
}

function LeadershipModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#e31937" metalness={0.8} roughness={0.2} /></mesh>
      <mesh scale={1.35}><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#ffffff" opacity={0.15} transparent wireframe /></mesh>
    </group>
  )
}

function AeroModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[3, 0.1, 1]} /><meshStandardMaterial color="#e31937" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[-1.5, 0, 0]}><boxGeometry args={[0.1, 0.5, 1]} /><meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[1.5, 0, 0]}><boxGeometry args={[0.1, 0.5, 1]} /><meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.3} /></mesh>
    </group>
  )
}

function ChassisModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[2, 0.8, 3]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, 0.5, -0.5]}><boxGeometry args={[1.2, 0.4, 1]} /><meshStandardMaterial color="#e31937" metalness={0.7} roughness={0.2} /></mesh>
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.4, 0.05, 8, 16, Math.PI]} /><meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  )
}

function SuspensionModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><cylinderGeometry args={[0.3, 0.3, 0.2, 32]} /><meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[-0.8, 0.4, 0]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.05, 0.05, 1.5, 16]} /><meshStandardMaterial color="#e31937" metalness={0.7} roughness={0.3} /></mesh>
      <mesh position={[-0.8, -0.4, 0]} rotation={[0, 0, 0.5]}><cylinderGeometry args={[0.05, 0.05, 1.5, 16]} /><meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.08, 0.08, 0.8, 16]} /><meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  )
}

function SoftwareModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[2, 0.1, 1.5]} /><meshStandardMaterial color="#0a3d0a" metalness={0.5} roughness={0.5} /></mesh>
      {([[-0.5, 0.1, 0.3], [0.5, 0.1, 0.3], [0, 0.1, -0.3]] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}><boxGeometry args={[0.4, 0.15, 0.4]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      ))}
      {([[-0.7, 0.1, -0.5], [-0.5, 0.1, -0.5], [-0.3, 0.1, -0.5]] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}><sphereGeometry args={[0.05, 16, 16]} /><meshStandardMaterial color="#e31937" emissive="#e31937" emissiveIntensity={0.5} /></mesh>
      ))}
    </group>
  )
}

function PerformanceModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1, 0.1, 16, 32]} /><meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, -0.5]}><coneGeometry args={[0.05, 0.8, 16]} /><meshStandardMaterial color="#e31937" /></mesh>
      <mesh position={[0, 0.05, 0]}><sphereGeometry args={[0.15, 32, 32]} /><meshStandardMaterial color="#e31937" metalness={0.9} roughness={0.1} /></mesh>
    </group>
  )
}

function ElectricModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[2, 0.6, 1.2]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.5 + (i % 4) * 0.35, 0.4, -0.2 + Math.floor(i / 4) * 0.4]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial color="#e31937" emissive="#e31937" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function DrivetrainModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.6, 0.15, 8, 20]} /><meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} /></mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.1, 0.1, 2.5, 16]} /><meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.4, 0.1, 8, 16]} /><meshStandardMaterial color="#e31937" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  )
}

function MarketingModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh rotation={[0, 0, Math.PI / 4]}><coneGeometry args={[0.8, 1.5, 32, 1, true]} /><meshStandardMaterial color="#e31937" metalness={0.7} roughness={0.3} side={2} /></mesh>
      <mesh position={[-0.5, -0.5, 0]}><cylinderGeometry args={[0.2, 0.2, 0.4, 16]} /><meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} /></mesh>
      {[1.2, 1.5, 1.8].map((scale, i) => (
        <mesh key={i} position={[0.4, 0.4, 0]} rotation={[0, Math.PI / 2, Math.PI / 4]}>
          <torusGeometry args={[scale * 0.3, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={1 - i * 0.25} />
        </mesh>
      ))}
    </group>
  )
}

function SubsectionModel({ id }: { id: string }) {
  switch (id) {
    case "leadership": return <LeadershipModel />
    case "aerodynamics": return <AeroModel />
    case "chassis": return <ChassisModel />
    case "suspension": return <SuspensionModel />
    case "software": return <SoftwareModel />
    case "vehicle-performance": return <PerformanceModel />
    case "electric-powertrain": return <ElectricModel />
    case "drivetrain-cooling": return <DrivetrainModel />
    case "marketing": return <MarketingModel />
    default: return <LeadershipModel />
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const router = useRouter()
  const params = useParams<{ season: string; section: string }>()

  const rawSeason = params?.season ?? "2024"
  const rawSection = params?.section ?? "leadership"

  const season = years.includes(rawSeason) ? rawSeason : "2024"
  const section = subsectionIds.includes(rawSection) ? rawSection : "leadership"

  const yearIdx = years.indexOf(season)
  const [yearStart, setYearStart] = useState(() => Math.max(0, Math.min(yearIdx - 1, years.length - 3)))
  const visibleYears = years.slice(yearStart, yearStart + 3)

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const memberScrollRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)

  const navigate = useCallback((newSeason: string, newSection: string) => {
    if (busyRef.current) return
    if (newSeason === season && newSection === section) return
    busyRef.current = true
    gsap.timeline({ onComplete: () => { busyRef.current = false } })
      .to([leftRef.current, rightRef.current].filter(Boolean), { opacity: 0, y: 8, duration: 0.18, ease: "power2.in" })
      .call(() => {
        if (memberScrollRef.current) memberScrollRef.current.scrollTop = 0
        router.push(`/team/${newSeason}/${newSection}`)
      })
      .to([leftRef.current, rightRef.current].filter(Boolean), { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" })
  }, [season, section, router])

  const handleSectionChange = useCallback((newSection: string) => {
    navigate(season, newSection)
  }, [season, navigate])

  const handleSeasonChange = useCallback((yr: string) => {
    navigate(yr, section)
  }, [section, navigate])

  const scrollYearsLeft = () => setYearStart((p) => Math.max(0, p - 1))
  const scrollYearsRight = () => setYearStart((p) => Math.min(years.length - 3, p + 1))

  const teamMembers = getTeamMembers(season, section)
  const current = subsections.find((s) => s.id === section)!

  return (
    <main className="fixed inset-0 bg-background text-foreground overflow-hidden flex flex-col">
      <div className="flex-1 flex overflow-hidden" style={{ paddingTop: "80px" }}>

        {/* ── Left panel ── */}
        <div className="w-full md:w-[42%] shrink-0 flex flex-col justify-center px-8 md:px-12 overflow-hidden">
          <div ref={leftRef} className="flex flex-col gap-6">

            {/* ── Season + Section selectors ── */}
            <div className="flex flex-col gap-4">

              {/* Season row */}
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-heading mb-2">Season</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={scrollYearsLeft}
                    disabled={yearStart === 0}
                    aria-label="Previous years"
                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors shrink-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    {visibleYears.map((yr) => {
                      const active = yr === season
                      return (
                        <button
                          key={yr}
                          onClick={() => handleSeasonChange(yr)}
                          aria-current={active ? "page" : undefined}
                          className={`relative font-heading text-sm font-bold uppercase tracking-wider transition-all duration-150 px-3 py-1 ${
                            active
                              ? "text-primary-foreground bg-primary"
                              : "text-muted-foreground hover:text-foreground bg-secondary"
                          }`}
                        >
                          {yr}
                          {active && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-foreground/30" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={scrollYearsRight}
                    disabled={yearStart >= years.length - 3}
                    aria-label="Next years"
                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors shrink-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Section row */}
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-heading mb-2">Section</p>
                <div className="flex flex-wrap gap-1.5">
                  {subsections.map((sub) => {
                    const active = sub.id === section
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleSectionChange(sub.id)}
                        aria-current={active ? "page" : undefined}
                        className={`relative font-heading text-xs font-bold uppercase tracking-wider px-3 py-1 transition-all duration-150 ${
                          active
                            ? "text-primary-foreground bg-primary"
                            : "text-muted-foreground hover:text-foreground bg-secondary"
                        }`}
                      >
                        {sub.short}
                        {active && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-foreground/30" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ── Title block ── */}
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight text-balance">
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
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
                {current.description}
              </p>
              <div className="flex items-baseline gap-2 mt-5">
                <span className="font-heading text-5xl font-bold text-primary">{teamMembers.length}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Members</span>
              </div>
            </div>

            <div className="w-full h-52 md:h-64 relative">
              <Canvas key={`${season}-${section}`} camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                  <SubsectionModel id={section} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px bg-border/20 shrink-0" />

        {/* ── Right panel – member grid ── */}
        <div
          ref={memberScrollRef}
          className="flex-1 overflow-y-auto px-6 md:px-8 py-8"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(227,25,55,0.3) transparent" }}
        >
          <div ref={rightRef} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, i) => (
              <MemberCard
                key={`${season}-${section}-${i}`}
                member={member}
                className={i % 3 === 1 ? "mt-8" : i % 3 === 2 ? "mt-3" : ""}
              />
            ))}
          </div>
          <div className="pointer-events-none sticky bottom-0 h-16 bg-gradient-to-t from-background to-transparent -mx-8 -mb-8" />
        </div>
      </div>

      {/* Corner accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
        <div className="absolute top-0 right-0 w-28 h-28 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-28 h-28 border-l-2 border-b-2 border-primary" />
      </div>
    </main>
  )
}

