import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props extends React.ComponentProps<typeof Button> { };

export function PrimaryButton({ ...props }: Props) {
  return (
    <Button
      {...props}
      className={cn(
        "cursor-pointer mt-2 h-12 font-heading text-sm font-bold uppercase tracking-[0.2em] text-background",
        "bg-primary transition-all hover:opacity-90 disabled:opacity-50 active:scale-[0.98]",
        props.className
      )}
      style={{ clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)" }}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  )
}
