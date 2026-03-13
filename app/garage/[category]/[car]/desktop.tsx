"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vehicle, VehicleCategory } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { VEHICLE_CATEGORIES, VEHICLES } from "@/lib/data";
import { useEffect } from "react";

interface Props {
  category: VehicleCategory
  car: string
  navigate: (cat: VehicleCategory, carId: string) => void
  list: Vehicle[]
  vehicle: Vehicle
};

export function GarageDesktop({
  category,
  car,
  navigate,
  list,
  vehicle
}: Props) {
  const idx = Math.max(0, list.findIndex((v) => v.id === car))

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
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") switchIdx(idx - 1)
      if (e.key === "ArrowRight") switchIdx(idx + 1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })


  return (
    <div className="hidden lg:flex flex-col pt-4" style={{ height: "calc(100vh - 5rem)" }}>

      {/* --- CATEGORY SELECTOR (TABS) --- */}
      <div className="flex w-full justify-center pt-5 pb-1 px-4 shrink-0">
        <Tabs
          value={category}
          onValueChange={(v) => switchCat(v as VehicleCategory)}
          className="w-1/2 select"
        >
          <TabsList className="flex w-full gap-20 h-auto bg-background/50 backdrop-blur-md border-b border-border/20 rounded-none">
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

        <div className="flex-1 flex flex-col min-w-0 gap-3 stage">
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
        <div className="w-72 lg:w-80 shrink-0 flex flex-col gap-5 overflow-y-auto info" style={{ scrollbarWidth: "none" }}>
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
  )
}
