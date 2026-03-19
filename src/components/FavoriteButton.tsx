"use client";

import { useState, useEffect } from "react";

interface FavoriteButtonProps {
  courseId: string;
  size?: "sm" | "md";
}

export default function FavoriteButton({ courseId, size = "md" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("greenlink_favorites") || "[]");
    setIsFavorite(favs.includes(courseId));
  }, [courseId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favs: string[] = JSON.parse(localStorage.getItem("greenlink_favorites") || "[]");
    let updated: string[];
    if (favs.includes(courseId)) {
      updated = favs.filter((id) => id !== courseId);
    } else {
      updated = [...favs, courseId];
    }
    localStorage.setItem("greenlink_favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const sizeClass = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={toggle}
      className={`${sizeClass} bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`${iconSize} ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"}`}
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
