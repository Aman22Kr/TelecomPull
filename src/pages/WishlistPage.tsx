import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      {/* Header */}
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>My Wishlist</span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              {savedProducts.length} items
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Products you have bookmarked for future purchases or price drop alerts.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <Link
            to="/shop"
            className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Wishlist Items Grid */}
      {savedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Your wishlist is currently empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any product in our catalog to save it for easy access later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-square p-4 bg-slate-50 flex items-center justify-center">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white text-rose-500 hover:bg-rose-50 shadow-sm transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="block font-bold text-slate-900 text-sm hover:text-sky-600 line-clamp-2 mt-0.5"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Price Drop Guarantee"
        subtitle="Saved an item? If the price drops within 14 days of your purchase, we refund the difference!"
      />
    </div>
  );
};
