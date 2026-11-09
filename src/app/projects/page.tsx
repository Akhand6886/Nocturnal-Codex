import { Github, Rocket, ExternalLink, Code2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllProjects, getAllLanguagesWithProjects, getProjectsByLanguage } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Open Source Projects',
  description: 'A curated list of beginner-friendly open-source projects to jumpstart your contribution journey.',
};

export default function ProjectsPage() {
  const languages = getAllLanguagesWithProjects();
  const allProjects = getAllProjects();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-primary uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              OPEN SOURCE LAB // INDEX 04
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
              Curated Repositories
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Vetted open-source codebases with active maintainer cultures and accessible entry points for practical real-world engineering.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground border border-border bg-card px-4 py-2 rounded-lg shadow-xs">
            <span><strong className="text-foreground">{allProjects.length}</strong> repositories</span>
            <span className="text-muted-foreground/40">|</span>
            <span><strong className="text-foreground">{languages.length}</strong> ecosystems</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14">
        {languages.map((lang) => {
          const projects = getProjectsByLanguage(lang);
          return (
            <section key={lang} className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                  // {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-muted-foreground">({projects.length} repos)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project) => (
                  <Card key={project.id} className="flex flex-col bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                    <CardHeader className="p-5 pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-base font-semibold text-foreground leading-snug">{project.title}</CardTitle>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider flex-shrink-0 ${
                          project.difficulty === 'Beginner' 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                            : project.difficulty === 'Intermediate'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              : 'bg-muted text-muted-foreground border-border'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 py-2 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-3 border-t border-border/60 grid grid-cols-2 gap-2 mt-auto">
                      <Button asChild variant="outline" size="sm" className="h-8 text-xs font-mono rounded-md">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          Repo
                        </a>
                      </Button>
                      <Button asChild size="sm" className="h-8 text-xs font-mono rounded-md">
                        <a href={project.goodFirstIssuesUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Issues
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
