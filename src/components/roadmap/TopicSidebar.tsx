'use client';

import { X, ExternalLink, BookOpen, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Node } from '@xyflow/react';

interface TopicSidebarProps {
  node: Node;
  onClose: () => void;
  roadmapId: string;
}

export function TopicSidebar({ node, onClose, roadmapId }: TopicSidebarProps) {
  const topicData = node.data;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">{topicData.label}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Description */}
        {topicData.description && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{topicData.description}</p>
          </div>
        )}

        {/* Resources */}
        {topicData.resources && topicData.resources.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Free Resources</h3>
            
            <div className="space-y-2">
              {topicData.resources.map((resource: any, index: number) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="mt-1">
                    {resource.type === 'article' && <FileText className="w-5 h-5 text-gray-600" />}
                    {resource.type === 'video' && <Video className="w-5 h-5 text-gray-600" />}
                    {resource.type === 'course' && <BookOpen className="w-5 h-5 text-gray-600" />}
                    {!resource.type && <ExternalLink className="w-5 h-5 text-gray-600" />}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {resource.title}
                    </h4>
                    {resource.description && (
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    )}
                  </div>
                  
                  <ExternalLink className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t p-4 space-y-2">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Mark as Done
        </Button>
        <Button variant="outline" className="w-full">
          Mark as Learning
        </Button>
        <Button variant="ghost" className="w-full text-gray-600">
          Skip Topic
        </Button>
      </div>
    </div>
  );
}
