import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Trash2, Plus, Star, Check, ShoppingCart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useApp();

  const comparedProducts = PRODUCTS.filter((p) => compareList.includes(p.id));

  // Extract all unique spec keys across compared devices
  const allSpecKeys = Array.from(
    new Set(comparedProducts.flatMap((p) => Object.keys(p.specs || {})))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Device Comparison Matrix' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Side-by-Side Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Compare Devices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare specifications, processors, camera setups, and pricing across up to 4 models.
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <button
            onClick={clearCompare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Comparison</span>
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      {comparedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No devices selected for comparison</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the "Compare" icon on any product card in our catalog to inspect specifications side-by-side.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow-md"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Top Product Header Row */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="p-4 sm:p-6 w-1/5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Product Overview
                </th>
                {comparedProducts.map((prod) => (
                  <th key={prod.id} className="p-4 sm:p-6 w-1/4 align-top">
                    <div className="space-y-3">
                      <div className="relative aspect-square w-full rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-center">
                        <button
                          onClick={() => removeFromCompare(prod.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove from compare"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                          {prod.brand}
                        </span>
                        <Link
                          to={`/product/${prod.id}`}
                          className="block font-bold text-slate-900 text-xs sm:text-sm hover:text-sky-600 line-clamp-2 mt-0.5"
                        >
                          {prod.name}
                        </Link>
                      </div>

                      <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                        <span>{prod.rating}</span>
                        <Star className="w-3 h-3 fill-current text-emerald-600" />
                        <span className="text-slate-400 text-[10px]">({prod.reviewCount})</span>
                      </div>

                      <div className="pt-1">
                        <span className="text-lg font-black text-slate-900">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec Attributes Rows */}
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              <tr className="bg-slate-50/50 font-bold text-slate-900">
                <td className="p-4" colSpan={comparedProducts.length + 1}>
                  Key Attributes
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Category</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-slate-800 capitalize font-medium">
                    {p.category} • {p.subcategory}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Warranty</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-slate-800 font-medium">
                    {p.warranty}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Stock Availability</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-slate-800">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      In Stock ({p.stockCount} units)
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-50/50 font-bold text-slate-900">
                <td className="p-4" colSpan={comparedProducts.length + 1}>
                  Hardware Specifications
                </td>
              </tr>
              {allSpecKeys.map((specKey) => (
                <tr key={specKey}>
                  <td className="p-4 font-semibold text-slate-500">{specKey}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-slate-800 font-medium">
                      {p.specs[specKey] || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Corporate Trade-In Program"
        subtitle="Upgrading company laptops or smartphones? Get guaranteed bulk buyback value and express GST invoices."
      />
    </div>
  );
};
