import { ContactHero } from "@/components/contact/contact-hero"
import { LeadersGrid } from "@/components/contact/leaders-grid"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { getContactInfo, getLeaders } from "@/lib/directus/contact"

export default async function ContactPage() {
  const { email, contact } = await getContactInfo()
  const leaders = await getLeaders()

  const teamLead = leaders.find(leader => leader.custom_title === "Team Leader");
  const marketingLead = leaders.find(leader => leader.season_subsection.subsection.short === "MKT&PR");

  return (
    <main
      className="bg-background text-foreground min-h-screen pb-32 max-w-7xl mx-auto px-6 md:px-10"
      style={{ paddingTop: "120px" }}
    >
      <ContactHero title={contact.title} subtitle={contact.subtitle} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <ContactForm />
        <ContactInfo
          email={email}
          advisor={{
            advisor_name: contact.advisor_name,
            advisor_email: contact.advisor_email,
            advisor_phone: contact.advisor_phone,
          }}
          members={[teamLead!, marketingLead!]}
        />
      </div>
      <LeadersGrid
        leaders={
          leaders.filter(
            (member) => ![teamLead?.id, marketingLead?.id].includes(member.id)
          )
        }
      />
    </main>
  )
}
