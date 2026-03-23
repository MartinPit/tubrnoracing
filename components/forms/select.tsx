"use client"

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn, shellClasses } from "@/lib/utils";
import { AnimatedError } from "./animated-error";
import { TierConfig } from "@/lib/data";

const clip = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"

interface Props<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  placeholder: string
  entries: [string, TierConfig][]
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  placeholder,
  entries
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
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
                <SelectValue placeholder={placeholder}/>
              </SelectTrigger>
              <SelectContent className="border-border/40 font-heading uppercase text-xs">
                {entries.map(([name, tier]) => (
                  <SelectItem key={name} value={name} className="h-11 capitalize">{tier.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AnimatedError state={fieldState} />
        </Field>
      )}
    />
  )
}
