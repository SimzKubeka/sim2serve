"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartIcon from "./CartIcon";

export default function Header() {
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";

  return (
    <header className={`bg-white shadow-sm ${!isCartPage ? 'sticky top-0 z-40' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              📚 {isCartPage ? "Shopping Cart" : "travSim Book Store"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {isCartPage ? "Review your items" : "Discover your next favorite books for your travels"}
            </p>
          </div>
          {isCartPage ? (
            <Link
              href="/"
              className="text-blue-600 hover:bg-blue-600 hover:text-white font-medium border border-blue-600 px-2 py-2 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          ) : (
            <CartIcon />
          )}
        </div>
      </div>
    </header>
  );
}

