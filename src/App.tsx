/**
 * Missed Call Revenue Calculator
 * Version: v2
 * Changes: Added a premium, modern login layout with two default accounts (Admin and limited User). 
 * Integrated role-based visibility to secure the text-back dynamic cost editing from standard roles while displaying admin tools to Admin.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingDown,
  PhoneCall,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Code,
  DollarSign,
  Briefcase,
  Share2,
  Moon,
  Sun,
  Layers,
  CheckCircle,
  Percent,
  Calculator,
  MessageCircle,
  Activity,
  ChevronDown,
  Lock,
  Unlock,
  User,
  LogOut,
  Key,
  ShieldAlert
} from 'lucide-react';
import { CalculatorInputs, DEFAULT_INPUTS, CalculationResults, AppUser } from './types';
import StatsDashboard from './components/StatsDashboard';
import LeadCaptureForm from './components/LeadCaptureForm';
import EmbedCodeGenerator from './components/EmbedCodeGenerator';


export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activeTab, setActiveTab] = useState<'calculator' | 'embed-code' | 'methodology'>('calculator');
  const [user, setUser] = useState<AppUser | null>(null);
  const [automationCost, setAutomationCost] = useState<number>(149);
  
  // Login fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const leadCaptureRef = useRef<HTMLDivElement>(null);

  // Synchronize CSS class for theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
  }, [theme]);

  // Calculations
  const calcResults = (): CalculationResults => {
    const { monthlyCalls, missedCallRate, conversionRate, averageDealValue } = inputs;
    const missedCallsCount = Math.round(monthlyCalls * (missedCallRate / 100));
    const lostOpportunities = Math.round(missedCallsCount * (conversionRate / 100));
    const monthlyLostRevenue = lostOpportunities * averageDealValue;
    const annualLostRevenue = monthlyLostRevenue * 12;

    return {
      missedCallsCount,
      lostOpportunities,
      monthlyLostRevenue,
      annualLostRevenue,
    };
  };

  const results = calcResults();

  const handleScrollToLead = () => {
    leadCaptureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Perform preset login submissions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const email = emailInput.trim().toLowerCase();
      const password = passwordInput;

      if (email === 'admin@recoverylabs.com' && password === 'admin123') {
        setUser({
          email: 'admin@recoverylabs.com',
          role: 'admin',
          name: 'Administrator',
        });
        setIsSubmitting(false);
      } else if (email === 'user@recoverylabs.com' && password === 'user123') {
        setUser({
          email: 'user@recoverylabs.com',
          role: 'user',
          name: 'Limited Agent',
        });
        setIsSubmitting(false);
      } else {
        setLoginError('Invalid email or password combination. Please refer to preset helpers.');
        setIsSubmitting(false);
      }
    }, 600);
  };

  const quickFill = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setEmailInput('admin@recoverylabs.com');
      setPasswordInput('admin123');
    } else {
      setEmailInput('user@recoverylabs.com');
      setPasswordInput('user123');
    }
  };

  const handleLogOut = () => {
    setUser(null);
    setEmailInput('');
    setPasswordInput('');
    setLoginError('');
  };

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'} transition-all duration-300`}>
      {/* Visual background rings/glow for dark mode */}
      {theme === 'dark' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-emerald-500/[0.03] blur-3xl rounded-full pointer-events-none -z-10" />
      )}

      {/* RENDER LOGIN IF NOT AUTHENTICATED */}
      {!user ? (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
          
          <div className="absolute top-8 right-8">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] text-slate-600 dark:text-emerald-500 hover:scale-105 transition-all cursor-pointer shadow-md"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-emerald-450" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>

          <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#111111] border border-slate-205/65 dark:border-neutral-800 rounded-3xl p-8 shadow-2xl relative z-10 transition-all">
            
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 mx-auto mb-4">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-emerald-450" />
                </div>
              </div>
              <h1 className="text-2xl font-black font-mono tracking-wider text-slate-900 dark:text-white uppercase">
                RECOVERY<span className="text-emerald-500">LABS</span>
              </h1>
              <p className="mt-2 text-xs text-slate-550 dark:text-gray-400">
                To access the Missed Call Revenue calculator metrics, please authenticate using a system account.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="agent@recoverylabs.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm"
                  />
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm"
                  />
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-2.5 items-start text-xs text-rose-500 font-semibold">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl hover:scale-[1.01] transition-all uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin inline-block"></span>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5 fill-slate-950" />
                    Verify & Unlock Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Quick Fill Preset Helpers */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-neutral-800">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Demo Accounts (Click to Fill Credentials)
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => quickFill('admin')}
                  className="flex-1 text-xs py-2 px-3 border border-emerald-500/20 bg-emerald-550/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-550/15 font-bold rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" /> Log in as Admin
                </button>
                <button
                  type="button"
                  onClick={() => quickFill('user')}
                  className="flex-1 text-xs py-2 px-3 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" /> Log in as Limited User
                </button>
              </div>
              <div className="text-[10px] text-slate-400 text-center leading-relaxed font-semibold">
                * Note: Standard Users do not view or adjust the "Missed Call Text-Back Automation Cost" segment.
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          
          {/* TOP UTILIY BAR */}
          <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-250/20 dark:border-neutral-900">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-emerald-450" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight flex items-center gap-1.5 uppercase font-mono">
                  RECOVERY<span className="text-emerald-500">LABS</span>
                </h1>
                <span className="text-[10px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest block -mt-1">
                  Conversion Engine
                </span>
              </div>
            </div>

            {/* Profile widget and Log out Action */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-neutral-800 px-3.5 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {user.name} ({user.role === 'admin' ? 'Admin Access' : 'Limited Agent'})
                </span>
                <button
                  onClick={handleLogOut}
                  className="ml-2 hover:text-rose-500 text-slate-400 transition-colors p-1 rounded hover:bg-slate-200 dark:hover:bg-neutral-800 cursor-pointer"
                  title="Sign out of system"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#111111] hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-600 dark:text-emerald-500 transition-all cursor-pointer shadow-sm shadow-slate-105"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-emerald-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            </div>
          </header>

          {/* HERO HEADER TITLE */}
          <div className="text-center md:text-left mb-10 md:mb-12 max-w-4xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4 animate-pulse">
              <Activity className="w-3.5 h-3.5" />
              Active Revenue Loss Assessment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Missed Call <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-555 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-500">Revenue Drain</span> Calculator
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              Did you know **62% of inbound business calls go unanswered**? When clients get your voicemail, they immediately hang up and call your next competitor. Estimate your monthly losses below.
            </p>
          </div>

          {/* INTERACTIVE COMPONENT NAVIGATION TABS */}
          <div className="flex border-b border-slate-200 dark:border-neutral-800 mb-8 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-3 px-5 font-bold text-sm tracking-tight border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'calculator'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Calculator className="w-4 h-4" /> Live Loss Simulator
            </button>
            
            <button
              onClick={() => setActiveTab('embed-code')}
              className={`py-3 px-5 font-bold text-sm tracking-tight border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'embed-code'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Code className="w-4 h-4" /> Get GHL Embed Widget
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`py-3 px-5 font-bold text-sm tracking-tight border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'methodology'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> How This Works
            </button>
          </div>

          {/* CONTENT RENDERING FOR ACTIVE TAB */}
          <AnimatePresence mode="wait">
            {activeTab === 'calculator' && (
              <motion.div
                key="calculator-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                
                {/* SLIDERS / ADJUSTMENTS COLUMN (Spans 7) */}
                <div className="lg:col-span-7 bg-white dark:bg-[#111111] border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[450px]">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-450 dark:text-gray-400 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-emerald-500" />
                        Simulator Parameters
                      </h3>
                      <button
                        onClick={() => setInputs(DEFAULT_INPUTS)}
                        className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Reset to Industry Averages
                      </button>
                    </div>

                    {/* Input 1: Monthly Calls / Volume */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label htmlFor="range-calls" className="text-sm font-bold text-slate-650 dark:text-gray-300">
                          Monthly Inbound Phone Calls
                        </label>
                        <span className="text-xl md:text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-950/45 px-3 py-1 rounded-xl border border-slate-200 dark:border-neutral-800">
                          {inputs.monthlyCalls.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="range-calls"
                        type="range"
                        min="10"
                        max="2000"
                        step="10"
                        value={inputs.monthlyCalls}
                        onChange={(e) => setInputs({ ...inputs, monthlyCalls: parseInt(e.target.value) })}
                        className="w-full accent-emerald-500 h-1.5 focus:ring-1 focus:ring-emerald-500"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1 font-mono">
                        <span>Low Volume (10)</span>
                        <span>Mid (1,000)</span>
                        <span>High Volume (2,000)</span>
                      </div>
                    </div>

                    {/* Input 2: Missed Call Rate */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label htmlFor="range-missed" className="text-sm font-bold text-slate-650 dark:text-gray-300">
                          Estimated Missed Call Rate (%)
                        </label>
                        <span className="text-xl md:text-2xl font-mono font-bold text-rose-500 bg-rose-500/5 dark:bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/10">
                          {inputs.missedCallRate}%
                        </span>
                      </div>
                      <input
                        id="range-missed"
                        type="range"
                        min="5"
                        max="80"
                        step="5"
                        value={inputs.missedCallRate}
                        onChange={(e) => setInputs({ ...inputs, missedCallRate: parseInt(e.target.value) })}
                        className="w-full accent-rose-500 h-1.5 focus:ring-1 focus:ring-rose-500"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1 font-mono">
                        <span>Excellent (5%)</span>
                        <span>Industry Standard (30%)</span>
                        <span>Danger (80%)</span>
                      </div>
                    </div>

                    {/* Input 3: Close / Conversion Rate */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label htmlFor="range-convert" className="text-sm font-bold text-slate-650 dark:text-gray-300 flex items-center gap-1">
                          Close Rate (Calls turned into Payers)
                        </label>
                        <span className="text-xl md:text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-950/45 px-3 py-1 rounded-xl border border-slate-200 dark:border-neutral-800">
                          {inputs.conversionRate}%
                        </span>
                      </div>
                      <input
                        id="range-convert"
                        type="range"
                        min="5"
                        max="80"
                        step="5"
                        value={inputs.conversionRate}
                        onChange={(e) => setInputs({ ...inputs, conversionRate: parseInt(e.target.value) })}
                        className="w-full accent-emerald-500 h-1.5 focus:ring-1 focus:ring-emerald-500"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1 font-mono">
                        <span>Low Close (5%)</span>
                        <span>Average (20%)</span>
                        <span>Power Close (80%)</span>
                      </div>
                    </div>

                    {/* Input 4: Average Deal Lifetime Value */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label htmlFor="range-deal" className="text-sm font-bold text-slate-650 dark:text-gray-350">
                          Average Deal / Lifetime Value ($)
                        </label>
                        <span className="text-xl md:text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-950/45 px-3 py-1 rounded-xl border border-slate-200 dark:border-neutral-800">
                          ${inputs.averageDealValue.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="range-deal"
                        type="range"
                        min="100"
                        max="15000"
                        step="100"
                        value={inputs.averageDealValue}
                        onChange={(e) => setInputs({ ...inputs, averageDealValue: parseInt(e.target.value) })}
                        className="w-full accent-emerald-500 h-1.5 focus:ring-1 focus:ring-emerald-500"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1 font-mono">
                        <span>Micro deal ($100)</span>
                        <span>LTV ($1,500)</span>
                        <span>Large Ticket ($15,000)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-neutral-800 flex items-center text-xs text-slate-400 dark:text-slate-500 space-x-4">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                      Live calculation active
                    </div>
                    <div>• Settings persist during active session</div>
                  </div>
                </div>

                {/* LIVE DYNAMIC METRICS BOARD (Spans 5) */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
                  
                  {/* Embedded Stats Dashboard Panel with dynamic cost & role */}
                  <StatsDashboard 
                    results={results} 
                    dealSize={inputs.averageDealValue} 
                    isAdmin={user.role === 'admin'}
                    automationCost={automationCost}
                    onAutomationCostChange={setAutomationCost}
                  />
                  
                  <button
                    onClick={handleScrollToLead}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-4.5 rounded-2xl transition-all uppercase tracking-widest text-xs shadow-xl shadow-emerald-550/15 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                    Stop Bleeding Revenue Now
                  </button>
                </div>

              </motion.div>
            )}

            {activeTab === 'embed-code' && (
              <motion.div
                key="embed-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <EmbedCodeGenerator 
                  defaultCalls={inputs.monthlyCalls} 
                  defaultMissedRate={inputs.missedCallRate} 
                  defaultConvRate={inputs.conversionRate} 
                  defaultDealSize={inputs.averageDealValue} 
                />
              </motion.div>
            )}

            {activeTab === 'methodology' && (
              <motion.div
                key="methodology-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xl"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                  <Layers className="text-emerald-500 w-5 h-5" />
                  Under The Hood: Formula Metrics
                </h3>
                
                <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-500 dark:text-gray-400 space-y-4 leading-relaxed">
                  <p>
                    This missed call calculator calculates real-world metrics based on proven conversion statistics in local service, real estate, medical, and agency business models:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-neutral-900">
                      <span className="block font-bold text-slate-800 dark:text-slate-200 mb-1">1. Missed Call Count</span>
                      <code className="text-[12px] bg-slate-200 dark:bg-slate-900 px-1.5 py-0.5 rounded font-mono">Calls × Missed Call%</code>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Example: 250 calls/mo × 30% miss rate = 75 missed phone calls.</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-neutral-905">
                      <span className="block font-bold text-slate-800 dark:text-slate-200 mb-1">2. Lost Booking Value</span>
                      <code className="text-[12px] bg-slate-200 dark:bg-slate-900 px-1.5 py-0.5 rounded font-mono">Missed Calls × Close Rate%</code>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Example: 75 missed × 20% average close rate = 15 lost booked accounts.</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-neutral-900">
                      <span className="block font-bold text-slate-800 dark:text-slate-200 mb-1">3. Lost Income</span>
                      <code className="text-[12px] bg-slate-200 dark:bg-slate-900 px-1.5 py-0.5 rounded font-mono">Lost Bookings × Avg Sales Value</code>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">Example: 15 deals × $1,500 LTV = $22,500 monthly lost revenue.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 mt-6">
                    <h4 className="font-bold text-amber-500 text-sm mb-1">Why Auto-Text-Back is Essential:</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      According to customer behavior analytics, <strong>85% of people</strong> won't request a callback or redial a number if a vendor doesn't answer on the first call. However, when sent an <strong>instant SMS message (Text-Back) within 2 minutes</strong>, up to 62% of leads engage, keeping the sales dialogue alive inside your CRM!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTTOM SECTION: LEAD CAPTURE ENGAGEMENT ENGINE */}
          <div ref={leadCaptureRef} className="mt-12 md:mt-16 border-t border-slate-200 dark:border-neutral-800 pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Promo Pitch Copy */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-black text-rose-500 tracking-wider flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-emerald-555" /> SIMULATE SAVING DEALS
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  Instantly turn missed calls into <span className="text-emerald-500">booked meetings</span>.
                </h3>
                
                <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-555 flex-shrink-0 mt-0.5" />
                    <span><strong>Instant 2-Second Auto-SMS:</strong> Text-Back triggers the second a call is missed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-555 flex-shrink-0 mt-0.5" />
                    <span><strong>Keep Leads Off Google:</strong> Stops them from typing a competitors website.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-555 flex-shrink-0 mt-0.5" />
                    <span><strong>Complete Go High Level integration:</strong> Paste the embed code, map fields instantly.</span>
                  </li>
                </ul>

                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-center gap-3">
                  <span className="text-3xl">🤫</span>
                  <p className="text-xs text-slate-405">
                    Try completing the form to see a live visual simulation of missed-call text-back automation receiving an inquiry and locking down the client.
                  </p>
                </div>
              </div>

              {/* Simulated Smartphone or Active Lead Capture Form */}
              <div className="lg:col-span-7">
                <LeadCaptureForm monthlyLostRevenue={results.monthlyLostRevenue} onSuccess={() => {}} />
              </div>

            </div>
          </div>

          {/* FOOTER METADATA CONTROLS */}
          <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-neutral-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-gray-600">
            <div>
              &copy; {new Date().getFullYear()} RecoveryLabs High Converting conversion calculators. Built for GoHighLevel creators.
            </div>
            <div className="flex space-x-6">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Live Calculation Engine Enabled (Logged in as {user.name})
              </span>
            </div>
          </footer>

        </div>
      )}
    </div>
  );
}

