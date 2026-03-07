"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import gsap from "gsap"
import { Canvas, useFrame } from "@react-three/fiber"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type * as THREE from "three"

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

const getTeamMembers = (_year: string, _section: string) => [
  { name: "Sarah Johnson", role: "Lead Engineer", image: "/placeholder.svg?height=400&width=300" },
  { name: "Mike Chen", role: "Senior Developer", image: "/placeholder.svg?height=400&width=300" },
  { name: "Emma Davis", role: "Designer", image: "/placeholder.svg?height=400&width=300" },
  { name: "Alex Rodriguez", role: "Analyst", image: "/placeholder.svg?height=400&width=300" },
  { name: "Nina Patel", role: "Specialist", image: "/placeholder.svg?height=400&width=300" },
  { name: "Tom Wilson", role: "Coordinator", image: "/placeholder.svg?height=400&width=300" },
  { name: "Lisa Martinez", role: "Technician", image: "/placeholder.svg?height=400&width=300" },
  { name: "David Kim", role: "Manager", image: "/placeholder.svg?height=400&width=300" },
  { name: "Rachel Green", role: "Engineer", image: "/placeholder.svg?height=400&width=300" },
  { name: "James Park", role: "Developer", image: "/placeholder.svg?height=400&width=300" },
  { name: "Sophie Turner", role: "Designer", image: "/placeholder.svg?height=400&width=300" },
  { name: "Chris Evans", role: "Analyst", image: "/placeholder.svg?height=400&width=300" },
]

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
      {([[-0.5, 0.1, 0.3], [0.5, 0.1, 0.3], [0, 0.1, -0.3]] as [number,number,number][]).map((p, i) => (
        <mesh key={i} position={p}><boxGeometry args={[0.4, 0.15, 0.4]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      ))}
      {([ [-0.7, 0.1, -0.5], [-0.5, 0.1, -0.5], [-0.3, 0.1, -0.5]] as [number,number,number][]).map((p, i) => (
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

function TeamInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const paramSeason = searchParams.get("season") ?? "2024"
  const paramSection = searchParams.get("section") ?? "leadership"

  const [season, setSeason] = useState(paramSeason)
  const [section, setSection] = useState(paramSection)

  const [yearStart, setYearStart] = useState(() => {
    const idx = years.indexOf(paramSeason)
    return Math.max(0, Math.min(idx - 1, years.length - 3))
  })

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const memberScrollRef = useRef<HTMLDivElement>(null)
  const [canvasKey, setCanvasKey] = useState(section)

  useEffect(() => {
    router.replace(`/team?season=${season}&section=${section}`, { scroll: false })
  }, [season, section, router])

  const handleSectionChange = (newSection: string) => {
    if (newSection === section) return
    const tl = gsap.timeline()
    tl.to([leftRef.current, rightRef.current], { opacity: 0, y: 8, duration: 0.18, ease: "power2.in" })
      .call(() => {
        setSection(newSection)
        setCanvasKey(newSection)
        if (memberScrollRef.current) memberScrollRef.current.scrollTop = 0
      })
      .to([leftRef.current, rightRef.current], { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" })
  }

  const handleSeasonChange = (yr: string) => {
    setSeason(yr)
  }

  const scrollYearsLeft = () => setYearStart((p) => Math.max(0, p - 1))
  const scrollYearsRight = () => setYearStart((p) => Math.min(years.length - 3, p + 1))

  const visibleYears = years.slice(yearStart, yearStart + 3)
  const teamMembers = getTeamMembers(season, section)
  const current = subsections.find((s) => s.id === section)!

  return (
    <main className="fixed inset-0 bg-background text-foreground overflow-hidden flex flex-col">
      <div className="flex-1 flex overflow-hidden" style={{ paddingTop: "80px", paddingBottom: "76px" }}>
        <div className="w-full md:w-[42%] shrink-0 flex flex-col justify-center px-8 md:px-12 overflow-hidden">
          <div ref={leftRef} className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-heading mb-2">
                {season} · {current.short}
              </p>
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
              <Canvas key={canvasKey} camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                  <SubsectionModel id={canvasKey} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-px bg-border/20 shrink-0" />
        <div
          ref={memberScrollRef}
          className="flex-1 overflow-y-auto px-6 md:px-8 py-8"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(227,25,55,0.3) transparent" }}
        >
          <div ref={rightRef} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, i) => (
              <div
                key={`${season}-${section}-${i}`}
                className="group relative bg-card border border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  marginTop: i % 3 === 1 ? "32px" : i % 3 === 2 ? "12px" : "0px",
                }}
              >
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-3">
                  <div className="w-full aspect-[3/4] bg-muted/30 overflow-hidden mb-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wide text-foreground leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs text-primary uppercase tracking-wider mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none sticky bottom-0 h-16 bg-gradient-to-t from-background to-transparent -mx-8 -mb-8" />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/20 flex items-stretch"
        style={{ height: "68px" }}
      >
        <div className="flex items-center gap-1 px-4 border-r border-border/20 shrink-0">
          <span
            className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-heading mr-2 whitespace-nowrap"
            style={{ writingMode: "horizontal-tb" }}
          >
            SEASON
          </span>
          <button
            onClick={scrollYearsLeft}
            disabled={yearStart === 0}
            className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5">
            {visibleYears.map((yr) => {
              const active = yr === season
              return (
                <button
                  key={yr}
                  onClick={() => handleSeasonChange(yr)}
                  className={`relative h-9 w-16 font-heading text-sm font-bold transition-colors duration-150 ${
                    active ? "text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)",
                    background: active ? "var(--primary)" : "var(--secondary)",
                  }}
                >
                  {yr}
                </button>
              )
            })}
          </div>
          <button
            onClick={scrollYearsRight}
            disabled={yearStart >= years.length - 3}
            className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div
          className="w-6 shrink-0 self-stretch"
          style={{
            background: "linear-gradient(to right, var(--border) 0px, transparent 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <div className="flex-1 flex items-center gap-1 px-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-heading mr-2 shrink-0 whitespace-nowrap">
            SECTION
          </span>
          {subsections.map((sub, idx) => {
            const active = sub.id === section
            return (
              <button
                key={sub.id}
                onClick={() => handleSectionChange(sub.id)}
                className={`relative shrink-0 h-9 px-4 font-heading text-xs font-bold uppercase tracking-wider transition-colors duration-150 ${
                  active ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  clipPath: idx === 0
                    ? "polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%)"
                    : idx === subsections.length - 1
                    ? "polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)"
                    : "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)",
                  background: active ? "var(--primary)" : "var(--secondary)",
                  marginLeft: idx === 0 ? "0" : "-6px",
                }}
              >
                {sub.short}
              </button>
            )
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
        <div className="absolute top-0 right-0 w-28 h-28 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-16 left-0 w-28 h-28 border-l-2 border-b-2 border-primary" />
      </div>
    </main>
  )
}
export default function TeamPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <span className="font-heading text-muted-foreground tracking-widest text-sm uppercase">Loading...</span>
      </div>
    }>
      <TeamInner />
    </Suspense>
  )
}
