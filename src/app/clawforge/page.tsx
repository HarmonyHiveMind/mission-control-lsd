'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  Home,
  Hammer,
  CheckCircle,
  Circle,
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Globe,
  BarChart3,
  Package,
  Zap,
  Bot,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  done: boolean;
}

interface WeekData {
  week: number;
  title: string;
  dates: string;
  cost: string;
  deliverables: string[];
  tasks: Task[];
}

const weeks: WeekData[] = [
  {
    week: 1,
    title: 'Foundation',
    dates: 'Mar 25-31',
    cost: '$100',
    deliverables: ['Landing page live', 'Waitlist collecting emails', 'Case study #1 complete'],
    tasks: [
      { id: '1-1', title: 'Finalize brand: ClawForge', done: true },
      { id: '1-2', title: 'Secure domain (clawforgestudio.io)', done: true },
      { id: '1-3', title: 'Build landing page', done: true },
      { id: '1-4', title: 'Configure DNS (Vercel)', done: true },
      { id: '1-5', title: 'Deploy to production', done: true },
      { id: '1-6', title: 'SkillForge market research', done: true },
      { id: '1-7', title: 'Set up waitlist (ConvertKit/Tally)', done: false },
      { id: '1-8', title: 'Create Oden case study', done: false },
    ]
  },
  {
    week: 2,
    title: 'SkillForge Launch Prep',
    dates: 'Apr 1-7',
    cost: '$50',
    deliverables: ['Email Triage skill MVP', 'Support Bot skill MVP', 'Pricing page live'],
    tasks: [
      { id: '2-1', title: 'Build Email Triage Agent skill', done: false },
      { id: '2-2', title: 'Build Customer Support Bot skill', done: false },
      { id: '2-3', title: 'Set up Stripe/LemonSqueezy payments', done: false },
      { id: '2-4', title: 'Update landing page with SkillForge section', done: false },
      { id: '2-5', title: 'Create skill documentation', done: false },
      { id: '2-6', title: 'Test skill installation flow', done: false },
    ]
  },
  {
    week: 3,
    title: 'Soft Launch',
    dates: 'Apr 8-14',
    cost: '$200',
    deliverables: ['Founding member sales', 'First testimonials', 'Content posted'],
    tasks: [
      { id: '3-1', title: 'Launch to waitlist (Founding Member pricing)', done: false },
      { id: '3-2', title: 'Post X thread #1', done: false },
      { id: '3-3', title: 'Send 30 DMs to warm prospects', done: false },
      { id: '3-4', title: 'Collect founding member testimonials', done: false },
      { id: '3-5', title: 'Post X thread #2', done: false },
      { id: '3-6', title: 'Iterate on skills based on feedback', done: false },
    ]
  },
  {
    week: 4,
    title: 'Public Launch',
    dates: 'Apr 15-23',
    cost: '$150',
    deliverables: ['Product Hunt launch', '10+ customers', '$1K+ revenue'],
    tasks: [
      { id: '4-1', title: 'Launch on Product Hunt', done: false },
      { id: '4-2', title: 'Post on IndieHackers', done: false },
      { id: '4-3', title: 'Post on Hacker News', done: false },
      { id: '4-4', title: 'Build Calendar + Reminders skill', done: false },
      { id: '4-5', title: 'Move to standard pricing', done: false },
      { id: '4-6', title: 'Plan Month 2 expansion', done: false },
    ]
  }
];

function WeekCard({ data, isExpanded, onToggle }: { data: WeekData; isExpanded: boolean; onToggle: () => void }) {
  const completedTasks = data.tasks.filter(t => t.done).length;
  const progress = (completedTasks / data.tasks.length) * 100;
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-500" />}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">Week {data.week}</span>
                <span className="text-white font-medium">{data.title}</span>
              </div>
              <div className="text-xs text-slate-500">{data.dates}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-slate-400">{completedTasks}/{data.tasks.length} tasks</div>
              <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-1">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-400">{data.cost}</div>
              <div className="text-xs text-slate-500">budget</div>
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-slate-700 p-4 space-y-4">
          <div>
            <div className="text-xs text-slate-500 mb-2">Deliverables</div>
            <div className="flex flex-wrap gap-2">
              {data.deliverables.map((d, i) => (
                <span key={i} className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                  {d}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-xs text-slate-500 mb-2">Tasks</div>
            <div className="space-y-2">
              {data.tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-sm">
                  {task.done ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                  <span className={task.done ? 'text-slate-500 line-through' : 'text-white'}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClawForgeDashboard() {
  const [expandedWeek, setExpandedWeek] = useState<number>(1);
  
  const totalTasks = weeks.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasks = weeks.reduce((acc, w) => acc + w.tasks.filter(t => t.done).length, 0);
  const overallProgress = (completedTasks / totalTasks) * 100;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Hammer className="w-7 h-7 text-orange-500" />
            ClawForge Dashboard
          </h1>
          <p className="text-slate-400 mt-1">30-day plan to $10K MRR</p>
        </div>
        <a 
          href="https://clawforgestudio.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-medium rounded-lg transition-colors"
        >
          <Globe className="w-4 h-4" />
          Visit Site
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-orange-400" />
              <span className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</span>
            </div>
            <p className="text-sm text-slate-400">Overall Progress</p>
            <div className="w-full h-2 bg-slate-700 rounded-full mt-2">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: `${overallProgress}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold text-white">{completedTasks}/{totalTasks}</span>
            </div>
            <p className="text-sm text-slate-400">Tasks Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold text-white">$0</span>
            </div>
            <p className="text-sm text-slate-400">Revenue (Target: $10K)</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-2xl font-bold text-white">Week 1</span>
            </div>
            <p className="text-sm text-slate-400">Current Phase</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/clawforge/skillforge">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-white">SkillForge Analysis</p>
                  <p className="text-xs text-slate-400">Market research & pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="bg-slate-800/50 border-slate-700 h-full">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-white">Payment Infrastructure</p>
                <p className="text-xs text-slate-400">Privacy.com cards ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 h-full">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-white">99% Autonomy</p>
                <p className="text-xs text-slate-400">Target operational efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 30-Day Plan */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            30-Day Plan
          </CardTitle>
          <CardDescription className="text-slate-400">
            Week-by-week roadmap to first revenue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeks.map((week) => (
            <WeekCard 
              key={week.week}
              data={week}
              isExpanded={expandedWeek === week.week}
              onToggle={() => setExpandedWeek(expandedWeek === week.week ? 0 : week.week)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Autonomy Goals */}
      <Card className="bg-gradient-to-r from-purple-500/10 via-purple-600/5 to-purple-500/10 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            99% Autonomy Target
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 text-sm">
            Goal: Oden operates ClawForgeStudio with minimal human intervention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Model Mix</p>
              <p className="text-white">70% Haiku / 25% Sonnet / 5% Opus</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Spending Authority</p>
              <p className="text-white">{"<"}$50 autonomous / $50-200 within limit</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Reinvestment</p>
              <p className="text-white">10% of revenue → infrastructure</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </DashboardLayout>
  );
}
