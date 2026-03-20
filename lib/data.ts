import { PartnerTier, Vehicle, VehicleCategory } from "@/types";
import { ClassValue } from "clsx";
import { Facebook, Flame, Instagram, Linkedin, LucideIcon, Monitor, Youtube, Zap } from "lucide-react"
import { directus } from "./directus";
import { readSingleton } from "@directus/sdk";
import { Car } from "@/types/directus-schema";

export async function getSocials(): Promise<{
  name: string
  link: string
}[]> {
  const urls = await directus.request(
    readSingleton("General_Info", {
      fields: ["youtube", "instagram", "facebook", "linkedin"],
    })
  );

  return [
    { name: "Instagram", link: urls.instagram },
    { name: "YouTube", link: urls.youtube },
    { name: "Facebook", link: urls.facebook },
    { name: "LinkedIn", link: urls.linkedin }
  ];
}

export const IconMap: Record<string, LucideIcon> = {
  Instagram: Instagram,
  YouTube: Youtube,
  Facebook: Facebook,
  LinkedIn: Linkedin,
}

interface TierConfig {
  color: string
  accent: string
  border: string
  height: ClassValue
  columns: ClassValue
  description: string
}

export const PARTNER_TIERS: Record<PartnerTier, TierConfig> = {
  university: {
    color: "#d40924",
    accent: "oklch(0.55 0.22 25 / 0.1)",
    border: "oklch(0.55 0.22 25 / 0.3)",
    height: "h-20",
    columns: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    description: "Academic institutions fostering innovation and education in motorsports."
  },
  platinum: {
    color: "#e8e6e3",
    accent: "rgba(232,230,227,0.07)",
    border: "rgba(232,230,227,0.25)",
    height: "h-20",
    columns: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    description: "Our most prestigious tier, offering unparalleled visibility and exclusive benefits."
  },
  gold: {
    color: "#f5c842",
    accent: "rgba(245,200,66,0.06)",
    border: "rgba(245,200,66,0.25)",
    height: "h-16",
    columns: "grid-cols-2 md:grid-cols-4",
    description: "Strategic partners who help us push performance boundaries."
  },
  silver: {
    color: "#b0b0b0",
    accent: "rgba(176,176,176,0.05)",
    border: "rgba(176,176,176,0.2)",
    height: "h-12",
    columns: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    description: "Valued partners contributing expertise and materials."
  },
  bronze: {
    color: "#c97c4a",
    accent: "rgba(201,124,74,0.05)",
    border: "rgba(201,124,74,0.2)",
    height: "h-10",
    columns: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
    description: "Community supporters who believe in the next generation of engineers."
  }
}

export const VEHICLE_CATS = ['cv', 'ev', 'sim'] as const;
type _ = (typeof VEHICLE_CATEGORIES[number]) extends Car['category'] ? true : never;

export const VEHICLE_CATEGORIES: { id: VehicleCategory; label: string; Icon: LucideIcon }[] = [
  { id: "cv", label: "Combustion", Icon: Flame },
  { id: "ev", label: "Electric", Icon: Zap },
  { id: "sim", label: "Simulator", Icon: Monitor },
]

export const MEDIA_CATEGORIES = ["All", "Car", "Team", "Competition", "Workshop"] as const
