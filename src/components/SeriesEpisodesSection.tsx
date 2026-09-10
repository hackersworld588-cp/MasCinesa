"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Play, Clock, Sparkles, Tv, Search, CheckCircle2, ChevronRight } from "lucide-react";
import { Episode } from "@/types";
import TrailerModal from "./TrailerModal";

interface SeriesEpisodesSectionProps {
  movieId: string;
  seriesTitle: string;
  backdropUrl?: string | null;
  posterUrl?: string | null;
  episodes: Episode[];
}

export default function SeriesEpisodesSection({
  movieId,
  seriesTitle,
  backdropUrl,
  posterUrl,
  episodes,
}: SeriesEpisodesSectionProps) {
  const [selectedEpIndex, setSelectedEpIndex] = useState<number | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRange, setActiveRange] = useState<string>("all");

  if (!episodes || episodes.length === 0) {
    return null;
  }

  // Calculate episode ranges for tabs if more than 25 episodes
  const ranges = useMemo(() => {
    if (episodes.length <= 25) return [];
    const list: { id: string; label: string; start: number; end: number }[] = [];
    const step = 25;
    for (let i = 0; i < episodes.length; i += step) {
      const start = i + 1;
      const end = Math.min(i + step, episodes.length);
      list.push({
        id: `${start}-${end}`,
        label: `Ep ${start} - ${end}`,
        start,
        end,
      });
    }
    return list;
  }, [episodes.length]);

  // Filtered episodes based on search or range tab
  const filteredEpisodes = useMemo(() => {
    let list = episodes;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          String(ep.episodeNumber).includes(q) ||
          (ep.overview && ep.overview.toLowerCase().includes(q))
      );
    }

    if (activeRange !== "all") {
      const [startStr, endStr] = activeRange.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      return list.filter(
        (ep) => ep.episodeNumber >= start && ep.episodeNumber <= end
      );
    }

    return list;
  }, [episodes, searchQuery, activeRange]);

  const handlePlayEpisode = (originalIndex: number) => {
    setSelectedEpIndex(originalIndex);
    setPlayerOpen(true);
  };

  const activeEp = selectedEpIndex !== null ? episodes[selectedEpIndex] : episodes[0];

  return (
    <section id="episodes" className="mt-12 pt-8 border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Tv className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Complete Series Sequence
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>All Episodes</span>
            <span className="text-sm font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
              {episodes.length} Episodes Total
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Har episode serial sequence mein available hai — Episode 1 se continuous binge watch karein.
          </p>
        </div>

        {/* Search & Fast Filter Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search episode number (e.g. 5, 20)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 transition"
          />
        </div>
      </div>

      {/* Range Filter Tabs for 25+ episodes */}
      {ranges.length > 0 && !searchQuery && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
          <button
            onClick={() => setActiveRange("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 border ${
              activeRange === "all"
                ? "bg-emerald-500 text-black border-emerald-400 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
            }`}
          >
            All ({episodes.length})
          </button>
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRange(r.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 border ${
                activeRange === r.id
                  ? "bg-emerald-500 text-black border-emerald-400 shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}

      {/* Episodes List */}
      {filteredEpisodes.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-xs">
          Koi episode nahi mila &quot;{searchQuery}&quot; ke liye.
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredEpisodes.map((ep) => {
            const originalIndex = episodes.findIndex((e) => e.id === ep.id);
            const epNum = ep.episodeNumber;
            const formattedNum = epNum < 10 ? `0${epNum}` : `${epNum}`;

            return (
              <div
                key={ep.id}
                onClick={() => handlePlayEpisode(originalIndex >= 0 ? originalIndex : 0)}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-5 p-3 sm:p-4 rounded-2xl bg-[#12141d] hover:bg-[#181b28] border border-white/10 hover:border-emerald-500/50 transition-all duration-200 shadow-md hover:shadow-emerald-950/40 cursor-pointer overflow-hidden"
              >
                {/* Left: Thumbnail & Episode Number Indicator */}
                <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
                  {/* Big Serial Index */}
                  <div className="hidden sm:flex flex-col items-center justify-center w-12 text-center flex-shrink-0">
                    <span className="font-mono text-xl sm:text-2xl font-black text-gray-600 group-hover:text-emerald-400 transition-colors">
                      {formattedNum}
                    </span>
                  </div>

                  {/* Video Thumbnail */}
                  <div className="relative aspect-video w-36 sm:w-44 md:w-52 rounded-xl overflow-hidden bg-black/60 flex-shrink-0 border border-white/10 shadow-md">
                    <Image
                      src={ep.thumbnailUrl || posterUrl || backdropUrl || ""}
                      alt={ep.title}
                      fill
                      sizes="220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />

                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/90 group-hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                      </div>
                    </div>

                    {/* Mobile EP Tag */}
                    <div className="sm:hidden absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                      EP {formattedNum}
                    </div>

                    {/* Runtime badge */}
                    {ep.runtime && (
                      <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono font-semibold text-gray-200 border border-white/10 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-gray-400" />
                        <span>{ep.runtime}m</span>
                      </div>
                    )}
                  </div>

                  {/* Mobile Title & Meta on small screens */}
                  <div className="flex-1 md:hidden">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Episode {epNum}
                      </span>
                      {ep.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                          {ep.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                      {ep.title}
                    </h3>
                  </div>
                </div>

                {/* Middle: Desktop Title & Overview */}
                <div className="hidden md:flex flex-col flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Episode {epNum}
                    </span>
                    {ep.badge && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-gray-300 border border-white/10">
                        {ep.badge}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">Official Urdu Dubbed HD</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {ep.title}
                  </h3>

                  {ep.overview && (
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                      {ep.overview}
                    </p>
                  )}
                </div>

                {/* Right: Watch Action Button */}
                <div className="flex items-center justify-end w-full md:w-auto flex-shrink-0 pt-2 md:pt-0 border-t border-white/5 md:border-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayEpisode(originalIndex >= 0 ? originalIndex : 0);
                    }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs bg-emerald-500/20 hover:bg-emerald-500 group-hover:bg-emerald-500 text-emerald-300 group-hover:text-black border border-emerald-500/40 transition-all duration-200 shadow-md shadow-emerald-950/40"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Ep {epNum}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Episode Player Modal with serial-wise navigation preloaded */}
      <TrailerModal
        isOpen={playerOpen}
        onClose={() => setPlayerOpen(false)}
        fullMovieKey={activeEp?.fullMovieKey}
        trailerKey={activeEp?.fullMovieKey}
        backdropUrl={backdropUrl}
        posterUrl={posterUrl || activeEp?.thumbnailUrl}
        title={seriesTitle}
        movieId={movieId}
        episodes={episodes}
        initialEpisodeIndex={selectedEpIndex !== null ? selectedEpIndex : 0}
      />
    </section>
  );
}
