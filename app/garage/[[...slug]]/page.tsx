"use client"

import { useRef, useEffect, Suspense, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Canvas, useFrame } from "@react-three/fiber"
import gsap from "gsap"
import { ChevronLeft, ChevronRight, Zap, Flame, Monitor } from "lucide-react"
import type * as THREE from "three"

type Category = "cv" | "ev" | "simulator"

interface Vehicle {
  id: string
  name: string
  category: Category
  year: number
  image: string
  description: string
  stats: { label: string; value: string; unit?: string }[]
  highlights: string[]
}

const vehicles: Vehicle[] = [
  { id: "d1",  name: "Dragon 1",  category: "cv", year: 2004, image: "/placeholder.svg?height=600&width=900",
    description: "The original Dragon — the car that started it all, built with ambition and the drive to compete internationally for the first time.",
    stats: [{ label: "Engine", value: "600cc", unit: "single" }, { label: "Power", value: "65", unit: "hp" }, { label: "Weight", value: "230", unit: "kg" }, { label: "0–100", value: "4.8", unit: "s" }],
    highlights: ["First Formula Student entry", "Steel spaceframe chassis", "Naturally aspirated"] },
  { id: "d2",  name: "Dragon 2",  category: "cv", year: 2006, image: "/placeholder.svg?height=600&width=900",
    description: "Refined aerodynamics and improved suspension geometry marked Dragon 2's competitive debut on the international stage.",
    stats: [{ label: "Engine", value: "600cc", unit: "inline-4" }, { label: "Power", value: "75", unit: "hp" }, { label: "Weight", value: "215", unit: "kg" }, { label: "0–100", value: "4.4", unit: "s" }],
    highlights: ["First front wing package", "Improved weight distribution", "New suspension geometry"] },
  { id: "d3",  name: "Dragon 3",  category: "cv", year: 2008, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 3 introduced a full aero package and the team's first composite bodywork, marking a step change in performance.",
    stats: [{ label: "Engine", value: "600cc", unit: "inline-4" }, { label: "Power", value: "82", unit: "hp" }, { label: "Weight", value: "198", unit: "kg" }, { label: "0–100", value: "4.0", unit: "s" }],
    highlights: ["Full aero package debut", "Carbon fibre bodywork", "Custom exhaust system"] },
  { id: "d4",  name: "Dragon 4",  category: "cv", year: 2010, image: "/placeholder.svg?height=600&width=900",
    description: "A turbocharged leap — Dragon 4 brought forced induction to the powertrain for the first time, unlocking a new performance ceiling.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "100", unit: "hp" }, { label: "Weight", value: "185", unit: "kg" }, { label: "0–100", value: "3.6", unit: "s" }],
    highlights: ["First turbocharged engine", "Custom intake manifold", "Revised aero for downforce"] },
  { id: "d5",  name: "Dragon 5",  category: "cv", year: 2012, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 5 featured an in-house designed gearbox and significantly refined chassis dynamics.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "108", unit: "hp" }, { label: "Weight", value: "178", unit: "kg" }, { label: "0–100", value: "3.3", unit: "s" }],
    highlights: ["Custom sequential gearbox", "Carbon fibre monocoque", "Data acquisition upgrade"] },
  { id: "d6",  name: "Dragon 6",  category: "cv", year: 2014, image: "/placeholder.svg?height=600&width=900",
    description: "The most competitive CV to date at its time, Dragon 6 placed in the top 10 at Formula Student Germany.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "115", unit: "hp" }, { label: "Weight", value: "170", unit: "kg" }, { label: "0–100", value: "3.1", unit: "s" }],
    highlights: ["Top 10 FSG finish", "First DRS system", "Titanium fasteners throughout"] },
  { id: "d7",  name: "Dragon 7",  category: "cv", year: 2016, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 7 introduced active suspension research and advanced traction control software developed entirely in-house.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "120", unit: "hp" }, { label: "Weight", value: "165", unit: "kg" }, { label: "0–100", value: "2.9", unit: "s" }],
    highlights: ["Active suspension concept", "In-house traction control", "Revised diffuser package"] },
  { id: "d8",  name: "Dragon 8",  category: "cv", year: 2018, image: "/placeholder.svg?height=600&width=900",
    description: "The final iteration before the team shifted focus to electric propulsion — Dragon 8 is the pinnacle of the early combustion era.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "125", unit: "hp" }, { label: "Weight", value: "160", unit: "kg" }, { label: "0–100", value: "2.8", unit: "s" }],
    highlights: ["Best-ever CV aero package", "In-house ECU firmware", "Lightweight wheel uprights"] },
  { id: "d9",  name: "Dragon 9",  category: "cv", year: 2020, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 9 bridged the gap between combustion and electric eras with hybrid sensor integration and advanced telemetry.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "128", unit: "hp" }, { label: "Weight", value: "158", unit: "kg" }, { label: "0–100", value: "2.7", unit: "s" }],
    highlights: ["Hybrid sensor array", "Aluminium honeycomb floor", "Revised aerodynamic balance"] },
  { id: "dx",  name: "Dragon X",  category: "cv", year: 2022, image: "/placeholder.svg?height=600&width=900",
    description: "The pinnacle of the combustion programme — Dragon X is the fastest and lightest CV ever built by TUBrnoRacing.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "132", unit: "hp" }, { label: "Weight", value: "152", unit: "kg" }, { label: "0–100", value: "2.6", unit: "s" }],
    highlights: ["Lowest CV drag coefficient", "Full carbon monocoque", "CNC-machined uprights"] },
  { id: "e1",  name: "Dragon e1", category: "ev", year: 2019, image: "/placeholder.svg?height=600&width=900",
    description: "The team's first electric vehicle — a proof-of-concept that launched a new era of high-voltage engineering at TUBrnoRacing.",
    stats: [{ label: "Power", value: "60", unit: "kW" }, { label: "Battery", value: "6.5", unit: "kWh" }, { label: "Weight", value: "225", unit: "kg" }, { label: "0–100", value: "3.8", unit: "s" }],
    highlights: ["First EV from TUBrnoRacing", "400V accumulator system", "Dual motor configuration"] },
  { id: "e2",  name: "Dragon e2", category: "ev", year: 2020, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon e2 brought dramatically improved energy density and custom BMS development fully in-house.",
    stats: [{ label: "Power", value: "80", unit: "kW" }, { label: "Battery", value: "7.2", unit: "kWh" }, { label: "Weight", value: "208", unit: "kg" }, { label: "0–100", value: "3.2", unit: "s" }],
    highlights: ["In-house BMS software", "Improved regenerative braking", "New cooling circuit design"] },
  { id: "e3",  name: "Dragon e3", category: "ev", year: 2021, image: "/placeholder.svg?height=600&width=900",
    description: "A lightweight accumulator and torque vectoring made Dragon e3 the most dynamically capable EV yet produced.",
    stats: [{ label: "Power", value: "100", unit: "kW" }, { label: "Battery", value: "7.8", unit: "kWh" }, { label: "Weight", value: "192", unit: "kg" }, { label: "0–100", value: "2.9", unit: "s" }],
    highlights: ["Torque vectoring", "Lightweight accumulator enclosure", "Formula-grade inverters"] },
  { id: "e4",  name: "Dragon e4", category: "ev", year: 2023, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon e4 achieved the team's best EV result at Formula Student Germany, finishing in the top 5 overall.",
    stats: [{ label: "Power", value: "120", unit: "kW" }, { label: "Battery", value: "8.5", unit: "kWh" }, { label: "Weight", value: "180", unit: "kg" }, { label: "0–100", value: "2.5", unit: "s" }],
    highlights: ["Top 5 EV at FSG", "Custom motor controllers", "Full carbon accumulator housing"] },
  { id: "e5",  name: "Dragon e5", category: "ev", year: 2025, image: "/placeholder.svg?height=600&width=900",
    description: "The current competition car — Dragon e5 represents the cutting edge of student electric motorsport engineering.",
    stats: [{ label: "Power", value: "140", unit: "kW" }, { label: "Battery", value: "9.0", unit: "kWh" }, { label: "Weight", value: "172", unit: "kg" }, { label: "0–100", value: "2.2", unit: "s" }],
    highlights: ["Full torque vectoring + DRS", "Silicon Carbide inverters", "AI-assisted setup tool"] },
  { id: "sim", name: "Simulator",  category: "simulator", year: 2021, image: "/placeholder.svg?height=600&width=900",
    description: "A full-motion simulator built to develop driver skill and setup proficiency year-round, independent of track time.",
    stats: [{ label: "DOF", value: "6", unit: "degrees" }, { label: "Screen", value: "240°", unit: "FOV" }, { label: "Latency", value: "<8", unit: "ms" }, { label: "Refresh", value: "120", unit: "Hz" }],
    highlights: ["6-DOF motion platform", "Force-feedback steering", "Real-time telemetry integration"] },
]

