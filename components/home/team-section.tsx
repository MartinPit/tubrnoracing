"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { NavigationButton } from "../navigation-button"
import { MemberCard } from "../team/member-card"
import { Member, Role } from "@/types"

gsap.registerPlugin(ScrollTrigger)

const role: Role = {
  name: "Team Principal",
  short: "PRINCE",
  description: "Oversees the entire team, ensuring all departments work together seamlessly to achieve our goals.",
}

const teamPreview: Member[] = [
  { role: role, name: "Team Leadership", imageUrl: "/placeholder.svg?height=400&width=300" },
  { role: role, name: "Engineering Lead", imageUrl: "/placeholder.svg?height=400&width=300" },
  { role: role, name: "Aero Team", imageUrl: "/placeholder.svg?height=400&width=300" },
  { role: role, name: "Engine Team", imageUrl: "/placeholder.svg?height=400&width=300" },
]

export function TeamSection() {
  return (
    <section id="team" className="min-h-screen py-24 px-6 bg-muted">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl font-bold uppercase tracking-tight">
            Our <span className="text-primary">Team</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamPreview.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-muted-foreground">200+ passionate students working together to push the limits</p>
          <NavigationButton href="/team">Meet The Full Team</NavigationButton>
        </div>
      </div>
    </section>
  )
}
