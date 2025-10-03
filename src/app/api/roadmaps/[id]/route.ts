import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  return NextResponse.json({ message: `API route for roadmap: ${id}` })
}
