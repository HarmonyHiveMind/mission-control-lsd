import { NextResponse } from "next/server";
import {
  isXurlConfigured,
  getMetrics,
  getRecentTweets,
  MOCK_METRICS,
  MOCK_TWEETS,
  CONTENT_IDEAS,
  REPLY_SUGGESTIONS,
} from "@/lib/x-api";

export async function GET() {
  const configured = await isXurlConfigured();

  if (configured) {
    // Use real API
    const [metrics, tweets] = await Promise.all([
      getMetrics(),
      getRecentTweets(10),
    ]);

    return NextResponse.json({
      ok: true,
      configured: true,
      data: {
        metrics: metrics || MOCK_METRICS,
        tweets: tweets.length > 0 ? tweets : MOCK_TWEETS,
        contentIdeas: CONTENT_IDEAS,
        replySuggestions: REPLY_SUGGESTIONS,
      },
    });
  }

  // Return mock data with warning
  return NextResponse.json({
    ok: true,
    configured: false,
    message: "X API not configured. Using demo data. Run: xurl auth apps add",
    data: {
      metrics: MOCK_METRICS,
      tweets: MOCK_TWEETS,
      contentIdeas: CONTENT_IDEAS,
      replySuggestions: REPLY_SUGGESTIONS,
    },
  });
}
