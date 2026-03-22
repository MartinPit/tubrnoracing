import { readFiles, readItems, readSingleton } from "@directus/sdk";
import { directus } from ".";
import { GalleryFile } from "@/types";

export async function getGalleryCategories() {
  const categories = await directus.request(
    readItems("Gallery_Categories", {
      fields: ["id", "title"]
    })
  );

  categories.unshift({ id: 0, title: "All" });
  return categories;
}

export async function getGalleryItems(categoryId: string, limit: number = 12, page: number = 1): Promise<GalleryFile[]> {
  const files = await directus.request(
    readFiles({
      fields: [
        "id",
        "title",
        "description",
        "width",
        "height",
        "type",
        "duration",
        "tags",
        "folder",
        "uploaded_on",
        { category: [{ Gallery_Categories_id: ["title"] }] }
      ],
      filter: {
        ...(categoryId !== "All" && {
          category: {
            Gallery_Categories_id: {
              title: {
                _eq: categoryId
              }
            }
          }
        }),
        folder: {
          name: {
            _eq: "gallery"
          }
        }
      },
      page: page,
      limit: limit
    }));


  return files.map((file) => {
    let aspectRatio: GalleryFile["aspectRatio"] = "square";
    if (file.width && file.height) {
      const ratio = file.width / file.height;
      if (ratio > 1.2) {
        aspectRatio = "wide";
      } else if (ratio < 0.8) {
        aspectRatio = "tall";
      }
    }

    return ({
      ...file,
      aspectRatio,
      categories: file
        .category
        ?.filter((cat) => cat.Gallery_Categories_id)
        .map((cat) => cat.Gallery_Categories_id!.title) || []
    })
  })
};

export async function getGalleryPageInfo() {
  return await directus.request(
    readSingleton("Gallery_Page", {
      fields: ["title", "description"]
    })
  );
};

export async function getHomepageImages() {
  return getGalleryItems("All", 6);
};
