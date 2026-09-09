"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, Star, Clock, Calendar } from "lucide-react";
import { Movie } from "../types";
import WatchlistButton from "./WatchlistButton";
import TrailerModal from "./TrailerModal";

interface HeroSectionProps {
  movie: Movie;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <>
      <div className="relative w-full min-h-[78vh] sm:min-h-[85vh] lg:min-h-[92vh] flex items-end pb-12 sm:pb-16 md:pb-24 pt-28 overflow-hidden bg-background">
        {/* Full Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={movie.backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover object-top filter brightness-[0.75]"
          />

          {/* Cinematic Vignette Gradients */}
          {/* Bottom Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Left Dark Shadow for Typography Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-3/4" />
          {/* Top Subtle Dark Bar for Navbar */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background/90 to-transparent" />
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="max-w-3xl">
            {/* Meta Tags: Rating, Year, Runtime, 4K Badge */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold mb-3">
              {/* IMDb Rating */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-brand-gold/40 text-brand-gold">
                <Star className="w-4 h-4 fill-brand-gold" />
                <span>{movie.voteAverage.toFixed(1)} IMDb</span>
              </div>

              {/* Release Year */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{movie.releaseYear}</span>
              </div>

              {/* Runtime */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-gray-300">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{movie.runtime} min</span>
              </div>

              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-gray-300">
                Ultra HD 4K
              </span>
            </div>

            {/* Movie Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
              {movie.title}
            </h1>

            {/* Tagline / Genres */}
            <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/10 text-gray-200"
                >
                  {genre.name}
                </span>
              ))}
              {movie.tagline && (
                <span className="hidden sm:inline text-xs text-gray-400 font-light italic ml-2 border-l border-white/20 pl-3">
                  &quot;{movie.tagline}&quot;
                </span>
              )}
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 line-clamp-3 leading-relaxed drop-shadow max-w-2xl mb-8">
              {movie.overview}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Watch Movie (Ad-Free HD) */}
              <button
                onClick={() => setPlayerOpen(true)}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/60 border border-emerald-400/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Watch Full Movie</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/30 text-emerald-200 border border-emerald-300/30">
                  Ad-Free HD
                </span>
              </button>

              {/* Add to Watchlist */}
              <WatchlistButton
                movieId={movie.id}
                initialInWatchlist={movie.isWatchlist}
                variant="secondary"
                className="py-3.5 px-6 rounded-xl text-sm sm:text-base font-semibold"
              />

              {/* More Details */}
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <Info className="w-4 h-4" />
                <span>Details</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ad-Free Full Movie Player Modal */}
      <TrailerModal
        isOpen={playerOpen}
        onClose={() => setPlayerOpen(false)}
        trailerKey={movie.trailerKey}
        trailerUrl={movie.trailerUrl}
        fullMovieKey={movie.fullMovieKey}
        imdbId={movie.imdbId}
        tmdbId={movie.tmdbId}
        backdropUrl={movie.backdropUrl}
        title={movie.title}
      />
    </>
  );
}
