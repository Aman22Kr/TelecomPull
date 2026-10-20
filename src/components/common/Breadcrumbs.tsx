import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-slate-500 py-3 overflow-x-auto no-scrollbar">
      <Link to="/" className="flex items-center gap-1 hover:text-sky-600 transition-colors flex-shrink-0">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 flex-shrink-0" />
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-sky-600 transition-colors flex-shrink-0 font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold truncate flex-shrink-0">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
