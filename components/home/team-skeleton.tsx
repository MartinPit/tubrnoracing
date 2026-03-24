export function TeamSkeleton() {
  const hexClip = "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)"

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] bg-zinc-900 animate-pulse relative"
          style={{ clipPath: hexClip }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
            <div className="h-3 w-1/2 bg-zinc-800 rounded-sm" />
            <div className="h-6 w-3/4 bg-zinc-700 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  )
}
