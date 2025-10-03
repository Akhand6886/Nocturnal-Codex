import { type NextRequest, NextResponse } from 'next/server';
import type { RouteContext } from 'next/dist/server/route-modules/app-route/module';

export async function POST(
  request: NextRequest,
  ctx: RouteContext<'/api/roadmaps/[id]'>
) {
  const { id } = await ctx.params;
  const body = await request.json();
  return NextResponse.json({
    message: `POST request for roadmap: ${id}`,
    data: body,
  });
}