const categories: { id: Category; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "cv",        label: "Combustion", Icon: Flame   },
  { id: "ev",        label: "Electric",   Icon: Zap     },
  { id: "simulator", label: "Simulator",  Icon: Monitor },
]

function useFloat(ref: React.RefObject<THREE.Group | null>) {
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.07
  })
}

function CVModel() {
  const g = useRef<THREE.Group>(null)
  useFloat(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[3.2, 0.35, 1.2]} /><meshStandardMaterial color="#e31937" metalness={0.7} roughness={0.2} /></mesh>
      <mesh position={[0.1, 0.28, 0]}><boxGeometry args={[1.2, 0.28, 0.7]} /><meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[-1.7, -0.1, 0]}><boxGeometry args={[0.6, 0.06, 1.6]} /><meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.15} /></mesh>
      <mesh position={[1.5, 0.45, 0]}><boxGeometry args={[0.5, 0.06, 1.5]} /><meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.15} /></mesh>
      <mesh position={[1.5, 0.2, 0]}><boxGeometry args={[0.06, 0.48, 0.06]} /><meshStandardMaterial color="#333" metalness={0.7} /></mesh>
      {([[-1.3,-0.22,0.75],[-1.3,-0.22,-0.75],[1.1,-0.22,0.75],[1.1,-0.22,-0.75]] as [number,number,number][]).map((p,i)=>(
        <mesh key={i} position={p} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.22,0.1,12,24]} /><meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} /></mesh>
      ))}
      <mesh position={[0.4,0.5,0]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[0.35,0.025,8,24,Math.PI]} /><meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} /></mesh>
    </group>
  )
}

