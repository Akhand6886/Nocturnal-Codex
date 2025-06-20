
import { client, type SanityPost, urlFor } from "@/lib/sanity"; 
import Link from "next/link";
import type { Metadata } from 'next';
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@/components/content/PortableTextBlock"; // Import custom component

export const revalidate = 60; 

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultOgImage = `${siteUrl}/images/og-default.png`; 

export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)][].slug.current`;
  const slugs = await client.fetch<string[]>(query);
  return slugs.map((slug) => ({
    slug,
  }));
}

async function getPost(slug: string): Promise<SanityPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    ..., 
    "mainImage": mainImage{..., asset->},
    "image": image{..., asset->} 
  }`;
  const post = await client.fetch<SanityPost>(query, { slug });
  return post || null;
}

const queryOptions = { next: { revalidate: 30 } }; 

export default async function PostPage({
  params,
}: {
  params: { slug: string }; 
}) {
  const post = await client.fetch<SanityPost>(`*[_type == "post" && slug.current == $slug][0]{
    ...,
    "mainImage": mainImage{..., asset->},
    "body": body[]{ 
      ..., 
      _type == "image" => {
        ...,
        asset->
      }
    }
  }`, { slug: params.slug }, queryOptions);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  const imageField = post.image || post.mainImage;
  const postImageUrl = imageField
    ? urlFor(imageField)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline text-primary"> 
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title || 'Post image'}
          className="aspect-video rounded-xl object-cover"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="max-w-none"> {/* Container for PortableTextBlock, prose styling will be applied by the component itself */}
        <p className="text-sm text-muted-foreground mb-4">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {/* Use PortableTextBlock for consistent rendering */}
        {Array.isArray(post.body) && <PortableTextBlock value={post.body} />}
      </div>
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
  
  const imageField = post.image || post.mainImage;
  const postImageUrlForMeta = imageField ? urlFor(imageField)?.width(1200).height(630).url() : defaultOgImage;
  const publishedDate = new Date(post.publishedAt);
  const modifiedDate = post.updatedDate ? new Date(post.updatedDate) : publishedDate;

  return {
    title: post.title,
    description: post.excerpt || "A blog post from Nocturnal Codex.",
    alternates: {
      canonical: `/blog/${post.slug.current}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || "A blog post from Nocturnal Codex.",
      url: `${siteUrl}/blog/${post.slug.current}`,
      type: 'article',
      publishedTime: publishedDate.toISOString(),
      modifiedTime: modifiedDate.toISOString(), 
      authors: [post.author || "The Nocturnist"], 
      images: [
        {
          url: postImageUrlForMeta || defaultOgImage, // Fallback added here too
          width: 1200, 
          height: 630,
          alt: (imageField as any)?.alt || post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || "A blog post from Nocturnal Codex.",
      images: [postImageUrlForMeta || defaultOgImage], // Fallback added
    },
  };
}
