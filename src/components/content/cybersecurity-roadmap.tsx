

"use client";

import { useState, useMemo } from 'react';
import type { TutorialPost } from 'contentlayer/generated';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface CybersecurityRoadmapProps {
  tutorials: TutorialPost[];
}

const formatCategoryTitle = (title: string) => {
    return title.replace(/^\d+\.\s*/, '');
};

const MAIN_SECTIONS = [
    "Fundamental IT Skills",
    "Networking Knowledge",
    "Security Skills and Knowledge"
];

const CATEGORY_MAP: Record<string, string> = {
    "0. Prerequisites": "Fundamental IT Skills",
    "1. Security Foundations": "Security Skills and Knowledge",
    "2. OS & System Security": "Security Skills and Knowledge",
    "3. Network Security": "Networking Knowledge",
    "4. Threats & Vulnerabilities": "Security Skills and Knowledge",
    "5. Application Security": "Security Skills and Knowledge",
    "6. Identity & Access Management (IAM)": "Security Skills and Knowledge",
    "7. Security Operations (SecOps)": "Security Skills and Knowledge",
    "8. Cryptography": "Security Skills and Knowledge",
    "9. Governance, Risk & Compliance": "Security Skills and Knowledge",
    "10. Cloud Security": "Security Skills and Knowledge",
    "11. Offensive Security (Red Team)": "Security Skills and Knowledge",
};

export function CybersecurityRoadmap({ tutorials }: CybersecurityRoadmapProps) {
  const [completedSlugs, setCompletedSlugs] = useLocalStorage<string[]>('cybersecurity-progress', []);

  const handleCheckboxChange = (slug: string, checked: boolean) => {
    setCompletedSlugs(prev => 
      checked ? [...prev, slug] : prev.filter(s => s !== slug)
    );
  };
  
  const groupedTutorialsByMainSection = useMemo(() => {
    const grouped = tutorials.reduce((acc, tutorial) => {
      const mainSection = CATEGORY_MAP[tutorial.category] || "Security Skills and Knowledge";
      if (!acc[mainSection]) {
        acc[mainSection] = {};
      }
      if (!acc[mainSection][tutorial.category]) {
        acc[mainSection][tutorial.category] = [];
      }
      acc[mainSection][tutorial.category].push(tutorial);
      return acc;
    }, {} as Record<string, Record<string, TutorialPost[]>>);

    for (const section in grouped) {
        for(const category in grouped[section]) {
            grouped[section][category].sort((a,b) => a.order - b.order);
        }
    }
    return grouped;
  }, [tutorials]);

  const sortedCategories = (section: string) => {
    if (!groupedTutorialsByMainSection[section]) return [];
    return Object.keys(groupedTutorialsByMainSection[section]).sort((a, b) => {
      const getOrder = (str: string) => {
        const match = str.match(/^(\d+)\./);
        return match ? parseInt(match[1], 10) : Infinity;
      };
      const orderA = getOrder(a);
      const orderB = getOrder(b);
      if (orderA !== Infinity && orderB !== Infinity) return orderA - orderB;
      return a.localeCompare(b);
    });
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          The Cyber Security Roadmap
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Navigate your journey from beginner to expert. Click on a section to expand its topics and track your progress.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {MAIN_SECTIONS.map(sectionName => (
          <section key={sectionName} className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center pb-3 border-b-2 border-primary/50">{sectionName}</h2>
            <Accordion type="multiple" className="w-full space-y-4">
              {sortedCategories(sectionName).map(category => {
                 const isHighlighted = ["0. Prerequisites", "3. Network Security", "1. Security Foundations"].includes(category);
                 return (
                    <AccordionItem value={category} key={category} className={cn("border rounded-lg bg-card/80 shadow-md", isHighlighted ? "border-primary/50" : "border-border/70")}>
                      <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline text-left">
                        {formatCategoryTitle(category)}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0">
                        <div className="space-y-3">
                        {groupedTutorialsByMainSection[sectionName][category].map(tutorial => {
                            const isCompleted = completedSlugs.includes(tutorial.slug);
                            return (
                            <div key={tutorial.slug} className={cn("flex items-center space-x-3 p-2.5 rounded-md transition-colors", isCompleted ? "bg-muted/50" : "hover:bg-muted/30")}>
                                <Checkbox 
                                id={`cb-${tutorial.slug}`}
                                checked={isCompleted}
                                onCheckedChange={(checked) => handleCheckboxChange(tutorial.slug, checked as boolean)}
                                aria-label={`Mark ${tutorial.title} as completed`}
                                />
                                <Link href={tutorial.url} className="flex-1">
                                <label htmlFor={`cb-${tutorial.slug}`} className={cn("cursor-pointer text-sm", isCompleted && "line-through text-muted-foreground")}>
                                    {tutorial.title}
                                </label>
                                </Link>
                            </div>
                            );
                        })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                 )
              })}
            </Accordion>
          </section>
        ))}
      </div>
    </div>
  );
}
