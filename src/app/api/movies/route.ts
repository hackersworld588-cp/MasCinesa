import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatMovieWithRelations } from "@/lib/ai-engine";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "all";
    const limit = Number(searchParams.get("limit") || 12);
    const user = await getCurrentUser();

    // User Watchlist IDs for fast lookup
    let watchlistMovieIds: string[] = [];
    if (user) {
      const wList = await db.watchlist.findFirst({
        where: { userId: user.id, isDefault: true },
        include: { movies: true },
      });
      if (wList) {
        watchlistMovieIds = wList.movies.map((m) => m.movieId);
      }
    }

    let moviesQuery: any = {
      include: {
        movieGenres: { include: { genre: true } },
        movieDirectors: { include: { director: true } },
        movieCast: { include: { actor: true } },
      },
      take: limit,
    };

    if (category === "featured") {
      // Find Interstellar or highest-rated blockbuster with backdrop
      const featured = await db.movie.findFirst({
        where: {
          OR: [{ title: "Interstellar" }, { voteAverage: { gte: 8.5 } }],
        },
        include: {
          movieGenres: { include: { genre: true } },
          movieDirectors: { include: { director: true } },
          movieCast: { include: { actor: true } },
        },
      });

      if (featured) {
        const formatted = formatMovieWithRelations(featured);
        formatted.isWatchlist = watchlistMovieIds.includes(featured.id);
        return NextResponse.json({ movie: formatted });
      }
    }

    if (category === "top_rated") {
      moviesQuery.orderBy = { voteAverage: "desc" };
    } else if (category === "popular" || category === "trending") {
      moviesQuery.orderBy = { popularity: "desc" };
    } else if (category === "upcoming") {
      moviesQuery.orderBy = { releaseYear: "desc" };
    } else if (category === "continue_watching" && user) {
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
    }

    const movies = await db.movie.findMany(moviesQuery);
    const formattedMovies = movies.map((m) => {
      const formatted = formatMovieWithRelations(m);
      formatted.isWatchlist = watchlistMovieIds.includes(m.id);
      return formatted;
    });

    return NextResponse.json({ movies: formattedMovies });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
