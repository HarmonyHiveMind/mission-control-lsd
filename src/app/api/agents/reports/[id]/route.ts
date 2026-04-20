import { NextResponse } from "next/server";
import { getReportById } from "@/lib/reports";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Report ID required" },
        { status: 400 }
      );
    }

    const report = await getReportById(id);

    if (!report) {
      return NextResponse.json(
        { ok: false, error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: report,
    });
  } catch (error) {
    console.error("Failed to fetch report:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}
