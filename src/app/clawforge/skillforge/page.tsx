'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Home,
  Store,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Package,
  Zap,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Layers,
  Clock,
  Shield,
  Star
} from 'lucide-react';

export default function SkillForgeAnalysisPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['executive', 'priority', 'pricing']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span className="text-sm">Home</span>
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/clawforge" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Store className="w-5 h-5 text-orange-500" />
                  SkillForge Marketplace Analysis
                </h1>
                <p className="text-sm text-gray-400">Research compiled March 26, 2026</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
              Pending Review
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Executive Summary */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('executive')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Executive Summary</h2>
            </div>
            {expandedSections.includes('executive') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          {expandedSections.includes('executive') && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <p className="text-orange-200 font-medium">
                  The AI agent skills marketplace is primed for disruption. Current offerings are fragmented, 
                  low-quality, and lack monetization infrastructure. ClawForgeStudio can capture significant 
                  market share with a premium, curated marketplace.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">10,500+</div>
                  <div className="text-sm text-gray-400">MCP servers on GitHub</div>
                  <div className="text-xs text-gray-500 mt-1">Most are free, abandoned, undocumented</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400">12-18mo</div>
                  <div className="text-sm text-gray-400">Window before major players enter</div>
                  <div className="text-xs text-gray-500 mt-1">First-mover advantage critical</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-400">$0</div>
                  <div className="text-sm text-gray-400">Current individual skill pricing</div>
                  <div className="text-xs text-gray-500 mt-1">Gap: No marketplace for $5-50 paid skills</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Key Strategic Insight
                </h4>
                <p className="text-gray-300">
                  Users want AI that <span className="text-orange-400 font-medium">actually does things</span>, 
                  not dashboards or suggestions. "Truly handles my inbox" beats "helps organize my inbox" every time.
                  Position skills as autonomous workers, not tools.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Skill Priority Rankings */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('priority')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold">Skill Priority Rankings</h2>
            </div>
            {expandedSections.includes('priority') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          {expandedSections.includes('priority') && (
            <div className="px-6 pb-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                    <th className="pb-3 pr-4">Rank</th>
                    <th className="pb-3 pr-4">Skill</th>
                    <th className="pb-3 pr-4">Demand</th>
                    <th className="pb-3 pr-4">Competition</th>
                    <th className="pb-3">Key Insight</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4"><span className="text-2xl">🥇</span></td>
                    <td className="py-3 pr-4 font-medium">Email Triage Agent</td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">9/10</span></td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">Medium</span></td>
                    <td className="py-3 text-gray-400">Universal pain, $25-33/mo proven (Superhuman)</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4"><span className="text-2xl">🥈</span></td>
                    <td className="py-3 pr-4 font-medium">Customer Support Bot</td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">9/10</span></td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">High</span></td>
                    <td className="py-3 text-gray-400">$10B+ market, outcome-based pricing validated</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4"><span className="text-2xl">🥉</span></td>
                    <td className="py-3 pr-4 font-medium">Calendar + Reminders</td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">8/10</span></td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">Medium</span></td>
                    <td className="py-3 text-gray-400">High frequency, Reclaim.ai proves demand</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4"><span className="text-gray-400">4</span></td>
                    <td className="py-3 pr-4 font-medium">Daily Research Digest</td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">7/10</span></td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">Low</span></td>
                    <td className="py-3 text-gray-400">Artifact shutdown left market gap</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4"><span className="text-gray-400">5</span></td>
                    <td className="py-3 pr-4 font-medium">X/Twitter Monitor</td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">7/10</span></td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">High</span></td>
                    <td className="py-3 text-gray-400">Strong niche but crowded market</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4"><span className="text-gray-400">6</span></td>
                    <td className="py-3 pr-4 font-medium">PDF/Document Processor</td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded">6/10</span></td>
                    <td className="py-3 pr-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">High</span></td>
                    <td className="py-3 text-gray-400">Commoditized, free tools compete</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Recommendation: Build First</h4>
                <p className="text-gray-300 text-sm">
                  Start with <strong>Email Triage Agent</strong> and <strong>Customer Support Bot</strong>. 
                  Both have highest demand scores, proven willingness to pay, and clear differentiation opportunities. 
                  Calendar + Reminders is natural second phase (synergizes with Email).
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Pricing Strategy */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('pricing')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold">Recommended Pricing Structure</h2>
            </div>
            {expandedSections.includes('pricing') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          {expandedSections.includes('pricing') && (
            <div className="px-6 pb-6 space-y-6">
              {/* Individual Skills */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  Individual Skills
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Entry</div>
                    <div className="text-2xl font-bold">$97</div>
                    <div className="text-xs text-gray-500 mt-2">Single-purpose, common use case</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-blue-500/50">
                    <div className="text-sm text-blue-400 mb-1">Standard ⭐</div>
                    <div className="text-2xl font-bold">$147</div>
                    <div className="text-xs text-gray-500 mt-2">Multi-feature, business workflow</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Premium</div>
                    <div className="text-2xl font-bold">$247</div>
                    <div className="text-xs text-gray-500 mt-2">Complex, high-value automation</div>
                  </div>
                </div>
              </div>

              {/* Bundles */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Skill Bundles
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Starter (5 skills)</div>
                    <div className="text-2xl font-bold">$397</div>
                    <div className="text-xs text-green-400 mt-2">~20% savings</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/50">
                    <div className="text-sm text-purple-400 mb-1">Professional (12 skills) ⭐</div>
                    <div className="text-2xl font-bold">$697</div>
                    <div className="text-xs text-green-400 mt-2">~40% savings</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Complete (20+ skills)</div>
                    <div className="text-2xl font-bold">$997</div>
                    <div className="text-xs text-green-400 mt-2">~50% savings</div>
                  </div>
                </div>
              </div>

              {/* Full Agent + Pro */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg p-5 border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <h3 className="font-semibold">Full Agent Package</h3>
                  </div>
                  <div className="text-3xl font-bold mb-1">$1,497 - $1,997</div>
                  <div className="text-sm text-gray-400">Complete custom agent + all skills + support</div>
                  <div className="text-xs text-orange-400 mt-2">Launch: $1,497 → Standard: $1,997</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg p-5 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold">SkillForge Pro</h3>
                  </div>
                  <div className="text-3xl font-bold mb-1">$149/mo</div>
                  <div className="text-sm text-gray-400">All skills + new releases + priority support</div>
                  <div className="text-xs text-green-400 mt-2">Annual: $1,190/yr (33% off)</div>
                </div>
              </div>

              {/* Pricing Psychology Note */}
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Pricing Psychology Notes
                </h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• <strong>Charm pricing ($X.97)</strong> for individual skills triggers impulse buys</li>
                  <li>• <strong>30-day money-back guarantee</strong> increases conversions 15-30% with {"<"}5% refund rate</li>
                  <li>• <strong>Launch with "Founding Member" pricing</strong> (20% off) to build momentum</li>
                  <li>• <strong>Price against the alternative</strong>: 10 hrs saved × $100/hr = $1,000 value → $247 is a steal</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Competition Landscape */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('competition')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Competition Landscape</h2>
            </div>
            {expandedSections.includes('competition') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          {expandedSections.includes('competition') && (
            <div className="px-6 pb-6 space-y-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="pb-3 pr-4">Platform</th>
                    <th className="pb-3 pr-4">Skills</th>
                    <th className="pb-3 pr-4">Pricing</th>
                    <th className="pb-3">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4 font-medium">LobeHub</td>
                    <td className="py-3 pr-4">50+</td>
                    <td className="py-3 pr-4 text-green-400">Free</td>
                    <td className="py-3 text-gray-400">No monetization</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4 font-medium">MCP Ecosystem</td>
                    <td className="py-3 pr-4">10,500+</td>
                    <td className="py-3 pr-4 text-green-400">Free</td>
                    <td className="py-3 text-gray-400">No curation, quality issues</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4 font-medium">Block/Goose</td>
                    <td className="py-3 pr-4">Quality-focused</td>
                    <td className="py-3 pr-4 text-green-400">Free</td>
                    <td className="py-3 text-gray-400">Limited selection</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-3 pr-4 font-medium">Turbo MCP</td>
                    <td className="py-3 pr-4">Enterprise</td>
                    <td className="py-3 pr-4 text-yellow-400">$500-5K/mo</td>
                    <td className="py-3 text-gray-400">Enterprise only</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Gumroad/Lemon</td>
                    <td className="py-3 pr-4">Minimal</td>
                    <td className="py-3 pr-4 text-gray-400">—</td>
                    <td className="py-3 text-green-400 font-medium">🎯 Opportunity!</td>
                  </tr>
                </tbody>
              </table>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Competitive Risks</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• OpenAI/Anthropic launching official marketplace</li>
                    <li>• GitHub adding marketplace features</li>
                    <li>• Quality control at scale</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Our Moats</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Production-ready, documented, supported</li>
                    <li>• Business-oriented (not dev tools)</li>
                    <li>• SMB-friendly pricing</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Go-to-Market Strategy */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button 
            onClick={() => toggleSection('gtm')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Go-to-Market Strategy</h2>
            </div>
            {expandedSections.includes('gtm') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          
          {expandedSections.includes('gtm') && (
            <div className="px-6 pb-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <h4 className="font-semibold">Phase 1: Soft Launch</h4>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">Week 1-2</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Waitlist only</li>
                    <li>• 20% "Founding Member" discount</li>
                    <li>• Gather testimonials</li>
                    <li>• Fix onboarding issues</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <h4 className="font-semibold">Phase 2: Public Launch</h4>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">Week 3-4</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Full marketing push</li>
                    <li>• 10% launch discount (limited)</li>
                    <li>• Product Hunt / HN / IndieHackers</li>
                    <li>• Newsletter outreach</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <h4 className="font-semibold">Phase 3: Stabilize</h4>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">Week 5-8</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Standard pricing</li>
                    <li>• Content marketing</li>
                    <li>• SEO foundation</li>
                    <li>• Affiliate program</li>
                  </ul>
                </div>
              </div>

              {/* Launch Pricing Table */}
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <h4 className="font-semibold mb-3">Launch Pricing Progression</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-2 pr-4">Phase</th>
                      <th className="pb-2 pr-4">Entry Skill</th>
                      <th className="pb-2 pr-4">Starter Bundle</th>
                      <th className="pb-2">Pro Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 pr-4 text-yellow-400">Founding (Wk 1-2)</td>
                      <td className="py-2 pr-4">$77</td>
                      <td className="py-2 pr-4">$317</td>
                      <td className="py-2">$99/mo</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 pr-4 text-orange-400">Launch (Wk 3-4)</td>
                      <td className="py-2 pr-4">$87</td>
                      <td className="py-2 pr-4">$357</td>
                      <td className="py-2">$129/mo</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-green-400">Standard (Wk 5+)</td>
                      <td className="py-2 pr-4">$97</td>
                      <td className="py-2 pr-4">$397</td>
                      <td className="py-2">$149/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Action Items */}
        <section className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl border border-orange-500/30 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-orange-400" />
            Recommended Next Steps
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-orange-300 mb-2">Immediate (This Week)</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">1.</span>
                  <span>Review and approve this analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">2.</span>
                  <span>Update landing page with SkillForge Marketplace section</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">3.</span>
                  <span>Set up payment processing (Stripe/LemonSqueezy)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-orange-300 mb-2">Next 2 Weeks</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">4.</span>
                  <span>Build Email Triage Agent skill (MVP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">5.</span>
                  <span>Build Customer Support Bot skill (MVP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">6.</span>
                  <span>Soft launch to waitlist at Founding pricing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Research Sources */}
        <section className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Research Sources</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-500">
            <div>
              <div className="font-medium text-gray-400 mb-1">Competition Analysis</div>
              <p>GitHub topics, LobeHub, MCP Registry, Gumroad, AppSumo</p>
            </div>
            <div>
              <div className="font-medium text-gray-400 mb-1">Demand Signals</div>
              <p>Superhuman, Shortwave, Intercom, Reclaim.ai, Buffer pricing</p>
            </div>
            <div>
              <div className="font-medium text-gray-400 mb-1">Pricing Strategy</div>
              <p>Stripe Atlas, Price Intelligently, SaaS pricing research</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
