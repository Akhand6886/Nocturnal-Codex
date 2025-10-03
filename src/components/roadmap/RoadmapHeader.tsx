'use client';

import { Button } from '@/components/ui/button';
import { Download, Share2, Calendar } from 'lucide-react';
import Link from 'next/link';

interface RoadmapHeaderProps {
  title: string;
  description: string;
  roadmapId: string;
}

export function RoadmapHeader({ title, description, roadmapId }: RoadmapHeaderProps) {
  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Back to All Roadmaps */}
        <Link 
          href="/roadmaps" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          ← All Roadmaps
        </Link>

        {/* Title and Actions */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 text-lg">{description}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Learning Time
            </Button>
            <Button variant="default" size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="default" size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Progress and Actions Bar */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium border-b-2 border-black pb-2">
              Roadmap
            </button>
            <button className="text-sm text-gray-600 pb-2">
              AI Tutor
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium flex items-center gap-2">
              Personalize
              <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded">New</span>
            </button>
            <div className="text-sm">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-medium">
                8% DONE
              </span>
              <span className="ml-2 text-gray-600">0 of 150 Done</span>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              Track Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
