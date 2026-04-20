'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Coins,
  CheckCircle,
  Circle,
  Clock,
  TrendingUp,
  Target,
  ExternalLink,
  Bell,
  Activity,
  ArrowRight,
  Globe,
  BarChart3,
  Package,
  Twitter,
  DollarSign,
  Users,
  Shield,
  Zap,
  BookOpen,
} from 'lucide-react';

// X Account data
const xAccounts = [
  { 
    id: 'digitalgold', 
    handle: '@DigitalGold', 
    name: 'DigitalGold',
    followers: 829, 
    posts: 2172,
    type: 'Personal Brand',
    voice: 'Authentic Sound Money Advocate',
    status: 'active',
    focus: 'Sound Money Education & Gold Advocacy'
  },
  { 
    id: 'lsdgold', 
    handle: '@LSD_Gold', 
    name: 'Legacy Syndicate Decentralized',
    followers: 62, 
    posts: 83,
    type: 'Corporate Brand', 
    voice: 'Institutional Authority',
    status: 'emerging',
    focus: 'Tokenized Gold Platform & DeFi Integration'
  },
];

// LSD platform status data
const lsdStatus = {
  platform: { url: 'https://lsd.gold', status: 'live' },
  research: { status: 'complete', label: 'Republic Partnership Analysis' },
  development: { current: 18, target: 100, label: 'Development Progress %' },
};

const currentTasks = [
  { id: 1, title: 'Complete Republic contract review', done: true },
  { id: 2, title: 'Launch @DigitalGold content strategy', done: false },
  { id: 3, title: 'Optimize @LSD_Gold professional voice', done: false },
  { id: 4, title: 'Begin competitive research implementation', done: true },
  { id: 5, title: 'Establish X authority building framework', done: false },
  { id: 6, title: 'Create comprehensive Mission Control proposal', done: true },
  { id: 7, title: 'Begin Phase 1: Foundation & Voice Establishment', done: false },
];

// Notifications
const notifications = [
  { id: 1, type: 'success', message: 'Republic analysis complete - strategic recommendations delivered', time: '1h ago' },
  { id: 2, type: 'info', message: 'Comprehensive Mission Control proposal ready', time: '2h ago' },
  { id: 3, type: 'info', message: 'Competitive research sub-agents completed', time: '3h ago' },
  { id: 4, type: 'success', message: 'X account analysis and voice framework established', time: '4h ago' },
];

function NotificationWidget() {
  const [showAll, setShowAll] = useState(false);
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-slate-400 hover:text-white relative"
        onClick={() => setShowAll(!showAll)}
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-[10px] text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </Button>
      
      {showAll && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="p-3 border-b border-slate-700">
            <h3 className="font-semibold text-white">Notifications</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 border-b border-slate-700/50 hover:bg-slate-700/50">
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 ${n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <div>
                    <p className="text-sm text-white">{n.message}</p>
                    <p className="text-xs text-slate-500">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SystemStatusWidget() {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span>All Systems Online</span>
    </div>
  );
}

function LSDDashboard() {
  const completedTasks = currentTasks.filter(t => t.done).length;
  const totalTasks = currentTasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Mission Statement */}
      <Card className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-amber-500/10 border-amber-500/30">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-400 text-sm uppercase tracking-wide mb-1">
                LSD Mission Statement
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Build <span className="text-amber-400 font-medium">trusted authority in sound money and gold space</span> through
                <span className="text-amber-400 font-medium"> @DigitalGold and @LSD_Gold</span> to drive adoption of the
                Legacy Syndicate Decentralized tokenized gold platform.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* X Accounts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {xAccounts.map((account) => (
          <Card key={account.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{account.handle}</p>
                    <p className="text-xs text-slate-400">{account.type}</p>
                  </div>
                </div>
                <Badge className={`${account.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>
                  {account.status.toUpperCase()}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Followers</span>
                  <span className="text-white font-medium">{account.followers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Posts</span>
                  <span className="text-white font-medium">{account.posts.toLocaleString()}</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-slate-400 mb-1">Voice</p>
                  <p className="text-xs text-amber-400">{account.voice}</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-slate-400 mb-1">Focus</p>
                  <p className="text-xs text-slate-300">{account.focus}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LSD Platform Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-5 h-5 text-green-400" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">LIVE</Badge>
            </div>
            <p className="text-white font-medium">lsd.gold</p>
            <a 
              href={lsdStatus.platform.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 mt-1"
            >
              Visit Platform <ExternalLink className="w-3 h-3" />
            </a>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">COMPLETE</Badge>
            </div>
            <p className="text-white font-medium">Republic Analysis</p>
            <p className="text-xs text-amber-400 mt-1">Strategic recommendations delivered</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-xs text-slate-400">Target: 100%</span>
            </div>
            <p className="text-white font-medium">{lsdStatus.development.current}% Complete</p>
            <div className="w-full h-2 bg-slate-700 rounded-full mt-2">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${lsdStatus.development.current}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Sprint Progress */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              X Authority Building Sprint
            </CardTitle>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              {progress}% Complete
            </Badge>
          </div>
          <CardDescription className="text-slate-400">
            Phase 1: Foundation & Voice Establishment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentTasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30"
              >
                {task.done ? (
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                )}
                <span className={task.done ? 'text-slate-400 line-through' : 'text-white'}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/lsd">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-white">LSD Platform</p>
                  <p className="text-sm text-slate-400">Development roadmap</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/agents">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-white">Agent Fleet</p>
                  <p className="text-sm text-slate-400">Sub-agents & reports</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer h-full">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-white">Strategy Guide</p>
                <p className="text-sm text-slate-400">Comprehensive proposal</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Notifications and System Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Mission Control</h1>
              <p className="text-slate-400 text-sm">LSD Authority Building & X Brand Strategy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SystemStatusWidget />
            <NotificationWidget />
          </div>
        </div>

        {/* Strategic Focus Banner */}
        <Card className="bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-500/20 border-amber-500/30">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/30 flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Legacy Syndicate Decentralized</h2>
                  <p className="text-amber-400 font-medium">Building Authority in Tokenized Gold Space</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">Target Market</p>
                <p className="text-amber-400 text-lg font-bold">$50B by 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <LSDDashboard />
      </div>
    </DashboardLayout>
  );
}
