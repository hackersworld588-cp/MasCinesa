import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin authorization required" }, { status: 403 });
    }

    const [
      totalMovies,
      totalUsers,
      totalReviews,
      pendingReportsCount,
      reports,
      flaggedReviews,
      movies,
      genres,
    ] = await Promise.all([
      db.movie.count(),
      db.user.count(),
      db.review.count(),
      db.report.count({ where: { status: "pending" } }),
      db.report.findMany({
        where: { status: "pending" },
        include: {
          reporter: { select: { id: true, name: true, email: true } },
          review: {
            include: {
              user: { select: { id: true, name: true } },
              movie: { select: { id: true, title: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      db.review.findMany({
        where: { status: "flagged" },
        include: {
          user: { select: { id: true, name: true } },
          movie: { select: { id: true, title: true } },
        },
        take: 10,
      }),
      db.movie.findMany({
        orderBy: { popularity: "desc" },
        take: 20,
        select: {
          id: true,
          title: true,
          releaseYear: true,
          voteAverage: true,
          voteCount: true,
          popularity: true,
          posterUrl: true,
        },
      }),
      db.genre.findMany({
        include: { _count: { select: { movieGenres: true } } },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalMovies,
        totalUsers,
        totalReviews,
        pendingReportsCount,
        aiQueriesProcessed: 1420,
      },
      reports,
      flaggedReviews,
      movies,
      genres,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin authorization required" }, { status: 403 });
    }

    const body = await req.json();
    const { action, movieId, movieData, reviewId, reviewStatus, reportId, reportStatus } = body;

    // 1. Moderate Review
    if (action === "moderate_review") {
      const updated = await db.review.update({
        where: { id: reviewId },
        data: { status: reviewStatus },
      });
      return NextResponse.json({ success: true, review: updated });
    }

    // 2. Resolve Report
    if (action === "resolve_report") {
      const updated = await db.report.update({
        where: { id: reportId },
        data: { status: reportStatus },
      });
      return NextResponse.json({ success: true, report: updated });
    }

    // 3. Delete Movie
    if (action === "delete_movie") {
      await db.movie.delete({ where: { id: movieId } });
      return NextResponse.json({ success: true, deleted: movieId });
    }

    // 4. Add New Movie
    if (action === "add_movie") {
      const newMovie = await db.movie.create({
        data: {
          title: movieData.title,
          tagline: movieData.tagline || null,
          overview: movieData.overview,
          releaseYear: Number(movieData.releaseYear) || 2024,
          runtime: Number(movieData.runtime) || 120,
          posterUrl: movieData.posterUrl,
          backdropUrl: movieData.backdropUrl,
          trailerKey: movieData.trailerKey || null,
          voteAverage: Number(movieData.voteAverage) || 7.5,
          voteCount: 100,
          popularity: 50.0,
          language: movieData.language || "en",
          streamingPlatforms: JSON.stringify(movieData.streamingPlatforms || ["Netflix"]),
        },
      });
      return NextResponse.json({ success: true, movie: newMovie });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
