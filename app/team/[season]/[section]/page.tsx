"use client"

import { useParams } from "next/navigation"
import { MemberGrid } from "@/components/team/member-grid"
import { Sidebar } from "@/components/team/sidebar"

export default function TeamPage() {
  const params = useParams<{ season: string; section: string }>()

  const season = params?.season ?? "2024"
  const section = params?.section ?? "leadership"

  return (
    <main className="min-h-screen pt-16 flex flex-col md:flex-row">
      <Sidebar
        season={season}
        section={section}
      />

      <MemberGrid
        season={season}
        section={section}
      />
    </main>
  )
}
