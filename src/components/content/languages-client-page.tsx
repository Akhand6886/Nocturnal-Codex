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
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono transition-all duration-200 ${
                isActive
                  ? 'bg-[#272727] text-[#E5A93C] border border-[#383838] font-semibold'
                  : 'bg-[#181818] border border-[#272727] text-muted-foreground hover:text-foreground hover:bg-[#1F1F1F]'
              }`}
            >
              {cat}
              <span className={`ml-2 text-[10px] ${isActive ? 'text-[#E5A93C]/80' : 'text-muted-foreground/60'}`}>
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
              <Card className="h-full overflow-hidden bg-[#181818] border border-[#272727] hover:border-[#383838] hover:bg-[#1B1B1B] transition-all duration-300 ease-archive rounded-lg">
                <CardContent className="p-4 flex flex-col items-center text-center h-full">
                  <div className="p-2.5 bg-[#121212] border border-[#272727] rounded-lg mb-3 group-hover:border-[#383838] transition-colors">
                    <SimpleIcon iconName={lang.iconName || 'code'} className="w-8 h-8 text-foreground group-hover:text-[#E5A93C] transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-[#E5A93C] transition-colors mb-1">{lang.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{lang.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center mt-auto">
                    {lang.difficulty && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#121212] border border-[#272727] text-muted-foreground">{lang.difficulty}</span>
                    )}
                    {lang.category && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#121212] border border-[#272727] text-muted-foreground">{lang.category}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[#272727] rounded-lg bg-[#181818]">
          <p className="text-xs font-mono text-muted-foreground">
            No languages cataloged in this classification.
          </p>
        </div>
      )}
    </>
  );
}
