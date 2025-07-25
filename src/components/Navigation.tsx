'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
  ];
  const orderLinks = [
    {
      name: 'Doordash',
      href: 'https://www.doordash.com/store/kinn-thai-eatery-west-lafayette-34903695/72770630/?pickup=true',
      color: 'text-red-600',
    },
    {
      name: 'Ubereats',
      href: 'https://www.ubereats.com/store/kinn-thai-eatery/HXR5cnScTn6c2y8zGqEQYw?srsltid=AfmBOooYd4BQdf7BctwGYP7K4Ox_i4dq5FjVNQ8ClkybKq7lBzieCpap',
      color: 'text-black',
    },
  ];
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-red-600">KINN THAI</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
            {/* Email for Catering */}
            <a
              href="mailto:kinnthai.group@gmail.com"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            >
              Email for Catering
            </a>
            {/* Order Online Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOrderOpen((open) => !open)}
                onBlur={() => setTimeout(() => setIsOrderOpen(false), 150)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 focus:outline-none"
              >
                Order Online <span aria-hidden>▼</span>
              </button>
              {isOrderOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-20">
                  {orderLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 ${link.color}`}
                    >
                      {link.name} <span aria-hidden>→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {/* Email for Catering */}
          <a
            href="mailto:kinnthai.group@gmail.com"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Email for Catering
          </a>
          {/* Order Online submenu */}
          <div className="mt-2">
            <div className="px-3 py-2 text-base font-medium text-gray-700">Order Online</div>
            <div className="pl-4">
              {orderLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-3 py-2 rounded-md text-base hover:bg-gray-100 ${link.color}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name} <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 