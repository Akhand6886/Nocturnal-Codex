'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Roadmap {
    title: string;
    description?: string;
    category: string;
    difficulty: string;
    featured: boolean;
    imageUrl?: string;
    order: number;
    url: string;
    slug: string;
    topicCount?: number;
    chapterCount?: number;
}

interface RoadmapCardProps {
  roadmap: Roadmap;
  featured?: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  Core: '🏗️',
  Specialization: '🎯',
  Specialized: '🧬',
  Infrastructure: '⚙️',
  Security: '🔒',
  'AI/ML': '🧠',
  Creative: '🎮',
  Mobile: '📱',
  Embedded: '🔌',
};

const DOMAIN_THEMES: Record<string, { bg: string; stroke: string; accent: string }> = {
  frontend: {
    bg: 'from-amber-500/10 via-orange-500/5 to-transparent',
    stroke: 'text-amber-500/60 dark:text-amber-400/60',
    accent: '#f59e0b',
  },
  backend: {
    bg: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    stroke: 'text-emerald-500/60 dark:text-emerald-400/60',
    accent: '#10b981',
  },
  'full-stack': {
    bg: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    stroke: 'text-blue-500/60 dark:text-blue-400/60',
    accent: '#3b82f6',
  },
  'machine-learning': {
    bg: 'from-purple-500/10 via-violet-500/5 to-transparent',
    stroke: 'text-purple-500/60 dark:text-purple-400/60',
    accent: '#8b5cf6',
  },
  devops: {
    bg: 'from-cyan-500/10 via-sky-500/5 to-transparent',
    stroke: 'text-cyan-500/60 dark:text-cyan-400/60',
    accent: '#06b6d4',
  },
  cybersecurity: {
    bg: 'from-rose-500/10 via-red-500/5 to-transparent',
    stroke: 'text-rose-500/60 dark:text-rose-400/60',
    accent: '#f43f5e',
  },
  'game-development': {
    bg: 'from-fuchsia-500/10 via-pink-500/5 to-transparent',
    stroke: 'text-fuchsia-500/60 dark:text-fuchsia-400/60',
    accent: '#d946ef',
  },
  'mobile-development': {
    bg: 'from-lime-500/10 via-emerald-500/5 to-transparent',
    stroke: 'text-lime-500/60 dark:text-lime-400/60',
    accent: '#84cc16',
  },
  'embedded-systems': {
    bg: 'from-orange-500/10 via-yellow-500/5 to-transparent',
    stroke: 'text-orange-500/60 dark:text-orange-400/60',
    accent: '#ea580c',
  },
};

