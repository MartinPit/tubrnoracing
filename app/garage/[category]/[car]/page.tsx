"use client"

import { useRef, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import gsap from "gsap"
import { ChevronLeft, ChevronRight, Zap, Flame, Monitor } from "lucide-react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  {
    id: "d1", name: "Dragon 1", category: "cv", year: 2004, image: "/placeholder.svg?height=600&width=900",
    description: "The original Dragon — the car that started it all, built with ambition and the drive to compete internationally for the first time.",
    stats: [{ label: "Engine", value: "600cc", unit: "single" }, { label: "Power", value: "65", unit: "hp" }, { label: "Weight", value: "230", unit: "kg" }, { label: "0–100", value: "4.8", unit: "s" }],
    highlights: ["First Formula Student entry", "Steel spaceframe chassis", "Naturally aspirated"]
  },
  {
    id: "d2", name: "Dragon 2", category: "cv", year: 2006, image: "/placeholder.svg?height=600&width=900",
    description: "Refined aerodynamics and improved suspension geometry marked Dragon 2's competitive debut on the international stage.",
    stats: [{ label: "Engine", value: "600cc", unit: "inline-4" }, { label: "Power", value: "75", unit: "hp" }, { label: "Weight", value: "215", unit: "kg" }, { label: "0–100", value: "4.4", unit: "s" }],
    highlights: ["First front wing package", "Improved weight distribution", "New suspension geometry"]
  },
  {
    id: "d3", name: "Dragon 3", category: "cv", year: 2008, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 3 introduced a full aero package and the team's first composite bodywork, marking a step change in performance.",
    stats: [{ label: "Engine", value: "600cc", unit: "inline-4" }, { label: "Power", value: "82", unit: "hp" }, { label: "Weight", value: "198", unit: "kg" }, { label: "0–100", value: "4.0", unit: "s" }],
    highlights: ["Full aero package debut", "Carbon fibre bodywork", "Custom exhaust system"]
  },
  {
    id: "d4", name: "Dragon 4", category: "cv", year: 2010, image: "/placeholder.svg?height=600&width=900",
    description: "A turbocharged leap — Dragon 4 brought forced induction to the powertrain for the first time, unlocking a new performance ceiling.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "100", unit: "hp" }, { label: "Weight", value: "185", unit: "kg" }, { label: "0–100", value: "3.6", unit: "s" }],
    highlights: ["First turbocharged engine", "Custom intake manifold", "Revised aero for downforce"]
  },
  {
    id: "d5", name: "Dragon 5", category: "cv", year: 2012, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 5 featured an in-house designed gearbox and significantly refined chassis dynamics.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "108", unit: "hp" }, { label: "Weight", value: "178", unit: "kg" }, { label: "0–100", value: "3.3", unit: "s" }],
    highlights: ["Custom sequential gearbox", "Carbon fibre monocoque", "Data acquisition upgrade"]
  },
  {
    id: "d6", name: "Dragon 6", category: "cv", year: 2014, image: "/placeholder.svg?height=600&width=900",
    description: "The most competitive CV to date at its time, Dragon 6 placed in the top 10 at Formula Student Germany.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "115", unit: "hp" }, { label: "Weight", value: "170", unit: "kg" }, { label: "0–100", value: "3.1", unit: "s" }],
    highlights: ["Top 10 FSG finish", "First DRS system", "Titanium fasteners throughout"]
  },
  {
    id: "d7", name: "Dragon 7", category: "cv", year: 2016, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 7 introduced active suspension research and advanced traction control software developed entirely in-house.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "120", unit: "hp" }, { label: "Weight", value: "165", unit: "kg" }, { label: "0–100", value: "2.9", unit: "s" }],
    highlights: ["Active suspension concept", "In-house traction control", "Revised diffuser package"]
  },
  {
    id: "d8", name: "Dragon 8", category: "cv", year: 2018, image: "/placeholder.svg?height=600&width=900",
    description: "The final iteration before the team shifted focus to electric propulsion — Dragon 8 is the pinnacle of the early combustion era.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "125", unit: "hp" }, { label: "Weight", value: "160", unit: "kg" }, { label: "0–100", value: "2.8", unit: "s" }],
    highlights: ["Best-ever CV aero package", "In-house ECU firmware", "Lightweight wheel uprights"]
  },
  {
    id: "d9", name: "Dragon 9", category: "cv", year: 2020, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 9 bridged the gap between combustion and electric eras with hybrid sensor integration and advanced telemetry.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "128", unit: "hp" }, { label: "Weight", value: "158", unit: "kg" }, { label: "0–100", value: "2.7", unit: "s" }],
    highlights: ["Hybrid sensor array", "Aluminium honeycomb floor", "Revised aerodynamic balance"]
  },
  {
    id: "dx", name: "Dragon X", category: "cv", year: 2022, image: "/placeholder.svg?height=600&width=900",
    description: "The pinnacle of the combustion programme — Dragon X is the fastest and lightest CV ever built by TUBrnoRacing.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "132", unit: "hp" }, { label: "Weight", value: "152", unit: "kg" }, { label: "0–100", value: "2.6", unit: "s" }],
    highlights: ["Lowest CV drag coefficient", "Full carbon monocoque", "CNC-machined uprights"]
  },
  {
    id: "e1", name: "Dragon e1", category: "ev", year: 2019, image: "/placeholder.svg?height=600&width=900",
    description: "The team's first electric vehicle — a proof-of-concept that launched a new era of high-voltage engineering at TUBrnoRacing.",
    stats: [{ label: "Power", value: "60", unit: "kW" }, { label: "Battery", value: "6.5", unit: "kWh" }, { label: "Weight", value: "225", unit: "kg" }, { label: "0–100", value: "3.8", unit: "s" }],
    highlights: ["First EV from TUBrnoRacing", "400V accumulator system", "Dual motor configuration"]
  },
  {
    id: "e2", name: "Dragon e2", category: "ev", year: 2020, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon e2 brought dramatically improved energy density and custom BMS development fully in-house.",
    stats: [{ label: "Power", value: "80", unit: "kW" }, { label: "Battery", value: "7.2", unit: "kWh" }, { label: "Weight", value: "208", unit: "kg" }, { label: "0–100", value: "3.2", unit: "s" }],
    highlights: ["In-house BMS software", "Improved regenerative braking", "New cooling circuit design"]
  },
  {
    id: "e3", name: "Dragon e3", category: "ev", year: 2021, image: "/placeholder.svg?height=600&width=900",
    description: "A lightweight accumulator and torque vectoring made Dragon e3 the most dynamically capable EV yet produced.",
    stats: [{ label: "Power", value: "100", unit: "kW" }, { label: "Battery", value: "7.8", unit: "kWh" }, { label: "Weight", value: "192", unit: "kg" }, { label: "0–100", value: "2.9", unit: "s" }],
    highlights: ["Torque vectoring", "Lightweight accumulator enclosure", "Formula-grade inverters"]
  },
  {
    id: "e4", name: "Dragon e4", category: "ev", year: 2023, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon e4 achieved the team's best EV result at Formula Student Germany, finishing in the top 5 overall.",
    stats: [{ label: "Power", value: "120", unit: "kW" }, { label: "Battery", value: "8.5", unit: "kWh" }, { label: "Weight", value: "180", unit: "kg" }, { label: "0–100", value: "2.5", unit: "s" }],
    highlights: ["Top 5 EV at FSG", "Custom motor controllers", "Full carbon accumulator housing"]
  },
  {
    id: "e5", name: "Dragon e5", category: "ev", year: 2025, image: "/placeholder.svg?height=600&width=900",
    description: "The current competition car — Dragon e5 represents the cutting edge of student electric motorsport engineering.",
    stats: [{ label: "Power", value: "140", unit: "kW" }, { label: "Battery", value: "9.0", unit: "kWh" }, { label: "Weight", value: "172", unit: "kg" }, { label: "0–100", value: "2.2", unit: "s" }],
    highlights: ["Full torque vectoring + DRS", "Silicon Carbide inverters", "AI-assisted setup tool"]
  },
  {
    id: "sim", name: "Simulator", category: "simulator", year: 2021, image: "/placeholder.svg?height=600&width=900",
    description: "A full-motion simulator built to develop driver skill and setup proficiency year-round, independent of track time.",
    stats: [{ label: "DOF", value: "6", unit: "degrees" }, { label: "Screen", value: "240°", unit: "FOV" }, { label: "Latency", value: "<8", unit: "ms" }, { label: "Refresh", value: "120", unit: "Hz" }],
    highlights: ["6-DOF motion platform", "Force-feedback steering", "Real-time telemetry integration"]
  },
]

