import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");
    const sortBy = searchParams.get("sortBy") || "helpful"; // 'helpful', 'latest', 'rating_desc', 'rating_asc'

    if (!movieId) {
      return NextResponse.json({ error: "movieId is required" }, { status: 400 });
    }

    let orderBy: any = { helpfulUpvotes: "desc" };
    if (sortBy === "latest") orderBy = { createdAt: "desc" };
    if (sortBy === "rating_desc") orderBy = { rating: "desc" };
    if (sortBy === "rating_asc") orderBy = { rating: "asc" };

    const reviews = await db.review.findMany({
      where: {
        movieId,
        status: { in: ["approved", "flagged"] },
      },
      include: {
        user: { select: { id: true, name: true, avatar: true, role: true } },
      },
      orderBy,
    });

    return NextResponse.json({ reviews });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const { action = "create", movieId, reviewId, rating, title, content, containsSpoilers, voteType, reportReason } = body;

    // 1. Submit a Review
    if (action === "create") {
      if (!movieId || !content) {
        return NextResponse.json({ error: "Movie ID and content are required" }, { status: 400 });
      }

      const review = await db.review.create({
        data: {
          userId: user.id,
          movieId,
          rating: rating ? Number(rating) : null,
          title: title || null,
          content,
          containsSpoilers: !!containsSpoilers,
          status: "approved",
        },
        include: {
          user: { select: { id: true, name: true, avatar: true, role: true } },
        },
      });

      // If a rating was submitted, update/upsert user rating table as well
      if (rating) {
        await db.rating.upsert({
          where: { userId_movieId: { userId: user.id, movieId } },
          update: { score: Number(rating) },
          create: { userId: user.id, movieId, score: Number(rating) },
        });
      }

      return NextResponse.json({ success: true, review });
    }

    // 2. Vote on a Review (Helpful / Unhelpful)
    if (action === "vote") {
      if (!reviewId || !voteType) {
        return NextResponse.json({ error: "reviewId and voteType are required" }, { status: 400 });
      }

      const existingVote = await db.reviewVote.findUnique({
        where: { userId_reviewId: { userId: user.id, reviewId } },
      });

      if (existingVote) {
        if (existingVote.voteType === voteType) {
          // Unvote
          await db.reviewVote.delete({ where: { id: existingVote.id } });
          if (voteType === "UP") {
            await db.review.update({
              where: { id: reviewId },
              data: { helpfulUpvotes: { decrement: 1 } },
            });
          }
        } else {
          // Switch vote
          await db.reviewVote.update({
            where: { id: existingVote.id },
            data: { voteType },
          });
          if (voteType === "UP") {
            await db.review.update({
              where: { id: reviewId },
              data: { helpfulUpvotes: { increment: 1 }, helpfulDownvotes: { decrement: 1 } },
            });
          } else {
            await db.review.update({
              where: { id: reviewId },
              data: { helpfulUpvotes: { decrement: 1 }, helpfulDownvotes: { increment: 1 } },
            });
          }
        }
      } else {
        await db.reviewVote.create({
          data: { userId: user.id, reviewId, voteType },
        });
        if (voteType === "UP") {
          await db.review.update({
            where: { id: reviewId },
            data: { helpfulUpvotes: { increment: 1 } },
          });
        } else {
          await db.review.update({
            where: { id: reviewId },
            data: { helpfulDownvotes: { increment: 1 } },
          });
        }
      }

      const updated = await db.review.findUnique({ where: { id: reviewId } });
      return NextResponse.json({ success: true, review: updated });
    }

    // 3. Report Inappropriate Review
    if (action === "report") {
      if (!reviewId || !reportReason) {
        return NextResponse.json({ error: "reviewId and reportReason required" }, { status: 400 });
      }

      const report = await db.report.create({
        data: {
          reporterId: user.id,
          reviewId,
          reason: reportReason,
          status: "pending",
        },
      });

      // Mark review status as 'flagged' for admin review
      await db.review.update({
        where: { id: reviewId },
        data: { status: "flagged" },
      });

      return NextResponse.json({ success: true, report });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
