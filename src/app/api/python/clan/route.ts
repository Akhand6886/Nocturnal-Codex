import { NextResponse } from "next/server";
import { createGuild, joinGuild, getAllGuilds } from "@/lib/telemetryStore";

// GET /api/python/clan - List all Guilds & Competition leaderboards
export async function GET() {
  try {
    const guilds = getAllGuilds();
    return NextResponse.json({ success: true, count: guilds.length, clans: guilds, guilds });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/python/clan - Create a new Guild or Join via Guild Code
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, name, creatorName, description, code, guildCode, studentName } = body;

    const targetCode = code || guildCode;

    if (action === "create") {
      if (!name || !creatorName) {
        return NextResponse.json({ success: false, error: "Guild Name and Creator Name are required" }, { status: 400 });
      }
      const newGuild = createGuild(name, creatorName, description || "");
      return NextResponse.json({ success: true, message: "Guild created successfully", guild: newGuild, clan: newGuild });
    }

    if (action === "join") {
      if (!targetCode || !studentName) {
        return NextResponse.json({ success: false, error: "Guild Code and Student Name are required" }, { status: 400 });
      }
      const guild = joinGuild(targetCode, studentName);
      if (!guild) {
        return NextResponse.json({ success: false, error: `Invalid Guild Code '${targetCode}'. Guild not found. Check code and try again!` }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: `Successfully joined ${guild.name}! Ready for Guild Raid!`, guild, clan: guild });
    }

    return NextResponse.json({ success: false, error: "Invalid action. Use 'create' or 'join'." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
