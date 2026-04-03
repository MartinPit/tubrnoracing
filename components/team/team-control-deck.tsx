"use client"

import { Calendar, Layers } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Season, Subsection } from "@/types/directus-schema"

interface TeamControlDeckProps {
  currentSeason: string
  seasons: Pick<Season, "id" | "label">[]
  currentSubsection: Subsection
  subsections: Subsection[]
  onNavigate: (year?: string, section?: string) => void
}

export function TeamControlDeck({
  currentSeason,
  seasons,
  currentSubsection,
  subsections,
  onNavigate,
}: TeamControlDeckProps) {

  const leaders = subsections.find(s => s.id === "LDSHP")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center gap-2 p-1.5 bg-background border rounded-md shadow-sm w-fit mx-auto">
      <NavigationMenu viewport={true} className="z-50 max-w-full justify-center">
        <NavigationMenuList className="space-x-1">

          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-9 px-4 font-medium text-xs gap-2 bg-transparent hover:bg-accent">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground hidden md:block" />
              <span>Season {currentSeason}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[66vw] md:w-[450px] grid-cols-2 md:grid-cols-3 gap-1 p-3">
                <div className="col-span-full mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  Select Season
                </div>
                {seasons.map(({ label, id }) => (
                  <li key={id}>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => onNavigate(id, currentSubsection.id)}
                        className={cn(
                          "cursor-pointer flex w-full items-center justify-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                          id === currentSeason ? "bg-accent font-semibold text-primary" : "text-muted-foreground"
                        )}
                      >
                        {label}
                      </button>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-9 px-4 font-medium text-xs gap-2 bg-transparent hover:bg-accent">
              <Layers className="h-3.5 w-3.5 text-muted-foreground hidden md:block" />
              <span>{subsections.find(s => s.id === currentSubsection.id)?.label || "Department"}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[66vw] md:w-[450px] grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 p-4">
                <div className="col-span-full mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  Select Department
                </div>
                {[
                  leaders!,
                  ...subsections.filter(s => s.id !== "LDSHP")
                ].map((sec) => (
                  <li key={sec.id}>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => scrollToSection(sec.id)}
                        className={cn(
                          "cursor-pointer flex w-full flex-col hover:[&>span:first-child]:text-primary items-start rounded-md p-3 text-left transition-all hover:bg-accent",
                          sec.id === currentSubsection.id ? "bg-accent/50 ring-1 ring-inset ring-border" : ""
                        )}
                      >
                        <span className={cn(
                          "text-sm font-medium ",
                          sec.id === currentSubsection.id ? "text-primary" : "text-foreground"
                        )}>
                          {sec.label}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {sec.short}
                        </span>
                      </button>
                    </NavigationMenuLink>
                  </li>
                )
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
