import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6">{children}</div>
      ) : (
        children
      )}
    </section>
  )
);
Section.displayName = "Section";

export { Section };
