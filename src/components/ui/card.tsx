import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-white/10 bg-secondary/50 p-6 shadow-sm transition-all hover:border-primary/50",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
