import directusLoader, { cn } from "@/lib/utils"
import { GalleryFile } from "@/types"
import { Play } from "lucide-react"
import Image from "next/image"

interface Props {
  item: GalleryFile
  className?: string
  imageLoading?: "eager" | "lazy"
}

export function MediaCard({ item, className, imageLoading = "eager" }: Props) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-[70vw] sm:w-[50vw] lg:w-[35vw] aspect-[4/3]",
        "overflow-hidden group cursor-pointer",
        className,
      )}
    >
      <Image
        src={item.id}
        loader={directusLoader}
        alt={item.title || "Media"}
        fill
        loading={imageLoading}
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 35vw"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
    </div>
  )

}
