import { useRef } from "react";
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function useRotate(ref: React.RefObject<THREE.Group | null>) {
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.004
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06
    }
  })
}

function LeadershipModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#e31937" metalness={0.8} roughness={0.2} /></mesh>
      <mesh scale={1.35}><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#ffffff" opacity={0.15} transparent wireframe /></mesh>
    </group>
  )
}

function AeroModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[3, 0.1, 1]} /><meshStandardMaterial color="#e31937" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[-1.5, 0, 0]}><boxGeometry args={[0.1, 0.5, 1]} /><meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[1.5, 0, 0]}><boxGeometry args={[0.1, 0.5, 1]} /><meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.3} /></mesh>
    </group>
  )
}

function ChassisModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[2, 0.8, 3]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, 0.5, -0.5]}><boxGeometry args={[1.2, 0.4, 1]} /><meshStandardMaterial color="#e31937" metalness={0.7} roughness={0.2} /></mesh>
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.4, 0.05, 8, 16, Math.PI]} /><meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  )
}

function SuspensionModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><cylinderGeometry args={[0.3, 0.3, 0.2, 32]} /><meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[-0.8, 0.4, 0]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.05, 0.05, 1.5, 16]} /><meshStandardMaterial color="#e31937" metalness={0.7} roughness={0.3} /></mesh>
      <mesh position={[-0.8, -0.4, 0]} rotation={[0, 0, 0.5]}><cylinderGeometry args={[0.05, 0.05, 1.5, 16]} /><meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.08, 0.08, 0.8, 16]} /><meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  )
}

function SoftwareModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[2, 0.1, 1.5]} /><meshStandardMaterial color="#0a3d0a" metalness={0.5} roughness={0.5} /></mesh>
      {([[-0.5, 0.1, 0.3], [0.5, 0.1, 0.3], [0, 0.1, -0.3]] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}><boxGeometry args={[0.4, 0.15, 0.4]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      ))}
      {([[-0.7, 0.1, -0.5], [-0.5, 0.1, -0.5], [-0.3, 0.1, -0.5]] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}><sphereGeometry args={[0.05, 16, 16]} /><meshStandardMaterial color="#e31937" emissive="#e31937" emissiveIntensity={0.5} /></mesh>
      ))}
    </group>
  )
}

function PerformanceModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1, 0.1, 16, 32]} /><meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, -0.5]}><coneGeometry args={[0.05, 0.8, 16]} /><meshStandardMaterial color="#e31937" /></mesh>
      <mesh position={[0, 0.05, 0]}><sphereGeometry args={[0.15, 32, 32]} /><meshStandardMaterial color="#e31937" metalness={0.9} roughness={0.1} /></mesh>
    </group>
  )
}

function ElectricModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[2, 0.6, 1.2]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} /></mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.5 + (i % 4) * 0.35, 0.4, -0.2 + Math.floor(i / 4) * 0.4]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial color="#e31937" emissive="#e31937" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function DrivetrainModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.6, 0.15, 8, 20]} /><meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} /></mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.1, 0.1, 2.5, 16]} /><meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.4, 0.1, 8, 16]} /><meshStandardMaterial color="#e31937" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  )
}

function MarketingModel() {
  const g = useRef<THREE.Group>(null); useRotate(g)
  return (
    <group ref={g}>
      <mesh rotation={[0, 0, Math.PI / 4]}><coneGeometry args={[0.8, 1.5, 32, 1, true]} /><meshStandardMaterial color="#e31937" metalness={0.7} roughness={0.3} side={2} /></mesh>
      <mesh position={[-0.5, -0.5, 0]}><cylinderGeometry args={[0.2, 0.2, 0.4, 16]} /><meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} /></mesh>
      {[1.2, 1.5, 1.8].map((scale, i) => (
        <mesh key={i} position={[0.4, 0.4, 0]} rotation={[0, Math.PI / 2, Math.PI / 4]}>
          <torusGeometry args={[scale * 0.3, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={1 - i * 0.25} />
        </mesh>
      ))}
    </group>
  )
}

export function SubsectionModel({ id }: { id: string }) {
  switch (id) {
    case "leadership": return <LeadershipModel />
    case "aerodynamics": return <AeroModel />
    case "chassis": return <ChassisModel />
    case "suspension": return <SuspensionModel />
    case "software": return <SoftwareModel />
    case "vehicle-performance": return <PerformanceModel />
    case "electric-powertrain": return <ElectricModel />
    case "drivetrain-cooling": return <DrivetrainModel />
    case "marketing": return <MarketingModel />
    default: return <LeadershipModel />
  }
}

