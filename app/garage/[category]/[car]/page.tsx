import { VehicleCategory } from "@/types"
import { GarageDesktop } from "./desktop"
import { GarageMobile } from "./mobile"
import { getCarsByCategory, getGaragePaths, getVehicle } from "@/lib/directus/garage"

interface Props {
  params: Promise<{
    category: VehicleCategory;
    car: string;
  }>
};

export async function generateStaticParams() {
  return await getGaragePaths();
}

export default async function GaragePage({ params }: Props) {
  const prs = await params;

  const category: VehicleCategory = ["cv", "ev", "simulator"].includes(prs.category)
    ? prs.category
    : "ev";
  const short_name: string = prs.car ?? "e5"

  const carList = await getCarsByCategory(category)
  const vehicle = await getVehicle(short_name);


  return (
    <main className="bg-background text-foreground overflow-hidden pt-20">
      <GarageDesktop
        category={category}
        shortName={short_name}
        list={carList}
        vehicle={vehicle}
      />

      <GarageMobile
        category={category}
        shortName={short_name}
        list={carList}
        vehicle={vehicle}
      />

    </main >
  )
}

