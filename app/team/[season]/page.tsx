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
  const seasons = await getAllTeamPaths();
  return seasons.map(s => ({
    season: s.season.id
  }));
}

export default async function TeamPage({
  params
}: Props) {
  const prs = await params
  const season = decodeURIComponent(prs.season)

  const {
    seasons,
    sections
  } = await getTeamPageData(season)

  const leadership = sections.find(s => s.subsection.id === "LDSHP");
  const otherSections = sections.filter(s => s.subsection.id !== "LDSHP");

  return (
    <main className="min-h-screen pt-16 flex flex-col md:flex-row">
      <Sidebar
        currentSeason={season}
        seasons={seasons}
        subsections={[leadership!, ...otherSections].map(s => s.subsection)}
      />

      <div className="flex-1">
        {[leadership!, ...otherSections].map(({ subsection, members }) => (
          <section
            key={subsection.id}
            id={subsection.id}
            className="scroll-mt-32 border-b border-border/5"
          >
            <div className="px-5 py-8 md:px-12">
              <h2 className="md:hidden text-2xl text-center font-bold uppercase mb-4">{subsection.label}</h2>
              <MemberGrid members={members} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
