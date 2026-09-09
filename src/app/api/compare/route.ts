import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatMovieWithRelations } from "@/lib/ai-engine";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idA = searchParams.get("movieA");
    const idB = searchParams.get("movieB");

    if (!idA || !idB) {
      return NextResponse.json({ error: "movieA and movieB query params are required" }, { status: 400 });
    }

    const movieA = await fetchMovieWithRelations(idA);
    const movieB = await fetchMovieWithRelations(idB);

    if (!movieA || !movieB) {
      return NextResponse.json({ error: "One or both movies not found" }, { status: 404 });
    }

    const formattedA = formatMovieWithRelations(movieA);
    const formattedB = formatMovieWithRelations(movieB);

    // Compute metrics
    const genresA = formattedA.genres?.map((g) => g.name) || [];
    const genresB = formattedB.genres?.map((g) => g.name) || [];
    const commonGenres = genresA.filter((g) => genresB.includes(g));

    const directorA = formattedA.directors?.[0]?.name || "N/A";
    const directorB = formattedB.directors?.[0]?.name || "N/A";
    const sameDirector = directorA !== "N/A" && directorA === directorB;

    const castNamesA = formattedA.cast?.map((c) => c.actor.name) || [];
    const castNamesB = formattedB.cast?.map((c) => c.actor.name) || [];
    const commonCast = castNamesA.filter((c) => castNamesB.includes(c));

    // AI comparison verdict
    let verdict = "";
    if (sameDirector) {
      verdict = `Both films represent masterclasses by director ${directorA}. ${formattedA.title} leans deeper into ${genresA.join(", ")}, whereas ${formattedB.title} emphasizes ${genresB.join(", ")}.`;
    } else if (commonGenres.length > 0) {
      verdict = `Both share the thrilling dna of ${commonGenres.join(" and ")}. Choose ${formattedA.title} for a runtime of ${formattedA.runtime}m with a ${formattedA.voteAverage}/10 rating, or ${formattedB.title} for ${formattedB.runtime}m with a ${formattedB.voteAverage}/10 rating.`;
    } else {
      verdict = `Contrasting cinematic experiences: ${formattedA.title} is a ${genresA.join("/")} journey while ${formattedB.title} is an intense ${genresB.join("/")} experience.`;
    }

    return NextResponse.json({
      movieA: formattedA,
      movieB: formattedB,
      comparison: {
        commonGenres,
        commonCast,
        sameDirector,
        ratingDiff: Number((formattedA.voteAverage - formattedB.voteAverage).toFixed(1)),
        runtimeDiffMinutes: formattedA.runtime - formattedB.runtime,
        verdict,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function fetchMovieWithRelations(identifier: string) {
  const isNum = !isNaN(Number(identifier));
  return await db.movie.findFirst({
    where: isNum
      ? { OR: [{ id: identifier }, { tmdbId: Number(identifier) }] }
      : {
          OR: [
            { id: identifier },
            { title: { contains: identifier } },
          ],
        },
    include: {
      movieGenres: { include: { genre: true } },
      movieDirectors: { include: { director: true } },
      movieCast: { include: { actor: true } },
    },
  });
}
