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
  imageLoading?: "eager" | "lazy"
}

export function PartnerCard({ partner, variant = "uni", className, imageLoading = "eager" }: Props) {
  const config = PARTNER_TIERS[variant]
  const image = partner.logo as (DirectusImage & { type: string })

  const hexClip = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"

  return (
    <div className={cn("group relative transition-transform duration-300 hover:scale-[1.02] shrink-0 aspect-square", className)}>
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
            <div className={cn("relative w-full h-full max-h-[80%]")}>
              <Image
                src={image.id || "placeholder"}
                loader={directusLoader}
                alt={partner.title}
                loading={imageLoading}
                fill
                sizes="(max-width: 768px) 80vw, 250px"
                className="object-contain transition-all duration-700"
              />
            </div>
          </div>

          <p className="transition-colors duration-400 relative z-10 shrink-0 pt-4 text-[10px] sm:text-xs text-center font-heading uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-[inherit] leading-tight">
            {partner.title}
          </p>
        </div>
      </Link>
    </div>
  )
}
