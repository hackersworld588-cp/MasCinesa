"use client";

import React, { useEffect } from "react";
import { X, Film, ShieldCheck } from "lucide-react";
import CinemaPlayer from "./CinemaPlayer";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerKey?: string | null;
  trailerUrl?: string | null;
  fullMovieKey?: string | null;
  imdbId?: string | null;
  tmdbId?: number | null;
  backdropUrl?: string | null;
  initialMode?: "trailer" | "fullMovie";
  title: string;
}

export default function TrailerModal({
  isOpen,
  onClose,
  fullMovieKey,
  trailerKey,
  imdbId,
  tmdbId,
  backdropUrl,
  title,
}: TrailerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 animate-in fade-in duration-200">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#0d0f17] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#121522] gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-500/20 border border-emerald-500/40">
              <Film className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white truncate">
                  {title}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 border bg-emerald-500/20 text-emerald-300 border-emerald-500/30 flex items-center gap-1">
                  <Film className="w-3 h-3 text-emerald-400" />
                  Full Movie (HD)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition"
              aria-label="Close player"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body: Cinema Player with Zero Ads */}
        <div className="w-full overflow-y-auto">
          <CinemaPlayer
            title={title}
            imdbId={imdbId}
            tmdbId={tmdbId}
            fullMovieKey={fullMovieKey || trailerKey}
            backdropUrl={backdropUrl}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
