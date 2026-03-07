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

export function PartnerCard({ partner, variant = "university", className }: Props) {
  const config = PARTNER_TIERS[variant]

  // Consistent clip path for both layers
  const hexClip = "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))"

  return (
    <div className={cn("group relative transition-transform duration-300 hover:scale-[1.02]", className)}>
      <Link
        href={partner.website || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full"
      >
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            backgroundColor: config.border,
            clipPath: hexClip
          }}
        />

        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: config.color, clipPath: hexClip }}
        />

        <div
          className="relative inset-[1px] flex flex-col items-center justify-center gap-4 p-8 bg-zinc-950"
          style={{
            clipPath: hexClip,
            height: "calc(100% - 2px)",
            width: "calc(100% - 2px)",
            color: config.color
          }}
        >
          <div className={cn("relative w-full flex items-center justify-center z-10", config.height)}>
            <Image
              src={partner.logoUrl || "/placeholder.svg"}
              alt={partner.name}
              fill
              className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>

          <p className={cn("relative z-10 text-sm text-center font-heading uppercase tracking-[0.25em]",
            "text-muted-foreground/50 transition-colors duration-300",
            config.color && `group-hover:text-[inherit]`
          )}>
            {partner.name}
          </p>
        </div>
      </Link>
    </div>
  )
}
