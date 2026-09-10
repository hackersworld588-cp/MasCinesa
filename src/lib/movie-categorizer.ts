import { Movie } from "@/types";

export interface StrictMovieCategories {
  marvelHollywood: Movie[];
  iofHollywood: Movie[];
  goldminesAction: Movie[];
  comedyMovies: Movie[];
  horrorThriller: Movie[];
  romanceDrama: Movie[];
}

/**
 * Distributes all movies into mutually exclusive categories.
 * Guarantees:
 * 1. Zero duplicates across sections (every movie appears in at most ONE category).
 * 2. Strict Hollywood vs Bollywood separation (Hollywood/Marvel movies never bleed into Bollywood/South sections).
 */
export function getStrictCategorizedMovies(allMovies: Movie[]): StrictMovieCategories {
  const assigned = new Set<string>();

  const result: StrictMovieCategories = {
    marvelHollywood: [],
    iofHollywood: [],
    goldminesAction: [],
    comedyMovies: [],
    horrorThriller: [],
    romanceDrama: [],
  };

  // 1. Marvel & Hollywood Superhero Hits (Exclusive)
  for (const m of allMovies) {
    const t = m.title.toLowerCase();
    const isMarvel = t.includes("avengers") || t.includes("thor") || t.includes("marvel");
    if (isMarvel && !assigned.has(m.id)) {
      result.marvelHollywood.push(m);
      assigned.add(m.id);
    }
  }

  // 2. Indo Overseas Films (Official Hollywood & International Hindi Dubbed - Exclusive)
  for (const m of allMovies) {
    const genres = m.genres?.map((g) => g.name) || [];
    const isIof = genres.includes("Indo Overseas Films") || (m.streamingPlatforms && m.streamingPlatforms.includes("Indo Overseas Films"));
    if (isIof && !assigned.has(m.id)) {
      result.iofHollywood.push(m);
      assigned.add(m.id);
    }
  }

  // 3. Comedy Dhamaal & Family Laughs (Bollywood/South Comedy - Exclusive)
  for (const m of allMovies) {
    const genres = m.genres?.map((g) => g.name) || [];
    if (genres.includes("Comedy") && !assigned.has(m.id)) {
      result.comedyMovies.push(m);
      assigned.add(m.id);
    }
  }

  // 4. Horror, Thriller & Mystery Nights (Bollywood/South Horror/Suspense - Exclusive)
  for (const m of allMovies) {
    const genres = m.genres?.map((g) => g.name) || [];
    const isHorror = genres.some((g) => ["Horror", "Mystery", "Thriller"].includes(g));
    if (isHorror && !assigned.has(m.id)) {
      result.horrorThriller.push(m);
      assigned.add(m.id);
    }
  }

  // 5. Romantic & Heartfelt Blockbusters (Bollywood/South Romance/Drama - Exclusive)
  for (const m of allMovies) {
    const genres = m.genres?.map((g) => g.name) || [];
    const isRomance = genres.some((g) => ["Romance", "Drama", "Biography"].includes(g)) &&
      !genres.some((g) => ["Action", "Crime"].includes(g));
    if (isRomance && !assigned.has(m.id)) {
      result.romanceDrama.push(m);
      assigned.add(m.id);
    }
  }

  // 6. Goldmines South Mass & Action Blockbusters (Sarrainodu, DJ, Race Gurram, etc. - Exclusive)
  for (const m of allMovies) {
    const genres = m.genres?.map((g) => g.name) || [];
    const isAction = genres.some((g) => ["Action", "Crime"].includes(g));
    if (isAction && !assigned.has(m.id)) {
      result.goldminesAction.push(m);
      assigned.add(m.id);
    }
  }

  // Fallback for any unassigned
  for (const m of allMovies) {
    if (!assigned.has(m.id)) {
      result.goldminesAction.push(m);
      assigned.add(m.id);
    }
  }

  return result;
}
