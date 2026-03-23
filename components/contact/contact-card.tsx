import { LeaderContactDisplay } from "@/types";
import { Mail, Phone } from "lucide-react"

export function ContactCard({ leader }: { leader: LeaderContactDisplay }) {
  const cardPath = "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))";

  return (
    <div
      className="leader-card group p-[1px] transition-colors duration-300 bg-border/30 hover:bg-primary/50"
      style={{ clipPath: cardPath }}
    >
      <div
        className="bg-card p-5 h-full relative"
        style={{ clipPath: cardPath }}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-primary font-heading mb-0.5">
              {leader.season_subsection.subsection.short}
            </p>
            <p className="text-xs font-heading font-bold uppercase tracking-wide text-muted-foreground">
              {leader.custom_title || leader.season_subsection.subsection.label}
            </p>
          </div>
        </div>

        <h3 className="font-heading text-base font-bold uppercase tracking-wide mb-3 text-foreground">
          {leader.member.name}
        </h3>

        <div className="flex flex-col gap-1.5">
          <a
            href={`mailto:${leader.member.email}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-150 group/link"
          >
            <Mail className="w-3 h-3 shrink-0 text-primary/60" />
            <span className="truncate">{leader.member.email}</span>
          </a>
          {leader.member.phone && (
            <a
              href={`tel:${leader.member.phone}`}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-150 group/link"
            >
              <Phone className="w-3 h-3 shrink-0 text-primary/60" />
              <span className="truncate">{leader.member.phone}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
