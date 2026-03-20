import { ChevronDown } from "lucide-react"
import { Hero } from "./hero"
import { directus } from "@/lib/directus"
import { readSingleton } from "@directus/sdk"

export async function HeroSection() {
  const { title, subtitle } = await directus.request(
    readSingleton("Home_Page", {
      fields: ["title", "subtitle"],
      limit: 1,
    })
  )

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <Hero title={title} subtitle={subtitle}/>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>

    </section>
  )
}
