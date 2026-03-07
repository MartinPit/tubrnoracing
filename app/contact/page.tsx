"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Mail, Phone, MapPin } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const facultyManager = {
  name: "Guy Guy",
  role: "Faculty Manager",
  department: "Faculty of Mechanical Engineering, BUT",
  email: "guy.guy@vutbr.cz",
  phone: "+420 000 000 000",
  office: "Building A1, Room 69",
}

const sectionLeaders = [
  { section: "Leadership", short: "LEAD", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 731 xxx xxx" },
  { section: "Aerodynamics", short: "AERO", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 732 xxx xxx" },
  { section: "Chassis", short: "CHAS", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 733 xxx xxx" },
  { section: "Suspension", short: "SUSP", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 734 xxx xxx" },
  { section: "Software", short: "SOFT", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 735 xxx xxx" },
  { section: "Vehicle Performance", short: "PERF", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 736 xxx xxx" },
  { section: "Electric Powertrain", short: "ELEC", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 737 xxx xxx" },
  { section: "Drivetrain & Cooling", short: "DRIV", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 738 xxx xxx" },
  { section: "Marketing", short: "MRKT", name: "John Doe", email: "john.doe@student.vutbr.cz", phone: "+420 739 xxx xxx" },
]

type FormState = "idle" | "sending" | "sent"

function Field({
  id, label, type = "text", required = true, value, onChange, children,
}: {
  id: string; label: string; type?: string; required?: boolean
  value: string; onChange: (v: string) => void; children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-heading">
        {label}
      </label>
      {children ?? (
        <input
          id={id} type={type} required={required} value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-secondary border border-border/40 text-foreground text-sm px-4 py-3 outline-none focus:border-primary/60 transition-colors duration-200"
          style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
        />
      )}
    </div>
  )
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [formState, setFormState] = useState<FormState>("idle")

  useGSAP(() => {
    gsap.from(".contact-hero", { y: 48, opacity: 0, duration: 0.75, ease: "power3.out" })
    gsap.from(".contact-form-col", {
      y: 36, opacity: 0, duration: 0.65, ease: "power2.out", delay: 0.1,
      scrollTrigger: { trigger: ".contact-form-col", start: "top 85%" },
    })
    gsap.from(".contact-info-col", {
      y: 36, opacity: 0, duration: 0.65, ease: "power2.out", delay: 0.18,
      scrollTrigger: { trigger: ".contact-info-col", start: "top 85%" },
    })
    gsap.from(".leader-card", {
      y: 24, opacity: 0, duration: 0.4, ease: "power2.out", stagger: 0.05,
      scrollTrigger: { trigger: ".leaders-grid", start: "top 82%" },
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
      <main
        ref={containerRef}
        className="bg-background text-foreground min-h-screen pb-32"
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="contact-hero mb-20">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Get In Touch</p>
            <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase leading-none tracking-tight">
              Contact<br />
              <span className="text-primary">Us.</span>
            </h1>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-lg">
              Whether you have a question, want to join the team, or are interested in a partnership — we are always happy to hear from you.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div className="contact-form-col">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] bg-primary text-background"
                  style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
                >
                  Send a Message
                </div>
                <div className="flex-1 h-px bg-border/30" />
              </div>

              {formState === "sent" ? (
                <div
                  className="p-10 border border-primary/30 flex flex-col gap-4"
                  style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
                >
                  <div
                    className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl font-bold uppercase">Message Sent</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="name" label="Your name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} />
                    <Field id="email" label="Email address" type="email" value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} />
                  </div>
                  <Field id="subject" label="Subject" value={form.subject} onChange={(v) => setForm((p) => ({ ...p, subject: v }))} />
                  <Field id="message" label="Message" value={form.message} onChange={(v) => setForm((p) => ({ ...p, message: v }))}>
                    <textarea
                      id="message" rows={6} required value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Your message..."
                      className="bg-secondary border border-border/40 text-foreground text-sm px-4 py-3 outline-none focus:border-primary/60 transition-colors duration-200 resize-none placeholder:text-muted-foreground/40"
                      style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                    />
                  </Field>
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="mt-1 h-12 font-heading text-sm font-bold uppercase tracking-[0.2em] text-background bg-primary transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                    style={{ clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)" }}
                  >
                    {formState === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
            <div className="contact-info-col flex flex-col gap-8">
              <div className="flex items-center gap-4 mb-0">
                <div
                  className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] text-primary border border-primary/30"
                  style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
                >
                  Faculty Manager
                </div>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div
                className="relative bg-card border border-border/30 p-6 group"
                style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
              >
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary/40" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary/40" />

                <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-heading mb-1">{facultyManager.role}</p>
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-0.5">{facultyManager.name}</h3>
                <p className="text-xs text-muted-foreground mb-5">{facultyManager.department}</p>

                <div className="flex flex-col gap-3">
                  {[
                    { Icon: Mail, value: facultyManager.email },
                    { Icon: Phone, value: facultyManager.phone },
                    { Icon: MapPin, value: facultyManager.office },
                  ].map(({ Icon, value }) => (
                    <div key={value} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-heading">General</p>
                {[
                  { Icon: Mail, value: "info@tubrno.racing", label: "General enquiries" },
                  { Icon: Mail, value: "sponsors@tubrno.racing", label: "Sponsorship" },
                  { Icon: MapPin, value: "Technická 2896/2, 616 69 Brno, Czech Republic", label: "Address" },
                ].map(({ Icon, value, label }) => (
                  <div key={label} className="flex items-start gap-3 text-sm">
                    <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60 mb-0.5">{label}</p>
                      <p className="text-muted-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-border/20">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] bg-primary text-background"
                style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
              >
                Section Leaders
              </div>
              <div className="flex-1 h-px bg-border/30" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-heading shrink-0">
                {sectionLeaders.length} contacts
              </span>
            </div>

            <div className="leaders-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sectionLeaders.map((leader) => (
                <div
                  key={leader.section}
                  className="leader-card group relative bg-card border border-border/30 hover:border-primary/40 p-5 transition-colors duration-200"
                  style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                >
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-200" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-200" />

                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.22em] text-primary font-heading mb-0.5">{leader.short}</p>
                      <p className="text-xs font-heading font-bold uppercase tracking-wide text-muted-foreground">{leader.section}</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-base font-bold uppercase tracking-wide mb-3 text-foreground">{leader.name}</h3>

                  <div className="flex flex-col gap-1.5">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-150 group/link"
                    >
                      <Mail className="w-3 h-3 shrink-0 text-primary/60" />
                      <span className="truncate">{leader.email}</span>
                    </a>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3 shrink-0 text-primary/60" />
                      <span>{leader.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
