'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  Rocket,
  CheckCircle,
  ArrowRight,
  Trophy,
  Bot,
  Hammer,
  Mail,
  Search,
  Sparkles
} from 'lucide-react';

interface IdeaScore {
  feasibility: number;
  revenue: number;
  mission: number;
  risk: number;
  scalability: number;
  total: number;
}

interface BusinessIdea {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  market: string;
  revenueTarget: string;
  scores: IdeaScore;
  status: 'recommended' | 'validated' | 'exploring';
}

const ideas: BusinessIdea[] = [
  {
    id: 'skillforge',
    name: 'SkillForge',
    tagline: 'AI Agent Skills Development Agency',
    problem: 'The AI agents market is exploding ($7.6B → $183B by 2033). 60% of Fortune 500 deploy agents. But no one builds the skills these agents need.',
    solution: 'Build and sell custom AgentSkills for OpenClaw, LangChain, CrewAI. Custom development ($1.5K-$50K), skill bundles, maintenance retainers, ClawHub marketplace.',
    market: '$3.6B-$36B TAM by 2033. No direct competitor for standardized skills-as-a-service.',
    revenueTarget: '$15,000/month in 90 days',
    scores: { feasibility: 8, revenue: 9, mission: 10, risk: 6, scalability: 9, total: 42 },
    status: 'recommended'
  },
  {
    id: 'bugsquash',
    name: 'BugSquash',
    tagline: 'Autonomous GitHub Issue Resolution',
    problem: 'Every software project has a backlog of unfixed issues. OSS maintainers are drowning. Enterprises have years of technical debt.',
    solution: 'AI agents that monitor repos, analyze issues, implement fixes, open PRs, respond to reviews. Bill only on success (merged PR).',
    market: '$500M-$2B for automated issue resolution. Codegen validated with 230K+ PRs at 52% merge rate.',
    revenueTarget: '$8,000/month in 90 days',
    scores: { feasibility: 7, revenue: 8, mission: 9, risk: 5, scalability: 8, total: 37 },
    status: 'validated'
  },
  {
    id: 'soundmoney',
    name: 'SoundMoney Studio',
    tagline: 'AI-Powered Financial Content Agency',
    problem: 'Financial services spend $23.3M avg on content but face lowest consumer trust. Traditional agencies are slow and expensive.',
    solution: 'AI agents produce fintech/crypto/wealth content with human oversight. Packages from $1,500-$7,500/month.',
    market: '$400-500B content marketing market. 14-16% CAGR. Financial content commands 20-50% premium.',
    revenueTarget: '$10,000/month in 90 days',
    scores: { feasibility: 9, revenue: 7, mission: 8, risk: 7, scalability: 7, total: 38 },
    status: 'recommended'
  }
];

function ScoreBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  const percentage = (value / max) * 100;
  const color = value >= 8 ? 'bg-green-500' : value >= 6 ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-24 text-zinc-400">{label}</span>
      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="w-6 text-right text-zinc-300">{value}</span>
    </div>
  );
}

function IdeaCard({ idea }: { idea: BusinessIdea }) {
  const [expanded, setExpanded] = useState(false);
  
  const statusColors = {
    recommended: 'bg-green-500/20 text-green-400 border-green-500/30',
    validated: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    exploring: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
  };
  
  const statusLabels = {
    recommended: '★ RECOMMENDED',
    validated: 'Validated',
    exploring: 'Exploring'
  };

  return (
    <div className={`bg-zinc-900 border rounded-lg p-6 ${idea.status === 'recommended' ? 'border-green-500/50' : 'border-zinc-800'}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white">{idea.name}</h3>
            <span className={`text-xs px-2 py-1 rounded border ${statusColors[idea.status]}`}>
              {statusLabels[idea.status]}
            </span>
          </div>
          <p className="text-zinc-400">{idea.tagline}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{idea.scores.total}</div>
          <div className="text-xs text-zinc-500">/ 50</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-zinc-800/50 rounded-lg p-3">
          <div className="text-xs text-zinc-500 mb-1">90-Day Target</div>
          <div className="text-lg font-semibold text-green-400">{idea.revenueTarget}</div>
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-3">
          <div className="text-xs text-zinc-500 mb-1">Market Size</div>
          <div className="text-sm text-zinc-300">{idea.market.split('.')[0]}</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <ScoreBar label="Feasibility" value={idea.scores.feasibility} />
        <ScoreBar label="Revenue" value={idea.scores.revenue} />
        <ScoreBar label="Mission" value={idea.scores.mission} />
        <ScoreBar label="Risk" value={idea.scores.risk} />
        <ScoreBar label="Scale" value={idea.scores.scalability} />
      </div>

      <button 
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
      >
        {expanded ? 'Show less' : 'Show details'}
        <ArrowRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4 text-sm">
          <div>
            <div className="text-zinc-500 mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Problem
            </div>
            <p className="text-zinc-300">{idea.problem}</p>
          </div>
          <div>
            <div className="text-zinc-500 mb-1 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Solution
            </div>
            <p className="text-zinc-300">{idea.solution}</p>
          </div>
          <div>
            <div className="text-zinc-500 mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Market
            </div>
            <p className="text-zinc-300">{idea.market}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BusinessIdeasPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold">Oden's Business Ideas</h1>
          </div>
          <p className="text-zinc-400">
            Researched by AI sub-agents. Scored on feasibility, revenue potential, mission alignment, risk, and scalability.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <div className="text-amber-500 font-semibold mb-1">Mission Alignment Check</div>
              <p className="text-zinc-300 text-sm italic">
                "The primary goal of all agents is to create an autonomous organization of AI agents that works for Romo 24/7/365 to produce ongoing monetary value and change the world for the better."
              </p>
            </div>
          </div>
        </div>

        {/* NEW: Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/business-ideas/new-ideas" className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-4 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="font-semibold text-purple-400">NEW: 3 Fresh Ideas</span>
            </div>
            <p className="text-xs text-zinc-400">ClawForge, InboxZero, GoldIntel — Researched Mar 24</p>
            <div className="mt-2 text-xs text-zinc-500">Combined Year 1: $520K+ potential</div>
          </Link>
          <Link href="/business-ideas/soundmoney-studio" className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 hover:border-green-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-green-400">SoundMoney Studio</span>
            </div>
            <p className="text-xs text-zinc-400">Skool community — 3-tier model finalized</p>
            <div className="mt-2 text-xs text-zinc-500">Year 1 target: $711K ARR</div>
          </Link>
          <Link href="/business-ideas/autonomy" className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-blue-400">99% Autonomy Plan</span>
            </div>
            <p className="text-xs text-zinc-400">Felix analysis — Cost optimization applied</p>
            <div className="mt-2 text-xs text-zinc-500">Target: 1-2 hrs/week human time</div>
          </Link>
        </div>

        {/* Ideas Grid */}
        <div className="grid gap-6 mb-8">
          {ideas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        {/* Recommendation */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Trophy className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Updated Recommendation: SoundMoney Studio</h3>
              <p className="text-zinc-400 text-sm mb-3">Fastest path to revenue — targeting $10K MRR in 90 days</p>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Built-in credibility via @DigitalGold (886 followers in niche)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Clear deliverables clients understand (content, not code)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Recurring revenue model (monthly retainers)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Only 6-8 clients needed to hit $10K/mo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Oden can produce content autonomously with approval workflows
                </li>
              </ul>
              <a 
                href="/business-ideas/soundmoney-studio" 
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400 transition-colors"
              >
                View Expanded Plan <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-zinc-500 text-sm">
          Full research reports available in ~/workspace/business-ideas/
        </div>
      </div>
    </div>
  );
}
