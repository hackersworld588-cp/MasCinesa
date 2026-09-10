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
 * Get the featured hero movie safely
 */
export async function getFeaturedMovie(): Promise<Movie | null> {
  if (isRemoteDb) {
    try {
      const { db } = await import("@/lib/db");
      const { formatMovieWithRelations } = await import("@/lib/ai-engine");
      const featuredRecord = await db.movie.findFirst({
        where: {
          OR: [
            { title: { contains: "Sarrainodu" } },
            { title: { contains: "Hera Pheri" } },
            { title: { contains: "DJ" } },
          ],
        },
        include: {
          movieGenres: { include: { genre: true } },
          movieDirectors: { include: { director: true } },
          movieCast: { include: { actor: true } },
        },
      });
      if (featuredRecord) {
        return formatMovieWithRelations(featuredRecord);
      }
    } catch (error) {
      console.warn("Database query for featured movie failed, using static fallback:", error);
    }
  }

  return (
    staticMovies.find(
      (m) =>
        m.title.includes("Sarrainodu") ||
        m.title.includes("Hera Pheri") ||
        m.title.includes("DJ")
    ) ||
    staticMovies[0] ||
    null
  );
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
