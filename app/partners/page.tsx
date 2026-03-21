import { PartnerList } from "@/components/partners/partner-list"
import { PartnerForm } from "@/components/partners/partner-form"
import { PartnerHero } from "@/components/partners/partner-hero"
import { getPartnersInfo } from "@/lib/directus/partners"

export default async function SponsorsPage() {
  const data = await getPartnersInfo();

  return (
    <main className="bg-background text-foreground min-h-screen pb-32" style={{ paddingTop: "120px" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <PartnerHero title={data.title} subtitle={data.subtitle} />
        <PartnerList />
        <PartnerForm
          cta={data.call_to_action}
          ctaDescription={data.call_to_action_description}
          benefits={data.benefits}
        />
      </div>
    </main>
  )
}
