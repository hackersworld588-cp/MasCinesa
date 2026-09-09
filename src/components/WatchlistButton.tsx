"use client";

import React, { useState } from "react";
import { Bookmark, Check } from "lucide-react";

interface WatchlistButtonProps {
  movieId: string;
  initialInWatchlist?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "icon";
  onToggle?: (inWatchlist: boolean) => void;
}

export default function WatchlistButton({
  movieId,
  initialInWatchlist = false,
  className = "",
  variant = "primary",
  onToggle,
}: WatchlistButtonProps) {
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextState = !inWatchlist;
    setInWatchlist(nextState);
    if (onToggle) onToggle(nextState);

    setLoading(true);
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId, action: nextState ? "add" : "remove" }),
      });
      if (!res.ok) {
        // Revert on error
        setInWatchlist(!nextState);
        if (onToggle) onToggle(!nextState);
      }
    } catch (err) {
      setInWatchlist(!nextState);
      if (onToggle) onToggle(!nextState);
    } finally {
      setLoading(false);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        disabled={loading}
        title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
          inWatchlist
            ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
            : "bg-black/60 text-white/90 hover:bg-black/80 hover:text-white hover:scale-105"
        } ${className}`}
      >
        {inWatchlist ? (
          <Check className="w-5 h-5 stroke-[2.5]" />
        ) : (
          <Bookmark className="w-5 h-5" />
        )}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border ${
          inWatchlist
            ? "bg-brand-red/20 text-brand-crimson border-brand-red/50 hover:bg-brand-red/30"
            : "bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:border-white/20"
        } ${className}`}
      >
        {inWatchlist ? (
          <>
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>In Watchlist</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4" />
            <span>Add to Watchlist</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md ${
        inWatchlist
          ? "bg-white/15 text-white border border-white/20 hover:bg-white/25"
          : "bg-brand-red text-white hover:bg-red-700 glow-red hover:scale-[1.02]"
      } ${className}`}
    >
      {inWatchlist ? (
        <>
          <Check className="w-4 h-4 stroke-[3]" />
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4 fill-current" />
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
}
