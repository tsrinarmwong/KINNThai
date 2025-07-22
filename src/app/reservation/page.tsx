'use client';

import { useState, useMemo } from 'react';

const MAX_PARTY = 8;
const NAME_REGEX = /^[A-Za-z\s]+$/;               // Only letters and spaces
const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/;         // 123-456-7890 format

type FormState = {
  name: string;
  phone: string;        // phone with dashes, e.g. 123-456-7890
  partySize: number;
  date: string;         // YYYY-MM-DD
  time: string;         // HH:mm in 24h format
};

export default function ReservationPage() {
  /** Date limits: today to +7 days */
  const { todayISO, maxISO } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const max = new Date(today);
    max.setDate(max.getDate() + 7);

    const iso = (d: Date) => d.toISOString().split('T')[0];
    return { todayISO: iso(today), maxISO: iso(max) };
  }, []);

  /** Time slots: 12:00 ~ 21:00, every 30 minutes */
  const TIME_SLOTS = useMemo(() => {
    const slots: string[] = [];
    const start = 12 * 60; // 12:00 -> 720 minutes
    const end = 21 * 60;   // 21:00 -> 1260 minutes (inclusive)
    for (let mins = start; mins <= end; mins += 30) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; // 24h value
      const labelH = (h % 12) === 0 ? 12 : (h % 12);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const label = `${labelH}:${String(m).padStart(2, '0')} ${ampm}`;
      slots.push(`${value}|${label}`);
    }
    return slots;
  }, []);

  const allowedTimes = useMemo(
    () => new Set(TIME_SLOTS.map(s => s.split('|')[0])),
    [TIME_SLOTS]
  );

  // Local states for raw inputs
  const [partySizeInput, setPartySizeInput] = useState('1');
  const [phoneInput, setPhoneInput] = useState('');

  // Error flags
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Form data to submit
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    partySize: 1,
    date: '',
    time: '',
  });

  const [status, setStatus] = useState<
    | 'idle'
    | 'sending'
    | 'success'
    | 'error'
    | 'tooLarge'
    | 'dateOutOfRange'
    | 'nameInvalid'
    | 'phoneInvalid'
    | 'timeInvalid'
  >('idle');

  /** Format digits to xxx-xxx-xxxx */
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    const len = digits.length;
    if (len <= 3) return digits;
    if (len <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  /** Handle all inputs change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'partySize') {
      const digits = value.replace(/\D/g, '');
      setPartySizeInput(digits);
      return;
    }

    if (name === 'phone') {
      const formatted = formatPhone(value);
      setPhoneInput(formatted);
      setPhoneError(formatted !== '' && !PHONE_REGEX.test(formatted));
      return;
    }

    if (name === 'name') {
      setNameError(value !== '' && !NAME_REGEX.test(value));
      setForm(prev => ({ ...prev, name: value }));
      return;
    }

    // date or time
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePartyBlur = () => {
    const num = Number(partySizeInput || '0');
    const clamped = Math.max(1, Math.min(MAX_PARTY, num));
    setPartySizeInput(String(clamped));
    setForm(prev => ({ ...prev, partySize: clamped }));
  };

  const handlePhoneBlur = () => {
    setForm(prev => ({ ...prev, phone: phoneInput }));
    setPhoneError(phoneInput !== '' && !PHONE_REGEX.test(phoneInput));
  };

  /** Final submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Party size check
    const sizeNum = Number(partySizeInput || '0');
    if (sizeNum < 1 || sizeNum > MAX_PARTY) {
      setStatus('tooLarge');
      return;
    }

    // Name check
    if (!NAME_REGEX.test(form.name)) {
      setStatus('nameInvalid');
      setNameError(true);
      return;
    }

    // Phone check
    if (!PHONE_REGEX.test(phoneInput)) {
      setStatus('phoneInvalid');
      setPhoneError(true);
      return;
    }

    // Date check
    const chosen = new Date(form.date);
    const min = new Date(todayISO);
    const max = new Date(maxISO);
    if (isNaN(chosen.getTime()) || chosen < min || chosen > max) {
      setStatus('dateOutOfRange');
      return;
    }

    // Time check
    if (!allowedTimes.has(form.time)) {
      setStatus('timeInvalid');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          partySize: sizeNum,
          phone: phoneInput,
        }),
      });

      if (res.ok) {
        setStatus('success');
        // Reset all
        setPartySizeInput('1');
        setPhoneInput('');
        setNameError(false);
        setPhoneError(false);
        setForm({ name: '', phone: '', partySize: 1, date: '', time: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/landing/backgrounds/vibe02.webp')" }}
    >
      <div className="min-h-screen bg-white/80 backdrop-blur-sm py-12 px-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Booking at KINN THAI</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                aria-invalid={nameError}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  nameError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-400'
                }`}
                placeholder="Kevin"
              />
              {nameError && (
                <p className="mt-1 text-sm text-red-600">Only letters and spaces are allowed.</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone Number * (123-456-7890)</label>
              <input
                type="text"
                name="phone"
                inputMode="numeric"
                pattern="\d{3}-\d{3}-\d{4}"
                value={phoneInput}
                onChange={handleChange}
                onBlur={handlePhoneBlur}
                required
                aria-invalid={phoneError}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  phoneError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-400'
                }`}
                placeholder="123-456-7890"
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600">
                  Phone must match 123-456-7890 format.
                </p>
              )}
            </div>

            {/* Party Size */}
            <div>
              <label className="block mb-1 font-medium">Party size * (max {MAX_PARTY})</label>
              <input
                type="text"
                name="partySize"
                inputMode="numeric"
                pattern="[0-9]*"
                value={partySizeInput}
                onChange={handleChange}
                onBlur={handlePartyBlur}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="1~8"
              />
              {status === 'tooLarge' && (
                <p className="mt-1 text-sm text-red-600">Party size cannot exceed {MAX_PARTY}.</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 font-medium">Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={todayISO}
                max={maxISO}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {status === 'dateOutOfRange' && (
                <p className="mt-1 text-sm text-red-600">
                  Date must be between {todayISO} and {maxISO}.
                </p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label className="block mb-1 font-medium">Time *</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select a time</option>
                {TIME_SLOTS.map(slot => {
                  const [value, label] = slot.split('|');
                  return (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
              {status === 'timeInvalid' && (
                <p className="mt-1 text-sm text-red-600">Please select a valid time slot.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Confirm'}
            </button>
          </form>

          {/* Result messages */}
          {status === 'success' && (
            <p className="mt-4 text-green-600 text-center">
              Success, you will receive a confirmation message soon.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-600 text-center">
              Error, please try again later.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
