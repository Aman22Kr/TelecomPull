import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    removeFromCart,
    updateQuantity,
    isCartDrawerOpen,
    setIsCartDrawerOpen
  } = useApp();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-base">Shopping Cart ({cartCount})</h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-sky-950 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sky-600" />
                {amountNeededForFreeShipping === 0 ? (
                  <strong className="text-emerald-700">Congratulations! Free Express Shipping unlocked!</strong>
                ) : (
                  <span>
                    Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for FREE Shipping!
                  </span>
                )}
              </span>
              <span className="font-bold text-sky-700">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1.5 bg-sky-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explore our latest smartphones, laptops, audio gear, and telecom accessories!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-600/20"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}-${index}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-semibold text-slate-900 text-xs sm:text-sm hover:text-sky-600 line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedStorage)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedStorage && <span>• {item.selectedStorage}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedStorage)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedStorage)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Shipping</span>
                  <span>{cartDeliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${cartDeliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="w-full py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-xs font-semibold transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
