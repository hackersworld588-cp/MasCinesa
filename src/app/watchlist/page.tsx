"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Plus,
  CheckCircle2,
  Trash2,
  Edit3,
  Star,
  Film,
  Clock,
  Calendar,
  Save,
} from "lucide-react";
import { Watchlist, WatchlistMovie } from "@/types";

export default function WatchlistPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [activeListId, setActiveListId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // New List Modal
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Edit Note State
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState("");

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const fetchWatchlists = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      if (data.watchlists && data.watchlists.length > 0) {
        setWatchlists(data.watchlists);
        setActiveListId(data.watchlists[0].id);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const activeList = watchlists.find((w) => w.id === activeListId);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_list",
          title: newTitle,
          description: newDescription,
        }),
      });
      const data = await res.json();
      if (data.success && data.watchlist) {
        setWatchlists([...watchlists, { ...data.watchlist, movies: [] }]);
        setActiveListId(data.watchlist.id);
        setShowNewListModal(false);
        setNewTitle("");
        setNewDescription("");
      }
    } catch (e) {}
  };

  const handleToggleWatched = async (item: WatchlistMovie) => {
    const nextWatched = !item.isWatched;
    setWatchlists((prev) =>
      prev.map((wl) =>
        wl.id === activeListId
          ? {
              ...wl,
              movies: wl.movies.map((m) =>
                m.id === item.id ? { ...m, isWatched: nextWatched } : m
              ),
            }
          : wl
      )
    );

    try {
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          watchlistId: activeListId,
          movieId: item.movieId,
          isWatched: nextWatched,
        }),
      });
    } catch (e) {}
  };

  const handleSaveNote = async (item: WatchlistMovie) => {
    setWatchlists((prev) =>
      prev.map((wl) =>
        wl.id === activeListId
          ? {
              ...wl,
              movies: wl.movies.map((m) =>
                m.id === item.id ? { ...m, personalNotes: tempNote } : m
              ),
            }
          : wl
      )
    );
    setEditingNoteId(null);

    try {
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          watchlistId: activeListId,
          movieId: item.movieId,
          notes: tempNote,
        }),
      });
    } catch (e) {}
  };

  const handleRemoveMovie = async (item: WatchlistMovie) => {
    setWatchlists((prev) =>
      prev.map((wl) =>
        wl.id === activeListId
          ? {
              ...wl,
              movies: wl.movies.filter((m) => m.id !== item.id),
            }
          : wl
      )
    );

    try {
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove",
          watchlistId: activeListId,
          movieId: item.movieId,
        }),
      });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-7 h-7 text-brand-red" />
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              My Watchlists & Custom Lists
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Organize queues, add personal thoughts, and track watched cinematic gems
          </p>
        </div>

        <button
          onClick={() => setShowNewListModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition glow-red shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Custom List</span>
        </button>
      </div>

      {/* List Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-white/10">
        {watchlists.map((wl) => (
          <button
            key={wl.id}
            onClick={() => setActiveListId(wl.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap flex items-center gap-2 ${
              activeListId === wl.id
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{wl.title}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] text-gray-300">
              {wl.movies.length}
            </span>
          </button>
        ))}
      </div>

      {/* Active Watchlist Contents */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading your queues...</div>
      ) : !activeList || activeList.movies.length === 0 ? (
        <div className="p-16 text-center rounded-2xl glass-panel max-w-md mx-auto">
          <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-white">List is Empty</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Browse trending or AI picks and bookmark them to populate this list.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-brand-red text-white font-semibold text-xs transition"
          >
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activeList.movies.map((item) => {
            const isEditing = editingNoteId === item.id;

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl glass-panel border transition-all duration-200 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between ${
                  item.isWatched
                    ? "border-emerald-500/30 bg-emerald-950/10"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                {/* Movie Preview */}
                <div className="flex items-start gap-4 flex-1">
                  <Link
                    href={`/movie/${item.movie.id}`}
                    className="relative aspect-[2/3] w-20 sm:w-24 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-md group"
                  >
                    <Image
                      src={item.movie.posterUrl}
                      alt={item.movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/movie/${item.movie.id}`}
                        className="font-bold text-base sm:text-lg text-white hover:text-brand-crimson transition truncate"
                      >
                        {item.movie.title}
                      </Link>
                      {item.isWatched && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Watched
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1 text-brand-gold font-semibold">
                        <Star className="w-3.5 h-3.5 fill-brand-gold" />
                        {item.movie.voteAverage.toFixed(1)}
                      </span>
                      <span>{item.movie.releaseYear}</span>
                      <span>{item.movie.runtime} min</span>
                      <span className="text-gray-500">
                        Added {new Date(item.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>

                    {/* Personal Note */}
                    <div className="mt-3">
                      {isEditing ? (
                        <div className="flex items-center gap-2 max-w-md">
                          <input
                            type="text"
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}
                            placeholder="Add private note (e.g. Watch in IMAX with family)"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-surface-muted border border-white/20 text-white text-xs focus:outline-none focus:border-brand-red"
                          />
                          <button
                            onClick={() => handleSaveNote(item)}
                            className="p-2 rounded-lg bg-brand-red text-white text-xs hover:bg-red-700 transition"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs">
                          {item.personalNotes ? (
                            <p className="text-gray-300 italic bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                              &quot;{item.personalNotes}&quot;
                            </p>
                          ) : (
                            <span className="text-gray-500 text-[11px]">No notes added</span>
                          )}
                          <button
                            onClick={() => {
                              setEditingNoteId(item.id);
                              setTempNote(item.personalNotes || "");
                            }}
                            className="text-gray-400 hover:text-white p-1"
                            title="Edit Note"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions: Mark Watched & Delete */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <button
                    onClick={() => handleToggleWatched(item)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                      item.isWatched
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.isWatched ? "Watched" : "Mark as Watched"}</span>
                  </button>

                  <button
                    onClick={() => handleRemoveMovie(item)}
                    className="p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Remove from watchlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Custom List Modal */}
      {showNewListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowNewListModal(false)}
          />
          <form
            onSubmit={handleCreateList}
            className="relative z-10 w-full max-w-md p-6 rounded-2xl bg-surface border border-white/15 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <h3 className="text-lg font-bold text-white">Create Custom List</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                List Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Weekend Mind-Benders, Watch with Friends"
                required
                className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="What is the theme or plan for this collection?"
                className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewListModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-red-700 transition shadow-md"
              >
                Create List
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
