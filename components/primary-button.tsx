import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface Props extends React.ComponentProps<typeof Button> {
  loading?: boolean
};

export function PrimaryButton({ loading, ...props }: Props) {
  return (
    <Button
      {...props}
      className="cursor-pointer mt-2 h-12 font-heading text-sm font-bold uppercase tracking-[0.2em] text-background bg-primary transition-all hover:opacity-90 disabled:opacity-50 active:scale-[0.98]"
      style={{ clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)" }}
      disabled={loading || props.disabled}
    >
      {props.children}
    </Button>
  )
}
