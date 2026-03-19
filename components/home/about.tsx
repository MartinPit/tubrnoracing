"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react";
import ReactMarkdown from 'react-markdown'

interface Props {
  leftText: string
  rightText: string
  stats: { value: string, statistic: string }[]
};

export function About({ leftText, rightText, stats }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from("#about-left", {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })

    gsap.from("#about-right", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })

    gsap.from(".stat-item", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })
  }, {
    scope: containerRef,
    dependencies: []
  });

  return (
    <div ref={containerRef} className="relative z-10 -mt-[120vh] pointer-events-none">
      <div className="mx-auto px-6">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 w-full">
            <div
              id="about-left"
              className="max-w-lg pointer-events-auto bg-background/80 backdrop-blur-sm p-8"
            >
              <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
                About
                <span className="block text-primary">Us</span>
              </h2>

              <div className="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground mt-12">
                <ReactMarkdown>
                  {leftText}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[50vh] flex items-center justify-end">
          <div
            id="about-right"
            className="max-w-lg pointer-events-auto bg-background/80 backdrop-blur-sm p-8"
          >
            <div className="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">
              <ReactMarkdown>
                {rightText}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="py-24">
          <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item bg-background/80 backdrop-blur-sm p-6 border-l-2 border-primary">
                <div className="font-heading text-4xl sm:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">{stat.statistic}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
