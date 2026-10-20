import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { CartItem, Order, Product } from '../types';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromCart: (productId: string, color?: string, storage?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, storage?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTotal: number;
  couponCode: string;
  couponDiscountAmount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  compareList: string[];
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  pincode: string;
  pincodeCity: string;
  setPincode: (pin: string) => void;

  searchHistory: string[];
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_DEMO_ORDER: Order = {
  id: 'TP-84920',
  date: '19 Oct 2026, 02:45 PM',
  status: 'In Transit',
  items: [
    {
      productId: 'tp-phone-01',
      name: 'Apple iPhone 16 Pro (128GB)',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      price: 119900,
      quantity: 1,
      color: 'Natural Titanium',
      storage: '128 GB'
    },
    {
      productId: 'tp-acc-01',
      name: 'TelecomPull 100W GaN Super Fast Charger',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
      price: 2499,
      quantity: 1,
      color: 'Matte Black'
    }
  ],
  subtotal: 122399,
  discount: 500,
  deliveryFee: 0,
  total: 121899,
  shippingAddress: {
    fullName: 'Aman Kumar',
    phone: '+91 98765 43210',
    pincode: '110001',
    addressLine: 'Connaught Place, B-Block, 4th Floor',
    city: 'New Delhi',
    state: 'Delhi'
  },
  paymentMethod: 'UPI (Google Pay / PhonePe)',
  trackingNumber: 'DEL-BD-904838291',
  estimatedDelivery: '21 Oct 2026 (Tomorrow by 6:00 PM)'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe localStorage helper
  const readStorage = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`telecompull_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const writeStorage = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`telecompull_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  // State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('cart', [
    {
      product: PRODUCTS[0],
      selectedColor: 'Natural Titanium',
      selectedStorage: '128 GB',
      quantity: 1,
      price: PRODUCTS[0].price
    }
  ]));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage('wishlist', ['tp-laptop-01', 'tp-audio-02']));
  const [compareList, setCompareList] = useState<string[]>(() => readStorage('compare', ['tp-phone-01', 'tp-phone-02']));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => readStorage('recent', ['tp-phone-01', 'tp-laptop-01', 'tp-tool-01']));
  const [searchHistory, setSearchHistory] = useState<string[]>(() => readStorage('search_history', ['iPhone 16 Pro', 'Optical meter', '100W GaN', 'MacBook Air M3']));
  const [pincode, setPincodeState] = useState<string>(() => readStorage('pincode', '110001'));
  const [pincodeCity, setPincodeCity] = useState<string>('New Delhi');
  const [orders, setOrders] = useState<Order[]>(() => readStorage('orders', [INITIAL_DEMO_ORDER]));
  const [couponCode, setCouponCode] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to localStorage
  useEffect(() => writeStorage('cart', cart), [cart]);
  useEffect(() => writeStorage('wishlist', wishlist), [wishlist]);
  useEffect(() => writeStorage('compare', compareList), [compareList]);
  useEffect(() => writeStorage('recent', recentlyViewed), [recentlyViewed]);
  useEffect(() => writeStorage('search_history', searchHistory), [searchHistory]);
  useEffect(() => writeStorage('pincode', pincode), [pincode]);
  useEffect(() => writeStorage('orders', orders), [orders]);

  // Toast system
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    const itemColor = color || (product.colors?.[0]?.name ?? 'Standard');
    let itemPrice = product.price;

    if (storage && product.storageVariants) {
      const matchVariant = product.storageVariants.find((v) => v.capacity === storage);
      if (matchVariant) {
        itemPrice += matchVariant.priceDiff;
      }
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === itemColor && item.selectedStorage === storage
      );

      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prevCart, { product, selectedColor: itemColor, selectedStorage: storage, quantity, price: itemPrice }];
      }
    });

    showToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (productId: string, color?: string, storage?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (!color || item.selectedColor === color) && (!storage || item.selectedStorage === storage))
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, color?: string, storage?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, storage);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!color || item.selectedColor === color) && (!storage || item.selectedStorage === storage)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Coupon handling
  let couponDiscountAmount = 0;
  if (couponCode.toUpperCase() === 'PULL10') {
    couponDiscountAmount = Math.round(cartSubtotal * 0.1);
  } else if (couponCode.toUpperCase() === 'WELCOME500') {
    couponDiscountAmount = Math.min(500, cartSubtotal);
  } else if (couponCode.toUpperCase() === 'VIPULTELECOM') {
    couponDiscountAmount = Math.round(cartSubtotal * 0.05);
  }

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PULL10' || clean === 'WELCOME500' || clean === 'VIPULTELECOM') {
      setCouponCode(clean);
      showToast(`Coupon "${clean}" applied successfully!`, 'success');
      return true;
    }
    showToast('Invalid coupon code. Try PULL10 or WELCOME500', 'error');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    showToast('Coupon removed', 'info');
  };

  const cartDeliveryFee = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const cartDiscount = couponDiscountAmount;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const p = PRODUCTS.find((x) => x.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed "${p?.name || 'Item'}" from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added "${p?.name || 'Item'}" to wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare
  const addToCompare = (productId: string): boolean => {
    if (compareList.includes(productId)) {
      showToast('Product is already in comparison list', 'info');
      return false;
    }
    if (compareList.length >= 4) {
      showToast('You can compare maximum 4 products at once', 'warning');
      return false;
    }
    setCompareList((prev) => [...prev, productId]);
    const p = PRODUCTS.find((x) => x.id === productId);
    showToast(`Added "${p?.name || 'Device'}" to comparison`, 'success');
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
    showToast('Product removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison list cleared', 'info');
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  // Recently Viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Pincode
  const setPincode = (pin: string) => {
    setPincodeState(pin);
    // Simple city lookup heuristic for realistic Indian PIN codes
    if (pin.startsWith('11')) setPincodeCity('New Delhi / NCR');
    else if (pin.startsWith('40') || pin.startsWith('41')) setPincodeCity('Mumbai / Maharashtra');
    else if (pin.startsWith('56')) setPincodeCity('Bengaluru / Karnataka');
    else if (pin.startsWith('50')) setPincodeCity('Hyderabad / Telangana');
    else if (pin.startsWith('60')) setPincodeCity('Chennai / Tamil Nadu');
    else if (pin.startsWith('70')) setPincodeCity('Kolkata / West Bengal');
    else if (pin.startsWith('38') || pin.startsWith('36')) setPincodeCity('Ahmedabad / Gujarat');
    else setPincodeCity('India Standard Zone');
    showToast(`Delivery location set to PIN: ${pin}`, 'info');
  };

  // Search History
  const addSearchQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 6);
    });
  };

  const clearSearchHistory = () => setSearchHistory([]);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber' | 'estimatedDelivery'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `TP-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      id: newOrderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Confirmed',
      trackingNumber: `TP-EXP-${Date.now().toString().slice(-8)}`,
      estimatedDelivery: 'Within 2-3 Business Days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((o) => o.id.trim().toUpperCase() === orderId.trim().toUpperCase());
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,
        couponCode,
        couponDiscountAmount,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,

        wishlist,
        toggleWishlist,
        isInWishlist,

        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,

        recentlyViewed,
        addRecentlyViewed,

        pincode,
        pincodeCity,
        setPincode,

        searchHistory,
        addSearchQuery,
        clearSearchHistory,

        orders,
        createOrder,
        getOrderById,

        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
