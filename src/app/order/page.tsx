'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { ToastService } from '@/services/toast';
import type { MenuItem } from '@/services/toast';

export default function OrderPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await ToastService.getMenu();
        setMenu(menuData);
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menu...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Order Online</h1>
        
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menu.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.imageUrl && (
                <div className="relative h-48">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-2">
                    {cart[item.id] > 0 && (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200"
                      >
                        -
                      </button>
                    )}
                    <span className="w-8 text-center">{cart[item.id] || 0}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <span className="font-semibold">
                  {Object.values(cart).reduce((a, b) => a + b, 0)} items
                </span>
              </div>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                onClick={() => {
                  // TODO: Implement checkout
                  console.log('Checkout clicked', cart);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 