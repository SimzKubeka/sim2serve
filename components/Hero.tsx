"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  {
    id: 1,
    image: "https://placehold.co/1200x600/6366f1/ffffff?text=one&font=poppins",
    title: "Travel Adventures",
    subtitle: "Explore the world through stories",
  },
  {
    id: 2,
    image: "https://placehold.co/1200x600/059669/ffffff?text=two&font=poppins",
    title: "Capture the Moment",
    subtitle: "Photography guides for travelers",
  },
  {
    id: 3,
    image: "https://placehold.co/1200x600/7c3aed/ffffff?text=three&font=poppins",
    title: "Personal Growth",
    subtitle: "Transform your mindset",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Set mounted on client only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [mounted]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroImages.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 ${mounted ? 'transition-opacity duration-1000' : ''} ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-100 mb-6">
                      {slide.subtitle}
                    </p>
                    <button 
                      onClick={() => {
                        // Scroll to products section
                        const productsSection = document.querySelector('[data-products-section]');
                        if (productsSection) {
                          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      Browse Books
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-blue-600"
                : "w-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

