import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllRoadmapTopics, getRoadmapTopicDetails, detectRelatedSiteLanguage } from '@/lib/roadmaps';
import { RoadmapTopicPageView } from '@/components/Roadmaps/RoadmapTopicPageView';

export const revalidate = 3600;

interface TopicPageProps {
  params: Promise<{ roadmapId: string; topicId: string }>;
}

export async function generateStaticParams() {
  const topics = getAllRoadmapTopics();
  return topics.map(t => ({
    roadmapId: t.roadmapSlug,
    topicId: t.topicId,
  }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { roadmapId, topicId } = await params;
  const details = getRoadmapTopicDetails(roadmapId, topicId);

  if (!details) {
    return {
      title: 'Topic Not Found — Nocturnal Codex',
    };
  }

  return {
    title: `${details.topic.label} — ${details.roadmap.title} — Nocturnal Codex`,
    description: details.topic.description || `${details.topic.label} curriculum guide for ${details.roadmap.title}.`,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { roadmapId, topicId } = await params;
  const details = getRoadmapTopicDetails(roadmapId, topicId);

  if (!details) {
    notFound();
  }

  return <RoadmapTopicPageView details={details} />;
}
