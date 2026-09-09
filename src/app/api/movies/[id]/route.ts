import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getHybridRecommendations } from "@/lib/ai-engine";
import { getMovieById } from "@/lib/movie-service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await getCurrentUser();

    const movie = await getMovieById(id);

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    // Check user watchlist and user rating safely
    if (user) {
      try {
        const watchlistEntry = await db.watchlistMovie.findFirst({
          where: {
            watchlist: { userId: user.id },
            movieId: movie.id,
          },
        });
        movie.isWatchlist = !!watchlistEntry;
        movie.isWatched = watchlistEntry?.isWatched || false;

        const userRating = await db.rating.findUnique({
          where: {
            userId_movieId: { userId: user.id, movieId: movie.id },
          },
        });
        movie.userRating = userRating?.score || null;
      } catch (e) {
        // ignore DB error
      }
    }

    // Get Content-based Similar Movies safely
    let similarMovies: any[] = [];
    try {
      const similarRecs = await getHybridRecommendations({
        movieId: movie.id,
        limit: 6,
      });
      similarMovies = similarRecs.map((r) => r.movie);
    } catch (e) {
      similarMovies = [];
    }

    let reviews: any[] = [];
    try {
      reviews = await db.review.findMany({
        where: { movieId: movie.id, status: "approved" },
        include: {
          user: { select: { id: true, name: true, avatar: true, role: true } },
        },
        orderBy: { helpfulUpvotes: "desc" },
      });
    } catch (e) {
      reviews = [];
    }

    return NextResponse.json({
      movie,
      reviews,
      similarMovies,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
