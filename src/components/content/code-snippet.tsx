"use client";

import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type CodeLanguage = 'python' | 'javascript' | 'typescript' | 'html' | 'css' | 'json' | 'markdown' | 'csharp' | 'java' | 'go' | 'rust' | 'text';

interface CodeSnippetProps {
  code: string;
  language?: CodeLanguage;
  title?: string;
  description?: string;
  className?: string;
}

export function CodeSnippet({ code, language = 'text', title, description, className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Basic syntax highlighting (can be expanded with a library)
  const getLanguageDisplayName = (lang: CodeLanguage) => {
    const names: Record<CodeLanguage, string> = {
      python: 'Python',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      html: 'HTML',
      css: 'CSS',
      json: 'JSON',
      markdown: 'Markdown',
      csharp: 'C#',
      java: 'Java',
      go: 'Go',
      rust: 'Rust',
      text: 'Text',
    };
    return names[lang] || 'Code';
  }

  return (
    <Card className={cn("my-6 shadow-md bg-muted/30 overflow-hidden", className)}>
      {(title || description) && (
        <CardHeader className="pb-2">
          {title && <CardTitle className="text-lg text-primary">{title}</CardTitle>}
          {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
        </CardHeader>
      )}
      <div className="relative group">
        <div className="flex justify-between items-center px-4 py-2 bg-muted/50 border-b border-border">
          <span className="text-xs font-semibold text-foreground/80">{getLanguageDisplayName(language)}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-7 w-7 opacity-50 group-hover:opacity-100 transition-opacity"
            aria-label="Copy code to clipboard"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4 text-foreground/70" />}
          </Button>
        </div>
        <CardContent className="p-0">
          <pre className="p-4 text-sm overflow-x-auto max-h-[400px] bg-background">
            <code className={`language-${language} text-foreground/90`}>
              {code.trim()}
            </code>
          </pre>
        </CardContent>
      </div>
    </Card>
  );
}
