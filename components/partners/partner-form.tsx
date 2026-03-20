"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { PARTNER_TIERS } from "@/lib/data"
import { partnerFormSchema } from "@/schemas/index"
import { PrimaryButton } from "../primary-button"
import { SuccessMessage } from "../forms/success"
import { FormInput } from "../forms/input"
import { FormSelect } from "../forms/select"
import { FormTextArea } from "../forms/text-area"


type FormValues = z.infer<typeof partnerFormSchema>

export function PartnerForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: { company: "", phone: "", email: "", tier: "", message: "" },
  })

  async function onSubmit(data: FormValues) {
    await new Promise((r) => setTimeout(r, 1200))
  }

  if (form.formState.isSubmitSuccessful) {
    return <SuccessMessage />
  }

  return (
    <div id="form" className="scroll-margin-top-24">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormInput
          control={form.control}
          name="company"
          label="Company name"
        />
        <FormInput
          control={form.control}
          name="email"
          label="Email address"
          type="email"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            control={form.control}
            name="phone"
            label="Phone number"
            type="tel"
          />
          <FormSelect
            control={form.control}
            name="tier"
            placeholder="Select a tier"
            entries={Object.entries(PARTNER_TIERS).filter(([name]) => name !== "university")}
          />
        </div>

        <FormTextArea
          control={form.control}
          name="message"
          label="Message"
          placeholder="Tell us about your organisation..."
        />
        <PrimaryButton
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Transmitting..." : "Send Enquiry"}
        </PrimaryButton>
      </form >
    </div >
  )
}

