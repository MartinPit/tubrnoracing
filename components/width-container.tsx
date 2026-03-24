import { cn } from "@/lib/utils"

export function WidthContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-7xl mx-auto px-6 md:px-10", className)}>
      {children}
    </div>
  )
}
