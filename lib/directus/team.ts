import { DirectusImage, Subsection, TeamMemberDisplay } from "@/types";
import { directus } from "./index";
import { readItem, readItems, readSingleton } from "@directus/sdk";

export async function getAllTeamPaths() {
  return await directus.request(
    readItems("Season_Subsection", {
      fields: [
        { season: ["id"] },
      ]
    })
  );
}

export async function getTeamPageData(season: string) {
  const [seasons, allMembers, subsectionsInSeason] = await Promise.all([
    // 1. Fetch all seasons for the switcher
    directus.request(readItems("Season", {
      sort: ["-label"],
      fields: ["id", "label"]
    })),

    // 2. Fetch ALL members for the entire season in one go
    directus.request<TeamMemberDisplay[]>(readItems("Team_Membership", {
      filter: {
        season_subsection: {
          season: { id: { _eq: season } },
        }
      },
      fields: [
        "id",
        "is_leader",
        "custom_title",
        { image: ["id", "title", "description", "width", "height"] },
        { member: ["*"] },
        {
          season_subsection: [
            { subsection: ["id", "label", "short", "description"] }
          ]
        }
      ]
    })),

    directus.request(readItems("Season_Subsection", {
      filter: { season: { id: { _eq: season } } },
      fields: [{ subsection: ["id", "label", "short", "description"] }]
    })),
  ]);

  const subsections = subsectionsInSeason.map(ss => ss.subsection as Subsection);

  const sections = subsections.map(sub => ({
    subsection: sub,
    members: allMembers.filter(m =>
      (m.season_subsection as any).subsection.id === sub.id
    ).sort((a, b) => (b.is_leader ? 1 : 0) - (a.is_leader ? 1 : 0))
  }));

  return {
    seasons,
    sections,
  };
}

export async function getTeamImage(): Promise<DirectusImage> {
  const data = await directus.request(
    readSingleton("About_Page", {
      fields: [{ team_image: ["id", "title", "description", "width", "height"] }],
      limit: 1,
    })
  );

  return data.team_image;
};
