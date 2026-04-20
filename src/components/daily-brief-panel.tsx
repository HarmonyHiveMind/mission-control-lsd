"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Clock,
  ArrowRight,
  RefreshCw,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  Target,
  AlertCircle,
  Info,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface BriefItem {
  id: string;
  category: "priority" | "info" | "action" | "alert";
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    command?: string;
  };
}

interface DailyBrief {
  date: string;
  greeting: string;
  summary: string;
  items: BriefItem[];
  generatedAt: string;
}

function BriefItemCard({ item, onCommand }: { item: BriefItem; onCommand?: (cmd: string) => void }) {
  const getCategoryStyles = () => {
    switch (item.category) {
      case "priority":
        return "border-amber-500/50 bg-amber-500/5";
      case "alert":
        return "border-red-500/50 bg-red-500/5";
      case "action":
        return "border-blue-500/50 bg-blue-500/5";
      default:
        return "border-slate-600 bg-slate-800/30";
    }
  };

  const getCategoryIcon = () => {
    switch (item.category) {
      case "priority":
        return <Target className="w-3 h-3 text-amber-400" />;
      case "alert":
        return <AlertCircle className="w-3 h-3 text-red-400" />;
      case "action":
        return <Zap className="w-3 h-3 text-blue-400" />;
      default:
        return <Info className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getCategoryStyles()} transition-colors hover:border-opacity-75`}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium text-white">{item.title}</h4>
            {getCategoryIcon()}
          </div>
          <p className="text-xs text-slate-400 mb-2">{item.description}</p>
          {item.action && (
            item.action.href ? (
              <Link href={item.action.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                >
                  {item.action.label}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            ) : item.action.command && onCommand ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCommand(item.action!.command!)}
                className="h-7 px-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                {item.action.label}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export function DailyBriefPanel({ onCommand }: { onCommand?: (cmd: string) => void }) {
  const [brief, setBrief] = useState<DailyBrief | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const fetchBrief = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/brief");
      const result = await response.json();
      if (result.ok) {
        setBrief(result.brief);
      }
    } catch (error) {
      console.error("Failed to fetch brief:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrief();
    
    // Check if already dismissed today
    const lastDismissed = localStorage.getItem("brief-dismissed-date");
    const today = new Date().toDateString();
    if (lastDismissed === today) {
      setDismissed(true);
      setExpanded(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setExpanded(false);
    localStorage.setItem("brief-dismissed-date", new Date().toDateString());
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 border-purple-500/30">
        <CardContent className="p-4 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
        </CardContent>
      </Card>
    );
  }

  if (!brief) return null;

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 border-purple-500/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <div>
              <CardTitle className="text-white text-sm">
                {brief.greeting}, Romo
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                {brief.date}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchBrief}
              className="h-7 w-7 text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded(!expanded)}
              className="h-7 w-7 text-slate-400 hover:text-white"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            {!dismissed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-7 w-7 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-3">
          {/* Summary */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-300">{brief.summary}</span>
          </div>

          {/* Brief Items */}
          <div className="space-y-2">
            {brief.items.slice(0, dismissed ? 3 : undefined).map((item) => (
              <BriefItemCard key={item.id} item={item} onCommand={onCommand} />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700">
            <span className="text-xs text-slate-500">
              Generated {new Date(brief.generatedAt).toLocaleTimeString()}
            </span>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Brief
            </Badge>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
