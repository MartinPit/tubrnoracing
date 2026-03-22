import { getHomepageImages } from "@/lib/directus/gallery"
import { MediaSectionScroller } from "./media-section-scroller";


export async function MediaSection() {
  const items = await getHomepageImages();

  return (
    <MediaSectionScroller items={items} />
  )
}
