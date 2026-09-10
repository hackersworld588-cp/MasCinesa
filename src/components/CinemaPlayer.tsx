"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Maximize2, 
  RotateCw, 
  ExternalLink, 
  ShieldCheck, 
  Volume2, 
  Tv,
  Film,
  Sparkles,
  Clock,
  RotateCcw
} from "lucide-react";
import { 
  savePlaybackProgress, 
  getSavedStartTime, 
  formatTimeDisplay 
} from "@/lib/continue-watching";

interface CinemaPlayerProps {
  title: string;
  movieId?: string | null;
  imdbId?: string | null;
  tmdbId?: number | null;
  fullMovieKey?: string | null;
  posterUrl?: string | null;
  backdropUrl?: string | null;
  initialStartTime?: number | null;
  onClose?: () => void;
}

export default function CinemaPlayer({
  title,
  movieId,
  fullMovieKey,
  posterUrl,
  backdropUrl,
  initialStartTime,
}: CinemaPlayerProps) {
  const [iframeKey, setIframeKey] = useState(1);
  const [theaterMode, setTheaterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Resume playback timing
  const resolvedStartTime = initialStartTime || (movieId ? getSavedStartTime(movieId) : 0);
  const [startTime, setStartTime] = useState<number>(resolvedStartTime);
  const [isResumed, setIsResumed] = useState<boolean>(resolvedStartTime > 10);
  const playbackTimeRef = useRef<number>(resolvedStartTime);

  const videoKey = fullMovieKey || "TIQ5hrfermg";
  
  // Construct embed URL with exact start time parameter
  const startParam = startTime > 5 ? `&start=${Math.floor(startTime)}` : "";
  const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1${startParam}`;
  const directWatchUrl = "https://www.youtube.com/watch?v=" + videoKey;

  // Track playback time periodically while user is on page
  useEffect(() => {
    if (!movieId) return;

    // Increment time ref every second and save every 5 seconds
    const timer = setInterval(() => {
      playbackTimeRef.current += 1;
      if (playbackTimeRef.current % 5 === 0) {
        savePlaybackProgress({
          movieId,
          title,
          posterUrl: posterUrl || backdropUrl || "",
          backdropUrl: backdropUrl || "",
          fullMovieKey: videoKey,
          currentTime: playbackTimeRef.current,
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (movieId && playbackTimeRef.current > 10) {
        savePlaybackProgress({
          movieId,
          title,
          posterUrl: posterUrl || backdropUrl || "",
          backdropUrl: backdropUrl || "",
          fullMovieKey: videoKey,
          currentTime: playbackTimeRef.current,
        });
      }
    };
  }, [movieId, title, posterUrl, backdropUrl, videoKey]);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handlePlayFromBeginning = () => {
    setStartTime(0);
    playbackTimeRef.current = 0;
    setIsResumed(false);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleFullScreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className={"w-full flex flex-col transition-all duration-300 " + (theaterMode ? "scale-[1.01]" : "")}>
      {/* Resume Playback Banner if restarted from saved position */}
      {isResumed && startTime > 10 && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-surface-muted border-b border-emerald-500/30 px-3 sm:px-6 py-2 flex items-center justify-between gap-2 text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              Resumed playback from <strong>{formatTimeDisplay(startTime)}</strong> (jahan se chhoda tha)
            </span>
          </div>
          <button
            onClick={handlePlayFromBeginning}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Start from 0:00</span>
          </button>
        </div>
      )}

      {/* Top Controls Bar - Mobile Responsive */}
      <div className="bg-[#12141c] border-b border-white/10 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            Full Movie HD
          </span>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            Hindi Audio
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleReload}
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            title="Reload Video"
            aria-label="Reload Video"
          >
            <RotateCw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          <button
            onClick={() => setTheaterMode(!theaterMode)}
            className={"p-1.5 sm:p-2 rounded-lg transition " + (
              theaterMode
                ? "bg-brand-purple text-white"
                : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
            )}
            title="Toggle Theater Mode"
            aria-label="Theater Mode"
          >
            <Tv className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          <button
            onClick={handleFullScreen}
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            title="Fullscreen"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          <a
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-semibold text-[11px] sm:text-xs transition shadow-sm"
            title="Watch on YouTube App"
            aria-label="Watch on YouTube App"
          >
            <span className="hidden xs:inline">Open in YouTube</span>
            <span className="xs:hidden">YouTube</span>
            <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </a>
        </div>
      </div>

      {/* Video Stream Stage with Ambient Glow */}
      <div 
        ref={playerContainerRef}
        className="relative aspect-video w-full bg-black overflow-hidden group/player"
      >
        {/* Ambient Glow */}
        {backdropUrl && (
          <div 
            className="absolute inset-0 opacity-20 filter blur-3xl scale-110 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: "url(" + backdropUrl + ")" }}
          />
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
            <div className="w-9 sm:w-10 h-9 sm:h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-2 sm:mb-3" />
            <span className="text-xs font-semibold text-gray-300">
              Loading {title}...
            </span>
          </div>
        )}

        {/* Direct YouTube Stream with exact resume timestamp */}
        <iframe
          key={iframeKey}
          src={embedUrl}
          title={title + " - Full Movie"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          className="relative z-20 w-full h-full border-0"
        />
      </div>

      {/* Player Footer */}
      <div className="px-3 sm:px-6 py-2 sm:py-2.5 bg-[#0f1118] border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-gray-400 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 flex-shrink-0" />
          <span className="truncate">
            Playing <strong>{title}</strong> in Full HD
          </span>
        </div>

        <a
          href={directWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition hover:underline"
        >
          Direct YouTube app par dekhein →
        </a>
      </div>
    </div>
  );
}
