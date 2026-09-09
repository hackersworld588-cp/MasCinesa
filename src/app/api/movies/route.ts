import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatMovieWithRelations } from "@/lib/ai-engine";
import { getAllMovies, getFeaturedMovie } from "@/lib/movie-service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "all";
    const limit = Number(searchParams.get("limit") || 12);
    const user = await getCurrentUser();

    // User Watchlist IDs for fast lookup
    let watchlistMovieIds: string[] = [];
    if (user) {
      try {
        const wList = await db.watchlist.findFirst({
          where: { userId: user.id, isDefault: true },
          include: { movies: true },
        });
        if (wList) {
          watchlistMovieIds = wList.movies.map((m) => m.movieId);
        }
      } catch (e) {
        // ignore
      }
    }

    if (category === "featured") {
      const featured = await getFeaturedMovie();
      if (featured) {
        featured.isWatchlist = watchlistMovieIds.includes(featured.id);
        return NextResponse.json({ movie: featured });
      }
    }

    if (category === "continue_watching" && user) {
      try {
        const history = await db.watchHistory.findMany({
          where: { userId: user.id },
          orderBy: { watchedAt: "desc" },
          take: 6,
          include: {
            movie: {
              include: {
                movieGenres: { include: { genre: true } },
                movieDirectors: { include: { director: true } },
                movieCast: { include: { actor: true } },
              },
            },
          },
        });

        const formattedHistory = history.map((h) => {
          const formatted = formatMovieWithRelations(h.movie);
          formatted.isWatchlist = watchlistMovieIds.includes(h.movie.id);
          formatted.isWatched = true;
          return formatted;
        });

        return NextResponse.json({ movies: formattedHistory });
      } catch (e) {
        return NextResponse.json({ movies: [] });
      }
    }

    // Get all movies safely
    let movies = await getAllMovies();

    if (category === "top_rated") {
      movies = [...movies].sort((a, b) => b.voteAverage - a.voteAverage);
    } else if (category === "popular" || category === "trending") {
      movies = [...movies].sort((a, b) => b.popularity - a.popularity);
    } else if (category === "upcoming") {
      movies = [...movies].sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
    }

    const sliced = movies.slice(0, limit).map((m) => {
      m.isWatchlist = watchlistMovieIds.includes(m.id);
      return m;
    });

    return NextResponse.json({ movies: sliced });
  } catch (err: any) {
    // Fallback to static movies even on unexpected error
    const fallbackMovies = await getAllMovies();
    return NextResponse.json({ movies: fallbackMovies.slice(0, 12) });
  }
}
