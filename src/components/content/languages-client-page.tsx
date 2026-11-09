"use client";

import { Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { SimpleIcon } from '@/components/common/simple-icon';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';
import type { Language } from '@/lib/languages';

interface LanguagesClientPageProps {
  allLanguages: Language[];
}

const CATEGORIES = ["All", "General Purpose", "Systems", "Web", "Data", "Mobile"];

export function LanguagesClientPage({ allLanguages }: LanguagesClientPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredLanguages = useMemo(() => {
    if (activeCategory === "All") return allLanguages;
    return allLanguages.filter(lang => lang.category === activeCategory);
  }, [activeCategory, allLanguages]);

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count = cat === "All" 
            ? allLanguages.length 
            : allLanguages.filter(l => l.category === cat).length;
          
          if (count === 0 && cat !== "All") return null;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                  : 'bg-muted/60 border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {cat}
              <span className={`ml-2 text-[10px] ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground/70'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Language Cards Grid */}
      {filteredLanguages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredLanguages.map((lang: Language) => (
            <Link href={`/languages/${lang.slug}`} key={lang.id} className="group block h-full">
              <Card className="h-full overflow-hidden bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                <CardContent className="p-5 flex flex-col items-center text-center h-full">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl mb-3 text-primary group-hover:scale-105 transition-transform duration-200">
                    <SimpleIcon iconName={lang.iconName || 'code'} className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{lang.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{lang.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center mt-auto">
                    {lang.difficulty && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">{lang.difficulty}</span>
                    )}
                    {lang.category && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">{lang.category}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card">
          <p className="text-xs font-mono text-muted-foreground">
            No languages cataloged in this classification.
          </p>
        </div>
      )}
    </>
  );
}
