export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Actor {
  id: string;
  tmdbId?: number | null;
  name: string;
  profileUrl?: string | null;
  characterDefault?: string | null;
  popularity?: number;
}

export interface Director {
  id: string;
  tmdbId?: number | null;
  name: string;
  profileUrl?: string | null;
  popularity?: number;
}

export interface CastMember {
  id: string;
  movieId: string;
  actorId: string;
  characterName: string;
  orderIndex: number;
  actor: Actor;
}

export interface Movie {
  id: string;
  tmdbId?: number | null;
  imdbId?: string | null;
  title: string;
  originalTitle?: string | null;
  tagline?: string | null;
  overview: string;
  releaseDate?: string | null;
  releaseYear: number;
  runtime: number; // minutes
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string | null;
  trailerKey?: string | null;
  fullMovieKey?: string | null;
  isFreeWatch?: boolean;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  language: string;
  originCountry: string;
  budget?: number | bigint;
  revenue?: number | bigint;
  streamingPlatforms: string[]; // ["Netflix", "Prime Video", "Apple TV", "Disney+"]
  genres?: Genre[];
  directors?: Director[];
  cast?: CastMember[];
  userRating?: number | null;
  isWatchlist?: boolean;
  isWatched?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  movieId: string;
  rating?: number | null;
  title?: string | null;
  content: string;
  containsSpoilers: boolean;
  helpfulUpvotes: number;
  helpfulDownvotes: number;
  userVote?: "UP" | "DOWN" | null;
  status: "pending" | "approved" | "flagged" | "removed";
  createdAt: string;
  user?: {
    id: string;
    name: string;
    avatar?: string | null;
    role?: string;
  };
}

export interface WatchlistMovie {
  id: string;
  watchlistId: string;
  movieId: string;
  addedAt: string;
  personalNotes?: string | null;
  userRating?: number | null;
  isWatched: boolean;
  movie: Movie;
}

export interface Watchlist {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  isPrivate: boolean;
  isDefault: boolean;
  createdAt: string;
  movies: WatchlistMovie[];
}

export interface TasteProfile {
  totalWatched: number;
  totalMinutes: number;
  averageRating: number;
  topGenres: { genre: string; percentage: number; count: number }[];
  favoriteActors: { name: string; count: number; avatar?: string }[];
  favoriteDirectors: { name: string; count: number; avatar?: string }[];
  tasteDistribution: { [genre: string]: number }; // percentage 0-100
}

export interface RecommendationResult {
  movie: Movie;
  score: number; // 0.0 - 1.0 (e.g. 0.96)
  matchPercentage: number; // 96%
  engine: "content" | "collaborative" | "ai_semantic" | "hybrid";
  explanation: string;
  matchedTags: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  recommendations?: Movie[];
  explanation?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  avatar?: string;
}

export interface SearchFilterState {
  query: string;
  genre: string;
  director: string;
  actor: string;
  yearMin: number;
  yearMax: number;
  ratingMin: number;
  language: string;
  runtimeMax: number;
  streamingPlatform: string;
  sortBy: "popularity" | "vote_average" | "release_date" | "vote_count";
  sortOrder: "asc" | "desc";
}
