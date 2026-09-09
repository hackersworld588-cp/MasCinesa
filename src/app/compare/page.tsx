"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scale, Star, Clock, Calendar, Trophy, Sparkles, Check, ArrowRight } from "lucide-react";
import { Movie } from "@/types";

export default function MovieComparisonPage() {
  const [movieAId, setMovieAId] = useState("Interstellar");
  const [movieBId, setMovieBId] = useState("Inception");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allTitles, setAllTitles] = useState<string[]>([]);

  useEffect(() => {
    // Fetch available movie list for selectors
    fetch("/api/movies?limit=30")
      .then((res) => res.json())
      .then((json) => {
        if (json.movies) {
          setAllTitles(json.movies.map((m: any) => m.title));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchComparison(movieAId, movieBId);
  }, [movieAId, movieBId]);

  const fetchComparison = async (a: string, b: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/compare?movieA=${encodeURIComponent(a)}&movieB=${encodeURIComponent(b)}`);
      const json = await res.json();
      if (json.movieA && json.movieB) {
        setData(json);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const movieA: Movie = data?.movieA;
  const movieB: Movie = data?.movieB;
  const comparison = data?.comparison;

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-3">
          <Scale className="w-4 h-4" />
          <span>Side-by-Side Cinema Duel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Compare Masterpieces
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Evaluate ratings, directors, themes, and cast overlap between any two movies
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto p-4 rounded-2xl glass-panel border border-white/10">
        <div className="flex-1 w-full">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            Film A
          </label>
          <select
            value={movieAId}
            onChange={(e) => setMovieAId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-brand-red"
          >
            {allTitles.map((title) => (
              <option key={title} value={title} className="bg-surface text-white">
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold text-xs">
          VS
        </div>

        <div className="flex-1 w-full">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            Film B
          </label>
          <select
            value={movieBId}
            onChange={(e) => setMovieBId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-brand-red"
          >
            {allTitles.map((title) => (
              <option key={title} value={title} className="bg-surface text-white">
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Display */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">Comparing cinematic parameters...</div>
      ) : movieA && movieB ? (
        <div className="space-y-8">
          {/* AI Verdict Banner */}
          {comparison?.verdict && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-purple/20 via-surface-muted to-brand-crimson/20 border border-brand-purple/30 backdrop-blur-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                <Sparkles className="w-4 h-4 text-brand-purple" />
                <span>CineSa AI Analysis & Verdict</span>
              </div>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                {comparison.verdict}
              </p>
            </div>
          )}

          {/* Side-by-Side Dual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Film A */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-6 flex flex-col">
              <div className="flex gap-4">
                <div className="relative aspect-[2/3] w-28 sm:w-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
                  <Image src={movieA.posterUrl} alt={movieA.title} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{movieA.title}</h2>
                  <p className="text-xs text-gray-400 italic mt-1">&quot;{movieA.tagline}&quot;</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-gold/20 text-brand-gold font-bold text-xs border border-brand-gold/30">
                      <Star className="w-3.5 h-3.5 fill-brand-gold" />
                      {movieA.voteAverage.toFixed(1)} / 10
                    </span>
                    {movieA.voteAverage >= movieB.voteAverage && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-brand-gold">
                        <Trophy className="w-3.5 h-3.5" /> Higher Rated
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Attributes Comparison Table */}
              <div className="space-y-3 text-xs sm:text-sm pt-2 flex-1">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Release Year</span>
                  <span className="font-semibold text-white">{movieA.releaseYear}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Runtime</span>
                  <span className="font-semibold text-white">{movieA.runtime} min</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Director</span>
                  <span className="font-semibold text-brand-crimson">
                    {movieA.directors?.[0]?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Genres</span>
                  <span className="font-semibold text-white text-right">
                    {movieA.genres?.map((g) => g.name).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Lead Cast</span>
                  <span className="font-semibold text-white text-right truncate max-w-xs">
                    {movieA.cast?.slice(0, 3).map((c) => c.actor.name).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Streaming</span>
                  <span className="font-semibold text-white">
                    {movieA.streamingPlatforms?.join(", ") || "Prime Video"}
                  </span>
                </div>
              </div>

              <Link
                href={`/movie/${movieA.id}`}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center transition block"
              >
                View Full Details
              </Link>
            </div>

            {/* Film B */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-6 flex flex-col">
              <div className="flex gap-4">
                <div className="relative aspect-[2/3] w-28 sm:w-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
                  <Image src={movieB.posterUrl} alt={movieB.title} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{movieB.title}</h2>
                  <p className="text-xs text-gray-400 italic mt-1">&quot;{movieB.tagline}&quot;</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-gold/20 text-brand-gold font-bold text-xs border border-brand-gold/30">
                      <Star className="w-3.5 h-3.5 fill-brand-gold" />
                      {movieB.voteAverage.toFixed(1)} / 10
                    </span>
                    {movieB.voteAverage >= movieA.voteAverage && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-brand-gold">
                        <Trophy className="w-3.5 h-3.5" /> Higher Rated
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Attributes Comparison Table */}
              <div className="space-y-3 text-xs sm:text-sm pt-2 flex-1">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Release Year</span>
                  <span className="font-semibold text-white">{movieB.releaseYear}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Runtime</span>
                  <span className="font-semibold text-white">{movieB.runtime} min</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Director</span>
                  <span className="font-semibold text-brand-crimson">
                    {movieB.directors?.[0]?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Genres</span>
                  <span className="font-semibold text-white text-right">
                    {movieB.genres?.map((g) => g.name).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Lead Cast</span>
                  <span className="font-semibold text-white text-right truncate max-w-xs">
                    {movieB.cast?.slice(0, 3).map((c) => c.actor.name).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Streaming</span>
                  <span className="font-semibold text-white">
                    {movieB.streamingPlatforms?.join(", ") || "Netflix"}
                  </span>
                </div>
              </div>

              <Link
                href={`/movie/${movieB.id}`}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center transition block"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
