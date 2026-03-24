import { NavigationButton } from "../navigation-button"
import { directus } from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { Suspense } from "react";
import { MemberList } from "./member-list";
import { TeamSkeleton } from "./team-skeleton";
import { WidthContainer } from "../width-container";

export async function TeamSection() {
  const { team_title, team_subtitle } = await directus.request(
    readSingleton("Home_Page", {
      fields: ["team_title", "team_subtitle"],
      limit: 1,
    })
  );

  const parts = team_title.split(" ")
  const lastPart = parts.pop()

  return (
    <section id="team" className="py-24 px-6 bg-muted">
      <WidthContainer>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl font-bold uppercase tracking-tight">
            {parts.join(" ") + " "}<span className="text-primary">{lastPart}</span>
          </h2>
        </div>

        <Suspense fallback={<TeamSkeleton />}>
          <MemberList />
        </Suspense>

        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-muted-foreground">{team_subtitle}</p>
          <NavigationButton href="/team">Meet The Full Team</NavigationButton>
        </div>
      </WidthContainer>
    </section>
  )
}
