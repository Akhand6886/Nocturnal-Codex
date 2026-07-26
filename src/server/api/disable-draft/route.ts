import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();
  
  // Return to the homepage or the provided redirect path
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  redirect(path);
}
