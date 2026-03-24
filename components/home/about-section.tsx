import { readSingleton } from "@directus/sdk"
import { About } from "./about"
import { FormulaScene } from "./formula-model"
import { directus } from "@/lib/directus"
import { WidthContainer } from "../width-container"

export async function AboutSection() {
  const data = await directus.request(
    readSingleton("Home_Page", {
      fields: ["about_text_left", "about_text_right", "about_stats", "model"],
      limit: 1,
    })
  )

  return (
    <section id="about" className="relative min-h-[170dvh] lg:min-h-[150dvh]">
      <WidthContainer>
        <div className="sticky top-0 h-screen w-full">
          <FormulaScene modelId={data.model} />
        </div>
        <About
          leftText={data.about_text_left}
          rightText={data.about_text_right}
          stats={data.about_stats}
        />
      </WidthContainer>
    </section>
  )
}
