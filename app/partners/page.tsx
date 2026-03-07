"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { PartnerList } from "@/components/partners/partner-list"
import { PartnerForm } from "@/components/partners/partner-form"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SponsorsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tierRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    gsap.from(".sponsors-hero", {
      y: 48, opacity: 0, duration: 0.8, ease: "power3.out",
    })
    tierRefs.current.forEach((el) => {
      if (!el) return
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      })
      gsap.from(el.querySelectorAll(".partner-card"), {
        scale: 0.92, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      })
    })
    gsap.from(".sponsors-form", {
      y: 40, opacity: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".sponsors-form", start: "top 82%" },
    })
  }, { scope: containerRef })

  return (
    <>
      <main ref={containerRef} className="bg-background text-foreground min-h-screen pb-32" style={{ paddingTop: "120px" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="sponsors-hero mb-20">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Our Partners</p>
            <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight">
              Sponsors<br />
              <span className="text-primary">&amp; Partners</span>
            </h1>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-lg">
              TUBrnoRacing is made possible by the generosity and technical expertise of our partners. Every sponsor plays a direct role in putting our car on the track.
            </p>
          </div>

          <PartnerList tierRefs={tierRefs} />

          <div className="sponsors-form mt-24 pt-16 border-t border-border/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Become a Partner</p>
                <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight mb-6">
                  Join Our<br />
                  <span className="text-primary">Racing Family.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
                  Partner with TUBrnoRacing to reach a passionate engineering community, gain brand exposure at international competitions, and support the next generation of technical talent.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Logo on car, race suits, and team gear",
                    "Social media features and content collaboration",
                    "Recruitment access to 100+ engineering students",
                    "Brand presence at international Formula Student events",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-primary"
                        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <PartnerForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
