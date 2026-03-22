import directusLoader from "@/lib/utils"
import { GalleryFile } from "@/types"
import { Play } from "lucide-react"
import Image from "next/image"

export function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryFile
  onClick: () => void
}) {
  const aspectClass =
    item.aspectRatio === "tall"
      ? "aspect-[2/3]"
      : item.aspectRatio === "square"
        ? "aspect-square"
        : "aspect-video"

  return (
    <button
      onClick={onClick}
      className="gallery-card relative w-full overflow-hidden group cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
      aria-label={`View ${item.title}`}
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        <Image
          src={item.id}
          loader={directusLoader}
          alt={item.title || "Gallery Image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Play className="w-5 h-5 text-primary-foreground ml-1" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-heading text-sm font-bold uppercase tracking-tight text-foreground text-left line-clamp-1">
            {item.title}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary mt-0.5 text-left">
            {item.categories.join(", ")}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </button>
  )
}

