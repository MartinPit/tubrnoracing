"use client"

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MediaCard } from "../media/media-card";
import { useRef } from "react";
import { NavigationButton } from "../navigation-button";
import { GalleryFile } from "@/types";

export function MediaSectionScroller({ items }: { items: GalleryFile[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const scrollContent = scrollContentRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (scrollContent && scrollContainer) {
      const scrollWidth = scrollContent.scrollWidth - scrollContainer.offsetWidth;

      gsap.to(scrollContent, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          anticipatePin: 1,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden">
      <div ref={scrollContainerRef} className="h-full flex flex-col justify-center">
        <div className="px-6 mb-8">
          <div className="container mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight">
              Media <span className="text-primary">Gallery</span>
            </h2>
            <NavigationButton href="/gallery" variant="outline">
              View All
            </NavigationButton>
          </div>
        </div>

        <div ref={scrollContentRef} className="flex gap-6 px-6 items-center">
          {items.map((item, index) => (
            <MediaCard key={index} item={item} />
          ))}
        </div>

        <div className="px-6 mt-8">
          <div className="container mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Scroll to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
