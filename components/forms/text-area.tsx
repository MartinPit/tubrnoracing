"use client"

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { shellClasses } from "@/lib/utils";
import { InputGroupTextarea } from "../ui/input-group";
import { AnimatedError } from "./animated-error";

interface Props<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  rows?: number
  placeholder?: string
};

const clip = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"

export function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  rows = 4,
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
            <InputGroupTextarea
              {...field}
              rows={rows}
              placeholder={placeholder}
              className="bg-secondary border-none rounded-none focus-visible:ring-0 resize-none min-h-[120px]"
              style={{ clipPath: clip }}
            />
          </div>
          <AnimatedError state={fieldState} />
        </Field>
      )}
    />
  )
}
