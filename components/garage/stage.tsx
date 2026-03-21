"use client"

import directusLoader, { cn } from "@/lib/utils";
import { Vehicle } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate";
import { GARAGE_ANIMATED } from "@/lib/data";

interface Props {
  list: { short_name: string }[]
  isMobile?: boolean
  vehicle: Vehicle
}

export function Stage(
  {
    list,
    isMobile = false,
    vehicle,
  }: Props
) {
  const container = useRef<HTMLDivElement>(null)
  const { smoothNavigate } = useSmoothNavigate({
    root: "/garage",
    slugs: [vehicle.category, vehicle.short_name],
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
      delay: 0.2,
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, {
    scope: container
  })

  const switchIdx = (i: number) => {
    if (i === idx || i < 0 || i >= list.length) return
    smoothNavigate([vehicle.category, list[i].short_name])
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") switchIdx(idx - 1)
      if (e.key === "ArrowRight") switchIdx(idx + 1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  const idx = Math.max(0, list.findIndex((v) => v.short_name === vehicle.short_name))

  return (
    <div
      ref={container}
      className={cn(
        "stage bg-card border border-border/20",
        isMobile
          ? "relative mx-4 mt-4 shrink-0"
          : "flex-1 relative min-h-0"
      )}
      style={{
        height: isMobile ? "38dvh" : "",
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
      }}
    >
      <Image
        src={vehicle.image.id}
        loader={directusLoader}
        alt={vehicle.image.title || vehicle.long_name}
        sizes="(max-width: 768px) 100vw, 50vw"
        fill
        preload
        fetchPriority="high"
        loading="eager"
        className="object-cover"
      />
      <button onClick={() => switchIdx(idx - 1)} disabled={idx === 0}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/60 border border-border/40 hover:border-primary/60 hover:text-primary disabled:opacity-20 transition-all duration-200 backdrop-blur-sm",
          isMobile ? "left-3" : "left-2"
        )}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={() => switchIdx(idx + 1)} disabled={idx === list.length - 1}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/60 border border-border/40 hover:border-primary/60 hover:text-primary disabled:opacity-20 transition-all duration-200 backdrop-blur-sm",
          isMobile ? "right-3" : "right-2"
        )}>
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className={cn(
        "pointer-events-none absolute",
        isMobile ? "bottom-3 left-4" : "bottom-4 left-6"
      )}
      >
        <p className={cn(
          "font-heading text-sm uppercase tracking-[0.3em] text-primary/70",
          !isMobile && "mb-0.5"
        )}
        >
          {vehicle.year}
        </p>
        <h2 className={cn(
          "font-heading font-bold uppercase tracking-tight text-foreground/90",
          isMobile ? "text-2xl" : "text-4xl"
        )}
        >
          {vehicle.long_name}
        </h2>
      </div>
      {!isMobile &&
        <div className="pointer-events-none absolute bottom-5 right-6 flex gap-1.5">
          {list.map((_, i) => (
            <div key={i}
              className={`transition-all duration-200 ${i === idx ? "bg-primary scale-125" : "bg-foreground/20"}`}
              style={{ width: 6, height: 6, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            />
          ))}
        </div>
      }
    </div>
  );
}
