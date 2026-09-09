import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getHybridRecommendations, parseNaturalLanguageQuery } from "@/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const { query, movieId, limit = 8 } = await req.json();
    const user = await getCurrentUser();

    const recommendations = await getHybridRecommendations({
      userId: user?.id,
      naturalQuery: query,
      movieId,
      limit,
    });

    const parsedIntent = query ? parseNaturalLanguageQuery(query) : null;

    return NextResponse.json({
      success: true,
      query,
      intent: parsedIntent,
      recommendations,
      count: recommendations.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || undefined;
    const movieId = searchParams.get("movieId") || undefined;
    const limit = Number(searchParams.get("limit") || 8);
    const user = await getCurrentUser();

    const recommendations = await getHybridRecommendations({
      userId: user?.id,
      naturalQuery: query,
      movieId,
      limit,
    });

    return NextResponse.json({
      success: true,
      recommendations,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
