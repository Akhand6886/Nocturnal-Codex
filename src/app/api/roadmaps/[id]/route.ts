import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const { id } = context.params
  return NextResponse.json({ message: `GET request for roadmap: ${id}` })
}

export async function POST(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const { id } = context.params
  const body = await request.json()
  return NextResponse.json({ message: `POST request for roadmap: ${id}`, data: body })
}
