import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  Search,
  Star,
  Check,
  X
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameter sync
  const categoryParam = searchParams.get('category') || 'all';
  const brandParam = searchParams.get('brand') || 'all';
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState<string>(brandParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [refurbishedOnly, setRefurbishedOnly] = useState<boolean>(filterParam === 'refurbished');
  const [dealsOnly, setDealsOnly] = useState<boolean>(filterParam === 'deals');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    PRODUCTS.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet);
  }, []);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesTags) return false;
      }
      // Max price
      if (product.price > maxPrice) return false;
      // Min rating
      if (product.rating < minRating) return false;
      // In stock
      if (inStockOnly && !product.inStock) return false;
      // Refurbished only
      if (refurbishedOnly && !product.isRefurbished) return false;
      // Deals only
      if (dealsOnly && !product.isDeal) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedBrand,
    searchQuery,
    maxPrice,
    minRating,
    inStockOnly,
    refurbishedOnly,
    dealsOnly,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setMinRating(0);
    setMaxPrice(250000);
    setInStockOnly(false);
    setRefurbishedOnly(false);
    setDealsOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    searchQuery !== '' ||
    minRating > 0 ||
    maxPrice < 250000 ||
    inStockOnly ||
    refurbishedOnly ||
    dealsOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Shop All Products' }]} />

      {/* Page Title & Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Electronics & Telecom Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> authentic products
          </p>
        </div>

        {/* View mode & Sorting controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Mobile Filter toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Filter className="w-4 h-4 text-sky-600" />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="featured">Featured & Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Biggest Discount %</option>
            </select>
          </div>

          {/* Grid / List switch */}
          <div className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-400'}`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-400'}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 py-2">
          <span className="text-xs font-bold text-slate-500">Active Filters:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-medium border border-sky-200">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')}>
                <X className="w-3 h-3 text-sky-600 hover:text-sky-900" />
              </button>
            </span>
          )}
          {selectedBrand !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-medium border border-sky-200">
              Brand: {selectedBrand}
              <button onClick={() => setSelectedBrand('all')}>
                <X className="w-3 h-3 text-sky-600 hover:text-sky-900" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-medium border border-sky-200">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>
                <X className="w-3 h-3 text-sky-600 hover:text-sky-900" />
              </button>
            </span>
          )}
          {refurbishedOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
              Refurbished Only
              <button onClick={() => setRefurbishedOnly(false)}>
                <X className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
              </button>
            </span>
          )}
          {dealsOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
              Deals Only
              <button onClick={() => setDealsOnly(false)}>
                <X className="w-3 h-3 text-rose-600 hover:text-rose-900" />
              </button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-rose-600 hover:underline font-semibold ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-slate-200 h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Filter Catalog</span>
            </h3>
            {hasActiveFilters && (
              <button onClick={handleResetFilters} className="text-xs text-slate-500 hover:text-rose-600">
                Reset
              </button>
            )}
          </div>

          {/* Search Filter input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Keyword Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model, spec, keyword..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Category</label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === 'all' ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Departments
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-slate-400">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Brand</label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                  selectedBrand === 'all'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {allBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    selectedBrand.toLowerCase() === brand.toLowerCase()
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Max Budget</span>
              <span className="font-extrabold text-sky-600">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={250000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Minimum Rating</label>
            <div className="space-y-1">
              {[4.5, 4.0, 3.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(minRating === rate ? 0 : rate)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    minRating === rate ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span>{rate} Stars & above</span>
                  </span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Checkbox Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-sky-600 focus:ring-sky-500"
              />
              <span>In-Stock Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={refurbishedOnly}
                onChange={(e) => setRefurbishedOnly(e.target.checked)}
                className="rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Refurbished (Grade A+) Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={dealsOnly}
                onChange={(e) => setDealsOnly(e.target.checked)}
                className="rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Flash Deals Only</span>
            </label>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No products match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing some filters or search for another keyword to discover our full inventory.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="Upgrade to Next-Gen 5G with TelecomPull Assured Trade-In"
        subtitle="Bring any old mobile phone and walk away with instant store credit up to ₹12,000 towards your new device."
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
