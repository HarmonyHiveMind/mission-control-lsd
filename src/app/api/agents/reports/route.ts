import { NextResponse } from "next/server";
import { 
  getReportsForDate, 
  getAvailableDates, 
  getRecentReports,
  getAggregateStats 
} from "@/lib/reports";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const agent = searchParams.get('agent') || undefined;
    const outcome = searchParams.get('outcome') as 'success' | 'failure' | 'partial' | null;
    const search = searchParams.get('q') || undefined;
    const recent = searchParams.get('recent');

    // Get recent reports (for main dashboard)
    if (recent) {
      const limit = parseInt(recent) || 10;
      const reports = await getRecentReports(limit);
      const stats = await getAggregateStats();
      
      return NextResponse.json({
        ok: true,
        data: {
          reports,
          stats,
          availableDates: await getAvailableDates(),
        },
      });
    }

    // Get reports for specific date
    const targetDate = date || new Date().toISOString().split('T')[0];
    const reportData = await getReportsForDate(targetDate, {
      agent,
      outcome: outcome || undefined,
      search,
    });

    const availableDates = await getAvailableDates();

    if (!reportData) {
      return NextResponse.json({
        ok: true,
        data: {
          date: targetDate,
          stats: {
            total: 0,
            successful: 0,
            failed: 0,
            partial: 0,
            tokens: { input: 0, output: 0 },
          },
          reports: [],
          availableDates,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      data: {
        date: targetDate,
        stats: {
          total: reportData.totalRuns,
          successful: reportData.successful,
          failed: reportData.failed,
          partial: reportData.partial,
          tokens: reportData.totalTokens,
        },
        reports: reportData.reports,
        availableDates,
      },
    });
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch report data" },
      { status: 500 }
    );
  }
}
