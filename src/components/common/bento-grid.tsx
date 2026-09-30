import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  glowColor?: "purple" | "cyan" | "pink" | "none";
}

const colSpanClasses: Record<number, string> = {
  1: "",
  2: "md:col-span-2",
  3: "lg:col-span-3",
};

const rowSpanClasses: Record<number, string> = {
  1: "",
  2: "md:row-span-2",
};

const glowClasses: Record<string, string> = {
  purple: "hover:neon-border-purple",
  cyan: "hover:neon-border-cyan",
  pink: "hover:shadow-[0_0_20px_-5px_hsl(var(--neon-pink)/0.3)]",
  none: "",
};

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  glowColor = "purple",
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "glass border border-border/30",
        "transition-all duration-500 ease-out",
        "hover:border-primary/30 hover:-translate-y-0.5",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        glowClasses[glowColor],
        className
      )}
    >
      {/* Subtle scan line effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent"
          style={{
            animation: "scan-line 3s linear infinite",
            height: "200%",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
