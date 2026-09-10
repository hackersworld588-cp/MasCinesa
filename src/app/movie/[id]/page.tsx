import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Clock,
  Calendar,
  Globe,
  Tv,
  Users,
  Award,
  Share2,
} from "lucide-react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatMovieWithRelations, getHybridRecommendations } from "@/lib/ai-engine";
import { getMovieById } from "@/lib/movie-service";
import WatchlistButton from "@/components/WatchlistButton";
import MovieRow from "@/components/MovieRow";
import ReviewSection from "@/components/ReviewSection";
import MovieDetailHeroButtons from "@/components/MovieDetailHeroButtons";
import SeriesEpisodesSection from "@/components/SeriesEpisodesSection";

interface MoviePageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const { getAllMovies } = await import("@/lib/movie-service");
  const movies = await getAllMovies();
  return movies.map((m) => ({ id: m.id }));
}

export default async function MovieDetailsPage({ params }: MoviePageProps) {
  const { id } = params;
  const user = await getCurrentUser();

  const movie = await getMovieById(id);

  if (!movie) {
    notFound();
  }

  // Load reviews safely if DB is online
  let initialReviews: any[] = [];
  try {
    initialReviews = await db.review.findMany({
      where: { movieId: movie.id, status: "approved" },
      include: {
        user: { select: { id: true, name: true, avatar: true, role: true } },
      },
      orderBy: { helpfulUpvotes: "desc" },
    });
  } catch (e) {
    initialReviews = [];
  }

  // Check user watchlist state
  let inWatchlist = false;
  let userRatingVal: number | null = null;
  if (user) {
    try {
      const wl = await db.watchlistMovie.findFirst({
        where: { watchlist: { userId: user.id }, movieId: movie.id },
      });
      inWatchlist = !!wl;

      const ratingRec = await db.rating.findUnique({
        where: { userId_movieId: { userId: user.id, movieId: movie.id } },
      });
      userRatingVal = ratingRec?.score || null;
    } catch (e) {
      // ignore
    }
  }

  // Similar Movies via Content-Based Hybrid Engine
  let similarMovies: any[] = [];
  try {
    const similarRecs = await getHybridRecommendations({
      movieId: movie.id,
      limit: 8,
    });
    similarMovies = similarRecs.map((r) => r.movie);
  } catch (e) {
    similarMovies = [];
  }

  return (
    <div className="min-h-screen bg-background text-gray-100 pb-16">
      {/* 1. Giant Backdrop Banner */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[75vh] bg-surface-muted overflow-hidden">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover object-top filter brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent w-full md:w-1/2" />
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 -mt-36 sm:-mt-52 md:-mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Left Column: Poster & Quick Info */}
          <div className="w-full md:w-72 lg:w-80 flex-shrink-0 flex flex-col items-center md:items-start">
            {/* Poster Card */}
            <div className="relative aspect-[2/3] w-56 sm:w-64 md:w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 glass-panel">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Streaming Providers ("Where to Watch") */}
            {movie.streamingPlatforms && movie.streamingPlatforms.length > 0 && (
              <div className="w-full mt-6 p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300">
                  <Tv className="w-4 h-4 text-brand-crimson" />
                  <span>Where to Watch</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.streamingPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white hover:border-brand-red/40 transition"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Metadata Box */}
            <div className="w-full mt-4 p-4 rounded-2xl glass-panel border border-white/10 space-y-2.5 text-xs text-gray-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Release Date</span>
                <span className="font-semibold text-white">{movie.releaseDate || movie.releaseYear}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Runtime</span>
                <span className="font-semibold text-white">{movie.runtime} minutes</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Language</span>
                <span className="font-semibold text-white uppercase">{movie.language}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Country</span>
                <span className="font-semibold text-white">{movie.originCountry}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Overview, Cast, Trailer CTA */}
          <div className="flex-1 flex flex-col justify-end pt-4 md:pt-16">
            {/* Title & Tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-sm sm:text-base text-gray-300 italic mt-2 font-light">
                &quot;{movie.tagline}&quot;
              </p>
            )}

            {/* Ratings & Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs sm:text-sm font-semibold">
              {/* IMDb Rating */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-brand-gold/40 text-brand-gold backdrop-blur-md">
                <Star className="w-4 h-4 fill-brand-gold" />
                <span className="text-base">{movie.voteAverage.toFixed(1)}</span>
                <span className="text-xs text-gray-400 font-normal">/ 10</span>
                <span className="text-[10px] text-gray-400 ml-1">({movie.voteCount.toLocaleString()} votes)</span>
              </div>

              {/* Release Year */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-gray-300">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{movie.releaseYear}</span>
              </div>

              {/* Runtime */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-gray-300">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{movie.runtime} min</span>
              </div>

              {/* 100% Ad-Free Full Movie or Series Badge */}
              {movie.isSeries ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-xs uppercase tracking-wide">
                    {movie.episodes?.length || movie.totalEpisodes || 3} Episodes (Serial-Wise HD)
                  </span>
                </div>
              ) : movie.isFreeWatch ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-xs uppercase tracking-wide">100% Ad-Free Full Movie</span>
                </div>
              ) : null}

              {/* Hindi Dubbed Available Badge */}
              {!movie.isFreeWatch && (movie.language === "hi" || movie.streamingPlatforms?.some((p) => p.includes("Hindi"))) && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-semibold text-xs uppercase tracking-wide">Hindi Dubbed Available</span>
                </div>
              )}
            </div>

            {/* Genre Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres?.map((g) => (
                <Link
                  key={g.id}
                  href={`/search?genre=${encodeURIComponent(g.name)}`}
                  className="px-3.5 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-gray-200 hover:bg-white/20 hover:text-white transition"
                >
                  {g.name}
                </Link>
              ))}
            </div>

            {/* Interactive Hero Action Buttons (Trailer & Full Movie Modal, Watchlist, Share) */}
            <div className="mt-6">
              <MovieDetailHeroButtons
                movieId={movie.id}
                title={movie.title}
                imdbId={movie.imdbId}
                tmdbId={movie.tmdbId}
                backdropUrl={movie.backdropUrl}
                trailerKey={movie.trailerKey}
                trailerUrl={movie.trailerUrl}
                fullMovieKey={movie.fullMovieKey}
                isFreeWatch={movie.isFreeWatch}
                isSeries={movie.isSeries}
                episodes={movie.episodes}
                initialInWatchlist={inWatchlist}
                initialUserRating={userRatingVal}
              />
            </div>

            {/* Synopsis */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-2">Overview</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {movie.overview}
              </p>
            </div>

            {/* Director Section */}
            {movie.directors && movie.directors.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Director
                </h3>
                <div className="flex items-center gap-4">
                  {movie.directors.map((dir) => (
                    <div
                      key={dir.id}
                      className="flex items-center gap-3 p-2.5 pr-4 rounded-xl glass-panel border border-white/10"
                    >
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white/10 border border-white/20">
                        {dir.profileUrl ? (
                          <Image
                            src={dir.profileUrl}
                            alt={dir.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Users className="w-5 h-5 text-gray-400 m-auto inset-0 absolute" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{dir.name}</p>
                        <p className="text-xs text-gray-400">Director</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cast Section */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Top Cast</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {movie.cast.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-xl glass-panel border border-white/5"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                        {item.actor.profileUrl ? (
                          <Image
                            src={item.actor.profileUrl}
                            alt={item.actor.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Users className="w-6 h-6 text-gray-400 absolute inset-0 m-auto" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-semibold text-xs text-white truncate">
                          {item.actor.name}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {item.characterName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Serial-Wise Episodes Section for Turkish / Historical Mega Series */}
        {movie.episodes && movie.episodes.length > 0 && (
          <SeriesEpisodesSection
            movieId={movie.id}
            seriesTitle={movie.title}
            backdropUrl={movie.backdropUrl}
            posterUrl={movie.posterUrl}
            episodes={movie.episodes}
          />
        )}

        {/* 3. Community Reviews & Rating Section */}
        <div className="mt-16">
          <ReviewSection
            movieId={movie.id}
            initialReviews={initialReviews as any}
            initialUserRating={userRatingVal}
            currentUserId={user?.id}
          />
        </div>

        {/* 4. Similar Movies (Content-Based) */}
        {similarMovies.length > 0 && (
          <div className="mt-16 -mx-4 sm:-mx-8 md:-mx-12">
            <MovieRow
              title="More Like This"
              subtitle={`Recommendations based on genres, themes, and creative vision of ${movie.title}`}
              movies={similarMovies}
              badge="Similar"
            />
          </div>
        )}
      </div>
    </div>
  );
}
