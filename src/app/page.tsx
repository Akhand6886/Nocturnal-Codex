
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, FileText, Brain, BookOpenText, Lightbulb, Code2, Star } from "lucide-react";
import { RandomTheoryDrop } from "@/components/content/random-theory-drop";
import { MOCK_WIKI_ARTICLES, MOCK_TOPICS, MOCK_PROGRAMMING_LANGUAGES } from "@/lib/data";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { WikiArticleLink } from "@/components/content/wiki-article-link";
import { HeroTextGradientStyle } from "@/components/layout/hero-text-gradient-style";
import { TopicTile } from "@/components/content/topic-tile";
import { LanguageTile } from "@/components/content/language-tile";
import type { Metadata } from 'next';
import { client, type SanityPost } from '@/lib/sanity'; // Import Sanity client and Post type

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Nocturnal Codex - For Hackers, Theorists, Builders, Learners',
  description: 'Welcome to Nocturnal Codex, a curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world.',
};

async function getHomepageBlogPosts(): Promise<{ recentPosts: SanityPost[], featuredPosts: SanityPost[] }> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, author, excerpt, mainImage{asset, alt, dataAiHint}, tags, featured
  }`;
  const allPosts = await client.fetch<SanityPost[]>(query);
  
  const recentPosts = allPosts.slice(0, 2);
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 2);
  
  return { recentPosts, featuredPosts };
}

export default async function HomePage() {
  const { recentPosts: recentBlogPosts, featuredPosts: featuredBlogPosts } = await getHomepageBlogPosts();
  
  const featuredWikiArticles = MOCK_WIKI_ARTICLES.slice(0, 3);
  const featuredTopics = MOCK_TOPICS.slice(0, 6); 
  const featuredLanguages = MOCK_PROGRAMMING_LANGUAGES.slice(0, 8);

  return (
    <div className="space-y-16">
      <HeroTextGradientStyle />
      {/* Hero Section */}
      <section className="text-center py-20 md:py-28 bg-gradient-to-br from-background via-primary/10 to-accent/15 rounded-xl shadow-2xl overflow-hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/70 animate-text-gradient-flow-alt">
            For Hackers, Theorists, Builders, Learners.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
            Welcome to Nocturnal Codex, a curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world. Explore, learn, and contribute to the collective intellect.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg hover:shadow-primary/40 transform hover:scale-105 transition-all duration-300 ease-in-out rounded-lg">
            <Link href="/topics">
              Explore Topics <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Random Theory Drop */}
      <section>
        <RandomTheoryDrop />
      </section>

      {/* Explore Core Topics Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-primary/70 flex items-center text-foreground/90">
          <BookOpenText className="mr-3 h-7 w-7 text-primary" />
          Explore Core Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTopics.map((topic) => (
            <TopicTile key={topic.id} topic={topic} />
          ))}
        </div>
        {MOCK_TOPICS.length > 6 && (
            <div className="mt-10 text-center">
                <Button asChild variant="outline" size="lg" className="hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-primary">
                    <Link href="/topics">View All Topics <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )}
      </section>

      {/* Explore Programming Languages Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-accent/70 flex items-center text-foreground/90">
          <Code2 className="mr-3 h-7 w-7 text-accent" />
          Featured Programming Languages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLanguages.map((lang) => (
            <LanguageTile key={lang.id} language={lang} />
          ))}
        </div>
        {MOCK_PROGRAMMING_LANGUAGES.length > 8 && (
            <div className="mt-10 text-center">
                <Button asChild variant="outline" size="lg" className="hover:border-accent hover:bg-accent/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-accent">
                    <Link href="/topics">View All Languages <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )}
      </section>

      {/* Featured Posts Section */}
      {featuredBlogPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-primary/70 flex items-center text-foreground/90">
            <Star className="mr-3 h-7 w-7 text-primary" />
            Featured Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogPosts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
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
              <BlogPostCard key={post._id} post={post} />
            ))}
            {recentBlogPosts.length >= 2 && ( // Show "View All" if there are 2 or more, implying there might be more than 2 total
               <Button asChild variant="outline" className="w-full mt-6 hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-primary"> 
                <Link href="/blog">View All Blog Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            )}
             {recentBlogPosts.length === 0 && (
              <p className="text-muted-foreground text-center py-6">No recent blog posts. Check back soon!</p>
            )}
          </div>
        </section>

        {/* Key Concepts from the Wiki Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-secondary/70 flex items-center text-foreground/90">
            <Lightbulb className="mr-3 h-7 w-7 text-secondary-foreground" />
            Key Concepts from the Wiki
          </h2>
          <Card className="bg-card shadow-xl border border-border/30 hover:border-secondary/50 hover:shadow-secondary/20 transition-all duration-300 ease-in-out rounded-xl">
            <CardContent className="p-4 space-y-3">
              {featuredWikiArticles.map((article) => (
                <WikiArticleLink key={article.id} article={article} />
              ))}
               {MOCK_WIKI_ARTICLES.length > 3 && (
                <Button asChild variant="outline" className="w-full mt-6 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-secondary-foreground">
                  <Link href="/wiki">Explore Full Wiki <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              )}
              {featuredWikiArticles.length === 0 && (
                 <p className="text-muted-foreground text-center py-6">No wiki articles featured yet.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
