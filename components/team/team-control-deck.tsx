"use client"

import { Calendar, Layers, Check } from "lucide-react"
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
  onNavigate: (year: string, section: string) => void
}

export function TeamControlDeck({
  currentSeason,
  years,
  sections,
  currentSection,
  onNavigate,
}: TeamControlDeckProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2 p-1.5 bg-background border rounded-md shadow-sm">

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2 text-xs font-medium">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            Season {currentSeason}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* The fixed width here (w-64) is what the viewport "morphs" to */}
            <ul className="grid w-64 grid-cols-2 gap-1 p-3">
              {years.map((yr) => (
                <li key={yr}>
                   <button
                    onClick={() => onNavigate(yr, currentSection)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md p-2 text-sm transition-colors hover:bg-accent",
                      yr === currentSeason ? "bg-accent/50 font-semibold text-primary" : "text-muted-foreground"
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

        {/* ── DEPARTMENT SELECTOR ── */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2 text-xs font-medium">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            {sections.find(s => s.id === currentSection)?.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Morphing to a larger width (w-[500px]) and 2 columns */}
            <ul className="grid w-[500px] grid-cols-2 gap-2 p-4">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => onNavigate(currentSeason, sec.id)}
                    className={cn(
                      "flex w-full flex-col items-start rounded-md p-3 text-left transition-colors hover:bg-accent",
                      sec.id === currentSection ? "bg-accent/50 ring-1 ring-inset ring-border" : ""
                    )}
                  >
                    <div className="flex w-full items-center justify-between mb-0.5">
                      <span className={cn(
                        "text-sm font-medium",
                        sec.id === currentSection ? "text-primary" : "text-foreground"
                      )}>
                        {sec.label}
                      </span>
                      {sec.id === currentSection && <Check className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-tight text-muted-foreground">
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
  )
}
