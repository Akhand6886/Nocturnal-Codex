
import { allBlogPosts, type BlogPost } from "contentlayer/generated";
import Link from "next/link";
import type { Metadata } from 'next';
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60; 

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultOgImage = `${siteUrl}/images/og-default.png`; 

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string): Promise<BlogPost | undefined> {
  const post = allBlogPosts.find((p) => p.slug === slug);
  return post;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }; 
}) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline text-primary"> 
        ← Back to posts
      </Link>
      {post.imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={post.dataAiHint || "blog banner"}
            priority
            />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">Published: {new Date(post.date).toLocaleDateString()}</p>
      <div
          className="prose dark:prose-invert max-w-none markdown-content"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
    </main>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return { 
      title: "Post Not Found",
      description: "The blog post you are looking for could not be found." 
    };
  }
  
  const postImageUrlForMeta = post.imageUrl ? `${siteUrl}${post.imageUrl}` : defaultOgImage;
  const publishedDate = new Date(post.date);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: post.url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}${post.url}`,
      type: 'article',
      publishedTime: publishedDate.toISOString(),
      authors: [post.author || "The Nocturnist"], 
      images: [
        {
          url: postImageUrlForMeta,
          width: 1200, 
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [postImageUrlForMeta],
    },
  };
}
