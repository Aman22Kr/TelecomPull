# TelecomPull - Electronics, Mobiles & Telecom Solutions

A modern, high-performance, responsive multi-page e-commerce and retail web application recreated for **TelecomPull** (inspired by the reference website `https://vipultelecom.in/`) under the brand identity of **TelecomPull** by GitHub developer **Aman22kr**.

Built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router (HashRouter)**, optimized for seamless automated static deployment to **GitHub Pages** using **GitHub Actions**.

---

## 1. What the Website Does
TelecomPull is an all-in-one digital storefront and technical catalog for mobile devices, computing hardware, home audio/video electronics, and specialized telecom technician tools. Key highlights:
- **Comprehensive Product Catalog**: Flagship 5G smartphones, creator ultrabooks, ANC headphones, 4K OLED smart TVs, certified refurbished hardware, and telecom testing gear (Optical Power Meters & Visual Fault Locators, Universal AC/TV remotes).
- **Dynamic Search & Filtering**: Instant auto-suggest search dropdown, brand filtering, budget range slider, minimum star rating, stock filters, and sorting.
- **Side-by-Side Device Comparison**: Interactive matrix comparing hardware specifications, processors, camera sensors, and pricing across up to 4 devices simultaneously.
- **No-Cost EMI & Loan Calculator**: Instant monthly installment computation with customizable tenure, down payments, and partner bank scheme previews (HDFC, Bajaj Finserv, ICICI, SBI).
- **Persistent Shopping Cart & Wishlist**: Resilient browser `localStorage` integration preserving cart contents, quantities, promo code discounts (`PULL10`, `WELCOME500`, `VIPULTELECOM`), delivery pincodes, and bookmarked devices across browser sessions.
- **Interactive Checkout & Live Order Tracking**: Simulated checkout generating verified order reference numbers (e.g., `TP-84920`) with realistic step-by-step dispatch tracking timelines.
- **Telecom & Hardware Repair Center**: Express technical repair booking and B2B wholesale quotation submission for ISP contractors and corporate device fleets.
- **Ad Placeholders & Video Showcase**: Reusable, compact advertisement banners and 16:9 YouTube video player placeholders per project specifications.

---

