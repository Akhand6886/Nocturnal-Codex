
"use client";

import Link from 'next/link';
import { allTutorialPosts } from 'contentlayer/generated';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Milestone, CheckCircle } from 'lucide-react';
import type { TutorialPost } from 'contentlayer/generated';

// A single roadmap section
interface RoadmapSectionProps {
    title: string;
    description: string;
    tutorials: TutorialPost[];
}

const RoadmapSection = ({ title, description, tutorials }: RoadmapSectionProps) => (
    <Card className="w-full bg-card/50 border-border/70 shadow-lg">
        <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
                <Milestone className="mr-3 h-6 w-6" />
                {title}
            </CardTitle>
            <p className="pt-2 text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tutorials.map(tutorial => (
                    <Link href={tutorial.url} key={tutorial.slug} className="group">
                        <div className="p-4 border rounded-lg h-full bg-background/70 hover:bg-muted/60 hover:border-primary/50 transition-all">
                            <h4 className="font-semibold text-foreground/90 group-hover:text-primary">{tutorial.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{tutorial.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </CardContent>
    </Card>
);

// The main roadmap component
export function CybersecurityRoadmap() {

    const sections: RoadmapSectionProps[] = [
        {
            title: "0. Prerequisites",
            description: "Build the foundational IT knowledge needed for a career in cybersecurity. These are the absolute basics.",
            tutorials: allTutorialPosts.filter(p => p.category === "0. Prerequisites").sort((a,b) => a.order - b.order)
        },
        {
            title: "1. Security Foundations",
            description: "Learn the core principles, key terms, and threat landscape of cybersecurity.",
            tutorials: allTutorialPosts.filter(p => p.category === "1. Security Foundations").sort((a,b) => a.order - b.order)
        },
        {
            title: "2. OS & System Security",
            description: "Master the fundamentals of securing operating systems like Linux and Windows.",
            tutorials: allTutorialPosts.filter(p => p.category === "2. OS & System Security").sort((a,b) => a.order - b.order)
        },
        {
            title: "3. Network Security",
            description: "Discover how to secure network infrastructure from unauthorized access and threats.",
            tutorials: allTutorialPosts.filter(p => p.category === "3. Network Security").sort((a,b) => a.order - b.order)
        },
        // Add more sections here as content becomes available
    ];

    return (
        <div className="container mx-auto px-4 py-10 md:py-12">
            <header className="pb-8 border-b border-border text-center">
                <ShieldCheck className="mx-auto h-16 w-16 text-primary animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-4">
                    Cybersecurity Learning Roadmap
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    A structured path to guide you from fundamental IT skills to advanced security concepts. Master each section to build a solid foundation in cybersecurity.
                </p>
            </header>

            <div className="mt-12 space-y-12">
                {sections.map(section => (
                    <RoadmapSection 
                        key={section.title}
                        title={section.title}
                        description={section.description}
                        tutorials={section.tutorials}
                    />
                ))}
            </div>
             <div className="mt-16 text-center">
                <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 via-background to-background border-primary/20 shadow-xl">
                    <CardHeader className="p-0">
                         <CardTitle className="flex items-center justify-center">
                            <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                            And much more to come...
                         </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                        <p className="text-muted-foreground">This roadmap is constantly evolving. Check back for more advanced topics!</p>
                         <Button asChild className="mt-6" variant="default">
                            <Link href="/topics">
                                Explore All Topics <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
