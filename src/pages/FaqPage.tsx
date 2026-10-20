import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { FAQS } from '../data/mockData';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Authenticity & Warranty', 'Payments & EMI', 'Shipping & Delivery', 'Refurbished & Pre-Owned', 'Telecom & Wholesale'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          Knowledge Base & Help Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Find instant answers to questions regarding product authenticity, No-Cost EMI calculations, shipping timelines, and refurbished device warranties.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. warranty, EMI, returns)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-xs sm:text-sm outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
        </div>
      </div>

      {/* Categories Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion FAQ list */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-semibold text-slate-700">No matching questions found.</p>
            <p className="text-xs text-slate-400 mt-1">Try another keyword or contact our support desk.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-sky-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                    <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60">
                      <span>Category: {faq.category}</span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Policy
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still need help CTA */}
      <div className="text-center p-6 bg-sky-50 rounded-3xl border border-sky-100 max-w-xl mx-auto space-y-2">
        <h4 className="font-bold text-slate-900 text-sm">Still have questions?</h4>
        <p className="text-xs text-slate-600">
          Our customer service team is available 7 days a week from 10:30 AM to 8:30 PM.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-block px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            Contact Customer Support
          </Link>
        </div>
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Express Doorstep Help"
        subtitle="Need on-site assistance with fiber tools or corporate laptop rollout? We provide expert technician visits."
      />
    </div>
  );
};
