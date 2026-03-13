"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VEHICLE_CATEGORIES, VEHICLES } from "@/lib/data"
import { Vehicle, VehicleCategory } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"

interface Props {
  category: VehicleCategory
  car: string
  navigate: (cat: VehicleCategory, carId: string) => void
  list: Vehicle[]
  vehicle: Vehicle
};

export function GarageMobile({
  category,
  car,
  navigate,
  list,
  vehicle
}: Props) {
  const idx = Math.max(0, list.findIndex((v) => v.id === car))
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const switchCat = (cat: VehicleCategory) => {
    if (cat === category) return
    const first = VEHICLES.find((v) => v.category === cat)
    if (first) navigate(cat, first.id)
  }

  const switchIdx = (i: number) => {
    if (i === idx || i < 0 || i >= list.length) return
    navigate(category, list[i].id)
  }

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeTab = scrollContainerRef.current.querySelector('[data-state="active"]');
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [car]);

  return (
    <div className="lg:hidden flex flex-col pt-8">
      {/* Category Selector */}
      <Tabs
        value={category}
        onValueChange={(v) => switchCat(v as VehicleCategory)}
        className="w-full select"
      >
        <TabsList className="flex w-full gap-0 px-4 h-auto bg-background/50 backdrop-blur-md border-b border-border/20 rounded-none">
          {VEHICLE_CATEGORIES.map(({ id, label, Icon }) => (
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
      <div className="flex flex-col gap-6 px-4 p-5 info">
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
  )
}
