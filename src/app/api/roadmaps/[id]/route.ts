import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const id = context.params.id
  return NextResponse.json({ message: `API route for roadmap: ${id}` })
}
