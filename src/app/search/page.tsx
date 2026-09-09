"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, SlidersHorizontal, RotateCcw, Film } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/SkeletonLoader";
import { Movie } from "@/types";

const ALL_GENRES = [
  "All",
  "Science Fiction",
  "Drama",
  "Action",
  "Thriller",
  "Mystery",
  "Crime",
  "Comedy",
  "Animation",
  "Family",
  "Horror",
  "Music",
];

const STREAMING_PLATFORMS = ["All", "Netflix", "Prime Video", "Apple TV", "Max", "Disney+"];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [genre, setGenre] = useState(initialGenre);
  const [director, setDirector] = useState("");
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [runtimeMax, setRuntimeMax] = useState<number>(200);
  const [streaming, setStreaming] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredMovies();
    }, 250);
    return () => clearTimeout(timer);
  }, [query, genre, director, ratingMin, runtimeMax, streaming, sortBy]);

  const fetchFilteredMovies = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (genre && genre !== "All") params.append("genre", genre);
      if (director) params.append("director", director);
      if (ratingMin > 0) params.append("ratingMin", String(ratingMin));
      if (runtimeMax < 200) params.append("runtimeMax", String(runtimeMax));
      if (streaming && streaming !== "All") params.append("streaming", streaming);
      params.append("sortBy", sortBy);

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      if (data.movies) setMovies(data.movies);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setQuery("");
    setGenre("All");
    setDirector("");
    setRatingMin(0);
    setRuntimeMax(200);
    setStreaming("All");
    setSortBy("popularity");
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Title & Search Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore & Search Films
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Search with typo-tolerance across titles, actors, directors, genres, and streaming networks
        </p>
      </div>

      {/* Main Search Input & Filter Toggle Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by movie title, actor, or director..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-panel border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-red text-sm sm:text-base shadow-lg"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-semibold transition ${
            showFilters
              ? "bg-brand-red text-white border-brand-red"
              : "glass-panel border-white/10 text-gray-200 hover:bg-white/10"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {(genre !== "All" || director || ratingMin > 0 || streaming !== "All") && (
            <span className="w-2 h-2 rounded-full bg-brand-crimson" />
          )}
        </button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3.5 rounded-2xl glass-panel border border-white/10 text-gray-200 font-semibold text-sm focus:outline-none focus:border-brand-red"
        >
          <option value="popularity" className="bg-surface text-white">Most Popular</option>
          <option value="vote_average" className="bg-surface text-white">Highest Rated</option>
          <option value="release_date" className="bg-surface text-white">Latest Released</option>
          <option value="vote_count" className="bg-surface text-white">Most Watched</option>
        </select>
      </div>

      {/* Expandable Advanced Filter Drawer */}
      {showFilters && (
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-200">
          {/* Genre Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-red"
            >
              {ALL_GENRES.map((g) => (
                <option key={g} value={g} className="bg-surface text-white">
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Director Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">
              Director Name
            </label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              placeholder="e.g. Christopher Nolan"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-red"
            />
          </div>

          {/* Min Rating Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-400">
                Min Rating
              </label>
              <span className="text-xs font-bold text-brand-gold">
                {ratingMin > 0 ? `★ ${ratingMin.toFixed(1)}+` : "Any"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="9"
              step="0.5"
              value={ratingMin}
              onChange={(e) => setRatingMin(Number(e.target.value))}
              className="w-full accent-brand-gold h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          {/* Streaming Platform */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">
              Streaming Platform
            </label>
            <select
              value={streaming}
              onChange={(e) => setStreaming(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-red"
            >
              {STREAMING_PLATFORMS.map((p) => (
                <option key={p} value={p} className="bg-surface text-white">
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2 border-t border-white/5">
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs sm:text-sm text-gray-400">
          Showing <span className="font-bold text-white">{movies.length}</span> films
        </p>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="p-16 text-center rounded-2xl glass-panel max-w-md mx-auto">
          <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-white">No Movies Found</h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background text-gray-100 pt-28 px-8 max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-white/10 rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
