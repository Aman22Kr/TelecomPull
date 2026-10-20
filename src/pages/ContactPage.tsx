import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Store,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { STORE_LOCATIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in required fields', 'warning');
      return;
    }
    showToast('Your message has been sent! Our customer team will respond shortly.', 'success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'general',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Contact & Store Locations' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          We Are Here To Assist You
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with TelecomPull
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have an inquiry regarding flagship smartphone availability, optical test meters, corporate volume orders, or order status? Reach out to our dedicated support desks.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Direct Phone Support</h3>
          <p className="text-xs text-slate-500">
            Reach our central customer service desk 7 days a week:
          </p>
          <div className="space-y-1 text-xs font-bold text-slate-800 pt-1">
            <p>+91 98712 34567 (Mobile / WhatsApp)</p>
            <p>011-28754120 (Delhi Landline)</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Email Inquiries</h3>
          <p className="text-xs text-slate-500">
            For retail support, order assistance, or wholesale inquiries:
          </p>
          <div className="space-y-1 text-xs font-bold text-slate-800 pt-1">
            <p>support@telecompull.com</p>
            <p>wholesale@telecompull.com</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Working Hours</h3>
          <p className="text-xs text-slate-500">
            Online dispatch operates continuously; store retail hours:
          </p>
          <div className="space-y-1 text-xs font-bold text-slate-800 pt-1">
            <p>Monday - Sunday: 10:30 AM - 8:30 PM</p>
            <p className="text-emerald-600">Open on National Holidays</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Interactive Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-lg">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-500">Fill in the form below and our team will get back to you promptly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aman Verma"
                  className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aman@example.com"
                  className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-sky-500 bg-white"
                >
                  <option value="general">Product Inquiry / Availability</option>
                  <option value="order">Order Tracking & Delivery</option>
                  <option value="wholesale">B2B Wholesale / Bulk Orders</option>
                  <option value="repair">Device Repair Assistance</option>
                  <option value="other">Other Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700">Your Message *</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let us know how we can help you..."
                className="w-full mt-1 p-3 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Inquiry Message</span>
            </button>
          </form>
        </div>

        {/* Map Layout & Location Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Map Placeholder Layout */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white aspect-4/3 flex flex-col justify-between p-6 shadow-md">
            {/* Map grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                FLAGSHIP STORE MAP
              </span>
              <span className="text-xs text-slate-300">New Delhi Hub</span>
            </div>

            <div className="relative z-10 text-center space-y-2 my-auto">
              <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/40 animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">Karol Bagh Electronics Hub</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Shop No. 14-16, Electronics Market Complex, Gaffar Market Area, New Delhi 110005
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Nearest Metro: Karol Bagh (Blue Line)</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Regional Hubs quick list */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Other Regional Stores</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Mumbai West Hub</p>
                <p className="text-slate-500">Unit 4, Lamington Road Tech Arcade, Grant Road East, Mumbai 400007</p>
                <p className="text-slate-700 mt-1"><strong>Tel:</strong> +91 98201 98765</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Gujarat Regional Hub</p>
                <p className="text-slate-500">Opposite Central Bus Station, Himatnagar, Sabarkantha 383001</p>
                <p className="text-slate-700 mt-1"><strong>Tel:</strong> +91 94270 54321</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Business Trade Desk"
        subtitle="Need customized pricing for 10+ devices? Speak directly with our B2B account executives."
      />
    </div>
  );
};
