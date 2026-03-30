import { readFiles, readItems } from "@directus/sdk";
import { directus } from ".";
import { DirectusImage, Vehicle, VehicleCategory } from "@/types";

export async function getGaragePaths() {
  return await directus.request(
    readItems("Car", {
      fields: ["category", "short_name"],
    })
  );
}

export async function getCarsByCategory(category: VehicleCategory) {
  return await directus.request(
    readItems("Car", {
      filter: { category: { _eq: category } },
      fields: ["short_name", "long_name", "year"],
    })
  );
}

export async function getVehicle(short_name: string): Promise<Vehicle> {
  const data = await directus.request(
    readItems("Car", {
      fields: [
        "*",
        {
          images: ["directus_files_id"]
        }],
      filter: { short_name: { _eq: short_name } },
      limit: 1,
    })
  );

  const ids = (data[0].images as { directus_files_id: string }[]).map(i => i.directus_files_id)

  const images = await directus.request<DirectusImage[]>(
    readFiles({
      fields: ["id", "title", "description", "width", "height"],
      filter: { id: { _in: ids } }
    })
  )

  return {
    ...data[0],
    images: images
  }
}
