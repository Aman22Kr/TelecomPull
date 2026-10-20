import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  Tag,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  CreditCard,
  QrCode,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    couponCode,
    couponDiscountAmount,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    pincode,
    pincodeCity,
    showToast
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  // Checkout form state
  const [shippingData, setShippingData] = useState({
    fullName: 'Aman Kumar',
    phone: '9876543210',
    pincode: pincode || '110001',
    addressLine: 'Flat 402, Skyline Towers, Outer Ring Road',
    city: pincodeCity || 'New Delhi',
    state: 'Delhi'
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'emi'>('upi');

  const freeShippingThreshold = 999;
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon.trim());
    setInputCoupon('');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.fullName || !shippingData.phone || !shippingData.addressLine) {
      showToast('Please fill in complete delivery details', 'warning');
      return;
    }

    const newOrder = createOrder({
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        image: i.product.image,
        price: i.price,
        quantity: i.quantity,
        color: i.selectedColor,
        storage: i.selectedStorage
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      shippingAddress: shippingData,
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI Instant (GPay / PhonePe / Paytm)'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card (Visa / Mastercard)'
          : paymentMethod === 'emi'
          ? 'No-Cost EMI (Pre-approved)'
          : 'Cash on Delivery (COD)'
    });

    setPlacedOrderId(newOrder.id);
    showToast(`Order #${newOrder.id} confirmed successfully!`, 'success');
  };

  if (placedOrderId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Placed Successfully
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Thank You For Your Order!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your order reference is <strong className="text-sky-600 font-mono text-base">{placedOrderId}</strong>. A confirmation SMS and GST invoice has been generated.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2">
          <p className="text-slate-500 font-medium">Estimated Delivery:</p>
          <p className="font-bold text-slate-800 text-sm">Within 24 to 48 Hours via Blue Dart Express</p>
          <p className="text-slate-500 pt-2 border-t border-slate-200">Delivering to:</p>
          <p className="font-semibold text-slate-700">
            {shippingData.fullName}, {shippingData.addressLine}, {shippingData.city} - {shippingData.pincode}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to={`/track-order?id=${placedOrderId}`}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md flex items-center gap-2"
          >
            <span>Live Order Tracking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

      {/* Title */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <span>Shopping Cart</span>
          <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            {cartCount} items
          </span>
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Your shopping cart is empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our collection of smartphones, audio gear, and telecom equipment to fill your cart.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-600/20"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Alert Bar */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-sky-950">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-600" />
                  {amountNeeded === 0 ? (
                    <strong className="text-emerald-700">You qualify for FREE Express Shipping!</strong>
                  ) : (
                    <span>
                      Add <strong>₹{amountNeeded.toLocaleString('en-IN')}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-sky-700 font-bold">{shippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-sky-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-600 rounded-full transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
              {cart.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain rounded-2xl bg-slate-50 p-2 border border-slate-100 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                        {item.product.brand}
                      </span>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="block font-bold text-slate-900 text-sm sm:text-base hover:text-sky-600 line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedStorage && <span>• {item.selectedStorage}</span>}
                      </div>
                      <p className="text-xs font-bold text-slate-900">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedStorage)
                        }
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3.5 py-1.5 text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedStorage)
                        }
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-black text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedStorage)}
                        className="text-[11px] font-semibold text-rose-500 hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 px-2">
              <button onClick={clearCart} className="text-rose-600 hover:underline font-semibold">
                Clear Shopping Cart
              </button>
              <Link to="/shop" className="text-sky-600 hover:underline font-semibold">
                + Add More Items
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-6">
            {/* Promo Code Box */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-sky-600" />
                <span>Apply Coupon / Promo Code</span>
              </label>

              {couponCode ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div>
                    <span className="font-bold">{couponCode}</span>
                    <span className="text-[11px] text-emerald-600 block">
                      Saved ₹{couponDiscountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Try PULL10 or WELCOME500"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-300 focus:bg-white focus:border-sky-500 outline-none uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Order Summary</h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery (19,000+ PINs)</span>
                  <span className="font-semibold text-slate-900">
                    {cartDeliveryFee === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : `₹${cartDeliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST (18% included)</span>
                  <span className="text-slate-400">Included</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                  <span>Grand Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Proceed to Secure Checkout</span>
              </button>

              <div className="pt-2 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit Encrypted Payment Gateway</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Complete Your Order</h3>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCompleteOrder} className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Shipping Address Inputs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  1. Delivery Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700">Flat / Street / Area</label>
                    <input
                      type="text"
                      required
                      value={shippingData.addressLine}
                      onChange={(e) => setShippingData({ ...shippingData, addressLine: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">City / District</label>
                    <input
                      type="text"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={shippingData.pincode}
                      onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-sky-500 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. Select Payment Method
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-sky-600" />
                      <span>Instant UPI / QR</span>
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Google Pay, PhonePe, Paytm</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-sky-600" />
                      <span>Credit / Debit Card</span>
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Visa, Mastercard, RuPay</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('emi')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'emi'
                        ? 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-sky-600" />
                      <span>0% No-Cost EMI</span>
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">HDFC, Bajaj Finserv, SBI</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-sky-600" />
                      <span>Cash on Delivery</span>
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Pay at your doorstep</p>
                  </button>
                </div>
              </div>

              {/* Order total & CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Amount Payable</p>
                  <p className="text-xl font-extrabold text-slate-900">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Confirm Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Prime Membership Offer"
        subtitle="Get free same-day delivery + zero processing fee on all future electronic purchases."
      />
    </div>
  );
};
