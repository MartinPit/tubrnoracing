import { PartnerTier } from "@/types";
import { ClassValue } from "clsx";
import { Facebook, Instagram, Linkedin, LucideIcon, Youtube } from "lucide-react"

export const SOCIALS: {
  icon: LucideIcon
  name: string
  link: string
}[] = [
    {
      icon: Instagram,
      name: "Instagram",
      link: "https://www.instagram.com/tubrnoracing",
    },
    {
      icon: Youtube,
      name: "YouTube",
      link: "https://www.youtube.com/user/TUBrnoracing",
    },
    {
      icon: Facebook,
      name: "Facebook",
      link: "https://www.facebook.com/tubrnoracing/",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/tubrnoracing/",
    }
  ];

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
