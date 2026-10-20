import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Heart,
  Scale,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  MapPin,
  Sparkles,
  Info,
  Send,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { YouTubePlaceholder } from '../components/common/YouTubePlaceholder';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    addToCompare,
    removeFromCompare,
    pincode,
    pincodeCity,
    addRecentlyViewed,
    showToast
  } = useApp();

  const product = PRODUCTS.find((p) => p.id === id || p.slug === id) || PRODUCTS[0];

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageVariants?.[0]?.capacity || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews' | 'warranty'>('specs');

  // Customer reviews state with new review submission
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'r-1',
      productId: product.id,
      author: 'Vikram Mehta',
      rating: 5,
      date: '12 Oct 2026',
      title: 'Flawless product and super fast delivery!',
      comment: 'Arrived within 24 hours in Delhi. Original brand warranty card was intact and sealed box verified on official website.',
      verifiedPurchase: true
    },
    {
      id: 'r-2',
      productId: product.id,
      author: 'Pooja Sharma',
      rating: 5,
      date: '08 Oct 2026',
      title: 'Amazing performance, zero issues',
      comment: 'Battery life easily lasts 1.5 days. The camera resolution is sensational.',
      verifiedPurchase: true
    }
  ]);

  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const isSaved = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Compute price with selected storage
  let currentPrice = product.price;
  if (selectedStorage && product.storageVariants) {
    const variant = product.storageVariants.find((v) => v.capacity === selectedStorage);
    if (variant) currentPrice += variant.priceDiff;
  }

  const emiPerMonth = Math.round(currentPrice / 6);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    navigate('/cart');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      showToast('Please fill in your name and review', 'warning');
      return;
    }
    const newRev: Review = {
      id: Date.now().toString(),
      productId: product.id,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: 'Just now',
      title: 'Customer Review',
      comment: reviewComment.trim(),
      verifiedPurchase: true
    };
    setReviews([newRev, ...reviews]);
    setReviewAuthor('');
    setReviewComment('');
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  // Related products in same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.category, href: `/category/${product.category}` },
          { label: product.name }
        ]}
      />

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex items-center justify-center relative overflow-hidden shadow-sm">
            {/* Discount Badge */}
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-black tracking-wide shadow-md">
                {product.discountPercent}% OFF
              </span>
            )}
            {product.isRefurbished && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certified Refurbished</span>
              </span>
            )}

            <img
              src={activeImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white flex-shrink-0 transition-all ${
                    activeImage === img
                      ? 'border-sky-600 ring-2 ring-sky-200 shadow-sm'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Purchasing Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-100">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">{product.subcategory}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-current text-emerald-600" />
              </div>
              <span className="text-xs text-slate-500">
                Based on {product.reviewCount} verified customer ratings
              </span>
            </div>
          </div>

          {/* Pricing & EMI Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > currentPrice && (
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  MRP: ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Save ₹{(product.originalPrice - currentPrice).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Inclusive of all taxes • 18% GST invoice provided for business claims
            </p>

            {currentPrice > 4000 && (
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200">
                <span className="text-slate-600">
                  No Cost EMI starts at <strong className="text-sky-700">₹{emiPerMonth.toLocaleString('en-IN')}/month</strong>
                </span>
                <Link to="/emi-calculator" className="font-bold text-sky-600 hover:underline">
                  View EMI Plans
                </Link>
              </div>
            )}
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">
                Select Finish: <span className="text-sky-600 font-semibold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                      selectedColor === c.name
                        ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-200 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage / Configuration Variants */}
          {product.storageVariants && product.storageVariants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Choose Storage / Memory:</label>
              <div className="flex flex-wrap gap-2.5">
                {product.storageVariants.map((v) => (
                  <button
                    key={v.capacity}
                    onClick={() => setSelectedStorage(v.capacity)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedStorage === v.capacity
                        ? 'border-sky-600 bg-sky-600 text-white shadow-md shadow-sky-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {v.capacity}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pincode Delivery Estimator */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sky-600" />
                <span>Delivery to {pincodeCity} ({pincode})</span>
              </span>
              <span className="text-emerald-600 font-bold">Express Available</span>
            </div>
            <p className="text-slate-500">
              Order today for guaranteed dispatch by tomorrow • Free shipping over ₹999
            </p>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 h-full text-slate-700 hover:bg-slate-200 transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 h-full text-slate-700 hover:bg-slate-200 transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Wishlist & Compare actions */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  isSaved ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <span>•</span>

              <button
                onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product.id))}
                className={`flex items-center gap-1.5 transition-colors ${
                  isCompared ? 'text-sky-600 font-bold' : 'hover:text-sky-600'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isCompared ? 'In Compare List' : 'Compare Device'}</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{product.warranty}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-sky-500" />
              <span>7 Days Easy Replacement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Tabs: Specs / Description / Reviews / Warranty */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto no-scrollbar">
          {(
            [
              { key: 'specs', label: 'Technical Specifications' },
              { key: 'desc', label: 'Product Overview' },
              { key: 'reviews', label: `Customer Reviews (${reviews.length})` },
              { key: 'warranty', label: 'Warranty & Shipping Policy' }
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === t.key
                  ? 'border-sky-600 text-sky-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8">
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Detailed Hardware Specifications</h3>
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
                {Object.entries(product.specs).map(([specKey, specVal]) => (
                  <div key={specKey} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs sm:text-sm">
                    <span className="font-semibold text-slate-500">{specKey}</span>
                    <span className="sm:col-span-2 text-slate-900 font-medium">{specVal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">About this Item</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">Key Features & Innovations</h4>
                <ul className="space-y-2">
                  {product.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* YouTube Video Review Placeholder */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Video Unboxing & First Look</h4>
                <YouTubePlaceholder
                  title={`${product.name} - Official Unboxing & Field Testing`}
                  duration="04:12"
                  caption="Watch the comprehensive device benchmark and build inspection"
                />
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-4xl">
              {/* Write Review Form */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Write a Verified Customer Review</h4>
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700">Your Name</label>
                      <input
                        type="text"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full mt-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700">Rating (1 to 5 Stars)</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                      >
                        <option value={5}>5 Stars - Excellent</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">Review Comments</label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with battery, display, packaging, or delivery..."
                      className="w-full mt-1 p-3 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{rev.author}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-slate-600 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-base">Warranty & Service Policy</h4>
              <p>
                Every unit sold on TelecomPull is backed by authentic manufacturer warranty valid at authorized brand service centers nationwide.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>7-Day Replacement Guarantee:</strong> In the rare event of a dead-on-arrival or physical transit defect, we arrange prompt reverse pickup and replacement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>GST Invoice Included:</strong> Tax credit compliant invoice emailed instantly upon dispatch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Pre-dispatch Inspection:</strong> Sealed boxes undergo strict barcode scanning against authorized distributor registries.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Similar Products You May Like</h3>
            <Link
              to={`/category/${product.category}`}
              className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
            >
              <span>View All in {product.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Protect: Extended Warranty & Damage Cover"
        subtitle="Protect your new device against accidental liquid damage and screen drops starting at just ₹49/month."
      />
    </div>
  );
};
