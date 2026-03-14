import { MemberGrid } from "@/components/team/member-grid"
import { Sidebar } from "@/components/team/sidebar"
import { getAllTeamPaths, getTeamPageData } from "@/lib/directus/team"

interface Props {
  params: Promise<{
    season: string
    section: string
  }>
}

export async function generateStaticParams() {
  const combos = await getAllTeamPaths();

  return combos.map(({ season, subsection }) => ({
    season: season.id,
    section: subsection.id
  }));
}

export default async function TeamPage({
  params
}: Props) {
  const prs = await params
  const season = decodeURIComponent(prs.season)
  const section = decodeURIComponent(prs.section)

  const {
    seasons,
    members,
    subsectionsInSeason,
    subsection
  } = await getTeamPageData(season, section)

  return (
    <main className="min-h-screen pt-16 flex flex-col md:flex-row">
      <Sidebar
        currentSeason={season}
        currentSubsection={subsection}
        seasons={seasons}
        subsections={subsectionsInSeason.map(s => s.subsection)}
      />

      <MemberGrid
        members={members}
      />
    </main>
  )
}
