
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Compass, Rss, BookOpenText, Lightbulb, BrainCircuit, Server, Users, Search } from "lucide-react";
import { RandomTheoryDrop } from "@/components/content/random-theory-drop";
import { MOCK_WIKI_ARTICLES, MOCK_TOPICS, MOCK_PROGRAMMING_LANGUAGES, MOCK_THINK_TANK_ARTICLES } from "@/lib/data";
// HeroTextGradientStyle component is no longer needed as styles are moved to globals.css
import { TopicTile } from "@/components/content/topic-tile";
import { LanguageTile } from "@/components/content/language-tile";
import { WikiArticleLink } from "@/components/content/wiki-article-link";
import { ThinkTankArticleCard } from "@/components/content/think-tank-article-card";
import type { Metadata } from 'next';
import { client, type SanityPost } from '@/lib/sanity'; 


export const revalidate = 60; 

export const metadata: Metadata = {
  title: 'Nocturnal Codex - For Hackers, Theorists, Builders, Learners',
  description: 'Welcome to Nocturnal Codex, a curated sanctuary for deep dives into computer science, mathematics, and the theories that shape our digital world.',
};


async function getFeaturedThinkTankArticles(): Promise<typeof MOCK_THINK_TANK_ARTICLES> {
  // In a real scenario, this would fetch from a CMS or database
  return MOCK_THINK_TANK_ARTICLES.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 2);
}


export default async function HomePage() {
  // const { recentPosts: recentBlogPosts, featuredPosts: featuredBlogPosts } = await getHomepageBlogPosts();
  const featuredWikiArticles = MOCK_WIKI_ARTICLES.slice(0, 3);
  const featuredTopics = MOCK_TOPICS.slice(0, 3); 
  const featuredLanguages = MOCK_PROGRAMMING_LANGUAGES.slice(0, 4);
  const featuredThinkTankArticles = await getFeaturedThinkTankArticles();


  return (
    <div className="space-y-16 md:space-y-24">
      {/* HeroTextGradientStyle component usage removed */}

      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="relative inline-block mb-6 md:mb-8">
            <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter
                           bg-clip-text text-transparent 
                           bg-gradient-to-br from-primary via-accent to-secondary
                           dark:from-primary dark:via-accent dark:to-secondary 
                           animate-text-gradient-flow-alt" // This class now comes from globals.css
                style={{
                    WebkitTextStroke: '1px transparent', 
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
              Explore Topics <Compass className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 shadow-sm hover:shadow-md transition-shadow">
            <Link href="/blog">
              Latest Articles <Rss className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Random Theory Drop */}
      <section>
        <RandomTheoryDrop />
      </section>

      {/* Key Site Sections Grid */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-foreground/90">Dive Deeper</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:shadow-primary/20 transition-shadow duration-300 border-border/50 hover:border-primary/50 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary group-hover:text-accent-foreground transition-colors">
                <BookOpenText className="mr-3 h-7 w-7" />
                Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Explore curated knowledge domains from algorithms to AI.</p>
              <Button asChild variant="link" className="p-0 text-primary group-hover:text-accent-foreground">
                <Link href="/topics">Browse All Topics <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-accent/20 transition-shadow duration-300 border-border/50 hover:border-accent/50 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-accent group-hover:text-primary-foreground transition-colors">
                <Lightbulb className="mr-3 h-7 w-7" />
                Wiki
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Quick-reference articles on core concepts and technologies.</p>
              <Button asChild variant="link" className="p-0 text-accent group-hover:text-primary-foreground">
                <Link href="/wiki">Visit the Wiki <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-secondary/30 transition-shadow duration-300 border-border/50 hover:border-secondary/50 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-secondary-foreground group-hover:text-primary transition-colors">
                <BrainCircuit className="mr-3 h-7 w-7" />
                Think Tank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">In-depth research and theoretical explorations.</p>
              <Button asChild variant="link" className="p-0 text-secondary-foreground group-hover:text-primary">
                <Link href="/think-tank">Explore Research <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Featured Content (Example: Think Tank Articles) */}
      {featuredThinkTankArticles.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-3 border-b-2 border-primary/40 flex items-center text-foreground/90">
            <BrainCircuit className="mr-3 h-8 w-8 text-primary" />
            From the Think Tank
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {featuredThinkTankArticles.map((article) => (
              <ThinkTankArticleCard key={article.id} article={article} />
            ))}
          </div>
          {MOCK_THINK_TANK_ARTICLES.length > 2 && (
            <div className="mt-10 text-center">
                <Button asChild variant="outline" size="lg" className="hover:border-primary hover:bg-primary/10 transition-all">
                    <Link href="/think-tank">View All Research <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
           )}
        </section>
      )}


      {/* Explore Core Topics Section */}
      {featuredTopics.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-3 border-b-2 border-accent/40 flex items-center text-foreground/90">
            <Compass className="mr-3 h-8 w-8 text-accent" />
            Featured Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTopics.map((topic) => (
              <TopicTile key={topic.id} topic={topic} />
            ))}
          </div>
          {MOCK_TOPICS.length > 3 && (
              <div className="mt-10 text-center">
                  <Button asChild variant="outline" size="lg" className="hover:border-accent hover:bg-accent/10 transition-all">
                      <Link href="/topics">View All Topics <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </div>
          )}
        </section>
      )}

      {/* Explore Programming Languages Section */}
      {featuredLanguages.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-3 border-b-2 border-secondary/40 flex items-center text-foreground/90">
            <Server className="mr-3 h-8 w-8 text-secondary-foreground" /> {/* Changed Icon */}
            Featured Languages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredLanguages.map((lang) => (
              <LanguageTile key={lang.id} language={lang} />
            ))}
          </div>
          {MOCK_PROGRAMMING_LANGUAGES.length > 4 && (
              <div className="mt-10 text-center">
                  <Button asChild variant="outline" size="lg" className="hover:border-secondary hover:bg-secondary/10 transition-all">
                      <Link href="/topics">Browse All Languages <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </div>
          )}
        </section>
      )}
    </div>
  );
}
