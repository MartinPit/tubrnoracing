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
