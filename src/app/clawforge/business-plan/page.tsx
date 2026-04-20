'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home,
  Target,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Zap,
  Twitter,
  MessageSquare,
  BookOpen,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  Rocket,
  Shield,
  Package,
  ArrowRight,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Revenue projections
const revenueTargets = [
  { day: 30, skillforge: 5000, agency: 10000, total: 15000 },
  { day: 60, skillforge: 25000, agency: 30000, total: 55000 },
  { day: 90, skillforge: 50000, agency: 50000, total: 100000 },
];

// Product tiers
const skillForgeTiers = [
  { name: 'Entry Skills', price: 97, desc: 'Single-purpose tools', targetSales: 150 },
  { name: 'Standard Skills', price: 147, desc: 'Full workflows', targetSales: 100 },
  { name: 'Premium Skills', price: 247, desc: 'Complex integrations', targetSales: 50 },
  { name: 'Starter Bundle', price: 397, desc: '5 Essential Skills', targetSales: 30 },
  { name: 'Pro Bundle', price: 697, desc: '12 Skills + Templates', targetSales: 20 },
  { name: 'Complete Bundle', price: 997, desc: '20+ Skills + Priority', targetSales: 15 },
  { name: 'Pro Monthly', price: 149, desc: 'All Skills + Updates', targetSales: 50, recurring: true },
];

const agencyPackages = [
  { name: 'Starter Agent', price: 1500, desc: '1 core workflow', targetClients: 10 },
  { name: 'Professional Agent', price: 3500, desc: '3 workflows + integrations', targetClients: 8 },
  { name: 'Enterprise Agent', price: 7500, desc: 'Full custom build', targetClients: 3 },
  { name: 'Retainer', price: 1000, desc: 'Ongoing support', targetClients: 15, recurring: true },
];

// Social platforms
const platforms = [
  { name: 'X (@ClawForgeAI)', icon: Twitter, purpose: 'Brand authority, viral content, lead gen', launch: 'Day 1', manager: 'Oden Sub-Agent' },
  { name: 'MoltBook', icon: MessageSquare, purpose: 'Community, tutorials, engagement', launch: 'Day 7', manager: 'Oden' },
  { name: 'Skool', icon: BookOpen, purpose: 'Premium community, courses', launch: 'Day 45', manager: 'Romo' },
];

// OKRs
const okrs = [
  {
    objective: 'Achieve $100,000 MRR',
    keyResults: [
      { kr: 'SkillForge revenue', target: '$50,000/mo', status: 'pending' },
      { kr: 'Agency revenue', target: '$50,000/mo', status: 'pending' },
      { kr: 'Recurring revenue', target: '$20,000/mo', status: 'pending' },
      { kr: 'Average order value', target: '$250+', status: 'pending' },
    ]
  },
  {
    objective: 'Build Scalable Audience',
    keyResults: [
      { kr: 'X followers', target: '15,000', status: 'pending' },
      { kr: 'Email list', target: '5,000', status: 'pending' },
      { kr: 'MoltBook community', target: '1,000 members', status: 'pending' },
      { kr: 'Skool paid members', target: '200', status: 'pending' },
    ]
  },
  {
    objective: 'Product Excellence',
    keyResults: [
      { kr: 'Skills launched', target: '10+', status: 'pending' },
      { kr: 'Customer satisfaction', target: '4.5+ stars', status: 'pending' },
      { kr: 'Support response', target: '<4 hours', status: 'pending' },
      { kr: 'Refund rate', target: '<5%', status: 'pending' },
    ]
  },
];

// Content calendar week 1
const week1Calendar = [
  { day: 'Mon', x: 'Launch thread', moltbook: 'Intro post', action: 'Site live' },
  { day: 'Tue', x: '"Why I built ClawForge"', moltbook: 'Tutorial #1', action: 'Email Triage dev' },
  { day: 'Wed', x: 'Poll: Time waste?', moltbook: 'Welcome post', action: 'Collect feedback' },
  { day: 'Thu', x: 'Demo: Email agent', moltbook: 'Behind-scenes', action: 'Skill testing' },
  { day: 'Fri', x: 'Customer problem', moltbook: 'Tutorial #2', action: 'DM outreach' },
  { day: 'Sat', x: 'Case study teaser', moltbook: 'Poll', action: 'Founding push' },
  { day: 'Sun', x: 'Week 1 recap', moltbook: 'Spotlight', action: 'Review metrics' },
];

// Milestones
const day90Checklist = [
  { task: '$100,000 MRR achieved', done: false },
  { task: '10+ skills in catalog', done: false },
  { task: '15,000 X followers', done: false },
  { task: '500 paying customers', done: false },
  { task: '5,000 email subscribers', done: false },
  { task: '200 Skool paid members', done: false },
  { task: '3+ enterprise clients', done: false },
  { task: 'Affiliate program live', done: false },
];

