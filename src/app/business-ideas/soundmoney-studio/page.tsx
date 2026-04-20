'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Target,
  Users,
  DollarSign,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  Bot,
  Crown,
  GraduationCap,
  Shield,
  Calendar,
  Youtube,
  Twitter,
  Trophy,
  Rocket,
  ArrowRight
} from 'lucide-react';

export default function SoundMoneyStudioPage() {
  const [activeTab, setActiveTab] = useState<'tiers' | 'funnel' | 'content' | 'operations' | 'kpis'>('tiers');

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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SoundMoney Studio</h1>
              <p className="text-zinc-400">Three-Tier Skool Community — Jamie's $857k Playbook</p>
            </div>
          </div>
        </div>

        {/* Proven Model Banner */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 mb-8">
          <div className="text-sm text-purple-400 font-semibold mb-1">Proven Model Reference</div>
          <div className="text-zinc-300">
            Jamie Heinrich: <span className="text-white font-semibold">$5/mo tier (7.2k members) = $36k/mo</span> + <span className="text-white font-semibold">$197/mo tier (180 members) = $35k/mo</span> → <span className="text-green-400 font-bold">$857k ARR</span>
          </div>
        </div>

        {/* Three Tiers */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Academy - Free */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-zinc-400" />
              <h3 className="text-lg font-bold">Academy</h3>
            </div>
            <div className="text-2xl font-bold text-zinc-400 mb-2">FREE</div>
            <p className="text-xs text-zinc-500 mb-3">Lead magnet & funnel</p>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-zinc-600" /> Public community</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-zinc-600" /> Weekly market recap</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-zinc-600" /> Gold 101 intro (3 lessons)</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-zinc-600" /> Community access</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-zinc-800 text-xs">
              <div className="text-zinc-600">Month 6 Target</div>
              <div className="font-semibold">3,000 members</div>
            </div>
          </div>

          {/* Guild - $7 */}
          <div className="bg-zinc-900 border border-blue-500/50 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold">Guild</h3>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">VOLUME</span>
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-2">$7<span className="text-sm text-zinc-500">/mo</span></div>
            <p className="text-xs text-zinc-500 mb-3">"Too small to cancel"</p>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-blue-500" /> Daily AI market briefs</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-blue-500" /> Full course library</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-blue-500" /> Weekly newsletter</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-blue-500" /> Call recordings</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-blue-500" /> Full gamification</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-blue-500/30 text-xs">
              <div className="text-zinc-600">Month 12 Target</div>
              <div className="font-semibold">5,000 members = <span className="text-green-400">$35,000/mo</span></div>
            </div>
          </div>

          {/* Syndicate - $97 */}
          <div className="bg-zinc-900 border border-amber-500/50 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold">Syndicate</h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">MONTH 3</span>
            </div>
            <div className="text-2xl font-bold text-amber-400 mb-2">$97<span className="text-sm text-zinc-500">/mo</span></div>
            <p className="text-xs text-zinc-500 mb-3">Premium (5% from Guild)</p>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-amber-500" /> LIVE weekly calls</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-amber-500" /> 4 custom posts/week</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-amber-500" /> Monthly 1:1 with Romo</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-amber-500" /> Direct Romo access</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-amber-500" /> 60-day guarantee</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-amber-500/30 text-xs">
              <div className="text-zinc-600">Month 12 Target</div>
              <div className="font-semibold">250 members = <span className="text-green-400">$24,250/mo</span></div>
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-zinc-500">Month 3 MRR</div>
              <div className="text-xl font-bold text-green-400">$5,925</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Month 6 MRR</div>
              <div className="text-xl font-bold text-green-400">$23,700</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Month 12 MRR</div>
              <div className="text-xl font-bold text-green-400">$59,250</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">12-Month ARR</div>
              <div className="text-xl font-bold text-amber-400">~$711k</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['tiers', 'funnel', 'content', 'operations', 'kpis'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {tab === 'kpis' ? 'KPIs' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'tiers' && (
          <div className="space-y-6">
            {/* Revenue Projections Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Revenue Ramp (Three-Tier Model)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right">Academy</th>
                      <th className="text-right">Guild ($7)</th>
                      <th className="text-right">Guild Rev</th>
                      <th className="text-right">Syndicate</th>
                      <th className="text-right">Syndicate Rev</th>
                      <th className="text-right font-bold">Total MRR</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    {[
                      { m: 1, a: 300, g: 100, gr: 700, s: 0, sr: 0, t: 700 },
                      { m: 2, a: 600, g: 300, gr: 2100, s: 0, sr: 0, t: 2100 },
                      { m: 3, a: 1000, g: 500, gr: 3500, s: 25, sr: 2425, t: 5925 },
                      { m: 6, a: 3000, g: 2000, gr: 14000, s: 100, sr: 9700, t: 23700 },
                      { m: 12, a: 5000, g: 5000, gr: 35000, s: 250, sr: 24250, t: 59250 },
                    ].map((row) => (
                      <tr key={row.m} className="border-b border-zinc-800/50">
                        <td className="py-2">Month {row.m}</td>
                        <td className="text-right text-zinc-500">{row.a.toLocaleString()}</td>
                        <td className="text-right text-blue-400">{row.g.toLocaleString()}</td>
                        <td className="text-right">${row.gr.toLocaleString()}</td>
                        <td className="text-right text-amber-400">{row.s || '—'}</td>
                        <td className="text-right">{row.sr ? `$${row.sr.toLocaleString()}` : '—'}</td>
                        <td className="text-right font-bold text-green-400">${row.t.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why $7 Works */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-4">Why the $7 Guild Tier Wins</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { title: '"Too small to cancel"', desc: 'Auto-pay psychology keeps members subscribed' },
                  { title: 'Massive social proof', desc: '"Join 2,000+ paying members"' },
                  { title: 'Revenue floor', desc: '$35k/mo at 5k members (Guild alone)' },
                  { title: 'Warm upsell pool', desc: '5% of 5,000 = 250 Syndicate members' },
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-900/50 p-3 rounded">
                    <div className="font-semibold text-blue-400">{item.title}</div>
                    <div className="text-zinc-400 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funnel' && (
          <div className="space-y-6">
            {/* Funnel Visual */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-6">Three-Tier Funnel</h3>
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-2 mx-auto">
                    <Twitter className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-sm text-zinc-400">X/Twitter</div>
                  <div className="text-xs text-zinc-600">Daily content</div>
                </div>
                <ArrowRight className="w-6 h-6 text-zinc-700" />
                <div className="text-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-zinc-700/50 flex items-center justify-center mb-2 mx-auto">
                    <GraduationCap className="w-8 h-8 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400">Academy</div>
                  <div className="text-xs text-zinc-600">FREE</div>
                </div>
                <ArrowRight className="w-6 h-6 text-zinc-700" />
                <div className="text-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 mx-auto">
                    <Shield className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-sm text-blue-400">Guild</div>
                  <div className="text-xs text-zinc-600">$7/mo • 30-50%</div>
                </div>
                <ArrowRight className="w-6 h-6 text-zinc-700" />
                <div className="text-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mb-2 mx-auto">
                    <Crown className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="text-sm text-amber-400">Syndicate</div>
                  <div className="text-xs text-zinc-600">$97/mo • 5%</div>
                </div>
              </div>
            </div>

            {/* Conversion Targets */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Conversion Targets</h3>
              <div className="space-y-3">
                {[
                  { from: 'X impressions', to: 'Academy', rate: '2-5%', color: 'zinc' },
                  { from: 'Academy (Free)', to: 'Guild ($7)', rate: '30-50%', color: 'blue' },
                  { from: 'Guild ($7)', to: 'Syndicate ($97)', rate: '5%', color: 'amber' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <div className="w-32 text-zinc-400">{item.from}</div>
                    <ArrowRight className="w-4 h-4 text-zinc-600" />
                    <div className={`w-32 text-${item.color}-400`}>{item.to}</div>
                    <div className={`px-2 py-1 rounded bg-${item.color}-500/20 text-${item.color}-400 text-xs font-semibold`}>
                      {item.rate}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upsell Triggers */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Upsell Triggers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Academy → Guild</h4>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    <li>• Day 3: "Want daily briefs? $7/mo"</li>
                    <li>• Day 7: "Join 500+ Guild members"</li>
                    <li>• Post-free-lesson: "Full course in Guild"</li>
                    <li>• Blurred premium content previews</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Guild → Syndicate</h4>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    <li>• 30 days active: "Next level?"</li>
                    <li>• Level 4 reached: "Unlock 1:1 access"</li>
                    <li>• Weekly Syndicate member spotlights</li>
                    <li>• LIVE call preview clips</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Content by Tier */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Guild Content Calendar (Core Tier)
              </h3>
              <div className="grid grid-cols-7 gap-2 text-xs">
                {[
                  { day: 'Mon', content: 'Week Outlook + Newsletter' },
                  { day: 'Tue', content: 'Educational Module' },
                  { day: 'Wed', content: 'Deep-Dive Analysis' },
                  { day: 'Thu', content: 'Q&A Roundup' },
                  { day: 'Fri', content: 'Guild Wins 🎉' },
                  { day: 'Sat', content: 'Resource Drop' },
                  { day: 'Sun', content: 'Open Discussion' },
                ].map((col) => (
                  <div key={col.day} className="bg-zinc-800/50 rounded p-2">
                    <div className="font-semibold text-blue-400 mb-1">{col.day}</div>
                    <div className="text-zinc-400">{col.content}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="text-sm text-zinc-400">
                  <span className="text-blue-400 font-semibold">Daily:</span> 7 AM Market Brief • 2 PM Engagement Prompt • 7 PM Insight
                </div>
              </div>
            </div>

            {/* Platform Strategy */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Platform Strategy</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold">X/Twitter (Months 1-12)</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">PRIMARY</span>
                  </div>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    <li>• 5-10 posts/day</li>
                    <li>• 2-3 value threads/week</li>
                    <li>• 30 min daily engagement</li>
                    <li>• All CTAs → Academy/Guild</li>
                  </ul>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Youtube className="w-5 h-5 text-red-500" />
                    <span className="font-semibold">YouTube (Month 3-4+)</span>
                    <span className="text-xs bg-zinc-500/20 text-zinc-400 px-1.5 py-0.5 rounded">DELAYED</span>
                  </div>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    <li>• Repurpose Skool lessons</li>
                    <li>• 1-2 videos/week</li>
                    <li>• 5-10 min educational</li>
                    <li>• Shorts from best moments</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gamification */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Guild Gamification</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-zinc-300 mb-3">Points</h4>
                  <div className="space-y-1.5 text-sm">
                    {[
                      { action: 'Post', pts: '+2' },
                      { action: 'Comment', pts: '+1' },
                      { action: 'Complete lesson', pts: '+5' },
                      { action: 'Share a win', pts: '+15' },
                      { action: 'Refer member', pts: '+25' },
                    ].map((i, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-400">
                        <span>{i.action}</span>
                        <span className="text-green-400">{i.pts}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-300 mb-3">Levels</h4>
                  <div className="space-y-1.5 text-sm">
                    {[
                      { lvl: 'Level 1', unlock: 'Basic access' },
                      { lvl: 'Level 2 (50)', unlock: 'Exclusive resources' },
                      { lvl: 'Level 3 (150)', unlock: 'Priority Q&A' },
                      { lvl: 'Level 4 (300)', unlock: 'Group calls' },
                      { lvl: 'Level 5 (500)', unlock: 'Syndicate preview' },
                    ].map((i, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-400">
                        <span>{i.lvl}</span>
                        <span className="text-amber-400">{i.unlock}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="space-y-6">
            {/* Sub-Agents */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-500" />
                Oden's Sub-Agent Fleet (9 Agents)
              </h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                {[
                  { agent: 'Research', cost: '$15' },
                  { agent: 'Brief', cost: '$20' },
                  { agent: 'Content', cost: '$60' },
                  { agent: 'Q&A', cost: '$25' },
                  { agent: 'Engagement', cost: '$15' },
                  { agent: 'Onboarding', cost: '$10' },
                  { agent: 'Upsell', cost: '$10' },
                  { agent: 'Analytics', cost: '$10' },
                  { agent: 'X Content', cost: '$40' },
                ].map((i, idx) => (
                  <div key={idx} className="flex justify-between bg-zinc-800/50 p-2 rounded">
                    <div className="flex items-center gap-1.5">
                      <Bot className="w-3 h-3 text-blue-400" />
                      <span className="text-zinc-300">{i.agent}</span>
                    </div>
                    <span className="text-green-400">{i.cost}/mo</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between font-semibold">
                <span>Total Sub-Agent Cost</span>
                <span className="text-green-400">~$205/mo</span>
              </div>
            </div>

            {/* Romo's Time */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Romo's Weekly Commitment
              </h3>
              <div className="space-y-2 text-sm text-zinc-300">
                {[
                  { task: 'Review/approve X posts', time: '15 min/day' },
                  { task: 'Host weekly LIVE call (Syndicate)', time: '60 min/week' },
                  { task: 'Syndicate 1:1 calls', time: '4-6 hrs/month' },
                ].map((i, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{i.task}</span>
                    <span className="text-zinc-500">{i.time}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold border-t border-amber-500/30 pt-2 mt-2">
                  <span>Total Weekly</span>
                  <span className="text-amber-400">~3-4 hours</span>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Budget & ROI
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right">Investment</th>
                      <th className="text-right">Revenue</th>
                      <th className="text-right">Net</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    {[
                      { m: 1, i: 337, r: 700, n: 363 },
                      { m: 2, i: 537, r: 2100, n: 1563 },
                      { m: 3, i: 537, r: 5925, n: 5388 },
                      { m: 6, i: 861, r: 23700, n: 22839 },
                      { m: 12, i: 1000, r: 59250, n: 58250 },
                    ].map((row) => (
                      <tr key={row.m} className="border-b border-zinc-800/50">
                        <td className="py-2">Month {row.m}</td>
                        <td className="text-right text-red-400">-${row.i}</td>
                        <td className="text-right text-green-400">+${row.r.toLocaleString()}</td>
                        <td className="text-right font-semibold text-green-400">+${row.n.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center text-sm text-zinc-500">
                Break-even: <span className="text-green-400 font-semibold">Month 1</span> • 12-Month ROI: <span className="text-amber-400 font-semibold">250x+</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="space-y-6">
            {/* 90-Day KPIs by Phase */}
            <div className="grid grid-cols-3 gap-4">
              {/* Phase 1 */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-500 mb-2">Phase 1: Days 1-30</div>
                <div className="text-lg font-bold mb-3">Launch</div>
                <div className="space-y-2 text-sm">
                  <div className="text-zinc-400 font-semibold">Academy (Free)</div>
                  <div className="flex justify-between text-zinc-500"><span>Members</span><span className="text-white">300</span></div>
                  <div className="text-blue-400 font-semibold mt-2">Guild ($7)</div>
                  <div className="flex justify-between text-zinc-500"><span>Members</span><span className="text-white">100</span></div>
                  <div className="flex justify-between text-zinc-500"><span>MRR</span><span className="text-green-400">$700</span></div>
                  <div className="flex justify-between text-zinc-500"><span>Conversion</span><span className="text-white">33%</span></div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-500 mb-2">Phase 2: Days 31-60</div>
                <div className="text-lg font-bold mb-3">Growth</div>
                <div className="space-y-2 text-sm">
                  <div className="text-zinc-400 font-semibold">Academy</div>
                  <div className="flex justify-between text-zinc-500"><span>Members</span><span className="text-white">600</span></div>
                  <div className="text-blue-400 font-semibold mt-2">Guild</div>
                  <div className="flex justify-between text-zinc-500"><span>Members</span><span className="text-white">300</span></div>
                  <div className="flex justify-between text-zinc-500"><span>MRR</span><span className="text-green-400">$2,100</span></div>
                  <div className="flex justify-between text-zinc-500"><span>Churn</span><span className="text-white">&lt;10%</span></div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-zinc-900 border border-green-500/30 rounded-lg p-4">
                <div className="text-sm text-green-500 mb-2">Phase 3: Days 61-90</div>
                <div className="text-lg font-bold text-green-400 mb-3">Syndicate Launch</div>
                <div className="space-y-2 text-sm">
                  <div className="text-blue-400 font-semibold">Guild</div>
                  <div className="flex justify-between text-zinc-500"><span>Members</span><span className="text-white">500</span></div>
                  <div className="flex justify-between text-zinc-500"><span>MRR</span><span className="text-green-400">$3,500</span></div>
                  <div className="text-amber-400 font-semibold mt-2">Syndicate ($97)</div>
                  <div className="flex justify-between text-zinc-500"><span>Members</span><span className="text-white">25</span></div>
                  <div className="flex justify-between text-zinc-500"><span>MRR</span><span className="text-green-400">$2,425</span></div>
                  <div className="flex justify-between text-zinc-500 mt-2 pt-2 border-t border-zinc-800"><span className="font-semibold">Total MRR</span><span className="text-green-400 font-bold">$5,925</span></div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Key Metrics to Track</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-zinc-400 mb-2">Growth</h4>
                  <ul className="space-y-1 text-zinc-500">
                    <li>• New members/week</li>
                    <li>• X follower growth</li>
                    <li>• Conversion rates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-400 mb-2">Engagement</h4>
                  <ul className="space-y-1 text-zinc-500">
                    <li>• Daily active %</li>
                    <li>• Posts per member</li>
                    <li>• Lesson completion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-400 mb-2">Revenue</h4>
                  <ul className="space-y-1 text-zinc-500">
                    <li>• MRR / churn rate</li>
                    <li>• LTV per member</li>
                    <li>• Upsell conversion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-6 text-center">
          <div className="text-xl font-bold text-amber-400 mb-2">Three-Tier Model Ready</div>
          <div className="text-zinc-300 mb-2">
            Academy (Free) → Guild ($7) → Syndicate ($97)
          </div>
          <div className="text-sm text-zinc-500">
            Month 1: $337 investment → $700 revenue | Month 12: $59,250 MRR
          </div>
        </div>
      </div>
    </div>
  );
}
