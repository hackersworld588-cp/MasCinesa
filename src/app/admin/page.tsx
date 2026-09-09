"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Film,
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  BarChart3,
  Search,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"reports" | "movies" | "analytics">("reports");

  // New Movie Form Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    tagline: "",
    overview: "",
    releaseYear: 2024,
    runtime: 120,
    posterUrl: "https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    voteAverage: 8.0,
    language: "en",
    trailerKey: "zSWdZVtXT7E",
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin");
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Access denied");
      } else {
        setData(json);
      }
    } catch (e) {
      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleModerateReview = async (reviewId: string, status: "approved" | "removed") => {
    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "moderate_review", reviewId, reviewStatus: status }),
      });
      fetchAdminData();
    } catch (e) {}
  };

  const handleResolveReport = async (reportId: string, status: "resolved" | "dismissed") => {
    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resolve_report", reportId, reportStatus: status }),
      });
      fetchAdminData();
    } catch (e) {}
  };

  const handleDeleteMovie = async (movieId: string) => {
    if (!confirm("Are you sure you want to delete this film from the database?")) return;
    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_movie", movieId }),
      });
      fetchAdminData();
    } catch (e) {}
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_movie", movieData: newMovie }),
      });
      setShowAddModal(false);
      fetchAdminData();
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Loading Admin Control Panel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-gray-100 flex flex-col items-center justify-center p-4">
        <div className="p-8 rounded-3xl glass-panel border border-brand-red/30 max-w-md text-center space-y-4">
          <Shield className="w-12 h-12 text-brand-crimson mx-auto" />
          <h2 className="text-xl font-bold text-white">Admin Privileges Required</h2>
          <p className="text-xs text-gray-400">
            You need to be signed in as an administrator to access moderation and database tools.
          </p>
          <button
            onClick={async () => {
              await fetch("/api/auth/switch-role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: "admin" }),
              });
              window.location.reload();
            }}
            className="w-full py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-red-700 transition shadow-md"
          >
            1-Click Switch to Admin Role
          </button>
        </div>
      </div>
    );
  }

  const { stats, reports, flaggedReviews, movies, genres } = data || {};

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Platform Admin & Moderation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time movie catalog controls, review moderation, reports, and AI analytics
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition shadow-md glow-red self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Movie</span>
        </button>
      </div>

      {/* Overview Metric Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Film className="w-4 h-4 text-brand-red" />
            <span>Catalog Size</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.totalMovies || 0} Films</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Registered Users</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.totalUsers || 0}</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <MessageSquare className="w-4 h-4 text-brand-purple" />
            <span>Reviews Logged</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.totalReviews || 0}</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span>Pending Reports</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.pendingReportsCount || 0}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeTab === "reports"
              ? "bg-white/15 text-white border border-white/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Reported Content ({reports?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("movies")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeTab === "movies"
              ? "bg-white/15 text-white border border-white/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Movie Catalog ({movies?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeTab === "analytics"
              ? "bg-white/15 text-white border border-white/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          AI Analytics & Genres
        </button>
      </div>

      {/* Tab 1: Moderation / Reported Content */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          {(!reports || reports.length === 0) && (!flaggedReviews || flaggedReviews.length === 0) ? (
            <div className="p-12 text-center rounded-2xl glass-panel text-gray-400">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="font-bold text-white">All Clear!</p>
              <p className="text-xs mt-1">No pending flagged reviews or user reports to moderate.</p>
            </div>
          ) : (
            reports.map((rep: any) => (
              <div
                key={rep.id}
                className="p-5 rounded-2xl glass-panel border border-red-500/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Report Reason: {rep.reason}
                  </span>
                  <span className="text-xs text-gray-400">
                    Reported by {rep.reporter?.name || "Anonymous User"}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-300">
                  <p className="font-semibold text-white mb-1">
                    Review on {rep.review?.movie?.title}:
                  </p>
                  <p className="italic leading-relaxed">&quot;{rep.review?.content}&quot;</p>
                  <p className="text-[11px] text-gray-500 mt-2">
                    Author: {rep.review?.user?.name}
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleResolveReport(rep.id, "dismissed")}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => handleModerateReview(rep.reviewId, "removed")}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition"
                  >
                    Remove Review
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Movie Catalog Management */}
      {activeTab === "movies" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies?.map((mov: any) => (
              <div
                key={mov.id}
                className="p-4 rounded-2xl glass-panel border border-white/5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative aspect-[2/3] w-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={mov.posterUrl} alt={mov.title} fill className="object-cover" />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-sm text-white truncate">{mov.title}</p>
                    <p className="text-xs text-gray-400">{mov.releaseYear} • ★ {mov.voteAverage.toFixed(1)}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteMovie(mov.id)}
                  className="p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition flex-shrink-0"
                  title="Delete movie"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Analytics & Genres */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h4 className="font-bold text-base text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-purple" />
              <span>Genre Index Breakdown</span>
            </h4>
            <div className="space-y-2.5">
              {genres?.map((g: any) => (
                <div key={g.id} className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-semibold">{g.name}</span>
                  <span className="font-mono text-gray-400">{g._count?.movieGenres || 0} movies</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h4 className="font-bold text-base text-white">Recommendation Stats</h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Total AI Queries Run</span>
                <span className="font-bold text-purple-400">1,420</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Top Queried Term</span>
                <span className="font-bold text-white">&quot;mind-bending sci-fi&quot;</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Top Director Matched</span>
                <span className="font-bold text-white">Christopher Nolan</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Average Recommendation Score</span>
                <span className="font-bold text-emerald-400">93.4%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Movie Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <form
            onSubmit={handleAddMovie}
            className="relative z-10 w-full max-w-lg p-6 rounded-3xl bg-surface border border-white/15 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-bold text-white">Add Film to CineSa Database</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={newMovie.title}
                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Overview / Synopsis</label>
              <textarea
                rows={3}
                value={newMovie.overview}
                onChange={(e) => setNewMovie({ ...newMovie, overview: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Release Year</label>
                <input
                  type="number"
                  value={newMovie.releaseYear}
                  onChange={(e) => setNewMovie({ ...newMovie, releaseYear: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-xs focus:outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Runtime (mins)</label>
                <input
                  type="number"
                  value={newMovie.runtime}
                  onChange={(e) => setNewMovie({ ...newMovie, runtime: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-xs focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Poster Image URL</label>
              <input
                type="text"
                value={newMovie.posterUrl}
                onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Backdrop Image URL</label>
              <input
                type="text"
                value={newMovie.backdropUrl}
                onChange={(e) => setNewMovie({ ...newMovie, backdropUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-white/10 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-red-700 transition"
              >
                Save Movie
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
