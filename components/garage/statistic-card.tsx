interface Props {
  statistic: {
    title: string
    value: string
    metric: string
  }
}

export function StatisticCard({ statistic }: Props) {
  return (
    <div
      className="p-[1px] bg-primary/40"
      style={{
        clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
      }}
    >
      <div
        className="bg-card p-3 h-full"
        style={{
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
        }}
      >
        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
          {statistic.title}
        </p>
        <p className="font-heading text-2xl font-bold leading-none">
          {statistic.value}
        </p>
        <p className="text-[9px] text-primary uppercase tracking-wider mt-0.5">
          {statistic.metric}
        </p>
      </div>
    </div>
  )
}
