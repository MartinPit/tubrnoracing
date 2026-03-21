import { VehicleCategory } from "@/types"
import { GarageDesktop } from "./desktop"
import { GarageMobile } from "./mobile"
import { getGaragePaths } from "@/lib/directus/garage"

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

  const category: VehicleCategory = ["cv", "ev", "sim"].includes(prs.category)
    ? prs.category
    : "ev";
  const short_name: string = prs.car ?? "e5"

  return (
    <main className="bg-background text-foreground overflow-hidden pt-20">
      <GarageDesktop
        category={category}
        short_name={short_name}
      />

      <GarageMobile
        category={category}
        short_name={short_name}
      />
    </main >
  )
}
