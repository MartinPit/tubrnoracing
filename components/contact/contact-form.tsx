"use client"

import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SuccessMessage } from "../forms/success"
import { FormInput } from "../forms/input"
import { contactFormSchema } from "@/schemas"
import z from "zod"
import { FormTextArea } from "../forms/text-area"
import { PrimaryButton } from "../primary-button"


type FormValues = z.infer<typeof contactFormSchema>

const clip = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"

export function ContactForm() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from(container.current, {
      y: 36,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    })
  }, { scope: container })

  return (
    <div ref={container} className="contact-form-col">
      <div className="flex items-center gap-4 mb-8">
        <div
          className="shrink-0 px-5 py-2 font-heading text-xs font-bold uppercase tracking-[0.22em] bg-primary text-background"
          style={{ clipPath: "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)" }}
        >
          Send a Message
        </div>
        <div className="flex-1 h-px bg-border/30" />
      </div>
      <Form />
    </div>
  )
}

function Form() {
  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  if (form.formState.isSubmitSuccessful) {
    return <SuccessMessage />
  }

  async function onSubmit(data: FormValues) {
    await new Promise((r) => setTimeout(r, 1500))
    console.log("Form Data:", data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput name="name" control={form.control} label="Your Name" />
        <FormInput name="email" control={form.control} label="Email Address" type="email" />
      </div>

      <FormInput name="subject" control={form.control} label="Subject" />
      <FormTextArea name="message" control={form.control} label="Message" rows={5} />

      <PrimaryButton
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Transmitting..." : "Send Message"}
      </PrimaryButton>
    </form>
  )
}
