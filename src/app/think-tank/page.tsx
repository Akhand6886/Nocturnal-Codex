
import { ThinkTankArticleCard } from "@/components/content/think-tank-article-card";
import { BrainCircuit } from "lucide-react";
import { fetchThinkTankArticles } from "@/lib/contentful";
import type { Metadata } from 'next';

import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  title: "Think Tank | Nocturnal Codex",
  description: "In-depth research articles, original theories, and explorations on the frontiers of knowledge.",
};

export default async function ThinkTankPage() {
  const { isEnabled } = await draftMode();
  const articles = await fetchThinkTankArticles({ preview: isEnabled });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-[#272727]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#E5A93C] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            RESEARCH INITIATIVE // THEORETICAL PAPERS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            Think Tank
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Rigorous research papers, foundational proofs, and investigative inquiries on computational boundaries and emergent systems.
          </p>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ThinkTankArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#272727] rounded-lg bg-[#181818]">
            <p className="text-xs font-mono text-muted-foreground">
              No research monographs currently staged. All prospective folios under formal peer review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
