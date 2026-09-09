import { NextResponse } from "next/server";
import { getAllMovies } from "@/lib/movie-service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const genre = searchParams.get("genre") || "";
    const director = searchParams.get("director") || "";
    const actor = searchParams.get("actor") || "";
    const yearMin = searchParams.get("yearMin") ? Number(searchParams.get("yearMin")) : undefined;
    const yearMax = searchParams.get("yearMax") ? Number(searchParams.get("yearMax")) : undefined;
    const ratingMin = searchParams.get("ratingMin") ? Number(searchParams.get("ratingMin")) : undefined;
    const runtimeMax = searchParams.get("runtimeMax") ? Number(searchParams.get("runtimeMax")) : undefined;
    const language = searchParams.get("language") || "";
    const streaming = searchParams.get("streaming") || "";
    const sortBy = searchParams.get("sortBy") || "popularity";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const allMovies = await getAllMovies();
    const normQuery = query.toLowerCase().trim();

    // Filter candidate movies
    const filtered = allMovies.filter((movie) => {
      // 1. Text Query (Title, Tagline, Overview, Cast, Director)
      if (normQuery) {
        const titleMatch = movie.title.toLowerCase().includes(normQuery);
        const originalTitleMatch = movie.originalTitle?.toLowerCase().includes(normQuery);
        const overviewMatch = movie.overview.toLowerCase().includes(normQuery);
        const castMatch = movie.cast?.some((c) =>
          c.actor?.name?.toLowerCase().includes(normQuery) ||
          c.characterName?.toLowerCase().includes(normQuery)
        );
        const directorMatch = movie.directors?.some((d) =>
          d.name?.toLowerCase().includes(normQuery)
        );

        if (!titleMatch && !originalTitleMatch && !overviewMatch && !castMatch && !directorMatch) {
          return false;
        }
      }

      // 2. Genre Filter
      if (genre && genre !== "all") {
        const hasGenre = movie.genres?.some(
          (g) => g.name.toLowerCase() === genre.toLowerCase() || g.slug === genre.toLowerCase()
        );
        if (!hasGenre) return false;
      }

      // 3. Director Filter
      if (director) {
        const hasDirector = movie.directors?.some((d) =>
          d.name.toLowerCase().includes(director.toLowerCase())
        );
        if (!hasDirector) return false;
      }

      // 4. Actor Filter
      if (actor) {
        const hasActor = movie.cast?.some((c) =>
          c.actor?.name?.toLowerCase().includes(actor.toLowerCase())
        );
        if (!hasActor) return false;
      }

      // 5. Year Range
      if (yearMin && movie.releaseYear && movie.releaseYear < yearMin) return false;
      if (yearMax && movie.releaseYear && movie.releaseYear > yearMax) return false;

      // 6. Rating Minimum
      if (ratingMin && movie.voteAverage < ratingMin) return false;

      // 7. Runtime Max
      if (runtimeMax && movie.runtime && movie.runtime > runtimeMax) return false;

      // 8. Language
      if (language && language !== "all" && movie.language !== language) return false;

      // 9. Streaming Platform
      if (streaming && streaming !== "all") {
        const platforms = movie.streamingPlatforms || [];
        if (!platforms.some((p) => p.toLowerCase().includes(streaming.toLowerCase()))) {
          return false;
        }
      }

      return true;
    });

    // Sort Results
    filtered.sort((a, b) => {
      let valA: any = a.popularity;
      let valB: any = b.popularity;

      if (sortBy === "vote_average") {
        valA = a.voteAverage;
        valB = b.voteAverage;
      } else if (sortBy === "release_date" || sortBy === "latest") {
        valA = a.releaseYear || 0;
        valB = b.releaseYear || 0;
      } else if (sortBy === "vote_count" || sortBy === "most_watched") {
        valA = a.voteCount;
        valB = b.voteCount;
      }

      if (sortOrder === "asc") return valA - valB;
      return valB - valA;
    });

    return NextResponse.json({
      movies: filtered,
      total: filtered.length,
      filters: { query, genre, director, actor, yearMin, yearMax, ratingMin, runtimeMax, language, streaming, sortBy },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
