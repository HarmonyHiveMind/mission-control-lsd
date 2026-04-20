# Agent Fleet Reports & Archive System - Design Document

**Author:** Agent-Fleet-Reviewer  
**Date:** 2026-03-26  
**Status:** Implementing

---

## 1. Architecture Overview

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────┐
│                      Mission Control UI                         │
├─────────────────────────────────────────────────────────────────┤
│  /agents (Main Fleet Dashboard)                                 │
│  ├── Stats Overview (runs, success rate, tokens)                │
│  ├── Active Agents (real-time)                                  │
│  ├── Recent Completions (last 10)                               │
│  └── [View Reports] → Reports Browser                           │
├─────────────────────────────────────────────────────────────────┤
│  /agents/reports (Reports Browser)                              │
│  ├── Date Picker / Calendar Navigation                          │
│  ├── Filters (agent, outcome, search)                           │
│  └── Report List with Expandable Previews                       │
├─────────────────────────────────────────────────────────────────┤
│  /agents/reports/[id] (Full Report View)                        │
│  └── Complete markdown-rendered report                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Layer                                 │
├─────────────────────────────────────────────────────────────────┤
│  /api/agents          → Live agent status (existing)            │
│  /api/agents/reports  → List reports, filter, search            │
│  /api/agents/reports/[id] → Get single report                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     File-Based Storage                           │
├─────────────────────────────────────────────────────────────────┤
│  reports/                                                        │
│  └── agent-fleet/                                                │
│      └── YYYY-MM-DD/                                             │
│          ├── {agent-id}-{timestamp}.md                           │
│          └── index.json                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Key Decisions

1. **File-Based Storage**: Reports stored as Markdown files for human readability, with JSON indexes for fast queries
2. **Date-First Organization**: Daily folders enable easy archival and browsing
3. **Separation of Concerns**: Main dashboard shows live/recent activity; separate reports page for historical browsing
4. **Progressive Disclosure**: Overview → List → Full Report

---

## 2. Data Models & Schemas

### Report Markdown Format

```markdown
# Agent Report: {agent-name}

## Summary
| Field | Value |
|-------|-------|
| Agent ID | {id} |
| Task | {description} |
| Status | ✅ Success / ❌ Failed / ⚠️ Partial |
| Started | {ISO timestamp} |
| Completed | {ISO timestamp} |
| Duration | {Xm Ys} |
| Model | {model-name} |
| Tokens | {input} in / {output} out |

## Task Description
{Full task description}

## Results
{Detailed findings, output, or error messages}

## Lessons Learned
{Optional: Key insights for future runs}

---
*Report generated: {timestamp}*
```

### Index JSON Schema

```typescript
// reports/agent-fleet/YYYY-MM-DD/index.json
interface DailyIndex {
  date: string;                    // "2026-03-26"
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

interface ReportSummary {
  id: string;                      // filename without .md
  agentId: string;
  agentName: string;
  task: string;                    // truncated to 100 chars
  outcome: "success" | "failure" | "partial";
  startedAt: string;               // ISO timestamp
  completedAt: string;
  duration: string;                // "3m 12s"
  durationMs: number;
  tokens: {
    input: number;
    output: number;
  };
  model: string;
}
```

### API Response Types

```typescript
// GET /api/agents/reports?date=YYYY-MM-DD&agent=name&outcome=success&q=search
interface ReportsListResponse {
  ok: boolean;
  data?: {
    date: string;
    stats: {
      total: number;
      successful: number;
      failed: number;
      partial: number;
      tokens: { input: number; output: number };
    };
    reports: ReportSummary[];
    availableDates: string[];      // For date navigation
  };
  error?: string;
}

// GET /api/agents/reports/[id]
interface ReportDetailResponse {
  ok: boolean;
  data?: {
    id: string;
    content: string;               // Full markdown
    metadata: ReportSummary;
  };
  error?: string;
}
```

---

## 3. UI Design

