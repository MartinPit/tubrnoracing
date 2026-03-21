import { readSingleton } from "@directus/sdk";
import { directus } from ".";

export async function getPartnersInfo() {
  return await directus.request(
    readSingleton("Partners_Page", {
      fields: ["title", "subtitle", "benefits", "call_to_action", "call_to_action_description"]
    })
  );
}
