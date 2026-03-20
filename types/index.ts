import { MEDIA_CATEGORIES } from "@/lib/data"
import { DirectusFile, Member } from "./directus-schema"

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
  member: Member,
  season_subsection: {
    subsection: {
      label: string
    }
  }
}

export interface LeaderContactDisplay {
  id: number;
  member: Member
  season_subsection: {
    subsection: {
      label: string
      short: string
    }
  }
};

export type CompetitionInfo = {
  competition_info: string
  competition_stats: {
    value: string
    statistic: string
  }[]
  competition_image: DirectusImage
};

export type TeamInfo = {
  team_info: string
  team_stats: {
    value: string
    statistic: string
  }[]
  team_image: DirectusImage
};

export type DirectusImage = {
  id: string
  title: string | null | undefined
  description: string | null | undefined
  width: number | null | undefined
  height: number | null | undefined
};
