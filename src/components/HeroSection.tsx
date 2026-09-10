"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Info,
  Star,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Movie } from "../types";
import WatchlistButton from "./WatchlistButton";
import TrailerModal from "./TrailerModal";

interface HeroSectionProps {
  movie?: Movie;
  movies?: Movie[];
}

const ROTATION_INTERVAL_MS = 6000;

export default function HeroSection({ movie, movies }: HeroSectionProps) {
  const heroList: Movie[] =
    movies && movies.length > 0 ? movies : movie ? [movie] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    if (heroList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % heroList.length);
  }, [heroList.length]);

  const prevSlide = useCallback(() => {
    if (heroList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + heroList.length) % heroList.length);
  }, [heroList.length]);

  // Auto rotation timer
  useEffect(() => {
    if (heroList.length <= 1 || isPaused || playerOpen) return;

    const interval = setInterval(() => {
      nextSlide();
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [heroList.length, isPaused, playerOpen, nextSlide, currentIndex]);

  if (heroList.length === 0) return null;

  const currentMovie = heroList[currentIndex] || heroList[0];

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <>
      <div
        className="relative w-full min-h-[82vh] sm:min-h-[88vh] lg:min-h-[94vh] flex items-end pb-14 sm:pb-20 md:pb-28 pt-28 overflow-hidden bg-background select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Layered Backdrop Images with Smooth Cross-Fade */}
        <div className="absolute inset-0 z-0">
          {heroList.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 pointer-events-none scale-105"
                } transition-transform duration-1000`}
              >
                <Image
                  src={item.backdropUrl || item.posterUrl}
                  alt={item.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-top filter brightness-[0.72]"
                />
              </div>
            );
          })}

          {/* Cinematic Vignette Gradients */}
          {/* Bottom Gradient Fade */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Left Dark Shadow for Typography Readability */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-3/4" />
          {/* Top Subtle Dark Bar for Navbar */}
          <div className="absolute top-0 inset-x-0 h-32 z-20 bg-gradient-to-b from-background/90 to-transparent" />
        </div>

        {/* Previous / Next Arrow Controls */}
        {heroList.length > 1 && (
          <div className="hidden sm:flex items-center justify-between absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <button
              onClick={prevSlide}
              aria-label="Previous Featured Series"
              className="p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 pointer-events-auto hover:scale-110 active:scale-95 shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Featured Series"
              className="p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 pointer-events-auto hover:scale-110 active:scale-95 shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Hero Content Layer */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="max-w-3xl">
            {/* Meta Tags: Series Badge, Rating, Year, Runtime, 4K Badge */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold mb-3">
              {/* Featured Series Live Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="uppercase tracking-wider text-[11px] font-bold">
                  Featured Mega Series • {currentIndex + 1}/{heroList.length}
                </span>
              </div>

              {/* IMDb / Rating */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-brand-gold/40 text-brand-gold">
                <Star className="w-4 h-4 fill-brand-gold" />
                <span>{currentMovie.voteAverage ? currentMovie.voteAverage.toFixed(1) : "9.2"} IMDb</span>
              </div>

              {/* Release Year */}
              {currentMovie.releaseYear && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-gray-300">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{currentMovie.releaseYear}</span>
                </div>
              )}

              {/* Runtime */}
              {currentMovie.runtime && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{currentMovie.runtime} min</span>
                </div>
              )}

              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-gray-200">
                Ultra HD 4K
              </span>
            </div>

            {/* Movie / Series Title with key for transition animation */}
            <h1
              key={`title-${currentMovie.id}`}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl leading-[1.1] animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {currentMovie.title}
            </h1>

            {/* Tagline / Genres */}
            <div
              key={`meta-${currentMovie.id}`}
              className="flex flex-wrap items-center gap-2 mt-3 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-300"
            >
              {currentMovie.genres?.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/10 text-gray-200"
                >
                  {genre.name}
                </span>
              ))}
              {currentMovie.tagline && (
                <span className="hidden sm:inline text-xs text-amber-300/90 font-medium italic ml-2 border-l border-white/20 pl-3">
                  &quot;{currentMovie.tagline}&quot;
                </span>
              )}
            </div>

            {/* Synopsis */}
            <p
              key={`desc-${currentMovie.id}`}
              className="text-sm sm:text-base md:text-lg text-gray-300 line-clamp-3 leading-relaxed drop-shadow max-w-2xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              {currentMovie.overview}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
              {/* Watch Full Episode / Movie (Ad-Free HD) */}
              <button
                onClick={() => setPlayerOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/60 border border-emerald-400/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>{currentMovie.isSeries ? "Watch Episode 1" : "Watch Full Movie"}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/30 text-emerald-200 border border-emerald-300/30">
                  Ad-Free HD
                </span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Add to Watchlist */}
                <WatchlistButton
                  movieId={currentMovie.id}
                  initialInWatchlist={currentMovie.isWatchlist}
                  variant="secondary"
                  className="flex-1 sm:flex-initial py-3.5 px-5 rounded-xl text-sm sm:text-base font-semibold justify-center"
                />

                {/* More Details */}
                <Link
                  href={`/movie/${currentMovie.id}`}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition"
                >
                  <Info className="w-4 h-4" />
                  <span>Details</span>
                </Link>
              </div>
            </div>

            {/* Auto-Rotating Slide Navigator Pills */}
            {heroList.length > 1 && (
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-2">
                {heroList.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  const shortName = item.title
                    .replace(/ - Episode \d+/i, "")
                    .replace(/ \(Urdu Dubbed\)/i, "")
                    .replace(/ \(Kudüs Fatihi\)/i, "")
                    .trim();

                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative overflow-hidden text-left px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border backdrop-blur-md ${
                        isActive
                          ? "bg-white/15 text-white border-emerald-400/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400/40"
                          : "bg-black/40 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-400">0{idx + 1}</span>
                        <span className="truncate max-w-[120px] sm:max-w-[160px]">{shortName}</span>
                      </div>

                      {/* Animated Progress Line on Active Slide */}
                      {isActive && (
                        <div
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-300"
                          style={{
                            width: "100%",
                            animation: !isPaused && !playerOpen ? `heroProgress ${ROTATION_INTERVAL_MS}ms linear infinite` : "none"
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ad-Free Full Movie / Series Player Modal */}
      <TrailerModal
        isOpen={playerOpen}
        onClose={() => setPlayerOpen(false)}
        trailerKey={currentMovie.trailerKey}
        trailerUrl={currentMovie.trailerUrl}
        fullMovieKey={currentMovie.fullMovieKey}
        imdbId={currentMovie.imdbId}
        tmdbId={currentMovie.tmdbId}
        backdropUrl={currentMovie.backdropUrl}
        title={currentMovie.title}
        movieId={currentMovie.id}
        posterUrl={currentMovie.posterUrl}
        episodes={currentMovie.episodes}
      />
    </>
  );
}
