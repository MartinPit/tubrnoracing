import { connection } from "next/server";
import { MemberCard } from "../team/member-card";
import { getRandomFourMembers } from "@/lib/directus/team";

export async function MemberList() {
  connection()
  const members = await getRandomFourMembers();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {members.map((member, index) => (
        <MemberCard
          key={member.id}
          member={member}
          index={index}
          imageLoading="lazy"
        />
      ))}
    </div>
  )
}
