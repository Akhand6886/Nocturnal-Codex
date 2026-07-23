import { NextResponse } from "next/server";
import { createClan, joinClan, getAllClans } from "@/lib/telemetryStore";

// GET /api/python/clan - List all Clans & Competition leaderboards
export async function GET() {
  try {
    const clans = getAllClans();
    return NextResponse.json({ success: true, count: clans.length, clans });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/python/clan - Create a new Clan or Join via Clan Code
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, name, creatorName, description, code, studentName } = body;

    if (action === "create") {
      if (!name || !creatorName) {
        return NextResponse.json({ success: false, error: "Clan Name and Creator Name required" }, { status: 400 });
      }
      const newClan = createClan(name, creatorName, description || "");
      return NextResponse.json({ success: true, message: "Clan created successfully", clan: newClan });
    }

    if (action === "join") {
      if (!code || !studentName) {
        return NextResponse.json({ success: false, error: "Clan Code and Student Name required" }, { status: 400 });
      }
      const clan = joinClan(code, studentName);
      if (!clan) {
        return NextResponse.json({ success: false, error: `Invalid Clan Code '${code}'. Clan not found.` }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: `Successfully joined ${clan.name}`, clan });
    }

    return NextResponse.json({ success: false, error: "Invalid action. Use 'create' or 'join'." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
