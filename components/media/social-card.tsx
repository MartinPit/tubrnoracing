import Link from "next/link"
import Image from "next/image"
import { Social } from "@/types"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  item: Social
  className?: string
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconClass = "w-5 h-5"
  switch (platform.toLowerCase()) {
    case "instagram":
      return <Instagram className={iconClass} />
    case "youtube":
      return <Youtube className={iconClass} />
    case "facebook":
      return <Facebook className={iconClass} />
    case "linkedin":
      return <Linkedin className={iconClass} />
    default:
      return null
  }
}

export function SocialCard({ item, className }: Props) {
  return (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative flex-shrink-0 w-64 sm:w-80 aspect-square overflow-hidden group block",
        className
      )}
    >
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.name || `${item.platform} post`}
        fill
        sizes="(max-width: 768px) 256px, 320px"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <PlatformIcon platform={item.platform} />
        </div>
      </div>

      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-20 shadow-sm">
        <PlatformIcon platform={item.platform} />
      </div>
    </Link>
  )
}
