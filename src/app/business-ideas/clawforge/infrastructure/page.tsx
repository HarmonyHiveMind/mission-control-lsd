'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  CreditCard,
  Mail,
  Wallet,
  Shield,
  CheckCircle,
  Circle,
  AlertTriangle,
  DollarSign,
  Lock,
  Zap,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface CardConfig {
  name: string;
  merchant: string;
  limit: number;
  purpose: string;
}

const proposedCards: CardConfig[] = [
  { name: 'oden-domains', merchant: 'Porkbun/Namecheap', limit: 100, purpose: 'Domain registrations' },
  { name: 'oden-hosting', merchant: 'Vercel/Netlify', limit: 50, purpose: 'Hosting services' },
  { name: 'oden-anthropic', merchant: 'Anthropic', limit: 300, purpose: 'Claude API credits' },
  { name: 'oden-openai', merchant: 'OpenAI', limit: 200, purpose: 'GPT API credits' },
  { name: 'oden-openrouter', merchant: 'OpenRouter', limit: 300, purpose: 'Multi-model routing' },
  { name: 'oden-saas', merchant: 'Various', limit: 200, purpose: 'SaaS tools' },
  { name: 'oden-marketing', merchant: 'Meta/X/LinkedIn', limit: 300, purpose: 'Ad spend' },
];