function DomainVectorGraphic({ slug }: { slug: string }) {
  const theme = DOMAIN_THEMES[slug] || DOMAIN_THEMES['frontend'];

  switch (slug) {
    case 'frontend':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* Browser Window */}
          <rect x="30" y="15" width="240" height="90" rx="8" strokeWidth="1.5" className="opacity-40" />
          <line x1="30" y1="35" x2="270" y2="35" strokeWidth="1" className="opacity-30" />
          <circle cx="45" cy="25" r="3" fill="currentColor" className="opacity-60" />
          <circle cx="57" cy="25" r="3" fill="currentColor" className="opacity-40" />
          <circle cx="69" cy="25" r="3" fill="currentColor" className="opacity-40" />
          {/* Layout blocks */}
          <rect x="45" y="45" width="55" height="50" rx="4" strokeWidth="1.2" className="opacity-60" />
          <rect x="110" y="45" width="145" height="22" rx="4" strokeWidth="1.2" className="opacity-80" strokeDasharray="3 3" />
          <rect x="110" y="73" width="70" height="22" rx="4" strokeWidth="1.2" className="opacity-50" />
          <rect x="185" y="73" width="70" height="22" rx="4" strokeWidth="1.2" className="opacity-50" />
        </svg>
      );

    case 'backend':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* Database Cylinders */}
          <g className="opacity-70">
            <ellipse cx="80" cy="35" rx="30" ry="10" strokeWidth="1.5" />
            <path d="M50 35v30c0 5.5 13.4 10 30 10s30-4.5 30-10V35" strokeWidth="1.5" />
            <path d="M50 50c0 5.5 13.4 10 30 10s30-4.5 30-10" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
          {/* API Pipeline Pipes */}
          <path d="M110 50h45M195 50h45" strokeWidth="1.5" strokeDasharray="4 3" className="opacity-50" />
          <circle cx="155" cy="50" r="4" fill="currentColor" className="opacity-80" />
          {/* Server Box */}
          <rect x="195" y="25" width="75" height="50" rx="6" strokeWidth="1.5" className="opacity-70" />
          <line x1="205" y1="40" x2="255" y2="40" strokeWidth="1" className="opacity-40" />
          <line x1="205" y1="52" x2="240" y2="52" strokeWidth="1" className="opacity-40" />
          <circle cx="255" cy="52" r="2" fill="currentColor" className="opacity-80" />
        </svg>
      );

    case 'machine-learning':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* Neural Network Nodes */}
          {/* Layer 1 */}
          <circle cx="60" cy="30" r="7" strokeWidth="1.5" className="opacity-80" />
          <circle cx="60" cy="60" r="7" strokeWidth="1.5" className="opacity-80" />
          <circle cx="60" cy="90" r="7" strokeWidth="1.5" className="opacity-80" />
          {/* Layer 2 */}
          <circle cx="150" cy="40" r="7" strokeWidth="1.5" className="opacity-90" fill="currentColor" fillOpacity="0.15" />
          <circle cx="150" cy="80" r="7" strokeWidth="1.5" className="opacity-90" fill="currentColor" fillOpacity="0.15" />
          {/* Layer 3 */}
          <circle cx="240" cy="60" r="8" strokeWidth="2" className="opacity-90" />
          {/* Synapses */}
          <line x1="67" y1="30" x2="143" y2="40" strokeWidth="1" className="opacity-40" />
          <line x1="67" y1="30" x2="143" y2="80" strokeWidth="1" className="opacity-20" />
          <line x1="67" y1="60" x2="143" y2="40" strokeWidth="1" className="opacity-40" />
          <line x1="67" y1="60" x2="143" y2="80" strokeWidth="1" className="opacity-40" />
          <line x1="67" y1="90" x2="143" y2="40" strokeWidth="1" className="opacity-20" />
          <line x1="67" y1="90" x2="143" y2="80" strokeWidth="1" className="opacity-40" />
          <line x1="157" y1="40" x2="232" y2="60" strokeWidth="1.5" className="opacity-60" />
          <line x1="157" y1="80" x2="232" y2="60" strokeWidth="1.5" className="opacity-60" />
        </svg>
      );

    case 'full-stack':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* 3 Isometric Architecture Plates */}
          <g className="opacity-80">
            {/* Top Plate (Frontend) */}
            <path d="M150 20 L240 40 L150 60 L60 40 Z" strokeWidth="1.5" className="opacity-70" />
            {/* Mid Plate (API / Server) */}
            <path d="M150 45 L240 65 L150 85 L60 65 Z" strokeWidth="1.5" className="opacity-50" strokeDasharray="3 2" />
            {/* Bottom Plate (Database) */}
            <path d="M150 70 L240 90 L150 110 L60 90 Z" strokeWidth="1.5" className="opacity-80" />
          </g>
          {/* Vertical linking pillars */}
          <line x1="150" y1="60" x2="150" y2="70" strokeWidth="1.5" className="opacity-60" />
          <line x1="60" y1="40" x2="60" y2="90" strokeWidth="1" className="opacity-30" />
          <line x1="240" y1="40" x2="240" y2="90" strokeWidth="1" className="opacity-30" />
        </svg>
      );

    case 'devops':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* Infinity Loop */}
          <path
            d="M95 60 C55 25 25 45 25 60 C25 75 55 95 95 60 C135 25 165 45 165 60 C165 75 135 95 95 60"
            transform="translate(45, 0) scale(1.1, 1)"
            strokeWidth="1.8"
            className="opacity-75"
          />
          {/* Stages on Loop */}
          <circle cx="85" cy="46" r="4" fill="currentColor" className="opacity-90" />
          <circle cx="150" cy="60" r="3" fill="currentColor" className="opacity-70" />
          <circle cx="215" cy="74" r="4" fill="currentColor" className="opacity-90" />
          <circle cx="215" cy="46" r="4" fill="currentColor" className="opacity-90" />
        </svg>
      );

    case 'cybersecurity':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* Shield Outline */}
          <path
            d="M150 20 L205 35 V65 C205 90 150 105 150 105 C150 105 95 90 95 65 V35 Z"
            strokeWidth="1.8"
            className="opacity-80"
          />
          {/* Inner Lock Keyhole */}
          <circle cx="150" cy="55" r="9" strokeWidth="1.5" className="opacity-70" />
          <path d="M147 62 L145 76 H155 L153 62" strokeWidth="1.2" className="opacity-70" />
          {/* Binary or Firewall grid accents */}
          <path d="M50 40h25M40 60h35M55 80h20M225 40h25M220 60h35M225 80h20" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
        </svg>
      );

    case 'game-development':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* 3D Wireframe Mesh Cube */}
          <path d="M150 25 L210 50 L150 75 L90 50 Z" strokeWidth="1.5" className="opacity-80" />
          <path d="M90 50 V85 L150 110 V75 Z" strokeWidth="1.5" className="opacity-70" />
          <path d="M210 50 V85 L150 110" strokeWidth="1.5" className="opacity-70" />
          {/* Wireframe subdiv lines */}
          <line x1="120" y1="37" x2="180" y2="97" strokeWidth="1" strokeDasharray="2 2" className="opacity-30" />
          <line x1="180" y1="37" x2="120" y2="97" strokeWidth="1" strokeDasharray="2 2" className="opacity-30" />
        </svg>
      );

    case 'mobile-development':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* Phone 1 */}
          <rect x="90" y="15" width="55" height="95" rx="8" strokeWidth="1.5" className="opacity-80" />
          <line x1="108" y1="22" x2="127" y2="22" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />
          <rect x="98" y="32" width="39" height="24" rx="3" strokeWidth="1" className="opacity-50" />
          <rect x="98" y="62" width="18" height="18" rx="2" strokeWidth="1" className="opacity-40" />
          <rect x="119" y="62" width="18" height="18" rx="2" strokeWidth="1" className="opacity-40" />
          {/* Phone 2 (Layered) */}
          <rect x="155" y="25" width="55" height="85" rx="8" strokeWidth="1.5" className="opacity-60" strokeDasharray="3 2" />
        </svg>
      );

    case 'embedded-systems':
      return (
        <svg viewBox="0 0 300 120" className={`w-full h-full ${theme.stroke}`} fill="none" stroke="currentColor">
          {/* IC Chip */}
          <rect x="110" y="30" width="80" height="60" rx="5" strokeWidth="1.8" className="opacity-80" />
          <circle cx="122" cy="40" r="3" fill="currentColor" className="opacity-60" />
          {/* Top Pins */}
          <line x1="125" y1="18" x2="125" y2="30" strokeWidth="1.5" className="opacity-70" />
          <line x1="140" y1="18" x2="140" y2="30" strokeWidth="1.5" className="opacity-70" />
          <line x1="155" y1="18" x2="155" y2="30" strokeWidth="1.5" className="opacity-70" />
          <line x1="170" y1="18" x2="170" y2="30" strokeWidth="1.5" className="opacity-70" />
          {/* Bottom Pins */}
          <line x1="125" y1="90" x2="125" y2="102" strokeWidth="1.5" className="opacity-70" />
          <line x1="140" y1="90" x2="140" y2="102" strokeWidth="1.5" className="opacity-70" />
          <line x1="155" y1="90" x2="155" y2="102" strokeWidth="1.5" className="opacity-70" />
          <line x1="170" y1="90" x2="170" y2="102" strokeWidth="1.5" className="opacity-70" />
          {/* PCB Traces */}
          <path d="M50 35 H85 L110 50" strokeWidth="1" strokeDasharray="3 2" className="opacity-40" />
          <path d="M250 85 H215 L190 70" strokeWidth="1" strokeDasharray="3 2" className="opacity-40" />
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center font-mono text-2xl opacity-20">
          ◆ ◇ ◆ ◇ ◆
        </div>
      );
  }
}

