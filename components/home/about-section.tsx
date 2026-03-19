import { readSingleton } from "@directus/sdk"
import { About } from "./about"
import { FormulaScene } from "./formula-model"
import { directus } from "@/lib/directus"

export async function AboutSection() {
  const data = await directus.request(
    readSingleton("Home_Page", {
      fields: ["about_text_left", "about_text_right", "about_stats"],
      limit: 1,
    })
  )

  return (
    <section id="about" className="relative min-h-[150vh] py-32">
      <div className="sticky top-0 h-screen w-full">
        <FormulaScene />
      </div>
      <About
        leftText={data.about_text_left}
        rightText={data.about_text_right}
        stats={data.about_stats}
      />
    </section>
  )
}
