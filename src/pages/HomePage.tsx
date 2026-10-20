import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Cpu,
  Radio,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  ChevronRight,
  Star,
  CheckCircle2,
  Tag,
  Zap
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, TESTIMONIALS, BLOG_POSTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { YouTubePlaceholder } from '../components/common/YouTubePlaceholder';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'smartphones' | 'laptops' | 'audio'>('all');

  // Flash deal countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categoryIcons: Record<string, React.ReactNode> = {
    'cat-smartphones': <Smartphone className="w-6 h-6" />,
    'cat-laptops': <Laptop className="w-6 h-6" />,
    'cat-audio': <Headphones className="w-6 h-6" />,
    'cat-smart-tvs': <Tv className="w-6 h-6" />,
    'cat-accessories': <Cpu className="w-6 h-6" />,
    'cat-telecom-tools': <Radio className="w-6 h-6" />,
    'cat-refurbished': <Sparkles className="w-6 h-6" />
  };

  const flashDeals = PRODUCTS.filter((p) => p.isDeal);
  const filteredProducts = activeTab === 'all'
    ? PRODUCTS.filter((p) => p.isFeatured)
    : PRODUCTS.filter((p) => p.category === activeTab);

  const refurbishedProducts = PRODUCTS.filter((p) => p.isRefurbished);
  const telecomTools = PRODUCTS.filter((p) => p.category === 'telecom-tools');

  return (
    <div className="space-y-12 sm:space-y-16 pb-8">
      {/* 1. Hero Showcase Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white pt-8 pb-14 sm:pb-20 border-b border-sky-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>India's Trusted Electronics & Telecom Network</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Next-Gen Tech, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">
                  Unbeatable Prices.
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore the latest flagship smartphones, MacBooks, 4K TVs, and authorized telecom accessories. Enjoy instant No-Cost EMI, Pan-India Express delivery, and 100% brand warranty.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/category/telecom-tools"
                  className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold text-sm sm:text-base transition-all hover:border-sky-400/50 flex items-center gap-2"
                >
                  <Radio className="w-4 h-4 text-sky-400" />
                  <span>Telecom Tools & Remotes</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Brand Sealed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-sky-400" />
                  <span>0% Interest No-Cost EMI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>24-48h Express Shipping</span>
                </div>
              </div>
            </div>

            {/* Hero Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 p-6 shadow-2xl overflow-hidden group">
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black uppercase tracking-wider shadow-md">
                    HOT LAUNCH
                  </span>
                </div>

                <div className="text-left space-y-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Flagship Spotlight
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Apple iPhone 16 Pro</h3>
                  <p className="text-xs text-slate-300">Grade 5 Titanium • A18 Pro Chip • 48MP Fusion Camera</p>
                </div>

                <div className="aspect-square sm:aspect-4/3 overflow-hidden rounded-2xl bg-slate-950/60 p-4 flex items-center justify-center my-3">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                    alt="iPhone 16 Pro"
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400">Starting from</span>
                    <p className="text-2xl font-extrabold text-white">₹1,19,900</p>
                  </div>
                  <Link
                    to="/product/tp-phone-01"
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-sky-600/30"
                  >
                    <span>View Deal</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Browse Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Curated Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Shop by Department</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1">
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-sky-50 text-slate-700 group-hover:text-sky-600 border border-slate-100 group-hover:border-sky-200 flex items-center justify-center transition-colors">
                {categoryIcons[cat.id] || <Cpu className="w-6 h-6" />}
              </div>
              <div className="mt-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{cat.itemCount}+ Products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals Section with Countdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 p-6 sm:p-8 text-white shadow-xl border border-rose-900/40 relative overflow-hidden">
          {/* Header & Live Timer */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Limited Time Offers
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                <span>Mega Flash Deals</span>
                <Flame className="w-6 h-6 text-amber-400 fill-current" />
              </h3>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-300 font-medium mr-1">Deals End in:</span>
              <div className="flex items-center gap-1 font-mono text-sm font-bold text-white">
                <span className="px-2 py-0.5 rounded bg-rose-600">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="px-2 py-0.5 rounded bg-rose-600">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="px-2 py-0.5 rounded bg-rose-600">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {flashDeals.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. TelecomPull Legacy Spotlight: Telecom & Remote Accessories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-sky-950/30 border border-sky-800/30 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                <Radio className="w-4 h-4" />
                <span>Vipul Telecom Heritage & Specialty</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                Optical Telecom Tools & Universal Remotes
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Trusted by 5,000+ field technicians, cable operators, and repair centers across India.
              </p>
            </div>

            <Link
              to="/category/telecom-tools"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>View All Telecom Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {telecomTools.map((tool) => (
              <ProductCard
                key={tool.id}
                product={tool}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
            {/* Promo banner block for B2B */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-sky-900 text-white p-6 flex flex-col justify-between border border-sky-700/40">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  B2B WHOLESALE
                </span>
                <h4 className="text-lg font-bold">Bulk Telecom Supplies & GST Invoicing</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Get volume discounts on optical power meters, fiber patch cords, and universal AC remotes with 18% GST credit.
                </p>
              </div>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-sky-50 transition-colors"
              >
                <span>Request B2B Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabbed Product Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Featured Catalog</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Best Sellers & New Arrivals</h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {(['all', 'smartphones', 'laptops', 'audio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'all' ? 'All Featured' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. Certified Refurbished Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 p-6 sm:p-8 text-white border border-emerald-800/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Smart Savings • Eco Friendly
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Certified Refurbished (Grade A+)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                52-Point certified, like-new condition with 12 months full TelecomPull warranty.
              </p>
            </div>

            <Link
              to="/category/refurbished"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Explore Refurbished</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {refurbishedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. YouTube Video Review Showcase (Blank placeholder reproduction per specs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Video Demonstrations</span>
          <h3 className="text-2xl font-extrabold text-slate-900">Official Tech Reviews & Setup Guides</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Watch hands-on unboxings, optical meter calibration tutorials, and feature comparisons from our technical lab.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <YouTubePlaceholder
            title="TelecomPull Lab: iPhone 16 Pro & Optical Fiber Meter In-Depth Review"
            duration="05:42"
            caption="Comprehensive device tear-down, signal strength benchmarking & user guide"
          />
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Verified Reviews</span>
          <h3 className="text-2xl font-extrabold text-slate-900">What Our Customers Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{t.name}</h5>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Latest Tech Guides & Buyer Tips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Tech Journal</span>
            <h3 className="text-2xl font-extrabold text-slate-900">Buyer's Guides & Telecom Insights</h3>
          </div>
          <Link to="/about" className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1">
            <span>Learn More About Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              <div className="aspect-16/9 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-sky-600">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-sky-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Compact Advertisement Placeholder Section */}
      <AdPlaceholder
        title="TelecomPull Festive Upgrade Fest: Instant 10% Bank Discount"
        subtitle="Extra ₹2,500 off on Credit Card EMI + Free 100W GaN Fast Charger with every flagship smartphone."
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
