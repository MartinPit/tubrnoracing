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
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  return `${baseUrl}/assets/${src}?fit=cover&width=${width}&quality=${quality || 75}&format=auto`;
}
