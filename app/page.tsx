import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { TeamSection } from "@/components/home/team-section"
import { MediaSection } from "@/components/home/media-section"
import { PartnersSection } from "@/components/home/partners-section"
import { SocialSection } from "@/components/home/social-section"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <MediaSection />
      {
        // <SocialSection />
      }
      <PartnersSection />
      <Footer />
    </main>
  )
}
