"use client";

import Image from "next/image";
import { Product } from "@/types";
import { addToCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    const button = e.currentTarget as HTMLButtonElement;
    const originalText = button.textContent;
    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = originalText;
    }, 1000);
  };

  const finalPrice = product.price * (1 - product.discount);

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 overflow-hidden"
      onClick={() => onViewDetails(product)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg m-2">
          {Math.round(product.discount * 100)}% OFF
        </div>
      )}
      
      <div className="relative h-64 bg-gray-100">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.genre})</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 min-h-12">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{product.author}</p>

        <div className="flex items-center gap-2 mb-3">
          {product.discount > 0 ? (
            <>
              <span className="text-xl font-bold text-blue-600">${finalPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

