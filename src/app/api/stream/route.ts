import { NextRequest, NextResponse } from "next/server";
import { getMovieById } from "@/lib/movie-service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");
  const imdbId = searchParams.get("imdbId");
  const tmdbId = searchParams.get("tmdbId");

  let movie = null;
  if (movieId) {
    movie = await getMovieById(movieId);
  }

  const effectiveImdbId = imdbId || movie?.imdbId;
  const effectiveTmdbId = tmdbId || movie?.tmdbId;
  const effectiveTitle = movie?.title || "Movie";

  const servers = [
    {
      id: "server-multiembed",
      name: "Server 1 (MultiEmbed HD)",
      description: "Fast multi-source HD stream with subtitles",
      type: "embed",
      url: effectiveImdbId
        ? `https://multiembed.mov/?video_id=${effectiveImdbId}`
        : `https://multiembed.mov/?video_id=${effectiveTmdbId}&tmdb=1`,
      quality: "1080p Full HD",
      status: "online",
      recommended: true,
    },
    {
      id: "server-vidsrc",
      name: "Server 2 (VidSrc Cinema)",
      description: "Reliable cinema server with multi-language audio",
      type: "embed",
      url: effectiveImdbId
        ? `https://vidsrc.to/embed/movie/${effectiveImdbId}`
        : `https://vidsrc.to/embed/movie/${effectiveTmdbId}`,
      quality: "1080p HD",
      status: "online",
      recommended: false,
    },
    {
      id: "server-vidsrc-me",
      name: "Server 3 (VidSrc Pro)",
      description: "Alternative mirror with adaptive bitrate",
      type: "embed",
      url: effectiveImdbId
        ? `https://vidsrc.me/embed/movie?imdb=${effectiveImdbId}`
        : `https://vidsrc.me/embed/movie?tmdb=${effectiveTmdbId}`,
      quality: "1080p / 720p",
      status: "online",
      recommended: false,
    },
    {
      id: "server-superembed",
      name: "Server 4 (SuperEmbed)",
      description: "Fast global CDN playback mirror",
      type: "embed",
      url: `https://superembed.stream/embed/movie/${effectiveImdbId || effectiveTmdbId}`,
      quality: "720p / 1080p",
      status: "online",
      recommended: false,
    },
  ];

  // If there is an active YouTube full movie cut / free stream
  if (movie?.fullMovieKey) {
    servers.push({
      id: "server-youtube-hindi",
      name: "Server 5 (Hindi Dubbed Stream)",
      description: "Verified Hindi cut / long-form stream",
      type: "youtube",
      url: `https://www.youtube.com/embed/${movie.fullMovieKey}?autoplay=1&rel=0`,
      quality: "720p HD",
      status: "online",
      recommended: false,
    });
  }

  return NextResponse.json({
    success: true,
    movie: {
      id: movie?.id,
      title: effectiveTitle,
      imdbId: effectiveImdbId,
      tmdbId: effectiveTmdbId,
    },
    defaultServer: "server-multiembed",
    servers,
  });
}