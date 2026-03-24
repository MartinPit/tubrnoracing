import { directus } from "@/lib/directus"
import { NavigationButton } from "../navigation-button"
import { PartnersCards } from "./partners-cards"
import { readSingleton } from "@directus/sdk"
import { getRandomPartners } from "@/lib/directus/partners"
import { WidthContainer } from "../width-container"

export async function PartnersSection() {
  const { parters_title, partners_subtitle } = await directus.request(
    readSingleton("Home_Page", {
      fields: ["parters_title", "partners_subtitle"],
      limit: 1,
    })
  )
  const partners = await getRandomPartners()

  const parts = parters_title.split(" ")
  const lastPart = parts.pop()

  return (
    <section id="partners" className="py-24 px-6 bg-muted">
      <WidthContainer>
        <div className="text-center mb-8">
          <h2 className="font-heading text-5xl sm:text-7xl font-bold uppercase tracking-tight mb-4">
            {parts.join(" ") + " "}<span className="text-primary">{lastPart}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {partners_subtitle}
          </p>
        </div>

        <PartnersCards partners={partners} />

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Interested in partnering with us?</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NavigationButton href="/partners" variant="outline">
              View All Partners
            </NavigationButton>
            <NavigationButton href="/partners#form">Become A Partner</NavigationButton>
          </div>
        </div>
      </WidthContainer>
    </section>
  )
}
