import { db } from "./db";
import { Movie, RecommendationResult } from "../types";
import staticMoviesData from "@/data/movies.json";

export interface ParsedIntent {
  rawQuery: string;
  referenceMovieTitle?: string;
  targetDirector?: string;
  targetActor?: string;
  targetGenres: string[];
  maxRuntimeMinutes?: number;
  moodThemes: string[];
  audience?: "family" | "solo" | "date" | "friends" | "general";
  isSadEnding?: boolean;
  isMindBending?: boolean;
  minRating?: number;
  sortBy?: "rating" | "popularity" | "release_date";
}

/**
 * Natural Language / Hinglish & English Semantic Intent Parser
 */
export function parseNaturalLanguageQuery(query: string): ParsedIntent {
  const normalized = query.toLowerCase().trim();

  const intent: ParsedIntent = {
    rawQuery: query,
    targetGenres: [],
    moodThemes: [],
  };

  // 1. Check known titles first for 100% precision
  const knownTitles = [
    "interstellar",
    "inception",
    "oppenheimer",
    "the dark knight",
    "blade runner 2049",
    "arrival",
    "dune: part two",
    "dune",
    "parasite",
    "shutter island",
    "memento",
    "the prestige",
    "se7en",
    "fight club",
    "gone girl",
    "whiplash",
    "la la land",
    "the shawshank redemption",
    "3 idiots",
    "andhadhun",
    "tumbbad",
    "spirited away",
    "spider-man: into the spider-verse",
    "coco",
    "hera pheri",
    "bhool bhulaiyaa",
    "chup chup ke",
    "nayak",
    "dhamaal",
    "golmaal",
    "welcome",
    "munna bhai mbbs",
    "gangs of wasseypur",
    "sivaji",
    "hungama",
    "pushpa",
    "kgf",
    "sarrainodu",
    "ala vaikunthapurramuloo",
    "vaikunthapurram",
    "dj",
    "duvvada jagannadham",
    "magadheera",
    "kaithi",
    "dilli",
    "vikram vedha",
    "1920",
    "raaz",
    "13b",
    "kanchana",
    "jab we met",
    "sita ramam",
    "geetha govindam",
    "vivah",
    "khatta meetha",
    "night of the living dead",
    "avengers: endgame",
    "avengers: infinity war",
    "the avengers",
    "endgame",
    "infinity war",
    "avengers",
    "spider-man: no way home",
    "no way home",
    "spider-man",
    "furious 7",
    "fast & furious 6",
    "fast and furious",
    "mission: impossible – fallout",
    "mission impossible",
    "dead reckoning",
    "jurassic world",
    "jurassic park",
    "transformers",
    "the matrix",
    "matrix",
    "john wick: chapter 4",
    "john wick",
    "batman begins",
    "the dark knight rises"
  ];

  for (const title of knownTitles) {
    if (normalized.includes(title)) {
      intent.referenceMovieTitle = title;
      break;
    }
  }

  // Fallback to pattern matching if not in knownTitles
  if (!intent.referenceMovieTitle) {
    const likePatterns = [
      // Hinglish: "X jaisi", "X jaise"
      /(?:mujhe\s+)?([a-zA-Z0-9\s:_-]+?)\s+(?:jaisi|jaise|ke jaisi|type ki|wali|waisi)/i,
      // English: "like X", "similar to X"
      /(?:like|similar to)\s+([a-zA-Z0-9\s:_-]+?)(?:\s+(?:movies?|films?)|$)/i,
    ];

    for (const pattern of likePatterns) {
      const match = normalized.match(pattern);
      if (match && match[1]) {
        const candidate = match[1].replace(/^(mujhe|koi|ek|please)\s+/i, "").trim();
        if (!["movie", "film", "koi", "achhi", "best", "mujhe", "please"].includes(candidate)) {
          intent.referenceMovieTitle = candidate;
          break;
        }
      }
    }
  }

  // 2. Check for Directors (e.g. "Christopher Nolan ki", "David Fincher", "Denis Villeneuve", "Scorsese")
  if (normalized.includes("nolan") || normalized.includes("christopher nolan")) {
    intent.targetDirector = "Christopher Nolan";
  } else if (normalized.includes("villeneuve") || normalized.includes("denis villeneuve")) {
    intent.targetDirector = "Denis Villeneuve";
  } else if (normalized.includes("fincher") || normalized.includes("david fincher")) {
    intent.targetDirector = "David Fincher";
  } else if (normalized.includes("scorsese") || normalized.includes("martin scorsese")) {
    intent.targetDirector = "Martin Scorsese";
  } else if (normalized.includes("miyazaki")) {
    intent.targetDirector = "Hayao Miyazaki";
  } else if (normalized.includes("tarantino")) {
    intent.targetDirector = "Quentin Tarantino";
  }

  // 3. Runtime constraints (e.g. "2 ghante se kam", "under 2 hours", "less than 90 mins", "choti movie")
  if (
    normalized.includes("2 ghante se kam") ||
    normalized.includes("2 ghante se kam ki") ||
    normalized.includes("under 2 hours") ||
    normalized.includes("less than 2 hours") ||
    normalized.includes("less than 120") ||
    normalized.includes("under 120")
  ) {
    intent.maxRuntimeMinutes = 125;
  } else if (
    normalized.includes("90 min") ||
    normalized.includes("1.5 ghanta") ||
    normalized.includes("short movie") ||
    normalized.includes("choti movie")
  ) {
    intent.maxRuntimeMinutes = 100;
  }

  // 4. Audience & Context (e.g. "family ke saath", "family movie", "with friends", "date night")
  if (
    normalized.includes("family") ||
    normalized.includes("family ke saath") ||
    normalized.includes("parivar") ||
    normalized.includes("kids") ||
    normalized.includes("bachho ke saath")
  ) {
    intent.audience = "family";
    intent.targetGenres.push("Family", "Animation");
  }

  // 5. Mind-Bending / Sci-Fi / Complex
  if (
    normalized.includes("mind-bending") ||
    normalized.includes("mind bending") ||
    normalized.includes("mindfuck") ||
    normalized.includes("twist") ||
    normalized.includes("complex plot") ||
    normalized.includes("dimag ghumane") ||
    normalized.includes("dimag hilane")
  ) {
    intent.isMindBending = true;
    intent.moodThemes.push("mind-bending", "psychological-thriller", "philosophical");
    if (!intent.targetGenres.includes("Science Fiction")) intent.targetGenres.push("Science Fiction", "Mystery");
  }

  // 6. Sad Ending / Emotional / Thriller
  if (
    normalized.includes("sad ending") ||
    normalized.includes("emotional") ||
    normalized.includes("heartbreaking") ||
    normalized.includes("dukhad") ||
    normalized.includes("depressing")
  ) {
    intent.isSadEnding = true;
    intent.moodThemes.push("sad-ending", "tragic", "emotional");
    if (!intent.targetGenres.includes("Drama")) intent.targetGenres.push("Drama");
  }

  // 7. General Genre keywords (English & Hindi)
  if (normalized.includes("sci-fi") || normalized.includes("scifi") || normalized.includes("science fiction") || normalized.includes("space")) {
    if (!intent.targetGenres.includes("Science Fiction")) intent.targetGenres.push("Science Fiction");
  }
  if (normalized.includes("thriller") || normalized.includes("suspense")) {
    if (!intent.targetGenres.includes("Thriller")) intent.targetGenres.push("Thriller");
  }
  if (normalized.includes("comedy") || normalized.includes("funny") || normalized.includes("hasne wali")) {
    if (!intent.targetGenres.includes("Comedy")) intent.targetGenres.push("Comedy");
  }
  if (normalized.includes("action") || normalized.includes("fight") || normalized.includes("action packed")) {
    if (!intent.targetGenres.includes("Action")) intent.targetGenres.push("Action");
  }
  if (normalized.includes("horror") || normalized.includes("scary") || normalized.includes("bhoot") || normalized.includes("darawani")) {
    if (!intent.targetGenres.includes("Horror")) intent.targetGenres.push("Horror");
  }
  if (normalized.includes("romance") || normalized.includes("romantic") || normalized.includes("love story") || normalized.includes("pyaar")) {
    if (!intent.targetGenres.includes("Romance")) intent.targetGenres.push("Romance");
  }

  // 8. Sorting intent
  if (normalized.includes("best") || normalized.includes("top rated") || normalized.includes("highest rated")) {
    intent.sortBy = "rating";
  } else if (normalized.includes("popular") || normalized.includes("trending")) {
    intent.sortBy = "popularity";
  } else if (normalized.includes("latest") || normalized.includes("new") || normalized.includes("nayee")) {
    intent.sortBy = "release_date";
  }

  return intent;
}

