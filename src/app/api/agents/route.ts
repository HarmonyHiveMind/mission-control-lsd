import { NextResponse } from "next/server";
import { listSessions, listSubAgents, getSessionStatus } from "@/lib/openclaw";

export async function GET() {
  try {
    const [sessions, subagents, mainStatus] = await Promise.all([
      listSessions({ activeMinutes: 60, messageLimit: 1 }),
      listSubAgents({ recentMinutes: 60 }),
      getSessionStatus(),
    ]);

    return NextResponse.json({
      ok: true,
      data: {
        sessions,
        subagents,
        mainStatus,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch agent data" },
      { status: 500 }
    );
  }
}
