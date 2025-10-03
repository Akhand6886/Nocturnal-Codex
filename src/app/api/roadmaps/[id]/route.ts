import { NextRequest, NextResponse } from 'next/server'

// Universal type for dynamic route context
type RouteContext = { params: Record<string, string> }

/**
 * GET handler for /api/roadmaps/[id]
 */
export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = context.params
  return NextResponse.json({ message: `GET request for roadmap: ${id}` })
}

/**
 * POST handler for /api/roadmaps/[id]
 */
export async function POST(req: NextRequest, context: RouteContext) {
  const { id } = context.params
  const body = await req.json() // parse JSON body if sent
  return NextResponse.json({
    message: `POST request for roadmap: ${id}`,
    data: body,
  })
}

/**
 * You can similarly add PUT, DELETE, PATCH handlers using the same context type:
 * 
 * export async function PUT(req: NextRequest, context: RouteContext) { ... }
 * export async function DELETE(req: NextRequest, context: RouteContext) { ... }
 */
