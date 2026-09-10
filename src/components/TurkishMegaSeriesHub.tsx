"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, Tv, Star, ListFilter, ArrowRight } from "lucide-react";
import { Movie } from "@/types";
import TrailerModal from "./TrailerModal";

interface TurkishMegaSeriesHubProps {
  seriesList: Movie[];
}

export default function TurkishMegaSeriesHub({ seriesList }: TurkishMegaSeriesHubProps) {
  const [activeSeries, setActiveSeries] = useState<Movie | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (!seriesList || seriesList.length === 0) return null;

  const handleQuickWatch = (series: Movie, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSeries(series);
    setModalOpen(true);
  };

  return (
    <section className="relative py-8 sm:py-12 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Tv className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Featured Turkish Series
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <span>⚔️ Turkish & Islamic Historical Mega-Series</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Chaar grand historical series — Har series ke andar saare episodes sequence wise serial format mein dekhein.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-medium px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Official Urdu Audio • Full HD</span>
          </span>
        </div>
      </div>

      {/* 4 Clean Master Series Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {seriesList.map((series) => {
          const epCount = series.episodes?.length || series.totalEpisodes || 0;
          const firstEp = series.episodes?.[0];

          return (
            <div
              key={series.id}
              className="group relative flex flex-col rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-xl hover:shadow-emerald-950/40"
            >
              {/* Card Poster & Media Header */}
              <Link
                href={`/movie/${series.id}`}
                className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-surface-muted block"
              >
                <Image
                  src={series.backdropUrl || series.posterUrl}
                  alt={series.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Episode Count Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/95 backdrop-blur-md text-white font-bold text-xs shadow-lg shadow-emerald-950/60 border border-emerald-400/40">
                  <Play className="w-2.5 h-2.5 fill-white" />
                  <span>{epCount} Episodes</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-white font-bold text-xs">
                  <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  <span>{series.voteAverage ? series.voteAverage.toFixed(1) : "9.4"}</span>
                </div>

                {/* Quick Hover Play Center Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/30 backdrop-blur-[2px]">
                  <button
                    onClick={(e) => handleQuickWatch(series, e)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-xl shadow-emerald-950/60 transition-transform transform scale-95 group-hover:scale-100"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Watch Ep 1</span>
                  </button>
                </div>
              </Link>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      Serial-Wise HD
                    </span>
                    <span className="text-xs text-gray-400 font-mono font-medium">
                      {series.releaseYear || 2020}
                    </span>
                  </div>

                  <Link href={`/movie/${series.id}`} className="block group/title">
                    <h3 className="font-extrabold text-base sm:text-lg text-white group-hover/title:text-emerald-300 transition-colors line-clamp-1 leading-snug">
                      {series.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                    {series.overview}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <Link
                    href={`/movie/${series.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition hover:border-emerald-500/40"
                  >
                    <ListFilter className="w-3.5 h-3.5 text-emerald-400" />
                    <span>All {epCount} Episodes</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </Link>

                  <button
                    onClick={(e) => handleQuickWatch(series, e)}
                    className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/40 transition shadow-md"
                    title="Direct Play Episode 1"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Cinema Player Modal if Play clicked from hub */}
      {activeSeries && (
        <TrailerModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fullMovieKey={activeSeries.episodes?.[0]?.fullMovieKey || activeSeries.fullMovieKey}
          trailerKey={activeSeries.trailerKey}
          backdropUrl={activeSeries.backdropUrl}
          posterUrl={activeSeries.posterUrl}
          title={activeSeries.title}
          movieId={activeSeries.id}
          episodes={activeSeries.episodes}
          initialEpisodeIndex={0}
        />
      )}
    </section>
  );
}
