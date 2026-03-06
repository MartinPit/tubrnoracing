import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TeamSection } from "@/components/team-section"
import { MediaSection } from "@/components/media-section"
import { PartnersSection } from "@/components/partners-section"
import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
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
