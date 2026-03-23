import { TeamMemberDisplay } from "@/types";
import { directus } from "./index";
import { readItem, readItems } from "@directus/sdk";

export async function getAllTeamPaths() {
  return await directus.request(
    readItems("Season_Subsection", {
      fields: [
        { season: ["id"] },
        { subsection: ["id"] }
      ]
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
        "custom_title",
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

    directus.request(readItem("Subsection", subsection))
  ]);

  return {
    seasons,
    members,
    subsectionsInSeason,
    subsection: currentSub
  };
}

export async function getRandomFourMembers() {
  const allMembers = await directus.request(
    readItems("Team_Membership", {
      fields: ["id"],
      limit: -1,
    })
  );

  const shuffledIds = allMembers
    .map((m) => m.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return await directus.request<TeamMemberDisplay[]>(
    readItems("Team_Membership", {
      filter: {
        id: { _in: shuffledIds },
      },
      fields: [
        "id",
        "is_leader",
        "custom_title",
        { image: ["id", "title", "description", "width", "height"] },
        { member: ["*"] },
        { season_subsection: [{ subsection: ["label"] }] }
      ],
    })
  );
}
