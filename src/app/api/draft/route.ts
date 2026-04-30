import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchBlogPostBySlug, fetchThinkTankArticleBySlug } from '@/lib/contentful';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type');

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug || !type) {
    return new Response('Invalid token', { status: 401 });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  let post;
  if (type === 'blog') {
    post = await fetchBlogPostBySlug(slug, true);
  } else if (type === 'thinkTankArticle') {
    post = await fetchThinkTankArticleBySlug(slug, true);
  }

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!post) {
    return new Response('Invalid slug', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Redirect to the path from the fetched post
  const redirectPath = type === 'blog' ? `/blog/${post.slug}` : `/think-tank/${post.slug}`;
  redirect(redirectPath);
}
