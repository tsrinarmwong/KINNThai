'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const menuImages = [
  {
    src: '/assets/landing/menu/Lunch_Menu_8-5x11_01.webp',
    alt: 'Lunch Special Menu',
  },
  {
    src: '/assets/landing/menu/Dinner_Menu_8-5x11_01.webp',
    alt: 'Appetizers Menu',
  },
  {
    src: '/assets/landing/menu/Dinner_Menu_8-5x11_02.webp',
    alt: 'Entree Menu',
  },
];

export default function MenuPage() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % menuImages.length);
  const prev = () => setCurrent((prev) => (prev - 1 + menuImages.length) % menuImages.length);

  return (
    <>
      <main className="min-h-screen bg-amber-50 flex flex-col items-center p-0 m-0">
        <div className="w-full flex flex-col items-center">
          {menuImages.map((img, idx) => (
            <div key={idx} className="w-full flex justify-center items-center my-4">
              <Image
                src={img.src}
                alt={img.alt}
                width={850}
                height={1100}
                style={{ width: '100%', height: 'auto' }}
                className="rounded-lg shadow-md w-full md:w-3/5"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </main>
      <div className="fixed bottom-4 left-0 w-full flex justify-center pointer-events-none z-50">
        <a
          href="/"
          className="pointer-events-auto bg-red-600 text-white font-bold rounded-full px-8 py-3 shadow-lg text-lg transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Home
        </a>
      </div>
    </>
  );
} 