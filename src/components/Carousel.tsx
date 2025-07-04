'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Slide =
  | { type: 'image'; src: string; alt: string; bg?: string }
  | { type: 'color'; color: string };

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slides: Slide[] = [
    { type: 'image', src: '/assets/landing/carousel/4th_july_closed.webp', alt: 'Kinn Thai 4th of July Promo', bg: 'bg-red-700' },
    { type: 'image', src: '/assets/landing/carousel/Kinn_Thai_4th_of_July_Promo.webp', alt: 'Kinn Thai 4th of July Promo', bg: 'bg-red-700' },
    // { type: 'image', src: '/assets/landing/carousel/weRopen.webp', alt: 'Kinn Thai Hours', bg: 'bg-red-100' },
    { type: 'image', src: '/assets/landing/carousel/Curry_Noodle.webp', alt: 'Curry Noodle', bg: 'bg-red-600' },
    { type: 'image', src: '/assets/landing/carousel/Kaprow_Basil_beef.webp', alt: 'Kaprow Basil Beef', bg: 'bg-red-400' },
    { type: 'image', src: '/assets/landing/carousel/Larb_Todd.webp', alt: 'Larb Todd', bg: 'bg-red-300' },
    { type: 'image', src: '/assets/landing/carousel/Padthai_shrimp.webp', alt: 'Pad Thai Shrimp', bg: 'bg-red-500' },
    { type: 'image', src: '/assets/landing/carousel/Spring_roll.webp', alt: 'Spring Roll', bg: 'bg-red-200' },
    { type: 'image', src: '/assets/landing/carousel/Kinn_Thai_Eatery_sign.webp', alt: 'Kinn Thai Eatery Sign', bg: 'bg-red-100' },
    { type: 'image', src: '/assets/landing/carousel/Front_With_Mascot.webp', alt: 'Front With Mascot', bg: 'bg-red-200' },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Pause on hover, touch, or focus
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <div
      ref={carouselRef}
      className="relative w-full overflow-hidden group"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
    >
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden group">
        {/* Slides */}
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative"
              style={{ aspectRatio: '16/9', minHeight: 300 }}
            >
              {slide.type === 'image' ? (
                <div className={`w-full h-full flex items-center justify-center ${'bg' in slide ? slide.bg : 'bg-red-600'}`}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="rounded-lg"
                    priority={index === 0}
                  />
                </div>
              ) : (
                <div className={`w-full h-full ${slide.color}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Always visible on mobile */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Navigation Dots - Always visible */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter - Always visible */}
        <div className="absolute bottom-4 right-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
} 