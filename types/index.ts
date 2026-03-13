export type Member = {
  name: string
  role: Role
  imageUrl: string
}

export type Role = {
  name: string
  short: string
  description: string
}

export type Media = {
  type: "image" | "video"
  name: string
  src: string
  description?: string
  category: MediaCategory
  aspectRatio?: "tall" | "wide" | "square"
}

export type MediaCategory = "Car" | "Team" | "Competition" | "Workshop" | "All"
export type VehicleCategory = "cv" | "ev" | "simulator"

export type Vehicle = {
  id: string
  name: string
  category: VehicleCategory
  year: number
  image: string
  description: string
  stats: { label: string; value: string; unit?: string }[]
  highlights: string[]
}

export type Social = {
  platform: "instagram" | "youtube" | "facebook"
  name: string
  image: string
  link: string
}

export type Partner = {
  logoUrl: string
  website: string
  name: string
  tier: PartnerTier
}

export type PartnerTier = "platinum" | "gold" | "silver" | "bronze" | "university"
