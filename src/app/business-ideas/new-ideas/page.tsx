'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Hammer,
  Search,
  Mail,
  TrendingUp,
  Shield,
  Target,
  DollarSign,
  AlertTriangle,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';

interface IdeaData {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  overallScore: number;
  scores: {
    feasibility: number;
    revenue: number;
    mission: number;
    risk: number;
    scalability: number;
  };
  year1Revenue: string;
  year2Revenue: string;
  keyInsight: string;
  pricing: string[];
  targetCustomers: string[];
  goNoGo: 'go' | 'conditional' | 'no';
  recommendation: string;
  thirtyDayPlan: string[];
  risks: string[];
  dependencies: string[];
  resourceNeeds: { item: string; cost: string }[];
}

const ideas: IdeaData[] = [
  {
    id: 'clawforge',
    name: 'ClawForge',
    tagline: 'AI Agent Setup Agency',
    icon: <Hammer className="w-6 h-6" />,
    color: 'orange',
    overallScore: 7.8,
    scores: { feasibility: 8, revenue: 8, mission: 9, risk: 6, scalability: 7 },
    year1Revenue: '$130K',
    year2Revenue: '$320K',
    keyInsight: '"Use agents to help set up agents" — 70% of delivery can be automated by Phase 3',
    pricing: ['$2,000 setup fee', '$500/mo maintenance', '$8K first year value per client'],
    targetCustomers: ['Content creators', 'Coaches/consultants', 'Small business owners', 'Solopreneurs'],
    goNoGo: 'go',
    recommendation: 'Proceed immediately — market timing is optimal. Target coaches/consultants first.',
    thirtyDayPlan: [
      'Week 1: Create landing page + waitlist',
      'Week 2: Build case study from own agent (Oden)',
      'Week 3: Outreach to 50 coaches/consultants',
      'Week 4: Close first 3 pilot clients at $1,500'
    ],
    risks: ['OpenClaw development pace', 'API cost volatility', 'Client technical illiteracy', 'Key person dependency'],
    dependencies: ['Reliable AI APIs', 'OpenClaw stability', 'Client infrastructure', 'Payment processing'],
    resourceNeeds: [
      { item: 'Landing page + CRM', cost: '$100/mo' },
      { item: 'API credits for client setups', cost: '$200/mo' },
      { item: 'Marketing (LinkedIn ads)', cost: '$500/mo' },
      { item: 'Total Month 1', cost: '$800' }
    ]
  },
  {
    id: 'inboxzero',
    name: 'InboxZero Agency',
    tagline: 'AI Executive Assistant Service',
    icon: <Mail className="w-6 h-6" />,
    color: 'blue',
    overallScore: 7.6,
    scores: { feasibility: 8, revenue: 7, mission: 9, risk: 6, scalability: 8 },
    year1Revenue: '$210K',
    year2Revenue: '$500K+',
    keyInsight: 'The $200-500/mo tier is underserved. Superhuman is a tool ($25). Human VAs start at $390/mo. InboxZero fills the "done-for-you at tool prices" gap.',
    pricing: ['Solo: $197/mo', 'Pro: $497/mo', 'Executive: $997/mo'],
    targetCustomers: ['Startup founders', 'Executives without EAs', 'Coaches/consultants', 'Sales professionals'],
    goNoGo: 'conditional',
    recommendation: 'Start with "Draft Mode" MVP — AI prepares, user approves with one click. Target YC/TechStars founders.',
    thirtyDayPlan: [
      'Week 1: Build landing page + waitlist',
      'Week 2: Interview 20 potential customers',
      'Week 3: Create demo video showing AI handling inbox',
      'Week 4: Launch "Draft Mode" MVP for 10 beta users'
    ],
    risks: ['AI commoditization (Gmail/Outlook native AI)', 'Churn risk', 'Security breach', 'Trust barriers'],
    dependencies: ['Gmail/Outlook API access', 'LLM provider reliability', 'Customer trust'],
    resourceNeeds: [
      { item: 'Email API integration', cost: '$50/mo' },
      { item: 'API credits', cost: '$300/mo' },
      { item: 'Landing page + auth', cost: '$100/mo' },
      { item: 'Total Month 1', cost: '$450' }
    ]
  },
  {
    id: 'goldintel',
    name: 'GoldIntel',
    tagline: 'Fintech Research-as-a-Service',
    icon: <Search className="w-6 h-6" />,
    color: 'yellow',
    overallScore: 7.0,
    scores: { feasibility: 7, revenue: 6, mission: 9, risk: 5, scalability: 8 },
    year1Revenue: '$180K',
    year2Revenue: '$500K+',
    keyInsight: 'No player currently offers AI-powered daily research at SMB pricing with sound money + fintech crossover coverage.',
    pricing: ['Starter: $297/mo', 'Professional: $697/mo', 'Enterprise: $1,497/mo'],
    targetCustomers: ['RIAs', 'Family offices', 'Fintech startups', 'Crypto funds', 'Wealth managers'],
    goNoGo: 'conditional',
    recommendation: 'Launch free weekly newsletter first. Validate demand before building paid tiers. Prioritize compliance.',
    thirtyDayPlan: [
      'Week 1: Set up newsletter infrastructure',
      'Week 2: Create first 4 weekly briefs',
      'Week 3: Launch "GoldIntel Weekly" free newsletter',
      'Week 4: Promote on LinkedIn, target 500 subscribers'
    ],
    risks: ['Regulatory/compliance', 'AI quality failure', 'Competitor entry', 'Data source disruption'],
    dependencies: ['Data feeds (WGC, LBMA)', 'Legal review ($10-25K)', 'Part-time editor'],
    resourceNeeds: [
      { item: 'Newsletter platform', cost: '$50/mo' },
      { item: 'API credits for research', cost: '$200/mo' },
      { item: 'Legal review (upfront)', cost: '$15,000' },
      { item: 'Total Month 1', cost: '$15,250' }
    ]
  }
];

