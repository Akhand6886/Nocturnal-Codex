
import { allTutorialPosts } from "contentlayer/generated";
import Link from "next/link";
import { ListOrdered, ChevronRight, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Python Tutorials Index",
  description: "Browse all Python tutorials available on Nocturnal Codex, organized for easy learning.",
  alternates: {
    canonical: "/tutorial/python",
  },
  openGraph: {
    title: "Python Tutorials | Nocturnal Codex",
    description: "A comprehensive list of Python tutorials.",
    url: `${siteUrl}/tutorial/python`,
  },
};

export default async function PythonTutorialsIndexPage() {
  const sortedTutorials = allTutorialPosts
    .filter(p => p.language === 'python')
    .sort((a, b) => a.order - b.order);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Languages", href: "/languages/python" }, 
    { label: "Python Tutorials" },
  ];

  return (
    <div className="space-y-10">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <GraduationCap className="mr-4 h-10 w-10 text-primary" />
          Python Tutorials
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A curated list of Python tutorials, from basic concepts to more advanced topics.
        </p>
      </header>

      {sortedTutorials.length > 0 ? (
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <ListOrdered className="mr-3 h-6 w-6 text-primary" />
              Available Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {sortedTutorials.map((tutorial) => (
                <li key={tutorial.slug}>
                  <Link
                    href={tutorial.url}
                    className="group flex items-center justify-between p-4 rounded-lg hover:bg-accent/10 transition-all duration-200 ease-in-out border border-border/30 hover:border-primary/50"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-sm font-medium text-primary group-hover:text-accent-foreground">
                        {tutorial.order}.
                      </span>
                      <span className="text-lg font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all duration-200 ease-in-out transform group-hover:translate-x-1" />
                  </Link>
                  {tutorial.description && (
                    <p className="mt-1 ml-8 text-sm text-muted-foreground">
                      {tutorial.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <p className="text-muted-foreground text-center py-10">
          No Python tutorials available yet. Please check back soon!
        </p>
      )}
    </div>
  );
}
