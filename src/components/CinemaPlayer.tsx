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
  Clock, 
  RotateCcw,
  Smartphone,
  ChevronRight
} from "lucide-react";
import { 
  savePlaybackProgress, 
  getSavedStartTime, 
  formatTimeDisplay 
} from "@/lib/continue-watching";
import { Episode } from "@/types";

interface CinemaPlayerProps {
  title: string;
  movieId?: string | null;
  imdbId?: string | null;
  tmdbId?: number | null;
  fullMovieKey?: string | null;
  posterUrl?: string | null;
  backdropUrl?: string | null;
  initialStartTime?: number | null;
  episodes?: Episode[];
  initialEpisodeIndex?: number;
  onClose?: () => void;
}

export default function CinemaPlayer({
  title,
  movieId,
  fullMovieKey,
  posterUrl,
  backdropUrl,
  initialStartTime,
  episodes,
  initialEpisodeIndex = 0,
}: CinemaPlayerProps) {
  const [currentEpIndex, setCurrentEpIndex] = useState(initialEpisodeIndex || 0);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);
  const [theaterMode, setTheaterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const activeEpRef = useRef<HTMLButtonElement>(null);

  // Active episode if series
  const activeEpisode = episodes && episodes.length > 0 ? episodes[currentEpIndex] : null;
  const activeTitle = activeEpisode ? `${title} - ${activeEpisode.title}` : title;
  const videoKey = activeEpisode ? activeEpisode.fullMovieKey : (fullMovieKey || "TIQ5hrfermg");

  // Scroll active episode pill into view
  useEffect(() => {
    if (activeEpRef.current) {
      activeEpRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [currentEpIndex]);

  // Resume playback timing
  const resolvedStartTime = initialStartTime || (movieId ? getSavedStartTime(movieId) : 0);
  const [startTime, setStartTime] = useState<number>(resolvedStartTime);
  const [isResumed, setIsResumed] = useState<boolean>(resolvedStartTime > 10);
  const playbackTimeRef = useRef<number>(resolvedStartTime);
  
  // Construct embed URL with exact start time parameter
  const startParam = startTime > 5 ? `&start=${Math.floor(startTime)}` : "";
  const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1${startParam}`;
  const directWatchUrl = "https://www.youtube.com/watch?v=" + videoKey;

  // Track playback time periodically while user is on page
  useEffect(() => {
    if (!movieId) return;

    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "watch_movie",
          details: `Streaming ${activeTitle}`,
          currentMovie: activeTitle,
        }),
      }).catch(() => {});
    } catch (e) {}

    const timer = setInterval(() => {
      playbackTimeRef.current += 1;
      if (playbackTimeRef.current % 5 === 0) {
        savePlaybackProgress({
          movieId,
          title: activeTitle,
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
          title: activeTitle,
          posterUrl: posterUrl || backdropUrl || "",
          backdropUrl: backdropUrl || "",
          fullMovieKey: videoKey,
          currentTime: playbackTimeRef.current,
        });
      }
    };
  }, [movieId, activeTitle, posterUrl, backdropUrl, videoKey]);

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

  const handleSelectEpisode = (index: number) => {
    if (!episodes || index < 0 || index >= episodes.length) return;
    setCurrentEpIndex(index);
    setStartTime(0);
    playbackTimeRef.current = 0;
    setIsResumed(false);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleNextEpisode = () => {
    if (!episodes || currentEpIndex >= episodes.length - 1) return;
    handleSelectEpisode(currentEpIndex + 1);
  };

  const toggleHorizontal = async () => {
    try {
      if (!isHorizontal) {
        if (playerContainerRef.current?.requestFullscreen) {
          await playerContainerRef.current.requestFullscreen().catch(() => {});
        }
        if (typeof screen !== "undefined" && screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock("landscape").catch(() => {});
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen().catch(() => {});
        }
        if (typeof screen !== "undefined" && screen.orientation && (screen.orientation as any).unlock) {
          (screen.orientation as any).unlock();
        }
      }
    } catch (e) {}
    setIsHorizontal((prev) => !prev);
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
    <div
      className={
        isHorizontal
          ? "fixed inset-0 z-[99999] w-screen h-screen bg-black flex flex-col justify-between overflow-hidden"
          : "w-full flex flex-col transition-all duration-300 " + (theaterMode ? "scale-[1.01]" : "")
      }
    >
      {/* Resume Playback Banner if restarted from saved position */}
      {isResumed && startTime > 10 && !isHorizontal && (
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

      {/* Top Controls Bar */}
      <div className="bg-[#12141c] border-b border-white/10 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 z-20">
        {/* Badges & Current Title */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            {activeEpisode ? `Ep ${activeEpisode.episodeNumber}` : "Full HD"}
          </span>

          <span className="text-xs text-gray-300 font-semibold truncate max-w-[140px] sm:max-w-[280px]">
            {activeEpisode ? activeEpisode.title : title}
          </span>
        </div>

        {/* Action Controls: Horizontal, Fullscreen, Reload, YouTube */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Horizontal / Landscape Rotate Button */}
          <button
            onClick={toggleHorizontal}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition border ${
              isHorizontal
                ? "bg-brand-crimson text-white border-red-500 shadow-md ring-1 ring-white/30"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
            }`}
            title="Video ko Horizontal / Landscape karein"
            aria-label="Horizontal Video"
          >
            <Smartphone className={`w-3.5 h-3.5 ${isHorizontal ? "rotate-0" : "rotate-90 text-emerald-400"}`} />
            <span>{isHorizontal ? "Exit Horizontal" : "Horizontal"}</span>
          </button>

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
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-semibold text-[11px] sm:text-xs transition shadow-sm flex-shrink-0"
            title="Watch on YouTube App"
            aria-label="Watch on YouTube App"
          >
            <span className="hidden xs:inline">YouTube</span>
            <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </a>
        </div>
      </div>

      {/* Serial-Wise Episodes Bar (Inside Player) */}
      {episodes && episodes.length > 0 && (
        <div className="bg-[#181b28] border-b border-white/10 px-3 sm:px-6 py-2 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar z-20">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              Episodes ({episodes.length}):
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {episodes.map((ep, idx) => {
              const isCurrent = idx === currentEpIndex;
              return (
                <button
                  key={ep.id || idx}
                  ref={isCurrent ? activeEpRef : null}
                  onClick={() => handleSelectEpisode(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex-shrink-0 border ${
                    isCurrent
                      ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-lg shadow-emerald-950/60"
                      : "bg-white/5 hover:bg-white/15 text-gray-300 border-white/10"
                  }`}
                >
                  <span>Ep {ep.episodeNumber || idx + 1}</span>
                  {ep.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isCurrent ? "bg-black/30 text-white" : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {ep.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {currentEpIndex < episodes.length - 1 && (
              <button
                onClick={handleNextEpisode}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex-shrink-0 ml-1"
              >
                <span>Next Ep</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Video Stream Stage with Ambient Glow */}
      <div 
        ref={playerContainerRef}
        className={
          isHorizontal
            ? "relative flex-1 w-full h-full bg-black overflow-hidden flex items-center justify-center"
            : "relative aspect-video w-full bg-black overflow-hidden group/player"
        }
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
              Loading {activeTitle}...
            </span>
          </div>
        )}

        {/* Direct YouTube Stream with exact resume timestamp */}
        <iframe
          key={iframeKey}
          src={embedUrl}
          title={activeTitle + " - Cinema Player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          className="relative z-20 w-full h-full border-0"
        />
      </div>

      {/* Player Footer */}
      <div className="px-3 sm:px-6 py-2 sm:py-2.5 bg-[#0f1118] border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-gray-400 gap-2 z-20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 flex-shrink-0" />
          <span className="truncate">
            Playing <strong>{activeTitle}</strong> in Ad-Free Cinema Mode
          </span>
        </div>

        <div className="flex items-center gap-3">
          {episodes && currentEpIndex < episodes.length - 1 && (
            <button
              onClick={handleNextEpisode}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1"
            >
              <span>Play Next Episode</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <a
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition hover:underline"
          >
            Direct YouTube app →
          </a>
        </div>
      </div>
    </div>
  );
}
