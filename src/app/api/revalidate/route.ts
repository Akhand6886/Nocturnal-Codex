import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('x-contentful-webhook-secret');
    
    if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    
    // You could theoretically be more granular and use revalidatePath based on the entity type (blog vs think tank)
    // However, revalidateTag('contentful') clears any fetch that used next: { tags: ['contentful'] }
    // which is very efficient and ensures all lists and slugs are perfectly up-to-date instantly.
    
    revalidateTag('contentful');
    
    console.log(`Revalidated contentful tag due to webhook for entry: ${body?.sys?.id}`);
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