/**
 * Hybrid Recommendation Engine Pipeline
 */
export async function getHybridRecommendations(options: {
  userId?: string;
  naturalQuery?: string;
  movieId?: string;
  limit?: number;
}): Promise<RecommendationResult[]> {
  const { userId, naturalQuery, movieId, limit = 8 } = options;

  let allMovies: any[] = [];
  try {
    const dbMovies = await db.movie.findMany({
      include: {
        movieGenres: { include: { genre: true } },
        movieDirectors: { include: { director: true } },
        movieCast: { include: { actor: true } },
      },
    });
    if (dbMovies && dbMovies.length > 0) {
      allMovies = dbMovies.map(formatMovieWithRelations);
    }
  } catch (e) {
    allMovies = [];
  }

  if (!allMovies.length) {
    allMovies = staticMoviesData as unknown as Movie[];
  }

  if (!allMovies.length) return [];

  // Parse natural language query if present
  const intent = naturalQuery ? parseNaturalLanguageQuery(naturalQuery) : null;

  // 2. Fetch User Profile & Watch History Signals
  let userPreference = null;
  let userWatchedMovieIds: string[] = [];
  let userLikedGenres: string[] = [];

  if (userId) {
    try {
      const pref = await db.userPreference.findUnique({ where: { userId } });
      if (pref) {
        userPreference = pref;
        try {
          userLikedGenres = JSON.parse(pref.favoriteGenres);
        } catch (e) {}
      }

      const history = await db.watchHistory.findMany({
        where: { userId },
        select: { movieId: true },
      });
      userWatchedMovieIds = history.map((h) => h.movieId);
    } catch (e) {
      // ignore
    }
  }

  // 3. Find Reference Movie (either explicit ID or detected from natural query)
  let refMovie: any = null;
  if (movieId) {
    refMovie = allMovies.find((m) => m.id === movieId);
  } else if (intent?.referenceMovieTitle) {
    const qTitle = intent.referenceMovieTitle.toLowerCase();
    refMovie = allMovies.find(
      (m) =>
        m.title.toLowerCase().includes(qTitle) ||
        (m.originalTitle && m.originalTitle.toLowerCase().includes(qTitle))
    );
  }

  // 4. Scoring Algorithm across Candidate Pool
  const scoredItems = allMovies.map((movie) => {
    // If the movie is the reference movie itself, give it lowest rank to avoid recommending it to itself
    if (refMovie && movie.id === refMovie.id) {
      return { movie, rawScore: 0.05, explanation: "Reference Movie", matchedTags: [] };
    }

    let score = 0;
    const matchedTags: string[] = [];
    const explanations: string[] = [];

    const movieGenreNames: string[] = (movie.genres?.map((g: any) => g.name) || movie.movieGenres?.map((g: any) => g.genre?.name) || []) as string[];
    const movieDirectorNames: string[] = (movie.directors?.map((d: any) => d.name) || movie.movieDirectors?.map((d: any) => d.director?.name) || []) as string[];
    const movieCastNames: string[] = (movie.cast?.map((c: any) => c.actor?.name || c.characterName) || movie.movieCast?.map((c: any) => c.actor?.name) || []) as string[];

    // ==========================================
    // A. Reference Movie Content-Based Matching
    // ==========================================
    if (refMovie) {
      const refGenreNames: string[] = (refMovie.genres?.map((g: any) => g.name) || refMovie.movieGenres?.map((g: any) => g.genre?.name) || []) as string[];
      const refDirectorNames: string[] = (refMovie.directors?.map((d: any) => d.name) || refMovie.movieDirectors?.map((d: any) => d.director?.name) || []) as string[];

      // Genre Overlap
      const commonGenres = movieGenreNames.filter((g: string) => refGenreNames.includes(g));
      if (commonGenres.length > 0) {
        score += commonGenres.length * 0.22;
        matchedTags.push(...commonGenres);
      }

      // Director Overlap
      const commonDirector = movieDirectorNames.filter((d) => refDirectorNames.includes(d));
      if (commonDirector.length > 0) {
        score += 0.35;
        matchedTags.push(`Director: ${commonDirector[0]}`);
        explanations.push(`Shares visionary director ${commonDirector[0]} with ${refMovie.title}`);
      }

      // Vibe / Thematic Match
      if (refMovie.title === "Interstellar") {
        if (["Arrival", "Blade Runner 2049", "Inception", "Dune: Part Two"].includes(movie.title)) {
          score += 0.35;
          explanations.push(`Captures the vast cosmic wonder, profound emotion, and mind-bending physics of ${refMovie.title}`);
        }
      } else if (refMovie.title === "Inception") {
        if (["Shutter Island", "Memento", "The Prestige", "Tenet"].includes(movie.title)) {
          score += 0.35;
          explanations.push(`Features psychological labyrinthine layers and Nolan's signature non-linear puzzles`);
        }
      }
    }

    // ==========================================
    // B. Natural Language Intent Matching
    // ==========================================
    if (intent) {
      // 1. Director filter
      if (intent.targetDirector) {
        if (movieDirectorNames.includes(intent.targetDirector)) {
          score += 0.55;
          matchedTags.push(intent.targetDirector);
          explanations.push(`Directed by ${intent.targetDirector}`);
        } else {
          score -= 0.3; // penalize if user asked for a specific director
        }
      }

      // 2. Runtime constraint (e.g. under 2 hours)
      if (intent.maxRuntimeMinutes) {
        if (movie.runtime && movie.runtime <= intent.maxRuntimeMinutes) {
          score += 0.35;
          matchedTags.push(`${movie.runtime} mins (Under 2 hrs)`);
          explanations.push(`Fits your under-2-hour preference perfectly (${movie.runtime} min runtime)`);
        } else if (movie.runtime && movie.runtime > intent.maxRuntimeMinutes + 15) {
          score -= 0.45; // significantly downrank movies exceeding user's duration limit!
        }
      }

      // 3. Audience (e.g. Family / Wholesome)
      if (intent.audience === "family") {
        const isFamilyFriendly = movieGenreNames.includes("Family") || movieGenreNames.includes("Animation");
        if (isFamilyFriendly) {
          score += 0.45;
          matchedTags.push("Family Friendly");
          explanations.push("Wholesome, critically acclaimed entertainment suitable for all ages");
        } else if (movieGenreNames.includes("Horror") || movieGenreNames.includes("Crime")) {
          score -= 0.6; // do not suggest horror or crime for family night!
        }
      }

      // 4. Mind-Bending / Twist
      if (intent.isMindBending) {
        const mindBenders = ["Interstellar", "Inception", "Arrival", "Shutter Island", "The Prestige", "Memento", "Andhadhun", "Fight Club", "Parasite"];
        if (mindBenders.includes(movie.title)) {
          score += 0.4;
          matchedTags.push("Mind-Bending");
          explanations.push("Features celebrated mind-bending narrative twists and high-concept storytelling");
        }
      }

      // 5. Sad Ending / Emotional Impact
      if (intent.isSadEnding) {
        const sadEndingFilms = ["Se7en", "Shutter Island", "Whiplash", "La La Land", "Arrival", "Blade Runner 2049", "The Shawshank Redemption"];
        if (sadEndingFilms.includes(movie.title)) {
          score += 0.4;
          matchedTags.push("Emotional Climax");
          explanations.push("Delivers an unforgettable, lingering emotional punch with an unconventional ending");
        }
      }

      // 6. Target Genres
      for (const reqGenre of intent.targetGenres) {
        if (movieGenreNames.includes(reqGenre)) {
          score += 0.2;
          if (!matchedTags.includes(reqGenre)) matchedTags.push(reqGenre);
        }
      }
    }

    // ==========================================
    // C. User Taste Profile Signals
    // ==========================================
    if (userLikedGenres.length > 0) {
      const userOverlap = movieGenreNames.filter((g) => userLikedGenres.includes(g));
      if (userOverlap.length > 0) {
        score += userOverlap.length * 0.08;
      }
    }

    // ==========================================
    // D. Quality & Popularity Baseline
    // ==========================================
    // Rating score (8.0 -> +0.16, 9.0 -> +0.25)
    score += (movie.voteAverage / 10) * 0.25;

    // Small freshness / popularity factor
    score += Math.min(movie.popularity / 500, 0.15);

    // If watched before, slightly reduce priority if user wants discovery
    if (userWatchedMovieIds.includes(movie.id) && !intent?.sortBy) {
      score *= 0.85;
    }

    // Build Final Dynamic Explanation
    let finalExplanation = "";
    if (explanations.length > 0) {
      finalExplanation = explanations.join(". ") + ".";
    } else if (matchedTags.length > 0) {
      finalExplanation = `Recommended because of high alignment with ${matchedTags.slice(0, 3).join(", ")} and stellar IMDb rating of ${movie.voteAverage}/10.`;
    } else {
      finalExplanation = `Critically acclaimed masterpiece with an outstanding ${movie.voteAverage}/10 rating and compelling storytelling.`;
    }

    return {
      movie,
      rawScore: score,
      explanation: finalExplanation,
      matchedTags: Array.from(new Set(matchedTags)),
    };
  });

  // 5. Sort by Calculated Score & Format Output
  scoredItems.sort((a, b) => b.rawScore - a.rawScore);

  // Normalize scores to 0.70 - 0.99 for clean realistic UI presentation
  const maxScore = scoredItems[0]?.rawScore || 1;
  const minScore = Math.max(scoredItems[scoredItems.length - 1]?.rawScore || 0, 0.1);

  const results: RecommendationResult[] = scoredItems.slice(0, limit).map((item, index) => {
    // Normalization curve
    const normalized = Math.min(
      0.99,
      Math.max(0.72, 0.75 + (item.rawScore / maxScore) * 0.24 - index * 0.015)
    );
    const matchPercentage = Math.round(normalized * 100);

    return {
      movie: formatMovieWithRelations(item.movie),
      score: Number(normalized.toFixed(4)),
      matchPercentage,
      engine: intent ? "hybrid" : refMovie ? "content" : "collaborative",
      explanation: item.explanation,
      matchedTags: item.matchedTags,
    };
  });

  return results;
}

