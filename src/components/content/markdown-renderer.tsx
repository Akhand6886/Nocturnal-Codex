"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom Mac-style Code Block with Copy function
function MacCodeBlock({ language, value }: { language: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-xl overflow-hidden bg-[#1d1f21] border border-border/40 shadow-xl group">
      {/* Mac Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2f31]/80 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-3">
          {language && (
            <span className="text-xs font-mono text-muted-foreground/80 uppercase tracking-wider">
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="text-muted-foreground/60 hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/10"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {/* Code Body */}
      <div className="p-4 text-sm overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language || "text"}
          style={atomDark}
          customStyle={{ background: "transparent", padding: 0, margin: 0 }}
          wrapLongLines={false}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  if (!content) {
    return (
      <div className={cn("prose dark:prose-invert max-w-none animate-pulse", className)}>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "prose dark:prose-invert max-w-none w-full markdown-content",
      "animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-both",
      className
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code overrides
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            
            // Inline code
            if (inline) {
              return (
                <code className="bg-secondary/50 text-primary px-1.5 py-0.5 rounded-md font-mono text-[0.85em] border border-border/50" {...props}>
                  {children}
                </code>
              );
            }
            
            // Block code
            return <MacCodeBlock language={language} value={String(children).replace(/\n$/, "")} />;
          },
          
          // Blockquote override for beautiful callouts
          blockquote({ children, ...props }) {
            return (
              <blockquote 
                className="my-6 border-l-4 border-l-primary bg-primary/10 px-5 py-4 rounded-r-xl italic text-foreground/90 font-medium leading-relaxed relative overflow-hidden" 
                {...props}
              >
                {/* Subtle background glow effect */}
                <div className="absolute -left-4 top-0 bottom-0 w-8 bg-primary/20 blur-xl" />
                <div className="relative z-10">{children}</div>
              </blockquote>
            );
          },

          // Link override
          a({ children, ...props }) {
            return (
              <a 
                className="text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary" 
                target="_blank" 
                rel="noopener noreferrer" 
                {...props}
              >
                {children}
              </a>
            );
          },
          
          // Image override
          img({ node, ...props }) {
            return (
              <img 
                className="rounded-xl border border-border/50 shadow-lg mx-auto" 
                loading="lazy"
                {...props} 
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
