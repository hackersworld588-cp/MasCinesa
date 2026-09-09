import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatMovieWithRelations } from "@/lib/ai-engine";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const watchlists = await db.watchlist.findMany({
      where: { userId: user.id },
      include: {
        movies: {
          include: {
            movie: {
              include: {
                movieGenres: { include: { genre: true } },
                movieDirectors: { include: { director: true } },
                movieCast: { include: { actor: true } },
              },
            },
          },
          orderBy: { addedAt: "desc" },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const formattedLists = watchlists.map((wl) => ({
      id: wl.id,
      title: wl.title,
      description: wl.description,
      isDefault: wl.isDefault,
      isPrivate: wl.isPrivate,
      movies: wl.movies.map((wm) => ({
        id: wm.id,
        watchlistId: wm.watchlistId,
        movieId: wm.movieId,
        addedAt: wm.addedAt,
        personalNotes: wm.personalNotes,
        userRating: wm.userRating,
        isWatched: wm.isWatched,
        movie: formatMovieWithRelations(wm.movie),
      })),
    }));

    return NextResponse.json({ watchlists: formattedLists });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, movieId, watchlistId, title, description, notes, isWatched, rating } = body;

    // 1. Create a New Custom Watchlist
    if (action === "create_list") {
      if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }

      const newList = await db.watchlist.create({
        data: {
          userId: user.id,
          title,
          description,
          isDefault: false,
          isPrivate: false,
        },
      });
      return NextResponse.json({ success: true, watchlist: newList });
    }

    // Determine target watchlist (use provided or user's default watchlist)
    let targetListId = watchlistId;
    if (!targetListId) {
      let defaultList = await db.watchlist.findFirst({
        where: { userId: user.id, isDefault: true },
      });
      if (!defaultList) {
        defaultList = await db.watchlist.create({
          data: {
            userId: user.id,
            title: "My Watchlist",
            isDefault: true,
          },
        });
      }
      targetListId = defaultList.id;
    }

    // 2. Add Movie to Watchlist
    if (action === "add") {
      const existing = await db.watchlistMovie.findUnique({
        where: {
          watchlistId_movieId: { watchlistId: targetListId, movieId },
        },
      });

      if (!existing) {
        await db.watchlistMovie.create({
          data: {
            watchlistId: targetListId,
            movieId,
            personalNotes: notes || null,
            isWatched: false,
          },
        });
      }
      return NextResponse.json({ success: true, added: true });
    }

    // 3. Remove Movie from Watchlist
    if (action === "remove") {
      await db.watchlistMovie.deleteMany({
        where: {
          watchlistId: targetListId,
          movieId,
        },
      });
      return NextResponse.json({ success: true, removed: true });
    }

    // 4. Update Personal Notes, Watched Status, or Rating
    if (action === "update") {
      const updated = await db.watchlistMovie.updateMany({
        where: {
          watchlistId: targetListId,
          movieId,
        },
        data: {
          ...(notes !== undefined ? { personalNotes: notes } : {}),
          ...(isWatched !== undefined ? { isWatched } : {}),
          ...(rating !== undefined ? { userRating: rating } : {}),
        },
      });

      // If marked as watched, log into watch_history
      if (isWatched) {
        const existingHist = await db.watchHistory.findFirst({
          where: { userId: user.id, movieId },
        });
        if (!existingHist) {
          const mov = await db.movie.findUnique({ where: { id: movieId } });
          await db.watchHistory.create({
            data: {
              userId: user.id,
              movieId,
              watchDuration: mov?.runtime || 120,
              completed: true,
            },
          });
        }
      }

      return NextResponse.json({ success: true, updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