function EVModel() {
  const g = useRef<THREE.Group>(null)
  useFloat(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[3.0,0.42,1.3]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0,-0.22,0]}><boxGeometry args={[2.0,0.07,1.1]} /><meshStandardMaterial color="#e31937" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0.1,0.32,0]}><boxGeometry args={[1.1,0.26,0.65]} /><meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[-1.6,-0.1,0]}><boxGeometry args={[0.55,0.05,1.7]} /><meshStandardMaterial color="#111" metalness={0.85} roughness={0.1} /></mesh>
      <mesh position={[1.4,0.5,0]}><boxGeometry args={[0.45,0.05,1.6]} /><meshStandardMaterial color="#111" metalness={0.85} roughness={0.1} /></mesh>
      <mesh position={[1.4,0.25,0]}><boxGeometry args={[0.05,0.5,0.05]} /><meshStandardMaterial color="#e31937" metalness={0.7} /></mesh>
      {([[-1.2,-0.25,0.78],[-1.2,-0.25,-0.78],[1.0,-0.25,0.78],[1.0,-0.25,-0.78]] as [number,number,number][]).map((p,i)=>(
        <mesh key={i} position={p} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.24,0.1,12,24]} /><meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} /></mesh>
      ))}
      {([[-1.2,-0.25,0.48],[-1.2,-0.25,-0.48],[1.0,-0.25,0.48],[1.0,-0.25,-0.48]] as [number,number,number][]).map((p,i)=>(
        <mesh key={`g${i}`} position={p}><sphereGeometry args={[0.07,16,16]} /><meshStandardMaterial color="#e31937" emissive="#e31937" emissiveIntensity={1.5} /></mesh>
      ))}
      <mesh position={[0.4,0.56,0]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[0.35,0.025,8,24,Math.PI]} /><meshStandardMaterial color="#e31937" metalness={0.95} emissive="#e31937" emissiveIntensity={0.3} /></mesh>
    </group>
  )
}