## 2. Reference Website and Brand Identity
- **Reference Website**: [https://vipultelecom.in/](https://vipultelecom.in/) (Established in 2014 as Vipul Telecom, an electronics dealer and JioMart Digital partner in Delhi, Mumbai, and Gujarat).
- **New Brand Identity**: **TelecomPull**
- **Brand Essence**: *Mobiles • Electronics • Telecom*
- **Developer / Maintainer**: [Aman22kr](https://github.com/Aman22kr)
- **Visual Design**: Sleek slate-navy surfaces with vivid sky-blue accents, crisp typography, clean micro-interactions, strong animation feedback, and mobile-first responsiveness.

---

## 3. Main Pages & Features Implemented
| Route | Page | Description |
|---|---|---|
| `#/` | **Home Page** | Hero spotlight, category browse bar, countdown flash deals, best-seller tabs, telecom optical tools hub, certified refurbished showcase, 16:9 video player placeholder, customer testimonials, tech journal, and compact ad banner. |
| `#/shop` | **Catalog Shop** | Multi-faceted filter sidebar (categories, brands, price slider, rating, in-stock, refurbished, deals), grid/list view toggle, and sorting options. |
| `#/category/:slug` | **Category Showcase** | Dedicated views for `smartphones`, `laptops`, `audio`, `smart-tvs`, `accessories`, `telecom-tools`, and `refurbished`. |
| `#/product/:id` | **Product Details** | Photo gallery with thumbnail switching, color variant and storage selector with dynamic price updates, delivery pincode estimator, tabbed specs, description, verified customer reviews submission, and related products carousel. |
| `#/compare` | **Device Comparison** | Side-by-side spec-by-spec comparison matrix for up to 4 phones or laptops. |
| `#/emi-calculator` | **EMI Calculator** | Real-time calculation sliders for principal, down payment, 0% No-Cost EMI vs standard interest, and partner bank perks. |
| `#/cart` | **Cart & Checkout** | Item quantity modifications, free shipping meter (Free over ₹999), promo codes, address entry, payment selection (UPI, Card, COD, No-Cost EMI), and instant order placement. |
| `#/wishlist` | **Saved Wishlist** | Bookmarked favorites with quick "Move to Cart" action. |
| `#/track-order` | **Order Tracking** | Real-time transit telemetry lookup for order `TP-84920` or newly placed orders. |
| `#/services` | **Repairs & B2B Wholesale** | Express hardware repair booking and enterprise wholesale quote request form. |
| `#/about` | **About TelecomPull** | Company journey from 2014 origin, retail store addresses in Delhi, Mumbai, and Gujarat, authorized dealer credentials, and developer credit. |
| `#/contact` | **Contact & Stores** | Interactive inquiry form, phone lines, email support, working hours, and physical store map layout. |
| `#/faq` | **Help & FAQ** | Categorized accordion questions covering shipping, authenticity, returns, and wholesale. |
| `#/terms-privacy` | **Terms & Privacy** | Legal terms, data privacy notes, and 7-day replacement policy. |
| `*` | **404 Not Found** | Friendly fallback page with search shortcuts. |

---

## 4. Project Structure
```text
telecompull/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Authoritative GitHub Actions deployment workflow
├── public/                     # Static assets and favicon
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── AdPlaceholder.tsx      # Compact, reusable advertisement banner
│   │       ├── Breadcrumbs.tsx        # Navigation breadcrumb trail
│   │       ├── CartDrawer.tsx         # Slide-over quick cart drawer
│   │       ├── Footer.tsx             # Complete global footer with Aman22kr attribution
│   │       ├── Header.tsx             # Global sticky navigation with live search & pincode selector
│   │       ├── PincodeModal.tsx       # Modal to check PIN code delivery feasibility
│   │       ├── ProductCard.tsx        # Card with hover zoom, discount badges, wishlist & compare
│   │       ├── QuickViewModal.tsx     # Instant preview modal without page reload
│   │       ├── ToastContainer.tsx     # Interactive action toast feedback notifications
│   │       └── YouTubePlaceholder.tsx # 16:9 blank video player placeholder layout
│   ├── context/
│   │   └── AppContext.tsx             # Central state & localStorage persistence
│   ├── data/
│   │   └── mockData.ts                # Products, categories, stores, testimonials, FAQs, blogs
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── ComparePage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── EmiCalculatorPage.tsx
│   │   ├── FaqPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── TermsPrivacyPage.tsx
│   │   ├── TrackOrderPage.tsx
│   │   └── WishlistPage.tsx
│   ├── types/
│   │   └── index.ts                   # Complete TypeScript type definitions
│   ├── App.tsx                        # HashRouter and root component
│   ├── index.css                      # Tailwind CSS v4 directives and typography
│   └── main.tsx                       # React 19 application entry point
├── .env.example
├── .gitignore
├── index.html                         # Entry HTML with meta and title sync
├── metadata.json                      # AI Studio configuration
├── package.json                       # Dependencies & build scripts
├── package-lock.json                  # Consistent npm dependency lockfile
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite build configuration with base: './'
└── README.md                          # Full documentation
```

---

## 5. Prerequisites & Compatibility
- **Node.js**: Version `20.x` or `22.x` (LTS recommended).
- **npm**: Version `10.x` or later.
- Modern web browser (Chrome, Firefox, Safari, Edge).

---

## 6. How to Install Dependencies
Clone the repository and install packages using `npm install` or `npm ci`:
```bash
# Clone the repository
git clone https://github.com/Aman22kr/telecompull.git
cd telecompull

# Clean install using package-lock.json
npm ci
```
*(If developing locally with updated packages, you can run `npm install`)*.

---

## 7. How to Run the Development Server
To launch Vite's hot-reloading development server locally:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port output in your terminal).

---

## 8. How to Generate and Preview the Production Build
Generate an optimized, production-ready static bundle in the `dist/` folder:
```bash
# 1. Typecheck and build static production assets
npm run build

# 2. Preview the production build locally
npm run preview
```
The static files generated in `dist/` use relative asset paths (`base: './'`), making them completely portable across subdirectories on GitHub Pages.

---

## 9. How LocalStorage is Used & Its Limitations
TelecomPull stores user preferences client-side under namespaced keys:
- `telecompull_cart`: Active items, selected colors, storage variants, and quantities.
- `telecompull_wishlist`: Array of bookmarked product identifiers.
- `telecompull_compare`: Up to 4 devices selected for comparison.
- `telecompull_recent`: List of recently viewed product IDs.
- `telecompull_search_history`: User's search query log.
- `telecompull_pincode`: User's active delivery postal PIN code (e.g. `110001`).
- `telecompull_orders`: Placed order history (seeded with demo order `TP-84920`).

### Limitations
- **Browser-Specific**: Data saved in `localStorage` remains exclusively on the user's current device and browser profile; it does not sync across different devices.
- **Non-Sensitive Data**: No passwords, card numbers, or banking credentials are ever stored in `localStorage`.
- **Cache Clearing**: Clearing browser cache/cookies resets state back to default seed data.

---

## 10. How to Configure the GitHub Repository & Username
1. Ensure your GitHub account is **Aman22kr** (or your own GitHub username).
2. Create a new repository on GitHub named `telecompull` (or any custom name).
3. Connect your local repository to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Recreate TelecomPull with GitHub Pages workflow"
git branch -M main
git remote add origin https://github.com/Aman22kr/telecompull.git
git push -u origin main
```

---

## 11. How to Enable GitHub Pages Using GitHub Actions
1. Navigate to your repository on GitHub: `https://github.com/Aman22kr/telecompull`.
2. Click on **Settings** (top tab bar).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - Change **Source** from *"Deploy from a branch"* to **"GitHub Actions"**.
5. Save the setting. The `.github/workflows/deploy.yml` workflow file will now automatically execute on every push to the `main` branch.

---

## 12. How to Push Changes & Trigger Automatic Deployment
Any commit pushed to `main` automatically triggers the GitHub Actions workflow:
```bash
git add .
git commit -m "Update product catalog and banners"
git push origin main
```
To monitor deployment progress:
1. Go to the **Actions** tab in your GitHub repository.
2. Click on the latest workflow run: **Deploy to GitHub Pages**.
3. Once completed, your live site URL will be displayed in the summary (e.g., `https://aman22kr.github.io/telecompull/`).

You can also trigger manual deployments via the GitHub Actions UI using the **Run workflow** dropdown (`workflow_dispatch`).

---

## 13. How to Troubleshoot Common Deployment Problems
- **Assets Failing to Load (404 on CSS/JS)**: Ensure `base: './'` is configured in `vite.config.ts`. This guarantees asset paths remain relative to the repository sub-path.
- **Direct Link or Page Refresh Errors (404 on subpages)**: This project intentionally employs **HashRouter** (`/#/product/...`). Hash-based routing operates strictly client-side and never requires server rewrite rules on static hosts like GitHub Pages.
- **GitHub Actions Workflow Permissions Error**: Confirm that `deploy.yml` includes:
  ```yaml
  permissions:
    contents: read
    pages: write
    id-token: write
  ```
- **Node.js Version Mismatch**: In `.github/workflows/deploy.yml`, verify `node-version: 22` is specified.

---

## 14. How to Change Brand Name, Content & Visual Theme
- **Brand Name**: Edit brand references in `src/components/common/Header.tsx`, `src/components/common/Footer.tsx`, `index.html`, and `metadata.json`.
- **Theme Accent Colors**: Primary brand colors use Tailwind CSS utility classes like `sky-600`, `sky-500`, and `slate-900`. To adjust the color scheme, update class names in `src/index.css` or component files.
- **Catalog Products & Categories**: Add, edit, or remove items in `src/data/mockData.ts`.
- **Promo Coupons**: Adjust promo codes in `src/context/AppContext.tsx` inside the `applyCoupon` handler.

---

## 15. How to Reuse This Project for Another Website
To adapt this application for another retail or tech business:
1. **Update Brand Constants**: Modify names in `metadata.json`, `index.html`, and `Header.tsx`.
2. **Replace Mock Catalog**: Swap items in `src/data/mockData.ts` with your specific inventory (e.g., fashion, furniture, automotive, or industrial supplies).
3. **Configure Ad Placeholders**: Customize `src/components/common/AdPlaceholder.tsx` with your sponsors or campaign offers.
4. **Push to New Repository**: Update the remote origin in git and push to your new GitHub repository.

---

## 16. Mock Implementations & Remaining Limitations
- **Checkout & Payments**: Payment methods (UPI, Cards, EMI, COD) simulate the complete customer experience and generate real verifiable order objects saved to browser `localStorage`. Real banking API integration (Razorpay / Stripe) requires an external backend server with secret keys.
- **Order Tracking**: Pre-seeded order `TP-84920` and any order created during your session can be tracked in real-time on `#/track-order`.
- **Authentication**: User accounts are client-driven with localStorage persistence; no third-party identity provider is invoked for this initial static static build.
- **YouTube Placeholders**: Embedded videos display branded, accessible 16:9 placeholder cards per prompt guidelines without requiring live third-party cookie trackers.

---

## License
MIT License • Created for educational and demonstration purposes under the brand **TelecomPull** by [Aman22kr](https://github.com/Aman22kr).
