import { PartnerList } from "@/components/partners/partner-list"
import { PartnerForm } from "@/components/partners/partner-form"
import { PartnerHero } from "@/components/partners/partner-hero"

export default async function SponsorsPage() {

  return (
    <main className="bg-background text-foreground min-h-screen pb-32" style={{ paddingTop: "120px" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <PartnerHero />
        <PartnerList />
        <PartnerForm />
      </div>
    </main>
  )
}
