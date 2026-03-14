"use client"
import { MemberCard } from "./member-card"
import { Member } from "@/types"

const getTeamMembers = (_year: string, section: string): Member[] => {
  return Array(12).fill(null).map((_, i) => ({
    name: ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez"][i % 4],
    role: { name: "Electric", short: "Elec", description: "Makes electrical systems" },
    imageUrl: "/placeholder.svg?height=400&width=300"
  }))
}

export function MemberGrid({ season, section }: { season: string, section: string }) {
  const members = getTeamMembers(season, section)


  return (
    <section className="flex-1 px-5 py-8 md:px-12 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {members.map((member, i) => (
          <MemberCard
            key={`${member.name}-${i}`}
            member={member}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
