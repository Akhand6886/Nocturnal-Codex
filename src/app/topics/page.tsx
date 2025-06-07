
import { MOCK_TOPICS, type Topic } from "@/lib/data";
import { TopicTile } from "@/components/content/topic-tile";
import { BookOpenText } from "lucide-react";
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Topics | Nocturnal Codex",
  description: "Explore various topics in computer science and related fields, organized by category. Dive into curated knowledge domains including algorithms, operating systems, machine learning, and more.",
  alternates: {
    canonical: "/topics",
  },
  openGraph: {
    title: "Explore Topics | Nocturnal Codex",
    description: "Dive into curated knowledge domains within computer science, AI, cybersecurity, and theoretical concepts.",
    url: `${siteUrl}/topics`,
    type: 'website', // Or 'CollectionPage' if more appropriate
  },
};


export default function TopicsExplorerPage() {
  const groupedTopics: Record<string, Topic[]> = {};

  MOCK_TOPICS.forEach(topic => {
    const category = topic.category || "Other Topics";
    if (!groupedTopics[category]) {
      groupedTopics[category] = [];
    }
    groupedTopics[category].push(topic);
  });

  const sortedCategories = Object.keys(groupedTopics).sort((a, b) => {
    return a.localeCompare(b);
  });

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Explore Topics on Nocturnal Codex",
    "description": "Dive into curated knowledge domains within computer science and beyond. Each topic offers a gateway to in-depth articles, tutorials, and discussions.",
    "url": `${siteUrl}/topics`,
    "publisher": {
        "@type": "Organization",
        "name": "Nocturnal Codex",
        "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/images/logo.png` // Ensure logo.png exists in /public/images
        }
    },
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": MOCK_TOPICS.map((topic, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "WebPage", // Or more specific type like "CreativeWork" if applicable
                "url": `${siteUrl}/topics/${topic.slug}`,
                "name": topic.name,
                "description": topic.description
            }
        }))
    }
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <div className="space-y-12">
        <header className="pb-6 border-b border-border">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
            <BookOpenText className="mr-4 h-10 w-10 text-primary" />
            Explore Topics
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Dive into curated knowledge domains within computer science and beyond. Each topic offers a gateway to in-depth articles, tutorials, and discussions.
          </p>
        </header>
        
        {sortedCategories.length > 0 ? (
          sortedCategories.map(category => (
            <section key={category} className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6 pb-3 border-b border-border/70 text-foreground/90">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedTopics[category].map((topic) => (
                  <TopicTile key={topic.id} topic={topic} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-10">No topics available yet. Check back soon!</p>
        )}
      </div>
    </>
  );
}
