import React, { useState } from 'react';
import {
  Wrench,
  Cpu,
  Radio,
  Building2,
  CheckCircle2,
  Send,
  ShieldCheck,
  Truck,
  FileText,
  PhoneCall
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { showToast } = useApp();

  const [serviceType, setServiceType] = useState('repair');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    deviceOrProduct: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please fill in required name and phone number', 'warning');
      return;
    }
    showToast('Inquiry submitted! Our technical team will call you within 2 hours.', 'success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      deviceOrProduct: '',
      details: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Repairs & B2B Wholesale' }]} />

      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 text-white p-6 sm:p-10 shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Wrench className="w-4 h-4" />
            <span>Authorized Technical Lab & Bulk Distribution</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Electronics Repair & B2B Telecom Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From precision smartphone screen and battery replacements to bulk enterprise supply of optical fiber meters, universal remotes, and corporate laptop fleets.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Express Device Repair</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Same-day screen replacement, certified OEM battery swaps, and chip-level motherboard diagnostics for iPhones, iPads, and Android flagships.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500 pt-2">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>90-Day Repair Warranty</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free Diagnostic Inspection</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Doorstep Pickup in Delhi & Mumbai</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setServiceType('repair')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-sky-700 font-bold text-xs transition-colors"
          >
            Book Repair Service
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">B2B Telecom Equipment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct wholesale distribution of optical power meters, visual fault locators (VFL), splicing machine accessories, and AC / TV universal remotes.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500 pt-2">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tiered Bulk Quantity Discounts</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>GST Tax Credit Compliant Invoices</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supply contracts for ISP contractors</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setServiceType('wholesale')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-sky-700 font-bold text-xs transition-colors"
          >
            Request Wholesale Quote
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Corporate IT Procurement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equip your workforce with Apple MacBooks, Dell workstations, monitors, and meeting room displays with zero hassle.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500 pt-2">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enterprise Leasing & Credit Lines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Custom Device MDM Configuration</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dedicated Corporate Account Manager</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setServiceType('corporate')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-sky-700 font-bold text-xs transition-colors"
          >
            Inquire Corporate Fleet
          </button>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Direct Technical Inquiry
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Submit a Service or Wholesale Request
          </h3>
          <p className="text-xs text-slate-500">
            Our specialized engineers and corporate accounts team respond within 2 working hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700">Your Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rohan Sharma"
                className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rohan@company.com"
                className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">Company / Store Name (Optional)</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="ABC Telecom Solutions"
                className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700">Service Category</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500 bg-white"
            >
              <option value="repair">Mobile & Laptop Repair Booking</option>
              <option value="wholesale">B2B Wholesale Telecom Tools & Remotes</option>
              <option value="corporate">Corporate Device Procurement & Gifting</option>
              <option value="exchange">Bulk Device Exchange & Buyback</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700">Requirements or Device Issue</label>
            <textarea
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Describe your device model, fault symptoms, or bulk quantity needed..."
              className="w-full mt-1 p-3 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Technical Request</span>
          </button>
        </form>
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Authorized Service Guarantee"
        subtitle="Only genuine manufacturer components used in all repairs, backed by our 90-day parts shield."
      />
    </div>
  );
};
