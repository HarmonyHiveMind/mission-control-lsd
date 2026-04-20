'use client';

import { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  recurring: boolean;
  notes?: string;
}

// Known expenses as of April 2026
const initialTransactions: Transaction[] = [
  // === EXPENSES ===
  // X Premium (@ClawForgeStudio)
  {
    id: 'exp-001',
    date: '2026-04-01',
    category: 'Marketing',
    description: 'X Premium - @ClawForgeStudio (50% off promo)',
    amount: 4.00,
    type: 'expense',
    recurring: true,
    notes: 'First 2 months at $4, then $8/month'
  },
  // Anthropic API
  {
    id: 'exp-002',
    date: '2026-03-15',
    category: 'API Costs',
    description: 'Anthropic API - March 2026',
    amount: 152.94,
    type: 'expense',
    recurring: true,
    notes: 'High usage during initial build phase. Target: $60/month'
  },
  {
    id: 'exp-003',
    date: '2026-03-30',
    category: 'API Costs',
    description: 'Anthropic API Top-up',
    amount: 50.00,
    type: 'expense',
    recurring: false,
    notes: 'Balance after top-up: $47.06'
  },
  // Infrastructure
  {
    id: 'exp-004',
    date: '2026-03-01',
    category: 'Infrastructure',
    description: 'Vercel Hosting - Mission Control',
    amount: 0.00,
    type: 'expense',
    recurring: true,
    notes: 'Free tier - Hobby plan'
  },
  // Domain
  {
    id: 'exp-005',
    date: '2026-03-24',
    category: 'Infrastructure',
    description: 'Domain - clawforgestudio.io',
    amount: 0.00, // Unknown - Romo to confirm
    type: 'expense',
    recurring: true,
    notes: 'Annual cost TBD - Romo to confirm'
  },
];

export default function PnLPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [selectedMonth, setSelectedMonth] = useState('2026-04');

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netProfit = totalIncome - totalExpenses;

  // Group by category
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Monthly recurring
  const monthlyRecurring = transactions
    .filter(t => t.recurring && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Profit & Loss</h1>
          <p className="text-zinc-400 mt-1">ClawForge Studio Financial Tracking</p>
        </div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="2026-04">April 2026</option>
          <option value="2026-03">March 2026</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Total Income</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            ${totalIncome.toFixed(2)}
          </p>
          <p className="text-zinc-500 text-sm mt-1">From skill sales</p>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Total Expenses</p>
          <p className="text-3xl font-bold text-red-400 mt-2">
            ${totalExpenses.toFixed(2)}
          </p>
          <p className="text-zinc-500 text-sm mt-1">API + Infrastructure</p>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Net Profit/Loss</p>
          <p className={`text-3xl font-bold mt-2 ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${netProfit.toFixed(2)}
          </p>
          <p className="text-zinc-500 text-sm mt-1">Running total</p>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Monthly Recurring</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            ${monthlyRecurring.toFixed(2)}
          </p>
          <p className="text-zinc-500 text-sm mt-1">Fixed costs/month</p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Category */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Expenses by Category</h2>
          <div className="space-y-3">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-zinc-300">{category}</span>
                <span className="text-red-400 font-mono">${amount.toFixed(2)}</span>
              </div>
            ))}
            {Object.keys(expensesByCategory).length === 0 && (
              <p className="text-zinc-500">No expenses recorded</p>
            )}
          </div>
        </div>

        {/* 10% Reinvestment Tracker */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">10% Reinvestment Rule</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300">Total Revenue</span>
              <span className="text-green-400 font-mono">${totalIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-300">10% Allocation</span>
              <span className="text-blue-400 font-mono">${(totalIncome * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-300">Reinvested</span>
              <span className="text-zinc-400 font-mono">$0.00</span>
            </div>
            <div className="flex justify-between items-center border-t border-zinc-700 pt-3">
              <span className="text-zinc-300">Available to Reinvest</span>
              <span className="text-yellow-400 font-mono">${(totalIncome * 0.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Category</th>
                <th className="text-right py-3 px-4 text-zinc-400 font-medium">Amount</th>
                <th className="text-center py-3 px-4 text-zinc-400 font-medium">Recurring</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="py-3 px-4 text-zinc-300 font-mono text-sm">{t.date}</td>
                  <td className="py-3 px-4">
                    <p className="text-white">{t.description}</p>
                    {t.notes && <p className="text-zinc-500 text-sm">{t.notes}</p>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-zinc-800 rounded text-zinc-300 text-sm">
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-right font-mono ${
                    t.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {t.recurring ? (
                      <span className="text-yellow-400">●</span>
                    ) : (
                      <span className="text-zinc-600">○</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">📋 Notes & Missing Data</h3>
        <ul className="space-y-2 text-zinc-400">
          <li>• <strong>Domain cost:</strong> clawforgestudio.io annual fee TBD</li>
          <li>• <strong>X Premium:</strong> $4/month for 2 months, then $8/month</li>
          <li>• <strong>API target:</strong> $60/month (currently higher during build phase)</li>
          <li>• <strong>Income:</strong> No sales yet — tracking will begin with first sale</li>
          <li>• <strong>10% Rule:</strong> 10% of revenue auto-allocated for reinvestment</li>
        </ul>
      </div>
    </div>
  );
}
