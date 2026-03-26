import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import type { TopicSection } from "@/lib/languages";

interface LearningPathProps {
  topics: TopicSection[];
  langSlug: string;
}

export function LearningPath({ topics, langSlug }: LearningPathProps) {
  return (
    <div className="space-y-10">
      {topics.map((section, sectionIdx) => (
        <section key={sectionIdx} data-section-idx={sectionIdx} className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                {sectionIdx + 1}
              </span>
              {section.section}
            </h2>
            {section.description && (
              <p className="text-sm text-muted-foreground mt-1 ml-9">{section.description}</p>
            )}
          </div>

          <ul className="space-y-2 ml-9">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start gap-2.5 group">
                <BookOpen className="h-3.5 w-3.5 mt-1 text-muted-foreground/60 flex-shrink-0 group-hover:text-primary transition-colors" />
                <div className="text-sm">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                    >
                      {item.title}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : item.slug ? (
                    <Link
                      href={`/languages/${langSlug}/${item.slug}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">{item.title}</span>
                  )}
                  {item.description && (
                    <span className="text-muted-foreground"> — {item.description}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
