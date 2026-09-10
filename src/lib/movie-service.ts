import staticMoviesData from "@/data/movies.json";
import { Movie } from "@/types";

const staticMovies: Movie[] = staticMoviesData as unknown as Movie[];

// Only use Prisma if an external remote database (Postgres/MySQL) is explicitly provided
const isRemoteDb = Boolean(
  process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.startsWith("file:")
);

/**
 * Get all movies safely from DB or bundled static dataset
 */
export async function getAllMovies(): Promise<Movie[]> {
  if (isRemoteDb) {
    try {
      const { db } = await import("@/lib/db");
      const { formatMovieWithRelations } = await import("@/lib/ai-engine");
      const dbMovies = await db.movie.findMany({
        include: {
          movieGenres: { include: { genre: true } },
          movieDirectors: { include: { director: true } },
          movieCast: { include: { actor: true } },
        },
      });
      if (dbMovies && dbMovies.length > 0) {
        return dbMovies.map(formatMovieWithRelations);
      }
    } catch (error) {
      console.warn("Database query failed, serving from static movie dataset:", error);
    }
  }
  return staticMovies;
}

/**
 * Get the featured hero series for the auto-rotating Hero Banner
 * Specifically features the 4 legendary Turkish & Islamic series:
 * 1. Kuruluş: Osman (Urdu Dubbed)
 * 2. Ertugrul Ghazi (Diriliş: Ertuğrul Urdu)
 * 3. Sultan Selahaddin Eyyubi (Kudüs Fatihi)
 * 4. Payitaht Sultan Abdülhamid
 */
export async function getFeaturedHeroMovies(): Promise<Movie[]> {
  const all = await getAllMovies();
  
  const kurulus = all.find((m) => m.fullMovieKey === "yzC6IWPLg78" || m.title.includes("Kuruluş: Osman"));
  const ertugrul = all.find((m) => m.fullMovieKey === "fa89NxhAKis" || m.title.includes("Ertugrul Ghazi"));
  const selahaddin = all.find((m) => m.fullMovieKey === "o1b-cTUM_ig" || m.title.includes("Selahaddin Eyyubi"));
  const payitaht = all.find((m) => m.fullMovieKey === "GyqbUrT_7j8" || m.title.includes("Payitaht Sultan"));

  const list: Movie[] = [];
  if (kurulus) list.push(kurulus);
  if (ertugrul) list.push(ertugrul);
  if (selahaddin) list.push(selahaddin);
  if (payitaht) list.push(payitaht);

  if (list.length >= 4) return list;

  for (const m of all) {
    if (!list.find((x) => x.id === m.id)) {
      list.push(m);
      if (list.length >= 4) break;
    }
  }
  return list;
}

/**
 * Get the featured hero movie safely
 */
export async function getFeaturedMovie(): Promise<Movie | null> {
  const heroes = await getFeaturedHeroMovies();
  return heroes[0] || null;
}

/**
 * Get movie by ID or TMDB ID safely
 */
export async function getMovieById(id: string): Promise<Movie | null> {
  if (isRemoteDb) {
    try {
      const { db } = await import("@/lib/db");
      const { formatMovieWithRelations } = await import("@/lib/ai-engine");
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
        },
      });
      if (movieRecord) {
        return formatMovieWithRelations(movieRecord);
      }
    } catch (error) {
      console.warn(`Database query for movie ${id} failed, using static fallback:`, error);
    }
  }

  const isNum = !isNaN(Number(id));
  const found = staticMovies.find(
    (m) =>
      m.id === id ||
      (isNum && m.tmdbId === Number(id)) ||
      m.imdbId === id
  );

  return found || null;
}
