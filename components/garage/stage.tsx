"use client"

import directusLoader, { cn } from "@/lib/utils";
import { Vehicle, DirectusImage } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";

export function Stage({ isMobile = false, vehicle }: { isMobile?: boolean, vehicle: Vehicle }) {
  const container = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const [state, setState] = useState({
    activeIdx: 0,
    prevIdx: 0,
    direction: 1,
    isAnimating: false
  });

  const gallery: DirectusImage[] = useMemo(() => {
    return vehicle.images
  }, [vehicle.images]);

  const switchImg = (newIdx: number) => {
    if (state.isAnimating || newIdx < 0 || newIdx >= gallery.length) return;

    setState({
      activeIdx: newIdx,
      prevIdx: state.activeIdx,
      direction: newIdx > state.activeIdx ? 1 : -1,
      isAnimating: true
    });
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        switchImg(state.activeIdx + 1);
      } else {
        switchImg(state.activeIdx - 1);
      }
    }

    touchStart.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isAnimating) return;
      if (e.key === "ArrowLeft") switchImg(state.activeIdx - 1);
      if (e.key === "ArrowRight") switchImg(state.activeIdx + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.activeIdx, state.isAnimating, gallery.length]);

  useGSAP(() => {
    if (gallery.length <= 1 || !state.isAnimating) return;

    const xMove = state.direction === 1 ? '100%' : '-100%';
    const tl = gsap.timeline({
      onComplete: () => setState(prev => ({ ...prev, isAnimating: false }))
    });

    tl.set(".incoming-image", { x: xMove, opacity: 1, visibility: "visible" });
    tl.to(".incoming-image", { x: 0, duration: 0.4, ease: "expo.inOut" });

  }, { dependencies: [state.activeIdx], scope: container });

  return (
    <div
      ref={container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "stage bg-card border border-border/20 overflow-hidden relative touch-pan-y",
        isMobile ? "mx-4 mt-4 shrink-0" : "flex-1 min-h-0"
      )}
      style={{
        height: isMobile ? "38dvh" : "100%",
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
      }}
    >
      <div className="previous-image absolute inset-0 w-full h-full">
        <Image src={gallery[state.prevIdx].id} loader={directusLoader} alt="prev" fill className="object-cover" />
      </div>

      <div className="incoming-image absolute inset-0 w-full h-full visibility-hidden z-10">
        <Image src={gallery[state.activeIdx].id} loader={directusLoader} alt="active" fill priority className="object-cover" />
      </div>

      {!isMobile && (
        <>
          <button
            onClick={() => switchImg(state.activeIdx - 1)}
            disabled={state.activeIdx === 0 || state.isAnimating}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-8 h-8 z-30 flex items-center justify-center bg-background/60 border border-border/40 hover:text-primary backdrop-blur-sm transition-all disabled:opacity-0",
              isMobile ? "left-3" : "left-2"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => switchImg(state.activeIdx + 1)}
            disabled={state.activeIdx === gallery.length - 1 || state.isAnimating}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-8 h-8 z-30 flex items-center justify-center bg-background/60 border border-border/40 hover:text-primary backdrop-blur-sm transition-all disabled:opacity-0",
              isMobile ? "right-3" : "right-2"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      <div className={cn(
        "pointer-events-none absolute z-20",
        isMobile ? "bottom-3 left-4" : "bottom-4 left-6"
      )}>
        <p className={cn("font-heading text-sm uppercase tracking-[0.3em] text-primary/70", !isMobile && "mb-0.5")}>{vehicle.year}</p>
        <h2 className={cn("font-heading font-bold uppercase tracking-tight text-foreground/90", isMobile ? "text-2xl" : "text-4xl")}>{vehicle.long_name}</h2>
      </div>

      {gallery.length > 1 && (
        <div className="pointer-events-none absolute bottom-5 right-6 z-20 flex gap-1.5">
          {gallery.map((_, i) => (
            <div
              key={i}
              className={cn("transition-all duration-500", i === state.activeIdx ? "bg-primary scale-125" : "bg-foreground/20")}
              style={{ width: 6, height: 6, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
