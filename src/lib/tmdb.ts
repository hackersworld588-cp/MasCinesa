import { Movie } from "../types";
import { db } from "./db";
import { formatMovieWithRelations } from "./ai-engine";
import { getAllMovies, getMovieById } from "./movie-service";

const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface TMDBService {
  getTrending(): Promise<Movie[]>;
  getPopular(): Promise<Movie[]>;
  getTopRated(): Promise<Movie[]>;
  getUpcoming(): Promise<Movie[]>;
  getMovieDetails(id: string): Promise<Movie | null>;
  searchMovies(query: string): Promise<Movie[]>;
}

class TMDBServiceImpl implements TMDBService {
  private apiKey: string;
  private cache: Map<string, { data: any; expiry: number }> = new Map();

  constructor() {
    this.apiKey = process.env.TMDB_API_KEY || "";
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any, ttlSeconds: number = 300) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  /**
   * Fallback to local high-quality database if TMDB key is not provided or fails
   */
  private async getLocalFallback(category: "trending" | "popular" | "top_rated" | "upcoming"): Promise<Movie[]> {
    let movies = await getAllMovies();
    if (category === "top_rated") {
      movies = [...movies].sort((a, b) => b.voteAverage - a.voteAverage);
    } else if (category === "upcoming") {
      movies = [...movies].sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
    } else {
      movies = [...movies].sort((a, b) => b.popularity - a.popularity);
    }
    return movies.slice(0, 12);
  }

  async getTrending(): Promise<Movie[]> {
    const cached = this.getFromCache("trending");
    if (cached) return cached;

    if (!this.apiKey) {
      const fallback = await this.getLocalFallback("trending");
      this.setCache("trending", fallback, 600);
      return fallback;
    }

    try {
      const res = await fetch(`${TMDB_API_BASE}/trending/movie/week?api_key=${this.apiKey}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("TMDB failed");
      const json = await res.json();
      const results = (json.results || []).slice(0, 12).map(this.mapTMDBMovie);
      this.setCache("trending", results, 600);
      return results;
    } catch (e) {
      return this.getLocalFallback("trending");
    }
  }

  async getPopular(): Promise<Movie[]> {
    const cached = this.getFromCache("popular");
    if (cached) return cached;

    if (!this.apiKey) {
      const fallback = await this.getLocalFallback("popular");
      this.setCache("popular", fallback, 600);
      return fallback;
    }

    try {
      const res = await fetch(`${TMDB_API_BASE}/movie/popular?api_key=${this.apiKey}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("TMDB failed");
      const json = await res.json();
      const results = (json.results || []).slice(0, 12).map(this.mapTMDBMovie);
      this.setCache("popular", results, 600);
      return results;
    } catch (e) {
      return this.getLocalFallback("popular");
    }
  }

  async getTopRated(): Promise<Movie[]> {
    const cached = this.getFromCache("top_rated");
    if (cached) return cached;

    if (!this.apiKey) {
      const fallback = await this.getLocalFallback("top_rated");
      this.setCache("top_rated", fallback, 600);
      return fallback;
    }

    try {
      const res = await fetch(`${TMDB_API_BASE}/movie/top_rated?api_key=${this.apiKey}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("TMDB failed");
      const json = await res.json();
      const results = (json.results || []).slice(0, 12).map(this.mapTMDBMovie);
      this.setCache("top_rated", results, 600);
      return results;
    } catch (e) {
      return this.getLocalFallback("top_rated");
    }
  }

  async getUpcoming(): Promise<Movie[]> {
    const cached = this.getFromCache("upcoming");
    if (cached) return cached;

    if (!this.apiKey) {
      const fallback = await this.getLocalFallback("upcoming");
      this.setCache("upcoming", fallback, 600);
      return fallback;
    }

    try {
      const res = await fetch(`${TMDB_API_BASE}/movie/upcoming?api_key=${this.apiKey}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("TMDB failed");
      const json = await res.json();
      const results = (json.results || []).slice(0, 12).map(this.mapTMDBMovie);
      this.setCache("upcoming", results, 600);
      return results;
    } catch (e) {
      return this.getLocalFallback("upcoming");
    }
  }

  async getMovieDetails(id: string): Promise<Movie | null> {
    const cached = this.getFromCache(`movie_${id}`);
    if (cached) return cached;

    const movie = await getMovieById(id);
    if (movie) {
      this.setCache(`movie_${id}`, movie, 600);
      return movie;
    }

    return null;
  }

  async searchMovies(query: string): Promise<Movie[]> {
    if (!query) return [];

    const all = await getAllMovies();
    const q = query.toLowerCase();
    return all.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.originalTitle && m.originalTitle.toLowerCase().includes(q)) ||
        (m.overview && m.overview.toLowerCase().includes(q))
    ).slice(0, 15);
  }

  private mapTMDBMovie(item: any): Movie {
    return {
      id: String(item.id),
      tmdbId: item.id,
      title: item.title || item.original_title,
      originalTitle: item.original_title,
      overview: item.overview || "",
      releaseDate: item.release_date,
      releaseYear: item.release_date ? new Date(item.release_date).getFullYear() : 2024,
      runtime: 120,
      posterUrl: item.poster_path
        ? `${TMDB_IMAGE_BASE}/w780${item.poster_path}`
        : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
      backdropUrl: item.backdrop_path
        ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}`
        : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
      voteAverage: Number((item.vote_average || 7.5).toFixed(1)),
      voteCount: item.vote_count || 100,
      popularity: item.popularity || 50,
      language: item.original_language || "en",
      originCountry: "US",
      streamingPlatforms: ["Netflix", "Prime Video", "Apple TV"],
      genres: [],
    };
  }
}

export const tmdb = new TMDBServiceImpl();
