

import { MOCK_PROGRAMMING_LANGUAGES, type ProgrammingLanguage, type CodeSnippetItem, type Tutorial, type WikiArticleStub } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeSnippet } from "@/components/content/code-snippet";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Lightbulb, Code2, GraduationCap, ExternalLink, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import { Button } from "@/components/ui/button";
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds


interface LanguagePageProps {
  params: { languageSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getLanguage(slug: string): Promise<ProgrammingLanguage | undefined> {
  return MOCK_PROGRAMMING_LANGUAGES.find((lang) => lang.slug === slug);
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const language = await getLanguage(params.languageSlug);
  if (!language) {
    return { title: "Language Not Found | Nocturnal Codex" };
  }
  return {
    title: `${language.name} Language | Nocturnal Codex`,
    description: language.longDescription || `Learn about the ${language.name} programming language.`,
  };
}


export default async function LanguagePage({ params, searchParams }: LanguagePageProps) {
  const language = await getLanguage(params.languageSlug);

  if (!language) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Languages", href: "/topics" }, 
    { label: language.name },
  ];

  // Determine active tabs based on content
  const hasIntroduction = !!language.mainContent;
  const hasCoreConcepts = language.sections && language.sections.length > 0;
  const hasExamples = language.codeSnippets && language.codeSnippets.length > 0;
  const hasTutorialsTab = language.tutorials && language.tutorials.length > 0; 
  const hasResources = (language.relatedWikiArticles && language.relatedWikiArticles.length > 0) || language.officialDocumentationUrl;
  
  const tabQuery = searchParams?.tab as string; 
  
  let defaultTabValue = "introduction"; 

  if (tabQuery) {
    if (tabQuery === "introduction" && hasIntroduction) defaultTabValue = "introduction";
    else if (tabQuery === "core-concepts" && hasCoreConcepts) defaultTabValue = "core-concepts";
    else if (tabQuery === "examples" && hasExamples) defaultTabValue = "examples";
    else if (tabQuery === "tutorials" && hasTutorialsTab) defaultTabValue = "tutorials";
    else if (tabQuery === "resources" && hasResources) defaultTabValue = "resources";
  } else {
    if (hasIntroduction) defaultTabValue = "introduction";
    else if (hasCoreConcepts) defaultTabValue = "core-concepts";
    else if (hasExamples) defaultTabValue = "examples";
    else if (hasTutorialsTab) defaultTabValue = "tutorials";
    else if (hasResources) defaultTabValue = "resources";
    else defaultTabValue = "no-content"; 
  }


  return (
    <div className="py-2 px-2 md:py-6 md:px-6"> 
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="pb-6 border-b border-border flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-6">
        {/* <Image 
            src={language.iconUrl} 
            alt={`${language.name} logo`} 
            width={80} 
            height={80} 
            className="rounded-lg shadow-md border border-border p-2 bg-card flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20"
            data-ai-hint={language.dataAiHint}
        /> */}
        <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-2">{language.name}</h1>
            {language.longDescription && <p className="mt-1 text-lg text-muted-foreground">{language.longDescription}</p>}
        </div>
      </header>

      <Tabs defaultValue={defaultTabValue} className="w-full mt-8">
        <TabsList className="flex flex-wrap justify-start sm:justify-center gap-1 sm:gap-2 mb-6 bg-muted/60 p-1 rounded-lg">
          {hasIntroduction && <TabsTrigger value="introduction" id="tab-trigger-introduction">Introduction</TabsTrigger>}
          {hasCoreConcepts && <TabsTrigger value="core-concepts" id="tab-trigger-core-concepts">Core Concepts</TabsTrigger>}
          {hasExamples && <TabsTrigger value="examples" id="tab-trigger-examples">Examples</TabsTrigger>}
          {hasTutorialsTab && <TabsTrigger value="tutorials" id="tab-trigger-tutorials">Quick Tutorials</TabsTrigger>}
          {hasResources && <TabsTrigger value="resources" id="tab-trigger-resources">Resources</TabsTrigger>}
        </TabsList>

        {hasIntroduction && (
            <TabsContent value="introduction" id="introduction">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center text-2xl"><FileText className="mr-2 h-6 w-6 text-primary" /> Introduction to {language.name}</CardTitle>
                </CardHeader>
                <CardContent>
                <MarkdownRenderer content={language.mainContent!} />
                </CardContent>
            </Card>
            </TabsContent>
        )}

        {hasCoreConcepts && (
          <TabsContent value="core-concepts" id="core-concepts" className="space-y-6">
            {language.sections?.map((section) => (
              <Card key={section.id} id={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl"><BookOpen className="mr-2 h-5 w-5 text-primary" /> {section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <MarkdownRenderer content={section.content} />
                  {section.codeSnippets && section.codeSnippets.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-semibold text-md text-foreground/90">Code Examples:</h4>
                      {section.codeSnippets.map(snippet => <CodeSnippet key={snippet.id} {...snippet} />)}
                    </div>
                  )}
                  {section.tutorials && section.tutorials.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-md text-foreground/90 mb-2">Related Tutorials:</h4>
                      <ul className="space-y-2">
                        {section.tutorials.map(tut => (
                           <li key={tut.id}>
                            <Link href={tut.url} target="_blank" rel="noopener noreferrer" className="group flex items-center text-sm text-primary hover:underline">
                                {tut.title} ({tut.sourceName}) <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70 group-hover:opacity-100"/>
                            </Link>
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        )}
        
        {hasExamples && (
          <TabsContent value="examples" id="examples">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Code2 className="mr-2 h-6 w-6 text-primary" /> Code Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {language.codeSnippets!.map((snippet: CodeSnippetItem) => (
                  <CodeSnippet 
                    key={snippet.id} 
                    {...snippet}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {hasTutorialsTab && (
          <TabsContent value="tutorials" id="tutorials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><GraduationCap className="mr-2 h-6 w-6 text-primary" /> Quick Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {language.tutorials!.map((tut: Tutorial) => (
                    <li key={tut.id}>
                      <Link href={tut.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors border border-transparent hover:border-accent">
                        <div>
                          <h4 className="font-medium text-foreground/90 group-hover:text-accent-foreground">{tut.title}</h4>
                          <p className="text-xs text-muted-foreground">Source: {tut.sourceName}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground"/>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {hasResources && (
          <TabsContent value="resources" id="resources">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Lightbulb className="mr-2 h-6 w-6 text-primary" /> Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {language.officialDocumentationUrl && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground/90">Official Documentation</h3>
                        <Button asChild variant="outline">
                            <Link href={language.officialDocumentationUrl} target="_blank" rel="noopener noreferrer">
                                View Documentation <ExternalLink className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                    </div>
                )}
                {language.relatedWikiArticles && language.relatedWikiArticles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground/90">Related Wiki Articles</h3>
                    <ul className="space-y-2">
                      {language.relatedWikiArticles.map((ref: WikiArticleStub) => (
                        <li key={ref.id}>
                          <Link href={`/wiki/${ref.slug}`} className="group flex items-center text-primary hover:underline">
                            {ref.title}
                            <ArrowRight className="ml-1.5 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"/>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        { !hasIntroduction && !hasCoreConcepts && !hasExamples && !hasTutorialsTab && !hasResources && (
            <TabsContent value={defaultTabValue} id="no-content">
                <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Content Coming Soon!</AlertTitle>
                <AlertDescription>
                    Detailed information for {language.name} is currently under development. Check back soon for more content.
                </AlertDescription>
                </Alert>
            </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

    

    