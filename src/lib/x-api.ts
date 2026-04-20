// X (Twitter) API client via xurl CLI
// Will use real API once xurl is configured

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface XMetrics {
  followers: number;
  following: number;
  tweets: number;
  engagement: {
    likes: number;
    retweets: number;
    replies: number;
    impressions: number;
  };
  growth: {
    followersChange: number;
    period: string;
  };
}

export interface Tweet {
  id: string;
  text: string;
  createdAt: string;
  metrics: {
    likes: number;
    retweets: number;
    replies: number;
    impressions: number;
  };
}

export interface ContentIdea {
  id: string;
  topic: string;
  hook: string;
  angle: string;
  hashtags: string[];
  bestTime: string;
  trendScore: number;
}

// Check if xurl is configured with OAuth2
export async function isXurlConfigured(): Promise<boolean> {
  try {
    const { stdout } = await execAsync("xurl auth status 2>&1");
    // Check for actual OAuth2 authentication (a username after oauth2:, not "(none)")
    // Look for pattern like "oauth2: SomeUsername" where SomeUsername is not "(none)"
    const oauth2Match = stdout.match(/oauth2:\s+(\S+)/g);
    if (oauth2Match) {
      // Check if any oauth2 line has an actual username (not "(none)")
      return oauth2Match.some(match => !match.includes("(none)"));
    }
    return false;
  } catch {
    return false;
  }
}

// Get user metrics
export async function getMetrics(): Promise<XMetrics | null> {
  const configured = await isXurlConfigured();
  if (!configured) return null;

  try {
    const { stdout } = await execAsync("xurl whoami 2>&1");
    const data = JSON.parse(stdout);
    const metrics = data.data?.public_metrics;
    
    return {
      followers: metrics?.followers_count || 0,
      following: metrics?.following_count || 0,
      tweets: metrics?.tweet_count || 0,
      engagement: {
        likes: metrics?.like_count || 0,
        retweets: 0,
        replies: 0,
        impressions: 0,
      },
      growth: {
        followersChange: 0,
        period: "7d",
      },
    };
  } catch (error) {
    console.error("Failed to fetch X metrics:", error);
    return null;
  }
}

// Get recent tweets
export async function getRecentTweets(limit: number = 10): Promise<Tweet[]> {
  const configured = await isXurlConfigured();
  if (!configured) return [];

  try {
    const { stdout } = await execAsync(`xurl tweets timeline --limit ${limit} --json 2>&1`);
    const data = JSON.parse(stdout);
    
    return (data.data || []).map((tweet: Record<string, unknown>) => ({
      id: tweet.id,
      text: tweet.text,
      createdAt: tweet.created_at,
      metrics: {
        likes: (tweet.public_metrics as Record<string, number>)?.like_count || 0,
        retweets: (tweet.public_metrics as Record<string, number>)?.retweet_count || 0,
        replies: (tweet.public_metrics as Record<string, number>)?.reply_count || 0,
        impressions: (tweet.public_metrics as Record<string, number>)?.impression_count || 0,
      },
    }));
  } catch (error) {
    console.error("Failed to fetch tweets:", error);
    return [];
  }
}

// Post a tweet
export async function postTweet(text: string): Promise<{ success: boolean; id?: string; error?: string }> {
  const configured = await isXurlConfigured();
  if (!configured) {
    return { success: false, error: "X API not configured. Run: xurl auth oauth2" };
  }

  try {
    // Escape the text properly for shell
    const escapedText = text.replace(/'/g, "'\\''");
    const { stdout } = await execAsync(`xurl post '${escapedText}' 2>&1`);
    const data = JSON.parse(stdout);
    return { success: true, id: data.data?.id };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// Mock data for when API is not configured
export const MOCK_METRICS: XMetrics = {
  followers: 2847,
  following: 412,
  tweets: 1893,
  engagement: {
    likes: 12450,
    retweets: 3280,
    replies: 1560,
    impressions: 458000,
  },
  growth: {
    followersChange: 124,
    period: "7d",
  },
};

export const MOCK_TWEETS: Tweet[] = [
  {
    id: "1",
    text: "Gold isn't just money—it's a statement of financial sovereignty. In a world of infinite QE, choose finite value. 🥇 #SoundMoney #Gold",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    metrics: { likes: 47, retweets: 12, replies: 8, impressions: 2340 },
  },
  {
    id: "2", 
    text: "Central banks added 1,037 tonnes of gold in 2024. They know something. Do you? 📈 #GoldStandard",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    metrics: { likes: 89, retweets: 34, replies: 15, impressions: 5670 },
  },
  {
    id: "3",
    text: "The best time to buy gold was 20 years ago. The second best time is now. Protect your wealth. 💰",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    metrics: { likes: 156, retweets: 67, replies: 23, impressions: 12400 },
  },
];

export const CONTENT_IDEAS: ContentIdea[] = [
  {
    id: "1",
    topic: "Gold vs Inflation",
    hook: "Your savings lost 20% in 4 years. Gold holders? Up 45%.",
    angle: "Compare purchasing power of USD vs gold since 2020",
    hashtags: ["#Inflation", "#Gold", "#SoundMoney", "#WealthPreservation"],
    bestTime: "9:00 AM EST",
    trendScore: 92,
  },
  {
    id: "2",
    topic: "Central Bank Gold Buying",
    hook: "Central banks are buying gold at record pace. Here's why that matters for you.",
    angle: "Institutional validation of gold as reserve asset",
    hashtags: ["#CentralBanks", "#GoldReserves", "#Dedollarization"],
    bestTime: "12:00 PM EST",
    trendScore: 88,
  },
  {
    id: "3",
    topic: "Tokenized Gold",
    hook: "Own gold. Trade instantly. No storage fees. The future is here.",
    angle: "Benefits of tokenized gold vs physical",
    hashtags: ["#TokenizedGold", "#DeFi", "#DigitalAssets", "#LSD"],
    bestTime: "3:00 PM EST",
    trendScore: 85,
  },
  {
    id: "4",
    topic: "Gold Mining Costs",
    hook: "It costs $1,400 to mine an ounce of gold. Spot price: $2,890. Do the math.",
    angle: "Production costs as price floor indicator",
    hashtags: ["#GoldMining", "#GoldPrice", "#Investment"],
    bestTime: "11:00 AM EST",
    trendScore: 78,
  },
  {
    id: "5",
    topic: "BRICS & Gold",
    hook: "BRICS nations hold 20% of global gold reserves. A new monetary order is forming.",
    angle: "Geopolitical shift toward gold-backed trade",
    hashtags: ["#BRICS", "#Dedollarization", "#GoldStandard", "#Geopolitics"],
    bestTime: "7:00 AM EST",
    trendScore: 95,
  },
];

export const REPLY_SUGGESTIONS = [
  {
    trigger: "bitcoin vs gold",
    response: "Both have their place! Bitcoin is digital scarcity, gold is 5,000 years of proven store of value. Why not diversify with both? 🥇₿",
  },
  {
    trigger: "gold price prediction",
    response: "I focus on fundamentals: central bank buying, inflation hedge, geopolitical uncertainty. The trend is your friend. 📈",
  },
  {
    trigger: "how to buy gold",
    response: "Options: Physical (coins/bars), ETFs (GLD, IAU), mining stocks, or tokenized gold for instant liquidity. DM for more details! 💰",
  },
  {
    trigger: "gold is outdated",
    response: "Central banks added 1,000+ tonnes last year. Seems like the big players disagree! Gold's been money for 5,000 years for a reason. 🏛️",
  },
];
