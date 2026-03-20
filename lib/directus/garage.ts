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
  return directus.request<Vehicle>(
    readItem("Car", short_name, {
      fields: ["*", { image: ["id", "title", "description", "width", "height"] }],
    })
  );
}
