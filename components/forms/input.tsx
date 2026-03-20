"use client"

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { AnimatedError } from "./animated-error";
import { shellClasses } from "@/lib/utils";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  placeholder?: string
  type?: string
};

const clip = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder = ""
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
          <FieldLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading">{label}</FieldLabel>
          <div className={shellClasses(fieldState.invalid)} style={{ clipPath: clip }}>
            <Input {...field} placeholder={placeholder} type={type} className="bg-secondary border-none h-11 rounded-none focus-visible:ring-0" style={{ clipPath: clip }} />
          </div>
          <AnimatedError state={fieldState} />
        </Field>
      )}
    />
  )
}
