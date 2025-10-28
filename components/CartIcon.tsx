"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiShoppingBag } from "react-icons/hi2";
import { getCartItemCount } from "@/lib/cart";

export default function CartIcon() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCount = () => setCount(getCartItemCount());
    updateCount();
    
    // Listen for storage changes to update count
    window.addEventListener("storage", updateCount);
    
    // Also update when focus returns to window (in case another tab updated cart)
    window.addEventListener("focus", updateCount);
    
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("focus", updateCount);
    };
  }, []);

  // Poll for updates (in case same tab updates cart)
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCount(getCartItemCount());
    }, 500);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <Link
      href="/cart"
      className="relative bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors inline-block"
    >
      <HiShoppingBag className="w-6 h-6" />
      {mounted && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