function ScoreBar({ score, label }: { score: number; label: string }) {
  const getColor = (s: number) => {
    if (s >= 8) return 'bg-green-500';
    if (s >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-500 w-20">{label}</span>
      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor(score)} transition-all`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-xs text-zinc-400 w-6">{score}</span>
    </div>
  );
}

function IdeaCard({ idea, isExpanded, onToggle }: { idea: IdeaData; isExpanded: boolean; onToggle: () => void }) {
  const colorClasses = {
    orange: 'from-orange-500 to-amber-600 border-orange-500/50',
    blue: 'from-blue-500 to-cyan-600 border-blue-500/50',
    yellow: 'from-yellow-500 to-amber-500 border-yellow-500/50'
  };
  
  return (
    <div className={`bg-zinc-900 border ${idea.color === 'orange' ? 'border-orange-500/30' : idea.color === 'blue' ? 'border-blue-500/30' : 'border-yellow-500/30'} rounded-lg overflow-hidden`}>
      {/* Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[idea.color as keyof typeof colorClasses]} flex items-center justify-center`}>
              {idea.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg">{idea.name}</h3>
              <p className="text-sm text-zinc-400">{idea.tagline}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{idea.overallScore}</div>
            <div className="text-xs text-zinc-500">/10</div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{idea.year1Revenue}</div>
            <div className="text-xs text-zinc-500">Year 1</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{idea.year2Revenue}</div>
            <div className="text-xs text-zinc-500">Year 2</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${idea.goNoGo === 'go' ? 'text-green-400' : idea.goNoGo === 'conditional' ? 'text-yellow-400' : 'text-red-400'}`}>
              {idea.goNoGo === 'go' ? '✓ GO' : idea.goNoGo === 'conditional' ? '⚠️ CONDITIONAL' : '✗ NO'}
            </div>
            <div className="text-xs text-zinc-500">Verdict</div>
          </div>
        </div>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-zinc-800 p-4 space-y-6">
          {/* Scores */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-400 mb-3">Score Breakdown</h4>
            <div className="space-y-2">
              <ScoreBar score={idea.scores.feasibility} label="Feasibility" />
              <ScoreBar score={idea.scores.revenue} label="Revenue" />
              <ScoreBar score={idea.scores.mission} label="Mission" />
              <ScoreBar score={idea.scores.risk} label="Risk" />
              <ScoreBar score={idea.scores.scalability} label="Scale" />
            </div>
          </div>
          
          {/* Key Insight */}
          <div className="bg-zinc-800/50 p-3 rounded-lg">
            <div className="text-xs text-zinc-500 mb-1">Key Insight</div>
            <p className="text-sm text-zinc-300 italic">"{idea.keyInsight}"</p>
          </div>
          
          {/* Pricing & Customers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 mb-2">Pricing</h4>
              <ul className="space-y-1">
                {idea.pricing.map((p, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-green-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 mb-2">Target Customers</h4>
              <ul className="space-y-1">
                {idea.targetCustomers.map((c, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-center gap-1">
                    <Target className="w-3 h-3 text-blue-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 30-Day Plan */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-400 mb-2 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              30-Day Plan
            </h4>
            <div className="space-y-2">
              {idea.thirtyDayPlan.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>
          
          {/* Risks & Dependencies */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 mb-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Risks
              </h4>
              <ul className="space-y-1">
                {idea.risks.map((r, i) => (
                  <li key={i} className="text-xs text-zinc-400">• {r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 mb-2 flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-500" />
                Dependencies
              </h4>
              <ul className="space-y-1">
                {idea.dependencies.map((d, i) => (
                  <li key={i} className="text-xs text-zinc-400">• {d}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Resource Needs */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-400 mb-2 flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              Resource Needs (Month 1)
            </h4>
            <div className="bg-zinc-800/50 rounded p-2">
              {idea.resourceNeeds.map((r, i) => (
                <div key={i} className={`flex justify-between text-xs py-1 ${i === idea.resourceNeeds.length - 1 ? 'border-t border-zinc-700 font-semibold text-white' : 'text-zinc-400'}`}>
                  <span>{r.item}</span>
                  <span>{r.cost}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommendation */}
          <div className={`p-3 rounded-lg ${idea.goNoGo === 'go' ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
            <div className="text-xs text-zinc-500 mb-1">Recommendation</div>
            <p className="text-sm text-zinc-200">{idea.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NewIdeasPage() {
  const [expandedId, setExpandedId] = useState<string | null>('clawforge');
  
  const sortedIdeas = [...ideas].sort((a, b) => b.overallScore - a.overallScore);
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/business-ideas" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Business Ideas
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Oden's Business Ideas</h1>
          <p className="text-zinc-400">Research-backed opportunities aligned with the mission</p>
          <p className="text-xs text-zinc-500 mt-1">Generated March 24, 2026</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4 mb-8">
          <div className="text-sm text-purple-400 font-semibold mb-2">Mission Statement</div>
          <p className="text-zinc-300 italic text-sm">
            "The primary goal of all agents is to create an autonomous organization of AI agents that works for Romo 24/7/365 to produce ongoing monetary value and change the world for the better."
          </p>
        </div>

        {/* Quick Comparison */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-8">
          <h3 className="font-semibold mb-3">Quick Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left py-2">Idea</th>
                  <th className="text-right">Score</th>
                  <th className="text-right">Year 1</th>
                  <th className="text-right">Month 1 Cost</th>
                  <th className="text-right">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {sortedIdeas.map((idea) => (
                  <tr key={idea.id} className="border-b border-zinc-800/50">
                    <td className="py-2 font-medium">{idea.name}</td>
                    <td className="text-right text-zinc-300">{idea.overallScore}/10</td>
                    <td className="text-right text-green-400">{idea.year1Revenue}</td>
                    <td className="text-right text-zinc-400">{idea.resourceNeeds[idea.resourceNeeds.length - 1].cost}</td>
                    <td className="text-right">
                      {idea.goNoGo === 'go' ? (
                        <span className="text-green-400">✓ GO</span>
                      ) : (
                        <span className="text-yellow-400">⚠️ COND</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Idea Cards */}
        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-400">Detailed Analysis (click to expand)</h3>
          {sortedIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              isExpanded={expandedId === idea.id}
              onToggle={() => setExpandedId(expandedId === idea.id ? null : idea.id)}
            />
          ))}
        </div>

        {/* Recommendation */}
        <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Oden's Recommendation
          </h3>
          <div className="space-y-3 text-sm text-zinc-300">
            <p>
              <strong>Primary Focus:</strong> Launch <strong>ClawForge</strong> immediately. Highest score (7.8), lowest startup cost ($800), fastest path to revenue.
            </p>
            <p>
              <strong>Secondary:</strong> Run <strong>GoldIntel Weekly</strong> newsletter in parallel — builds audience for SoundMoney Studio and validates B2B research demand.
            </p>
            <p>
              <strong>Hold for Later:</strong> <strong>InboxZero</strong> requires more dev effort. Revisit after first revenue from ClawForge.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-green-500/20">
            <div className="text-xs text-zinc-500">Combined Year 1 Potential (all 3)</div>
            <div className="text-2xl font-bold text-green-400">$520K+ ARR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
