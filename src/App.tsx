/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { PincodeModal } from './components/common/PincodeModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparePage } from './pages/ComparePage';
import { EmiCalculatorPage } from './pages/EmiCalculatorPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { TermsPrivacyPage } from './pages/TermsPrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
          {/* Header */}
          <Header onOpenPincodeModal={() => setIsPincodeModalOpen(true)} />

          {/* Main Routing Body */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/terms-privacy" element={<TermsPrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Persistent Drawers & Modals */}
          <CartDrawer />
          <PincodeModal
            isOpen={isPincodeModalOpen}
            onClose={() => setIsPincodeModalOpen(false)}
          />
          <ToastContainer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