function SimModel() {
  const g = useRef<THREE.Group>(null)
  useFloat(g)
  return (
    <group ref={g} scale={0.85}>
      <mesh position={[0,-0.8,0]}><boxGeometry args={[3.5,0.12,2.0]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      {([[-1.2,-0.4,0.7],[1.2,-0.4,0.7],[-1.2,-0.4,-0.7],[1.2,-0.4,-0.7],[0,-0.4,0]] as [number,number,number][]).map((p,i)=>(
        <mesh key={i} position={p}><cylinderGeometry args={[0.06,0.1,0.85,12]} /><meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} /></mesh>
      ))}
      <mesh position={[0,0,0]}><boxGeometry args={[1.4,0.6,0.9]} /><meshStandardMaterial color="#0d0d0d" metalness={0.85} roughness={0.15} /></mesh>
      {([-0.7,0,0.7] as number[]).map((z,i)=>(
        <mesh key={i} position={[-1.0,0.5,z]} rotation={[0,i===0?0.4:i===2?-0.4:0,0]}>
          <boxGeometry args={[0.06,0.7,0.85]} />
          <meshStandardMaterial color="#e31937" emissive="#e31937" emissiveIntensity={0.4} />
        </mesh>
      ))}
      <mesh position={[-0.85,0.28,0]} rotation={[0.3,0,0]}><torusGeometry args={[0.2,0.025,8,24]} /><meshStandardMaterial color="#e31937" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  )
}

function Model({ category }: { category: Category }) {
  if (category === "cv")        return <CVModel />
  if (category === "ev")        return <EVModel />
  return <SimModel />
}

