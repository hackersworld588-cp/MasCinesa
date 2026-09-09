"use client";

import React, { useState, useRef } from "react";
import { 
  Maximize2, 
  RotateCw, 
  ExternalLink, 
  ShieldCheck, 
  Volume2, 
  Tv,
  Film,
  Sparkles
} from "lucide-react";

interface CinemaPlayerProps {
  title: string;
  imdbId?: string | null;
  tmdbId?: number | null;
  fullMovieKey?: string | null;
  backdropUrl?: string | null;
  onClose?: () => void;
}

export default function CinemaPlayer({
  title,
  fullMovieKey,
  backdropUrl,
}: CinemaPlayerProps) {
  const [iframeKey, setIframeKey] = useState(1);
  const [theaterMode, setTheaterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const videoKey = fullMovieKey || "TIQ5hrfermg";
  const embedUrl = "https://www.youtube.com/embed/" + videoKey + "?autoplay=1&rel=0&modestbranding=1&enablejsapi=1";
  const directWatchUrl = "https://www.youtube.com/watch?v=" + videoKey;

  const handleReload = () => {
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
      {/* Top Controls Bar - Clean, No Server Tabs */}
      <div className="bg-[#12141c] border-b border-white/10 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Full Movie HD
          </span>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5" />
            Hindi Audio
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            title="Reload Video"
            aria-label="Reload Video"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTheaterMode(!theaterMode)}
            className={"p-2 rounded-lg transition " + (
              theaterMode
                ? "bg-brand-purple text-white"
                : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
            )}
            title="Toggle Theater Mode"
            aria-label="Theater Mode"
          >
            <Tv className="w-4 h-4" />
          </button>

          <button
            onClick={handleFullScreen}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            title="Fullscreen"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <a
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs transition shadow-sm"
            title="Watch on YouTube App"
            aria-label="Watch on YouTube App"
          >
            <span>Open in YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
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
            <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-xs font-semibold text-gray-300">
              Loading {title}...
            </span>
          </div>
        )}

        {/* Direct YouTube Stream */}
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
      <div className="px-4 sm:px-6 py-2.5 bg-[#0f1118] border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Playing <strong>{title}</strong> in Full HD • Official @GoldminesTelefilms Release
          </span>
        </div>

        <a
          href={directWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition hover:underline"
        >
          Agar phone pe koi issue aaye to direct YouTube app par dekhein →
        </a>
      </div>
    </div>
  );
}
