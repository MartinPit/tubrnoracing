"use client"

import { useRef, useState } from "react"
import { Navigation } from "@/components/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const tiers = [
  {
    id: "platinum",
    label: "Platinum",
    color: "#e8e6e3",
    accent: "rgba(232,230,227,0.07)",
    border: "rgba(232,230,227,0.25)",
    logoH: "h-20",
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    description: "Premier partners who form the backbone of our programme.",
    sponsors: [
      { name: "Bosch", logo: "/placeholder.svg?height=80&width=200" },
      { name: "Continental", logo: "/placeholder.svg?height=80&width=200" },
      { name: "Garrett Motion", logo: "/placeholder.svg?height=80&width=200" },
    ],
  },
  {
    id: "gold",
    label: "Gold",
    color: "#f5c842",
    accent: "rgba(245,200,66,0.06)",
    border: "rgba(245,200,66,0.25)",
    logoH: "h-16",
    gridCols: "grid-cols-2 md:grid-cols-4",
    description: "Strategic partners who help us push performance boundaries.",
    sponsors: [
      { name: "Brno University of Technology", logo: "/placeholder.svg?height=64&width=160" },
      { name: "CSO", logo: "/placeholder.svg?height=64&width=160" },
      { name: "Ansys", logo: "/placeholder.svg?height=64&width=160" },
      { name: "SolidWorks", logo: "/placeholder.svg?height=64&width=160" },
    ],
  },
  {
    id: "silver",
    label: "Silver",
    color: "#b0b0b0",
    accent: "rgba(176,176,176,0.05)",
    border: "rgba(176,176,176,0.2)",
    logoH: "h-12",
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    description: "Valued partners contributing expertise and materials.",
    sponsors: [
      { name: "Hexagon", logo: "/placeholder.svg?height=48&width=130" },
      { name: "Stilo", logo: "/placeholder.svg?height=48&width=130" },
      { name: "Hella", logo: "/placeholder.svg?height=48&width=130" },
      { name: "Brose", logo: "/placeholder.svg?height=48&width=130" },
      { name: "KSR Group", logo: "/placeholder.svg?height=48&width=130" },
    ],
  },
  {
    id: "bronze",
    label: "Bronze",
    color: "#c97c4a",
    accent: "rgba(201,124,74,0.05)",
    border: "rgba(201,124,74,0.2)",
    logoH: "h-10",
    gridCols: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
    description: "Community supporters who believe in the next generation of engineers.",
    sponsors: [
      { name: "Motul", logo: "/placeholder.svg?height=40&width=110" },
      { name: "AMS", logo: "/placeholder.svg?height=40&width=110" },
      { name: "Partner F", logo: "/placeholder.svg?height=40&width=110" },
      { name: "Partner G", logo: "/placeholder.svg?height=40&width=110" },
      { name: "Partner H", logo: "/placeholder.svg?height=40&width=110" },
      { name: "Partner I", logo: "/placeholder.svg?height=40&width=110" },
    ],
  },
]

type FormState = "idle" | "sending" | "sent"

export default function SponsorsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tierRefs = useRef<(HTMLDivElement | null)[]>([])
  const [form, setForm] = useState({ company: "", name: "", email: "", message: "" })
  const [formState, setFormState] = useState<FormState>("idle")

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
      gsap.from(el.querySelectorAll(".s-card"), {
        scale: 0.92, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      })
    })
    gsap.from(".sponsors-form", {
      y: 40, opacity: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".sponsors-form", start: "top 82%" },
    })
  }, { scope: containerRef })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    await new Promise((r) => setTimeout(r, 1200))
    setFormState("sent")
  }

  return (
    <>
      <Navigation />
      <main ref={containerRef} className="bg-background text-foreground min-h-screen pb-32" style={{ paddingTop: "120px" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
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
          <div className="flex flex-col gap-16">
            {tiers.map((tier, ti) => (
              <div
                key={tier.id}
                ref={(el) => { tierRefs.current[ti] = el }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em]"
                    style={{
                      clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)",
                      background: tier.color,
                      color: "#0a0a0a",
                    }}
                  >
                    {tier.label}
                  </div>
                  <div className="flex-1 h-px" style={{ background: tier.border }} />
                  <span
                    className="shrink-0 text-[10px] font-heading uppercase tracking-[0.22em]"
                    style={{ color: `${tier.color}90` }}
                  >
                    {tier.sponsors.length} {tier.sponsors.length === 1 ? "partner" : "partners"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-6 ml-1">{tier.description}</p>
                <div className={`grid ${tier.gridCols} gap-3`}>
                  {tier.sponsors.map((sponsor) => (
                    <div
                      key={sponsor.name}
                      className="s-card group relative flex flex-col items-center justify-center gap-3 p-5 border cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
                      style={{
                        background: tier.accent,
                        borderColor: tier.border,
                        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                      }}
                    >
                      <div className="absolute top-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ borderTop: `2px solid ${tier.color}`, borderRight: `2px solid ${tier.color}` }} />
                      <div className="absolute bottom-0 left-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ borderBottom: `2px solid ${tier.color}`, borderLeft: `2px solid ${tier.color}` }} />

                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className={`${tier.logoH} w-auto max-w-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}
                      />
                      <p className="text-[10px] font-heading uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                        {sponsor.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
              <div>
                {formState === "sent" ? (
                  <div
                    className="p-8 border border-primary/30"
                    style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
                  >
                    <div
                      className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center mb-5"
                      style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                    >
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold uppercase mb-2">Message Received</h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you for your interest. Our partnership team will be in touch within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                      { id: "company", label: "Company name", type: "text" },
                      { id: "name",    label: "Contact name",  type: "text" },
                      { id: "email",   label: "Email address", type: "email" },
                    ].map((field) => (
                      <div key={field.id} className="flex flex-col gap-1.5">
                        <label htmlFor={field.id} className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-heading">
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          required
                          value={form[field.id as keyof typeof form]}
                          onChange={(e) => setForm((p) => ({ ...p, [field.id]: e.target.value }))}
                          className="bg-secondary border border-border/40 text-foreground text-sm px-4 py-3 outline-none focus:border-primary/60 transition-colors duration-200"
                          style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                        />
                      </div>
                    ))}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="tier" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-heading">
                        Sponsorship tier
                      </label>
                      <select
                        id="tier"
                        className="bg-secondary border border-border/40 text-foreground text-sm px-4 py-3 outline-none focus:border-primary/60 transition-colors duration-200 appearance-none cursor-pointer"
                        style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                      >
                        <option value="">Select a tier</option>
                        <option value="platinum">Platinum</option>
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                        <option value="bronze">Bronze</option>
                        <option value="other">Other / In-kind</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-heading">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        placeholder="Tell us about your organisation and how you'd like to collaborate..."
                        className="bg-secondary border border-border/40 text-foreground text-sm px-4 py-3 outline-none focus:border-primary/60 transition-colors duration-200 resize-none placeholder:text-muted-foreground/40"
                        style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="mt-1 h-12 font-heading text-sm font-bold uppercase tracking-[0.2em] text-background bg-primary transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                      style={{ clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)" }}
                    >
                      {formState === "sending" ? "Sending..." : "Send Enquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
