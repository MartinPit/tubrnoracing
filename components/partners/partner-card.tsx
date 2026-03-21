import Image from "next/image"
import Link from "next/link"
import { PARTNER_TIERS } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Partner, PartnerTier } from "@/types"

interface Props {
  partner: Partner
  variant?: PartnerTier
  className?: string
}


const CARD_SIZES: Record<string, string> = {
  university: "w-72 h-72",
  platinum: "w-72 h-72",
  gold: "w-56 h-56",
  silver: "w-44 h-44",
  bronze: "w-36 h-36",
}

export function PartnerCard({ partner, variant = "university", className }: Props) {
  const config = PARTNER_TIERS[variant]
  const sizeClass = CARD_SIZES[variant] || "w-48 h-48"

  // Adjusted slant to be proportional to static sizes
  const hexClip = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"

  return (
  <div className={cn("group relative transition-transform duration-300 hover:scale-[1.02] shrink-0", sizeClass, className)}>
    <Link
      href={partner.website || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full h-full p-[1px]" // Standardized 1px padding for the "border"
      style={{
        backgroundColor: config.border, // Default border color
        clipPath: hexClip
      }}
    >
      {/* Hover Accent Layer (Now covers the background of the link) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: config.color }}
      />

      {/* Content Container */}
      <div
        className="relative flex flex-col items-center justify-center h-full w-full bg-zinc-950 p-4"
        style={{
          clipPath: hexClip, // Clip again to keep corners sharp
          color: config.color
        }}
      >
        {/* Logo Wrapper - Fixed aspect ratio box for consistency */}
        <div className="relative w-full aspect-square flex items-center justify-center z-10 mb-2">
          <Image
            src={partner.logoUrl || "/placeholder.svg"}
            alt={partner.name}
            fill
            className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 p-2"
          />
        </div>

        {/* Text Wrapper - Fixed height or absolute bottom to prevent pushing */}
        <p className="relative z-10 text-[9px] sm:text-[10px] text-center font-heading uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-[inherit] leading-tight px-1 mt-auto">
          {partner.name}
        </p>
      </div>
    </Link>
  </div>
)
}

