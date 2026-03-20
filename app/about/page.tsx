import { AboutFS } from "@/components/about/about-fs"
import { AboutTeam } from "@/components/about/about-team"
import { Hero } from "@/components/about/hero"
import { getAboutCompetition, getAboutHero, getAboutTeam } from "@/lib/directus/about"

export default async function AboutPage() {
  const title = await getAboutHero();
  const competitionData = await getAboutCompetition();
  const teamData = await getAboutTeam();

  return (
    <>
      <main
        className="bg-background text-foreground min-h-screen pb-32 pt-32"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          <Hero title={title} />
          <AboutFS data={competitionData} />
          <AboutTeam data={teamData}/>
        </div>
      </main>
    </>
  )
}
