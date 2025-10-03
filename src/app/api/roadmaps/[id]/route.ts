import { type NextRequest, NextResponse } from 'next/server'

interface RouteContext {
  params: {
    id: string;
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const { id } = params;
  return NextResponse.json({ message: `GET request for roadmap: ${id}` })
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext
) {
  const { id } = params;
  const body = await request.json()
  return NextResponse.json({ message: `POST request for roadmap: ${id}`, data: body })
}
