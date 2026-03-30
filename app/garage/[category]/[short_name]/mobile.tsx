import { VehicleCategory } from "@/types"
import { Stage } from "@/components/garage/stage"
import { Info } from "@/components/garage/info"
import { CategorySelect } from "@/components/garage/category-select"
import { VehicleSelect } from "@/components/garage/vehicle-select"
import { getCarsByCategory, getVehicle } from "@/lib/directus/garage"

interface Props {
  category: VehicleCategory
  short_name: string
};

export async function GarageMobile({
  category,
  short_name
}: Props) {
  const carList = await getCarsByCategory(category)
  const vehicle = await getVehicle(short_name);

  return (
    <div className="lg:hidden flex flex-col pt-8">
      <CategorySelect
        category={category}
        isMobile
      />

      <Stage
        vehicle={vehicle}
        isMobile
      />

      <VehicleSelect
        list={carList}
        vehicle={vehicle}
        isMobile
      />

      <Info
        specifications={vehicle.specifications}
        highlights={vehicle.highlights}
        description={vehicle.description}
        isMobile
      />
    </div>
  )
}
