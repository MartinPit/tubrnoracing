import Link from "next/link"
import { SocialTrack } from "./social-track"
import { directus } from "@/lib/directus"
import { readSingleton } from "@directus/sdk"
import { getSocials } from "@/lib/data"

export async function SocialSection() {
  const socials = await getSocials();
  const data = await directus.request(
    readSingleton("Home_Page", {
      fields: ["socials_title"],
      limit: 1,
    })
  )

  const parts = data.socials_title.split(" ")
  const lastPart = parts.pop()

  return (
    <section className="py-24 overflow-hidden border-t border-border">
      <div className="px-6 mb-12">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Stay Connected</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tight">
              {parts.join(" ") + " "}<span className="text-primary">{lastPart}</span>
            </h2>
          </div>
          <div className="flex gap-4">
            {socials.filter(({ name }) => name != "LinkedIn").map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary pb-1"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SocialTrack />

    </section>
  )
}
