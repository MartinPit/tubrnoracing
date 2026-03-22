import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function directusLoader(
  {
    src,
    width,
    quality
  }: {
    src: string,
    width: number,
    quality?: number
  }) {
  if (src === "placeholder") {
    return "/placeholder.svg"
  }

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  return `${baseUrl}/assets/${src}?fit=cover&width=${width}&quality=${quality || 75}&format=auto`;
}

export const shellClasses = (invalid: boolean) => cn(
  "w-full p-[1px] transition-colors duration-200",
  invalid ? "bg-red-600" : "bg-border/40 focus-within:bg-primary/60"
)