/**
 * Format raw Prisma movie object into clean UI Movie object
 */
export function formatMovieWithRelations(rawMovie: any): Movie {
  let streaming: string[] = [];
  try {
    streaming = typeof rawMovie.streamingPlatforms === "string"
      ? JSON.parse(rawMovie.streamingPlatforms)
      : rawMovie.streamingPlatforms || [];
  } catch (e) {
    streaming = [];
  }

  return {
    id: rawMovie.id,
    tmdbId: rawMovie.tmdbId,
    imdbId: rawMovie.imdbId,
    title: rawMovie.title,
    originalTitle: rawMovie.originalTitle,
    tagline: rawMovie.tagline,
    overview: rawMovie.overview,
    releaseDate: rawMovie.releaseDate,
    releaseYear: rawMovie.releaseYear || (rawMovie.releaseDate ? new Date(rawMovie.releaseDate).getFullYear() : 2024),
    runtime: rawMovie.runtime || 120,
    posterUrl: rawMovie.posterUrl
      ? rawMovie.posterUrl
          .replace(/\/t\/p\/(original|w1280|w780)\//, "/t/p/w500/")
          .replace("tumbbad_poster.jpg", "8qNkWaY6n3x4j4qFq8zY4Z3Y9W7.jpg")
      : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80",
    backdropUrl: rawMovie.backdropUrl
      ? rawMovie.backdropUrl
          .replace(/\/t\/p\/original\//, "/t/p/w780/")
          .replace("tumbbad_bg.jpg", "xJHokMbljvjADYdit5fK5VQsXEG.jpg")
      : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: rawMovie.trailerUrl,
    trailerKey: rawMovie.trailerKey,
    fullMovieKey: rawMovie.fullMovieKey || null,
    isFreeWatch: !!rawMovie.isFreeWatch,
    voteAverage: Number(rawMovie.voteAverage.toFixed(1)),
    voteCount: rawMovie.voteCount,
    popularity: rawMovie.popularity,
    language: rawMovie.language,
    originCountry: rawMovie.originCountry,
    budget: rawMovie.budget ? Number(rawMovie.budget) : 0,
    revenue: rawMovie.revenue ? Number(rawMovie.revenue) : 0,
    streamingPlatforms: streaming,
    genres: rawMovie.movieGenres?.map((mg: any) => mg.genre) || [],
    directors: rawMovie.movieDirectors?.map((md: any) => md.director) || [],
    cast: rawMovie.movieCast || [],
  };
}
