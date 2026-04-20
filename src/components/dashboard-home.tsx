"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Users,
  Twitter,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  description?: string;
}

function MetricCard({ title, value, change, changeType = "neutral", icon, description }: MetricCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {change && (
          <div className="flex items-center gap-1 mt-1">
            {changeType === "positive" ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : changeType === "negative" ? (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            ) : null}
            <span
              className={`text-xs ${
                changeType === "positive"
                  ? "text-green-500"
                  : changeType === "negative"
                  ? "text-red-500"
                  : "text-slate-400"
              }`}
            >
              {change}
            </span>
            {description && <span className="text-xs text-slate-500">• {description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardHome() {
  // Placeholder data - will be replaced with real API data
  const metrics = {
    goldPrice: "$2,892.40",
    goldChange: "+1.2%",
    totalHoldings: "12.5 oz",
    holdingsValue: "$36,155.00",
    xFollowers: "2,847",
    xChange: "+124 this week",
    systemUptime: "99.9%",
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Romo</h1>
          <p className="text-slate-400">Here's what's happening with Legacy Syndicate today.</p>
        </div>
        <Badge variant="outline" className="border-amber-500/50 text-amber-400">
          <Activity className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Gold Spot Price"
          value={metrics.goldPrice}
          change={metrics.goldChange}
          changeType="positive"
          icon={<Coins className="w-4 h-4" />}
          description="per oz"
        />
        <MetricCard
          title="Total Holdings"
          value={metrics.totalHoldings}
          change={metrics.holdingsValue}
          changeType="neutral"
          icon={<DollarSign className="w-4 h-4" />}
          description="USD value"
        />
        <MetricCard
          title="@DigitalGold Followers"
          value={metrics.xFollowers}
          change={metrics.xChange}
          changeType="positive"
          icon={<Twitter className="w-4 h-4" />}
        />
        <MetricCard
          title="System Uptime"
          value={metrics.systemUptime}
          icon={<Activity className="w-4 h-4" />}
          description="Last 30 days"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-slate-400">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {[
              { label: "View Gold Holdings", href: "/holdings" },
              { label: "Check X Analytics", href: "/x-metrics" },
              { label: "System Status", href: "/status" },
              { label: "Settings", href: "/settings" },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
              >
                <span>{action.label}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">
              Latest updates and events
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                event: "Gold price updated",
                time: "2 minutes ago",
                type: "info",
              },
              {
                event: "New X follower: @investor_mike",
                time: "15 minutes ago",
                type: "success",
              },
              {
                event: "System health check passed",
                time: "1 hour ago",
                type: "success",
              },
              {
                event: "Weekly report generated",
                time: "3 hours ago",
                type: "info",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "success" ? "bg-green-500" : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{activity.event}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* LSD Platform Status */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-amber-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <CardTitle className="text-white">Legacy Syndicate Digital (LSD)</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Tokenized gold platform status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Platform Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm text-amber-400">In Development</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Target Launch</p>
              <p className="text-sm text-white">Q3 2026</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Market Opportunity</p>
              <p className="text-sm text-white">$50B by 2026</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
