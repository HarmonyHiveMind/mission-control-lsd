'use client';

import Link from 'next/link';
import { Home, Zap, AlertTriangle, CheckCircle, DollarSign, Cpu, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const routingRules = [
  { tier: 'T1 (Haiku)', cost: '$0.25/$1.25', tasks: 'Heartbeats, classification, logging, status, simple Q&A', percent: '60%' },
  { tier: 'T2 (Sonnet)', cost: '$3/$15', tasks: 'Research, analysis, code, sub-agents', percent: '35%' },
  { tier: 'T3 (Opus)', cost: '$15/$75', tasks: 'Complex reasoning, customer content, critical decisions', percent: '5%' },
];

const actions = [
  { task: 'Kill dev server', status: 'done' },
  { task: 'Pause heavy operations', status: 'done' },
  { task: 'Document routing rules', status: 'done' },
  { task: 'Configure model routing', status: 'pending' },
  { task: 'Set up prompt caching', status: 'pending' },
  { task: 'Implement batching', status: 'pending' },
];

export default function EfficiencyPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white">
        <Home className="w-5 h-5" /> Home
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Zap className="w-7 h-7 text-yellow-500" />
            Efficiency Report
          </h1>
          <p className="text-slate-400">Felix-Style Cost Optimization</p>
        </div>
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-lg px-4 py-2">
          🚨 CRITICAL
        </Badge>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-400 text-sm">Previous 2-Week Spend</p>
            <p className="text-3xl font-bold text-red-400">$152.94</p>
            <p className="text-xs text-red-400">UNSUSTAINABLE</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-400 text-sm">Current Balance</p>
            <p className="text-3xl font-bold text-yellow-400">$47.06</p>
            <p className="text-xs text-yellow-400">After $50 top-up</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-400 text-sm">Target Monthly</p>
            <p className="text-3xl font-bold text-green-400">$50-60</p>
            <p className="text-xs text-green-400">60-70% reduction</p>
          </CardContent>
        </Card>
      </div>

      {/* Root Cause */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Root Causes Identified
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-white">Dev server running 24/7</span>
            <Badge className="bg-green-500/20 text-green-400 ml-auto">FIXED</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="text-white">Opus used for everything (~$100+)</span>
            <Badge className="bg-yellow-500/20 text-yellow-400 ml-auto">FIXING</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="text-white">No prompt caching (~$15+)</span>
            <Badge className="bg-yellow-500/20 text-yellow-400 ml-auto">PENDING</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="text-white">Sub-agents on Opus (~$30+)</span>
            <Badge className="bg-yellow-500/20 text-yellow-400 ml-auto">FIXING</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Routing Rules */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            New Model Routing (Felix-Style)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routingRules.map((rule) => (
              <div key={rule.tier} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{rule.tier}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{rule.cost}</span>
                    <Badge className="bg-blue-500/20 text-blue-400">{rule.percent}</Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{rule.tasks}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projected Savings */}
      <Card className="bg-gradient-to-r from-green-500/10 via-green-600/5 to-green-500/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Projected Monthly Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-slate-400 text-sm">OLD MODEL</p>
              <p className="text-2xl font-bold text-red-400">$240-420/mo</p>
              <p className="text-xs text-slate-500">$8-14/day</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <p className="text-slate-400 text-sm">NEW MODEL</p>
              <p className="text-2xl font-bold text-green-400">$48-96/mo</p>
              <p className="text-xs text-slate-500">$1.60-3.20/day</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actions.map((action, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                {action.status === 'done' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-500" />
                )}
                <span className={action.status === 'done' ? 'text-slate-400 line-through' : 'text-white'}>
                  {action.task}
                </span>
                {action.status === 'pending' && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 ml-auto">NEEDS APPROVAL</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-yellow-400 text-sm">
          <strong>Status:</strong> Awaiting Romo approval to implement routing configuration and resume operations.
          Web deployment deferred until costs stabilized.
        </p>
      </div>
    </div>
  );
}
