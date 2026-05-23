import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, MessageSquare, Send, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';
import { LeadData } from '../types';

interface LeadCaptureFormProps {
  monthlyLostRevenue: number;
  onSuccess: (lead: LeadData) => void;
}

export default function LeadCaptureForm({ monthlyLostRevenue, onSuccess }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'demo'>('form');

  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(monthlyLostRevenue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    // Simulate brief API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess(formData);
    }, 1200);
  };

  const handleDemoTrigger = () => {
    setActiveTab('demo');
  };

  return (
    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/30 backdrop-blur-md p-6 lg:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-500/20 mb-3">
                <Zap className="w-3.5 h-3.5 fill-rose-600 dark:fill-rose-400" />
                Stop Bleeding Revenue
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Recover up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">{formattedRevenue}</span>/mo
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Missed calls are missed clients. Activate our automated instant **Missed Call Text-Back Call flow** to immediately save lost deals before they dial a competitor.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-website" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Business Website <span className="text-slate-400 dark:text-slate-600">(Optional)</span>
                </label>
                <input
                  id="lead-website"
                  type="text"
                  placeholder="www.mycompany.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-4 px-6 font-bold text-sm text-center text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-605 rounded-xl transition-all font-sans relative overflow-hidden group shadow-lg shadow-rose-500/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin inline-block"></span>
                    Customizing Your Report...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 fill-white" />
                    Secure My Instant Recovery Setup
                  </span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 pt-2 text-center">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>We respect your privacy. No spam. Instant setup instruction delivered to phone.</span>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex flex-col items-center text-center py-4"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Setup Strategy Activated!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
              Thank you, <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.name}</span>! We have calculated your strategy parameters. Here is what happens in the next 15 seconds:
            </p>

            {/* Simulated Smartphone Widget Displaying instant missed call text-back */}
            <div className="w-full max-w-[280px] rounded-[32px] border-4 border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden relative shadow-2xl p-2 pb-4">
              <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 inline-block mr-1"></span>
                <span className="w-8 h-1 bg-slate-300 dark:bg-slate-700 rounded inline-block"></span>
              </div>

              <div className="text-[10px] text-slate-500 font-mono text-center mb-2">Simulated Text Message</div>

              <div className="space-y-2 mb-4">
                {/* Outbound call missed */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-800/80 text-[11px] text-slate-300 rounded-2xl rounded-tr-none px-3 py-2 max-w-[85%] ml-auto text-right"
                >
                  <em className="text-[9px] block text-rose-400 font-medium">Missed Call from {formData.phone}</em>
                  ❌ Missed Call Occurs
                </motion.div>

                {/* Automation triggers text back */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-rose-500 text-[11px] text-white rounded-2xl rounded-tl-none px-3 py-2.5 max-w-[90%] mr-auto text-left leading-snug"
                >
                  <p className="font-semibold mb-0.5 text-[9px] text-rose-100 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 fill-rose-100 text-rose-500" /> Auto-reply triggered!
                  </p>
                  "Hey {formData.name}, sorry we missed your call. We are currently helping another customer but want to attend to you immediately! What can we assist you with?"
                </motion.div>

                {/* Immediate response preview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.5 }}
                  className="bg-slate-800/80 text-[11px] text-slate-300 rounded-2xl rounded-tr-none px-3 py-2.5 max-w-[85%] ml-auto text-left"
                >
                  📱 Client (You): "Hi, I wanted to book a consult today!"
                </motion.div>
              </div>

              <div className="text-[9px] text-neutral-500 font-medium flex items-center justify-center gap-1 bg-white/5 py-1 rounded-full px-2 max-w-[90%] mx-auto">
                <Smartphone className="w-2.5 h-2.5" /> SMS Automation Active
              </div>
            </div>

            <p className="text-xs text-rose-500 font-semibold mt-4 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block"></span>
              98% of customers prefer text when you can't answer.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', phone: '', website: '' });
              }}
              className="mt-6 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors underline"
            >
              Calculate Another Scenario
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
