import Link from "next/link";
import { List, ChevronRight } from "lucide-react";
import type { TopicSection } from "@/lib/languages";

interface TopicSidebarProps {
  topics: TopicSection[];
  langSlug: string;
  activeTopicSlug: string;
}

export function TopicSidebar({ topics, langSlug, activeTopicSlug }: TopicSidebarProps) {
  return (
    <nav className="sticky top-24 w-full border border-border/50 bg-card/30 rounded-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <List className="h-3.5 w-3.5" />
        Curriculum
      </h3>
      <div className="space-y-6">
        {topics.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="text-muted-foreground/60 text-xs">{sectionIdx + 1}.</span>
              {section.section}
            </h4>
            <ul className="space-y-0.5 border-l border-border/40 ml-2.5 pl-3">
              {section.items.map((item, itemIdx) => {
                const isActive = item.slug === activeTopicSlug;
                return (
                  <li key={itemIdx}>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.title} ↗
                      </a>
                    ) : item.slug ? (
                      <Link
                        href={`/languages/${langSlug}/${item.slug}`}
                        className={`group flex items-center gap-1.5 py-1.5 text-sm transition-all duration-200 ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {isActive && <ChevronRight className="h-3 w-3 flex-shrink-0 -ml-4 bg-primary text-primary-foreground rounded-full" />}
                        {item.title}
                      </Link>
                    ) : (
                      <span className="block py-1.5 text-sm text-muted-foreground">
                        {item.title}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
