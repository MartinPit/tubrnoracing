import dynamic from "next/dynamic"
import { HeroSection } from "@/components/home/hero-section"
import { Footer } from "@/components/home/footer"

// Below-fold sections are dynamically imported so their JS (GSAP, Three.js)
// is excluded from the critical bundle. ssr: false is not allowed in Server
// Components (App Router), so we omit it — the sections are already "use client"
// components and will hydrate lazily on the client.
const AboutSection = dynamic(
  () => import("@/components/home/about-section").then((m) => m.AboutSection)
)
const TeamSection = dynamic(
  () => import("@/components/home/team-section").then((m) => m.TeamSection)
)
const MediaSection = dynamic(
  () => import("@/components/home/media-section").then((m) => m.MediaSection)
)
const SocialSection = dynamic(
  () => import("@/components/home/social-section").then((m) => m.SocialSection)
)
const PartnersSection = dynamic(
  () => import("@/components/home/partners-section").then((m) => m.PartnersSection)
)

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <MediaSection />
      <SocialSection />
      <PartnersSection />
      <Footer />
    </main>
  )
}
