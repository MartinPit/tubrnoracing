"use client"

import gsap from "gsap"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VEHICLE_CATEGORIES } from "@/lib/data"
import { Vehicle, VehicleCategory } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate"
import directusLoader from "@/lib/utils"
import { StatisticCard } from "@/components/garage/statistic-card"
import { Stage } from "@/components/garage/stage"
import { Info } from "@/components/garage/info"

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

const elementsToAnimate = [".select", ".select2"]

export function GarageMobile({
  category,
  shortName,
  list,
  vehicle
}: Props) {
  const { smoothNavigate } = useSmoothNavigate({
    root: "/garage",
    slugs: [category, shortName],
    elements: [".select", ".stage", ".select2", ".info"]
  });
  const idx = Math.max(0, list.findIndex((v) => v.short_name === shortName))
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
  }, [shortName]);

  return (
    <div ref={container} className="lg:hidden flex flex-col pt-8">
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

      <Stage
        idx={idx}
        list={list}
        vehicle={vehicle}
        navigate={smoothNavigate}
        isMobile
      />

      <Tabs value={shortName} onValueChange={(v) => smoothNavigate([category, v])} className="w-full">
        <TabsList
          ref={scrollContainerRef}
          className="select2 no-scrollbar group-data-[orientation=horizontal]/tabs:h-20 flex w-full gap-2 overflow-x-auto px-4 pt-3 pb-2 bg-transparent h-auto rounded-none no-scrollbar justify-start flex-nowrap border-none shadow-none"
        >
          {list.map((v) => (
            <TabsTrigger
              key={v.short_name}
              value={v.short_name}
              className="min-w-[120px] flex flex-col items-start px-4 py-2.5 border transition-all duration-150 rounded-none shadow-none h-auto
                   bg-card text-muted-foreground border-border/30
                   data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-foreground"
            >
              <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-0.5 pointer-events-none">
                {v.year}
              </span>
              <span className="font-heading text-xs font-bold uppercase tracking-wider data-[state=active]:text-primary pointer-events-none">
                {v.long_name}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Info
        specifications={vehicle.specifications}
        highlights={vehicle.highlights}
        description={vehicle.description}
        isMobile
      />
    </div>
  )
}
