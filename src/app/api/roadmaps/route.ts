// This file is intentionally left blank as a placeholder.
// We will implement the API route to list all roadmaps here later.
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'API route for all roadmaps' });
}