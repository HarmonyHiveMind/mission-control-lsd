"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Clock,
  Bot,
} from "lucide-react";

const PRESET_TASKS = [
  {
    label: "Research Task",
    task: "Research the following topic and provide a comprehensive summary:",
    icon: "🔍",
    description: "Web research with citations",
  },
  {
    label: "Code Review",
    task: "Review the following code for bugs, security issues, and improvements:",
    icon: "🔧",
    description: "Analyze code quality",
  },
  {
    label: "Write Content",
    task: "Write the following content in a professional tone:",
    icon: "✍️",
    description: "Generate written content",
  },
  {
    label: "Data Analysis",
    task: "Analyze the following data and provide insights:",
    icon: "📊",
    description: "Process and interpret data",
  },
];

const MODELS = [
  { id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4", tier: "fast" },
  { id: "anthropic/claude-opus-4-5", name: "Claude Opus 4.5", tier: "powerful" },
  { id: "openai/gpt-4o", name: "GPT-4o", tier: "fast" },
  { id: "openai/o1", name: "o1", tier: "reasoning" },
];

export function TaskSpawner({ onSpawn }: { onSpawn?: () => void }) {
  const [task, setTask] = useState("");
  const [label, setLabel] = useState("");
  const [model, setModel] = useState("anthropic/claude-sonnet-4");
  const [timeout, setTimeout] = useState(300);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSpawn = async () => {
    if (!task.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/agents/spawn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: task.trim(),
          label: label.trim() || undefined,
          model,
          mode: "run",
          runtime: "subagent",
          timeoutSeconds: timeout,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setResult({ ok: true, message: "Agent spawned successfully!" });
        setTask("");
        setLabel("");
        onSpawn?.();
      } else {
        setResult({
          ok: false,
          message: data.error || "Failed to spawn agent. Note: sessions_spawn may need to be enabled in gateway config.",
        });
      }
    } catch (err) {
      setResult({ ok: false, message: "Connection failed" });
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (preset: typeof PRESET_TASKS[0]) => {
    setTask(preset.task + " ");
    setLabel(preset.label);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Rocket className="w-5 h-5 text-amber-500" />
          Task Spawner
        </CardTitle>
        <CardDescription className="text-slate-400">
          Launch a new sub-agent with a specific task
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Presets */}
        <div>
          <Label className="text-slate-300 text-sm mb-2 block">Quick Start</Label>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_TASKS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset)}
                className="p-2 rounded-lg border border-slate-600 hover:border-amber-500/50 hover:bg-amber-500/5 transition-colors text-left group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{preset.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-amber-400">
                      {preset.label}
                    </p>
                    <p className="text-xs text-slate-500">{preset.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Task Input */}
        <div>
          <Label htmlFor="task" className="text-slate-300 text-sm">
            Task Description *
          </Label>
          <textarea
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Describe what you want the agent to do..."
            rows={4}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 resize-none"
          />
        </div>

        {/* Label */}
        <div>
          <Label htmlFor="label" className="text-slate-300 text-sm">
            Label (optional)
          </Label>
          <Input
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g., research-task-1"
            className="mt-1 bg-slate-700/50 border-slate-600 text-white"
          />
        </div>

        {/* Advanced Options Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
        >
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          Advanced Options
        </button>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 p-4 rounded-lg bg-slate-700/30 border border-slate-600">
            {/* Model Selection */}
            <div>
              <Label className="text-slate-300 text-sm mb-2 block">Model</Label>
              <div className="grid grid-cols-2 gap-2">
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModel(m.id)}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      model === m.id
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{m.name}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          m.tier === "fast"
                            ? "border-green-500/50 text-green-400"
                            : m.tier === "powerful"
                            ? "border-purple-500/50 text-purple-400"
                            : "border-blue-500/50 text-blue-400"
                        }`}
                      >
                        {m.tier}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeout */}
            <div>
              <Label htmlFor="timeout" className="text-slate-300 text-sm">
                Timeout (seconds)
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="timeout"
                  type="number"
                  value={timeout}
                  onChange={(e) => setTimeout(Number(e.target.value))}
                  min={30}
                  max={3600}
                  className="w-24 bg-slate-700/50 border-slate-600 text-white"
                />
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-500">
                  {timeout >= 60
                    ? `${Math.floor(timeout / 60)}m ${timeout % 60}s`
                    : `${timeout}s`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Result Message */}
        {result && (
          <div
            className={`p-3 rounded-lg flex items-center gap-2 ${
              result.ok
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {result.ok ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="text-sm">{result.message}</span>
          </div>
        )}

        {/* Spawn Button */}
        <Button
          onClick={handleSpawn}
          disabled={!task.trim() || loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Spawning...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Spawn Agent
            </>
          )}
        </Button>

        {/* Info Note */}
        <p className="text-xs text-slate-500 text-center">
          Sub-agents run isolated tasks and report back when complete.
          <br />
          Note: Spawning requires <code className="text-amber-400">sessions_spawn</code> enabled in gateway config.
        </p>
      </CardContent>
    </Card>
  );
}
