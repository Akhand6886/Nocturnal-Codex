export async function POST(
  request: NextRequest,
  context: { params: { id: string } }  // Changed from roadmapId to id
) {
  const { id } = context.params;  // Changed from roadmapId to id
  const body = await request.json();
  return NextResponse.json({
    message: `POST request for roadmap: ${id}`,
    data: body,
  });
}
