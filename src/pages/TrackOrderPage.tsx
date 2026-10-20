import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Truck,
  Search,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || 'TP-84920';

  const { getOrderById, orders } = useApp();
  const [orderIdInput, setOrderIdInput] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState(getOrderById(initialId));

  useEffect(() => {
    if (initialId) {
      setOrderIdInput(initialId);
      setSearchedOrder(getOrderById(initialId));
    }
  }, [initialId]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    const found = getOrderById(orderIdInput.trim());
    setSearchedOrder(found);
  };

  const trackingStages = [
    { title: 'Order Confirmed', desc: 'Verified & Tax Invoice Generated', completed: true },
    { title: 'Packed & Barcode Scanned', desc: 'At TelecomPull Central Warehouse', completed: true },
    { title: 'Dispatched via Air Courier', desc: 'Blue Dart Express AWB Assigned', completed: true },
    { title: 'In Transit', desc: 'Arrived at Local Sorting Hub', completed: true },
    { title: 'Out for Delivery', desc: 'Assigned to Delivery Associate', completed: false },
    { title: 'Delivered', desc: 'Handed over with OTP verification', completed: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Order Tracking' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-100">
          <Truck className="w-3.5 h-3.5" />
          <span>Live Dispatch Status</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Track Your TelecomPull Shipment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Enter your Order ID (e.g. <strong className="text-slate-800">TP-84920</strong>) to view real-time transit telemetry and estimated delivery times.
        </p>

        {/* Search Order Form */}
        <form onSubmit={handleTrackSubmit} className="flex gap-2 max-w-md mx-auto pt-2">
          <input
            type="text"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="Enter Order ID (e.g. TP-84920)"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-sm font-bold uppercase tracking-wider outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {/* Result Section */}
      {searchedOrder ? (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50 border border-sky-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                Tracking Number: {searchedOrder.trackingNumber}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Order #{searchedOrder.id}
              </h3>
              <p className="text-xs text-slate-500">Placed on: {searchedOrder.date}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-bold inline-block shadow-sm">
                Status: {searchedOrder.status}
              </span>
              <p className="text-xs text-slate-600 mt-1">
                Estimated Delivery: <strong className="text-slate-900">{searchedOrder.estimatedDelivery}</strong>
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Shipment Progress</h4>
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {trackingStages.map((stage, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 sm:-left-8 mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                      stage.completed
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div>
                    <h5
                      className={`text-sm font-bold ${
                        stage.completed ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {stage.title}
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items in Order */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">Items in this Package</h4>
            <div className="divide-y divide-slate-100">
              {searchedOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-contain bg-slate-50 p-1 border border-slate-200"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-slate-400">
                        Qty: {item.quantity} {item.color && `• Color: ${item.color}`}{' '}
                        {item.storage && `• ${item.storage}`}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Destination Address:</span>
            </p>
            <p className="text-slate-600">
              {searchedOrder.shippingAddress.fullName} • {searchedOrder.shippingAddress.phone}
            </p>
            <p className="text-slate-500">
              {searchedOrder.shippingAddress.addressLine}, {searchedOrder.shippingAddress.city} -{' '}
              {searchedOrder.shippingAddress.pincode}
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">No Order Found</h4>
          <p className="text-xs text-slate-500">
            We could not find an order matching "{orderIdInput}". Please check the ID or try the sample order <strong className="text-sky-600">TP-84920</strong>.
          </p>
          <button
            onClick={() => {
              setOrderIdInput('TP-84920');
              setSearchedOrder(getOrderById('TP-84920'));
            }}
            className="text-xs font-bold text-sky-600 hover:underline"
          >
            Load Demo Order (TP-84920)
          </button>
        </div>
      )}

      {/* Compact Ad Placeholder */}
      <AdPlaceholder
        title="TelecomPull Priority Support Helpline"
        subtitle="Need to reschedule your delivery slot or update shipping address? Call 011-28754120 anytime."
      />
    </div>
  );
};
