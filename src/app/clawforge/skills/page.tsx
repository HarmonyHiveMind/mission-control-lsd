'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Package, 
  Search, 
  Calendar, 
  Twitter, 
  CheckCircle, 
  Circle,
  Clock,
  Star,
  Zap,
  Settings,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Users,
  Cpu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const prioritySkills = [
  { id: 1, name: 'Email Triage Agent', tier: 1, status: 'active', clientValue: 5, internalValue: 4, rationale: 'Highest demand, proven willingness to pay' },
  { id: 2, name: 'Customer Support Bot', tier: 1, status: 'building', clientValue: 5, internalValue: 3, rationale: 'Second-highest demand, clear ROI' },
  { id: 3, name: 'SkillForge Manager', tier: 1, status: 'designing', clientValue: 2, internalValue: 5, rationale: 'Meta-skill for organizing all other skills' },
  { id: 4, name: 'Cost Monitor', tier: 1, status: 'pending', clientValue: 3, internalValue: 5, rationale: 'Track API spend, alert on thresholds' },
  { id: 5, name: 'Prompt Cache Optimizer', tier: 1, status: 'pending', clientValue: 4, internalValue: 5, rationale: 'Auto-identify cacheable context' },
  { id: 6, name: 'Calendar + Reminders', tier: 2, status: 'pending', clientValue: 4, internalValue: 4, rationale: 'Universal need' },
  { id: 7, name: 'Research Digest', tier: 2, status: 'pending', clientValue: 4, internalValue: 5, rationale: 'Daily/weekly summaries' },
  { id: 8, name: 'X/Twitter Monitor', tier: 2, status: 'pending', clientValue: 4, internalValue: 4, rationale: 'Brand monitoring, engagement' },
  { id: 9, name: 'Invoice/Payment Tracker', tier: 2, status: 'pending', clientValue: 5, internalValue: 3, rationale: 'SMB pain point' },
  { id: 10, name: 'Meeting Notes + Actions', tier: 2, status: 'pending', clientValue: 4, internalValue: 3, rationale: 'Universal workflow need' },
];

const weeklySchedule = [
  { day: 'Monday', focus: 'New skill kickoff', icon: Zap },
  { day: 'Tuesday', focus: 'Core development', icon: Cpu },
  { day: 'Wednesday', focus: 'Testing + edge cases', icon: Search },
  { day: 'Thursday', focus: 'Documentation + MC page', icon: Package },
  { day: 'Friday', focus: 'Submit for approval', icon: CheckCircle },
];

const dailyRoutine = [
  { time: '08:00', task: 'X Research Agent runs (xAI API)' },
  { time: '09:00', task: 'Review X insights, update priorities' },
  { time: '10:00-12:00', task: 'Skill development block' },
  { time: '14:00', task: 'Test & refine current skill' },
  { time: '16:00', task: 'Document progress, commit changes' },
];

export default function SkillsPage() {
  const [showTier2, setShowTier2] = useState(false);

  const tier1Skills = prioritySkills.filter(s => s.tier === 1);
  const tier2Skills = prioritySkills.filter(s => s.tier === 2);

  return (
    <div className="space-y-6 max-w-5xl">
      <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white">
        <Home className="w-5 h-5" /> Home
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Package className="w-7 h-7 text-blue-500" />
            SkillForge Development
          </h1>
          <p className="text-slate-400">Skill Priorities, Cadence & Manager Design</p>
        </div>
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          PENDING APPROVAL
        </Badge>
      </div>

      {/* Tier 1 Skills */}
      <Card className="bg-gradient-to-r from-orange-500/10 via-orange-600/5 to-orange-500/10 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-500" />
            Tier 1: Critical (Week 1-2)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tier1Skills.map((skill) => (
              <div key={skill.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-orange-400 font-bold">#{skill.id}</span>
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                  <Badge className={
                    skill.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : skill.status === 'building'
                      ? 'bg-orange-500/20 text-orange-400'
                      : skill.status === 'designing' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-slate-500/20 text-slate-400'
                  }>
                    {skill.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 mb-2">{skill.rationale}</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-green-400">Client: {'⭐'.repeat(skill.clientValue)}</span>
                  <span className="text-blue-400">Internal: {'⭐'.repeat(skill.internalValue)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tier 2 Skills (Collapsible) */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader 
          className="cursor-pointer" 
          onClick={() => setShowTier2(!showTier2)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              {showTier2 ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              Tier 2: High Priority (Week 2-3)
            </CardTitle>
            <Badge className="bg-slate-500/20 text-slate-400">{tier2Skills.length} skills</Badge>
          </div>
        </CardHeader>
        {showTier2 && (
          <CardContent>
            <div className="space-y-2">
              {tier2Skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">#{skill.id}</span>
                    <span className="text-white">{skill.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{skill.rationale}</span>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* SkillForge Manager Design */}
      <Card className="bg-gradient-to-r from-purple-500/10 via-purple-600/5 to-purple-500/10 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-500" />
            SkillForge Manager (Meta-Skill)
          </CardTitle>
          <CardDescription className="text-slate-400">
            Skill organization, indexing, versioning & retrieval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-white font-medium mb-2">Core Features</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Master skill index (JSON)</li>
                <li>• Lazy loading (save tokens)</li>
                <li>• Version control (SemVer)</li>
                <li>• Usage metrics tracking</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-white font-medium mb-2">Commands</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• /skills search "query"</li>
                <li>• /skills enable/disable</li>
                <li>• /skills stats</li>
                <li>• /skills validate</li>
              </ul>
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-sm">
              <strong>Token Savings:</strong> ~13,000 tokens/session by lazy loading instead of loading all skills
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Development Cadence */}
      <div className="grid grid-cols-2 gap-4">
        {/* Weekly Schedule */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {weeklySchedule.map((item) => (
                <div key={item.day} className="flex items-center gap-3 text-sm">
                  <item.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium w-24">{item.day}</span>
                  <span className="text-slate-400">{item.focus}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Routine */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Daily Routine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dailyRoutine.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span className="text-orange-400 font-mono w-24">{item.time}</span>
                  <span className="text-slate-400">{item.task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* X Research Integration */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-blue-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Twitter className="w-5 h-5 text-blue-400" />
            Daily X Research (xAI API)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-slate-400 text-sm">
            Automated daily review of X/Twitter for Claude, Anthropic, agent architecture, and AI efficiency discussions.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
              <p className="text-xs text-slate-500">Focus Area</p>
              <p className="text-white text-sm">Claude/Anthropic</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
              <p className="text-xs text-slate-500">Focus Area</p>
              <p className="text-white text-sm">Agent Arch</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
              <p className="text-xs text-slate-500">Focus Area</p>
              <p className="text-white text-sm">Efficiency</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
              <p className="text-xs text-slate-500">Focus Area</p>
              <p className="text-white text-sm">MCP/Skills</p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            <strong>Output:</strong> Daily report at <code className="text-blue-400">research/x-daily/YYYY-MM-DD.md</code>
          </div>
        </CardContent>
      </Card>

      {/* Approval Status */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-yellow-400">
          <strong>Awaiting Approval:</strong> Please review and approve:
        </p>
        <ul className="text-yellow-400 text-sm mt-2 space-y-1">
          <li>• Top 10 priority skills and build order</li>
          <li>• Daily/weekly development cadence</li>
          <li>• SkillForge Manager meta-skill design</li>
          <li>• Daily X research integration</li>
        </ul>
      </div>
    </div>
  );
}
