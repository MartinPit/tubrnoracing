"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useSmoothNavigate } from "@/hooks/useSmoothNavigate";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface Props {
  category: string,
  categories: {
    id: number,
    title: string
  }[]
};

export function CategorySelect(
  { category, categories }: Props
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { smoothNavigate } = useSmoothNavigate({
    root: "/gallery",
    slugs: [category.toLowerCase()],
    elements: [".hero", ".select", ".gallery-card"]
  })

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 24, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.2,
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="select mb-12 border-b border-border/20">

      <div className="flex md:hidden items-center justify-between pb-4">
        <Select
          value={category}
          onValueChange={(val) => smoothNavigate([val.toLowerCase()])}
        >
          <SelectTrigger className="w-[180px] font-heading text-[10px] uppercase tracking-[0.2em] border-border/20">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem
                key={cat.id}
                value={cat.title} className="font-heading text-[10px] uppercase tracking-[0.1em]">
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:flex items-center gap-1">
        <Tabs
          value={category}
          onValueChange={(val) => smoothNavigate([val.toLowerCase()])}
          className="w-full"
        >
          <TabsList className="bg-transparent h-auto p-0 flex items-center justify-start gap-1">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.title}
                className={`
                        relative shrink-0 font-heading text-xs uppercase tracking-[0.2em] px-5 py-3 transition-colors duration-200
                        bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none
                        data-[state=active]:text-primary text-muted-foreground hover:text-foreground
                      `}
              >
                {cat.title}
                {category === cat.title && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </TabsTrigger>
            ))}

          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
