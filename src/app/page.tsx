
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, FileText, Brain, BookOpenText, Lightbulb, Code2, Star, BookMarked } from "lucide-react";
import { RandomTheoryDrop } from "@/components/content/random-theory-drop";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { HeroTextGradientStyle } from "@/components/layout/hero-text-gradient-style";
import type { Metadata } from 'next';
import { fetchBlogPosts } from "@/lib/contentful";
import { SimpleIcon } from "@/components/common/simple-icon";
import { getAllLanguages, type Language } from "@/lib/languages";
import { RoadmapCard } from "@/components/Roadmaps/RoadmapCard";

export const revalidate = 60; 

export const metadata: Metadata = {
  title: 'Nocturnal Codex - For Hackers, Theorists, Builders, Learners',
  description: 'Welcome to Nocturnal Codex, a curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world.',
};

// Placeholder since contentlayer was removed
const allRoadmaps = [
    { order: 1, url: '/roadmaps/backend', slug: 'backend', title: 'Backend Roadmap', description: "Step-by-step guide to becoming a modern backend developer.", category: 'Core', difficulty: 'Beginner', featured: true },
    { order: 2, url: '/roadmaps/frontend', slug: 'frontend', title: 'Frontend Roadmap', description: "Step-by-step guide to becoming a modern frontend developer.", category: 'Core', difficulty: 'Beginner', featured: true },
    { order: 3, url: '/roadmaps/machine-learning', slug: 'machine-learning', title: 'Machine Learning Roadmap', description: "Step-by-step guide to becoming a Machine Learning engineer.", category: 'Specialized', difficulty: 'Intermediate', featured: false },
    { order: 4, url: '/roadmaps/cybersecurity', slug: 'cybersecurity', title: 'Cybersecurity Roadmap', description: "Step-by-step guide to becoming a cybersecurity expert.", category: 'Specialized', difficulty: 'Intermediate', featured: false },
    { order: 5, url: '/roadmaps/devops', slug: 'devops', title: 'DevOps Roadmap', description: "Step-by-step guide to becoming a DevOps engineer.", category: 'Core', difficulty: 'Intermediate', featured: false },
    { order: 6, url: '/roadmaps/full-stack', slug: 'full-stack', title: 'Full Stack Roadmap', description: "Step-by-step guide to becoming a full stack developer.", category: 'Core', difficulty: 'Advanced', featured: false },
];


export default async function HomePage() {
  const recentBlogPosts = await fetchBlogPosts({ limit: 2 }) || [];
  const featuredBlogPosts = await fetchBlogPosts({ limit: 2, featured: true }) || [];
  const allLanguages = getAllLanguages();
  const featuredLanguages = allLanguages.slice(0, 6);
  const featuredRoadmaps = allRoadmaps.filter(r => r.featured);
  

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-16">
      <HeroTextGradientStyle />
      {/* Hero Section */}
      <section className="text-center py-20 md:py-28 bg-gradient-to-br from-background via-primary/10 to-accent/15 rounded-xl shadow-2xl overflow-hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/70 animate-text-gradient-flow">
            For Hackers, Theorists, Builders, Learners.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
            Welcome to Nocturnal Codex, a curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world. Explore, learn, and contribute to the collective intellect.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg hover:shadow-primary/40 transform hover:scale-105 transition-all duration-300 ease-in-out rounded-lg">
            <Link href="/roadmaps">
              Explore Roadmaps <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Random Theory Drop */}
      <section>
        <RandomTheoryDrop />
      </section>

      {/* Featured Roadmaps Section */}
      {featuredRoadmaps.length > 0 && (
      <section>
        <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-primary/70 flex items-center text-foreground/90">
            <BookMarked className="mr-3 h-7 w-7 text-primary" />
            Featured Roadmaps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
            ))}
        </div>
        {allRoadmaps && allRoadmaps.length > featuredRoadmaps.length && (
             <div className="mt-10 text-center">
                <Button asChild variant="outline" size="lg" className="hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-primary">
                    <Link href="/roadmaps">View All Roadmaps <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )}
      </section>
      )}
      
      {/* Featured Languages Section */}
      {featuredLanguages.length > 0 && (
      <section>
        <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-primary/70 flex items-center text-foreground/90">
            <Code2 className="mr-3 h-7 w-7 text-primary" />
            Featured Languages
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {featuredLanguages.map((lang: Language) => (
                <Link href={lang.url} key={lang.id} className="group block">
                    <Card className="h-full overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/60 rounded-lg">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                          <SimpleIcon iconName={lang.iconName || 'code'} className="w-12 h-12 mb-4 text-primary" />
                          <h3 className="text-base font-semibold group-hover:text-primary">{lang.name}</h3>
                      </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
        {allLanguages && allLanguages.length > 6 && (
             <div className="mt-10 text-center">
                <Button asChild variant="outline" size="lg" className="hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-primary">
                    <Link href="/languages">View All Languages <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )}
      </section>
      )}

      {/* Featured Posts Section */}
      {featuredBlogPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-primary/70 flex items-center text-foreground/90">
            <Star className="mr-3 h-7 w-7 text-primary" />
            Featured Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Main Content Sections Grid */}
      <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-border">
        {/* Recent Blog Posts Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-primary/70 flex items-center text-foreground/90"> 
            <FileText className="mr-3 h-7 w-7 text-primary" />
            Latest From The Blog
          </h2>
          <div className="space-y-10">
            {recentBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
            {recentBlogPosts.length >= 2 && ( 
               <Button asChild variant="outline" className="w-full mt-6 hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-primary"> 
                <Link href="/blog">View All Blog Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            )}
             {recentBlogPosts.length === 0 && (
              <p className="text-muted-foreground text-center py-6">No recent blog posts. Check back soon!</p>
            )}
          </div>
        </section>

        {/* Think Tank Section */}
        <section>
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center text-foreground/90">
              <Brain className="mr-3 h-7 w-7 text-accent" />
              From the Think Tank
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">In-depth research, original theories, and explorations.</p>
          </div>
          <Card className="bg-card shadow-xl border border-border/30 hover:border-accent/50 hover:shadow-accent/20 transition-all duration-300 ease-in-out rounded-xl">
             <CardContent className="p-4">
               {/* This section can be populated with Think Tank articles if desired */}
               <p className="text-muted-foreground text-center py-6">No think tank articles featured yet.</p>
                <Button asChild variant="outline" className="w-full mt-4 hover:border-accent hover:bg-accent/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-accent-foreground">
                  <Link href="/think-tank">Explore Think Tank <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
