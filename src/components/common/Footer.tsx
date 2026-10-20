import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Send,
  Github,
  Award,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    showToast('Subscribed! Check your inbox for exclusive VIP tech deals.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* 1. Value Proposition Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Brand Warranty</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct authorized retail stock with official manufacturer invoice & nationwide coverage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Pan-India Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Free shipping on orders above ₹999. Fast 24-48h dispatch across 19,000+ pincodes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">No-Cost EMI Options</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                0% interest monthly installments with major credit cards, debit cards, and Bajaj Finserv.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Day Replacement Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hassle-free replacement policy for defective units, backed by prompt customer care.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                TP
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Telecom<span className="text-sky-400">Pull</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Established in 2014 (formerly Vipul Telecom), TelecomPull is one of India's premier multi-brand retail and e-commerce destinations for smartphones, laptops, audio gear, telecom tools, and certified refurbished electronics.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>JioMart Digital Partner • Authorized Multi-Brand Dealer</span>
            </div>

            <div className="pt-2">
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email for VIP tech deals"
                  className="w-full px-4 py-2 text-xs bg-slate-900 border border-slate-700 rounded-l-xl text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-r-xl text-xs font-semibold flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Top Categories</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/category/smartphones" className="text-slate-400 hover:text-white transition-colors">
                  5G Smartphones
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="text-slate-400 hover:text-white transition-colors">
                  Laptops & MacBooks
                </Link>
              </li>
              <li>
                <Link to="/category/audio" className="text-slate-400 hover:text-white transition-colors">
                  ANC Headphones & TWS
                </Link>
              </li>
              <li>
                <Link to="/category/smart-tvs" className="text-slate-400 hover:text-white transition-colors">
                  4K OLED Smart TVs
                </Link>
              </li>
              <li>
                <Link to="/category/telecom-tools" className="text-slate-400 hover:text-white transition-colors">
                  Optical Tools & Remotes
                </Link>
              </li>
              <li>
                <Link to="/category/refurbished" className="text-slate-400 hover:text-white transition-colors">
                  Certified Refurbished (Grade A+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Tools */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Help & Services</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/track-order" className="text-slate-400 hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-slate-400 hover:text-white transition-colors">
                  Device Comparison Matrix
                </Link>
              </li>
              <li>
                <Link to="/emi-calculator" className="text-slate-400 hover:text-white transition-colors">
                  No-Cost EMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Repairs & B2B Wholesale
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/terms-privacy" className="text-slate-400 hover:text-white transition-colors">
                  Terms & Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Headquarters & Stores</h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Shop 14-16, Electronics Complex, Karol Bagh, New Delhi 110005</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+91 98712 34567 / 011-28754120</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>support@telecompull.com</span>
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Stores Open 7 Days • 10 AM - 8:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar & Credit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-4 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center md:text-left">
          <p>© {new Date().getFullYear()} TelecomPull (formerly Vipul Telecom). All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <Github className="w-3.5 h-3.5" />
            <span>Built by </span>
            <a
              href="https://github.com/Aman22kr"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline font-semibold"
            >
              Aman22kr
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-xs">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-sky-400" />
            256-Bit SSL Encrypted
          </span>
          <span>•</span>
          <span>UPI / RuPay / Cards / EMI</span>
        </div>
      </div>
    </footer>
  );
};
