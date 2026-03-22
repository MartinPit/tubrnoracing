import { readItem, readItems } from "@directus/sdk";
import { directus } from ".";
import { Vehicle, VehicleCategory } from "@/types";

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
  const data = await directus.request<Vehicle[]>(
    readItems("Car", {
      fields: ["*", { image: ["title", "description", "id", "width", "height"] }],
      filter: { short_name: { _eq: short_name } },
      limit: 1,
    })
  );

  return data[0];
}
