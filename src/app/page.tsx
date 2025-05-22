
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, FileText, Brain } from "lucide-react";
import { RandomTheoryDrop } from "@/components/content/random-theory-drop";
import { MOCK_BLOG_POSTS, MOCK_WIKI_ARTICLES } from "@/lib/data";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { WikiArticleLink } from "@/components/content/wiki-article-link";
import { HeroTextGradientStyle } from "@/components/layout/hero-text-gradient-style";

export default function HomePage() {
  const recentBlogPosts = MOCK_BLOG_POSTS.slice(0, 2);
  const featuredWikiArticles = MOCK_WIKI_ARTICLES.slice(0, 3);

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

      {/* Main Content Sections */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Recent Blog Posts Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-primary/70 flex items-center text-foreground/90">
            <FileText className="mr-3 h-7 w-7 text-primary" />
            Recent Blog Posts
          </h2>
          <div className="space-y-10">
            {recentBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
            {MOCK_BLOG_POSTS.length > 2 && (
               <Button asChild variant="outline" className="w-full mt-6 hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-primary">
                <Link href="/blog">View All Blog Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            )}
          </div>
        </section>

        {/* Featured Wiki Articles Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-accent/70 flex items-center text-foreground/90">
            <Brain className="mr-3 h-7 w-7 text-accent" />
            Featured Wiki Articles
          </h2>
          <Card className="bg-card shadow-xl border border-border/30 hover:border-accent/50 hover:shadow-accent/20 transition-all duration-300 ease-in-out rounded-xl">
            <CardContent className="p-4 space-y-3">
              {featuredWikiArticles.map((article) => (
                <WikiArticleLink key={article.id} article={article} />
              ))}
               {MOCK_WIKI_ARTICLES.length > 3 && (
                <Button asChild variant="outline" className="w-full mt-6 hover:border-accent hover:bg-accent/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-accent">
                  <Link href="/wiki">Explore Full Wiki <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
