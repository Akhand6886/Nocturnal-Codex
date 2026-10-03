
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Roadmap {
    title: string;
    description?: string;
    category: string;
    difficulty: string;
    featured: boolean;
    imageUrl?: string;
    order: number;
    url: string;
    slug: string;
    topicCount?: number;
    chapterCount?: number;
}

interface RoadmapCardProps {
  roadmap: Roadmap;
  featured?: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  Core: '🏗️',
  Specialization: '🎯',
  Specialized: '🧬',
  Infrastructure: '⚙️',
  Security: '🔒',
  'AI/ML': '🧠',
  Creative: '🎮',
  Mobile: '📱',
  Embedded: '🔌',
};

const DOMAIN_GRADIENTS: Record<string, string> = {
  frontend: 'from-orange-500/10 via-amber-500/5 to-transparent',
  backend: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  'full-stack': 'from-blue-500/10 via-indigo-500/5 to-transparent',
  'machine-learning': 'from-violet-500/10 via-purple-500/5 to-transparent',
  devops: 'from-cyan-500/10 via-sky-500/5 to-transparent',
  cybersecurity: 'from-red-500/10 via-rose-500/5 to-transparent',
  'game-development': 'from-pink-500/10 via-fuchsia-500/5 to-transparent',
  'mobile-development': 'from-lime-500/10 via-green-500/5 to-transparent',
  'embedded-systems': 'from-yellow-500/10 via-orange-500/5 to-transparent',
};

const DOMAIN_PATTERNS: Record<string, string> = {
  frontend: '◇ ◈ ◇ ◈ ◇',
  backend: '⬡ ⬢ ⬡ ⬢ ⬡',
  'full-stack': '◉ ○ ◉ ○ ◉',
  'machine-learning': '∑ ∫ ∂ ∇ Δ',
  devops: '⊕ ⊗ ⊕ ⊗ ⊕',
  cybersecurity: '⌿ ⊘ ⌿ ⊘ ⌿',
  'game-development': '▲ ● ■ ▲ ●',
  'mobile-development': '⬦ ◇ ⬦ ◇ ⬦',
  'embedded-systems': '⏣ ⎔ ⏣ ⎔ ⏣',
};

export function RoadmapCard({ roadmap, featured }: RoadmapCardProps) {
  const gradient = DOMAIN_GRADIENTS[roadmap.slug] || 'from-primary/10 via-primary/5 to-transparent';
  const pattern = DOMAIN_PATTERNS[roadmap.slug] || '◆ ◇ ◆ ◇ ◆';
  const categoryIcon = CATEGORY_ICONS[roadmap.category] || '📘';
  const topicCount = roadmap.topicCount || 0;
  const chapterCount = roadmap.chapterCount || 0;

  return (
    <Link href={roadmap.url} className="group block h-full">
      <div className={`
        h-full flex flex-col overflow-hidden transition-all duration-500 ease-out
        rounded-2xl border border-border/50 hover:border-border
        bg-card hover:shadow-lg hover:shadow-black/5
        dark:hover:shadow-black/20
      `}>
        {/* Header: Icon + Stats */}
        <div className="flex items-center justify-between px-6 pt-5 pb-0">
          <span className="text-2xl">{categoryIcon}</span>
          <span className="text-[11px] font-mono tracking-wider text-muted-foreground/60 uppercase">
            {chapterCount > 0 && <>{chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'} · </>}
            {topicCount} {topicCount === 1 ? 'topic' : 'topics'}
          </span>
        </div>

        {/* Visual Pattern Area */}
        <div className={`
          mx-6 mt-4 h-36 rounded-xl bg-gradient-to-br ${gradient}
          border border-border/30 flex items-center justify-center relative overflow-hidden
          transition-all duration-500 group-hover:scale-[1.02]
        `}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#00000006_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:16px_16px]" />
          <span className="text-2xl font-mono text-muted-foreground/20 tracking-[0.5em] select-none relative z-10">
            {pattern}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-6 pt-5 pb-6">
          <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
            {roadmap.title}
          </h3>

          {roadmap.description && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">
              {roadmap.description}
            </p>
          )}

          {/* CTA */}
          <div className="mt-auto pt-5 flex items-center justify-between">
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Explore the roadmap
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
