import { LeaderContactDisplay } from "@/types"
import { Mail, Phone } from "lucide-react"

interface Props {
  member: LeaderContactDisplay
}

export function LargeContactCard({ member }: Props) {
  return (
    <div
      className="relative p-[1px] bg-primary/40"
      style={{
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"
      }}
    >
      <div
        className="bg-card p-6 h-full relative"
        style={{
          clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))"
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-heading mb-1">
          {member.custom_title || member.season_subsection.subsection.label + " Leader"}
        </p>
        <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-0.5">
          {member.member.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-5">
          {member.season_subsection.subsection.label}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <a href={`mailto:${member.member.email}`} className="hover:text-primary transition-colors">
              {member.member.email}
            </a>
          </div>
          {member.member.phone && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <a href={`tel:${member.member.phone}`} className="hover:text-primary transition-colors">
                {member.member.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
