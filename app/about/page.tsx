"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const teamStats = [
  { value: "30+",  label: "Years of Formula Student" },
  { value: "600+", label: "Competing universities" },
  { value: "14",   label: "Events per season" },
  { value: "5",    label: "Disciplines judged" },
]

const tuStats = [
  { value: "100+",  label: "Active team members" },
  { value: "15",    label: "Combustion cars built" },
  { value: "5",     label: "Electric cars built" },
  { value: "2004",  label: "Year founded" },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(".about-hero", { y: 48, opacity: 0, duration: 0.75, ease: "power3.out" })

    ;[".section-fs", ".section-team"].forEach((sel, i) => {
      gsap.from(`${sel} .anim-text`, {
        y: 32, opacity: 0, duration: 0.65, ease: "power2.out", stagger: 0.1, delay: i * 0.05,
        scrollTrigger: { trigger: sel, start: "top 80%" },
      })
      gsap.from(`${sel} .anim-img`, {
        scale: 1.04, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sel, start: "top 80%" },
      })
      gsap.from(`${sel} .anim-stat`, {
        y: 20, opacity: 0, duration: 0.4, ease: "power2.out", stagger: 0.07,
        scrollTrigger: { trigger: sel, start: "top 72%" },
      })
    })
  }, { scope: containerRef })

  return (
    <>
      <main
        ref={containerRef}
        className="bg-background text-foreground min-h-screen pb-32"
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <div className="about-hero mb-24">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Who We Are</p>
            <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight text-balance">
              About<br />
              <span className="text-primary">TUBrnoRacing.</span>
            </h1>
          </div>

          <section className="section-fs mb-28">
            <div className="flex items-center gap-4 mb-12 anim-text">
              <div
                className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] bg-primary text-background"
                style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
              >
                01
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
                Formula Student
              </h2>
              <div className="flex-1 h-px bg-border/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              <div
                className="anim-img relative overflow-hidden border border-border/20"
                style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
              >
                <img
                  src="/placeholder.svg?height=520&width=680"
                  alt="Formula Student competition"
                  className="w-full h-80 md:h-[420px] object-cover"
                />
                <div className="pointer-events-none absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60" />

                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading">Formula Student Germany, 2024</p>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 anim-text">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Formula Student is the world's largest engineering design competition, organised by the Institution of Mechanical Engineers. Teams of university students design, build, and race a small single-seat racing car, competing against over 600 universities worldwide.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The competition tests far more than engineering ability. Judges evaluate design decisions, cost management, business strategy, and outright performance on the track. Events are held across Europe, the Americas, and Asia, making Formula Student a truly global proving ground.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For students, it is an unrivalled opportunity to apply theoretical knowledge to a real engineering challenge — developing skills in CAD, simulation, manufacturing, project management, and teamwork that set them apart in industry.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {teamStats.map((s) => (
                    <div
                      key={s.label}
                      className="anim-stat bg-card border border-border/30 p-4"
                      style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                    >
                      <p className="font-heading text-3xl font-bold text-primary leading-none mb-1">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-team">

            <div className="flex items-center gap-4 mb-12 anim-text">
              <div
                className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] text-primary border border-primary/40"
                style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
              >
                02
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
                TUBrnoRacing
              </h2>
              <div className="flex-1 h-px bg-border/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              <div className="flex flex-col gap-8 lg:order-1">
                <div className="flex flex-col gap-4 anim-text">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    TUBrnoRacing was founded in 2004 by students of the Brno University of Technology. Since then, we have grown into one of the most competitive Formula Student teams in Central Europe, competing annually with both combustion and electric vehicles.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    With over 100 active members across nine specialist departments — from aerodynamics and electric powertrain to marketing and software — our team mirrors the structure of a professional motorsport organisation. Every year a completely new car is designed from scratch, incorporating lessons from the season before.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We compete at Formula Student events in Germany, Austria, Italy, Hungary, and the Czech Republic. Our Dragon series combustion cars and Dragon E electric cars have earned podium finishes at multiple events and represent years of accumulated engineering knowledge.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {tuStats.map((s) => (
                    <div
                      key={s.label}
                      className="anim-stat bg-card border border-border/30 p-4"
                      style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                    >
                      <p className="font-heading text-3xl font-bold text-primary leading-none mb-1">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="anim-img relative overflow-hidden border border-border/20 lg:order-2"
                style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-28%20140657-8AZaEMy8VTPwqmsvIKdonfBzYKkTV6.png"
                  alt="TUBrnoRacing team and car"
                  className="w-full h-80 md:h-[420px] object-cover"
                />
                <div className="pointer-events-none absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-heading">TU Brno Racing — Dragon X, 2024</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
