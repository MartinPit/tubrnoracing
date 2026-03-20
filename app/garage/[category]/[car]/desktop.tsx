"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vehicle, VehicleCategory } from "@/types";
import { VEHICLE_CATEGORIES } from "@/lib/data";
import { useRef } from "react";
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate";
import { Stage } from "@/components/garage/stage";
import { Info } from "@/components/garage/info";

interface Props {
  category: VehicleCategory
  shortName: string
  list: {
    short_name: string
    long_name: string
    year: number
  }[]
  vehicle: Vehicle
};

const elementsToAnimate = [".select"]
export function GarageDesktop({
  category,
  shortName,
  list,
  vehicle
}: Props) {
  const { smoothNavigate } = useSmoothNavigate({
    root: "/garage",
    slugs: [category, shortName],
    elements: [".select", ".stage", ".info"]
  })

  const idx = Math.max(0, list.findIndex((v) => v.short_name === shortName))
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set(elementsToAnimate.filter(Boolean), {
      opacity: 0,
      y: -20
    })

    gsap.to(elementsToAnimate.filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, {
    dependencies: [category, shortName],
    scope: container
  })

  const switchCat = (cat: VehicleCategory) => {
    if (cat === category) return
    smoothNavigate([cat])
  }

  return (
    <div ref={container} className="hidden lg:flex flex-col pt-4" style={{ height: "calc(100vh - 5rem)" }}>

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
        <Tabs value={shortName} onValueChange={(v) => smoothNavigate([category, v])} orientation="vertical" className="select">
          <TabsList className="flex flex-col h-auto bg-transparent items-stretch gap-0.5 w-40">
            {list.map((v) => (
              <TabsTrigger
                key={shortName}
                value={shortName}
                className="text-left justify-start px-4 py-3 font-heading text-xs uppercase tracking-wider font-bold border-l-2 transition-all duration-150 rounded-none shadow-none bg-transparent
                     data-[state=active]:text-primary data-[state=active]:border-l-primary data-[state=active]:bg-primary/8
                     text-muted-foreground border-transparent hover:border-l-primary/30 hover:text-foreground"
              >
                <div className="flex flex-col items-start pointer-events-none">
                  <span className="block text-[9px] text-muted-foreground/50 tracking-[0.18em] mb-0.5">
                    {v.year}
                  </span>
                  {vehicle.long_name}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Stage
          idx={idx}
          list={list}
          vehicle={vehicle}
          navigate={smoothNavigate}
        />
        <Info
          specifications={vehicle.specifications}
          highlights={vehicle.highlights}
          description={vehicle.description}
        />
      </div>
    </div>
  )
}
