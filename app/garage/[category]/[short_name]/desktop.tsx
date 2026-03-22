import { VehicleCategory } from "@/types";
import { Stage } from "@/components/garage/stage";
import { Info } from "@/components/garage/info";
import { CategorySelect } from "@/components/garage/category-select";
import { VehicleSelect } from "@/components/garage/vehicle-select";
import { getCarsByCategory, getVehicle } from "@/lib/directus/garage";

interface Props {
  category: VehicleCategory
  short_name: string
};

export async function GarageDesktop({
  category,
  short_name,
}: Props) {
  const carList = await getCarsByCategory(category)
  const vehicle = await getVehicle(short_name);

  return (
    <div className="hidden lg:flex flex-col pt-4" style={{ height: "calc(100vh - 5rem)" }}>
      <CategorySelect
        category={category}
      />

      <div className="flex-1 flex overflow-hidden min-h-0 px-6 md:px-10 gap-5 py-4">
        <VehicleSelect
          list={carList}
          vehicle={vehicle}
        />

        <Stage
          list={carList}
          vehicle={vehicle}
        />

        <Info
          specifications={vehicle.specifications}
          highlights={vehicle.highlights}
          description={vehicle.description}
        />
      </div>
    </div>
  )
}
