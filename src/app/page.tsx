
import Link from "next/link";
import { client, type SanityPost, urlFor } from "@/lib/sanity";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { HeroTextGradientStyle } from "@/components/layout/hero-text-gradient-style";
import { ArrowRight, BookOpenText, Library, BrainCircuit, Rss } from "lucide-react";
import Image from "next/image";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Nocturnal Codex - For Hackers, Theorists, Builders, Learners',
  description: 'Welcome to Nocturnal Codex, a curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world.',
};

const FEATURED_POSTS_QUERY = `*[
  _type == "post" &&
  featured == true &&
  defined(slug.current)
] | order(publishedAt desc) [0...3] {
  _id, title, slug, publishedAt, excerpt, author, tags, category,
  "mainImage": mainImage{asset, alt, dataAiHint, "lqip": asset->metadata.lqip}
}`;

const LATEST_POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
] | order(publishedAt desc) [0...6] {
  _id, title, slug, publishedAt, excerpt, author, tags, category,
  "mainImage": mainImage{asset, alt, dataAiHint, "lqip": asset->metadata.lqip}
}`;

interface HomePageData {
  featuredPosts: SanityPost[];
  latestPosts: SanityPost[];
}

async function getHomePageData(): Promise<HomePageData> {
  const [featuredPosts, latestPosts] = await Promise.all([
    client.fetch<SanityPost[]>(FEATURED_POSTS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<SanityPost[]>(LATEST_POSTS_QUERY, {}, { next: { revalidate: 60 } })
  ]);
  return { featuredPosts, latestPosts };
}

export default async function HomePage() {
  const { featuredPosts, latestPosts } = await getHomePageData();

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroTextGradientStyle /> {/* For the animated gradient text */}

      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="relative inline-block mb-6 md:mb-8">
            <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter
                           bg-clip-text text-transparent 
                           bg-gradient-to-br from-primary via-accent to-secondary
                           dark:from-primary dark:via-accent dark:to-secondary 
                           animate-text-gradient-flow-alt"
                style={{
                    WebkitTextStroke: '1px transparent', // For Safari
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                }}
            >
            Nocturnal Codex
            </h1>
        </div>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 md:mb-10">
          For Hackers, Theorists, Builders, Learners. A curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6 shadow-lg hover:shadow-primary/40 transition-shadow">
            <Link href="/topics">
              Explore Topics <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 shadow-sm hover:shadow-md transition-shadow">
            <Link href="/blog">
              Latest Articles <Rss className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center text-foreground">
            Featured Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Dive Deeper Section */}
      <section className="py-12 bg-muted/50 rounded-xl shadow-inner">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center text-foreground">
            Dive Deeper
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/topics" className="group">
              <Card className="h-full hover:shadow-xl hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <CardHeader className="flex-row items-center gap-4 pb-3">
                  <BookOpenText className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl group-hover:text-primary">Explore Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Curated knowledge domains in CS, math, and theory. Start your journey here.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/wiki" className="group">
              <Card className="h-full hover:shadow-xl hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <CardHeader className="flex-row items-center gap-4 pb-3">
                  <Library className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl group-hover:text-primary">Consult the Archives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Find reference-style articles, definitions, and quick explanations in our Wiki.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/think-tank" className="group">
              <Card className="h-full hover:shadow-xl hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <CardHeader className="flex-row items-center gap-4 pb-3">
                  <BrainCircuit className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl group-hover:text-primary">Theoretical Explorations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Delve into long-form research and discussions on the frontiers of knowledge.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      {latestPosts && latestPosts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Recent Musings
            </h2>
            <Button asChild variant="link" className="text-primary hover:text-primary/80">
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

