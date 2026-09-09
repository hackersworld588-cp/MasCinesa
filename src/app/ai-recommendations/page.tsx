"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Search, SlidersHorizontal, Film, ArrowRight, CheckCircle2 } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/SkeletonLoader";
import { RecommendationResult } from "@/types";

const PRESET_PROMPTS = [
  "Mujhe Interstellar jaisi mind-bending sci-fi movies batao.",
  "Aaj raat family ke saath dekhne ke liye 2 ghante se kam ki movie suggest karo.",
  "Mujhe Christopher Nolan ki best movies batao.",
  "Sad ending wali thriller movies suggest karo.",
  "Movies like Parasite with intense social thrillers and dark comedy.",
];

export default function AIRecommendationsPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [intent, setIntent] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Initial load: fetch personalized recommendations based on profile
  useEffect(() => {
    fetchRecommendations("");
  }, []);

  const fetchRecommendations = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, limit: 12 }),
      });
      const data = await res.json();
      if (data.recommendations) {
        setResults(data.recommendations);
        setIntent(data.intent);
        setHasSearched(!!q);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchRecommendations(query);
  };

  const handleSelectPreset = (preset: string) => {
    setQuery(preset);
    fetchRecommendations(preset);
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 fill-purple-300" />
          <span>Hybrid AI Film Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Describe What You Want to Watch
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
          Ask in natural English, Hindi, or Hinglish. CineSa’s hybrid engine analyzes your taste,
          thematic tone, director styles, and emotional arcs to find the perfect film.
        </p>
      </div>

      {/* Natural Language Search Input Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="max-w-3xl mx-auto relative mb-6 group"
      >
        <div className="relative flex items-center rounded-2xl glass-panel border border-brand-purple/30 group-focus-within:border-brand-purple shadow-xl shadow-purple-950/20 transition-all duration-300 p-2">
          <div className="pl-3 pr-2 text-brand-purple">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Mujhe Interstellar jaisi mind-bending sci-fi movies batao..."
            className="w-full bg-transparent px-2 py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-purple-900/40 hover:scale-[1.02] flex items-center gap-2 flex-shrink-0"
          >
            <span>{loading ? "Analyzing..." : "Ask AI"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Suggested Quick Prompt Chips */}
      <div className="max-w-3xl mx-auto mb-10">
        <p className="text-xs text-gray-500 font-semibold mb-2 text-center uppercase tracking-wider">
          Or try a natural prompt:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PRESET_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSelectPreset(prompt)}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-purple/50 text-gray-300 hover:text-white hover:bg-white/10 transition text-left"
            >
              &quot;{prompt}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Detected Intent Breakdown Banner (if searched) */}
      {intent && (
        <div className="max-w-5xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl glass-panel border border-brand-purple/20 flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Understood Intent & Parameters</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {intent.referenceMovieTitle && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-white font-semibold text-xs border border-white/10">
                    Ref: {intent.referenceMovieTitle}
                  </span>
                )}
                {intent.targetDirector && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 font-semibold text-xs border border-blue-500/30">
                    Director: {intent.targetDirector}
                  </span>
                )}
                {intent.maxRuntimeMinutes && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30">
                    Max Runtime: {intent.maxRuntimeMinutes} mins
                  </span>
                )}
                {intent.audience && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-semibold text-xs border border-amber-500/30 capitalize">
                    Audience: {intent.audience}
                  </span>
                )}
                {intent.isMindBending && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 font-semibold text-xs border border-purple-500/30">
                    Theme: Mind-Bending
                  </span>
                )}
                {intent.isSadEnding && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 font-semibold text-xs border border-rose-500/30">
                    Tone: Emotional Climax
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            {results.length} Matches Found
          </span>
        </div>
      )}

      {/* Results Grid with Explanations */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-panel max-w-lg mx-auto">
          <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-white">No Movies Matched</h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your query or click on one of the recommended prompts above!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {results.map((rec) => (
            <MovieCard
              key={rec.movie.id}
              movie={rec.movie}
              matchScore={rec.matchPercentage}
              explanation={rec.explanation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
