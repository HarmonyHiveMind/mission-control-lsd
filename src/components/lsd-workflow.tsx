"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Coins,
  CheckCircle,
  Circle,
  Clock,
  ArrowRight,
  Target,
  TrendingUp,
  Shield,
  Layers,
  Globe,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending" | "blocked";
  assignee?: string;
  dueDate?: string;
}

interface Phase {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  progress: number;
  targetDate: string;
  tasks: Task[];
  icon: React.ReactNode;
}

const LSD_PHASES: Phase[] = [
  {
    id: "phase-1",
    name: "Foundation",
    description: "Core infrastructure and legal framework",
    status: "in-progress",
    progress: 65,
    targetDate: "Q2 2026",
    icon: <Layers className="w-4 h-4" />,
    tasks: [
      { id: "1-1", title: "Legal entity formation", status: "completed" },
      { id: "1-2", title: "LBMA gold custody partnership", status: "in-progress", assignee: "Oden" },
      { id: "1-3", title: "Smart contract architecture design", status: "in-progress" },
      { id: "1-4", title: "Regulatory compliance framework", status: "pending" },
      { id: "1-5", title: "Security audit scope definition", status: "pending" },
    ],
  },
  {
    id: "phase-2",
    name: "Token Development",
    description: "Multi-chain token implementation",
    status: "upcoming",
    progress: 15,
    targetDate: "Q2 2026",
    icon: <Coins className="w-4 h-4" />,
    tasks: [
      { id: "2-1", title: "Ethereum ERC-20 token contract", status: "in-progress" },
      { id: "2-2", title: "Solana SPL token implementation", status: "pending" },
      { id: "2-3", title: "XRPL trust line setup", status: "pending" },
      { id: "2-4", title: "Cross-chain bridge architecture", status: "pending" },
      { id: "2-5", title: "Fractional ownership logic", status: "pending" },
    ],
  },
  {
    id: "phase-3",
    name: "Security & Audit",
    description: "AI-enhanced security and third-party audits",
    status: "upcoming",
    progress: 0,
    targetDate: "Q3 2026",
    icon: <Shield className="w-4 h-4" />,
    tasks: [
      { id: "3-1", title: "Smart contract security audit", status: "pending" },
      { id: "3-2", title: "Penetration testing", status: "pending" },
      { id: "3-3", title: "AI threat detection integration", status: "pending" },
      { id: "3-4", title: "Bug bounty program launch", status: "pending" },
    ],
  },
  {
    id: "phase-4",
    name: "DeFi Integration",
    description: "Yield opportunities and liquidity",
    status: "upcoming",
    progress: 0,
    targetDate: "Q3 2026",
    icon: <TrendingUp className="w-4 h-4" />,
    tasks: [
      { id: "4-1", title: "DEX liquidity pool setup", status: "pending" },
      { id: "4-2", title: "Yield farming partnerships", status: "pending" },
      { id: "4-3", title: "Lending protocol integration", status: "pending" },
      { id: "4-4", title: "Staking mechanism design", status: "pending" },
    ],
  },
  {
    id: "phase-5",
    name: "Launch & Scale",
    description: "Public launch and market expansion",
    status: "upcoming",
    progress: 0,
    targetDate: "Q4 2026",
    icon: <Globe className="w-4 h-4" />,
    tasks: [
      { id: "5-1", title: "Public beta launch", status: "pending" },
      { id: "5-2", title: "Marketing campaign activation", status: "pending" },
      { id: "5-3", title: "Institutional onboarding", status: "pending" },
      { id: "5-4", title: "Geographic expansion", status: "pending" },
    ],
  },
];

const MARKET_STATS = {
  targetMarket: "$50B",
  targetYear: "2026",
  currentPhase: "Foundation",
  overallProgress: 18,
};

function TaskItem({ task }: { task: Task }) {
  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-amber-500 animate-pulse" />;
      case "blocked":
        return <Circle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">Done</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">Active</Badge>;
      case "blocked":
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/30 text-xs">Blocked</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-colors">
      {getStatusIcon()}
      <span className={`flex-1 text-sm ${task.status === "completed" ? "text-slate-500 line-through" : "text-slate-300"}`}>
        {task.title}
      </span>
      {task.assignee && (
        <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
          {task.assignee}
        </span>
      )}
      {getStatusBadge()}
    </div>
  );
}

function PhaseCard({ phase, isExpanded, onToggle }: { phase: Phase; isExpanded: boolean; onToggle: () => void }) {
  const getStatusColor = () => {
    switch (phase.status) {
      case "completed":
        return "border-green-500/50 bg-green-500/5";
      case "in-progress":
        return "border-amber-500/50 bg-amber-500/5";
      default:
        return "border-slate-600 bg-slate-800/30";
    }
  };

  const completedTasks = phase.tasks.filter((t) => t.status === "completed").length;

  return (
    <div className={`rounded-lg border ${getStatusColor()} overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 hover:bg-slate-700/20 transition-colors text-left"
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          phase.status === "in-progress" ? "bg-amber-500/20 text-amber-500" : "bg-slate-700 text-slate-400"
        }`}>
          {phase.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white">{phase.name}</h4>
            {phase.status === "in-progress" && (
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-medium text-white">{phase.progress}%</div>
          <div className="text-xs text-slate-500">{completedTasks}/{phase.tasks.length} tasks</div>
        </div>
        <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              phase.status === "completed" ? "bg-green-500" : "bg-amber-500"
            }`}
            style={{ width: `${phase.progress}%` }}
          />
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="border-t border-slate-700 p-3 space-y-1 bg-slate-800/30">
          <div className="flex items-center justify-between mb-2 px-3">
            <span className="text-xs text-slate-500">Target: {phase.targetDate}</span>
          </div>
          {phase.tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export function LsdWorkflow() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("phase-1");

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Coins className="w-6 h-6 text-slate-900" />
            </div>
            LSD Platform Workflow
          </h1>
          <p className="text-slate-400 mt-1">Legacy Syndicate Digital — Tokenized Gold Platform</p>
        </div>
        <Badge variant="outline" className="border-amber-500/50 text-amber-400">
          <Target className="w-3 h-3 mr-1" />
          {MARKET_STATS.targetMarket} Market by {MARKET_STATS.targetYear}
        </Badge>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 mb-1">Overall Progress</div>
            <div className="text-2xl font-bold text-white">{MARKET_STATS.overallProgress}%</div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${MARKET_STATS.overallProgress}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 mb-1">Current Phase</div>
            <div className="text-lg font-bold text-white">{MARKET_STATS.currentPhase}</div>
            <div className="text-xs text-amber-400 mt-1">In Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 mb-1">Target Market</div>
            <div className="text-2xl font-bold text-white">{MARKET_STATS.targetMarket}</div>
            <div className="text-xs text-slate-500 mt-1">Tokenized assets by 2026</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 mb-1">Launch Target</div>
            <div className="text-lg font-bold text-white">Q3 2026</div>
            <div className="text-xs text-green-400 mt-1">On Track</div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Timeline */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Development Roadmap</CardTitle>
          <CardDescription className="text-slate-400">
            Track progress across all platform development phases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {LSD_PHASES.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              isExpanded={expandedPhase === phase.id}
              onToggle={() => togglePhase(phase.id)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-white">Gold Backing</span>
            </div>
            <p className="text-xs text-slate-400">LBMA-standard physical gold in secure custody</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Multi-Chain</span>
            </div>
            <p className="text-xs text-slate-400">Ethereum, Solana, XRPL integration</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white">DeFi Ready</span>
            </div>
            <p className="text-xs text-slate-400">Yield opportunities via lending & staking</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
