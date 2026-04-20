import { NextResponse } from "next/server";
import { generateDailyBrief } from "@/lib/daily-brief";

export async function GET() {
  try {
    const brief = await generateDailyBrief();
    return NextResponse.json({ ok: true, brief });
  } catch (error) {
    console.error("Failed to generate brief:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to generate daily brief" },
      { status: 500 }
    );
  }
}

// Force dynamic rendering
export const dynamic = "force-dynamic";
