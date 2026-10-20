import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { Shield, FileText, RotateCcw, Lock } from 'lucide-react';

export const TermsPrivacyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'shipping'>('terms');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Legal, Terms & Policies' }]} />

      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service & Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Last updated: October 2026 • TelecomPull (formerly Vipul Telecom, Est. 2014)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'terms' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'privacy' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'shipping' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>7-Day Replacement & Shipping</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm max-w-4xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h3>
            <p>
              By accessing and purchasing from TelecomPull (operated as TelecomPull / Vipul Telecom), you agree to be bound by these Terms of Service and applicable Indian commercial e-commerce regulations under the Information Technology Act.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">2. Genuine Products & Pricing</h3>
            <p>
              All products listed on TelecomPull are 100% genuine brand originals sourced directly from authorized manufacturer distribution channels. Prices are displayed in Indian Rupees (INR) and are inclusive of standard GST unless specifically designated as B2B pre-tax rates.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">3. No-Cost EMI & Bank Offers</h3>
            <p>
              No-Cost EMI arrangements are facilitated via our partner banks (HDFC, ICICI, SBI, Bajaj Finserv). The upfront merchant discount covers the bank interest charge. Processing fees charged by respective banks remain subject to their individual cardholder agreements.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">1. Data Collection & Usage</h3>
            <p>
              We collect information necessary to fulfill your electronic orders, including your name, delivery address, phone number, and GSTIN (for tax invoicing). We strictly never sell or trade your personal data to external advertisers.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">2. LocalStorage Architecture</h3>
            <p>
              TelecomPull client-side features (such as shopping cart, wishlist, recently viewed products, and address draft) utilize browser localStorage for fast, resilient performance without tracking sensitive financial credentials.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">3. Payment Security</h3>
            <p>
              All checkout payment transactions are handled through PCI-DSS Level 1 compliant secure gateways using 256-bit SSL encryption. TelecomPull does not store credit card numbers or UPI PINs.
            </p>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">1. Pan-India Delivery Coverage</h3>
            <p>
              We ship across 19,000+ Indian postal codes through premier express courier partners (Blue Dart, Delhivery Express, DTDC). Metro deliveries typically complete in 24 to 48 hours.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">2. 7-Day Replacement Guarantee</h3>
            <p>
              If your delivered item is physically damaged in transit or possesses a verifiable out-of-box hardware defect, notify us within 7 days of delivery for free doorstep pickup and prompt brand replacement.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">3. Refurbished Tech Warranty</h3>
            <p>
              Certified Pre-Owned / Refurbished devices come with a full 12-Month TelecomPull Warranty covering hardware faults, backed by our in-house engineering team.
            </p>
          </div>
        )}
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull 100% Buyer Protection"
        subtitle="Enjoy zero-risk shopping with tamper-proof delivery, open-box delivery on flagships, and dedicated support."
      />
    </div>
  );
};
