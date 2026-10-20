import React, { useState } from 'react';
import { Calculator, CreditCard, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { Link } from 'react-router-dom';

export const EmiCalculatorPage: React.FC = () => {
  const [productPrice, setProductPrice] = useState<number>(75000);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0); // 0% for No-Cost EMI
  const [tenureMonths, setTenureMonths] = useState<number>(6);

  // EMI formula calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const principal = Math.max(0, productPrice - downPayment);
  let monthlyEmi = 0;
  let totalInterest = 0;
  let totalAmountPayable = principal;

  if (interestRate === 0) {
    monthlyEmi = Math.round(principal / (tenureMonths || 1));
    totalInterest = 0;
    totalAmountPayable = principal;
  } else {
    const monthlyRate = interestRate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEmi = Math.round((principal * monthlyRate * factor) / (factor - 1));
    totalAmountPayable = monthlyEmi * tenureMonths;
    totalInterest = Math.max(0, totalAmountPayable - principal);
  }

  const partnerBanks = [
    { name: 'HDFC Bank', scheme: 'No-Cost EMI up to 12 Months', minAmount: '₹5,000' },
    { name: 'Bajaj Finserv', scheme: '0% Down Payment Instant Approval', minAmount: '₹4,500' },
    { name: 'ICICI Bank', scheme: 'Instant Cardless & Credit Card EMI', minAmount: '₹5,000' },
    { name: 'SBI Cards', scheme: 'Low Processing Fee EMI', minAmount: '₹5,000' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'No-Cost EMI Calculator' }]} />

      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          <span>Transparent Finance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Electronics & Smartphone EMI Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          Estimate your exact monthly installments across leading credit cards, debit cards, and consumer finance providers at TelecomPull.
        </p>
      </div>

      {/* Calculator Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Product Price</span>
              <span className="text-base font-extrabold text-sky-600">
                ₹{productPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={250000}
              step={1000}
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹5,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Down Payment (Optional)</span>
              <span className="text-base font-extrabold text-slate-800">
                ₹{downPayment.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={productPrice}
              step={1000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹0 (Zero Down)</span>
              <span>₹{productPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Tenure Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Tenure (Duration):</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[3, 6, 9, 12, 18, 24].map((m) => (
                <button
                  key={m}
                  onClick={() => setTenureMonths(m)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    tenureMonths === m
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m} Months
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate Type Toggle */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Interest Offer:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInterestRate(0)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  interestRate === 0
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <p className="font-bold text-emerald-700">0% No-Cost EMI</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Interest subsidized by TelecomPull</p>
              </button>

              <button
                onClick={() => setInterestRate(14)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  interestRate > 0
                    ? 'border-sky-500 bg-sky-50 text-sky-950 ring-2 ring-sky-200'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <p className="font-bold text-sky-700">Standard Card EMI (14% p.a.)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Standard bank consumer interest</p>
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 text-white p-6 sm:p-8 shadow-xl border border-sky-800/40 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Estimated Monthly Installment
            </span>

            <div>
              <span className="text-3xl sm:text-5xl font-black text-white">
                ₹{monthlyEmi.toLocaleString('en-IN')}
              </span>
              <span className="text-slate-300 text-xs sm:text-sm font-medium ml-2">/ month</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-sky-800/60 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Financed Loan Amount:</span>
                <span className="font-bold text-white">₹{principal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tenure Duration:</span>
                <span className="font-bold text-white">{tenureMonths} Months</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Interest Payable:</span>
                <span className="font-bold text-emerald-400">
                  {totalInterest === 0 ? '₹0 (Zero Interest)' : `₹${totalInterest.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between text-white font-extrabold text-sm pt-2 border-t border-sky-800/60">
                <span>Total Amount Payable:</span>
                <span>₹{(totalAmountPayable + downPayment).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              to="/shop"
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/30"
            >
              <span>Explore EMI Eligible Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Partner Bank Offers List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-sky-600" />
              <span>Available Bank EMI Schemes</span>
            </h4>
            <div className="space-y-2 text-xs">
              {partnerBanks.map((b) => (
                <div
                  key={b.name}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-800">{b.name}</p>
                    <p className="text-[11px] text-slate-500">{b.scheme}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    Min {b.minAmount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="Zero Processing Fee EMI Festival at TelecomPull"
        subtitle="Swipe your HDFC or ICICI Card and get upfront interest waiver on all orders over ₹15,000."
      />
    </div>
  );
};
