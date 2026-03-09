// components/team/team-control-deck.tsx
"use client"

import * as React from "react"
import { Calendar, Layers, Check, ChevronDown } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  short: string
  label: string
}

interface TeamControlDeckProps {
  currentSeason: string
  years: string[]
  sections: Section[]
  currentSection: string
  onNavigate: (year?: string, section?: string) => void
}

export function TeamControlDeck({
  currentSeason,
  years,
  sections,
  currentSection,
  onNavigate,
}: TeamControlDeckProps) {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-background border rounded-md shadow-sm w-full md:w-fit">
      <NavigationMenu>
        <NavigationMenuList className="space-x-1">

          {/* ── SEASON DROPDOWN (2 Columns for many years) ── */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-9 px-4 font-medium text-xs gap-2 bg-transparent hover:bg-accent">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Season {currentSeason}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[450px] grid-cols-3 gap-1 p-3">
                <div className="col-span-3 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  Select Season
                </div>
                {years.map((yr) => (
                  <li key={yr}>
                    <button
                      onClick={() => onNavigate(yr, currentSection)}
                      className={cn(
                        "cursor-pointer flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        yr === currentSeason ? "bg-accent font-semibold text-primary" : "text-muted-foreground"
                      )}
                    >
                      {yr}
                      {yr === currentSeason && <Check className="h-3.5 w-3.5" />}
                    </button>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* ── SECTION DROPDOWN (Wide 2-Column Grid) ── */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-9 px-4 font-medium text-xs gap-2 bg-transparent hover:bg-accent">
              <Layers className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{sections.find(s => s.id === currentSection)?.label || "Department"}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[450px] grid-cols-2 gap-x-4 gap-y-1 p-4">
                <div className="col-span-2 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  Select Department
                </div>
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => onNavigate(currentSeason, sec.id)}
                      className={cn(
                        "cursor-pointer group flex w-full flex-col items-start rounded-md p-3 text-left transition-all hover:bg-accent",
                        sec.id === currentSection ? "bg-accent/50 ring-1 ring-inset ring-border" : ""
                      )}
                    >
                      <div className="flex w-full items-center justify-between mb-0.5">
                        <span className={cn(
                          "text-sm font-medium leading-none",
                          sec.id === currentSection ? "text-primary" : "text-foreground group-hover:text-primary"
                        )}>
                          {sec.label}
                        </span>
                        {sec.id === currentSection && <Check className="h-3.5 w-3.5 text-primary" />}
                      </div>
                      <span className="text-[10px] font-mono tracking-tight text-muted-foreground">
                        {sec.short}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
