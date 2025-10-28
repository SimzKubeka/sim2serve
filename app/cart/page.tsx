"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CartItem } from "@/types";
import { getCart, updateQuantity, clearCart, getCartTotal, removeFromCart } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    setCart(getCart());
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  const total = cart.reduce((sum, item) => {
    const finalPrice = item.product.price * (1 - item.product.discount);
    return sum + (finalPrice * item.quantity);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding books to your cart to see them here
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Items ({cart.length})
              </h2>
              {cart.map((item) => {
                const finalPrice = item.product.price * (1 - item.product.discount);
                return (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-0"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 relative bg-gray-100 rounded overflow-hidden shrink-0">
                      <img
                        src={item.product.coverImage}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="grow">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900">{item.product.title}</h3>
                      <p className="text-sm text-gray-600">{item.product.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.product.discount > 0 ? (
                          <>
                            <p className="text-blue-600 font-semibold">${finalPrice.toFixed(2)}</p>
                            <p className="text-sm text-gray-400 line-through">${item.product.price.toFixed(2)}</p>
                          </>
                        ) : (
                          <p className="text-blue-600 font-semibold">${item.product.price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-12 h-12 sm:w-10 sm:h-10 rounded-lg sm:rounded-full bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center font-semibold text-xl sm:text-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-xl sm:text-lg sm:w-10 text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="w-12 h-12 sm:w-10 sm:h-10 rounded-lg sm:rounded-full bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center font-semibold text-xl sm:text-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Total and Remove */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 w-full sm:w-auto">
                        <p className="font-bold text-gray-900 text-lg">
                          ${(finalPrice * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="text-red-600 hover:text-red-700 active:text-red-800 text-sm underline sm:text-left text-right"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-xl font-semibold text-gray-900">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-2xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

