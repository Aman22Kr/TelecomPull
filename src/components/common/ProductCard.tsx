import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, Scale, Sparkles, Check } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, wishlist, toggleWishlist, compareList, addToCompare, removeFromCompare } = useApp();

  const isSaved = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Approximate 6-month No Cost EMI calculation
  const emiPerMonth = Math.round(product.price / 6);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product.id);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* 1. Image & Badges Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-extrabold tracking-wide shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isRefurbished && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Certified Refurbished</span>
            </span>
          )}
          {product.isDeal && !product.isRefurbished && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold shadow-sm">
              FLASH DEAL
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            aria-label="Add to wishlist"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              isSaved
                ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
                : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Compare */}
          <button
            onClick={handleCompareClick}
            aria-label="Compare device"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              isCompared
                ? 'bg-sky-600 text-white hover:bg-sky-700'
                : 'bg-white/90 text-slate-600 hover:text-sky-600 hover:bg-white'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>

          {/* Quick View */}
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick preview"
              className="w-8 h-8 rounded-full bg-white/90 text-slate-600 hover:text-sky-600 hover:bg-white flex items-center justify-center transition-all shadow-md sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain object-center transform transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* 2. Product Meta & Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1.5">
            <span className="uppercase tracking-wider font-bold text-sky-700">{product.brand}</span>
            <span>{product.subcategory}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="font-bold text-slate-900 text-sm sm:text-base leading-snug hover:text-sky-600 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-current text-emerald-600" />
            </div>
            <span className="text-xs text-slate-400">({product.reviewCount})</span>
          </div>

          {/* Price block */}
          <div className="mt-3 flex items-baseline gap-2 flex-wrap">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* No-cost EMI preview */}
          {product.price > 4000 && (
            <p className="text-[11px] font-medium text-slate-600 mt-1">
              EMI from <strong className="text-sky-600">₹{emiPerMonth.toLocaleString('en-IN')}/mo</strong>
            </p>
          )}
        </div>

        {/* 3. Add to Cart / Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-sky-500/20"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
