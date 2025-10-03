import { type NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;
  const body = await request.json();
  
  return NextResponse.json({
    message: `POST request for roadmap: ${id}`,
    data: body,
  });
}
