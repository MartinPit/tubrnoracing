"use client"

import { useRef, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { VehicleCategory } from "@/types"
import { VEHICLES } from "@/lib/data"
import { GarageDesktop } from "./desktop"
import { GarageMobile } from "./mobile"

export default function GaragePage() {
  const router = useRouter()
  const params = useParams<{ category: VehicleCategory; car: string }>()

  const category: VehicleCategory = ["cv", "ev", "simulator"].includes(params?.category)
    ? params?.category
    : "ev";
  const car: string = params?.car ?? "e5"

  const list = VEHICLES.filter((v) => v.category === category)
  const idx = Math.max(0, list.findIndex((v) => v.id === car))
  const vehicle = list[idx] ?? list[0]

  const container = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)

  const navigate = useCallback((cat: VehicleCategory, nextCarId: string) => {
    if (busyRef.current) return
    if (cat === category && nextCarId === car) return

    busyRef.current = true

    const elementsToAnimate = [".select", ".stage", ".select2", ".info"]
    gsap.killTweensOf(elementsToAnimate)

    gsap.to(elementsToAnimate.filter(Boolean), {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        router.push(`/garage/${cat}/${nextCarId}`)
      }
    })
  }, [router, category, car])

  useGSAP(() => {
    busyRef.current = false
    const elementsToAnimate = [".select", ".stage", ".select2", ".info"]

    gsap.set(elementsToAnimate.filter(Boolean), {
      opacity: 0,
      y: -20
    })

    gsap.to(elementsToAnimate.filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "opacity,transform"
    })
  }, {
    dependencies: [category, car],
    scope: container
  })

  return (
    <main className="bg-background text-foreground overflow-hidden pt-20" ref={container}>
      <GarageDesktop
        category={category}
        car={car}
        navigate={navigate}
        list={list}
        vehicle={vehicle}
      />

      <GarageMobile
        category={category}
        car={car}
        navigate={navigate}
        list={list}
        vehicle={vehicle}
      />

    </main >
  )
}

