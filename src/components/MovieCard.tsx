"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Play, Sparkles } from "lucide-react";
import { Movie } from "../types";
import WatchlistButton from "./WatchlistButton";
import TrailerModal from "./TrailerModal";

interface MovieCardProps {
  movie: Movie;
  matchScore?: number; // e.g. 96 for AI recommendation badge
  explanation?: string;
  priority?: boolean;
}

export default function MovieCard({
  movie,
  matchScore,
  explanation,
  priority = false,
}: MovieCardProps) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(movie.posterUrl);

  const primaryGenre = movie.genres?.[0]?.name || "Cinema";

  return (
    <>
      <div className="group relative flex flex-col w-full rounded-2xl overflow-hidden glass-panel glass-panel-hover transition-all duration-300">
        {/* Top Poster Container */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-muted">
          {/* Image with instant loading & fallback */}
          <Image
            src={imgSrc || movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 260px"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            onError={() => {
              if (movie.fullMovieKey || movie.trailerKey) {
                setImgSrc(`https://i.ytimg.com/vi/${movie.fullMovieKey || movie.trailerKey}/hqdefault.jpg`);
              }
            }}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

          {/* Free Movie, Series, Hindi Dubbed, or AI Match Badge */}
          {movie.isSeries ? (
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/95 backdrop-blur-md text-white font-bold text-[11px] shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
              <Play className="w-2.5 h-2.5 fill-white" />
              <span>{movie.episodes?.length || movie.totalEpisodes || 3} Episodes</span>
            </div>
          ) : movie.isFreeWatch ? (
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-bold text-[11px] shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
              <Play className="w-2.5 h-2.5 fill-white" />
              <span>Free Movie</span>
            </div>
          ) : movie.originCountry === "US" && (movie.language === "hi" || movie.streamingPlatforms?.some((p) => p.includes("Hindi"))) ? (
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-600/90 backdrop-blur-md text-white font-bold text-[11px] shadow-md border border-amber-400/30">
              <span>Hindi Dubbed</span>
            </div>
          ) : matchScore ? (
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-purple/90 backdrop-blur-md text-white font-bold text-xs shadow-lg shadow-purple-900/40">
              <Sparkles className="w-3 h-3 text-purple-200 fill-current" />
              <span>{matchScore}% Match</span>
            </div>
          ) : null}

          {/* Rating Badge */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white font-semibold text-xs">
            <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
            <span>{movie.voteAverage > 0 ? movie.voteAverage.toFixed(1) : "8.5"}</span>
          </div>

          {/* Hover Quick Action Buttons */}
          <div className="absolute inset-x-0 bottom-3 px-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTrailerOpen(true);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-semibold text-xs transition hover:scale-102 shadow-lg ${
                movie.isFreeWatch && movie.fullMovieKey
                  ? "bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
                  : "bg-white/90 text-black hover:bg-white"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{movie.isSeries ? "Watch Series" : "Watch Movie"}</span>
            </button>

            <WatchlistButton
              movieId={movie.id}
              initialInWatchlist={movie.isWatchlist}
              variant="icon"
            />
          </div>
        </div>

        {/* Bottom Details Container */}
        <Link
          href={`/movie/${movie.id}`}
          className="flex flex-col flex-1 p-3.5 sm:p-4 text-left focus:outline-none"
        >
          {/* Genre & Year Pills */}
          <div className="flex items-center justify-between gap-2 text-xs text-gray-400 mb-1.5">
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 font-medium text-gray-300 truncate">
              {primaryGenre}
            </span>
            <span className="font-mono text-gray-400">{movie.releaseYear}</span>
          </div>

          {/* Movie Title */}
          <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-brand-crimson transition-colors line-clamp-1">
            {movie.title}
          </h4>

          {/* Optional AI Explanation Snippet */}
          {explanation && (
            <p className="mt-1.5 text-xs text-gray-400 line-clamp-2 leading-relaxed italic">
              &quot;{explanation}&quot;
            </p>
          )}

          {/* Runtime or Series Episode Count */}
          {movie.isSeries ? (
            <p className="mt-1 text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <span>📺</span>
              <span>{movie.episodes?.length || movie.totalEpisodes || 3} Episodes (Serial-Wise)</span>
            </p>
          ) : !explanation && (
            <p className="mt-1 text-xs text-gray-500">
              {movie.runtime ? `${movie.runtime} min` : "120 min"}
            </p>
          )}
        </Link>
      </div>

      {/* Ad-Free Full Movie Player Modal */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerKey={movie.trailerKey}
        trailerUrl={movie.trailerUrl}
        fullMovieKey={movie.fullMovieKey}
        imdbId={movie.imdbId}
        tmdbId={movie.tmdbId}
        backdropUrl={movie.backdropUrl}
        title={movie.title}
        movieId={movie.id}
        posterUrl={imgSrc || movie.posterUrl}
        episodes={movie.episodes}
      />
    </>
  );
}
