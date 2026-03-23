import { readItems, readSingleton } from "@directus/sdk";
import { directus } from ".";
import { LeaderContactDisplay } from "@/types";

export async function getContactInfo() {
  const { email } = await directus.request(
    readSingleton("General_Info", {
      fields: ["email"],
      limit: 1,
    })
  );
  const contact = await directus.request(
    readSingleton("Contact_Page", {
      fields: ["title", "subtitle", "advisor_name", "advisor_email", "advisor_phone"],
      limit: 1,
    })
  );

  return {
    email: email,
    contact: contact
  }
}

export async function getLeaders(): Promise<LeaderContactDisplay[]> {
  return directus.request<LeaderContactDisplay[]>(
    readItems("Team_Membership", {
      fields: [
        "id",
        "custom_title",
        { member: ["*"] },
        {
          season_subsection: [
            { subsection: ["label", "short"] }
          ]
        }
      ],
      filter: {
        is_leader: {
          _eq: true
        }
      }
    })
  );
};
