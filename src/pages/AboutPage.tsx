import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Store,
  Truck,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { STORE_LOCATIONS } from '../data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'About TelecomPull' }]} />

      {/* Hero Story Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 text-white p-6 sm:p-12 shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founded in 2014 • Over 12 Years of Electronics Excellence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Pioneering India's Multi-Brand Electronics & Telecom Distribution
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Originally established as Vipul Telecom in the bustling electronics hub of New Delhi in 2014, TelecomPull has grown into one of India's most trusted online and brick-and-mortar technology networks, connecting hundreds of thousands of retail consumers and telecom field engineers with authentic hardware.
          </p>
        </div>
      </div>

      {/* Key Milestones & Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-black text-sky-600">12+ Years</p>
          <p className="text-xs font-bold text-slate-700">Market Presence</p>
          <p className="text-[11px] text-slate-400">Serving India Since 2014</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-black text-sky-600">50,000+</p>
          <p className="text-xs font-bold text-slate-700">Satisfied Customers</p>
          <p className="text-[11px] text-slate-400">Retail & Telecom Pros</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-black text-sky-600">19,000+</p>
          <p className="text-xs font-bold text-slate-700">Pincodes Served</p>
          <p className="text-[11px] text-slate-400">Pan-India Express Logistics</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-black text-sky-600">100%</p>
          <p className="text-xs font-bold text-slate-700">Authentic Stock</p>
          <p className="text-[11px] text-slate-400">Official Brand Tax Invoice</p>
        </div>
      </div>

      {/* Mission & Heritage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Our Mission & Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Democratizing Technology Access Across Metro & Regional India
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At TelecomPull, we believe that premium technology should be accompanied by absolute transparency. Whether you are buying the newest Apple iPhone flagship, financing a student MacBook on No-Cost EMI, or sourcing optical fiber test meters for FTTH infrastructure, we ensure factory-sealed products backed by legitimate manufacturer warranties.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            As an authorized JioMart Digital Partner, our retail and distribution networks span Delhi NCR, Maharashtra, and Gujarat, allowing us to maintain robust inventory, competitive pricing, and swift delivery times.
          </p>

          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Zero Gray-Market or Tampered Goods</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Full GST Invoices with Input Tax Credit</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Transparent 7-Day Replacement Guarantee</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-4/3">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
            alt="TelecomPull Store and Electronics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
            <div>
              <p className="text-xs font-semibold text-sky-300">New Delhi Flagship Hub</p>
              <p className="text-base font-bold">Showcasing the latest in tech & telecom</p>
            </div>
          </div>
        </div>
      </div>

      {/* Physical Store Hubs */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Physical Experience Stores
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Visit Our Retail & Distribution Centers
          </h3>
          <p className="text-xs text-slate-500">
            Prefer hands-on inspection before buying? Walk into any of our flagship centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                    {store.isFlagship ? 'Flagship Store' : 'Regional Hub'}
                  </span>
                  <Store className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">{store.name}</h4>
                <p className="text-xs text-slate-600">{store.address}</p>
                <p className="text-xs text-slate-500">
                  {store.city}, {store.state} - {store.pincode}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <p><strong>Phone:</strong> {store.phone}</p>
                <p><strong>Email:</strong> {store.email}</p>
                <p><strong>Hours:</strong> {store.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering & Attribution */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-lg">Engineered for Seamless Performance</h4>
          <p className="text-xs text-slate-400">
            Recreated with high responsiveness, offline localStorage resilience, and GitHub Actions CI/CD.
          </p>
          <p className="text-xs text-sky-400 font-semibold pt-1">
            GitHub Developer: Aman22kr
          </p>
        </div>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Student & Educator Advantage"
        subtitle="Get an extra ₹3,000 instant discount on Apple MacBooks and iPads with verified institutional ID."
      />
    </div>
  );
};
