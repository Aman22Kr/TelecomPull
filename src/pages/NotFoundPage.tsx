import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight, Smartphone, Radio } from 'lucide-react';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      <div className="space-y-3">
        <span className="text-6xl sm:text-8xl font-black text-sky-600 tracking-tighter">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          The link you followed may be broken or the product may have been relocated. Let's get you back to discovering great electronics!
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Browse All Products</span>
        </Link>
      </div>

      <div className="pt-8 border-t border-slate-200 max-w-lg mx-auto">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Popular Destinations
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <Link
            to="/category/smartphones"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 font-semibold transition-colors flex items-center justify-between"
          >
            <span>5G Smartphones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/category/telecom-tools"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 font-semibold transition-colors flex items-center justify-between"
          >
            <span>Telecom & Remotes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder />
    </div>
  );
};
