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
import { RefObject, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface Props {
  cta: string
  ctaDescription: string
  benefits: string[]
};

export function PartnerForm({ cta, ctaDescription, benefits }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const twoWords = cta.split(" ").slice(0, 2).join(" ")
  const rest = cta.substring(twoWords.length)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 82%",
        toggleActions: "play none none none"
      }
    });

    tl.from(container.current, { opacity: 0, duration: 0.5 });

    tl.from(".form-info-side > *", {
      x: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

    tl.from(formRef.current!.querySelectorAll(":scope > *"), {
      y: 20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out",

    }, "-=0.4");

  }, { scope: container })

  return (
    <div ref={container} className="mt-24 pt-16 border-t border-border/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="form-info-side">
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-heading mb-4">Become a Partner</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight mb-6">
            {twoWords}<br />
            <span className="text-primary">{rest}</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
            {ctaDescription}
          </p>
          <ul className="flex flex-col gap-3">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span
                  className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-primary"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Form formRef={formRef} />
      </div>
    </div>
  )
}

type FormValues = z.infer<typeof partnerFormSchema>

function Form({ formRef }: { formRef?: RefObject<HTMLFormElement | null> }) {
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

    <div className="scroll-margin-top-24">
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
        <div className="w-full">
          <PrimaryButton
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </PrimaryButton>
        </div>
      </form >
    </div >
  )
}
