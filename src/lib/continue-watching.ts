/**
 * Client-Side Continue Watching & Playback Resume Manager
 * Persists watch state in localStorage for instant 0ms offline retrieval and resume.
 */

export interface PlaybackProgressItem {
  movieId: string;
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  fullMovieKey?: string;
  currentTime: number; // in seconds
  duration: number; // in seconds
  progressPercent: number; // 0 to 100
  lastWatched: number; // epoch ms
}

const STORAGE_KEY = "cinesa_continue_watching";
const MAX_ITEMS = 12;

export function getContinueWatchingList(): PlaybackProgressItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: PlaybackProgressItem[] = JSON.parse(raw);
    return Array.isArray(list) ? list.sort((a, b) => b.lastWatched - a.lastWatched) : [];
  } catch (e) {
    console.error("Error reading continue watching list:", e);
    return [];
  }
}

export function savePlaybackProgress(item: {
  movieId: string;
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  fullMovieKey?: string;
  currentTime: number;
  duration?: number;
}) {
  if (typeof window === "undefined" || !item.movieId) return;

  try {
    const duration = item.duration && item.duration > 0 ? item.duration : 7200; // default 2h if unknown
    const currentTime = Math.max(0, Math.floor(item.currentTime));

    // If user watched more than 96%, consider completed and remove from continue watching
    const progressPercent = Math.min(100, Math.round((currentTime / duration) * 100));
    if (progressPercent > 96 || currentTime < 10) {
      // If watched less than 10 seconds, don't clutter continue watching
      if (progressPercent > 96) {
        removePlaybackProgress(item.movieId);
      }
      return;
    }

    const currentList = getContinueWatchingList();
    const filtered = currentList.filter((x) => x.movieId !== item.movieId);

    const newItem: PlaybackProgressItem = {
      movieId: item.movieId,
      title: item.title,
      posterUrl: item.posterUrl,
      backdropUrl: item.backdropUrl,
      fullMovieKey: item.fullMovieKey,
      currentTime,
      duration,
      progressPercent,
      lastWatched: Date.now(),
    };

    const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch custom event for real-time sync across components
    window.dispatchEvent(new Event("cinesa-continue-watching-updated"));
  } catch (e) {
    console.error("Error saving continue watching progress:", e);
  }
}

export function removePlaybackProgress(movieId: string) {
  if (typeof window === "undefined") return;
  try {
    const currentList = getContinueWatchingList();
    const updated = currentList.filter((x) => x.movieId !== movieId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("cinesa-continue-watching-updated"));
  } catch (e) {
    console.error("Error removing playback progress:", e);
  }
}

export function getSavedStartTime(movieId: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const list = getContinueWatchingList();
    const item = list.find((x) => x.movieId === movieId);
    return item && item.currentTime > 10 ? item.currentTime : 0;
  } catch (e) {
    return 0;
  }
}

export function formatTimeDisplay(seconds: number): string {
  const s = Math.floor(seconds);
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
