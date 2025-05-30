
import { MOCK_TOPICS, type SubTopic, type Tutorial, type WikiArticleStub, type ThinkTankArticleStub, type CodeSnippetItem } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeSnippet } from "@/components/content/code-snippet";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, Code2, GraduationCap, LinkIcon, Brain } from "lucide-react"; // Added Brain
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  return MOCK_TOPICS.map((topic) => ({
    topicSlug: topic.slug,
  }));
}

interface TopicPageProps {
  params: { topicSlug: string };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = MOCK_TOPICS.find((t) => t.slug === params.topicSlug);

  if (!topic) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Topic Not Found</h1>
        <p className="text-muted-foreground">The requested topic could not be found.</p>
        <Link href="/topics" className="text-primary hover:underline mt-4 inline-block">
          Back to Topics
        </Link>
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Topics", href: "/topics" },
    { label: topic.name },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="pb-6 border-b border-border">
        {topic.imageUrl && (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 shadow-lg">
            <Image src={topic.imageUrl} alt={topic.name} layout="fill" objectFit="cover" data-ai-hint={topic.dataAiHint || "topic banner"} />
            <div className="absolute inset-0 bg-black/50 flex items-end p-6">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{topic.name}</h1>
            </div>
          </div>
        )}
        {!topic.imageUrl && <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">{topic.name}</h1>}
        <p className="mt-2 text-lg text-muted-foreground">{topic.longDescription || topic.description}</p>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {topic.tutorials && topic.tutorials.length > 0 && <TabsTrigger value="tutorials">Tutorials</TabsTrigger>}
          {topic.references && topic.references.length > 0 && <TabsTrigger value="references">References</TabsTrigger>}
          {topic.thinkTankArticles && topic.thinkTankArticles.length > 0 && <TabsTrigger value="research">Research</TabsTrigger>}
          {topic.codeSnippets && topic.codeSnippets.length > 0 && <TabsTrigger value="code">Code</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl"><BookOpen className="mr-2 h-6 w-6 text-primary" /> Subtopics</CardTitle>
            </CardHeader>
            <CardContent>
              {topic.subtopics && topic.subtopics.length > 0 ? (
                <ul className="space-y-3">
                  {topic.subtopics.map((sub: SubTopic) => (
                    <li key={sub.id} className="p-3 rounded-md hover:bg-accent/50 transition-colors border border-transparent hover:border-accent">
                      <h3 className="font-semibold text-lg text-foreground/90">{sub.name}</h3>
                      {sub.description && <p className="text-sm text-muted-foreground mt-1">{sub.description}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No subtopics available for this topic yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {topic.tutorials && topic.tutorials.length > 0 && (
          <TabsContent value="tutorials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><GraduationCap className="mr-2 h-6 w-6 text-primary" /> Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topic.tutorials.map((tut: Tutorial) => (
                    <li key={tut.id}>
                      <Link href={tut.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors border border-transparent hover:border-accent">
                        <div>
                          <h4 className="font-medium text-foreground/90 group-hover:text-accent-foreground">{tut.title}</h4>
                          <p className="text-xs text-muted-foreground">Source: {tut.sourceName}</p>
                        </div>
                        <LinkIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground"/>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {topic.references && topic.references.length > 0 && (
          <TabsContent value="references">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Lightbulb className="mr-2 h-6 w-6 text-primary" /> Wiki-Style References</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topic.references.map((ref: WikiArticleStub) => (
                     <li key={ref.id}>
                      <Link href={`/wiki/${ref.slug}`} className="group flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors border border-transparent hover:border-accent">
                        <span className="font-medium text-foreground/90 group-hover:text-accent-foreground">{ref.title}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity"/>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {topic.thinkTankArticles && topic.thinkTankArticles.length > 0 && (
           <TabsContent value="research">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Brain className="mr-2 h-6 w-6 text-primary" /> Think Tank Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topic.thinkTankArticles.map((article: ThinkTankArticleStub) => (
                     <li key={article.id}>
                      <Link href={`/think-tank/${article.slug}`} className="group flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors border border-transparent hover:border-accent">
                        <span className="font-medium text-foreground/90 group-hover:text-accent-foreground">{article.title}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity"/>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {topic.codeSnippets && topic.codeSnippets.length > 0 && (
          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Code2 className="mr-2 h-6 w-6 text-primary" /> Code Snippets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topic.codeSnippets.map((snippet: CodeSnippetItem) => (
                  <CodeSnippet 
                    key={snippet.id} 
                    code={snippet.code} 
                    language={snippet.language} 
                    title={snippet.title}
                    description={snippet.description}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}
        {( (topic.tutorials && topic.tutorials.length === 0) &&
           (topic.references && topic.references.length === 0) &&
           (topic.thinkTankArticles && topic.thinkTankArticles.length === 0) &&
           (topic.codeSnippets && topic.codeSnippets.length === 0) &&
           (!topic.subtopics || topic.subtopics.length === 0)
        ) && (
          <TabsContent value="overview">
             <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Content Coming Soon!</AlertTitle>
              <AlertDescription>
                This topic is currently under development. Check back soon for more content.
              </AlertDescription>
            </Alert>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export async function generateMetadata({ params }: TopicPageProps) {
  const topic = MOCK_TOPICS.find((t) => t.slug === params.topicSlug);
  if (!topic) {
    return { title: "Topic Not Found | Nocturnal Codex" };
  }
  return {
    title: `${topic.name} | Nocturnal Codex`,
    description: topic.description,
  };
}
