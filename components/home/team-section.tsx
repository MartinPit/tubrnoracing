import { getRandomFourMembers } from "@/lib/directus/team";
import { NavigationButton } from "../navigation-button"
import { MemberCard } from "../team/member-card"
import { directus } from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { connection } from "next/server";

export async function TeamSection() {
  connection()
  const members = await getRandomFourMembers();
  const { team_title, team_subtitle } = await directus.request(
    readSingleton("Home_Page", {
      fields: ["team_title", "team_subtitle"],
      limit: 1,
    })
  );

  const parts = team_title.split(" ")
  const lastPart = parts.pop()

  return (
    <section id="team" className="min-h-screen py-24 px-6 bg-muted">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl font-bold uppercase tracking-tight">
            {parts.join(" ") + " "}<span className="text-primary">{lastPart}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
              index={index}
              imageLoading="lazy"
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-muted-foreground">{team_subtitle}</p>
          <NavigationButton href="/team">Meet The Full Team</NavigationButton>
        </div>
      </div>
    </section>
  )
}
