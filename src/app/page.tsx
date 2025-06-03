
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, FileText, Brain, BookOpenText, Search, Lightbulb } from "lucide-react"; // Added BookOpenText, Search, Lightbulb
import { RandomTheoryDrop } from "@/components/content/random-theory-drop";
import { MOCK_WIKI_ARTICLES, MOCK_TOPICS } from "@/lib/data"; 
import { BlogPostCard } from "@/components/content/blog-post-card";
import { WikiArticleLink } from "@/components/content/wiki-article-link";
import { HeroTextGradientStyle } from "@/components/layout/hero-text-gradient-style";
import { allBlogPosts, type BlogPost } from "contentlayer/generated";
import { compareDesc } from 'date-fns';
import { Input } from "@/components/ui/input"; // Added Input
import { TopicTile } from "@/components/content/topic-tile"; // Added TopicTile

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const sortedBlogPosts = allBlogPosts.sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const recentBlogPosts = sortedBlogPosts.slice(0, 2);
  const featuredWikiArticles = MOCK_WIKI_ARTICLES.slice(0, 3); 
  const featuredTopics = MOCK_TOPICS.slice(0, 3); // Select 3 topics to feature

  return (
    <div className="space-y-16">
      <HeroTextGradientStyle />
      {/* Hero Section */}
      <section className="text-center py-20 md:py-28 bg-gradient-to-br from-background via-primary/10 to-accent/15 rounded-xl shadow-2xl overflow-hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/70 animate-text-gradient-flow-alt">
            Dive Deep into CS & Theory.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
            Explore a curated sanctuary of knowledge in computer science, mathematics, and the theories shaping our digital world.
          </p>
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 mb-10 px-4 sm:px-0">
            <Input 
              type="search" 
              placeholder="Search topics, articles, concepts..." 
              className="h-12 text-base bg-background/80 border-border focus:border-primary"
              aria-label="Search content"
            />
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg hover:shadow-primary/40 transform hover:scale-105 transition-all duration-300 ease-in-out rounded-lg">
              <Link href="/topics"> {/* For now, search button links to topics */}
                <Search className="mr-2 h-5 w-5" /> Explore
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Or jump directly to <Link href="/blog" className="text-primary hover:underline">our blog</Link> or <Link href="/wiki" className="text-primary hover:underline">the wiki</Link>.
          </p>
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
        {MOCK_TOPICS.length > 3 && (
            <div className="mt-10 text-center">
                <Button asChild variant="outline" size="lg" className="hover:border-primary hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-primary">
                    <Link href="/topics">View All Topics <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )}
      </section>

      {/* Main Content Sections Grid */}
      <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-border">
        {/* Recent Blog Posts Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2 border-accent/70 flex items-center text-foreground/90">
            <FileText className="mr-3 h-7 w-7 text-accent" />
            Latest From The Blog
          </h2>
          <div className="space-y-10">
            {recentBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} /> 
            ))}
            {allBlogPosts.length > 2 && (
               <Button asChild variant="outline" className="w-full mt-6 hover:border-accent hover:bg-accent/10 transition-all duration-300 ease-in-out rounded-lg text-foreground/80 hover:text-accent">
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
            <Lightbulb className="mr-3 h-7 w-7 text-secondary-foreground" /> {/* Changed icon and color */}
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