const categories: { id: Category; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "cv", label: "Combustion", Icon: Flame },
  { id: "ev", label: "Electric", Icon: Zap },
  { id: "simulator", label: "Simulator", Icon: Monitor },
]

export default function GaragePage() {
  const router = useRouter()
  const params = useParams<{ category: Category; car: string }>()

  const category: Category = ["cv", "ev", "simulator"].includes(params?.category)
    ? params?.category
    : "ev";
  const car: string = params?.car ?? "e5"

  const list = vehicles.filter((v) => v.category === category)
  const idx = Math.max(0, list.findIndex((v) => v.id === car))
  const vehicle = list[idx] ?? list[0]

  const container = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const mobileInfoRef = useRef<HTMLDivElement>(null)
  const mobileStageRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLButtonElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false)

  const navigate = useCallback((cat: Category, nextCarId: string) => {
    if (busyRef.current) return
    if (cat === category && nextCarId === car) return

    busyRef.current = true

    const elementsToAnimate = [".select", ".stage", ".select2", ".info"]
    gsap.killTweensOf(elementsToAnimate)

    gsap.to(elementsToAnimate.filter(Boolean), {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        router.push(`/garage/${cat}/${nextCarId}`)
      }
    })
  }, [router, category, car])

  useGSAP(() => {
    // Release the busy flag so the user can navigate again
    busyRef.current = false
    const elementsToAnimate = [".select", ".stage", ".select2", ".info"]

    // Set initial state: hidden and slightly above
    gsap.set(elementsToAnimate.filter(Boolean), {
      opacity: 0,
      y: -20
    })

    // Animate in: fade in and slide down to center
    gsap.to(elementsToAnimate.filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1, // This creates the "Team Page" staggered feel
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, {
    // Trigger this every time the URL parameters change
    dependencies: [category, car],
    scope: container
  })

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
      if (e.key === "ArrowLeft") switchIdx(idx - 1)
      if (e.key === "ArrowRight") switchIdx(idx + 1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeTab = scrollContainerRef.current.querySelector('[data-state="active"]');
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center", // This keeps the tab centered in the scroll view
        });
      }
    }
  }, [car]); // Runs every time the car ID changes

  return (
    <main className="bg-background text-foreground overflow-hidden pt-20" ref={container}>
      <div className="hidden lg:flex flex-col pt-4" style={{ height: "calc(100vh - 5rem)" }}>

        {/* --- CATEGORY SELECTOR (TABS) --- */}
        <div className="flex w-full justify-center pt-5 pb-1 px-4 shrink-0">
          <Tabs
            value={category}
            onValueChange={(v) => switchCat(v as Category)}
            className="w-1/2 select"
          >
            <TabsList className="flex w-full gap-20 h-auto bg-background/50 backdrop-blur-md border-b border-border/20 rounded-none">
              {categories.map(({ id, label, Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="flex-1 flex flex-col items-center justify-center gap-1 py-6 font-heading text-[10px] uppercase tracking-[0.15em] font-bold border-b-2 transition-all duration-200 rounded-none shadow-none bg-transparent
                   data-[state=active]:text-primary data-[state=active]:border-b-primary
                   text-muted-foreground border-transparent hover:text-foreground"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 flex overflow-hidden min-h-0 px-6 md:px-10 gap-5 py-4">
          {/* --- CAR SELECTOR (TABS) --- */}
          <Tabs value={car} onValueChange={(v) => navigate(category, v)} orientation="vertical" className="select">
            <TabsList className="flex flex-col h-auto bg-transparent items-stretch gap-0.5 w-40">
              {list.map((v) => (
                <TabsTrigger
                  key={v.id}
                  value={v.id}
                  className="text-left justify-start px-4 py-3 font-heading text-xs uppercase tracking-wider font-bold border-l-2 transition-all duration-150 rounded-none shadow-none bg-transparent
                     data-[state=active]:text-primary data-[state=active]:border-l-primary data-[state=active]:bg-primary/8
                     text-muted-foreground border-transparent hover:border-l-primary/30 hover:text-foreground"
                >
                  <div className="flex flex-col items-start pointer-events-none">
                    <span className="block text-[9px] text-muted-foreground/50 tracking-[0.18em] mb-0.5">
                      {v.year}
                    </span>
                    {/* Original name text */}
                    {v.name}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div ref={stageRef} className="flex-1 flex flex-col min-w-0 gap-3 stage">
            <div
              className="flex-1 relative min-h-0 bg-card border border-border/20"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
            >
              <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover opacity-30" />
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
          </div>
          <div ref={infoRef} className="w-72 lg:w-80 shrink-0 flex flex-col gap-5 overflow-y-auto info" style={{ scrollbarWidth: "none" }}>
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
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col pt-8">
        {/* Category Selector */}
        <Tabs
          value={category}
          onValueChange={(v) => switchCat(v as Category)}
          className="w-full select"
        >
          <TabsList className="flex w-full gap-0 px-4 h-auto bg-background/50 backdrop-blur-md border-b border-border/20 rounded-none">
            {categories.map(({ id, label, Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-6 font-heading text-[10px] uppercase tracking-[0.15em] font-bold border-b-2 transition-all duration-200 rounded-none shadow-none bg-transparent
                   data-[state=active]:text-primary data-[state=active]:border-b-primary
                   text-muted-foreground border-transparent hover:text-foreground"
              >
                <Icon className="w-4 h-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {/* 3D Stage / Hero */}
        <div
          ref={stageRef}
          className="relative mx-4 mt-4 shrink-0 bg-card border border-border/20 stage"
          style={{
            height: "38vh",
            clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
          }}
        >

          <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover opacity-30" />
          <button onClick={() => switchIdx(idx - 1)} disabled={idx === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/70 border border-border/40 disabled:opacity-20 backdrop-blur-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => switchIdx(idx + 1)} disabled={idx === list.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/70 border border-border/40 disabled:opacity-20 backdrop-blur-sm">
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="pointer-events-none absolute bottom-3 left-4">
            <p className="font-heading text-[9px] uppercase tracking-[0.3em] text-primary/70">{vehicle.year}</p>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground/90">{vehicle.name}</h2>
          </div>
        </div>

        {/* Car Selector List */}
        {/* --- MOBILE CAR SELECTOR --- */}
        <Tabs value={car} onValueChange={(v) => navigate(category, v)} className="w-full">
          <TabsList
            ref={scrollContainerRef}
            className="select2 no-scrollbar group-data-[orientation=horizontal]/tabs:h-20 flex w-full gap-2 overflow-x-auto px-4 pt-3 pb-2 bg-transparent h-auto rounded-none no-scrollbar justify-start flex-nowrap border-none shadow-none"
          >
            {list.map((v) => (
              <TabsTrigger
                key={v.id}
                value={v.id}
                className="min-w-[120px] flex flex-col items-start px-4 py-2.5 border transition-all duration-150 rounded-none shadow-none h-auto
                   bg-card text-muted-foreground border-border/30
                   data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-foreground"
              >
                <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-0.5 pointer-events-none">
                  {v.year}
                </span>
                <span className="font-heading text-xs font-bold uppercase tracking-wider data-[state=active]:text-primary pointer-events-none">
                  {v.name}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Vehicle Info */}
        <div ref={infoRef} className="flex flex-col gap-6 px-4 p-5 info">
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
        </div>
      </div>
    </main >
  )
}

