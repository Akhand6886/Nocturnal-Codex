
import { NextResponse } from 'next/server';
import { loadTopicContent } from '@/lib/roadmap-server-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Roadmap slug is required' }, { status: 400 });
  }

  try {
    const topicsContent = await loadTopicContent(slug);
    if (!topicsContent) {
      return NextResponse.json({ error: `No content found for roadmap: ${slug}` }, { status: 404 });
    }
    return NextResponse.json(topicsContent);
  } catch (error) {
    console.error(`Error loading topic content for ${slug}:`, error);
    return NextResponse.json({ error: 'Failed to load roadmap content' }, { status: 500 });
  }
}
