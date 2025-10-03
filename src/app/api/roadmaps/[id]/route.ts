// This file is intentionally left blank as a placeholder.
// We will implement the API route to get a specific roadmap here later.
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  return NextResponse.json({ message: `API route for roadmap: ${id}` });
}