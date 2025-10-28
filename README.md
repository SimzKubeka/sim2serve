# travSim Book Store

A modern, mobile-responsive digital book store built with Next.js 16, featuring product listings, detailed views, shopping cart functionality, and genre-based filtering.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse 16 digital books across multiple genres (Travel, Photography, Self-Help, Culture, Environment, Lifestyle)
- **Hero Carousel**: Interactive image slider with 3 promotional slides
- **Product Details**: Modal view with full product information including:
  - Book ratings, author, description
  - Format (EPUB/PDF), pages, language, release date
  - Discounted pricing display
- **Shopping Cart**: Full-featured cart with:
  - Add/remove items
  - Quantity adjustment (+/-)
  - Persistent storage using localStorage
  - Real-time total calculation
  - Discount handling
- **Genre Filtering**: Filter books by genre with pagination support
- **Pagination**: 8 items per page with smart pagination controls
- **Responsive Design**: Mobile-first design that works on all devices

### Technical Features
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **React Icons** (Heroicons v2) for iconography
- **localStorage** for cart persistence
- **Hydration-safe** components
- **SEO-optimized** with proper metadata

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository** 

2. **Install dependencies**
   npm install

3. **Run the development server**
   npm run dev

4. **Open your browser**
   Navigate to [http://localhost:3000]

### Build for Production
npm run build
npm start


## 📁 Project Structure

sim2serve/
├── app/
│   ├── cart/           # Cart page
│   ├── layout.tsx      # Root layout with Header/Footer
│   ├── page.tsx        # Home page with product listings
│   └── globals.css     # Global styles
├── components/
│   ├── product/        # Product-related components
│   │   ├── ProductCard.tsx
│   │   └── ProductDetail.tsx
│   ├── CartIcon.tsx    # Cart icon with badge
│   ├── Footer.tsx      # Site footer
│   ├── Header.tsx      # Site header with navigation
│   ├── Hero.tsx        # Hero carousel
│   └── Pagination.tsx  # Pagination controls
├── lib/
│   ├── cart.ts         # Cart utilities (localStorage)
│   └── products.ts     # Product data
├── types/
│   └── index.ts        # TypeScript definitions
└── public/             # Static assets


## 🎨 Design Decisions

### State Management
- Used React hooks (useState, useEffect, useMemo) for local state management
- localStorage for cart persistence to survive page reloads
- No global state management library needed for this scope

### Trade-offs & Assumptions
**✅ Current Implementation:**
- **localStorage** for cart persistence (client-side only, no backend)
- **Static product data** in a TypeScript array
- **Client-side filtering and pagination**
- **No user authentication** (assumes single-user, browser-based)

**💡 Recommended for Production:**
- **Backend Database**: MongoDB, Firebase, or PostgreSQL for product and cart data
- **User Authentication**: Implement login/signup for multi-user support
- **Payment Integration**: Stripe, PayPal, or similar for checkout
- **Image Storage**: CDN or cloud storage (AWS S3, Cloudinary) for book covers
- **Admin Panel**: For managing products, inventory, and orders
- **Analytics**: Track user behavior, popular products, conversion rates
- **Reviews System**: Allow users to rate and review books
- **Search Functionality**: Full-text search by title, author, or description
- **Email Notifications**: Order confirmations, shipping updates
- **Wishlist Feature**: Save books for later

### Why MongoDB or Firebase?
- **MongoDB**: Flexible document structure, easy to query, great for e-commerce
- **Firebase**: Real-time updates, built-in authentication, easy to scale, good for rapid prototyping
- **Hybrid Approach**: MongoDB for product catalog + Firebase for user sessions/cart

## ⏱️ Development Time

**Total Time: 3 hours 15 minutes**

Breakdown:
- Initial setup and project structure: 15 min
- Type definitions and product data: 20 min
- Cart functionality (localStorage): 30 min
- Product listing page: 45 min
- Product detail modal: 25 min
- Cart page: 40 min
- Header/Footer components: 20 min
- Genre filtering: 20 min
- Pagination: 15 min
- Hero carousel: 15 min
- Mobile responsiveness improvements: 20 min
- Bug fixes and refinements: 30 min

## 🤖 AI Assistance
This project was developed with AI assistance from **CusorAI IDE** on:
- TypeScript type definitions
- Component structure recommendations
- Project write up

All code was reviewed and refined by the developer to ensure quality, performance, and best practices.

## 🛠️ Technologies Used
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons (Heroicons v2)
- **Storage**: localStorage
- **Image Provider**: placehold.co for placeholder images

## 📝 Environment Variables
No environment variables required for the current implementation.

## 🚧 Known Limitations
1. **Cart data is browser-specific** (doesn't sync across devices)
2. **No checkout process** (cart is for demonstration only)
3. **Product images are placeholders** (using placehold.co)
4. **No search functionality** (filtering is genre-based only)
5. **No user accounts** (single-user experience)
6. **No inventory management** (unlimited stock assumed)

## 🎯 Future Enhancements
- [ ] Backend API integration
- [ ] User authentication system
- [ ] Real payment processing
- [ ] Product search functionality
- [ ] User reviews and ratings
- [ ] Wishlist feature
- [ ] Order history
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode toggle

## 📄 License
This project is for educational/demonstration purposes.

