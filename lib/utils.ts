import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function directusLoader(
  {
    src,
    width,
  }: {
    src: string,
    width: number,
  }) {
  if (src === "placeholder") {
    return "/placeholder.png?width=400&height=400";
  }

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  return `${baseUrl}/assets/${src}?key=gallery-card&width=${width}`;
}

export const shellClasses = (invalid: boolean) => cn(
  "w-full p-[1px] transition-colors duration-200 bg-primary/60",
  invalid && "bg-red-600"
)
