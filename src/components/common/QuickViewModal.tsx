import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, wishlist, toggleWishlist } = useApp();

  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageVariants?.[0]?.capacity || ''
  );

  const isSaved = wishlist.includes(product.id);

  // Compute price with storage variant diff
  let currentPrice = product.price;
  if (selectedStorage && product.storageVariants) {
    const variant = product.storageVariants.find((v) => v.capacity === selectedStorage);
    if (variant) currentPrice += variant.priceDiff;
  }

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor, selectedStorage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Image Column */}
        <div className="w-full md:w-1/2 p-6 bg-slate-50 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="w-full aspect-square flex items-center justify-center p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 max-w-full">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl border-2 p-1 bg-white flex-shrink-0 transition-all ${
                    selectedImage === img ? 'border-sky-600 shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{product.subcategory}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-current text-emerald-600" />
              </div>
              <span className="text-xs text-slate-500">{product.reviewCount} verified reviews</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > currentPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {product.discountPercent}% Off
                </span>
              )}
            </div>

            {/* Color variants if present */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Color: <span className="text-sky-600 font-semibold">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-2 ${
                        selectedColor === c.name
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-200'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage capacity variants if present */}
            {product.storageVariants && product.storageVariants.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">Configuration / Storage:</p>
                <div className="flex flex-wrap gap-2">
                  {product.storageVariants.map((v) => (
                    <button
                      key={v.capacity}
                      onClick={() => setSelectedStorage(v.capacity)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedStorage === v.capacity
                          ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {v.capacity}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features preview */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-700 mb-1.5">Key Highlights:</p>
              <ul className="space-y-1">
                {product.keyFeatures.slice(0, 3).map((feat, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isSaved ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors text-center"
            >
              Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