export function RoadmapCard({ roadmap, featured }: RoadmapCardProps) {
  const theme = DOMAIN_THEMES[roadmap.slug] || DOMAIN_THEMES['frontend'];
  const categoryIcon = CATEGORY_ICONS[roadmap.category] || '📘';
  const topicCount = roadmap.topicCount || 0;
  const chapterCount = roadmap.chapterCount || 0;

  // Check client-side completed progress
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`nocturnal_roadmap_completed_${roadmap.slug}`);
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          setCompletedCount(arr.length);
        }
      }
    } catch {
      // ignore
    }
  }, [roadmap.slug]);

  const isComplete = topicCount > 0 && completedCount >= topicCount;

  return (
    <Link href={roadmap.url} className="group block h-full">
      <div className={`
        h-full flex flex-col overflow-hidden transition-all duration-400 ease-out
        rounded-2xl border border-border/60 hover:border-border
        bg-card/70 hover:bg-card hover:shadow-xl hover:shadow-black/5
        dark:hover:shadow-black/30 group-hover:-translate-y-0.5
      `}>
        {/* Header: Icon + Domain Stats */}
        <div className="flex items-center justify-between px-6 pt-5 pb-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryIcon}</span>
            {completedCount > 0 && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                isComplete
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-primary/10 text-primary border-primary/20'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                {isComplete ? 'Mastered' : `${completedCount}/${topicCount}`}
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono tracking-wider text-muted-foreground/60 uppercase">
            {chapterCount > 0 && <>{chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'} · </>}
            {topicCount} {topicCount === 1 ? 'topic' : 'topics'}
          </span>
        </div>

        {/* Visual Domain Vector Graphic Area */}
        <div className={`
          mx-6 mt-3 h-36 rounded-xl bg-gradient-to-br ${theme.bg}
          border border-border/40 flex items-center justify-center relative overflow-hidden
          transition-all duration-400 group-hover:border-border/80 group-hover:scale-[1.01]
        `}>
          {/* Subtle Grid Dots */}
          <div className="absolute inset-0 bg-[radial-gradient(#00000006_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Bespoke Domain Line-Art */}
          <div className="w-full h-full relative z-10 p-2 flex items-center justify-center">
            <DomainVectorGraphic slug={roadmap.slug} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-6 pt-5 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
              {roadmap.category} · {roadmap.difficulty}
            </span>
          </div>

          <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
            {roadmap.title}
          </h3>

          {roadmap.description && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">
              {roadmap.description}
            </p>
          )}

          {/* CTA Row */}
          <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/30">
            <span className="text-xs font-mono tracking-wide text-muted-foreground/80 group-hover:text-foreground transition-colors duration-200">
              {isComplete ? 'Review path' : 'Explore roadmap'}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200">
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">Start</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
