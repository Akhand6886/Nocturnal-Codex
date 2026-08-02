import { NextResponse } from "next/server";
import { saveStudentTelemetry, getAllStudentTelemetry } from "@/lib/telemetryStore";

// GET /api/python/telemetry - Fetch all 100+ student telemetry for Admin Dashboard
export async function GET() {
  try {
    const students = getAllStudentTelemetry();
    return NextResponse.json({
      success: true,
      totalStudents: students.length,
      students
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/python/telemetry - Update live student heartbeat & progress
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: "Student Name required" }, { status: 400 });
    }

    const saved = saveStudentTelemetry({
      id: body.id || `student-${body.name}`,
      name: body.name,
      xp: body.xp || 0,
      rank: body.rank || "E-Class Programmer",
      level: body.level || 1,
      completedDungeons: body.completedDungeons || [],
      currentTask: body.currentTask || "Active Training",
      inPenaltyZone: !!body.inPenaltyZone,
      clanCode: body.clanCode || "",
      clanName: body.clanName || "",
      lastActive: new Date().toISOString()
    });

    return NextResponse.json({ success: true, student: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
