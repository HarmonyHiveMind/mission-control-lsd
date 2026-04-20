'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Hammer,
  CheckCircle,
  Circle,
  Clock,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Calendar,
  MessageSquare,
  FileText,
  Zap,
  AlertTriangle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

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
      { id: '1-2', title: 'Secure domain (clawforge.ai or .co)', done: false },
      { id: '1-3', title: 'Build landing page', done: false },
      { id: '1-4', title: 'Set up waitlist (ConvertKit/Tally)', done: false },
      { id: '1-5', title: 'Create Oden case study', done: false },
      { id: '1-6', title: 'Record demo video', done: false },
    ]
  },
  {
    week: 2,
    title: 'Content & Outreach Prep',
    dates: 'Apr 1-7',
    cost: '$50',
    deliverables: ['Service packages defined', '100 prospects identified', 'Outreach templates ready'],
    tasks: [
      { id: '2-1', title: 'Create service package breakdown (Starter/Pro/Enterprise)', done: false },
      { id: '2-2', title: 'Build "What Can an AI Agent Do?" one-pager', done: false },
      { id: '2-3', title: 'Write FAQ document', done: false },
      { id: '2-4', title: 'Draft 3 X threads', done: false },
      { id: '2-5', title: 'Build target list of 100 prospects', done: false },
      { id: '2-6', title: 'Create DM templates (warm/cold)', done: false },
      { id: '2-7', title: 'Set up CRM in Notion', done: false },
    ]
  },
  {
    week: 3,
    title: 'Active Outreach',
    dates: 'Apr 8-14',
    cost: '$200',
    deliverables: ['50 outreach messages sent', '2 X threads posted', '5-10 discovery calls scheduled'],
    tasks: [
      { id: '3-1', title: 'Send 30 DMs to warm prospects', done: false },
      { id: '3-2', title: 'Post X thread #1', done: false },
      { id: '3-3', title: 'Send 20 DMs to cold prospects', done: false },
      { id: '3-4', title: 'Post X thread #2', done: false },
      { id: '3-5', title: 'Post 2x on LinkedIn', done: false },
      { id: '3-6', title: 'Schedule discovery calls', done: false },
      { id: '3-7', title: 'Track pipeline in CRM', done: false },
    ]
  },
  {
    week: 4,
    title: 'Close & Deliver',
    dates: 'Apr 15-23',
    cost: '$150',
    deliverables: ['3 pilot clients signed', '$4,500 setup revenue', 'First delivery in progress'],
    tasks: [
      { id: '4-1', title: 'Follow up with all leads', done: false },
      { id: '4-2', title: 'Send proposals to qualified prospects', done: false },
      { id: '4-3', title: 'Close 3 pilot clients', done: false },
      { id: '4-4', title: 'Create client onboarding checklist', done: false },
      { id: '4-5', title: 'Kickoff call with Pilot #1', done: false },
      { id: '4-6', title: 'Begin agent setup for Pilot #1', done: false },
      { id: '4-7', title: 'Document learnings, plan Month 2', done: false },
    ]
  }
];

