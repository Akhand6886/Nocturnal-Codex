// src/components/content/tutorial-node.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TutorialNodeProps {
  title: string;
  url?: string;
  isSubHeader?: boolean;
  highlighted?: boolean;
}

// Main node component
export function TutorialNode({ title, url, isSubHeader = false, highlighted = false }: TutorialNodeProps) {
  const baseClasses = "text-center p-2 rounded-md border text-sm font-medium transition-all duration-200 ease-in-out shadow-sm";
  
  const stateClasses = url 
    ? "bg-card/80 border-border/70 hover:bg-muted hover:border-primary/50 hover:shadow-md"
    : "bg-card/50 border-border/50 text-muted-foreground";

  const subHeaderClasses = isSubHeader ? "font-semibold text-foreground bg-transparent border-none shadow-none text-center p-0 mb-1 mt-3" : "";
  const highlightedClasses = highlighted ? "bg-yellow-400/20 dark:bg-yellow-800/30 border-yellow-500/50 dark:border-yellow-600/50 text-foreground font-semibold" : "";

  const content = (
    <div className={cn(baseClasses, stateClasses, subHeaderClasses, highlightedClasses)}>
      {title}
    </div>
  );

  if (url) {
    return (
      <Link href={url} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// Grouping component
interface TutorialNodeGroupProps {
    title: string;
    highlighted?: boolean;
    children: React.ReactNode;
}

export function TutorialNodeGroup({ title, highlighted = false, children }: TutorialNodeGroupProps) {
    return (
        <div className={cn(
            "p-4 border rounded-lg bg-card/50 border-border/60 shadow-lg",
            highlighted && "border-primary/40 bg-primary/5"
        )}>
            <h3 className={cn(
                "text-center text-md font-bold mb-4 text-foreground", 
                highlighted && "text-primary"
            )}>
                {title}
            </h3>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    )
}

// Special node for CTFs
interface CTFNodeProps {
    title: string;
}

export function CTFNode({ title }: CTFNodeProps) {
    return (
        <div className="text-center p-2.5 rounded-md border text-sm font-medium bg-card border-border/70">
            {title}
        </div>
    )
}
