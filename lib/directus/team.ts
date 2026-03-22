import { TeamMemberDisplay } from "@/types";
import { directus } from "./index";
import { readItems } from "@directus/sdk";

export async function getAllTeamPaths() {
  return await directus.request(
    readItems("Season_Subsection", {
      fields: [
        { season: ["id"] },
        { subsection: ["id"] }
      ],
      limit: -1
    })
  );
}

export async function getTeamPageData(season: string, subsection: string) {
  const [seasons, members, subsectionsInSeason, currentSub] = await Promise.all([
    directus.request(readItems("Season", {
      sort: ["-label"],
      fields: ["id", "label"]
    })),

    directus.request<TeamMemberDisplay[]>(readItems("Team_Membership", {
      filter: {
        season_subsection: {
          subsection: { id: { _eq: subsection } },
          season: { id: { _eq: season } },
        }
      },
      fields: [
        "id",
        "is_leader",
        { image: ["id", "title", "description", "width", "height"] },
        {
          member: ["*"]
        },
        {
          season_subsection: [
            {
              subsection: ["label"]
            }
          ]
        }
      ]
    })),

    directus.request(readItems("Season_Subsection", {
      filter: { season: { id: { _eq: season } } },
      fields: [{ subsection: ["id", "label", "short"] }]
    })),

    directus.request(readItems("Subsection", {
      filter: { id: { _eq: subsection } },
      limit: 1
    }))
  ]);

  return {
    seasons,
    members,
    subsectionsInSeason,
    subsection: currentSub[0]
  };
}

export async function getRandomFourMembers() {
  const pool = await directus.request<TeamMemberDisplay[]>(
    readItems("Team_Membership", {
      fields: [
        "id",
        "is_leader",
        {
          image: ["id", "title", "description", "width", "height"]
        },
        {
          member: ["*"]
        },
        {
          season_subsection: [
            {
              subsection: ["label"]
            }
          ]
        }
      ],
      limit: 20,
    })
  );

  return pool
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}
