"use client"

import directusLoader from "@/lib/utils";
import { DirectusImage } from "@/types";
import Image from "next/image";

export function TeamImage({ image }: { image: DirectusImage }) {
  return (
    <Image
      src={image.id}
      loader={directusLoader}
      alt={image.title || "Team Image"}
      width={image.width || 800}
      height={image.height || 600}
      sizes="(max-width: 768px) 100vw, 80vw"
      className="w-full h-auto object-cover"
    />
  )
}
