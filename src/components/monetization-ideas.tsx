"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  BookOpen,
  Users,
  Zap,
  ArrowRight,
  Star,
  Target,
  Coins,
} from "lucide-react";

interface MonetizationIdea {
  id: string;
  title: string;
  description: string;
  revenueModel: string;
  effort: "low" | "medium" | "high";
  timeToRevenue: string;
  potentialRevenue: string;
  status: "idea" | "in-progress" | "launched";
  priority: number;
  icon: React.ReactNode;
  nextSteps: string[];
}

const MONETIZATION_IDEAS: MonetizationIdea[] = [
  {
    id: "1",
    title: "Gold Investment Guide eBook",
    description: "Comprehensive guide for beginners on sound money principles and gold investing strategies.",
    revenueModel: "One-time purchase ($27-47)",
    effort: "medium",
    timeToRevenue: "2-3 weeks",
    potentialRevenue: "$500-2,000/month",
    status: "idea",
    priority: 1,
    icon: <BookOpen className="w-5 h-5" />,
    nextSteps: [
      "Outline 10 chapters covering gold basics to advanced strategies",
      "Write 2 chapters per week",
      "Create landing page on Gumroad/Lemon Squeezy",
      "Promote via @DigitalGold threads",
    ],
  },
  {
    id: "2",
    title: "Weekly Gold Market Newsletter",
    description: "Premium newsletter with weekly gold analysis, price predictions, and buying opportunities.",
    revenueModel: "Subscription ($9.99/month)",
    effort: "medium",
    timeToRevenue: "1-2 weeks",
    potentialRevenue: "$1,000-5,000/month",
    status: "idea",
    priority: 2,
    icon: <TrendingUp className="w-5 h-5" />,
    nextSteps: [
      "Set up Substack or Beehiiv",
      "Write 3 free issues to build list",
      "Convert to paid after 500+ subscribers",
      "Promote via X threads and engagement",
    ],
  },
  {
    id: "3",
    title: "X Premium/Subscriptions",
    description: "Enable X Subscriptions for exclusive content, early analysis, and community access.",
    revenueModel: "X Subscriptions ($4.99/month)",
    effort: "low",
    timeToRevenue: "1 week",
    potentialRevenue: "$200-1,000/month",
    status: "idea",
    priority: 3,
    icon: <Users className="w-5 h-5" />,
    nextSteps: [
      "Apply for X Subscriptions (need 500+ followers ✅)",
      "Define subscriber-only content tiers",
      "Create exclusive threads/spaces",
      "Promote subscription benefits",
    ],
  },
  {
    id: "4",
    title: "Gold Stacking Consultation",
    description: "1-on-1 consultation calls for personalized gold investing strategies.",
    revenueModel: "Hourly ($100-200/hour)",
    effort: "low",
    timeToRevenue: "1 week",
    potentialRevenue: "$500-2,000/month",
    status: "idea",
    priority: 4,
    icon: <Target className="w-5 h-5" />,
    nextSteps: [
      "Set up Calendly with payment integration",
      "Create consultation packages (30min/60min)",
      "Add booking link to X bio",
      "Share client testimonials",
    ],
  },
  {
    id: "5",
    title: "LSD Token Presale/Waitlist",
    description: "Build waitlist for Legacy Syndicate Digital tokenized gold platform launch.",
    revenueModel: "Presale deposits / Launch revenue",
    effort: "high",
    timeToRevenue: "3-6 months",
    potentialRevenue: "$10,000-100,000+",
    status: "in-progress",
    priority: 5,
    icon: <Coins className="w-5 h-5" />,
    nextSteps: [
      "Complete Phase 1 Foundation",
      "Launch waitlist landing page",
      "Build email list via X content",
      "Prepare presale mechanics",
    ],
  },
];

function getEffortBadge(effort: string) {
  switch (effort) {
    case "low":
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Low Effort</Badge>;
    case "medium":
      return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">Medium Effort</Badge>;
    case "high":
      return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">High Effort</Badge>;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "idea":
      return <Badge variant="outline" className="border-slate-500 text-slate-400">Idea</Badge>;
    case "in-progress":
      return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">In Progress</Badge>;
    case "launched":
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Launched</Badge>;
    default:
      return null;
  }
}

function IdeaCard({ idea }: { idea: MonetizationIdea }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              {idea.icon}
            </div>
            <div>
              <CardTitle className="text-white text-base">{idea.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(idea.status)}
                {getEffortBadge(idea.effort)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-sm font-medium">#{idea.priority}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-400">{idea.description}</p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-2 rounded bg-slate-700/50">
            <p className="text-xs text-slate-500">Revenue Model</p>
            <p className="text-white font-medium">{idea.revenueModel}</p>
          </div>
          <div className="p-2 rounded bg-slate-700/50">
            <p className="text-xs text-slate-500">Potential</p>
            <p className="text-green-400 font-medium">{idea.potentialRevenue}</p>
          </div>
          <div className="p-2 rounded bg-slate-700/50 col-span-2">
            <p className="text-xs text-slate-500">Time to Revenue</p>
            <p className="text-amber-400 font-medium">{idea.timeToRevenue}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-2">Next Steps:</p>
          <ul className="space-y-1">
            {idea.nextSteps.slice(0, 3).map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-amber-500 mt-0.5">→</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
        >
          <Zap className="w-4 h-4 mr-2" />
          Start This Project
        </Button>
      </CardContent>
    </Card>
  );
}

export function MonetizationIdeas() {
  const totalPotential = "$12,200-110,000+/month";
  const quickWins = MONETIZATION_IDEAS.filter(i => i.effort === "low").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            Revenue Opportunities
          </h2>
          <p className="text-slate-400 text-sm">Fastest paths to monetary value</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Combined Potential</p>
          <p className="text-lg font-bold text-green-400">{totalPotential}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{quickWins}</p>
            <p className="text-xs text-green-400/70">Quick Wins (Low Effort)</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">1-2 weeks</p>
            <p className="text-xs text-amber-400/70">Fastest to Revenue</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">892</p>
            <p className="text-xs text-blue-400/70">@DigitalGold Followers</p>
          </CardContent>
        </Card>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MONETIZATION_IDEAS.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* 10% Rule Reminder */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border-green-500/30">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-400">10% Reinvestment Rule Active</p>
            <p className="text-xs text-green-400/70">
              10% of all revenue → Infrastructure & API credits → Better performance → More revenue
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
