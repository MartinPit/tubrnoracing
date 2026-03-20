"use client"

import { cn } from "@/lib/utils";

interface Props {
  stat: { value: string, statistic: string }
  className?: string
};

export function StatDisplay({ stat, className }: Props) {
  const notchedPath = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))";

  return (
    <div
      className={cn("p-[1px] bg-primary/30", className)}
      style={{ clipPath: notchedPath }}
    >
      <div
        className="bg-card p-4 h-full"
        style={{ clipPath: notchedPath }}
      >
        <p className="font-heading text-3xl font-bold text-primary leading-none mb-1">
          {stat.value}
        </p>
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {stat.statistic}
        </p>
      </div>
    </div>
  );
};
