"use client"

import { useLayoutEffect, useRef } from "react"
import { FieldError } from "../ui/field"
import gsap from "gsap"
import { ControllerFieldState } from "react-hook-form"

export function AnimatedError ({ state }: { state: ControllerFieldState }) {
  const errorRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
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
        className="text-xs uppercase font-heading text-red-600 mt-1"
      />
    </div>
  )
}