export default function InfrastructurePage() {
  const [expandedSection, setExpandedSection] = useState<string>('cards');
  
  const totalLimit = proposedCards.reduce((acc, c) => acc + c.limit, 0);
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/business-ideas/clawforge" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ClawForge
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Oden Payment Infrastructure</h1>
          <p className="text-zinc-400">Secure payment and identity systems for autonomous operations</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-green-500/30 rounded-lg p-4 text-center">
            <CreditCard className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-400">Privacy.com</div>
            <div className="text-xs text-zinc-500">Virtual Cards</div>
            <div className="text-sm text-zinc-400 mt-1">$5/mo</div>
          </div>
          <div className="bg-zinc-900 border border-blue-500/30 rounded-lg p-4 text-center">
            <Mail className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-400">Google Workspace</div>
            <div className="text-xs text-zinc-500">Professional Email</div>
            <div className="text-sm text-zinc-400 mt-1">$6/mo</div>
          </div>
          <div className="bg-zinc-900 border border-purple-500/30 rounded-lg p-4 text-center">
            <Wallet className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-400">Gnosis Safe</div>
            <div className="text-xs text-zinc-500">Crypto (Phase 2)</div>
            <div className="text-sm text-zinc-400 mt-1">~$20 setup</div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-green-400 font-semibold">Total Monthly Cost</div>
              <div className="text-xs text-zinc-500">Payment + Email infrastructure</div>
            </div>
            <div className="text-3xl font-bold text-green-400">$11/mo</div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-500/20 flex justify-between text-sm">
            <span className="text-zinc-400">Initial Setup (one-time)</span>
            <span className="text-zinc-300">~$520-720</span>
          </div>
        </div>

        {/* Virtual Cards Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg mb-6 overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors flex items-center justify-between"
            onClick={() => setExpandedSection(expandedSection === 'cards' ? '' : 'cards')}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-semibold">Virtual Debit Cards</div>
                <div className="text-xs text-zinc-500">Privacy.com Plus — API-enabled, merchant-locked</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-400">✓ RECOMMENDED</span>
              {expandedSection === 'cards' ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
            </div>
          </div>
          
          {expandedSection === 'cards' && (
            <div className="border-t border-zinc-800 p-4 space-y-4">
              {/* Why Privacy.com */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-zinc-400">✓ Same-day setup</div>
                  <div className="text-zinc-400">✓ Full REST API</div>
                  <div className="text-zinc-400">✓ Merchant locking</div>
                </div>
                <div className="space-y-1">
                  <div className="text-zinc-400">✓ Per-card spend limits</div>
                  <div className="text-zinc-400">✓ No business required</div>
                  <div className="text-zinc-400">✓ 24 cards/month</div>
                </div>
              </div>
              
              {/* Proposed Cards */}
              <div>
                <div className="text-xs text-zinc-500 mb-2">Proposed Card Structure</div>
                <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-zinc-500 border-b border-zinc-700">
                        <th className="text-left py-2 px-3">Card</th>
                        <th className="text-left py-2 px-3">Merchant Lock</th>
                        <th className="text-right py-2 px-3">Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposedCards.map((card) => (
                        <tr key={card.name} className="border-b border-zinc-700/50">
                          <td className="py-2 px-3 font-mono text-xs text-green-400">{card.name}</td>
                          <td className="py-2 px-3 text-zinc-400">{card.merchant}</td>
                          <td className="py-2 px-3 text-right text-zinc-300">${card.limit}/mo</td>
                        </tr>
                      ))}
                      <tr className="bg-green-500/5">
                        <td className="py-2 px-3 font-semibold" colSpan={2}>Total Monthly Limit</td>
                        <td className="py-2 px-3 text-right font-semibold text-green-400">${totalLimit}/mo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Autonomy Rules */}
              <div>
                <div className="text-xs text-zinc-500 mb-2">Autonomy Rules</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2 text-center">
                    <div className="text-green-400 font-semibold">&lt;$50</div>
                    <div className="text-zinc-500">Autonomous</div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2 text-center">
                    <div className="text-blue-400 font-semibold">$50-200</div>
                    <div className="text-zinc-500">Within limit</div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 text-center">
                    <div className="text-amber-400 font-semibold">&gt;$200</div>
                    <div className="text-zinc-500">Notify after</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Email Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg mb-6 overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors flex items-center justify-between"
            onClick={() => setExpandedSection(expandedSection === 'email' ? '' : 'email')}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-semibold">Professional Email</div>
                <div className="text-xs text-zinc-500">Google Workspace — oden@clawforge.dev</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-400">$6/mo</span>
              {expandedSection === 'email' ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
            </div>
          </div>
          
          {expandedSection === 'email' && (
            <div className="border-t border-zinc-800 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-zinc-400">✓ Full Gmail API</div>
                  <div className="text-zinc-400">✓ `gog` skill support</div>
                  <div className="text-zinc-400">✓ Calendar included</div>
                </div>
                <div className="space-y-1">
                  <div className="text-zinc-400">✓ Professional appearance</div>
                  <div className="text-zinc-400">✓ Unlimited aliases</div>
                  <div className="text-zinc-400">✓ Industry standard</div>
                </div>
              </div>
              <div className="bg-zinc-800/50 rounded p-3">
                <div className="text-xs text-zinc-500 mb-2">Email Structure</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-mono text-blue-400">oden@clawforge.dev</span>
                    <span className="text-zinc-500">Primary</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-zinc-400">support@clawforge.dev</span>
                    <span className="text-zinc-500">Alias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-zinc-400">hello@clawforge.dev</span>
                    <span className="text-zinc-500">Alias</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Crypto Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg mb-8 overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors flex items-center justify-between"
            onClick={() => setExpandedSection(expandedSection === 'crypto' ? '' : 'crypto')}
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-semibold">Crypto Wallet</div>
                <div className="text-xs text-zinc-500">Gnosis Safe — Multi-sig with spending limits</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-500">Phase 2</span>
              {expandedSection === 'crypto' ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
            </div>
          </div>
          
          {expandedSection === 'crypto' && (
            <div className="border-t border-zinc-800 p-4 space-y-3">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm">
                <div className="text-purple-400 font-semibold mb-1">Why Gnosis Safe?</div>
                <p className="text-zinc-400">Only secure option for agent autonomy. Multi-sig with spending limits allows Oden to auto-execute small transactions while Romo approves larger ones.</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                  <div className="text-green-400 font-semibold">&lt;$50/day</div>
                  <div className="text-zinc-500">Oden alone</div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                  <div className="text-amber-400 font-semibold">$50-500</div>
                  <div className="text-zinc-500">Romo signs</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                  <div className="text-red-400 font-semibold">&gt;$500</div>
                  <div className="text-zinc-500">2 signatures</div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                Recommended: Defer until fiat operations running smoothly, or if crypto-only services needed.
              </div>
            </div>
          )}
        </div>

        {/* Setup Checklist */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Romo Action Required
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-amber-500" />
              Sign up for Privacy.com Plus ($5/mo)
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-amber-500" />
              Link bank account + fund $500
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-amber-500" />
              Share API credentials (secure channel)
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-amber-500" />
              Approve domain purchase (clawforge.dev)
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Circle className="w-4 h-4 text-amber-500" />
              Set up Google Workspace
            </div>
          </div>
        </div>

        {/* ROI */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            ROI Justification
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-zinc-500 mb-1">Investment</div>
              <div className="text-zinc-300">Setup: ~$600</div>
              <div className="text-zinc-300">Monthly: $11</div>
            </div>
            <div>
              <div className="text-zinc-500 mb-1">Return</div>
              <div className="text-zinc-300">Time saved: 5+ hrs/mo</div>
              <div className="text-zinc-300">Enables 24/7 ops</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-500/20 text-sm text-zinc-400">
            <strong className="text-green-400">Break-even:</strong> First ClawForge client ($1,500) covers entire infrastructure with $880 profit.
          </div>
        </div>
      </div>
    </div>
  );
}
