"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Mail, Phone, MapPin } from "lucide-react"

const facultyManager = {
  name: "Guy Guy",
  role: "Faculty Manager",
  department: "Faculty of Mechanical Engineering, BUT",
  email: "guy.guy@vutbr.cz",
  phone: "+420 000 000 000",
  office: "Building A1, Room 69",
}

interface Props {
  email: string
  advisor: {
    advisor_name: string
    advisor_email: string
    advisor_phone: string
  }
}

export function ContactInfo({ email, advisor }: Props) {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from(container.current, {
      y: 36,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
      delay: 0.18,
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    })
  }, { scope: container })

  return (
    <div ref={container} className="contact-info-col flex flex-col gap-8">
      <div className="flex items-center gap-4 mb-0">
        <div
          className="shrink-0 p-[1px] bg-primary/30"
          style={{
            clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)"
          }}
        >
          <div
            className="px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] text-primary bg-background"
            style={{
              clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)"
            }}
          >
            Faculty Manager
          </div>
        </div>
        <div className="flex-1 h-px bg-border/30" />
      </div>
      <div
        className="relative p-[1px] bg-primary/40"
        style={{
          clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"
        }}
      >
        <div
          className="bg-card p-6 h-full relative"
          style={{
            clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-heading mb-1">
            Faculty Advisor
          </p>
          <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-0.5">
            {advisor.advisor_name}
          </h3>
          <p className="text-xs text-muted-foreground mb-5">
            Faculty of Mechanical Engineering
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <a href={`mailto:${advisor.advisor_email}`} className="hover:text-primary transition-colors">
                {advisor.advisor_email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <a href={`tel:${advisor.advisor_phone}`} className="hover:text-primary transition-colors">
                {advisor.advisor_phone}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold uppercase tracking-wider mb-6">Contact</h3>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary" />
            <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
              {email}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5" />
            <span>
              Brno University of Technology
              <br />
              Faculty of Mechanical Engineering
              <br />
              Technická 2896/2
              <br />
              616 69 Brno, Czech Republic
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
