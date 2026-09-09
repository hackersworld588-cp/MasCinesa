"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";

interface MovieRowProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  badge?: string;
}

export default function MovieRow({
  title,
  subtitle,
  movies,
  badge,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

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

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative py-6 sm:py-8 w-full group/row">
      {/* Header Row */}
      <div className="flex items-end justify-between px-4 sm:px-8 md:px-12 mb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {title}
            </h3>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-brand-red/20 border border-brand-red/30 text-brand-crimson text-xs font-semibold uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 rounded-full bg-surface-elevated/80 border border-white/10 text-gray-300 hover:text-white hover:bg-surface-elevated transition"
            aria-label="Previous movies"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-2 rounded-full bg-surface-elevated/80 border border-white/10 text-gray-300 hover:text-white hover:bg-surface-elevated transition"
            aria-label="Next movies"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={rowRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-4 sm:px-8 md:px-12 scroll-smooth py-2"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[170px] sm:w-[220px] md:w-[240px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
