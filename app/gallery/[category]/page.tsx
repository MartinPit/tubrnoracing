import { GalleryGrid } from "@/components/media/gallery-grid"
import { CategorySelect } from "@/components/media/category-select"
import { Hero } from "@/components/media/hero"
import { getGalleryCategories, getGalleryItems, getGalleryPageInfo } from "@/lib/directus/gallery"

export async function generateStaticParams() {
  const categories = await getGalleryCategories()
  return categories.map(({ title }) => ({ category: title.toLowerCase() }))
}

export default async function MediaCategoryPage({
  params
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const categories = await getGalleryCategories()
  const activeCategory = category.charAt(0).toUpperCase() + category.slice(1)
  const items = await getGalleryItems(activeCategory)
  const pageInfo = await getGalleryPageInfo()



  return (
    <>
      <main
        className="bg-background text-foreground min-h-screen pb-32"
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <Hero title={pageInfo.title} subtitle={pageInfo.description}/>
          <CategorySelect category={activeCategory} categories={categories} />
          <GalleryGrid items={items}/>
        </div>
      </main>
    </>
  )
}
