import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
        let borderColor = 'border-emerald-500/30';
        let bgColor = 'bg-slate-900 text-white';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />;
          borderColor = 'border-rose-500/30';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />;
          borderColor = 'border-amber-500/30';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />;
          borderColor = 'border-sky-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border ${borderColor} ${bgColor} flex items-center justify-between gap-3 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
