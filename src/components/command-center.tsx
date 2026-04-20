"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentFleet } from "@/components/agent-fleet";
import { TaskSpawner } from "@/components/task-spawner";
import { CommandChat } from "@/components/command-chat";
import { DailyBriefPanel } from "@/components/daily-brief-panel";
import {
  Activity,
  Coins,
  Twitter,
  Calendar,
  Mail,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
} from "lucide-react";

// Mission Statement Component
function MissionStatement() {
  return (
    <Card className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-amber-500/10 border-amber-500/30">
      <CardContent className="py-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-400 text-sm uppercase tracking-wide mb-1">
              Mission Statement
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The primary goal of all agents is to create an{" "}
              <span className="text-amber-400 font-medium">autonomous organization of AI agents</span>{" "}
              that works for Romo <span className="text-amber-400 font-medium">24/7/365</span> to produce{" "}
              <span className="text-amber-400 font-medium">ongoing monetary value</span> and{" "}
              <span className="text-amber-400 font-medium">change the world for the better</span>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Daily Brief Component
function DailyBrief() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening";

  const suggestions = [
    {
      icon: <Mail className="w-4 h-4" />,
      title: "Check inbox",
      description: "Review important emails",
      priority: "medium",
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      title: "Calendar clear",
      description: "Good day for deep work",
      priority: "low",
    },
    {
      icon: <Coins className="w-4 h-4" />,
      title: "Gold price",
      description: "Monitor spot price",
      priority: "info",
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      title: "@DigitalGold",
      description: "Check engagement",
      priority: "info",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/50 bg-red-500/10";
      case "medium":
        return "border-amber-500/50 bg-amber-500/10";
      case "low":
        return "border-green-500/50 bg-green-500/10";
      default:
        return "border-slate-600 bg-slate-700/30";
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Daily Brief
          </CardTitle>
          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </Badge>
        </div>
        <CardDescription className="text-slate-400 text-xs">
          {greeting}, Romo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((item, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg border ${getPriorityColor(item.priority)} flex items-center gap-2`}
          >
            <div className="w-6 h-6 rounded bg-slate-700/50 flex items-center justify-center text-amber-500 shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{item.title}</p>
              <p className="text-xs text-slate-500 truncate">{item.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Quick Actions
function QuickActions() {
  const actions = [
    { label: "Check emails", icon: <Mail className="w-4 h-4" /> },
    { label: "X Analytics", icon: <Twitter className="w-4 h-4" /> },
    { label: "Gold price", icon: <Coins className="w-4 h-4" /> },
    { label: "Calendar", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm">Quick Commands</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            className="justify-start border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-amber-500/50 text-xs"
          >
            {action.icon}
            <span className="ml-1.5 truncate">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

// System Status
function SystemStatus() {
  const systems = [
    { name: "OpenClaw Gateway", status: "online" },
    { name: "Telegram Bot", status: "online" },
    { name: "Command Chat", status: "online" },
    { name: "X API", status: "pending" },
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-500" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {systems.map((system) => (
          <div key={system.name} className="flex items-center justify-between">
            <span className="text-xs text-slate-300">{system.name}</span>
            {system.status === "online" ? (
              <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs py-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="outline" className="border-amber-500/50 text-amber-400 text-xs py-0">
                <AlertCircle className="w-3 h-3 mr-1" />
                Setup
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function CommandCenter() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAgentSpawn = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  // Handle commands from Daily Brief
  const handleBriefCommand = useCallback((cmd: string) => {
    // Could integrate with chat or trigger actions
    console.log("Brief command:", cmd);
    // For now, commands can be copied to chat
  }, []);

  return (
    <div className="space-y-4">
      {/* Mission Statement - Prominent at top */}
      <MissionStatement />

      {/* Daily Brief - Proactive suggestions */}
      <DailyBriefPanel onCommand={handleBriefCommand} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Command Center</h1>
          <p className="text-slate-400 text-sm">Agent orchestration hub</p>
        </div>
        <Badge variant="outline" className="border-amber-500/50 text-amber-400">
          <Activity className="w-3 h-3 mr-1 animate-pulse" />
          Live
        </Badge>
      </div>

      {/* Main Grid - Chat prominent on left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column - Command Chat (larger) */}
        <div className="lg:col-span-5 h-[500px]">
          <CommandChat />
        </div>

        {/* Middle Column - Agent Fleet + Task Spawner */}
        <div className="lg:col-span-4 space-y-4">
          <AgentFleet key={refreshKey} />
          <TaskSpawner onSpawn={handleAgentSpawn} />
        </div>

        {/* Right Column - Brief + Status + Quick Actions */}
        <div className="lg:col-span-3 space-y-4">
          <DailyBrief />
          <SystemStatus />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
