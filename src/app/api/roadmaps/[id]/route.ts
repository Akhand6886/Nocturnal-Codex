import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop() // extract [id] dynamically
  return NextResponse.json({ message: `GET request for roadmap: ${id}` })
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()
  const body = await request.json()
  return NextResponse.json({ message: `POST request for roadmap: ${id}`, data: body })
}
