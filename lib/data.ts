import { PartnerTier, Vehicle, VehicleCategory } from "@/types";
import { ClassValue } from "clsx";
import { Facebook, Flame, Instagram, Linkedin, LucideIcon, Monitor, Youtube, Zap } from "lucide-react"

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

export const VEHICLES: Vehicle[] = [
  {
    id: "d1", name: "Dragon 1", category: "cv", year: 2004, image: "/placeholder.svg?height=600&width=900",
    description: "The original Dragon — the car that started it all, built with ambition and the drive to compete internationally for the first time.",
    stats: [{ label: "Engine", value: "600cc", unit: "single" }, { label: "Power", value: "65", unit: "hp" }, { label: "Weight", value: "230", unit: "kg" }, { label: "0–100", value: "4.8", unit: "s" }],
    highlights: ["First Formula Student entry", "Steel spaceframe chassis", "Naturally aspirated"]
  },
  {
    id: "d2", name: "Dragon 2", category: "cv", year: 2006, image: "/placeholder.svg?height=600&width=900",
    description: "Refined aerodynamics and improved suspension geometry marked Dragon 2's competitive debut on the international stage.",
    stats: [{ label: "Engine", value: "600cc", unit: "inline-4" }, { label: "Power", value: "75", unit: "hp" }, { label: "Weight", value: "215", unit: "kg" }, { label: "0–100", value: "4.4", unit: "s" }],
    highlights: ["First front wing package", "Improved weight distribution", "New suspension geometry"]
  },
  {
    id: "d3", name: "Dragon 3", category: "cv", year: 2008, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 3 introduced a full aero package and the team's first composite bodywork, marking a step change in performance.",
    stats: [{ label: "Engine", value: "600cc", unit: "inline-4" }, { label: "Power", value: "82", unit: "hp" }, { label: "Weight", value: "198", unit: "kg" }, { label: "0–100", value: "4.0", unit: "s" }],
    highlights: ["Full aero package debut", "Carbon fibre bodywork", "Custom exhaust system"]
  },
  {
    id: "d4", name: "Dragon 4", category: "cv", year: 2010, image: "/placeholder.svg?height=600&width=900",
    description: "A turbocharged leap — Dragon 4 brought forced induction to the powertrain for the first time, unlocking a new performance ceiling.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "100", unit: "hp" }, { label: "Weight", value: "185", unit: "kg" }, { label: "0–100", value: "3.6", unit: "s" }],
    highlights: ["First turbocharged engine", "Custom intake manifold", "Revised aero for downforce"]
  },
  {
    id: "d5", name: "Dragon 5", category: "cv", year: 2012, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 5 featured an in-house designed gearbox and significantly refined chassis dynamics.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "108", unit: "hp" }, { label: "Weight", value: "178", unit: "kg" }, { label: "0–100", value: "3.3", unit: "s" }],
    highlights: ["Custom sequential gearbox", "Carbon fibre monocoque", "Data acquisition upgrade"]
  },
  {
    id: "d6", name: "Dragon 6", category: "cv", year: 2014, image: "/placeholder.svg?height=600&width=900",
    description: "The most competitive CV to date at its time, Dragon 6 placed in the top 10 at Formula Student Germany.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "115", unit: "hp" }, { label: "Weight", value: "170", unit: "kg" }, { label: "0–100", value: "3.1", unit: "s" }],
    highlights: ["Top 10 FSG finish", "First DRS system", "Titanium fasteners throughout"]
  },
  {
    id: "d7", name: "Dragon 7", category: "cv", year: 2016, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 7 introduced active suspension research and advanced traction control software developed entirely in-house.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "120", unit: "hp" }, { label: "Weight", value: "165", unit: "kg" }, { label: "0–100", value: "2.9", unit: "s" }],
    highlights: ["Active suspension concept", "In-house traction control", "Revised diffuser package"]
  },
  {
    id: "d8", name: "Dragon 8", category: "cv", year: 2018, image: "/placeholder.svg?height=600&width=900",
    description: "The final iteration before the team shifted focus to electric propulsion — Dragon 8 is the pinnacle of the early combustion era.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "125", unit: "hp" }, { label: "Weight", value: "160", unit: "kg" }, { label: "0–100", value: "2.8", unit: "s" }],
    highlights: ["Best-ever CV aero package", "In-house ECU firmware", "Lightweight wheel uprights"]
  },
  {
    id: "d9", name: "Dragon 9", category: "cv", year: 2020, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon 9 bridged the gap between combustion and electric eras with hybrid sensor integration and advanced telemetry.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "128", unit: "hp" }, { label: "Weight", value: "158", unit: "kg" }, { label: "0–100", value: "2.7", unit: "s" }],
    highlights: ["Hybrid sensor array", "Aluminium honeycomb floor", "Revised aerodynamic balance"]
  },
  {
    id: "dx", name: "Dragon X", category: "cv", year: 2022, image: "/placeholder.svg?height=600&width=900",
    description: "The pinnacle of the combustion programme — Dragon X is the fastest and lightest CV ever built by TUBrnoRacing.",
    stats: [{ label: "Engine", value: "600cc", unit: "turbo" }, { label: "Power", value: "132", unit: "hp" }, { label: "Weight", value: "152", unit: "kg" }, { label: "0–100", value: "2.6", unit: "s" }],
    highlights: ["Lowest CV drag coefficient", "Full carbon monocoque", "CNC-machined uprights"]
  },
  {
    id: "e1", name: "Dragon e1", category: "ev", year: 2019, image: "/placeholder.svg?height=600&width=900",
    description: "The team's first electric vehicle — a proof-of-concept that launched a new era of high-voltage engineering at TUBrnoRacing.",
    stats: [{ label: "Power", value: "60", unit: "kW" }, { label: "Battery", value: "6.5", unit: "kWh" }, { label: "Weight", value: "225", unit: "kg" }, { label: "0–100", value: "3.8", unit: "s" }],
    highlights: ["First EV from TUBrnoRacing", "400V accumulator system", "Dual motor configuration"]
  },
  {
    id: "e2", name: "Dragon e2", category: "ev", year: 2020, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon e2 brought dramatically improved energy density and custom BMS development fully in-house.",
    stats: [{ label: "Power", value: "80", unit: "kW" }, { label: "Battery", value: "7.2", unit: "kWh" }, { label: "Weight", value: "208", unit: "kg" }, { label: "0–100", value: "3.2", unit: "s" }],
    highlights: ["In-house BMS software", "Improved regenerative braking", "New cooling circuit design"]
  },
  {
    id: "e3", name: "Dragon e3", category: "ev", year: 2021, image: "/placeholder.svg?height=600&width=900",
    description: "A lightweight accumulator and torque vectoring made Dragon e3 the most dynamically capable EV yet produced.",
    stats: [{ label: "Power", value: "100", unit: "kW" }, { label: "Battery", value: "7.8", unit: "kWh" }, { label: "Weight", value: "192", unit: "kg" }, { label: "0–100", value: "2.9", unit: "s" }],
    highlights: ["Torque vectoring", "Lightweight accumulator enclosure", "Formula-grade inverters"]
  },
  {
    id: "e4", name: "Dragon e4", category: "ev", year: 2023, image: "/placeholder.svg?height=600&width=900",
    description: "Dragon e4 achieved the team's best EV result at Formula Student Germany, finishing in the top 5 overall.",
    stats: [{ label: "Power", value: "120", unit: "kW" }, { label: "Battery", value: "8.5", unit: "kWh" }, { label: "Weight", value: "180", unit: "kg" }, { label: "0–100", value: "2.5", unit: "s" }],
    highlights: ["Top 5 EV at FSG", "Custom motor controllers", "Full carbon accumulator housing"]
  },
  {
    id: "e5", name: "Dragon e5", category: "ev", year: 2025, image: "/placeholder.svg?height=600&width=900",
    description: "The current competition car — Dragon e5 represents the cutting edge of student electric motorsport engineering.",
    stats: [{ label: "Power", value: "140", unit: "kW" }, { label: "Battery", value: "9.0", unit: "kWh" }, { label: "Weight", value: "172", unit: "kg" }, { label: "0–100", value: "2.2", unit: "s" }],
    highlights: ["Full torque vectoring + DRS", "Silicon Carbide inverters", "AI-assisted setup tool"]
  },
  {
    id: "sim", name: "Simulator", category: "simulator", year: 2021, image: "/placeholder.svg?height=600&width=900",
    description: "A full-motion simulator built to develop driver skill and setup proficiency year-round, independent of track time.",
    stats: [{ label: "DOF", value: "6", unit: "degrees" }, { label: "Screen", value: "240°", unit: "FOV" }, { label: "Latency", value: "<8", unit: "ms" }, { label: "Refresh", value: "120", unit: "Hz" }],
    highlights: ["6-DOF motion platform", "Force-feedback steering", "Real-time telemetry integration"]
  },
]


export const VEHICLE_CATEGORIES: { id: VehicleCategory; label: string; Icon: LucideIcon }[] = [
  { id: "cv", label: "Combustion", Icon: Flame },
  { id: "ev", label: "Electric", Icon: Zap },
  { id: "simulator", label: "Simulator", Icon: Monitor },
]
