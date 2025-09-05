
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TutorialNodeProps {
  title: string;
  url?: string;
  isSubHeader?: boolean;
  highlighted?: boolean;
}

export function TutorialNode({ title, url, isSubHeader = false, highlighted = false }: TutorialNodeProps) {
  const baseClasses = "text-center p-2.5 rounded-md border text-sm font-medium transition-all duration-200 ease-in-out shadow-sm";
  
  const stateClasses = url 
    ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300";

  const subHeaderClasses = isSubHeader ? "font-bold text-gray-500 dark:text-gray-400 bg-transparent border-none shadow-none text-left p-0 mb-1 mt-2" : "";
  const highlightedClasses = highlighted ? "bg-[#FFEE93] dark:bg-yellow-800/50 border-yellow-400 dark:border-yellow-600 text-black dark:text-yellow-100" : "";

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

interface TutorialNodeGroupProps {
    title: string;
    highlighted?: boolean;
    children: React.ReactNode;
}

export function TutorialNodeGroup({ title, highlighted = false, children }: TutorialNodeGroupProps) {
    return (
        <div className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/30">
            <h3 className={cn("text-center text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200", highlighted && "text-blue-600 dark:text-blue-400")}>
                {title}
            </h3>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    )
}

interface CTFNodeProps {
    title: string;
}

export function CTFNode({ title }: CTFNodeProps) {
    return (
        <div className="text-center p-2.5 rounded-md border text-sm font-medium bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {title}
        </div>
    )
}