### 3.1 Main Agents Page (`/agents`)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back to Mission Control              [Spawn Agent] [View Reports]│
├──────────────────────────────────────────────────────────────────┤
│  🤖 Agent Fleet                                                   │
│  Monitor and manage sub-agents                                    │
├──────────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                 │
│  │  Today  │ │ Success │ │ Running │ │ Tokens  │                 │
│  │    7    │ │   85%   │ │    1    │ │  45.2k  │                 │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                 │
├──────────────────────────────────────────────────────────────────┤
│  ACTIVE AGENTS                                          [Refresh] │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🔵 Market-Research-Agent                          Running   │  │
│  │    Analyzing competitor pricing...                          │  │
│  │    Started 2m ago • claude-sonnet-4 • [Steer] [Kill]       │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  RECENT COMPLETIONS                                               │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ ✅ Mission-Control-Auditor           19:48  •  5m 12s      │  │
│  │ ✅ Pricing-Research                  16:23  •  2m 41s      │  │
│  │ ✅ Demand-Research                   16:18  •  2m 55s      │  │
│  │ ✅ Competition-Research              16:15  •  3m 0s       │  │
│  │                              [View All Reports →]           │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 3.2 Reports Browser (`/agents/reports`)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back to Agent Fleet                                            │
├──────────────────────────────────────────────────────────────────┤
│  📋 Agent Reports                                                 │
│  Browse historical agent task reports                             │
├──────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ [◀ Prev] Mar 26, 2026 [Next ▶]    🔍 [Search reports...]    │ │
│  │                                                              │ │
│  │ Filter: [All Agents ▼] [All Outcomes ▼]                      │ │
│  └─────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│  TODAY: 4 runs • 4 success • 0 failed • 22.3k tokens             │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ ▶ Mission-Control-Auditor                                   │  │
│  │   ✅ Success • 19:48 • 5m 12s • 8.2k tokens                 │  │
│  │   "Comprehensive audit of Mission Control dashboard..."      │  │
│  │                                               [View Full →]  │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ ▶ Pricing-Research                                          │  │
│  │   ✅ Success • 16:23 • 2m 41s • 7.3k tokens                 │  │
│  │   "Research pricing strategies for tokenized gold..."       │  │
│  │                                               [View Full →]  │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 3.3 Full Report View (`/agents/reports/[id]`)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back to Reports                        [Previous] [Next]       │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🤖 Mission-Control-Auditor                    ✅ Success    │  │
│  │ ─────────────────────────────────────────────────────────  │  │
│  │ Started:  Mar 26, 2026 at 19:43 PST                        │  │
│  │ Completed: Mar 26, 2026 at 19:48 PST                       │  │
│  │ Duration: 5m 12s                                            │  │
│  │ Model: claude-sonnet-4-20250514                            │  │
│  │ Tokens: 3.4k in / 4.8k out                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  ## Task Description                                              │
│  Comprehensive audit of Mission Control dashboard...              │
│                                                                   │
│  ## Results                                                       │
│  The audit identified 12 areas for improvement...                 │
│                                                                   │
│  ## Lessons Learned                                               │
│  - Dashboard benefits from consistent card sizing                 │
│  - Navigation should remain visible at all times                  │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Implementation Plan

### Phase 1: Foundation (This PR)
1. ✅ Create design document
2. ✅ Set up reports directory structure
3. ✅ Create sample reports from today's runs
4. ✅ Update `/agents` page with enhanced design
5. ✅ Create `/agents/reports` browser page
6. ✅ Create `/agents/reports/[id]` viewer page
7. ✅ Add API routes for report data
8. ✅ Verify build passes

### Phase 2: Integration (Future)
- Hook report generation into actual agent completion flow
- Auto-capture from OpenClaw subagent results
- Add report export (PDF, JSON)
- Email/notification on completion

### Phase 3: Analytics (Future)
- Agent performance trends
- Token usage over time
- Success rate by agent type
- Cost tracking and budgets

---

## 5. File Structure

```
mission-control/
├── reports/
│   └── agent-fleet/
│       └── 2026-03-26/
│           ├── competition-research-1711490100.md
│           ├── demand-research-1711490280.md
│           ├── pricing-research-1711490580.md
│           ├── mission-control-auditor-1711503280.md
│           └── index.json
├── src/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── page.tsx                    # Enhanced main dashboard
│   │   │   └── reports/
│   │   │       ├── page.tsx                # Reports browser
│   │   │       └── [id]/
│   │   │           └── page.tsx            # Full report viewer
│   │   └── api/
│   │       └── agents/
│   │           ├── route.ts                # (existing)
│   │           └── reports/
│   │               ├── route.ts            # List reports API
│   │               └── [id]/
│   │                   └── route.ts        # Get single report
│   └── lib/
│       └── reports.ts                      # Report utilities
└── AGENT_FLEET_DESIGN.md                   # This document
```

---

## 6. Security Considerations

- Reports stored in project directory (not public)
- API routes require same-origin access (Next.js default)
- No sensitive data in report content (tasks are descriptive, not secrets)
- File paths sanitized to prevent directory traversal

---

## 7. Future Enhancements

1. **Real-time Updates**: WebSocket for live report streaming
2. **Search Index**: Full-text search across all reports
3. **Retention Policy**: Auto-archive reports older than 30 days
4. **Report Templates**: Different formats for different agent types
5. **Comparison View**: Side-by-side report comparison
6. **Export**: Bulk export to PDF/JSON/CSV
7. **Annotations**: Add notes to historical reports

---

*Document created by Agent-Fleet-Reviewer subagent on 2026-03-26*
