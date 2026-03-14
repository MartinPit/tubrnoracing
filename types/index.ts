import { MEDIA_CATEGORIES } from "@/lib/data"
import { DirectusFile, Member as Mem } from "./directus-schema"

export type Member = {
  name: string
  subsection: Subsection
  imageUrl: string
}

export type Media = {
  type: "image" | "video"
  name: string
  src: string
  description?: string
  category: MediaCategory
  aspectRatio?: "tall" | "wide" | "square"
}

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number]
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

export type Subsection = {
  id: string
  label: string
  short: string
  description: string
  season: Season
}

export type Season = {
  id: string
  label: string
  year: number
}

export type Partner = {
  logoUrl: string
  website: string
  name: string
  tier: PartnerTier
}

export type PartnerTier = "platinum" | "gold" | "silver" | "bronze" | "university"

export interface TeamMemberDisplay {
  id: number;
  is_leader: boolean;
  image: string | DirectusFile | null;
  member: Mem,
  season_subsection: {
    subsection: {
      label: string
    }
  }
}
