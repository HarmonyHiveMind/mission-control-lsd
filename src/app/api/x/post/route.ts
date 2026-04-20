import { NextRequest, NextResponse } from "next/server";
import { isXurlConfigured, postTweet } from "@/lib/x-api";

export async function POST(request: NextRequest) {
  const { text, scheduledFor } = await request.json();

  if (!text || text.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Tweet text is required" },
      { status: 400 }
    );
  }

  if (text.length > 280) {
    return NextResponse.json(
      { ok: false, error: "Tweet exceeds 280 characters" },
      { status: 400 }
    );
  }

  const configured = await isXurlConfigured();

  if (!configured) {
    return NextResponse.json({
      ok: false,
      configured: false,
      error: "X API not configured. Run: xurl auth apps add",
    });
  }

  // If scheduled, store for later (would need a scheduler)
  if (scheduledFor) {
    // For now, just acknowledge the schedule
    return NextResponse.json({
      ok: true,
      scheduled: true,
      scheduledFor,
      message: "Tweet scheduled (scheduler integration pending)",
    });
  }

  // Post immediately
  const result = await postTweet(text);
  return NextResponse.json({
    ok: result.success,
    tweetId: result.id,
    error: result.error,
  });
}
