"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const generateSlug = (children: any) => {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } }
};

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
    <motion.div 
      initial="hidden" 
      animate="show" 
      variants={containerVars}
      className={cn(
        "prose prose-lg dark:prose-invert max-w-3xl w-full markdown-content",
        "prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Text & Structural nodes wrap in Framer Motion items
          p({ children, ...props }) {
            return <motion.div variants={itemVars} className="my-5 text-lg leading-7 text-foreground/90" {...(props as any)}>{children}</motion.div>;
          },
          h1({ children, ...props }) {
            return <motion.h1 variants={itemVars} className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl border-b border-border/40 pb-4 mb-8" {...(props as any)}>{children}</motion.h1>;
          },
          h2({ children, ...props }) {
            const id = generateSlug(children);
            return <motion.h2 id={id} variants={itemVars} className="scroll-m-20 border-b border-border/30 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-10 mb-5" {...(props as any)}>{children}</motion.h2>;
          },
          h3({ children, ...props }) {
            const id = generateSlug(children);
            return <motion.h3 id={id} variants={itemVars} className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4 border-b border-border/10 pb-1" {...(props as any)}>{children}</motion.h3>;
          },
          ul({ children, ...props }) {
            return <motion.ul variants={itemVars} className="my-6 ml-6 list-disc [&>li]:mt-3 text-lg leading-7 text-foreground/90" {...(props as any)}>{children}</motion.ul>;
          },
          ol({ children, ...props }) {
            return <motion.ol variants={itemVars} className="my-6 ml-6 list-decimal [&>li]:mt-3 text-lg leading-7 text-foreground/90" {...(props as any)}>{children}</motion.ol>;
          },

          // Code overrides
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            
            // Inline code
            if (inline) {
              return (
                <code className="bg-secondary/60 text-primary px-1.5 py-0.5 rounded-md font-mono text-[0.85em] border border-border/40" {...props}>
                  {children}
                </code>
              );
            }
            
            // Block code needs to be animated as a block
            return (
              <motion.div variants={itemVars}>
                <MacCodeBlock language={language} value={String(children).replace(/\n$/, "")} />
              </motion.div>
            );
          },
          
          // Blockquote override for beautiful callouts
          blockquote({ children, ...props }) {
            return (
              <motion.blockquote 
                variants={itemVars}
                className="my-8 border-l-4 border-l-primary bg-primary/10 px-6 py-4 rounded-r-xl italic text-foreground/90 font-medium leading-relaxed relative overflow-hidden shadow-sm" 
                {...(props as any)}
              >
                {/* Subtle background glow effect */}
                <div className="absolute -left-4 top-0 bottom-0 w-8 bg-primary/20 blur-xl" />
                <div className="relative z-10 space-y-2">{children}</div>
              </motion.blockquote>
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
              <motion.div variants={itemVars} className="my-8 flex justify-center">
                <img 
                  className="rounded-xl border border-border/50 shadow-lg" 
                  loading="lazy"
                  {...props} 
                />
              </motion.div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