export default function BusinessPlanPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <span className="text-slate-600">/</span>
        <Link href="/clawforge" className="text-slate-400 hover:text-white transition-colors">
          ClawForge
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-white">Business Plan</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Rocket className="w-7 h-7 text-orange-500" />
            ClawForgeStudio Business Plan
          </h1>
          <p className="text-slate-400 mt-1">90-Day Path to $100K MRR</p>
        </div>
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-lg px-4 py-2">
          $100K Target
        </Badge>
      </div>

      {/* Revenue Overview */}
      <Card className="bg-gradient-to-r from-green-500/10 via-green-600/5 to-green-500/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Revenue Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {revenueTargets.map((target) => (
              <div key={target.day} className="bg-slate-800/50 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm mb-2">Day {target.day}</p>
                <p className="text-3xl font-bold text-green-400">${(target.total / 1000).toFixed(0)}K</p>
                <div className="flex justify-center gap-4 mt-2 text-xs">
                  <span className="text-blue-400">Skills: ${(target.skillforge / 1000).toFixed(0)}K</span>
                  <span className="text-purple-400">Agency: ${(target.agency / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Architecture */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('products')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              Product Architecture
            </CardTitle>
            {expandedSection === 'products' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
          </div>
        </CardHeader>
        {expandedSection === 'products' && (
          <CardContent className="space-y-6">
            {/* SkillForge */}
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3">SkillForge Marketplace</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skillForgeTiers.map((tier) => (
                  <div key={tier.name} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="font-medium text-white text-sm">{tier.name}</p>
                    <p className="text-xl font-bold text-green-400">${tier.price}{tier.recurring && '/mo'}</p>
                    <p className="text-xs text-slate-500">{tier.desc}</p>
                    <p className="text-xs text-blue-400 mt-1">{tier.targetSales} sales/mo target</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Agency */}
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Agency Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {agencyPackages.map((pkg) => (
                  <div key={pkg.name} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="font-medium text-white text-sm">{pkg.name}</p>
                    <p className="text-xl font-bold text-purple-400">${pkg.price.toLocaleString()}{pkg.recurring && '/mo'}</p>
                    <p className="text-xs text-slate-500">{pkg.desc}</p>
                    <p className="text-xs text-purple-400 mt-1">{pkg.targetClients} clients/mo target</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Social Platform Strategy */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('social')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Twitter className="w-5 h-5 text-blue-400" />
              Social Platform Strategy
            </CardTitle>
            {expandedSection === 'social' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
          </div>
        </CardHeader>
        {expandedSection === 'social' && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <div key={platform.name} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <platform.icon className="w-5 h-5 text-blue-400" />
                    <p className="font-medium text-white">{platform.name}</p>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{platform.purpose}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400">Launch: {platform.launch}</span>
                    <span className="text-orange-400">{platform.manager}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* X Growth Targets */}
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="font-medium text-white mb-3">X Growth Targets (@ClawForgeAI)</h4>
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                <div><p className="text-slate-500">Week 1</p><p className="text-white font-bold">500</p></div>
                <div><p className="text-slate-500">Week 2</p><p className="text-white font-bold">1,200</p></div>
                <div><p className="text-slate-500">Week 4</p><p className="text-white font-bold">3,000</p></div>
                <div><p className="text-slate-500">Week 8</p><p className="text-white font-bold">8,000</p></div>
                <div><p className="text-slate-500">Week 12</p><p className="text-green-400 font-bold">15,000</p></div>
              </div>
            </div>

            {/* Content Pillars */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                <p className="text-blue-400 font-bold">40%</p>
                <p className="text-xs text-slate-400">Educational</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-green-400 font-bold">25%</p>
                <p className="text-xs text-slate-400">Social Proof</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                <p className="text-purple-400 font-bold">20%</p>
                <p className="text-xs text-slate-400">Engagement</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                <p className="text-orange-400 font-bold">15%</p>
                <p className="text-xs text-slate-400">Promotional</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Content Calendar */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('calendar')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Week 1 Content Calendar
            </CardTitle>
            {expandedSection === 'calendar' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
          </div>
        </CardHeader>
        {expandedSection === 'calendar' && (
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-400">Day</th>
                    <th className="text-left py-2 text-blue-400">X Content</th>
                    <th className="text-left py-2 text-purple-400">MoltBook</th>
                    <th className="text-left py-2 text-green-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {week1Calendar.map((day) => (
                    <tr key={day.day} className="border-b border-slate-700/50">
                      <td className="py-2 font-medium text-white">{day.day}</td>
                      <td className="py-2 text-slate-300">{day.x}</td>
                      <td className="py-2 text-slate-300">{day.moltbook}</td>
                      <td className="py-2 text-slate-300">{day.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        )}
      </Card>

      {/* OKRs */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('okrs')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              90-Day OKRs
            </CardTitle>
            {expandedSection === 'okrs' ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
          </div>
        </CardHeader>
        {expandedSection === 'okrs' && (
          <CardContent className="space-y-4">
            {okrs.map((okr, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <h4 className="font-semibold text-white mb-3">O{idx + 1}: {okr.objective}</h4>
                <div className="space-y-2">
                  {okr.keyResults.map((kr, krIdx) => (
                    <div key={krIdx} className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">KR{idx + 1}.{krIdx + 1}: {kr.kr}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{kr.target}</span>
                        <Circle className="w-4 h-4 text-slate-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Day 90 Milestones */}
      <Card className="bg-gradient-to-r from-orange-500/10 via-orange-600/5 to-orange-500/10 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            Day 90 Success Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {day90Checklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                {item.done ? (
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <span className={item.done ? 'text-slate-400 line-through' : 'text-white'}>
                  {item.task}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/clawforge/skillforge">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="font-medium text-white">SkillForge Analysis</p>
                  <p className="text-xs text-slate-400">Market research details</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/clawforge">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="font-medium text-white">30-Day Plan</p>
                  <p className="text-xs text-slate-400">Week-by-week tasks</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <a href="https://clawforgestudio.io" target="_blank" rel="noopener noreferrer">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Rocket className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-medium text-white">Live Site</p>
                  <p className="text-xs text-slate-400">clawforgestudio.io</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}
