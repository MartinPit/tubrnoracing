import { MemberCard } from "./member-card"
import { TeamMemberDisplay } from "@/types"

interface Props {
  members: TeamMemberDisplay[]
}

export async function MemberGrid({ members }: Props) {
  const leader = members.find(member => member.is_leader);

  return (
    <section className="flex-1 px-5 py-8 md:px-12 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          leader!,
          ...members.filter(member => member.id !== leader?.id)
        ].map((member, i) => (
          <MemberCard
            key={member.id}
            member={member}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
