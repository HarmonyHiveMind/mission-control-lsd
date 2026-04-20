'use client';

import { useState, useEffect, use, ReactNode } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, FileText, CheckCircle, XCircle, Activity, Clock, 
  Loader2, Bot, Zap, Calendar, Copy, Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReportMetadata {
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

interface ReportDetail {
  id: string;
  content: string;
  metadata: ReportMetadata;
}

export default function ReportViewerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/agents/reports/${resolvedParams.id}`);
        const result = await response.json();
        
        if (result.ok) {
          setReport(result.data);
          setError(null);
        } else {
          setError(result.error || 'Report not found');
        }
      } catch {
        setError('Failed to load report');
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [resolvedParams.id]);

  const copyToClipboard = async () => {
    if (!report?.content) return;
    try {
      await navigator.clipboard.writeText(report.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const formatDateTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      return isoString;
    }
  };

  const formatTokens = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const getOutcomeDetails = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-400" />,
          badge: <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-base px-3 py-1">✅ Success</Badge>,
          color: 'border-green-500/30 bg-green-500/5'
        };
      case 'failure':
        return {
          icon: <XCircle className="w-6 h-6 text-red-400" />,
          badge: <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-base px-3 py-1">❌ Failed</Badge>,
          color: 'border-red-500/30 bg-red-500/5'
        };
      case 'partial':
        return {
          icon: <Activity className="w-6 h-6 text-yellow-400" />,
          badge: <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-base px-3 py-1">⚠️ Partial</Badge>,
          color: 'border-yellow-500/30 bg-yellow-500/5'
        };
      default:
        return {
          icon: <Clock className="w-6 h-6 text-gray-400" />,
          badge: <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-base px-3 py-1">Unknown</Badge>,
          color: 'border-gray-500/30 bg-gray-500/5'
        };
    }
  };

  // Simple markdown-ish rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];
    
    const processLine = (line: string, index: number) => {
      // Skip the title line (we show it in header)
      if (line.startsWith('# Agent Report:')) return null;
      
      // Headers
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-bold text-white mt-6 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-amber-500 rounded" />
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-white mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={index} className="text-base font-semibold text-slate-200 mt-3 mb-1">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      
      // Horizontal rule
      if (line.startsWith('---')) {
        return <hr key={index} className="border-slate-700 my-6" />;
      }
      
      // List items
      if (line.match(/^[\-\*]\s/)) {
        return (
          <li key={index} className="text-slate-300 ml-4 list-disc">
            {formatInlineText(line.replace(/^[\-\*]\s/, ''))}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={index} className="text-slate-300 ml-4 list-decimal">
            {formatInlineText(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
      }
      
      // Table start
      if (line.startsWith('|') && line.endsWith('|')) {
        return null; // We'll handle tables separately
      }
      
      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-2" />;
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-slate-300 mb-2">
          {formatInlineText(line)}
        </p>
      );
    };
    
    const formatInlineText = (text: string) => {
      // Bold
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      // Code
      text = text.replace(/`(.+?)`/g, '<code class="bg-slate-700 px-1 rounded text-amber-400">$1</code>');
      // Checkmarks
      text = text.replace(/✅/g, '<span class="text-green-400">✅</span>');
      text = text.replace(/⚠️/g, '<span class="text-yellow-400">⚠️</span>');
      text = text.replace(/❌/g, '<span class="text-red-400">❌</span>');
      
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };
    
    // Process tables separately
    let currentTable: { headers: string[]; rows: string[][] } | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!currentTable) {
          currentTable = { headers: [], rows: [] };
          const cells = line.split('|').filter(c => c.trim());
          currentTable.headers = cells.map(c => c.trim());
        } else if (line.includes('---')) {
          // Separator line, skip
          continue;
        } else {
          const cells = line.split('|').filter(c => c.trim());
          currentTable.rows.push(cells.map(c => c.trim()));
        }
      } else {
        // End of table
        if (currentTable) {
          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    {currentTable.headers.map((h, hi) => (
                      <th key={hi} className="text-left py-2 px-3 text-slate-400 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentTable.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-slate-800">
                      {row.map((cell, ci) => (
                        <td key={ci} className="py-2 px-3 text-slate-300">
                          {formatInlineText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          currentTable = null;
        }
        
        const element = processLine(line, i);
        if (element) elements.push(element);
      }
    }
    
    // Handle trailing table
    if (currentTable) {
      elements.push(
        <div key="table-final" className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {currentTable.headers.map((h, hi) => (
                  <th key={hi} className="text-left py-2 px-3 text-slate-400 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTable.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-slate-800">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-3 text-slate-300">
                      {formatInlineText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    return elements;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="space-y-6">
        <Link 
          href="/agents/reports" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Reports</span>
        </Link>
        
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-red-400 text-lg">{error || 'Report not found'}</p>
              <Link href="/agents/reports">
                <Button variant="outline" className="mt-4 border-slate-600 text-slate-300">
                  Back to Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const outcome = getOutcomeDetails(report.metadata.outcome);

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/agents/reports" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Reports</span>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Report
            </>
          )}
        </Button>
      </div>

      {/* Report Header */}
      <Card className={`${outcome.color} border`}>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Bot className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{report.metadata.agentName}</h1>
                <p className="text-slate-400 mt-1">{report.metadata.task}</p>
              </div>
            </div>
            {outcome.badge}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Calendar className="w-3 h-3" />
                Started
              </div>
              <p className="text-white text-sm font-medium">{formatDateTime(report.metadata.startedAt)}</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Clock className="w-3 h-3" />
                Completed
              </div>
              <p className="text-white text-sm font-medium">{formatDateTime(report.metadata.completedAt)}</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Activity className="w-3 h-3" />
                Duration
              </div>
              <p className="text-white text-sm font-medium">{report.metadata.duration}</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Zap className="w-3 h-3" />
                Tokens
              </div>
              <p className="text-white text-sm font-medium">
                {formatTokens(report.metadata.tokens.input)} in / {formatTokens(report.metadata.tokens.output)} out
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Bot className="w-3 h-3" />
              Model
            </div>
            <p className="text-white text-sm font-medium">{report.metadata.model}</p>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            Full Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            {renderContent(report.content)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
