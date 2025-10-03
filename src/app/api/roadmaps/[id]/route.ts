
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/roadmaps/[id].
 * @param request - The incoming Next.js request object.
 * @param context - An object containing the route parameters.
 * @param context.params - An object containing the dynamic segments of the URL.
 * @param context.params.id - The ID of the roadmap from the URL.
 * @returns A JSON response with a message.

/**
 * Handles POST requests to /api/roadmaps/[id].
 * @param request - The incoming Next.js request object containing the body.
 * @param context - An object containing the route parameters.
 * @param context.params - An object containing the dynamic segments of the URL.
 * @param context.params.id - The ID of the roadmap from the URL.
 * @returns A JSON response confirming the request and echoing the data.
 */
export async function POST(
  request: NextRequest,
  context: { params: { roadmapId: string } }
) {
  const { roadmapId } = context.params;
  const body = await request.json();
  return NextResponse.json({
    message: `POST request for roadmap: ${roadmapId}`,
    data: body,
  });
}
