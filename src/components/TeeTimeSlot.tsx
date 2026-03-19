"use client";

import { TeeTime } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";

interface TeeTimeSlotProps {
  teeTime: TeeTime;
  onBook: (teeTime: TeeTime) => void;
}

export default function TeeTimeSlot({ teeTime, onBook }: TeeTimeSlotProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatTime(teeTime.time)}</p>
        </div>
        <div className="border-l border-gray-200 dark:border-slate-600 pl-4">
          <p className="text-sm text-gray-600 dark:text-slate-300">
            {teeTime.spotsRemaining} {teeTime.spotsRemaining === 1 ? "spot" : "spots"} left
          </p>
          {teeTime.cartIncluded && (
            <p className="text-xs text-gray-400 dark:text-slate-500">Cart included</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(teeTime.price)}</p>
        <button
          onClick={() => onBook(teeTime)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
        >
          Book
        </button>
      </div>
    </div>
  );
}
