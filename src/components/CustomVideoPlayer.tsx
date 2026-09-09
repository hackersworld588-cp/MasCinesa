"use client";

import React, { useState, useRef } from "react";
import { 
  Server, 
  Maximize2, 
  RotateCw, 
  ExternalLink, 
  ShieldCheck, 
  Volume2, 
  Tv
} from "lucide-react";

interface StreamServer {
  id: string;
  name: string;
  description: string;
  type: string;
  url: string;
  quality: string;
  recommended?: boolean;
}

interface CustomVideoPlayerProps {
  title: string;
  imdbId?: string | null;
  tmdbId?: number | null;
  fullMovieKey?: string | null;
  trailerKey?: string | null;
  backdropUrl?: string | null;
  onClose?: () => void;
}

export default function CustomVideoPlayer({
  title,
  imdbId,
  tmdbId,
  fullMovieKey,
  backdropUrl,
}: CustomVideoPlayerProps) {
  const effectiveImdb = imdbId || "";
  const effectiveTmdb = tmdbId || "";

  const defaultServers: StreamServer[] = [];

  if (fullMovieKey) {
    defaultServers.push({
      id: "server-hindi-hd",
      name: "Server 1 (Hindi Dubbed HD)",
      description: "Direct Hindi full movie stream",
      type: "youtube",
      url: "https://www.youtube.com/embed/" + fullMovieKey + "?autoplay=1&rel=0",
      quality: "1080p / 720p HD",
      recommended: true,
    });
  }

  defaultServers.push(
    {
      id: "server-multiembed",
      name: fullMovieKey ? "Server 2 (MultiEmbed HD)" : "Server 1 (MultiEmbed HD)",
      description: "Fast multi-source HD cinema stream with subtitles",
      type: "embed",
      url: effectiveImdb
        ? "https://multiembed.mov/?video_id=" + effectiveImdb
        : "https://multiembed.mov/?video_id=" + effectiveTmdb + "&tmdb=1",
      quality: "1080p Full HD",
      recommended: !fullMovieKey,
    },
    {
      id: "server-vidsrc",
      name: fullMovieKey ? "Server 3 (VidSrc Cinema)" : "Server 2 (VidSrc Cinema)",
      description: "Cinema server with multi-language audio tracks",
      type: "embed",
      url: effectiveImdb
        ? "https://vidsrc.to/embed/movie/" + effectiveImdb
        : "https://vidsrc.to/embed/movie/" + effectiveTmdb,
      quality: "1080p HD",
    },
    {
      id: "server-vidsrc-me",
      name: fullMovieKey ? "Server 4 (VidSrc Pro)" : "Server 3 (VidSrc Pro)",
      description: "Alternative fast streaming mirror",
      type: "embed",
      url: effectiveImdb
        ? "https://vidsrc.me/embed/movie?imdb=" + effectiveImdb
        : "https://vidsrc.me/embed/movie?tmdb=" + effectiveTmdb,
      quality: "1080p / 720p",
    },
    {
      id: "server-superembed",
      name: fullMovieKey ? "Server 5 (SuperEmbed)" : "Server 4 (SuperEmbed)",
      description: "Global CDN playback mirror",
      type: "embed",
      url: "https://superembed.stream/embed/movie/" + (effectiveImdb || effectiveTmdb),
      quality: "720p / 1080p",
    }
  );

  const [activeServerId, setActiveServerId] = useState<string>(defaultServers[0].id);
  const [iframeKey, setIframeKey] = useState(1);
  const [theaterMode, setTheaterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const activeServer = defaultServers.find((s) => s.id === activeServerId) || defaultServers[0];

  const handleServerChange = (serverId: string) => {
    setActiveServerId(serverId);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

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
      {/* Top Controls & Server Selector Bar */}
      <div className="bg-[#12141c] border-b border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Server Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Server className="w-3.5 h-3.5 text-brand-red" />
            <span className="hidden sm:inline">Servers:</span>
          </span>

          {defaultServers.map((server) => {
            const isActive = server.id === activeServerId;
            return (
              <button
                key={server.id}
                onClick={() => handleServerChange(server.id)}
                className={"px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 " + (
                  isActive
                    ? "bg-brand-red text-white shadow-md shadow-red-950/50 scale-[1.02]"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5"
                )}
                title={server.description}
              >
                <span>{server.name}</span>
                {server.recommended && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quality & Audio Badges */}
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {activeServer.quality}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              Hindi / Dual Audio
            </span>
          </div>

          <button
            onClick={handleReload}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            title="Reload Server Stream"
            aria-label="Reload Stream"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTheaterMode(!theaterMode)}
            className={"p-1.5 rounded-lg transition " + (
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
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            title="Fullscreen"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <a
            href={activeServer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
            title="Open in new window"
            aria-label="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
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
            className="absolute inset-0 opacity-25 filter blur-3xl scale-110 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: "url(" + backdropUrl + ")" }}
          />
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
            <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-xs font-semibold text-gray-300">
              Connecting to {activeServer.name}...
            </span>
          </div>
        )}

        {/* Sandboxed Video Embed */}
        <iframe
          key={iframeKey}
          src={activeServer.url}
          title={title + " Full Movie Player - " + activeServer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          className="relative z-20 w-full h-full border-0"
        />
      </div>

      {/* Player Footer & Help Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-[#0f1118] border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Streaming on <strong>{activeServer.name}</strong> • Agar koi server buffer kare to upar dusra server select karein!
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const currentIdx = defaultServers.findIndex(s => s.id === activeServerId);
              const nextServer = defaultServers[(currentIdx + 1) % defaultServers.length];
              handleServerChange(nextServer.id);
            }}
            className="text-brand-crimson hover:underline font-semibold"
          >
            Switch to Next Server →
          </button>
        </div>
      </div>
    </div>
  );
}