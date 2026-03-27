"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Mail, Phone, MapPin } from "lucide-react"
import { LargeContactCard } from "./large-contact-card"
import { LeaderContactDisplay } from "@/types"

interface Props {
  email: string
  advisor: {
    advisor_name: string
    advisor_email: string
    advisor_phone: string
  },
  members: LeaderContactDisplay[]
}

export function ContactInfo({ email, advisor, members }: Props) {
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
            Main Contacts
          </div>
        </div>
        <div className="flex-1 h-px bg-border/30" />
      </div>
      {members.length > 0 && (
        members.map((member, i) => (
          <LargeContactCard key={i} member={member} />
        ))
      )}
      <LargeContactCard
        member={{
          id: -1,
          member: {
            id: -1,
            name: advisor.advisor_name,
            email: advisor.advisor_email,
            phone: advisor.advisor_phone
          },
          custom_title: "Faculty Advisor",
          season_subsection: {
            subsection: {
              label: "Faculty of Mechanical Engineering",
              short: "FME"
            }
          }
        }} />
      <div>
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
