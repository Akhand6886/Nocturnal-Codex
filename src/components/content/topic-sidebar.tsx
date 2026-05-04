import Link from "next/link";
import { List, ChevronRight } from "lucide-react";
import type { TopicSection } from "@/lib/languages";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TopicSidebarProps {
  topics: TopicSection[];
  langSlug: string;
  activeTopicSlug: string;
}

export function TopicSidebar({ topics, langSlug, activeTopicSlug }: TopicSidebarProps) {
  // Find which section contains the active topic
  const activeSectionIndex = topics.findIndex(section => 
    section.items.some(item => item.slug === activeTopicSlug)
  );
  
  const allExpanded = topics.map((_, i) => `section-${i}`);

  return (
    <nav className="sticky top-24 w-full border border-border/50 bg-card/30 backdrop-blur-xl shadow-sm rounded-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <List className="h-3.5 w-3.5" />
        Curriculum
      </h3>
      
      <Accordion type="multiple" defaultValue={allExpanded} className="w-full">
        {topics.map((section, sectionIdx) => (
          <AccordionItem key={sectionIdx} value={`section-${sectionIdx}`} className="border-border/40 last:border-0 border-b">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3 px-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <span className="flex items-center gap-2 text-left w-full pr-2">
                <span className="text-muted-foreground/60 text-xs w-4">{sectionIdx + 1}.</span>
                <span className="text-foreground">{section.section}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 pl-6">
              <ul className="space-y-1.5 border-l border-border/40 ml-1 pl-4 relative">
                {section.items.map((item, itemIdx) => {
                  const isActive = item.slug === activeTopicSlug;
                  return (
                    <li key={itemIdx} className="relative">
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute -left-[21px] top-[9px] h-2 w-2 rounded-full bg-primary ring-4 ring-card" />
                      )}
                      
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.title} ↗
                        </a>
                      ) : item.slug ? (
                        <Link
                          href={`/languages/${langSlug}/${item.slug}`}
                          className={`group flex items-center gap-1.5 py-1 text-sm transition-all duration-200 ${
                            isActive
                              ? "text-primary font-medium"
                              : "text-muted-foreground/80 hover:text-foreground hover:translate-x-0.5"
                          }`}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <span className="block py-1 text-sm text-muted-foreground/60">
                          {item.title}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
}
