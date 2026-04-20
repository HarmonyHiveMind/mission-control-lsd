'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, FileText, Search, Calendar, Filter, CheckCircle, XCircle, 
  Activity, ChevronLeft, ChevronRight, Loader2, Bot, Clock, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ReportSummary {
  id: string;
  agentId: string;
  agentName: string;
  task: string;
  outcome: 'success' | 'failure' | 'partial';
  startedAt: string;
  completedAt: string;
  duration: string;
  durationMs: number;
  tokens: { input: number; output: number };
  model: string;
}

interface ReportsResponse {
  date: string;
  stats: {
    total: number;
    successful: number;
    failed: number;
    partial: number;
    tokens: { input: number; output: number };
  };
  reports: ReportSummary[];
  availableDates: string[];
}

export default function ReportsBrowserPage() {
  const [data, setData] = useState<ReportsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all');

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ date: selectedDate });
      if (searchQuery) params.set('q', searchQuery);
      if (outcomeFilter !== 'all') params.set('outcome', outcomeFilter);
      
      const response = await fetch(`/api/agents/reports?${params}`);
      const result = await response.json();
      
      if (result.ok) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch reports');
      }
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  }, [selectedDate, searchQuery, outcomeFilter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const navigateDate = (direction: 'prev' | 'next') => {
    if (!data?.availableDates?.length) return;
    
    const currentIndex = data.availableDates.indexOf(selectedDate);
    if (direction === 'prev' && currentIndex < data.availableDates.length - 1) {
      setSelectedDate(data.availableDates[currentIndex + 1]);
    } else if (direction === 'next' && currentIndex > 0) {
      setSelectedDate(data.availableDates[currentIndex - 1]);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return dateStr;
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

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failure':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'partial':
        return <Activity className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Success</Badge>;
      case 'failure':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Partial</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>;
    }
  };

  const canNavigatePrev = data?.availableDates && 
    data.availableDates.indexOf(selectedDate) < data.availableDates.length - 1;
  const canNavigateNext = data?.availableDates && 
    data.availableDates.indexOf(selectedDate) > 0;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/agents" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Agent Fleet</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FileText className="w-7 h-7 text-amber-500" />
          Agent Reports
        </h1>
        <p className="text-slate-400 mt-1">Browse historical agent task reports</p>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('prev')}
                disabled={!canNavigatePrev}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-600 min-w-[200px] justify-center">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span className="text-white font-medium">{formatDate(selectedDate)}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('next')}
                disabled={!canNavigateNext}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="pl-10 bg-slate-900/50 border-slate-600 text-white"
              />
            </div>

            {/* Outcome Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Outcomes</option>
                <option value="success">Success</option>
                <option value="failure">Failed</option>
                <option value="partial">Partial</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {data?.stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-white">{data.stats.total}</div>
              <p className="text-xs text-slate-400">Total Runs</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-green-400">{data.stats.successful}</div>
              <p className="text-xs text-slate-400">Successful</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-red-400">{data.stats.failed}</div>
              <p className="text-xs text-slate-400">Failed</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-yellow-400">{data.stats.partial}</div>
              <p className="text-xs text-slate-400">Partial</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-amber-400">
                {formatTokens(data.stats.tokens.input + data.stats.tokens.output)}
              </div>
              <p className="text-xs text-slate-400">Tokens</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Reports List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Reports</CardTitle>
          <CardDescription className="text-slate-400">
            {data?.reports?.length || 0} reports for {formatDate(selectedDate)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            </div>
          ) : !data?.reports || data.reports.length === 0 ? (
            <div className="p-8 rounded-lg border border-dashed border-slate-600 text-center">
              <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400 text-lg">No reports found</p>
              <p className="text-slate-500 text-sm mt-1">
                {searchQuery || outcomeFilter !== 'all' 
                  ? 'Try adjusting your filters'
                  : 'No agent tasks completed on this date'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.reports.map((report) => (
                <Link
                  key={report.id}
                  href={`/agents/reports/${report.id}`}
                  className="block p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-amber-500/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 pt-1">
                      {getOutcomeIcon(report.outcome)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-white group-hover:text-amber-400 transition-colors">
                          {report.agentName}
                        </h3>
                        {getOutcomeBadge(report.outcome)}
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-2">
                        {report.task}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(report.completedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {report.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {formatTokens(report.tokens.input + report.tokens.output)} tokens
                        </span>
                        <span className="flex items-center gap-1">
                          <Bot className="w-3 h-3" />
                          {report.model.split('-').slice(0, 2).join('-')}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-amber-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Dates Quick Jump */}
      {data?.availableDates && data.availableDates.length > 1 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Jump to Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.availableDates.slice(0, 10).map((date) => (
                <Button
                  key={date}
                  variant={date === selectedDate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate(date)}
                  className={date === selectedDate 
                    ? "bg-amber-500 text-black hover:bg-amber-600" 
                    : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
