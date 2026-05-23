export interface CalculatorInputs {
  monthlyCalls: number;
  missedCallRate: number; // in %
  conversionRate: number; // in %
  averageDealValue: number; // in $
}

export interface CalculationResults {
  missedCallsCount: number;
  lostOpportunities: number;
  monthlyLostRevenue: number;
  annualLostRevenue: number;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  website: string;
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  monthlyCalls: 250,
  missedCallRate: 30, // 30% of calls are missed
  conversionRate: 20, // 20% of converted calls turned into paying customers
  averageDealValue: 1500, // $1,500 per customer / lifetime deal value
};

export const CALCULATOR_THEMES = {
  light: {
    background: 'bg-slate-50 text-slate-900',
    card: 'bg-white border-slate-200/80 shadow-slate-100',
    accent: 'text-amber-600 bg-amber-50 border-amber-200',
    primary: 'bg-rose-600 hover:bg-rose-700 text-white',
    inputBg: 'bg-slate-50 border-slate-200 text-slate-900',
  },
  dark: {
    background: 'bg-slate-950 text-slate-50',
    card: 'bg-slate-900/40 border-slate-800 shadow-black/40',
    accent: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    primary: 'bg-rose-500 hover:bg-rose-600 text-white',
    inputBg: 'bg-slate-950/60 border-slate-800 text-slate-100',
  }
};
