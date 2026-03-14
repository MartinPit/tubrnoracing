import dynamic from "next/dynamic"
import { HeroSection } from "@/components/home/hero-section"
import { Footer } from "@/components/home/footer"

// Below-fold sections are dynamically imported to keep the critical JS bundle
// small, which removes GSAP + Three.js from the initial parse/execute path.
const AboutSection = dynamic(
  () => import("@/components/home/about-section").then((m) => m.AboutSection),
  { ssr: false }
)
const TeamSection = dynamic(
  () => import("@/components/home/team-section").then((m) => m.TeamSection),
  { ssr: false }
)
const MediaSection = dynamic(
  () => import("@/components/home/media-section").then((m) => m.MediaSection),
  { ssr: false }
)
const SocialSection = dynamic(
  () => import("@/components/home/social-section").then((m) => m.SocialSection),
  { ssr: false }
)
const PartnersSection = dynamic(
  () => import("@/components/home/partners-section").then((m) => m.PartnersSection),
  { ssr: false }
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
