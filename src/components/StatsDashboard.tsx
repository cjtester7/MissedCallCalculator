/**
 * Missed Call Revenue Calculator
 * Version: v2
 * Changes: Added dynamic missed-call automation cost styling, admin controls for editing auto cost values,
 * and role-based block visibility gating to hide the automation cost comparisons for standard user accounts.
 */

import { motion } from 'motion/react';
import { CalculationResults } from '../types';
import { AlertCircle, ArrowUpRight, Award, TrendingDown, DollarSign, Calendar, Flame, Settings } from 'lucide-react';

interface StatsDashboardProps {
  results: CalculationResults;
  dealSize: number;
  isAdmin: boolean;
  automationCost: number;
  onAutomationCostChange?: (cost: number) => void;
}

export default function StatsDashboard({
  results,
  dealSize,
  isAdmin,
  automationCost,
  onAutomationCostChange,
}: StatsDashboardProps) {
  const { missedCallsCount, lostOpportunities, monthlyLostRevenue, annualLostRevenue } = results;

  const formattedMonth = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(monthlyLostRevenue);

  const formattedYear = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(annualLostRevenue);

  const formattedDealSize = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(dealSize);

  // Determine risk profile
  const getRiskDetails = () => {
    if (monthlyLostRevenue < 1500) {
      return { label: 'Moderate Loss Risk', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', description: 'Small leaks accumulate quickly. Address missed calls to capture low-hanging fruit.', barColor: 'bg-amber-500' };
    } else if (monthlyLostRevenue < 10000) {
      return { label: 'Significant Loss Risk', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20', description: 'You are losing major quarterly income. Competitors are gaining your callers.', barColor: 'bg-rose-500' };
    } else {
      return { label: 'CRITICAL Loss Risk', color: 'text-rose-600 dark:text-rose-400 bg-rose-500/20 dark:bg-rose-500/10 border-rose-500/30 dark:border-rose-400/20', description: 'Disastrous revenue drainage! You are actively spending ad budget to enrich competitors.', barColor: 'bg-rose-600 dark:bg-rose-500' };
    }
  };

  const risk = getRiskDetails();

  const recoveryROI = monthlyLostRevenue > 0
    ? Math.round(((monthlyLostRevenue - automationCost) / automationCost) * 105)
    : 0;

  return (
    <div className="space-y-6">
      {/* Risk Alert Panel */}
      <div className={`p-4 md:p-5 rounded-2xl border ${risk.color} flex items-start gap-4 transition-all duration-300`}>
        <div className="p-2 rounded-xl bg-white/10 dark:bg-black/10 flex-shrink-0">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sm tracking-wide uppercase">{risk.label}</h4>
          <p className="text-xs opacity-90 leading-relaxed font-sans font-medium">{risk.description}</p>
        </div>
      </div>

      {/* Hero Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Lost Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/[0.04] to-amber-500/[0.02] dark:from-rose-500/[0.08] dark:to-transparent p-6 shadow-md transition-all duration-300 hover:border-rose-500/35"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <TrendingDown className="w-32 h-32 text-rose-500" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-rose-500" />
              Est. Monthly Lost Revenue
            </span>
            <span className="text-[10px] bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full">
              Monthly Leakage
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {formattedMonth}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ month</span>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-500">Based on deal size:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{formattedDealSize} / deal</span>
          </div>
        </motion.div>

        {/* Annual Lost Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/[0.04] to-amber-500/[0.02] dark:from-rose-500/[0.08] dark:to-transparent p-6 shadow-md transition-all duration-300 hover:border-rose-500/35"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Calendar className="w-32 h-32 text-rose-500" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              Est. Annual Lost Revenue
            </span>
            <span className="text-[10px] bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-bold px-2 py-0.5 rounded-full">
              Yearly Bleed
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-rose-600 dark:text-rose-400">
              {formattedYear}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ year</span>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-500">Annual missed calls:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{(missedCallsCount * 12).toLocaleString()} calls</span>
          </div>
        </motion.div>
      </div>

      {/* Core Breakdown Metrics grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/15 p-4">
          <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            Missed Calls / Month
          </span>
          <span className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
            {missedCallsCount.toLocaleString()}
            <span className="text-xs font-normal text-rose-500 hover:scale-105 transition-transform cursor-default">
              (Avg. {Math.round(missedCallsCount / 30)}/day)
            </span>
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/15 p-4">
          <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            Lost Deals / Month
          </span>
          <span className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
            {lostOpportunities.toLocaleString()}
            <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
              ({(lostOpportunities * 12).toLocaleString()}/year)
            </span>
          </span>
        </div>
      </div>

      {/* Admin Slider Control to change Monthly Cost */}
      {isAdmin && onAutomationCostChange && (
        <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-neutral-800 bg-[#161616]/30 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-emerald-450 uppercase tracking-wider flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-emerald-500" />
              Adjust Automation Cost (Admin Only)
            </span>
            <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-black px-2 py-0.5 rounded text-emerald-500">
              ${automationCost}/mo
            </span>
          </div>
          <input
            type="range"
            min="49"
            max="1000"
            step="10"
            value={automationCost}
            onChange={(e) => onAutomationCostChange(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-250 dark:bg-neutral-850 accent-emerald-500"
          />
          <span className="block text-[10px] text-slate-400 dark:text-gray-500">
            Slide to dynamically change comparison and ROI math live on the charts below.
          </span>
        </div>
      )}

      {/* Call flow comparison - ONLY VISIBLE TO ADMINS */}
      {isAdmin ? (
        <div className="p-5 md:p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-slate-800 dark:text-white">
                The Auto-Recovery Breakthrough
              </h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed mb-4">
              By deploying a standard SMS auto-reply workflow on missed calls, you capture **up to 62% of missed leads** in the first 2 minutes. Let's compare the cost of doing nothing vs automating:
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold dark:text-slate-300">
                  <span>Cost of Missed Calls (Lost Revenue)</span>
                  <span className="text-rose-500 font-bold">{formattedMonth}/mo</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                    className={`${risk.barColor} h-2 rounded-full`}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold dark:text-slate-300">
                  <span>Missed Call Text-Back Automation Cost</span>
                  <span className="text-emerald-505 font-bold text-emerald-600 dark:text-emerald-400">${automationCost}/mo</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(1.5, Math.min(100, (automationCost / Math.max(1, monthlyLostRevenue)) * 105))}%` }}
                    transition={{ duration: 0.8 }}
                    className="bg-emerald-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </div>

            {monthlyLostRevenue > automationCost && (
              <div className="mt-4 pt-3 border-t border-emerald-500/10 flex items-center justify-between text-xs leading-none">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-tight">
                  Recovers {formattedMonth} with {recoveryROI.toLocaleString()}% ROI
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-extrabold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> ROI Engine
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl text-center text-xs text-slate-400 dark:text-slate-500">
          🔒 Lock comparisons: Missed Call Text-Back Automation Cost is locked and loaded under preset configurations. Access admin settings to fine-tune automation ROI estimates.
        </div>
      )}
    </div>
  );
}

