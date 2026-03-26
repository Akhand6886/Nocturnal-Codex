"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, GraduationCap } from "lucide-react";
import type { TopicSection } from "@/lib/languages";

interface LearningPathProps {
  topics: TopicSection[];
  languageName: string;
}

export function LearningPath({ topics, languageName }: LearningPathProps) {
  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-semibold mb-2 text-foreground flex items-center">
        <GraduationCap className="h-6 w-6 mr-3 text-primary" />
        Learning Path
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        A structured curriculum for mastering {languageName} — {topics.reduce((sum, s) => sum + s.items.length, 0)} topics across {topics.length} sections.
      </p>

      <Accordion type="multiple" className="space-y-3">
        {topics.map((section, sectionIdx) => (
          <AccordionItem
            key={sectionIdx}
            value={`section-${sectionIdx}`}
            className="border border-border/50 rounded-lg overflow-hidden bg-card/50 px-4"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-left">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                  {sectionIdx + 1}
                </div>
                <div>
                  <span className="font-semibold text-foreground">{section.section}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({section.items.length} {section.items.length === 1 ? 'topic' : 'topics'})
                  </span>
                  {section.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{section.description}</p>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2 pb-2">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-3 pl-2">
                    <div className="flex-shrink-0 mt-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
