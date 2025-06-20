
import { MOCK_PROGRAMMING_LANGUAGES, type ProgrammingLanguage, type CodeSnippetItem, type Tutorial, type WikiArticleStub, type KeyFeature, type LanguageSection } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeSnippet } from "@/components/content/code-snippet";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Lightbulb, Code2, GraduationCap, ExternalLink, FileText, CheckCircle, Terminal, Users, Palette, Workflow, Star, Brain } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cn } from "@/lib/utils";

// Helper to get a Lucide icon component by name string (basic implementation)
const getLucideIcon = (iconName?: string): React.ElementType | null => {
  if (!iconName) return null;
  const icons: { [key: string]: React.ElementType } = {
    CheckCircle, Terminal, Users, Palette, Workflow, Star, Library: BookOpen, Type: Brain, PlayCircle: Code2, Box: Lightbulb, // Map string names to actual Lucide components
    // Add more icons as needed
  };
  return icons[iconName] || null;
};


export const revalidate = 60; // Revalidate every 60 seconds

interface LanguagePageProps {
  params: { languageSlug: string };
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
    title: `${language.name} Language Overview | Nocturnal Codex`,
    description: language.longDescription || `An overview of the ${language.name} programming language, its features, use cases, and learning resources.`,
  };
}


export default async function LanguagePage({ params }: LanguagePageProps) {
  const language = await getLanguage(params.languageSlug);

  if (!language) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Languages", href: "/topics" }, // Assuming /topics lists languages or links to a dedicated language index
    { label: language.name },
  ];
  
  // Sections for the page, to be linked by sidebar
  const pageSections = [
    { id: "introduction", title: "Introduction", hasContent: !!language.mainContent },
    { id: "key-features", title: "Key Features", hasContent: !!language.keyFeatures && language.keyFeatures.length > 0 },
    { id: "use-cases", title: "Common Use Cases", hasContent: !!language.useCases && language.useCases.length > 0 },
    { id: "core-concepts", title: "Core Concepts", hasContent: !!language.sections && language.sections.length > 0 },
    { id: "code-examples", title: "Code Examples", hasContent: !!language.codeSnippets && language.codeSnippets.length > 0 },
    { id: "learning-resources", title: "Learning Resources", hasContent: !!language.tutorials && language.tutorials.length > 0 },
    { id: "documentation-community", title: "Documentation & Community", hasContent: !!language.officialDocumentationUrl || (!!language.communityLinks && language.communityLinks.length > 0) },
    { id: "related-content", title: "Related Content", hasContent: !!language.relatedWikiArticles && language.relatedWikiArticles.length > 0 },
  ].filter(section => section.hasContent);


  return (
    <div className="py-2 px-2 md:py-6 md:px-0 max-w-5xl mx-auto"> {/* Adjusted padding and max-width */}
      <Breadcrumbs items={breadcrumbItems} className="mb-8" />
      
      <header className="pb-8 border-b border-border flex flex-col md:flex-row items-start gap-6 mb-12">
        <Image 
            src={language.iconUrl} 
            alt={`${language.name} logo`} 
            width={96} 
            height={96} 
            className="rounded-lg shadow-md border border-border p-2 bg-card flex-shrink-0 w-20 h-20 md:w-24 md:h-24"
            data-ai-hint={language.dataAiHint}
        />
        <div className="flex-grow">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-3">{language.name}</h1>
            {language.longDescription && <p className="text-lg text-muted-foreground mb-3">{language.longDescription}</p>}
            <div className="flex flex-wrap gap-2">
              {language.category && <Badge variant="secondary">{language.category}</Badge>}
              {language.typing && <Badge variant="outline">{language.typing}</Badge>}
              {language.paradigms && language.paradigms.map(p => <Badge key={p} variant="outline">{p}</Badge>)}
              {language.version && <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Version: {language.version}</Badge>}
            </div>
        </div>
      </header>

      {pageSections.length === 0 && (
         <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Content Coming Soon!</AlertTitle>
            <AlertDescription>
                Detailed information for {language.name} is currently under development. Check back soon for more content.
            </AlertDescription>
        </Alert>
      )}

      {/* Introduction Section */}
      {language.mainContent && (
        <section id="introduction" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary flex items-center"><FileText className="mr-3 h-7 w-7 text-primary" />Introduction to {language.name}</h2>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <MarkdownRenderer content={language.mainContent} />
            </CardContent>
          </Card>
        </section>
      )}

      {/* Key Features Section */}
      {language.keyFeatures && language.keyFeatures.length > 0 && (
        <section id="key-features" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary flex items-center"><Star className="mr-3 h-7 w-7 text-primary" />Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {language.keyFeatures.map((feature: KeyFeature) => {
              const IconComponent = getLucideIcon(feature.icon);
              return (
                <Card key={feature.id} className="bg-card hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      {IconComponent && <IconComponent className="mr-2 h-5 w-5 text-accent" />}
                      {feature.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {language.useCases && language.useCases.length > 0 && (
        <section id="use-cases" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary flex items-center"><Workflow className="mr-3 h-7 w-7 text-primary" />Common Use Cases</h2>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {language.useCases.map(useCase => <li key={useCase} className="text-foreground/90">{useCase}</li>)}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Core Concepts/Detailed Sections */}
      {language.sections && language.sections.length > 0 && (
        <section id="core-concepts" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-semibold mb-8 pb-2 border-b-2 border-primary flex items-center"><BookOpen className="mr-3 h-7 w-7 text-primary" />Core Concepts</h2>
            <div className="space-y-8">
            {language.sections.map((section: LanguageSection) => (
              <Card key={section.id} id={section.id} className="shadow-lg overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-2xl text-foreground/90">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <MarkdownRenderer content={section.content} />
                  {section.codeSnippets && section.codeSnippets.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-lg text-foreground/80 mb-3">Related Code:</h4>
                      {section.codeSnippets.map(snippet => <CodeSnippet key={snippet.id} {...snippet} />)}
                    </div>
                  )}
                  {section.tutorials && section.tutorials.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-lg text-foreground/80 mb-3">Related Quick Tutorials:</h4>
                      <ul className="space-y-2">
                        {section.tutorials.map(tut => (
                           <li key={tut.id}>
                            <Link href={tut.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center text-sm text-primary hover:underline">
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
            </div>
        </section>
      )}
      
      {/* Code Examples Section */}
      {language.codeSnippets && language.codeSnippets.length > 0 && (
        <section id="code-examples" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary flex items-center"><Code2 className="mr-3 h-7 w-7 text-primary" />Code Examples</h2>
          <div className="space-y-6">
            {language.codeSnippets.map((snippet: CodeSnippetItem) => (
              <CodeSnippet key={snippet.id} {...snippet} />
            ))}
          </div>
        </section>
      )}

      {/* Learning Resources/Tutorials Section */}
      {language.tutorials && language.tutorials.length > 0 && (
        <section id="learning-resources" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary flex items-center"><GraduationCap className="mr-3 h-7 w-7 text-primary" />Learning Resources</h2>
          <Card className="shadow-lg">
            <CardContent className="p-6 grid md:grid-cols-2 gap-4">
              {language.tutorials.map((tut: Tutorial) => (
                <Link key={tut.id} href={tut.url} target="_blank" rel="noopener noreferrer" className="group block p-4 rounded-lg hover:bg-accent/10 border border-border hover:border-accent transition-all">
                  <h4 className="font-medium text-foreground/90 group-hover:text-primary">{tut.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">Source: {tut.sourceName}</p>
                  <span className="text-xs text-primary inline-flex items-center">
                    Go to resource <ExternalLink className="ml-1 h-3 w-3"/>
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>
      )}
      
      {/* Documentation and Community Section */}
      {(language.officialDocumentationUrl || (language.communityLinks && language.communityLinks.length > 0)) && (
        <section id="documentation-community" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary flex items-center"><Users className="mr-3 h-7 w-7 text-primary" />Documentation & Community</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {language.officialDocumentationUrl && (
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">Official Documentation</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                                <Link href={language.officialDocumentationUrl} target="_blank" rel="noopener noreferrer">
                                    View Documentation <ExternalLink className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
                {language.communityLinks && language.communityLinks.length > 0 && (
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl text-accent">Community Hubs</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-2">
                            {language.communityLinks.map(link => (
                                <Link key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center text-sm text-primary hover:underline">
                                    {link.name} <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70 group-hover:opacity-100"/>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
      )}

      {/* Related Content Section */}
      {language.relatedWikiArticles && language.relatedWikiArticles.length > 0 && (
        <section id="related-content" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary flex items-center"><Lightbulb className="mr-3 h-7 w-7 text-primary" />Related Content</h2>
            <Card className="shadow-lg">
              <CardContent className="p-6 grid md:grid-cols-2 gap-4">
                  {language.relatedWikiArticles.map((ref: WikiArticleStub) => (
                    <Link key={ref.id} href={`/wiki/${ref.slug}`} className="group block p-3 rounded-md hover:bg-accent/10 border border-border hover:border-accent transition-all">
                        <h4 className="font-medium text-foreground/90 group-hover:text-primary">{ref.title}</h4>
                        <span className="text-xs text-primary inline-flex items-center">Read Article <ArrowRight className="ml-1 h-3 w-3"/></span>
                    </Link>
                  ))}
              </CardContent>
            </Card>
        </section>
      )}

    </div>
  );
}

    