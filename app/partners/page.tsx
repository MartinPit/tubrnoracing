import { PartnerList } from "@/components/partners/partner-list"
import { PartnerForm } from "@/components/partners/partner-form"
import { PartnerHero } from "@/components/partners/partner-hero"
import { getPartners, getPartnersInfo } from "@/lib/directus/partners"

export default async function SponsorsPage() {
  const data = await getPartnersInfo();
  const partners = await getPartners()

  return (
    <main
      className="bg-background text-foreground min-h-screen pb-32 max-w-7xl mx-auto px-6 md:px-10"
      style={{ paddingTop: "120px" }}
    >
        <PartnerHero title={data.title} subtitle={data.subtitle} />
        <PartnerList partners={partners} />
        <PartnerForm
          cta={data.call_to_action}
          ctaDescription={data.call_to_action_description}
          benefits={data.benefits}
        />
    </main>
  )
}
