"use client"

import { Vehicle } from "@/types"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate"
import { GARAGE_ANIMATED } from "@/lib/data"

interface Props {
  list: {
    short_name: string
    long_name: string
    year: number
  }[]
  vehicle: Vehicle
  isMobile?: boolean
}

export function VehicleSelect({ isMobile = false, ...props }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const { smoothNavigate } = useSmoothNavigate({
    root: "/garage",
    slugs: [props.vehicle.category, props.vehicle.short_name],
    elements: GARAGE_ANIMATED
  })

  useGSAP(() => {
    gsap.set(container.current, {
      opacity: 0,
      y: -20
    })

    gsap.to(container.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: isMobile ? 0.3 : 0.1,
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, {
    scope: container
  })

  return (
    <div ref={container}>
      {isMobile
        ? <VehicleSelectMobile {...props} navigate={smoothNavigate} />
        : <VehicleSelectDesktop {...props} navigate={smoothNavigate} />
      }
    </div>
  )
}

function VehicleSelectDesktop({ list, vehicle, navigate }: Omit<Props, "isMobile"> & { navigate: (slugs: string[]) => void }) {
  return (
    <Tabs value={vehicle.short_name} onValueChange={(v) => navigate([vehicle.category, v])} orientation="vertical" className="select">
      <TabsList className="flex flex-col h-auto bg-transparent items-stretch gap-0.5 w-40">
        {list.map((v) => (
          <TabsTrigger
            key={v.short_name}
            value={v.short_name}
            className="text-left justify-start px-4 py-3 font-heading text-xs uppercase tracking-wider font-bold border-l-2 transition-all duration-150 rounded-none shadow-none bg-transparent
                     data-[state=active]:text-primary data-[state=active]:border-l-primary data-[state=active]:bg-primary/8
                     text-muted-foreground border-transparent hover:border-l-primary/30 hover:text-foreground"
          >
            <div className="flex flex-col items-start pointer-events-none">
              <span className="block text-[9px] text-muted-foreground/50 tracking-[0.18em] mb-0.5">
                {v.year}
              </span>
              {v.long_name}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function VehicleSelectMobile({ list, vehicle, navigate }: Omit<Props, "isMobile"> & { navigate: (slugs: string[]) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
  }, [vehicle.short_name]);

  return (
    <Tabs value={vehicle.short_name} onValueChange={(v) => navigate([vehicle.category, v])} className="w-full">
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
  )
}
