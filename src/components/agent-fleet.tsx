"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bot,
  Play,
  Square,
  Send,
  RefreshCw,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
} from "lucide-react";

interface SubAgent {
  sessionId: string;
  label?: string;
  status: "running" | "completed" | "failed" | "killed";
  task?: string;
  model?: string;
  startedAt?: string;
  completedAt?: string;
}

interface Session {
  sessionKey: string;
  label?: string;
  kind?: string;
  agentId?: string;
  model?: string;
  updatedAt?: string;
  lastMessage?: {
    role: string;
    content: string;
  };
}

interface MainStatus {
  time?: string;
  model?: string;
  tokens?: { in: number; out: number };
  context?: { used: number; max: number };
  session?: string;
}

interface AgentData {
  sessions: Session[];
  subagents: SubAgent[];
  mainStatus: MainStatus | null;
  timestamp: string;
}

export function AgentFleet() {
  const [data, setData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [steerTarget, setSteerTarget] = useState<string | null>(null);
  const [steerMessage, setSteerMessage] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/agents");
      const result = await response.json();
      if (result.ok) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch data");
      }
    } catch (err) {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleSteer = async (target: string) => {
    if (!steerMessage.trim()) return;
    setActionLoading(target);
    try {
      await fetch("/api/agents/steer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, message: steerMessage }),
      });
      setSteerTarget(null);
      setSteerMessage("");
      fetchData();
    } finally {
      setActionLoading(null);
    }
  };

  const handleKill = async (target: string) => {
    setActionLoading(target);
    try {
      await fetch("/api/agents/kill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });
      fetchData();
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Loader2 className="w-4 h-4 animate-spin text-blue-400" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "killed":
        return <Square className="w-4 h-4 text-orange-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "border-blue-500/50 bg-blue-500/10";
      case "completed":
        return "border-green-500/50 bg-green-500/10";
      case "failed":
        return "border-red-500/50 bg-red-500/10";
      case "killed":
        return "border-orange-500/50 bg-orange-500/10";
      default:
        return "border-slate-500/50 bg-slate-500/10";
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-500" />
            Agent Fleet
          </CardTitle>
          <CardDescription className="text-slate-400">
            Live sub-agent status and controls
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
      <CardContent className="space-y-4">
        {/* Main Agent Status */}
        {data?.mainStatus && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-medium text-white">Oden (Main)</span>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                Online
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Model</p>
                <p className="text-white truncate">{data.mainStatus.model || "—"}</p>
              </div>
              <div>
                <p className="text-slate-400">Context</p>
                <p className="text-white">
                  {data.mainStatus.context
                    ? `${Math.round((data.mainStatus.context.used / data.mainStatus.context.max) * 100)}%`
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Session</p>
                <p className="text-white truncate">{data.mainStatus.session || "main"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Sub-Agents */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300">Sub-Agents</h4>
          
          {(!data?.subagents || data.subagents.length === 0) ? (
            <div className="p-6 rounded-lg border border-dashed border-slate-600 text-center">
              <Bot className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">No active sub-agents</p>
              <p className="text-slate-500 text-xs mt-1">
                Spawn a new agent to see it here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.subagents.map((agent) => (
                <div
                  key={agent.sessionId}
                  className={`p-3 rounded-lg border ${getStatusColor(agent.status)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(agent.status)}
                      <span className="font-medium text-white">
                        {agent.label || agent.sessionId.slice(0, 8)}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs border-slate-600 text-slate-400"
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    
                    {agent.status === "running" && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSteerTarget(
                            steerTarget === agent.sessionId ? null : agent.sessionId
                          )}
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
                    )}
                  </div>

                  {agent.task && (
                    <p className="text-sm text-slate-300 mb-2 line-clamp-2">
                      {agent.task}
                    </p>
                  )}

                  {agent.model && (
                    <p className="text-xs text-slate-500">
                      Model: {agent.model}
                    </p>
                  )}

                  {/* Steer Input */}
                  {steerTarget === agent.sessionId && (
                    <div className="mt-3 flex gap-2">
                      <Input
                        value={steerMessage}
                        onChange={(e) => setSteerMessage(e.target.value)}
                        placeholder="Send steering instruction..."
                        className="flex-1 h-8 bg-slate-700/50 border-slate-600 text-white text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSteer(agent.sessionId);
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSteer(agent.sessionId)}
                        disabled={!steerMessage.trim() || actionLoading === agent.sessionId}
                        className="h-8 bg-blue-500 hover:bg-blue-600"
                      >
                        {actionLoading === agent.sessionId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last Updated */}
        {data?.timestamp && (
          <p className="text-xs text-slate-500 text-right">
            Updated: {new Date(data.timestamp).toLocaleTimeString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