function WeekCard({ data, isExpanded, onToggle }: { data: WeekData; isExpanded: boolean; onToggle: () => void }) {
  const completedTasks = data.tasks.filter(t => t.done).length;
  const progress = (completedTasks / data.tasks.length) * 100;
  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">Week {data.week}</span>
                <span className="text-zinc-300 font-medium">{data.title}</span>
              </div>
              <div className="text-xs text-zinc-500">{data.dates}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-zinc-400">{completedTasks}/{data.tasks.length} tasks</div>
              <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-400">{data.cost}</div>
              <div className="text-xs text-zinc-500">budget</div>
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-zinc-800 p-4 space-y-4">
          {/* Deliverables */}
          <div>
            <div className="text-xs text-zinc-500 mb-2">Deliverables</div>
            <div className="flex flex-wrap gap-2">
              {data.deliverables.map((d, i) => (
                <span key={i} className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                  {d}
                </span>
              ))}
            </div>
          </div>
          
          {/* Tasks */}
          <div>
            <div className="text-xs text-zinc-500 mb-2">Tasks</div>
            <div className="space-y-2">
              {data.tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-sm">
                  {task.done ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-600" />
                  )}
                  <span className={task.done ? 'text-zinc-500 line-through' : 'text-zinc-300'}>
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

export default function ClawForgePage() {
  const [expandedWeek, setExpandedWeek] = useState<number>(1);
  
  const totalTasks = weeks.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasks = weeks.reduce((acc, w) => acc + w.tasks.filter(t => t.done).length, 0);
  const overallProgress = (completedTasks / totalTasks) * 100;
  
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">ClawForge</h1>
              <p className="text-zinc-400">AI Agent Setup Agency — 30-Day Execution Plan</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">APPROVED</span>
            <span className="text-xs text-zinc-500">March 24, 2026</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <DollarSign className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-400">$6,000</div>
            <div className="text-xs text-zinc-500">30-Day Target</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-blue-400">3</div>
            <div className="text-xs text-zinc-500">Pilot Clients</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <TrendingUp className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-400">$1,500</div>
            <div className="text-xs text-zinc-500">Target MRR</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-amber-400">30x</div>
            <div className="text-xs text-zinc-500">Target ROI</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Overall Progress</span>
            <span className="text-sm text-orange-400">{completedTasks}/{totalTasks} tasks ({Math.round(overallProgress)}%)</span>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Pricing Model */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-8">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            Pricing Model
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-xs text-zinc-500 mb-1">Founding Member</div>
              <div className="text-lg font-bold text-green-400">$1,500</div>
              <div className="text-xs text-zinc-400">+ $300/mo</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-orange-500/30">
              <div className="text-xs text-orange-400 mb-1">Standard</div>
              <div className="text-lg font-bold text-orange-400">$2,000</div>
              <div className="text-xs text-zinc-400">+ $500/mo</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-xs text-zinc-500 mb-1">Enterprise</div>
              <div className="text-lg font-bold text-purple-400">$5,000</div>
              <div className="text-xs text-zinc-400">+ $1,000/mo</div>
            </div>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-orange-500" />
          Weekly Breakdown
        </h3>
        <div className="space-y-4 mb-8">
          {weeks.map((week) => (
            <WeekCard
              key={week.week}
              data={week}
              isExpanded={expandedWeek === week.week}
              onToggle={() => setExpandedWeek(expandedWeek === week.week ? 0 : week.week)}
            />
          ))}
        </div>

        {/* Budget Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-8">
          <h3 className="font-semibold mb-3">Budget Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Week 1 (Foundation)</span>
              <span className="text-zinc-300">$100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Week 2 (Content)</span>
              <span className="text-zinc-300">$50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Week 3 (Outreach)</span>
              <span className="text-zinc-300">$200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Week 4 (Close)</span>
              <span className="text-zinc-300">$150</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-800 font-semibold">
              <span className="text-zinc-300">Total Investment</span>
              <span className="text-green-400">$500</span>
            </div>
          </div>
        </div>

        {/* Revenue Projections */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-8">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Revenue Projections
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left py-2">Scenario</th>
                  <th className="text-right">Clients</th>
                  <th className="text-right">Setup</th>
                  <th className="text-right">MRR</th>
                  <th className="text-right">ROI</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800/50">
                  <td className="py-2">Conservative</td>
                  <td className="text-right">2</td>
                  <td className="text-right">$3,000</td>
                  <td className="text-right">$600</td>
                  <td className="text-right text-green-400">18x</td>
                </tr>
                <tr className="border-b border-zinc-800/50 bg-orange-500/5">
                  <td className="py-2 font-semibold text-orange-400">Target</td>
                  <td className="text-right">3</td>
                  <td className="text-right">$4,500</td>
                  <td className="text-right">$1,500</td>
                  <td className="text-right text-green-400 font-semibold">30x</td>
                </tr>
                <tr>
                  <td className="py-2">Stretch</td>
                  <td className="text-right">5</td>
                  <td className="text-right">$7,500</td>
                  <td className="text-right">$2,500</td>
                  <td className="text-right text-green-400">50x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Case Study Preview */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-lg p-4 mb-8">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-500" />
            Case Study #1: Oden
          </h3>
          <p className="text-sm text-zinc-400 mb-3">
            Our first proof of concept — an AI agent managing business operations, research, content, and autonomous decision-making.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-orange-400">99%</div>
              <div className="text-xs text-zinc-500">Autonomy Target</div>
            </div>
            <div>
              <div className="text-xl font-bold text-orange-400">$318/mo</div>
              <div className="text-xs text-zinc-500">Operating Cost</div>
            </div>
            <div>
              <div className="text-xl font-bold text-orange-400">24/7</div>
              <div className="text-xs text-zinc-500">Availability</div>
            </div>
          </div>
        </div>

        {/* Next Actions */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Immediate Next Actions
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-orange-500" />
              Secure domain (clawforge.ai or .co)
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-orange-500" />
              Build landing page (target: March 28)
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-orange-500" />
              Create Oden case study with metrics
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-orange-500" />
              Set up waitlist collection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
