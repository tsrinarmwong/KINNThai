'use client';

import { useState } from 'react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Send email (existing functionality)
      const emailBody = `
New Reservation Request:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Party Size: ${formData.partySize}
Special Requests: ${formData.specialRequests}
      `;
      
      const mailtoLink = `mailto:kinnthai.group@gmail.com?subject=Reservation Request - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);

      // 2. Send POS notification to Toast terminals
      try {
        const notificationResponse = await fetch('/api/send-toast-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guestName: formData.name,
            guestEmail: formData.email,
            guestPhone: formData.phone,
            partySize: parseInt(formData.partySize),
            reservationDate: formData.date,
            reservationTime: formData.time,
            specialRequests: formData.specialRequests,
          }),
        });

        if (notificationResponse.ok) {
          console.log('Toast notification sent successfully');
        } else {
          console.warn('Toast notification failed, but reservation still recorded');
        }
      } catch (notificationError) {
        console.warn('Toast notification error:', notificationError);
        // Don't fail the whole reservation if notification fails
      }
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          partySize: '',
          specialRequests: ''
        });
      }, 2000);
         } catch {
       setSubmitStatus('error');
     } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Make a Reservation</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              Reservation request sent! We&apos;ll contact you to confirm.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              Something went wrong. Please try again or call us directly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select time</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-1">
                Party Size *
              </label>
              <select
                id="partySize"
                name="partySize"
                required
                value={formData.partySize}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select party size</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                  <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
                ))}
                <option value="9+">9+ people</option>
              </select>
            </div>

            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Any special requests or dietary restrictions..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Request Reservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 