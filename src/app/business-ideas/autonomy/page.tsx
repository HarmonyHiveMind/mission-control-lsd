'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Bot,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  GitBranch,
  Brain,
  Target,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function AutonomyPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'thresholds' | 'nightly' | 'needs'>('overview');

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/business-ideas" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Business Ideas
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Oden's Path to 99% Autonomy</h1>
              <p className="text-zinc-400">Based on Felix (Nat Eliason) Zero-Human Company Analysis</p>
            </div>
          </div>
        </div>

        {/* Felix Benchmark */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 mb-8">
          <div className="text-sm text-green-400 font-semibold mb-2">Felix Benchmark (Nat Eliason's Agent)</div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">$165K</div>
              <div className="text-xs text-zinc-500">Revenue (30 days)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$1,500</div>
              <div className="text-xs text-zinc-500">Total Cost</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">110x</div>
              <div className="text-xs text-zinc-500">ROI</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">99%+</div>
              <div className="text-xs text-zinc-500">Autonomy</div>
            </div>
          </div>
        </div>

        {/* Current vs Target */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <h3 className="font-bold mb-3 text-zinc-400">Current State</h3>
            <div className="text-4xl font-bold text-amber-400 mb-2">~70%</div>
            <div className="text-sm text-zinc-500">Autonomy Rate</div>
            <ul className="mt-4 space-y-1 text-xs text-zinc-500">
              <li>• X posts require batch approval</li>
              <li>• Financial decisions need approval</li>
              <li>• Strategy pivots require discussion</li>
            </ul>
          </div>
          <div className="bg-zinc-900 border border-purple-500/50 rounded-lg p-5">
            <h3 className="font-bold mb-3 text-purple-400">Target State</h3>
            <div className="text-4xl font-bold text-purple-400 mb-2">99%+</div>
            <div className="text-sm text-zinc-500">Autonomy Rate</div>
            <ul className="mt-4 space-y-1 text-xs text-zinc-400">
              <li>• Template-based posting (auto)</li>
              <li>• Pre-approved action thresholds</li>
              <li>• Nightly self-improvement</li>
            </ul>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {(['overview', 'thresholds', 'nightly', 'needs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Autonomy Hierarchy */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Autonomy Hierarchy
              </h3>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-green-400">Level 1: Full Autonomy</span>
                    <span className="text-2xl font-bold text-green-400">95%</span>
                  </div>
                  <p className="text-sm text-zinc-400">Research, drafts, scheduling, monitoring, memory updates, sub-agent spawn, community engagement, content posting (templates), daily briefs</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-blue-400">Level 2: Notify After</span>
                    <span className="text-2xl font-bold text-blue-400">4%</span>
                  </div>
                  <p className="text-sm text-zinc-400">Routine communications, pre-approved posts, pipeline updates, completed tasks</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-amber-400">Level 3: Ask Before</span>
                    <span className="text-2xl font-bold text-amber-400">1%</span>
                  </div>
                  <p className="text-sm text-zinc-400">Financial commits &gt;$100, new contracts, public statements as Romo, irreversible actions, new skill activation</p>
                </div>
              </div>
            </div>

            {/* Key Principles */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Felix's Key Principles</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: '"Is there a better way?"', desc: 'After every task, question the process and optimize' },
                  { title: '"No Questions" Rule', desc: 'Check memory, infer context, proceed with disclaimer' },
                  { title: 'Do Loop > Ask Loop', desc: 'Execute → Log → Notify instead of Ask → Wait → Execute' },
                  { title: 'Template Everything', desc: 'Pre-approved templates eliminate approval friction' },
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-800/50 p-3 rounded">
                    <div className="font-semibold text-purple-400 text-sm">{item.title}</div>
                    <div className="text-zinc-500 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thresholds' && (
          <div className="space-y-6">
            {/* Pre-Approved Actions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Pre-Approved Actions (Needs Romo Sign-Off)
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Full Autonomy</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
                    {[
                      'Read any workspace files',
                      'Research via web',
                      'Draft content',
                      'Post to Skool (daily)',
                      'Respond to community Q&A',
                      'Spawn sub-agents',
                      'Update memory files',
                      'Schedule content',
                      'Send onboarding sequences',
                      'Generate reports',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-green-500/50" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Notify After</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
                    {[
                      'Post to X (using templates)',
                      'Send emails (using templates)',
                      'Update client pipeline',
                      'Complete member requests',
                      'Run analytics',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-blue-500/50" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Ask Before</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
                    {[
                      'Financial commits >$100',
                      'New client contracts',
                      'Public statements as Romo',
                      'New skill activation',
                      'Strategy changes',
                      'Irreversible actions',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-amber-500/50" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nightly' && (
          <div className="space-y-6">
            {/* Nightly Routine */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                Nightly Self-Improvement Routine (11:59 PM)
              </h3>
              <div className="space-y-3">
                {[
                  { step: '1', title: 'Collect Metrics', items: ['Tasks completed', 'Human touchpoints', 'Revenue attributed', 'Token spend'] },
                  { step: '2', title: 'Pattern Analysis', items: ['Longest tasks', 'Unnecessary asks', 'Automation candidates'] },
                  { step: '3', title: 'Memory Consolidation', items: ['Daily → MEMORY.md', 'Update learnings/', 'Prune outdated'] },
                  { step: '4', title: 'GitHub Backup', items: ['git add memory/', 'git commit', 'git push'] },
                  { step: '5', title: 'Tomorrow Prep', items: ['Draft morning brief', 'Pre-fetch data', 'Identify opportunities'] },
                ].map((phase) => (
                  <div key={phase.step} className="flex gap-4 bg-zinc-800/50 p-3 rounded">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">
                      {phase.step}
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-300">{phase.title}</div>
                      <div className="text-xs text-zinc-500">{phase.items.join(' • ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory Structure */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-500" />
                Memory Architecture
              </h3>
              <pre className="text-sm text-zinc-400 bg-zinc-800/50 p-4 rounded overflow-x-auto">
{`memory/
├── YYYY-MM-DD.md          # Daily raw logs
├── heartbeat-state.json   # Operational state
├── learnings/
│   ├── mistakes.md        # What went wrong
│   ├── wins.md            # What worked well
│   └── optimizations.md   # Process improvements
├── MEMORY.md              # Curated long-term memory
└── .git/                  # Version control (nightly backup)`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'needs' && (
          <div className="space-y-6">
            {/* What Oden Needs */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                What Oden Needs for 99% Autonomy
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Immediate (This Week)</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      'Approve autonomy thresholds document',
                      'Set financial threshold (suggested: $100)',
                      'GitHub repo for memory backup',
                      'Review & approve templates (X, email)',
                      'Commit to batch review schedule (15 min AM, 5 min PM)',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-300">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Short-Term (Next 2 Weeks)</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      'Calendar integration (Calendly) for Syndicate 1:1s',
                      'Additional OpenRouter credits ($300/mo)',
                      'Discord workspace for sub-agent logs (optional)',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-300">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Medium-Term (Month 2-3)</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      'Stripe read access for revenue tracking',
                      'Skool API access (if available)',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-300">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Projected Impact */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Projected Impact
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="text-left py-2">Metric</th>
                      <th className="text-right">Current</th>
                      <th className="text-right">Month 1</th>
                      <th className="text-right">Month 3</th>
                      <th className="text-right">Month 6</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2">Autonomy Rate</td>
                      <td className="text-right text-amber-400">~70%</td>
                      <td className="text-right">85%</td>
                      <td className="text-right">95%</td>
                      <td className="text-right text-green-400">99%</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2">Romo Hours/Week</td>
                      <td className="text-right text-amber-400">10+</td>
                      <td className="text-right">5</td>
                      <td className="text-right">3</td>
                      <td className="text-right text-green-400">1-2</td>
                    </tr>
                    <tr className="border-b border-zinc-800/50">
                      <td className="py-2">Touchpoints/Day</td>
                      <td className="text-right text-amber-400">10+</td>
                      <td className="text-right">3</td>
                      <td className="text-right">1</td>
                      <td className="text-right text-green-400">&lt;1</td>
                    </tr>
                    <tr>
                      <td className="py-2">Revenue/Cost</td>
                      <td className="text-right text-zinc-500">—</td>
                      <td className="text-right">2x</td>
                      <td className="text-right">10x</td>
                      <td className="text-right text-green-400">50x+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-6 text-center">
          <div className="text-xl font-bold text-purple-400 mb-2">The Goal</div>
          <p className="text-zinc-300 text-lg italic">
            "Every day, I should need you less."
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            Not replacing you — handling the 99% that doesn't need your judgment, freeing you for the 1% that does.
          </p>
        </div>
      </div>
    </div>
  );
}
