"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { TopicSection } from "@/lib/languages";

interface TocSidebarProps {
  topics: TopicSection[];
}

export function LanguageTocSidebar({ topics }: TocSidebarProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-section-idx"));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section-idx]");
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    const el = document.querySelector(`[data-section-idx="${idx}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-24 w-full">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <List className="h-3.5 w-3.5" />
        Contents
      </h3>
      <ul className="space-y-1">
        {topics.map((section, idx) => (
          <li key={idx}>
            <button
              onClick={() => scrollTo(idx)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                activeSection === idx
                  ? "bg-primary/15 text-primary font-medium border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <span className="text-xs font-mono mr-2 opacity-60">{idx + 1}.</span>
              {section.section}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
