import { readSingleton } from "@directus/sdk";
import { directus } from ".";
import { CompetitionInfo, DirectusImage, TeamInfo } from "@/types";

export async function getAboutHero() {
  const { title } = await directus.request(
    readSingleton("About_Page", {
      fields: ["title"],
      limit: 1,
    })
  )

  return title;
}

export async function getAboutCompetition(): Promise<CompetitionInfo> {
  return directus.request(
    readSingleton("About_Page", {
      fields: [
        "competition_info",
        "competition_stats",
        {
          competition_image: ["id", "title", "description", "width", "height"]
        }
      ],
      limit: 1,
    })
  )
};

export async function getAboutTeam(): Promise<TeamInfo> {
  const data = await directus.request(
    readSingleton("About_Page", {
      fields: ["team_info", "team_stats", { team_image: ["*"] }],
      limit: 1,
    })
  );

  return {
    team_info: data.team_info,
    team_stats: data.team_stats,
    team_image: data.team_image as DirectusImage
  }
};
