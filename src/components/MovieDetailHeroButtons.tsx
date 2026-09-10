"use client";

import React, { useState } from "react";
import { Play, Star, Share2, Check } from "lucide-react";
import { Episode } from "@/types";
import WatchlistButton from "./WatchlistButton";
import TrailerModal from "./TrailerModal";

interface MovieDetailHeroButtonsProps {
  movieId: string;
  title: string;
  imdbId?: string | null;
  tmdbId?: number | null;
  backdropUrl?: string | null;
  trailerKey?: string | null;
  trailerUrl?: string | null;
  fullMovieKey?: string | null;
  isFreeWatch?: boolean;
  isSeries?: boolean;
  episodes?: Episode[];
  initialInWatchlist: boolean;
  initialUserRating?: number | null;
}

export default function MovieDetailHeroButtons({
  movieId,
  title,
  imdbId,
  tmdbId,
  backdropUrl,
  trailerKey,
  trailerUrl,
  fullMovieKey,
  isFreeWatch,
  isSeries,
  episodes,
  initialInWatchlist,
  initialUserRating,
}: MovieDetailHeroButtonsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(initialUserRating || null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRate = async (score: number) => {
    setUserRating(score);
    setRatingOpen(false);
    try {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId, score }),
      });
    } catch (e) {}
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 relative">
        {/* Watch Full Movie / Series (Ad-Free HD) */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/60 border border-emerald-400/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>{isSeries ? "Watch Series" : "Watch Full Movie"}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/30 text-emerald-200 border border-emerald-300/30">
            Ad-Free HD
          </span>
        </button>

        {/* Watchlist Toggle */}
        <WatchlistButton
          movieId={movieId}
          initialInWatchlist={initialInWatchlist}
          variant="secondary"
          className="py-3.5 px-5 text-sm sm:text-base font-semibold"
        />

        {/* 1-10 User Rating Trigger */}
        <div className="relative">
          <button
            onClick={() => setRatingOpen(!ratingOpen)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
              userRating
                ? "bg-brand-gold/20 text-brand-gold border-brand-gold/40 hover:bg-brand-gold/30"
                : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Star className={`w-4 h-4 ${userRating ? "fill-brand-gold text-brand-gold" : ""}`} />
            <span>{userRating ? `Rated ${userRating}/10` : "Rate Movie"}</span>
          </button>

          {/* 1-10 Rating Popover */}
          {ratingOpen && (
            <div className="absolute left-0 mt-2 p-3 rounded-2xl bg-surface border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <p className="text-xs text-gray-400 font-semibold mb-2">Rate on 1-10 Scale</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => {
                  const val = i + 1;
                  const active = (hoverRating !== null ? hoverRating >= val : (userRating || 0) >= val);
                  return (
                    <button
                      key={val}
                      onMouseEnter={() => setHoverRating(val)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => handleRate(val)}
                      className="p-1 text-gray-500 hover:scale-125 transition-transform"
                      title={`${val}/10`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          active ? "text-brand-gold fill-brand-gold" : "text-gray-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
          title="Share movie link"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Full Movie / Series Cinema Player Modal */}
      <TrailerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        trailerKey={trailerKey}
        trailerUrl={trailerUrl}
        fullMovieKey={fullMovieKey}
        imdbId={imdbId}
        tmdbId={tmdbId}
        backdropUrl={backdropUrl}
        title={title}
        movieId={movieId}
        posterUrl={backdropUrl || undefined}
        episodes={episodes}
      />
    </>
  );
}
