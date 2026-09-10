"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getContinueWatchingList,
  removePlaybackProgress,
  formatTimeDisplay,
  PlaybackProgressItem,
} from "@/lib/continue-watching";
import TrailerModal from "@/components/TrailerModal";

export default function ContinueWatchingRow() {
  const [items, setItems] = useState<PlaybackProgressItem[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<PlaybackProgressItem | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const loadItems = () => {
    setItems(getContinueWatchingList());
  };

  useEffect(() => {
    loadItems();
    window.addEventListener("cinesa-continue-watching-updated", loadItems);
    return () => {
      window.removeEventListener("cinesa-continue-watching-updated", loadItems);
    };
  }, []);

  const handleRemove = (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removePlaybackProgress(movieId);
    loadItems();
  };

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      <section className="relative py-4 sm:py-6 w-full group/row">
        {/* Header */}
        <div className="flex items-end justify-between px-3 sm:px-6 md:px-12 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>⏯️ Continue Watching</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-crimson/20 border border-brand-crimson/40 text-brand-crimson font-semibold uppercase tracking-wider">
                  Resume
                </span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Aapne jahan se movie chhodi thi, wahi se dobara start karein
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 rounded-full bg-surface-elevated/80 border border-white/10 text-gray-300 hover:text-white hover:bg-surface-elevated transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 rounded-full bg-surface-elevated/80 border border-white/10 text-gray-300 hover:text-white hover:bg-surface-elevated transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto px-3 sm:px-6 md:px-12 no-scrollbar scroll-smooth py-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((item) => {
            const timeLeft = Math.max(0, item.duration - item.currentTime);

            return (
              <div
                key={item.movieId}
                onClick={() => setSelectedMovie(item)}
                className="relative flex-none w-44 sm:w-56 md:w-64 group/card rounded-xl overflow-hidden bg-surface-muted border border-white/10 hover:border-brand-crimson/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-brand-crimson/20 hover:scale-[1.02]"
              >
                {/* Poster / Backdrop Image */}
                <div className="relative aspect-video w-full bg-surface-elevated overflow-hidden">
                  <Image
                    src={item.backdropUrl || item.posterUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 256px"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-brand-crimson/90 text-white flex items-center justify-center shadow-lg group-hover/card:scale-110 group-hover/card:bg-brand-crimson transition">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Remove / Dismiss Button */}
                  <button
                    onClick={(e) => handleRemove(e, item.movieId)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600/90 text-gray-300 hover:text-white flex items-center justify-center transition border border-white/10 z-10"
                    title="Remove from Continue Watching"
                    aria-label="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Resume Timestamp Badge */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-medium text-emerald-400">
                    <Clock className="w-3 h-3" />
                    <span>Resume {formatTimeDisplay(item.currentTime)}</span>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-2.5 sm:p-3 flex flex-col justify-between">
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover/card:text-brand-crimson transition">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                    <span className="text-amber-400 font-medium">
                      {item.progressPercent}% Watched
                    </span>
                    <span>{formatTimeDisplay(timeLeft)} left</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal for Instant Playback Resume */}
      {selectedMovie && (
        <TrailerModal
          isOpen={true}
          onClose={() => {
            setSelectedMovie(null);
            loadItems();
          }}
          title={selectedMovie.title}
          movieId={selectedMovie.movieId}
          fullMovieKey={selectedMovie.fullMovieKey}
          posterUrl={selectedMovie.posterUrl}
          backdropUrl={selectedMovie.backdropUrl}
          initialStartTime={selectedMovie.currentTime}
        />
      )}
    </>
  );
}
