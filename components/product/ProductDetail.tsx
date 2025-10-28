"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { addToCart } from "@/lib/cart";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  isOpen: boolean;
}

export default function ProductDetail({ product, onClose, isOpen }: ProductDetailProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  const finalPrice = product.price * (1 - product.discount);

  return (
    <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Cover Image */}
            <div className="relative w-full md:w-1/3 h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.coverImage}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-lg">
                  {Math.round(product.discount * 100)}% OFF
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="md:w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="text-lg font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-500">rating</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.author}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {product.genre}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {product.format}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                {product.discount > 0 ? (
                  <>
                    <span className="text-4xl font-bold text-blue-600">${finalPrice.toFixed(2)}</span>
                    <span className="text-xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                )}
              </div>

              {/* Product Specifications */}
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <span className="text-gray-600">Pages:</span>
                  <span className="ml-2 font-medium text-gray-900">{product.pages}</span>
                </div>
                <div>
                  <span className="text-gray-600">Language:</span>
                  <span className="ml-2 font-medium text-gray-900">{product.language}</span>
                </div>
                <div>
                  <span className="text-gray-600">Format:</span>
                  <span className="ml-2 font-medium text-gray-900">{product.format}</span>
                </div>
                <div>
                  <span className="text-gray-600">Release Date:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {new Date(product.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
          
          {/* Description */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

