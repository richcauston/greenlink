"use client";

import { TeeTime, Course } from "@/types";
import { formatPrice, formatTime, formatDate } from "@/lib/utils";
import { useState } from "react";

interface BookingModalProps {
  teeTime: TeeTime;
  course: Course;
  onClose: () => void;
}

export default function BookingModal({ teeTime, course, onClose }: BookingModalProps) {
  const [players, setPlayers] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  const totalPrice = teeTime.price * players;

  if (confirmed) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            You&apos;re all set for {course.name}
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="font-semibold text-gray-900">{formatDate(teeTime.date)} at {formatTime(teeTime.time)}</p>
            <p className="text-sm text-gray-500 mt-2">Players</p>
            <p className="font-semibold text-gray-900">{players}</p>
            <p className="text-sm text-gray-500 mt-2">Total</p>
            <p className="font-semibold text-gray-900">{formatPrice(totalPrice)} CAD</p>
          </div>
          <p className="text-xs text-gray-400 mb-4">A confirmation email has been sent (demo)</p>
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Book Tee Time</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-gray-900">{course.name}</h3>
          <p className="text-sm text-gray-500">{course.city}, {course.province}</p>
          <div className="flex justify-between mt-2">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-900">{formatDate(teeTime.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium text-gray-900">{formatTime(teeTime.time)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Per Player</p>
              <p className="font-medium text-gray-900">{formatPrice(teeTime.price)}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Players</label>
          <select
            value={players}
            onChange={(e) => setPlayers(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {Array.from({ length: teeTime.spotsRemaining }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Player" : "Players"}</option>
            ))}
          </select>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Green fee x {players}</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          {teeTime.cartIncluded && (
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Cart</span>
              <span className="text-emerald-600">Included</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-gray-900 text-lg mt-2">
            <span>Total</span>
            <span>{formatPrice(totalPrice)} CAD</span>
          </div>
        </div>

        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
        >
          Confirm Booking
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">This is a demo. No real booking will be made.</p>
      </div>
    </div>
  );
}
