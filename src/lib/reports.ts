// Report utilities for agent fleet archive system

import fs from 'fs';
import path from 'path';

const REPORTS_DIR = path.join(process.cwd(), 'reports', 'agent-fleet');

export interface ReportSummary {
  id: string;
  agentId: string;
  agentName: string;
  task: string;
  outcome: 'success' | 'failure' | 'partial';
  startedAt: string;
  completedAt: string;
  duration: string;
  durationMs: number;
  tokens: {
    input: number;
    output: number;
  };
  model: string;
}

export interface DailyIndex {
  date: string;
  totalRuns: number;
  successful: number;
  failed: number;
  partial: number;
  totalTokens: {
    input: number;
    output: number;
  };
  reports: ReportSummary[];
}

export interface ReportDetail {
  id: string;
  content: string;
  metadata: ReportSummary;
}

/**
 * Get list of available report dates (YYYY-MM-DD)
 */
export async function getAvailableDates(): Promise<string[]> {
  try {
    if (!fs.existsSync(REPORTS_DIR)) {
      return [];
    }
    
    const entries = fs.readdirSync(REPORTS_DIR, { withFileTypes: true });
    const dates = entries
      .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
      .map(entry => entry.name)
      .sort((a, b) => b.localeCompare(a)); // Most recent first
    
    return dates;
  } catch (error) {
    console.error('Failed to get available dates:', error);
    return [];
  }
}

/**
 * Get reports for a specific date with optional filtering
 */
export async function getReportsForDate(
  date: string,
  options?: {
    agent?: string;
    outcome?: 'success' | 'failure' | 'partial';
    search?: string;
  }
): Promise<DailyIndex | null> {
  try {
    const dateDir = path.join(REPORTS_DIR, date);
    const indexPath = path.join(dateDir, 'index.json');
    
    if (!fs.existsSync(indexPath)) {
      return null;
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const index: DailyIndex = JSON.parse(indexContent);
    
    // Apply filters
    let filteredReports = index.reports;
    
    if (options?.agent) {
      const agentLower = options.agent.toLowerCase();
      filteredReports = filteredReports.filter(r => 
        r.agentId.toLowerCase().includes(agentLower) ||
        r.agentName.toLowerCase().includes(agentLower)
      );
    }
    
    if (options?.outcome) {
      filteredReports = filteredReports.filter(r => r.outcome === options.outcome);
    }
    
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      filteredReports = filteredReports.filter(r =>
        r.agentName.toLowerCase().includes(searchLower) ||
        r.task.toLowerCase().includes(searchLower)
      );
    }
    
    // Recalculate stats for filtered results
    const stats = {
      ...index,
      totalRuns: filteredReports.length,
      successful: filteredReports.filter(r => r.outcome === 'success').length,
      failed: filteredReports.filter(r => r.outcome === 'failure').length,
      partial: filteredReports.filter(r => r.outcome === 'partial').length,
      totalTokens: filteredReports.reduce(
        (acc, r) => ({
          input: acc.input + r.tokens.input,
          output: acc.output + r.tokens.output,
        }),
        { input: 0, output: 0 }
      ),
      reports: filteredReports,
    };
    
    return stats;
  } catch (error) {
    console.error(`Failed to get reports for date ${date}:`, error);
    return null;
  }
}

/**
 * Get a single report by ID
 */
export async function getReportById(id: string): Promise<ReportDetail | null> {
  try {
    const dates = await getAvailableDates();
    
    for (const date of dates) {
      const dateDir = path.join(REPORTS_DIR, date);
      const reportPath = path.join(dateDir, `${id}.md`);
      
      if (fs.existsSync(reportPath)) {
        const content = fs.readFileSync(reportPath, 'utf-8');
        
        // Get metadata from index
        const indexPath = path.join(dateDir, 'index.json');
        if (fs.existsSync(indexPath)) {
          const index: DailyIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
          const metadata = index.reports.find(r => r.id === id);
          
          if (metadata) {
            return { id, content, metadata };
          }
        }
        
        // Fallback metadata if index missing
        return {
          id,
          content,
          metadata: {
            id,
            agentId: id.split('-').slice(0, -1).join('-'),
            agentName: id.split('-').slice(0, -1).join(' '),
            task: 'Unknown task',
            outcome: 'success',
            startedAt: '',
            completedAt: '',
            duration: 'Unknown',
            durationMs: 0,
            tokens: { input: 0, output: 0 },
            model: 'Unknown',
          },
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to get report ${id}:`, error);
    return null;
  }
}

/**
 * Get the most recent reports across all dates
 */
export async function getRecentReports(limit: number = 10): Promise<ReportSummary[]> {
  try {
    const dates = await getAvailableDates();
    const allReports: ReportSummary[] = [];
    
    for (const date of dates) {
      const index = await getReportsForDate(date);
      if (index) {
        allReports.push(...index.reports);
      }
      
      if (allReports.length >= limit * 2) break; // Get enough for sorting
    }
    
    // Sort by completedAt and take limit
    return allReports
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to get recent reports:', error);
    return [];
  }
}

/**
 * Get aggregate stats across all dates
 */
export async function getAggregateStats(): Promise<{
  totalRuns: number;
  successRate: number;
  totalTokens: { input: number; output: number };
  datesWithReports: number;
}> {
  try {
    const dates = await getAvailableDates();
    let totalRuns = 0;
    let successful = 0;
    let totalTokens = { input: 0, output: 0 };
    
    for (const date of dates) {
      const index = await getReportsForDate(date);
      if (index) {
        totalRuns += index.totalRuns;
        successful += index.successful;
        totalTokens.input += index.totalTokens.input;
        totalTokens.output += index.totalTokens.output;
      }
    }
    
    return {
      totalRuns,
      successRate: totalRuns > 0 ? Math.round((successful / totalRuns) * 100) : 0,
      totalTokens,
      datesWithReports: dates.length,
    };
  } catch (error) {
    console.error('Failed to get aggregate stats:', error);
    return {
      totalRuns: 0,
      successRate: 0,
      totalTokens: { input: 0, output: 0 },
      datesWithReports: 0,
    };
  }
}
