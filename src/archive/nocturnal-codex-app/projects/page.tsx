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
  
  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-12">
      <header className="pb-8 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Rocket className="mr-4 h-10 w-10 text-primary" />
          Open Source Projects
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
          Ready to transition from theory to practice? Explore these curated, beginner-friendly repositories and start your contribution journey today.
        </p>
      </header>

      <div className="space-y-16">
        {languages.map((lang) => {
          const projects = getProjectsByLanguage(lang);
          return (
            <section key={lang} className="space-y-6">
              <h2 className="text-2xl font-bold capitalize flex items-center">
                <Code2 className="mr-3 h-6 w-6 text-primary" />
                {lang === 'cpp' ? 'C++' : lang} Projects
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="flex flex-col border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card shadow-sm hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                        <Badge variant={
                          project.difficulty === 'Beginner' ? 'secondary' : 
                          project.difficulty === 'Intermediate' ? 'default' : 'destructive'
                        }>
                          {project.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2 mt-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wider">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-3">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Repo
                        </a>
                      </Button>
                      <Button asChild size="sm" className="w-full">
                        <a href={project.goodFirstIssuesUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
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
