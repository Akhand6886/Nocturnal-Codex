
import { allTutorialPosts, type TutorialPost } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
  return allTutorialPosts
    .filter(p => p.language === 'python')
    .map((tutorial) => ({
      slug: tutorial.slug,
    }));
}

interface PythonTutorialPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PythonTutorialPageProps): Promise<Metadata> {
  const tutorial = allTutorialPosts.find((p) => p.language === 'python' && p.slug === params.slug);

  if (!tutorial) {
    return {
      title: "Tutorial Not Found",
      description: "The tutorial you are looking for could not be found."
    };
  }

  return {
    title: `${tutorial.title} | Python Tutorial`,
    description: tutorial.description || `Python tutorial on ${tutorial.title}.`,
    alternates: {
      canonical: `/tutorial/python/${tutorial.slug}`,
    },
    openGraph: {
      title: `${tutorial.title} | Python Tutorial`,
      description: tutorial.description || `Learn ${tutorial.title} in Python.`,
      url: `${siteUrl}/tutorial/python/${tutorial.slug}`,
      type: 'article',
    },
  };
}

export default async function PythonTutorialPage({ params }: PythonTutorialPageProps) {
  const sortedTutorials = allTutorialPosts
    .filter(p => p.language === 'python')
    .sort((a, b) => a.order - b.order);
    
  const tutorialIndex = sortedTutorials.findIndex((p) => p.slug === params.slug);

  if (tutorialIndex === -1) {
    notFound();
  }

  const tutorial = sortedTutorials[tutorialIndex];
  const prevTutorial = tutorialIndex > 0 ? sortedTutorials[tutorialIndex - 1] : null;
  const nextTutorial = tutorialIndex < sortedTutorials.length - 1 ? sortedTutorials[tutorialIndex + 1] : null;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Languages", href: "/languages/python" }, 
    { label: "Python Tutorials", href: "/tutorial/python" },
    { label: tutorial.title },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <article className="space-y-8">
        <header className="space-y-3 border-b border-border pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-start">
            <BookOpen className="mr-3 mt-1 h-8 w-8 text-primary flex-shrink-0" />
            <span>{tutorial.title}</span>
          </h1>
          {tutorial.description && (
            <p className="text-lg text-muted-foreground">{tutorial.description}</p>
          )}
        </header>

        <div
          className="prose dark:prose-invert max-w-none markdown-content"
          dangerouslySetInnerHTML={{ __html: tutorial.body.html }}
        />
      </article>

      {(prevTutorial || nextTutorial) && (
        <Card className="mt-12 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Continue Learning</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row justify-between gap-4">
            {prevTutorial ? (
              <Button asChild variant="outline" className="w-full sm:w-auto justify-start sm:justify-center">
                <Link href={prevTutorial.url}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {prevTutorial.title}
                </Link>
              </Button>
            ) : <div className="w-full sm:w-auto"></div> /* Placeholder for alignment */}
            {nextTutorial ? (
              <Button asChild variant="outline" className="w-full sm:w-auto justify-end sm:justify-center">
                <Link href={nextTutorial.url}>
                  {nextTutorial.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : <div className="w-full sm:w-auto"></div> /* Placeholder for alignment */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
