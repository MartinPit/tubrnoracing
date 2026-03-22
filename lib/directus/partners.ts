import { readItems, readSingleton } from "@directus/sdk";
import { directus } from ".";
import { TIERS } from "@/lib/data";

export async function getPartnersInfo() {
  return await directus.request(
    readSingleton("Partners_Page", {
      fields: ["title", "subtitle", "benefits", "call_to_action", "call_to_action_description"]
    })
  );
}

export async function getPartners() {

  const fetchPromises = TIERS.map((tier) =>
    directus.request(
      readItems("Partners", {
        fields: ["*", { logo: ["id", "title", "description", "width", "height"] }],
        filter: {
          tier: { _eq: tier },
        }
      })
    )
  );

  const [uni, plat, gold, silver, bronze] = await Promise.all(fetchPromises);

  return {
    plat,
    uni,
    gold,
    silver,
    bronze,
  };
}

export async function getRandomPartners() {
  return await directus.request(
    readItems("Partners", {
      fields: ["*", { logo: ["id", "title", "description", "width", "height"] }],
      limit: 8,
    })
  );
}
