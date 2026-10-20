import React, { useState } from 'react';
import { X, MapPin, Check, Truck, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PincodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PincodeModal: React.FC<PincodeModalProps> = ({ isOpen, onClose }) => {
  const { pincode, pincodeCity, setPincode } = useApp();
  const [inputPin, setInputPin] = useState(pincode);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const popularPincodes = [
    { pin: '110001', city: 'Connaught Place, New Delhi', est: 'Delivery Tomorrow' },
    { pin: '400001', city: 'Fort, Mumbai', est: 'Delivery Tomorrow' },
    { pin: '560001', city: 'MG Road, Bengaluru', est: '2 Days Express' },
    { pin: '500001', city: 'Abids, Hyderabad', est: '2 Days Express' },
    { pin: '380001', city: 'Lal Darwaja, Ahmedabad', est: '1-2 Days' },
    { pin: '700001', city: 'BBD Bagh, Kolkata', est: '2-3 Days' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = inputPin.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setErrorMsg('');
    setPincode(cleanPin);
    onClose();
  };

  const handleSelectQuickPin = (pin: string) => {
    setPincode(pin);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="Close pincode selector"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Select Delivery Location</h3>
            <p className="text-xs text-slate-500">Check product availability & accurate delivery time</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={inputPin}
              onChange={(e) => {
                setInputPin(e.target.value.replace(/\D/g, ''));
                setErrorMsg('');
              }}
              placeholder="Enter 6-digit Pincode (e.g. 110001)"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-sm font-semibold tracking-wider outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
            >
              Apply
            </button>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </p>
          )}
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-600 mb-2.5">Popular Metro Cities:</p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {popularPincodes.map((item) => (
              <button
                key={item.pin}
                onClick={() => handleSelectQuickPin(item.pin)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-colors ${
                  pincode === item.pin
                    ? 'border-sky-500 bg-sky-50 text-sky-900 font-semibold'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <p className="font-bold">{item.pin} - {item.city}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Truck className="w-3 h-3 text-sky-600" />
                    <span>{item.est}</span>
                  </p>
                </div>
                {pincode === item.pin && <Check className="w-4 h-4 text-sky-600" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
