'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Home, Bot, Activity, Clock, CheckCircle, XCircle, Play, Square, 
  RefreshCw, Loader2, Send, FileText, TrendingUp, Zap, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface SubAgent {
  sessionId: string;
  label?: string;
  status: 'running' | 'completed' | 'failed' | 'killed';
  task?: string;
  model?: string;
  startedAt?: string;
  completedAt?: string;
}

interface ReportSummary {
  id: string;
  agentId: string;
  agentName: string;
  task: string;
  outcome: 'success' | 'failure' | 'partial';
  startedAt: string;
  completedAt: string;
  duration: string;
  tokens: { input: number; output: number };
  model: string;
}

interface AgentData {
  sessions: unknown[];
  subagents: SubAgent[];
  mainStatus: {
    time?: string;
    model?: string;
    tokens?: { in: number; out: number };
    context?: { used: number; max: number };
    session?: string;
  } | null;
  timestamp: string;
}

interface ReportsData {
  reports: ReportSummary[];
  stats: {
    totalRuns: number;
    successRate: number;
    totalTokens: { input: number; output: number };
  };
}

export default function AgentFleetPage() {
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [reportsData, setReportsData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [steerTarget, setSteerTarget] = useState<string | null>(null);
  const [steerMessage, setSteerMessage] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [agentRes, reportsRes] = await Promise.all([
        fetch('/api/agents'),
        fetch('/api/agents/reports?recent=10'),
      ]);

      const agentResult = await agentRes.json();
      const reportsResult = await reportsRes.json();

      if (agentResult.ok) {
        setAgentData(agentResult.data);
      }
      if (reportsResult.ok) {
        setReportsData(reportsResult.data);
      }
      setError(null);
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleSteer = async (target: string) => {
    if (!steerMessage.trim()) return;
    setActionLoading(target);
    try {
      await fetch('/api/agents/steer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, message: steerMessage }),
      });
      setSteerTarget(null);
      setSteerMessage('');
      fetchData();
    } finally {
      setActionLoading(null);
    }
  };

  const handleKill = async (target: string) => {
    setActionLoading(target);
    try {
      await fetch('/api/agents/kill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target }),
      });
      fetchData();
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Running</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'killed':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30"><Square className="w-3 h-3 mr-1" />Killed</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>;
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failure':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'partial':
        return <Activity className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } catch {
      return '--:--';
    }
  };

  const formatTokens = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const activeAgents = agentData?.subagents?.filter(a => a.status === 'running') || [];
  const todayRuns = reportsData?.stats?.totalRuns || 0;
  const successRate = reportsData?.stats?.successRate || 0;
  const totalTokens = reportsData?.stats?.totalTokens || { input: 0, output: 0 };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Mission Control</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/agents/reports">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <FileText className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </Link>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
            <Play className="w-4 h-4 mr-2" />
            Spawn Agent
          </Button>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Bot className="w-7 h-7 text-amber-500" />
          Agent Fleet
        </h1>
        <p className="text-slate-400 mt-1">Monitor and manage sub-agents</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white">{todayRuns}</div>
                <p className="text-sm text-slate-400">Total Runs</p>
              </div>
              <Activity className="w-8 h-8 text-amber-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-400">{successRate}%</div>
                <p className="text-sm text-slate-400">Success Rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-400">{activeAgents.length}</div>
                <p className="text-sm text-slate-400">Running Now</p>
              </div>
              <Loader2 className={`w-8 h-8 text-blue-500/50 ${activeAgents.length > 0 ? 'animate-spin' : ''}`} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-amber-400">
                  {formatTokens(totalTokens.input + totalTokens.output)}
                </div>
                <p className="text-sm text-slate-400">Tokens Used</p>
              </div>
              <Zap className="w-8 h-8 text-amber-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Agent Status */}
      {agentData?.mainStatus && (
        <Card className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-white">Oden (Main Agent)</p>
                  <p className="text-xs text-slate-400">{agentData.mainStatus.model || 'Unknown model'}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                Online
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Context</p>
                <p className="text-white font-medium">
                  {agentData.mainStatus.context
                    ? `${Math.round((agentData.mainStatus.context.used / agentData.mainStatus.context.max) * 100)}%`
                    : '—'}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Session</p>
                <p className="text-white font-medium truncate">{agentData.mainStatus.session || 'main'}</p>
              </div>
              <div>
                <p className="text-slate-400">Time</p>
                <p className="text-white font-medium">{agentData.mainStatus.time || '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Agents */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-blue-500" />
              Active Agents
            </CardTitle>
            <CardDescription className="text-slate-400">
              Currently running sub-agents
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchData}
            className="text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {activeAgents.length === 0 ? (
            <div className="p-6 rounded-lg border border-dashed border-slate-600 text-center">
              <Bot className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400">No active sub-agents</p>
              <p className="text-slate-500 text-xs mt-1">Spawn a new agent to see it here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAgents.map((agent) => (
                <div 
                  key={agent.sessionId}
                  className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{agent.label || agent.sessionId.slice(0, 16)}</p>
                        <p className="text-xs text-slate-400">{agent.model || 'Unknown model'}</p>
                      </div>
                    </div>
                    {getStatusBadge(agent.status)}
                  </div>
                  
                  {agent.task && (
                    <p className="text-sm text-slate-300 mb-3 line-clamp-2">{agent.task}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Started {agent.startedAt ? formatTime(agent.startedAt) : 'recently'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSteerTarget(steerTarget === agent.sessionId ? null : agent.sessionId)}
                        className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Steer
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleKill(agent.sessionId)}
                        disabled={actionLoading === agent.sessionId}
                        className="h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        {actionLoading === agent.sessionId ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <Square className="w-3 h-3 mr-1" />
                            Kill
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {steerTarget === agent.sessionId && (
                    <div className="mt-3 flex gap-2">
                      <Input
                        value={steerMessage}
                        onChange={(e) => setSteerMessage(e.target.value)}
                        placeholder="Send steering instruction..."
                        className="flex-1 h-8 bg-slate-700/50 border-slate-600 text-white text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSteer(agent.sessionId);
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSteer(agent.sessionId)}
                        disabled={!steerMessage.trim() || actionLoading === agent.sessionId}
                        className="h-8 bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Completions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Recent Completions
            </CardTitle>
            <CardDescription className="text-slate-400">
              Latest completed agent tasks
            </CardDescription>
          </div>
          <Link href="/agents/reports">
            <Button variant="ghost" className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {!reportsData?.reports || reportsData.reports.length === 0 ? (
            <div className="p-6 rounded-lg border border-dashed border-slate-600 text-center">
              <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400">No completed reports yet</p>
              <p className="text-slate-500 text-xs mt-1">Reports will appear here after agents complete their tasks</p>
            </div>
          ) : (
            <div className="space-y-2">
              {reportsData.reports.slice(0, 5).map((report) => (
                <Link 
                  key={report.id}
                  href={`/agents/reports/${report.id}`}
                  className="block p-3 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getOutcomeIcon(report.outcome)}
                      <div>
                        <p className="font-medium text-white">{report.agentName}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{report.task}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">{formatTime(report.completedAt)}</p>
                      <p className="text-xs text-slate-500">{report.duration}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      {agentData?.timestamp && (
        <p className="text-xs text-slate-500 text-right">
          Last updated: {new Date(agentData.timestamp).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
