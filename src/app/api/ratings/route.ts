import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { movieId, score } = await req.json();
    const numScore = Number(score);

    if (!movieId || isNaN(numScore) || numScore < 1 || numScore > 10) {
      return NextResponse.json({ error: "Valid score between 1 and 10 is required" }, { status: 400 });
    }

    const rating = await db.rating.upsert({
      where: { userId_movieId: { userId: user.id, movieId } },
      update: { score: numScore },
      create: { userId: user.id, movieId, score: numScore },
    });

    // Also update watch history if not logged
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

    return NextResponse.json({ success: true, rating });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
