"use client"

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function SuccessMessage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(iconRef.current,
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="p-8 border border-primary/30 opacity-0 h-max"
    >
      <div
        ref={iconRef}
        className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center mb-5"
      >
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-heading text-2xl font-bold uppercase mb-2">Telemetry Received</h3>
      <p className="text-sm text-muted-foreground">
        Thank you for your interest. Our partnership team will be in touch within 48 hours.
      </p>
    </div>
  );
};
