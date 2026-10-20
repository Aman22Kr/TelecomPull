import React, { useState } from 'react';
import { Tag, Sparkles, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdPlaceholderProps {
  variant?: 'banner' | 'inline' | 'compact';
  title?: string;
  subtitle?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  variant = 'banner',
  title = 'TelecomPull Mega Exchange & Upgrade Carnival',
  subtitle = 'Get up to ₹15,000 extra exchange value on old smartphones + No-Cost EMI up to 24 months.'
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full my-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 text-white p-4 sm:p-6 shadow-xl border border-sky-800/40">
        {/* Subtle background decoration */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-32 h-32 rounded-full bg-blue-400/10 blur-xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          {/* Ad Label & Content */}
          <div className="flex items-start sm:items-center gap-3.5 w-full md:w-auto">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300">
              <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  SPONSORED PROMO
                </span>
                <span className="text-xs text-sky-200/70 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Partner Offer
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>

          {/* CTA & Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
            <Link
              to="/shop?category=smartphones"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-sky-500/20 hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Deals</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setDismissed(true)}
              title="Dismiss ad"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
