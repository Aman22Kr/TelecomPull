import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const category = CATEGORIES.find((c) => c.slug === slug) || {
    id: 'cat-custom',
    name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') : 'Category',
    slug: slug || 'general',
    iconName: 'Cpu',
    description: 'Browse top-rated devices and accessories backed by TelecomPull warranty.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    itemCount: 15,
    featuredBrands: ['Apple', 'Samsung', 'Sony', 'TelecomPull Pro']
  };

  // Products in category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (slug === 'refurbished') return p.isRefurbished;
      return p.category === slug;
    });
  }, [slug]);

  // Unique brands in this category
  const brands = useMemo(() => {
    const s = new Set<string>();
    categoryProducts.forEach((p) => s.add(p.brand));
    return Array.from(s);
  }, [categoryProducts]);

  const displayedProducts = useMemo(() => {
    return categoryProducts
      .filter((p) => selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase())
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [categoryProducts, selectedBrand, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: category.name }
        ]}
      />

      {/* Hero Category Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 text-white p-6 sm:p-10 shadow-xl border border-sky-800/40">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Authorized Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {category.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {category.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-sky-200">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Genuine Sealed Stock
            </span>
            <span>•</span>
            <span>Pan-India 24-48h Dispatch</span>
            <span>•</span>
            <span>No-Cost EMI Available</span>
          </div>
        </div>
      </div>

      {/* Controls & Brands Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        {/* Brand Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Brand:</span>
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedBrand === 'all'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedBrand.toLowerCase() === b.toLowerCase()
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
          <span className="text-slate-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-800">No products found in this category</h3>
          <p className="text-xs text-slate-500">Browse other departments or view our full catalog.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow-md"
          >
            <span>Go to Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title={`Special TelecomPull Deal on ${category.name}`}
        subtitle="Enjoy instant cashback + 6-month screen protection included with every purchase this week."
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
