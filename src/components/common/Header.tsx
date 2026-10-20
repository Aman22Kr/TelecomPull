import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  MapPin,
  Phone,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  ShieldCheck,
  Truck,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../../data/mockData';

interface HeaderProps {
  onOpenPincodeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPincodeModal }) => {
  const navigate = useNavigate();
  const {
    cartCount,
    cartSubtotal,
    wishlist,
    compareList,
    pincode,
    pincodeCity,
    searchHistory,
    addSearchQuery,
    setIsCartDrawerOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search suggestions
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    addSearchQuery(searchQuery.trim());
    setIsSearchFocused(false);
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectSuggestion = (productId: string, productName: string) => {
    addSearchQuery(productName);
    setIsSearchFocused(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-200">
      {/* 1. Top Mini Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="flex items-center gap-1.5 font-medium text-sky-400 flex-shrink-0">
              <Truck className="w-3.5 h-3.5 text-sky-400" />
              <span>Free Express Delivery over ₹999</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Genuine Brand Warranty • JioMart Digital Partner</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 flex-shrink-0">
            <Link to="/track-order" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Track Order</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-sky-400" />
              <span className="hidden sm:inline">Support:</span>
              <span className="font-semibold text-white">+91 98712 34567</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="font-extrabold text-xl tracking-tighter">TP</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                    Telecom<span className="text-sky-600">Pull</span>
                  </span>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hidden sm:block">
                  Mobiles • Electronics • Telecom
                </p>
              </div>
            </Link>
          </div>

          {/* Delivery Pincode Selector */}
          <button
            onClick={onOpenPincodeModal}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer group"
          >
            <MapPin className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
            <div className="text-[11px] leading-tight">
              <p className="text-slate-500">Deliver to</p>
              <p className="font-bold text-slate-800">{pincodeCity} ({pincode})</p>
            </div>
          </button>

          {/* Global Search Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xl mx-2 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search iPhones, Galaxy S25, laptops, optical meters, remotes..."
                className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-full border border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all outline-none"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1 px-4 py-1.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Search
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim() ? (
                  searchResults.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Matching Products ({searchResults.length})
                      </div>
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSelectSuggestion(product.id, product.name)}
                          className="w-full px-4 py-2 flex items-center justify-between hover:bg-sky-50/70 transition-colors text-left text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-9 h-9 object-cover rounded-lg border border-slate-200"
                            />
                            <div>
                              <p className="font-medium text-slate-800 line-clamp-1">{product.name}</p>
                              <p className="text-xs text-slate-400">{product.brand} • {product.category}</p>
                            </div>
                          </div>
                          <span className="font-bold text-sky-600 text-sm whitespace-nowrap">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </button>
                      ))}
                      <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                        <button
                          onClick={handleSearchSubmit}
                          className="text-xs font-semibold text-sky-600 hover:underline flex items-center justify-center gap-1 mx-auto"
                        >
                          <span>View all results for "{searchQuery}"</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No matching products found for "<span className="font-medium text-slate-700">{searchQuery}</span>".
                    </div>
                  )
                ) : (
                  <div className="p-4 space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Recent Searches
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((query, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchQuery(query);
                            navigate(`/shop?search=${encodeURIComponent(query)}`);
                            setIsSearchFocused(false);
                          }}
                          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 text-xs transition-colors"
                        >
                          {query}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Trending Categories
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.slice(0, 4).map((c) => (
                          <Link
                            key={c.id}
                            to={`/category/${c.slug}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="p-2 rounded-lg border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 flex items-center gap-2 text-xs font-medium text-slate-700 transition-colors"
                          >
                            <span className="w-2 h-2 rounded-full bg-sky-500" />
                            <span>{c.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Compare */}
            <Link
              to="/compare"
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5"
              title="Compare Devices"
            >
              <Scale className="w-5 h-5 text-slate-700" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {compareList.length}
                </span>
              )}
              <span className="text-xs font-semibold hidden xl:inline">Compare</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
              <span className="text-xs font-semibold hidden xl:inline">Wishlist</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-sky-600">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <p className="text-sky-200 text-[10px]">My Cart</p>
                <p className="font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search smartphones, accessories, tools..."
              className="w-full pl-9 pr-20 py-2 text-xs bg-slate-100 rounded-full border border-slate-200 outline-none focus:bg-white focus:border-sky-500"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <button
              type="submit"
              className="absolute right-1 top-1 px-3 py-1 rounded-full bg-sky-600 text-white text-[10px] font-bold"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 3. Category Navigation Bar (Desktop) */}
      <nav className="hidden lg:block border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 text-xs font-semibold text-slate-700 py-1.5 overflow-x-auto no-scrollbar">
            <li>
              <Link
                to="/shop"
                className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-sky-600 hover:shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>All Products</span>
              </Link>
            </li>

            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-sky-600 hover:shadow-sm transition-all whitespace-nowrap flex items-center gap-1"
                >
                  {cat.slug === 'telecom-tools' && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />}
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}

            <li className="ml-auto flex items-center gap-2">
              <Link
                to="/emi-calculator"
                className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-white transition-all flex items-center gap-1"
              >
                <Calculator className="w-3.5 h-3.5 text-sky-600" />
                <span>EMI Calculator</span>
              </Link>

              <Link
                to="/services"
                className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-white transition-all flex items-center gap-1"
              >
                <span>Repairs & B2B</span>
              </Link>

              <Link
                to="/shop?filter=deals"
                className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 hover:bg-amber-500 hover:text-white font-bold transition-all flex items-center gap-1"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Flash Deals</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPincodeModal();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Deliver to <strong>{pincodeCity} ({pincode})</strong></span>
              </div>
              <span className="text-sky-600 font-semibold">Change</span>
            </button>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-800 text-xs font-semibold"
                >
                  All Products
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-800 text-xs font-semibold"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <Link
                to="/compare"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 font-medium"
              >
                <span className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-slate-500" />
                  Compare Devices
                </span>
                <span className="text-slate-400">{compareList.length} items</span>
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 font-medium"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-slate-500" />
                  My Wishlist
                </span>
                <span className="text-slate-400">{wishlist.length} saved</span>
              </Link>

              <Link
                to="/emi-calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-medium"
              >
                <Calculator className="w-4 h-4 text-sky-600" />
                EMI Calculator
              </Link>

              <Link
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-medium"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                Repairs & B2B Wholesale
              </Link>

              <Link
                to="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-medium"
              >
                <Truck className="w-4 h-4 text-sky-600" />
                Track Order
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-medium"
              >
                About TelecomPull
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 font-medium"
              >
                Contact & Store Locations
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
