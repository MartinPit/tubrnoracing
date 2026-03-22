import { ContactHero } from "@/components/contact/contact-hero"
import { LeadersGrid } from "@/components/contact/leaders-grid"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { getContactInfo, getLeaders } from "@/lib/directus/contact"

export default async function ContactPage() {
  const { email, contact } = await getContactInfo()
  const leaders = await getLeaders()

  return (
    <main
      className="bg-background text-foreground min-h-screen pb-32"
      style={{ paddingTop: "120px" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
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
          />
        </div>
        <LeadersGrid leaders={leaders} />
      </div>
    </main>
  )
}
