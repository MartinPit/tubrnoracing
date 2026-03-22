"use client"

import { Vehicle } from "@/types";
import { StatisticCard } from "./statistic-card";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface Props {
  specifications?: Vehicle["specifications"]
  highlights: Vehicle["highlights"]
  description: string
  isMobile?: boolean
};

export function Info(
  {
    specifications,
    highlights,
    description,
    isMobile = false
  }: Props
) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set(container.current, {
      opacity: 0,
      y: -20
    })

    gsap.to(container.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, {
    scope: container
  })
  return (
    <div
      ref={container}
      className={cn(
        "info flex flex-col",
        isMobile
          ? "gap-6 px-4 p-5"
          : "w-72 lg:w-80 shrink-0 gap-5 overflow-y-auto ",
      )}
      style={{ scrollbarWidth: "none" }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-2">About</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-3">Specifications</p>
        <div className="grid grid-cols-2 gap-2">
          {highlights.map((s, i) => (
            <StatisticCard
              key={i}
              statistic={s}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading mb-3">Highlights</p>
        <ul className={cn(
          "flex flex-col",
          isMobile
            ? "gap-3"
            : "gap-2",
        )}
        >
          {specifications?.map((h, i) => (
            <li key={i} className={cn(
              "flex items-start text-sm text-muted-foreground",
              isMobile
                ? "gap-3"
                : "gap-2.5",
            )}
            >
              <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-primary"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
