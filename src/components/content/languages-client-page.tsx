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
      <div className="flex flex-wrap gap-2 mt-8 mb-10">
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
              <span className={`ml-2 text-xs ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Language Cards Grid */}
      {filteredLanguages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredLanguages.map((lang: Language) => (
            <Link href={`/languages/${lang.slug}`} key={lang.id} className="group block">
              <Card className="h-full overflow-hidden shadow-md hover:shadow-primary/15 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/40 rounded-lg">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="p-2.5 bg-primary/10 rounded-lg mb-3">
                    <SimpleIcon iconName={lang.iconName || 'code'} className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors mb-1.5">{lang.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{lang.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {lang.difficulty && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">{lang.difficulty}</Badge>
                    )}
                    {lang.category && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">{lang.category}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">
          No languages found in this category.
        </p>
      )}
    </>
  );
}
