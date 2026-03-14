"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { SubsectionModel } from "@/components/team/subsection-model"

// This wrapper exists as a separate file so it can be dynamically imported
// by sidebar.tsx — keeping the Canvas + SubsectionModel out of the initial bundle.
export default function SubsectionCanvas({ id }: { id: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <SubsectionModel id={id} />
      </Suspense>
    </Canvas>
  )
}
