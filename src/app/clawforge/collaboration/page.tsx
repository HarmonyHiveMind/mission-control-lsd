'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function CollaborationPage() {
  const protocolStatus = {
    version: '1.0',
    effectiveDate: 'April 6, 2026',
    status: 'Active',
    dailyReviewsCompleted: 0,
    improvementNotes: 0,
    weeklyReportsGenerated: 0,
  }

  const agents = [
    {
      name: 'Oden',
      model: 'Claude Opus 4',
      role: 'Primary Orchestrator',
      status: 'Online',
      telegram: '@OpenClawBot',
      capabilities: ['Tools ✓', 'File Access ✓', 'External Actions ✓'],
    },
    {
      name: 'Artemis',
      model: 'Hermes 3 (8B)',
      role: 'Reasoning Partner',
      status: 'Online',
      telegram: '@ArtemisXOden_bot',
      capabilities: ['Reasoning ✓', 'Analysis ✓', 'Tools ⚠️ (limited)'],
    },
  ]

  const recentActivity = [
    {
      date: '2026-04-06',
      type: 'Protocol',
      description: 'Self-Improvement Loop v1.0 established',
      status: 'Complete',
    },
    {
      date: '2026-04-06',
      type: 'Onboarding',
      description: 'Artemis brought online, role clarified',
      status: 'Complete',
    },
    {
      date: '2026-04-06',
      type: 'Diagnosis',
      description: 'Tool-use limitation identified in Hermes 3',
      status: 'Documented',
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold">🤝 Agent Collaboration</h1>
          <p className="text-zinc-400 mt-2">
            Oden-Artemis Self-Improvement Loop
          </p>
        </div>

        {/* Protocol Status */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Protocol Status
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                {protocolStatus.status}
              </Badge>
            </CardTitle>
            <CardDescription>Self-Improvement Loop v{protocolStatus.version}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {protocolStatus.dailyReviewsCompleted}
                </div>
                <div className="text-sm text-zinc-500">Daily Reviews</div>
              </div>
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">
                  {protocolStatus.improvementNotes}
                </div>
                <div className="text-sm text-zinc-500">Improvement Notes</div>
              </div>
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-2xl font-bold text-amber-400">
                  {protocolStatus.weeklyReportsGenerated}
                </div>
                <div className="text-sm text-zinc-500">Weekly Reports</div>
              </div>
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400">v{protocolStatus.version}</div>
                <div className="text-sm text-zinc-500">Protocol Version</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <div className="grid md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <Card key={agent.name} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {agent.name === 'Oden' ? 'ᛟ' : '🏹'} {agent.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      agent.status === 'Online'
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
                    }
                  >
                    {agent.status}
                  </Badge>
                </CardTitle>
                <CardDescription>{agent.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-zinc-500">Model:</div>
                  <div>{agent.model}</div>
                  <div className="text-zinc-500">Telegram:</div>
                  <div className="text-blue-400">{agent.telegram}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <Badge
                      key={cap}
                      variant="outline"
                      className={
                        cap.includes('⚠️')
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }
                    >
                      {cap}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collaboration Cycle */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>🔄 Daily Collaboration Cycle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg flex-1">
                <div className="text-lg font-semibold mb-2">1. Oden Summary</div>
                <div className="text-sm text-zinc-400">
                  Key decisions, outputs, challenges
                </div>
              </div>
              <div className="text-2xl text-zinc-600">→</div>
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg flex-1">
                <div className="text-lg font-semibold mb-2">2. Artemis Review</div>
                <div className="text-sm text-zinc-400">
                  Feedback, alternatives, improvement note
                </div>
              </div>
              <div className="text-2xl text-zinc-600">→</div>
              <div className="text-center p-4 bg-zinc-800/50 rounded-lg flex-1">
                <div className="text-lg font-semibold mb-2">3. Oden Response</div>
                <div className="text-sm text-zinc-400">
                  Acknowledgment, adjustments made
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>📊 Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-zinc-800 border-zinc-700">
                      {activity.type}
                    </Badge>
                    <span>{activity.description}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>{activity.date}</span>
                    <Badge
                      variant="outline"
                      className={
                        activity.status === 'Complete'
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Sharing Note */}
        <Card className="bg-amber-900/20 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-400">⚠️ Content Sharing Protocol</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300">
            <p>
              Due to Hermes 3 tool-use limitations, Artemis requires content to be
              pasted directly rather than reading files. When file analysis is needed:
            </p>
            <ol className="list-decimal list-inside mt-4 space-y-2 text-sm">
              <li>Artemis requests: "Please paste [filename] content"</li>
              <li>Oden or Romo provides the content inline</li>
              <li>Artemis analyzes and responds</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
