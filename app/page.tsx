"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import ProductDetail from "@/components/product/ProductDetail";
import Pagination from "@/components/Pagination";
import Hero from "@/components/Hero";

const ITEMS_PER_PAGE = 8;

// Get unique genres from products
const genres = ["All", ...Array.from(new Set(products.map(p => p.genre)))].sort();

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  // Filter products by genre
  const filteredProducts = useMemo(() => {
    if (selectedGenre === "All") {
      return products;
    }
    return products.filter(product => product.genre === selectedGenre);
  }, [selectedGenre]);

  // Calculate pagination based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = useMemo(
    () => filteredProducts.slice(startIndex, endIndex),
    [filteredProducts, currentPage]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1); 
  };

  return (
    <>
      {/* Hero Carousel */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-products-section>
        {/* Products Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Browse Collection
          </h2>
          <p className="text-gray-600 mb-6">
            {filteredProducts.length} {selectedGenre !== "All" ? `${selectedGenre} ` : ""}digital book{filteredProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Filters */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreFilter(genre)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedGenre === genre
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-white border border-gray-300 text-black hover:bg-gray-50"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
}
