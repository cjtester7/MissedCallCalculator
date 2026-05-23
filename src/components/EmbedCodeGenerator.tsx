import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Copy, Check, ExternalLink, Settings, Sparkles, AlertCircle } from 'lucide-react';

interface EmbedCodeGeneratorProps {
  defaultCalls: number;
  defaultMissedRate: number;
  defaultConvRate: number;
  defaultDealSize: number;
}

const BRAND_COLORS = [
  { name: 'Red Rose', value: '#f43f5e', hover: '#e11d48', bg: 'bg-rose-500' },
  { name: 'Royal Blue', value: '#3b82f6', hover: '#2563eb', bg: 'bg-blue-500' },
  { name: 'Emerald Green', value: '#10b981', hover: '#059669', bg: 'bg-emerald-500' },
  { name: 'Amber Gold', value: '#f59e0b', hover: '#d97706', bg: 'bg-amber-500' },
  { name: 'Vibrant Indigo', value: '#6366f1', hover: '#4f46e5', bg: 'bg-indigo-500' },
];

export default function EmbedCodeGenerator({
  defaultCalls,
  defaultMissedRate,
  defaultConvRate,
  defaultDealSize,
}: EmbedCodeGeneratorProps) {
  const [selectedColor, setSelectedColor] = useState(BRAND_COLORS[0]);
  const [copied, setCopied] = useState(false);
  const [embedTheme, setEmbedTheme] = useState<'dark' | 'light'>('dark');

  // Multi-line template string with full HTML code
  const generateEmbedCode = () => {
    return `<!-- Missed Call Revenue Calculator Widget [GHL & Embed Compatible] -->
<div id="mcc-widget-container" class="${embedTheme === 'dark' ? 'mcc-theme-dark' : 'mcc-theme-light'}">
  <div class="mcc-card">
    <div class="mcc-header">
      <div class="mcc-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        Instant Lost Income Assessment
      </div>
      <h2>Missed Call Revenue Calculator</h2>
      <p>Estimate how much money your business is losing each month by not answering every call.</p>
    </div>

    <div class="mcc-split-layout">
      <!-- Input Controls Panel -->
      <div class="mcc-inputs-panel">
        <div class="mcc-input-group">
          <div class="mcc-input-label-row">
            <span class="mcc-label">Monthly Inbound Calls</span>
            <span id="label-calls" class="mcc-value-bubble">${defaultCalls}</span>
          </div>
          <input type="range" id="input-calls" min="10" max="2000" step="10" value="${defaultCalls}">
        </div>

        <div class="mcc-input-group">
          <div class="mcc-input-label-row">
            <span class="mcc-label">Estimated Call Miss Rate (%)</span>
            <span id="label-miss" class="mcc-value-bubble">${defaultMissedRate}%</span>
          </div>
          <input type="range" id="input-miss" min="5" max="80" step="5" value="${defaultMissedRate}">
        </div>

        <div class="mcc-input-group">
          <div class="mcc-input-label-row">
            <span class="mcc-label">Average Booking/Deal Convert Rate (%)</span>
            <span id="label-conv" class="mcc-value-bubble">${defaultConvRate}%</span>
          </div>
          <input type="range" id="input-conv" min="5" max="80" step="5" value="${defaultConvRate}">
        </div>

        <div class="mcc-input-group">
          <div class="mcc-input-label-row">
            <span class="mcc-label">Average Sale/Deal Lifetime Value ($)</span>
            <span id="label-value" class="mcc-value-bubble">$${defaultDealSize}</span>
          </div>
          <input type="range" id="input-value" min="100" max="15000" step="100" value="${defaultDealSize}">
        </div>
      </div>

      <!-- Live Dynamic Output Panel -->
      <div class="mcc-results-panel">
        <div class="mcc-metric-card mcc-hero-metric">
          <span class="mcc-metric-label">Estimated Monthly Revenue Loss</span>
          <span id="calc-monthly-loss" class="mcc-metric-value">$0</span>
          <p class="mcc-tip">⚠️ Money actively lost to your business each month.</p>
        </div>

        <div class="mcc-small-metrics">
          <div class="mcc-small-metric">
            <span class="mcc-small-label">Missed Calls</span>
            <span id="calc-missed-count" class="mcc-small-value">0</span>
            <span class="mcc-sub">/ month</span>
          </div>
          <div class="mcc-small-metric">
            <span class="mcc-small-label">Lost Clients</span>
            <span id="calc-lost-deals" class="mcc-small-value">0</span>
            <span class="mcc-sub">/ month</span>
          </div>
        </div>

        <div class="mcc-metric-card mcc-annual-card">
          <span class="mcc-metric-label font-bold">Estimated Annual Revenue Loss</span>
          <span id="calc-annual-loss" class="mcc-metric-value accent-text">$0</span>
          <p class="mcc-tip">Total financial leakage if left unaddressed for 12 months.</p>
        </div>

        <div class="mcc-cta-row">
          <a href="#" class="mcc-cta-btn" onclick="alert('Form submission or scheduling flow can trigger here!')">
            Stop Lasing Calls Today
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Premium Embedded Styles for Missed Call Revenue Calculator */
  :root {
    --mcc-accent: ${selectedColor.value};
    --mcc-accent-hover: ${selectedColor.hover};
    --mcc-radius: 16px;
    --font-heading: system-ui, -apple-system, sans-serif;
  }

  /* Theme Configurations */
  .mcc-theme-dark {
    --mcc-bg: #0f172a;
    --mcc-card-bg: #1e293b;
    --mcc-text: #f8fafc;
    --mcc-text-muted: #94a3b8;
    --mcc-border: rgba(148, 163, 184, 0.12);
    --mcc-input-track: #0f172a;
    --mcc-bubble-bg: #0f172a;
    --mcc-metric-bg: rgba(15, 23, 42, 0.4);
    --mcc-annual-bg: rgba(244, 63, 94, 0.08);
  }

  .mcc-theme-light {
    --mcc-bg: #f8fafc;
    --mcc-card-bg: #ffffff;
    --mcc-text: #0f172a;
    --mcc-text-muted: #64748b;
    --mcc-border: rgba(15, 23, 42, 0.08);
    --mcc-input-track: #f1f5f9;
    --mcc-bubble-bg: #f8fafc;
    --mcc-metric-bg: #f8fafc;
    --mcc-annual-bg: rgba(244, 63, 94, 0.04);
  }

  /* Core Layout Customization */
  #mcc-widget-container {
    width: 100%;
    max-width: 950px;
    margin: 1.5rem auto;
    background-color: var(--mcc-bg);
    color: var(--mcc-text);
    padding: 1rem;
    box-sizing: border-box;
    font-family: var(--font-heading);
    border-radius: var(--mcc-radius);
    transition: all 0.35s ease;
  }

  #mcc-widget-container * {
    box-sizing: border-box;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  .mcc-card {
    background-color: var(--mcc-card-bg);
    border: 1px solid var(--mcc-border);
    border-radius: calc(var(--mcc-radius) - 4px);
    padding: 2rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  }

  .mcc-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .mcc-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 9999px;
    background-color: var(--mcc-annual-bg);
    color: #f43f5e;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
    border: 1px solid rgba(244, 63, 94, 0.15);
  }

  .mcc-header h2 {
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 6px 0;
    letter-spacing: -0.02em;
  }

  .mcc-header p {
    font-size: 13px;
    color: var(--mcc-text-muted);
    margin: 0;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }

  .mcc-split-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .mcc-split-layout {
      grid-template-columns: 1.1fr 0.9fr;
    }
  }

  .mcc-inputs-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  }

  .mcc-input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mcc-input-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mcc-label {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.9;
  }

  .mcc-value-bubble {
    font-size: 13px;
    font-weight: 700;
    color: var(--mcc-accent);
    background-color: var(--mcc-bubble-bg);
    padding: 3px 8px;
    border-radius: 8px;
    border: 1px solid var(--mcc-border);
  }

  /* Range Sliders Premium Styling */
  #mcc-widget-container input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    background: var(--mcc-input-track);
    border-radius: 9999px;
    outline: none;
    margin: 10px 0;
  }

  #mcc-widget-container input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--mcc-accent);
    cursor: pointer;
    border: 2px solid var(--mcc-card-bg);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease, background-color 0.15s ease;
  }

  #mcc-widget-container input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    background: var(--mcc-accent-hover);
  }

  #mcc-widget-container input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 50%;
    background: var(--mcc-accent);
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  /* Results Card Styling */
  .mcc-results-panel {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .mcc-metric-card {
    background-color: var(--mcc-metric-bg);
    border: 1px solid var(--mcc-border);
    border-radius: var(--mcc-radius);
    padding: 1.5rem;
    text-align: center;
  }

  .mcc-hero-metric {
    border-color: rgba(244, 63, 94, 0.15);
  }

  .mcc-annual-card {
    background-color: var(--mcc-annual-bg);
    border-color: rgba(244, 63, 94, 0.2);
  }

  .mcc-metric-label {
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--mcc-text-muted);
    margin-bottom: 0.5rem;
  }

  .mcc-metric-value {
    display: block;
    font-size: 32px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .mcc-hero-metric .mcc-metric-value {
    color: var(--mcc-text);
  }

  .accent-text {
    color: #f43f5e;
  }

  .mcc-tip {
    font-size: 11px;
    color: var(--mcc-text-muted);
    margin: 0;
  }

  .mcc-small-metrics {
    display: grid;
    grid-template-cols: 1fr 1fr;
    gap: 1rem;
  }

  .mcc-small-metric {
    background-color: var(--mcc-metric-bg);
    border: 1px solid var(--mcc-border);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
  }

  .mcc-small-label {
    display: block;
    font-size: 9px;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--mcc-text-muted);
    margin-bottom: 0.25rem;
  }

  .mcc-small-value {
    font-size: 18px;
    font-weight: 800;
  }

  .mcc-sub {
    font-size: 10px;
    color: var(--mcc-text-muted);
  }

  .mcc-cta-row {
    margin-top: 0.5rem;
  }

  .mcc-cta-btn {
    display: block;
    width: 100%;
    background-color: var(--mcc-accent);
    color: #ffffff;
    text-align: center;
    padding: 1rem;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
  }

  .mcc-cta-btn:hover {
    background-color: var(--mcc-accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  }
</style>

<script>
  (function() {
    const formatDollar = (val) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(val);
    };

    // Calculate details and update elements
    function calculateLosses() {
      const calls = parseInt(document.getElementById('input-calls').value, 10);
      const missRate = parseInt(document.getElementById('input-miss').value, 10) / 100;
      const convRate = parseInt(document.getElementById('input-conv').value, 10) / 100;
      const dealVal = parseInt(document.getElementById('input-value').value, 10);

      // Math
      const missedCalls = Math.round(calls * missRate);
      const lostDeals = Math.round(missedCalls * convRate);
      const monthlyLoss = lostDeals * dealVal;
      const annualLoss = monthlyLoss * 12;

      // DOM Updates
      document.getElementById('label-calls').innerText = calls.toLocaleString();
      document.getElementById('label-miss').innerText = (missRate * 100) + '%';
      document.getElementById('label-conv').innerText = (convRate * 100) + '%';
      document.getElementById('label-value').innerText = '$' + dealVal.toLocaleString();

      document.getElementById('calc-monthly-loss').innerText = formatDollar(monthlyLoss);
      document.getElementById('calc-missed-count').innerText = missedCalls.toLocaleString();
      document.getElementById('calc-lost-deals').innerText = lostDeals.toLocaleString();
      document.getElementById('calc-annual-loss').innerText = formatDollar(annualLoss);
    }

    const elements = ['input-calls', 'input-miss', 'input-conv', 'input-value'];
    elements.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', calculateLosses);
      }
    });

    // Initial run
    calculateLosses();
  })();
<\\/script>`; // Added escape to prevent HTML script closing parsing error
  };

  const handleCopy = () => {
    // Escape script block properly for clean output text representation
    const code = generateEmbedCode().replace('<\\/script>', '</script>');
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>

      <div className="mb-6 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <Code className="w-3.5 h-3.5" />
            100% GHL Custom HTML Compatible
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Get Copy-Paste Embed Code
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Copy the raw responsive widget to insert directly into high-converting pages across GoHighLevel, WordPress, or Webflow.
          </p>
        </div>

        {/* Inline configuration toggles */}
        <div className="flex flex-col gap-2 min-w-[160px]">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <Settings className="w-3 h-3" /> Embed Preset
          </span>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setEmbedTheme('dark')}
              className={`flex-1 text-[11px] font-semibold py-1 px-2.5 rounded text-center transition-all ${
                embedTheme === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-450 hover:text-white'
              }`}
            >
              Dark Theme
            </button>
            <button
              onClick={() => setEmbedTheme('light')}
              className={`flex-1 text-[11px] font-semibold py-1 px-2.5 rounded text-center transition-all ${
                embedTheme === 'light' ? 'bg-slate-800 text-white' : 'text-slate-450 hover:text-white'
              }`}
            >
              Light Theme
            </button>
          </div>
        </div>
      </div>

      {/* Brand accent selector */}
      <div className="mb-6 bg-slate-950/40 p-4 rounded-xl border border-slate-800/85">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Select Your Brand Primary Accent Color:
        </label>
        <div className="flex flex-wrap gap-2">
          {BRAND_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                selectedColor.name === color.name
                  ? 'border-white bg-slate-800 text-white shadow-md'
                  : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${color.bg} block flex-shrink-0`}></span>
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative group rounded-xl bg-slate-950 border border-slate-800 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
          <span className="text-xs font-mono text-slate-400">missed-call-calculator-widget.html</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 py-1 px-3 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied Snippet!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Code
              </>
            )}
          </button>
        </div>

        {/* Snippet box */}
        <div className="p-4 overflow-y-auto max-h-[180px] text-xs font-mono text-slate-350 select-all scrollbar-thin leading-relaxed">
          <pre>{generateEmbedCode().replace('<\\/script>', '</script>')}</pre>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800/60 pt-4">
        <AlertCircle className="w-4 h-4 text-emerald-500" />
        <span>GHL setup guide: Simply drag the **Custom JS/HTML CSS card element** inside the HighLevel builder, paste this text directly. There are no external CSS dependencies!</span>
      </div>
    </div>
  );
}
