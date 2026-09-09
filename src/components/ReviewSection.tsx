"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ThumbsUp, ThumbsDown, Flag, User, AlertTriangle, Send, Check } from "lucide-react";
import { Review } from "../types";

interface ReviewSectionProps {
  movieId: string;
  initialReviews: Review[];
  initialUserRating?: number | null;
  currentUserId?: string;
}

export default function ReviewSection({
  movieId,
  initialReviews,
  initialUserRating,
  currentUserId,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [sortBy, setSortBy] = useState<string>("helpful");
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [rating, setRating] = useState<number>(initialUserRating || 9);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reportedReviews, setReportedReviews] = useState<string[]>([]);
  const [revealedSpoilers, setRevealedSpoilers] = useState<string[]>([]);

  // Calculate Community Stats
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 8), 0) / reviews.length
        ).toFixed(1)
      : "8.7";

  const handleSort = async (newSort: string) => {
    setSortBy(newSort);
    try {
      const res = await fetch(`/api/reviews?movieId=${movieId}&sortBy=${newSort}`);
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch (e) {}
  };

  const handleVote = async (reviewId: string, voteType: "UP" | "DOWN") => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "vote", reviewId, voteType }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId
              ? {
                  ...r,
                  helpfulUpvotes:
                    voteType === "UP" ? r.helpfulUpvotes + 1 : Math.max(r.helpfulUpvotes - 1, 0),
                }
              : r
          )
        );
      }
    } catch (e) {}
  };

  const handleReport = async (reviewId: string) => {
    const reason = window.prompt("Why are you reporting this review? (e.g., spoilers, harassment, spam):");
    if (!reason) return;

    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "report", reviewId, reportReason: reason }),
      });
      setReportedReviews((prev) => [...prev, reviewId]);
    } catch (e) {}
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          movieId,
          rating,
          title,
          content,
          containsSpoilers,
        }),
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setShowForm(false);
        setContent("");
        setTitle("");
      }
    } catch (e) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header & Community Rating Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Community Reviews
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold border border-brand-gold/30">
              ★ {avgRating} Avg
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {reviews.length} authentic film enthusiast reviews
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              onClick={() => handleSort("helpful")}
              className={`px-2.5 py-1 rounded-lg transition ${
                sortBy === "helpful" ? "bg-white/15 text-white font-semibold" : "text-gray-400"
              }`}
            >
              Helpful
            </button>
            <button
              onClick={() => handleSort("latest")}
              className={`px-2.5 py-1 rounded-lg transition ${
                sortBy === "latest" ? "bg-white/15 text-white font-semibold" : "text-gray-400"
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => handleSort("rating_desc")}
              className={`px-2.5 py-1 rounded-lg transition ${
                sortBy === "rating_desc" ? "bg-white/15 text-white font-semibold" : "text-gray-400"
              }`}
            >
              Highest
            </button>
          </div>

          {/* Write Review Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-red hover:bg-red-700 text-white transition shadow-md glow-red"
          >
            {showForm ? "Cancel" : "Write Review"}
          </button>
        </div>
      </div>

      {/* Write Review Modal / Accordion */}
      {showForm && (
        <form
          onSubmit={handleSubmitReview}
          className="p-5 sm:p-6 rounded-2xl glass-panel border border-brand-red/30 space-y-4 animate-in fade-in zoom-in-95 duration-200"
        >
          <h4 className="font-bold text-base text-white">Share Your Film Verdict</h4>

          {/* Rating 1-10 selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Your Rating (1–10 Stars): <span className="text-brand-gold font-bold">{rating}/10</span>
            </label>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 10 }).map((_, i) => {
                const val = i + 1;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    className="p-1 hover:scale-125 transition"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        val <= rating ? "text-brand-gold fill-brand-gold" : "text-gray-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. A visual triumph with a haunting soundtrack"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-red"
            />
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Review
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What did you think of the cinematography, pacing, and direction?"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-red leading-relaxed"
            />
          </div>

          {/* Spoilers Checkbox */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
              <input
                type="checkbox"
                checked={containsSpoilers}
                onChange={(e) => setContainsSpoilers(e.target.checked)}
                className="w-4 h-4 rounded bg-surface-muted border-white/20 text-brand-red focus:ring-0"
              />
              <span>This review contains key spoilers</span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-semibold hover:bg-red-700 transition"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Publishing..." : "Post Review"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel text-center text-gray-400">
            <Star className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="font-semibold text-white">No reviews yet</p>
            <p className="text-xs mt-1">Be the first cinephile to share your thoughts!</p>
          </div>
        ) : (
          reviews.map((rev) => {
            const hasSpoiler = rev.containsSpoilers && !revealedSpoilers.includes(rev.id);
            const isReported = reportedReviews.includes(rev.id);

            return (
              <div
                key={rev.id}
                className="p-5 rounded-2xl glass-panel border border-white/5 space-y-3 transition"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/10 border border-white/15 flex-shrink-0">
                      {rev.user?.avatar ? (
                        <Image
                          src={rev.user.avatar}
                          alt={rev.user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-gray-400 absolute inset-0 m-auto" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">
                          {rev.user?.name || "Film Critic"}
                        </span>
                        {rev.user?.role === "admin" && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-yellow-500/20 text-yellow-300 font-bold uppercase">
                            Admin
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(rev.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  {rev.rating && (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 border border-brand-gold/30 text-brand-gold text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-brand-gold" />
                      <span>{rev.rating}/10</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                {rev.title && (
                  <h5 className="font-bold text-sm sm:text-base text-white">{rev.title}</h5>
                )}

                {/* Spoiler Mask or Content */}
                {hasSpoiler ? (
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-red-300">
                      <AlertTriangle className="w-4 h-4 text-brand-crimson" />
                      <span>Warning: This review contains spoilers.</span>
                    </div>
                    <button
                      onClick={() => setRevealedSpoilers((prev) => [...prev, rev.id])}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
                    >
                      Reveal
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {rev.content}
                  </p>
                )}

                {/* Footer: Helpfulness Upvote & Report */}
                <div className="flex items-center justify-between pt-2 text-xs text-gray-400 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleVote(rev.id, "UP")}
                      className="flex items-center gap-1.5 hover:text-white transition"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Helpful ({rev.helpfulUpvotes})</span>
                    </button>
                  </div>

                  {/* Report Button */}
                  <button
                    onClick={() => handleReport(rev.id)}
                    disabled={isReported}
                    className={`flex items-center gap-1 text-[11px] transition ${
                      isReported ? "text-amber-500" : "text-gray-500 hover:text-red-400"
                    }`}
                  >
                    <Flag className="w-3 h-3" />
                    <span>{isReported ? "Reported" : "Report"}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
