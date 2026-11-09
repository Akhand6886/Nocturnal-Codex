import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, Brain, Code2, BookMarked, Sigma, Rocket, Github, ExternalLink } from "lucide-react";
import { RandomTheoryDrop } from "@/components/content/random-theory-drop";
import { BlogPostCard } from "@/components/content/blog-post-card";
import type { Metadata } from 'next';
import { fetchBlogPosts, fetchThinkTankArticles } from "@/lib/contentful";
import { SimpleIcon } from "@/components/common/simple-icon";
import { getAllLanguages, type Language } from "@/lib/languages";
import { RoadmapCard } from "@/components/Roadmaps/RoadmapCard";
import { getAllRoadmaps } from "@/lib/roadmaps";
import { getAllMathDomains, type MathDomain } from "@/lib/mathematics";
import { getAllProjects, type Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { ThinkTankArticleCard } from "@/components/content/think-tank-article-card";

export const revalidate = 60; 

export const metadata: Metadata = {
  title: 'Nocturnal Codex — Digital Knowledge Sanctuary',
  description: 'A curated knowledge sanctuary and archive for deep dives into computer science, systems architecture, mathematics, and foundational engineering theory.',
};

export default async function HomePage() {
  const recentBlogPosts = await fetchBlogPosts({ limit: 2 }) || [];
  const featuredBlogPosts = await fetchBlogPosts({ limit: 2, featured: true }) || [];
  const allLanguages = getAllLanguages();
  const featuredLanguages = allLanguages.slice(0, 12);
  const allRoadmaps = getAllRoadmaps();
  const featuredRoadmaps = allRoadmaps.filter(r => r.featured);
  const recentThinkTankArticles = await fetchThinkTankArticles({ limit: 2 }) || [];
  const allMathDomains = getAllMathDomains();
  const featuredMathDomains = allMathDomains.slice(0, 4);
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-16 max-w-7xl">
      {/* ===== HERO SECTION — ATMOSPHERIC ARCHIVE MASTER ===== */}
      <section className="relative rounded-lg border border-border bg-[#181818] p-6 sm:p-10 md:p-14 overflow-hidden">
        {/* Archival System Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#272727] text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="tracking-widest uppercase text-foreground">SYSTEM ARCHIVE // 2026.NC</span>
          </div>
          <span className="text-[11px] tracking-wider text-muted-foreground uppercase">
            CURATED SANCTUARY FOR DEEP ENGINEERING
          </span>
        </div>

        {/* Master Typography */}
        <div className="pt-8 max-w-4xl space-y-5">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.12] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#EDEDED] to-[#888888]">
            For hackers, theorists, builders, & lifelong learners.
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-sans">
            Welcome to Nocturnal Codex — a digital knowledge archive engineered for disciplined deep dives into low-level systems, mathematical foundations, developer roadmaps, and open-source contribution.
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Button asChild size="default" className="font-semibold shadow-sm">
              <Link href="/roadmaps" className="flex items-center gap-2">
                Explore Roadmaps <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/languages">
                Language Index
              </Link>
            </Button>
            <Button asChild variant="ghost" size="default" className="text-muted-foreground hover:text-foreground">
              <Link href="/about">
                Codex Manifesto
              </Link>
            </Button>
          </div>
        </div>

        {/* Technical Archive Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-10 border-t border-[#272727]">
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-muted-foreground">01 // ROADMAPS</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">09 Pathways</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-muted-foreground">02 // LANGUAGES</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">22 Curricula</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-muted-foreground">03 // LESSONS</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">400+ Modules</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-muted-foreground">04 // OPEN SOURCE</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">75+ Repos</div>
          </div>
        </div>
      </section>

      {/* ===== 1. FEATURED ROADMAPS (Interactive HUD) ===== */}
      {featuredRoadmaps.length > 0 && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#272727] gap-3">
            <div>
              <div className="text-[11px] font-mono text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>PATHWAY DIRECTORY // 09 TRACKS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Featured Roadmaps
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Curated, step-by-step pathways through computer science, engineering, and architecture.
              </p>
            </div>
            {allRoadmaps && allRoadmaps.length > featuredRoadmaps.length && (
              <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground self-start sm:self-auto">
                <Link href="/roadmaps" className="flex items-center gap-1.5">
                  All Roadmaps ({allRoadmaps.length}) <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featuredRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
            ))}
          </div>
        </section>
      )}

      {/* ===== 2. CODEX AXIOM TERMINAL ===== */}
      <section>
        <RandomTheoryDrop />
      </section>

      {/* ===== 3. PROGRAMMING LANGUAGE COMPENDIUM ===== */}
      {featuredLanguages.length > 0 && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#272727] gap-3">
            <div>
              <div className="text-[11px] font-mono text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>COMPENDIUM // 22 LANGUAGES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Programming Language Curricula
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Deep dives into systems programming, functional paradigms, memory management, and runtimes.
              </p>
            </div>
            {allLanguages && allLanguages.length > featuredLanguages.length && (
              <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground self-start sm:self-auto">
                <Link href="/languages" className="flex items-center gap-1.5">
                  All Languages ({allLanguages.length}) <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featuredLanguages.map((lang: Language) => (
              <Link href={lang.url} key={lang.id} className="group block">
                <div className="h-full p-4 rounded-md border border-[#272727] bg-[#181818] hover:bg-[#1C1C1C] hover:border-[#383838] transition-all duration-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <SimpleIcon iconName={lang.iconName || 'code'} className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{lang.name}</h3>
                    <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider block mt-0.5 truncate">
                      {lang.difficulty || 'Systems'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== 4. MATHEMATICAL FOUNDATIONS ===== */}
      {featuredMathDomains.length > 0 && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#272727] gap-3">
            <div>
              <div className="text-[11px] font-mono text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>FORMAL THEORY // MATHEMATICS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Mathematical Foundations
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Rigorous theory powering modern algorithms, cryptography, optimization, and machine learning.
              </p>
            </div>
            {allMathDomains.length > featuredMathDomains.length && (
              <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground self-start sm:self-auto">
                <Link href="/mathematics" className="flex items-center gap-1.5">
                  All Domains ({allMathDomains.length}) <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredMathDomains.map((math: MathDomain) => (
              <Link href={math.url} key={math.slug} className="group block h-full">
                <div className="h-full p-5 rounded-md border border-[#272727] bg-[#181818] hover:bg-[#1C1C1C] hover:border-[#383838] transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded bg-[#121212] border border-[#272727] flex items-center justify-center text-primary font-mono text-sm mb-3 group-hover:border-primary/40 transition-colors">
                      ∑
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">{math.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{math.description}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#272727] flex items-center justify-between text-[11px] font-mono text-muted-foreground group-hover:text-foreground">
                    <span>Explore domain</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== 5. OPEN SOURCE CONTRIBUTION SANCTUARY ===== */}
      {featuredProjects.length > 0 && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#272727] gap-3">
            <div>
              <div className="text-[11px] font-mono text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>PRACTICE // 75+ REPOSITORIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Open Source Projects
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Curated beginner and intermediate repositories to bridge theory with production code contributions.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground self-start sm:self-auto">
              <Link href="/projects" className="flex items-center gap-1.5">
                All Repositories ({allProjects.length}) <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProjects.map((project: Project) => (
              <div key={project.id} className="p-5 rounded-md border border-[#272727] bg-[#181818] flex flex-col justify-between hover:border-[#383838] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {project.language}
                    </span>
                    <Badge variant={
                      project.difficulty === 'Beginner' ? 'secondary' : 
                      project.difficulty === 'Intermediate' ? 'default' : 'destructive'
                    } className="text-[10px]">
                      {project.difficulty}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{project.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#121212] border border-[#272727] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-[#272727] grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" size="sm" className="w-full text-xs h-8">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1.5 h-3.5 w-3.5" />
                      Repository
                    </a>
                  </Button>
                  <Button asChild size="sm" className="w-full text-xs h-8">
                    <a href={project.goodFirstIssuesUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Issues
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== 6. CODEX PUBLICATIONS: BLOG & THINK TANK ===== */}
      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-[#272727]">
        {/* Recent Blog Posts Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#272727]">
            <div>
              <div className="text-[10px] font-mono text-primary uppercase tracking-widest">PUBLICATIONS // BLOG</div>
              <h2 className="text-xl font-semibold text-foreground mt-0.5">Technical Insights</h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground">
              <Link href="/blog">All Posts <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentBlogPosts.length > 0 ? (
              recentBlogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="p-8 rounded-md border border-[#272727] bg-[#181818] text-center">
                <FileText className="w-6 h-6 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground font-mono">No recent blog posts published. Check back soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Think Tank Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#272727]">
            <div>
              <div className="text-[10px] font-mono text-primary uppercase tracking-widest">RESEARCH // WHITE PAPERS</div>
              <h2 className="text-xl font-semibold text-foreground mt-0.5">Think Tank Articles</h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground">
              <Link href="/think-tank">All Papers <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentThinkTankArticles.length > 0 ? (
              recentThinkTankArticles.map((article) => (
                <ThinkTankArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="p-8 rounded-md border border-[#272727] bg-[#181818] text-center">
                <Brain className="w-6 h-6 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground font-mono">No think tank papers published yet. Check back soon.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
