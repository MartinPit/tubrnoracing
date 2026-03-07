"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroupTextarea } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PARTNER_TIERS } from "@/lib/data"
import { gsap } from "gsap"
import { partnerFormSchema } from "@/schemas/index"
import { PrimaryButton } from "../primary-button"


type FormValues = z.infer<typeof partnerFormSchema>

const clip = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
const shellClasses = (invalid: boolean) => cn(
  "w-full p-[1px] transition-colors duration-200",
  invalid ? "bg-red-600" : "bg-border/40 focus-within:bg-primary/60"
)

export function PartnerForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: { company: "", phone: "", email: "", tier: "", message: "" },
  })

  const AnimatedError = ({ state }: { state: any }) => {
    const errorRef = React.useRef<HTMLDivElement>(null)

    React.useLayoutEffect(() => {
      if (state.invalid && errorRef.current) {
        gsap.fromTo(
          errorRef.current,
          { height: 0, opacity: 0, y: -5 },
          {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          }
        )
      } else if (!state.invalid && errorRef.current) {
        // Slide Up & Fade Out
        gsap.to(errorRef.current, {
          height: 0,
          opacity: 0,
          y: -5,
          duration: 0.2,
          ease: "power2.in",
        })
      }
    }, [state.invalid])

    return (
      <div
        ref={errorRef}
        className="overflow-hidden h-0 opacity-0"
      >
        <FieldError
          errors={[state.error]}
          className="text-[10px] uppercase font-heading text-red-600 mt-1"
        />
      </div>
    )
  }
  async function onSubmit(data: FormValues) {
    await new Promise((r) => setTimeout(r, 1200))
  }

  if (form.formState.isSubmitSuccessful) {
    return (
      <SuccessMessage />
    )
  }

  return (
    <div id="form" className="scroll-margin-top-24">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Controller
          name="company"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">Company name</FieldLabel>
              <div className={shellClasses(fieldState.invalid)} style={{ clipPath: clip }}>
                <Input {...field} className="bg-secondary border-none h-11 rounded-none focus-visible:ring-0" style={{ clipPath: clip }} />
              </div>
              <AnimatedError state={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">Email address</FieldLabel>
              <div className={shellClasses(fieldState.invalid)} style={{ clipPath: clip }}>
                <Input {...field} type="email" className="bg-secondary border-none h-11 rounded-none focus-visible:ring-0" style={{ clipPath: clip }} />
              </div>
              <AnimatedError state={fieldState} />
            </Field>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                <FieldLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">Phone number</FieldLabel>
                <div className={shellClasses(fieldState.invalid)} style={{ clipPath: clip }}>
                  <Input {...field} type="tel" className="bg-secondary border-none h-11 rounded-none focus-visible:ring-0 w-full" style={{ clipPath: clip }} />
                </div>
                <AnimatedError state={fieldState} />
              </Field>
            )}
          />

          <Controller
            name="tier"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                <FieldLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">Sponsorship tier</FieldLabel>
                <div className={shellClasses(fieldState.invalid)} style={{ clipPath: clip }}>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger
                      className={cn(
                        "w-full justify-between bg-secondary border-none data-[size=default]:h-11",
                        "rounded-none focus:ring-0 px-4"
                      )}
                      style={{ clipPath: clip }}
                    >
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent className="border-border/40 font-heading uppercase text-xs">
                      {Object.entries(PARTNER_TIERS).filter(([name]) => name !== "university").map(([name]) => (
                        <SelectItem key={name} value={name} className="h-11 capitalize">{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <AnimatedError state={fieldState} />
              </Field>
            )}
          />
        </div>

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">Message</FieldLabel>
              <div className={shellClasses(fieldState.invalid)} style={{ clipPath: clip }}>
                <InputGroupTextarea
                  {...field}
                  rows={4}
                  placeholder="Tell us about your organisation..."
                  className="bg-secondary border-none rounded-none focus-visible:ring-0 resize-none min-h-[120px]"
                  style={{ clipPath: clip }}
                />
              </div>
              <AnimatedError state={fieldState} />
            </Field>
          )}
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

const SuccessMessage = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(iconRef.current,
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="p-8 border border-primary/30 opacity-0" // Start at opacity 0
    >
      <div
        ref={iconRef}
        className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center mb-5"
      >
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-heading text-2xl font-bold uppercase mb-2">Telemetry Received</h3>
      <p className="text-sm text-muted-foreground">
        Thank you for your interest. Our partnership team will be in touch within 48 hours.
      </p>
    </div>
  );
};
