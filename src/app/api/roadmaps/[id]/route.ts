
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  
  return NextResponse.json({
    message: `POST request for roadmap: ${id}`,
    data: body,
  });
}