export default function GaragePage() {
  const router  = useRouter()
  const params  = useParams<{ slug?: string[] }>()
  const slug    = params?.slug ?? []

  const rawCat  = (slug[0] ?? "cv") as Category
  const category: Category = ["cv","ev","simulator"].includes(rawCat) ? rawCat : "cv"

  const list    = vehicles.filter((v) => v.category === category)
  const rawCar  = slug[1] ?? list[0]?.id
  const idx     = Math.max(0, list.findIndex((v) => v.id === rawCar))
  const vehicle = list[idx] ?? list[0]

  const infoRef  = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const busyRef  = useRef(false)

  const navigate = useCallback((cat: Category, carId: string) => {
    if (busyRef.current) return
    busyRef.current = true
    gsap.timeline({ onComplete: () => { busyRef.current = false } })
      .to([infoRef.current, stageRef.current].filter(Boolean), { opacity: 0, y: 8, duration: 0.15, ease: "power2.in" })
      .call(() => router.push(`/garage/${cat}/${carId}`))
      .to([infoRef.current, stageRef.current].filter(Boolean), { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
  }, [router])

  const switchCat = (cat: Category) => {
    if (cat === category) return
    const first = vehicles.find((v) => v.category === cat)
    if (first) navigate(cat, first.id)
  }

  const switchIdx = (i: number) => {
    if (i === idx || i < 0 || i >= list.length) return
    navigate(category, list[i].id)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  switchIdx(idx - 1)
      if (e.key === "ArrowRight") switchIdx(idx + 1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  return (
    <main className="bg-background text-foreground overflow-hidden" style={{ paddingTop: "72px" }}>
      <Navigation />
      <div className="hidden lg:flex flex-col" style={{ height: "calc(100vh - 72px)" }}>
        <div className="flex justify-center pt-5 pb-1 px-4 gap-0 shrink-0">
          {categories.map(({ id, label, Icon }, i) => {
            const active = id === category
            return (
              <button
                key={id}
                onClick={() => switchCat(id)}
                className={`relative flex items-center justify-center gap-2 px-8 py-2.5 font-heading text-xs uppercase tracking-[0.18em] font-bold transition-colors duration-200 ${active ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
                style={{
                  clipPath: i === 0
                    ? "polygon(0% 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 0% 100%)"
                    : i === categories.length - 1
                    ? "polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)"
                    : "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
                  background: active ? "var(--primary)" : "var(--secondary)",
                  marginLeft: i > 0 ? "-1px" : "0",
                  minWidth: "160px",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            )
          })}
        </div>
        <div className="flex-1 flex overflow-hidden min-h-0 px-6 md:px-10 gap-5 py-4">
          <div className="flex flex-col gap-0.5 w-40 shrink-0 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {list.map((v, i) => {
              const active = i === idx
              return (
                <button
                  key={v.id}
                  onClick={() => switchIdx(i)}
                  className={`text-left px-4 py-3 font-heading text-xs uppercase tracking-wider font-bold border-l-2 transition-all duration-150 ${
                    active ? "text-primary border-primary bg-primary/8" : "text-muted-foreground border-transparent hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <span className="block text-[9px] text-muted-foreground/50 tracking-[0.18em] mb-0.5">{v.year}</span>
                  {v.name}
                </button>
              )
            })}
          </div>
          <div ref={stageRef} className="flex-1 flex flex-col min-w-0 gap-3">
            <div
              className="flex-1 relative min-h-0 bg-card border border-border/20"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
            >
              <Canvas key={`${category}`} camera={{ position: [0, 1.5, 7], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[8, 8, 8]} intensity={2} />
                <pointLight position={[-8, 4, -8]} intensity={0.8} color="#e31937" />
                <spotLight position={[0, 10, 5]} angle={0.3} penumbra={0.8} intensity={1.5} />
                <Suspense fallback={null}><Model category={category} /></Suspense>
              </Canvas>
              <div className="pointer-events-none absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <button onClick={() => switchIdx(idx - 1)} disabled={idx === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/60 border border-border/40 hover:border-primary/60 hover:text-primary disabled:opacity-20 transition-all duration-200 backdrop-blur-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => switchIdx(idx + 1)} disabled={idx === list.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/60 border border-border/40 hover:border-primary/60 hover:text-primary disabled:opacity-20 transition-all duration-200 backdrop-blur-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="pointer-events-none absolute bottom-4 left-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-primary/70 mb-0.5">{vehicle.year}</p>
                <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-foreground/90">{vehicle.name}</h2>
              </div>
              <div className="pointer-events-none absolute bottom-5 right-6 flex gap-1.5">
                {list.map((_, i) => (
                  <div key={i}
                    className={`transition-all duration-200 ${i === idx ? "bg-primary scale-125" : "bg-foreground/20"}`}
                    style={{ width: 6, height: 6, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                  />
                ))}
              </div>
            </div>
            <div
              className="h-20 shrink-0 relative overflow-hidden border border-border/20 bg-card/50"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
            </div>
          </div>
          <div ref={infoRef} className="w-72 lg:w-80 shrink-0 flex flex-col gap-5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-2">About</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{vehicle.description}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-3">Specifications</p>
              <div className="grid grid-cols-2 gap-2">
                {vehicle.stats.map((s, i) => (
                  <div key={i} className="bg-card border border-border/30 p-3"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">{s.label}</p>
                    <p className="font-heading text-2xl font-bold leading-none">{s.value}</p>
                    {s.unit && <p className="text-[9px] text-primary uppercase tracking-wider mt-0.5">{s.unit}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-3">Highlights</p>
              <ul className="flex flex-col gap-2">
                {vehicle.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-primary"
                      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden border border-border/20"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
              <img src={vehicle.image} alt={`${vehicle.name} detail`} className="w-full h-36 object-cover opacity-40" />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col min-h-screen overflow-y-auto pb-16" style={{ height: "calc(100dvh - 72px)" }}>
        <div className="flex shrink-0 border-b border-border/20">
          {categories.map(({ id, label, Icon }) => {
            const active = id === category
            return (
              <button
                key={id}
                onClick={() => switchCat(id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 font-heading text-[10px] uppercase tracking-[0.15em] font-bold border-b-2 transition-all duration-200 ${
                  active ? "text-primary border-primary" : "text-muted-foreground border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            )
          })}
        </div>
        <div
          className="relative mx-4 mt-4 shrink-0 bg-card border border-border/20"
          style={{
            height: "38vh",
            clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
          }}
        >
          <Canvas key={`m-${category}`} camera={{ position: [0, 1.5, 7], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[8, 8, 8]} intensity={2} />
            <pointLight position={[-8, 4, -8]} intensity={0.8} color="#e31937" />
            <spotLight position={[0, 10, 5]} angle={0.3} penumbra={0.8} intensity={1.5} />
            <Suspense fallback={null}><Model category={category} /></Suspense>
          </Canvas>
          <div className="pointer-events-none absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
          <button onClick={() => switchIdx(idx - 1)} disabled={idx === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/70 border border-border/40 hover:border-primary disabled:opacity-20 backdrop-blur-sm transition-colors duration-150">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => switchIdx(idx + 1)} disabled={idx === list.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/70 border border-border/40 hover:border-primary disabled:opacity-20 backdrop-blur-sm transition-colors duration-150">
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="pointer-events-none absolute bottom-3 left-4">
            <p className="font-heading text-[9px] uppercase tracking-[0.3em] text-primary/70">{vehicle.year}</p>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground/90">{vehicle.name}</h2>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-1 shrink-0" style={{ scrollbarWidth: "none" }}>
          {list.map((v, i) => {
            const active = i === idx
            return (
              <button
                key={v.id}
                onClick={() => switchIdx(i)}
                className={`shrink-0 flex flex-col items-start px-4 py-2.5 border transition-all duration-150 ${
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/30 bg-card text-muted-foreground hover:border-primary/40"
                }`}
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
              >
                <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/50 leading-none mb-0.5">{v.year}</span>
                <span className={`font-heading text-xs font-bold uppercase tracking-wider ${active ? "text-primary" : ""}`}>{v.name}</span>
              </button>
            )
          })}
        </div>
        <div className="flex flex-col gap-6 px-4 pt-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-2">About</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{vehicle.description}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-3">Specifications</p>
            <div className="grid grid-cols-2 gap-2">
              {vehicle.stats.map((s, i) => (
                <div key={i} className="bg-card border border-border/30 p-4"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">{s.label}</p>
                  <p className="font-heading text-3xl font-bold leading-none">{s.value}</p>
                  {s.unit && <p className="text-[9px] text-primary uppercase tracking-wider mt-1">{s.unit}</p>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-3">Highlights</p>
            <ul className="flex flex-col gap-3">
              {vehicle.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-primary"
                    style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden border border-border/20 mb-6"
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
            <img src={vehicle.image} alt={`${vehicle.name} detail`} className="w-full h-44 object-cover opacity-40" />
          </div>
        </div>
      </div>
    </main>
  )
}
