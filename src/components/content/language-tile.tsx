
import type { ProgrammingLanguage } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface LanguageTileProps {
  language: ProgrammingLanguage;
}

export function LanguageTile({ language }: LanguageTileProps) {
  // For now, all language tiles link to /topics as a placeholder
  const languagePageUrl = `/topics`; 

  return (
    <Link href={languagePageUrl} className="group block">
      <Card className="overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/40 hover:border-primary/50 rounded-lg flex flex-col items-center justify-center p-4 h-36 text-center">
        <div className="relative h-12 w-12 mb-2 flex-shrink-0">
          <Image
            src={language.iconUrl}
            alt={`${language.name} logo`}
            width={48} 
            height={48}
            className="transition-transform duration-300 group-hover:scale-110 ease-in-out object-contain"
            data-ai-hint={language.dataAiHint}
          />
        </div>
        <p className="text-sm font-semibold group-hover:text-primary transition-colors duration-200 ease-in-out mt-1">
          {language.name}
        </p>
      </Card>
    </Link>
  );
}
