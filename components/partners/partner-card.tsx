import Image from "next/image"
import Link from "next/link"
import { PARTNER_TIERS } from "@/lib/data"
import directusLoader, { cn } from "@/lib/utils"
import { DirectusImage, PartnerTier } from "@/types"
import { Partner } from "@/types/directus-schema"

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

export function PartnerCard({ partner, variant = "uni", className }: Props) {
  const config = PARTNER_TIERS[variant]
  const sizeClass = CARD_SIZES[variant] || "w-48 h-48"
  const image = partner.logo as DirectusImage

  const hexClip = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"

  return (
    <div className={cn("group relative transition-transform duration-300 hover:scale-[1.02] shrink-0", sizeClass, className)}>
      <Link
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full p-[1px]"
        style={{
          backgroundColor: config.border,
          clipPath: hexClip
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: config.color }}
        />

        <div
          className="relative flex flex-col items-center justify-between h-full w-full bg-zinc-950 p-6"
          style={{
            clipPath: hexClip,
            color: config.color
          }}
        >
          <div className="relative w-full flex-1 flex items-center justify-center z-10 min-h-0">
            <div className="relative w-full h-full max-h-[80%]">
              <Image
                src={image.id || "placeholder"}
                loader={directusLoader}
                alt={partner.title}
                loading="eager"
                fill
                sizes="(max-width: 768px) 80vw, 250px"
                className="object-contain opacity-40 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>

          <p className="relative z-10 shrink-0 pt-4 text-[10px] sm:text-xs text-center font-heading uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-[inherit] leading-tight">
            {partner.title}
          </p>
        </div>
      </Link>
    </div>
  )
}
