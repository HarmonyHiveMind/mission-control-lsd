"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Twitter,
  Users,
  Heart,
  Repeat2,
  MessageCircle,
  Eye,
  TrendingUp,
  Sparkles,
  Send,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  Lightbulb,
  Copy,
  Calendar,
  ArrowUpRight,
  RefreshCw,
  Zap,
} from "lucide-react";

interface XMetrics {
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

interface Tweet {
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

interface ContentIdea {
  id: string;
  topic: string;
  hook: string;
  angle: string;
  hashtags: string[];
  bestTime: string;
  trendScore: number;
}

interface XData {
  metrics: XMetrics;
  tweets: Tweet[];
  contentIdeas: ContentIdea[];
  replySuggestions: Array<{ trigger: string; response: string }>;
}

function MetricCard({ icon, label, value, change, changeLabel }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">{label}</span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">+{change}</span>
            {changeLabel && <span className="text-xs text-slate-500">{changeLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TweetComposer({ onPost }: { onPost: (text: string) => void }) {
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const maxLength = 280;

  const handlePost = async () => {
    if (!text.trim() || posting) return;
    setPosting(true);
    onPost(text);
    setText("");
    setPosting(false);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Send className="w-4 h-4 text-blue-400" />
          Compose Tweet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening in the gold market?"
          rows={3}
          maxLength={maxLength}
          className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none resize-none text-sm"
        />
        <div className="flex items-center justify-between">
          <span className={`text-xs ${text.length > maxLength * 0.9 ? 'text-amber-400' : 'text-slate-500'}`}>
            {text.length}/{maxLength}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-400 hover:text-white"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Schedule
            </Button>
            <Button
              size="sm"
              onClick={handlePost}
              disabled={!text.trim() || posting}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContentIdeaCard({ idea, onUse }: { idea: ContentIdea; onUse: (text: string) => void }) {
  const handleUse = () => {
    const tweet = `${idea.hook}\n\n${idea.hashtags.join(" ")}`;
    onUse(tweet);
  };

  return (
    <div className="p-3 rounded-lg border border-slate-600 bg-slate-700/30 hover:border-amber-500/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-white">{idea.topic}</span>
        </div>
        <Badge variant="outline" className={`text-xs ${
          idea.trendScore >= 90 ? 'border-green-500/50 text-green-400' :
          idea.trendScore >= 80 ? 'border-amber-500/50 text-amber-400' :
          'border-slate-500/50 text-slate-400'
        }`}>
          <Zap className="w-3 h-3 mr-1" />
          {idea.trendScore}
        </Badge>
      </div>
      <p className="text-sm text-slate-300 mb-2">{idea.hook}</p>
      <p className="text-xs text-slate-500 mb-2">{idea.angle}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {idea.hashtags.map((tag) => (
          <span key={tag} className="text-xs text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          <Clock className="w-3 h-3 inline mr-1" />
          Best: {idea.bestTime}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUse}
          className="h-7 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
        >
          <Copy className="w-3 h-3 mr-1" />
          Use
        </Button>
      </div>
    </div>
  );
}

function RecentTweet({ tweet }: { tweet: Tweet }) {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  return (
    <div className="p-3 rounded-lg border border-slate-700 bg-slate-800/30">
      <p className="text-sm text-slate-300 mb-2 line-clamp-2">{tweet.text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" /> {tweet.metrics.likes}
          </span>
          <span className="flex items-center gap-1">
            <Repeat2 className="w-3 h-3" /> {tweet.metrics.retweets}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> {tweet.metrics.replies}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" /> {tweet.metrics.impressions.toLocaleString()}
          </span>
        </div>
        <span className="text-xs text-slate-500">{timeAgo(tweet.createdAt)}</span>
      </div>
    </div>
  );
}

function ReplySuggestion({ trigger, response }: { trigger: string; response: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="p-3 rounded-lg border border-slate-700 bg-slate-800/30">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-xs">
          Trigger: "{trigger}"
        </Badge>
      </div>
      <p className="text-sm text-slate-300 mb-2">{response}</p>
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="h-6 text-xs text-slate-400 hover:text-white"
      >
        <Copy className="w-3 h-3 mr-1" />
        Copy
      </Button>
    </div>
  );
}

export function XBrand() {
  const [data, setData] = useState<XData | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [composerText, setComposerText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/x");
      const result = await response.json();
      if (result.ok) {
        setData(result.data);
        setConfigured(result.configured);
      }
    } catch (error) {
      console.error("Failed to fetch X data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async (text: string) => {
    try {
      const response = await fetch("/api/x/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const result = await response.json();
      if (result.ok) {
        fetchData(); // Refresh after posting
      }
    } catch (error) {
      console.error("Failed to post:", error);
    }
  };

  const handleUseIdea = (text: string) => {
    setComposerText(text);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <Twitter className="w-6 h-6 text-white" />
            </div>
            @DigitalGold Brand Command
          </h1>
          <p className="text-slate-400 mt-1">Manage your X presence and grow the sound money movement</p>
        </div>
        <div className="flex items-center gap-2">
          {!configured && (
            <Badge variant="outline" className="border-amber-500/50 text-amber-400">
              <AlertCircle className="w-3 h-3 mr-1" />
              Demo Mode
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            className="border-slate-600 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* API Status Warning */}
      {!configured && (
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-amber-400 font-medium">X API Not Configured</p>
              <p className="text-xs text-amber-400/70">
                Run <code className="bg-amber-500/20 px-1 rounded">xurl auth apps add</code> in Terminal to connect your @DigitalGold account.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {data && (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-5 gap-4">
            <MetricCard
              icon={<Users className="w-4 h-4" />}
              label="Followers"
              value={data.metrics.followers}
              change={data.metrics.growth.followersChange}
              changeLabel="this week"
            />
            <MetricCard
              icon={<Heart className="w-4 h-4" />}
              label="Total Likes"
              value={data.metrics.engagement.likes}
            />
            <MetricCard
              icon={<Repeat2 className="w-4 h-4" />}
              label="Retweets"
              value={data.metrics.engagement.retweets}
            />
            <MetricCard
              icon={<MessageCircle className="w-4 h-4" />}
              label="Replies"
              value={data.metrics.engagement.replies}
            />
            <MetricCard
              icon={<Eye className="w-4 h-4" />}
              label="Impressions"
              value={`${(data.metrics.engagement.impressions / 1000).toFixed(0)}K`}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Composer + Recent */}
            <div className="space-y-4">
              <TweetComposer onPost={handlePost} />
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Recent Posts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {data.tweets.slice(0, 3).map((tweet) => (
                    <RecentTweet key={tweet.id} tweet={tweet} />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Content Ideas */}
            <div className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Content Ideas
                    </CardTitle>
                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      Gold/Sound Money
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-400 text-xs">
                    AI-generated hooks tied to trending topics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.contentIdeas.map((idea) => (
                    <ContentIdeaCard key={idea.id} idea={idea} onUse={handleUseIdea} />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Reply Suggestions */}
            <div className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-purple-400" />
                    Reply Suggestions
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    Ready responses for common engagement topics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.replySuggestions.map((suggestion, i) => (
                    <ReplySuggestion key={i} {...suggestion} />
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">Growth Snapshot</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Followers</span>
                      <span className="text-green-400">+{data.metrics.growth.followersChange} ({data.metrics.growth.period})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Engagement Rate</span>
                      <span className="text-white">4.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Best Post Time</span>
                      <span className="text-white">9 AM EST</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
