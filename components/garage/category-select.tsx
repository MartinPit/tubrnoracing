"use client"

import { GARAGE_ANIMATED, VEHICLE_CATEGORIES } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { VehicleCategory } from "@/types";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate";

interface Props {
  category: VehicleCategory
  isMobile?: boolean
};

export function CategorySelect({ category, isMobile = false }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const { smoothNavigate } = useSmoothNavigate({
    root: "/garage",
    slugs: [category],
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
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, {
    scope: container
  })

  const switchCat = (cat: VehicleCategory) => {
    if (cat === category) return
    smoothNavigate([cat])
  }

  return (
    <div
      ref={container}
      className={cn(
        isMobile
          ? ""
          : "flex w-full justify-center pt-5 pb-1 px-4 shrink-0"
      )}>
      <Tabs
        value={category}
        onValueChange={(v) => switchCat(v as VehicleCategory)}
        className={cn(
          "select",
          isMobile
            ? "w-full"
            : "w-1/2"
        )}
      >
        <TabsList className={cn(
          "flex w-full h-auto bg-background/50 backdrop-blur-md border-b border-border/20 rounded-none",
          isMobile
            ? "gap-0 px-4"
            : "gap-20",
        )}
        >
          {
            VEHICLE_CATEGORIES.map(({ id, label, Icon }) => (
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
            ))
          }
        </TabsList>
      </Tabs>
    </div >
  )
}
