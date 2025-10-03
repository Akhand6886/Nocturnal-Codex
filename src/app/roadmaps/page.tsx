import { notFound } from 'next/navigation';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import { RoadmapHeader } from '@/components/roadmap/RoadmapHeader';
import { allRoadmaps } from 'contentlayer/generated';

interface RoadmapPageProps {
  params: {
    roadmapId: string;
  };
}

export async function generateStaticParams() {
  return allRoadmaps.map((roadmap) => ({
    roadmapId: roadmap.slug,
  }));
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const roadmap = allRoadmaps.find((r) => r.slug === params.roadmapId);

  if (!roadmap) {
    notFound();
  }

  // Fetch the roadmap JSON data
  const roadmapData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/roadmap-content/${params.roadmapId}.json`
  ).then((res) => res.json());

  return (
    <div className="min-h-screen bg-white">
      <RoadmapHeader
        title={roadmap.title}
        description={roadmap.description}
        roadmapId={params.roadmapId}
      />
      
      <div className="relative">
        <EditorRoadmapRenderer
          roadmapId={params.roadmapId}
          roadmapData={roadmapData}
        />
      </div>
    </div>
  );
}
