import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, Brain, BookOpenText, Lightbulb, Code2, Star, BookMarked, Sparkles, Zap, GraduationCap, Terminal } from "lucide-react";
import { RandomTheoryDrop } from "@/components/content/random-theory-drop";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { HeroTextGradientStyle } from "@/components/layout/hero-text-gradient-style";
import type { Metadata } from 'next';
import { fetchBlogPosts, fetchThinkTankArticles } from "@/lib/contentful";
import { SimpleIcon } from "@/components/common/simple-icon";
import { getAllLanguages, type Language } from "@/lib/languages";
import { RoadmapCard } from "@/components/Roadmaps/RoadmapCard";
import { getAllRoadmaps } from "@/lib/roadmaps";
import { ThinkTankArticleCard } from "@/components/content/think-tank-article-card";
import { ParticleCanvas } from "@/components/common/particle-canvas";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { BentoGrid, BentoCard } from "@/components/common/bento-grid";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 60; 

export const metadata: Metadata = {
  title: 'Nocturnal Codex - For Hackers, Theorists, Builders, Learners',
  description: 'Welcome to Nocturnal Codex, a curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world.',
};

export default async function HomePage() {
  const recentBlogPosts = await fetchBlogPosts({ limit: 2 }) || [];
  const featuredBlogPosts = await fetchBlogPosts({ limit: 2, featured: true }) || [];
  const allLanguages = getAllLanguages();
  const featuredLanguages = allLanguages.slice(0, 6);
  const allRoadmaps = getAllRoadmaps();
  const featuredRoadmaps = allRoadmaps.filter(r => r.featured);
  const recentThinkTankArticles = await fetchThinkTankArticles({ limit: 2 }) || [];
  

  return (
    <div className="space-y-0">
      <HeroTextGradientStyle />
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Particle constellation background */}
        <ParticleCanvas className="z-0" />
        
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-accent/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[200px] pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none" />

        <div className="relative container mx-auto px-4 z-10 text-center">
          {/* Status badge */}
          <ScrollReveal animation="fade-in" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs font-mono uppercase tracking-widest text-primary mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              SYSTEM ONLINE // V3.0
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal animation="fade-up" delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 leading-[0.95]">
              <span className="gradient-text-glow">For </span>
              <span className="font-serif italic font-semibold text-foreground">Hackers</span>
              <span className="gradient-text-glow">, </span>
              <span className="font-serif italic font-semibold text-foreground">Theorists</span>
              <span className="gradient-text-glow">,</span>
              <br className="hidden md:block" />
              <span className="font-serif italic font-semibold text-foreground"> Builders</span>
              <span className="gradient-text-glow">, & Learners.</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal animation="fade-up" delay={300}>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A curated sanctuary for deep dives into computer science, mathematics, 
              and the theories that shape our digital world.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal animation="fade-up" delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all duration-300">
                <Link href="/roadmaps" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Explore Roadmaps
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl px-8 border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <Link href="/blog" className="flex items-center gap-2">
                  Read the Blog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-20">

        {/* ===== BENTO GRID OVERVIEW ===== */}
        <ScrollReveal animation="fade-up">
          <BentoGrid className="lg:grid-cols-4 auto-rows-[180px]">
            {/* Theory Drop — wide card */}
            <BentoCard colSpan={2} rowSpan={2} glowColor="purple" className="p-0">
              <div className="h-full flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <span className="text-xs font-mono uppercase tracking-widest text-accent">Theory Drop</span>
                  </div>
                  <RandomTheoryDrop variant="inline" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-4">
                  <Zap className="h-3 w-3" />
                  Refreshes on every visit
                </div>
              </div>
            </BentoCard>

            {/* Quick Stats */}
            <BentoCard glowColor="cyan">
              <Link href="/roadmaps" className="block h-full p-6">
                <div className="flex flex-col justify-between h-full">
                  <BookMarked className="h-8 w-8 text-primary mb-3" />
                  <div>
                    <p className="text-3xl font-extrabold text-foreground">{allRoadmaps.length}</p>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">Learning Paths</p>
                  </div>
                </div>
              </Link>
            </BentoCard>

            <BentoCard glowColor="cyan">
              <Link href="/languages" className="block h-full p-6">
                <div className="flex flex-col justify-between h-full">
                  <Code2 className="h-8 w-8 text-accent mb-3" />
                  <div>
                    <p className="text-3xl font-extrabold text-foreground">{allLanguages.length}</p>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">Languages</p>
                  </div>
                </div>
              </Link>
            </BentoCard>

            <BentoCard glowColor="purple">
              <Link href="/projects" className="block h-full p-6">
                <div className="flex flex-col justify-between h-full">
                  <Terminal className="h-8 w-8 text-primary mb-3" />
                  <div>
                    <p className="text-sm font-bold text-foreground">Open Source</p>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">Projects</p>
                  </div>
                </div>
              </Link>
            </BentoCard>

            <BentoCard glowColor="cyan">
              <Link href="/mathematics" className="block h-full p-6">
                <div className="flex flex-col justify-between h-full">
                  <GraduationCap className="h-8 w-8 text-accent mb-3" />
                  <div>
                    <p className="text-sm font-bold text-foreground">Mathematics</p>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">Curriculum</p>
                  </div>
                </div>
              </Link>
            </BentoCard>
          </BentoGrid>
        </ScrollReveal>

        {/* ===== FEATURED ROADMAPS ===== */}
        {featuredRoadmaps.length > 0 && (
          <ScrollReveal animation="fade-up">
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Featured Roadmaps
                  </h2>
                </div>
                {allRoadmaps && allRoadmaps.length > featuredRoadmaps.length && (
                  <Link href="/roadmaps" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 font-medium">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {featuredRoadmaps.map((roadmap, i) => (
                  <ScrollReveal key={roadmap.slug} animation="fade-up" delay={i * 100}>
                    <RoadmapCard roadmap={roadmap} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ===== FEATURED LANGUAGES ===== */}
        {featuredLanguages.length > 0 && (
          <ScrollReveal animation="fade-up">
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Featured Languages
                  </h2>
                </div>
                {allLanguages && allLanguages.length > 6 && (
                  <Link href="/languages" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 font-medium">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {featuredLanguages.map((lang: Language, i) => (
                  <ScrollReveal key={lang.id} animation="scale-in" delay={i * 80}>
                    <Link href={lang.url} className="group block">
                      <div className="glass rounded-xl p-5 flex flex-col items-center text-center border border-border/20 hover:border-primary/40 hover:neon-border-purple transition-all duration-500 transform hover:-translate-y-1">
                        <SimpleIcon iconName={lang.iconName || 'code'} className="w-10 h-10 mb-3 text-primary group-hover:text-accent transition-colors duration-300" />
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{lang.name}</h3>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ===== FEATURED INSIGHTS ===== */}
        {featuredBlogPosts.length > 0 && (
          <ScrollReveal animation="fade-up">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Featured Insights
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredBlogPosts.map((post, i) => (
                  <ScrollReveal key={post.id} animation="fade-up" delay={i * 150}>
                    <BlogPostCard post={post} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ===== BLOG + THINK TANK SPLIT ===== */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Recent Blog Posts */}
          <ScrollReveal animation="slide-left">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
                <h2 className="text-2xl font-bold text-foreground">
                  Latest Posts
                </h2>
              </div>
              <div className="space-y-6">
                {recentBlogPosts.length > 0 ? (
                  <>
                    {recentBlogPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                    <Button asChild variant="outline" className="w-full rounded-xl border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                      <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </>
                ) : (
                  <div className="glass rounded-xl p-8 text-center">
                    <p className="text-muted-foreground">No recent posts. Check back soon!</p>
                  </div>
                )}
              </div>
            </section>
          </ScrollReveal>

          {/* Think Tank */}
          <ScrollReveal animation="slide-right">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
                <h2 className="text-2xl font-bold text-foreground">
                  Think Tank
                </h2>
              </div>
              <div className="space-y-6">
                {recentThinkTankArticles.length > 0 ? (
                  <>
                    {recentThinkTankArticles.map((article) => (
                      <ThinkTankArticleCard key={article.id} article={article} />
                    ))}
                    <Button asChild variant="outline" className="w-full rounded-xl border-border/30 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300">
                      <Link href="/think-tank">Explore Think Tank <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </>
                ) : (
                  <div className="glass rounded-xl p-8 text-center">
                    <p className="text-muted-foreground">No think tank articles yet.</p>
                    <Button asChild variant="outline" className="mt-4 rounded-xl border-border/30 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300">
                      <Link href="/think-tank">Explore Think Tank <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}