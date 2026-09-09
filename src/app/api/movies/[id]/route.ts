import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatMovieWithRelations, getHybridRecommendations } from "@/lib/ai-engine";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await getCurrentUser();

    const isNum = !isNaN(Number(id));
    const movieRecord = await db.movie.findFirst({
      where: isNum ? { OR: [{ id }, { tmdbId: Number(id) }] } : { id },
      include: {
        movieGenres: { include: { genre: true } },
        movieDirectors: { include: { director: true } },
        movieCast: {
          include: { actor: true },
          orderBy: { orderIndex: "asc" },
        },
        reviews: {
          where: { status: "approved" },
          include: {
            user: { select: { id: true, name: true, avatar: true, role: true } },
          },
          orderBy: { helpfulUpvotes: "desc" },
        },
      },
    });

    if (!movieRecord) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const movie = formatMovieWithRelations(movieRecord);

    // Check user watchlist and user rating
    if (user) {
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
    }

    // Get Content-based Similar Movies
    const similarRecs = await getHybridRecommendations({
      movieId: movie.id,
      limit: 6,
    });
    const similarMovies = similarRecs.map((r) => r.movie);

    return NextResponse.json({
      movie,
      reviews: movieRecord.reviews,
      similarMovies,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
