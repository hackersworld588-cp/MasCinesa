"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Film,
  Clock,
  Star,
  Bookmark,
  Award,
  Sparkles,
  Calendar,
  Users,
} from "lucide-react";
import TasteProfileChart from "@/components/TasteProfileChart";
import { Movie } from "@/types";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.user) setProfileData(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Loading your taste profile...</p>
      </div>
    );
  }

  const { user, stats, tasteProfile, recentlyWatched } = profileData || {};

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-10">
      {/* 1. Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-brand-purple/20 border-2 border-white/20 flex-shrink-0 shadow-lg">
          {user?.avatar ? (
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          ) : (
            <User className="w-10 h-10 text-gray-300 absolute inset-0 m-auto" />
          )}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{user?.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/40">
              {user?.role === "admin" ? "Platform Admin" : "Cinephile Elite"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            {user?.bio || "Film curator and lover of mind-bending thrillers and science fiction."}
          </p>
          <p className="text-xs text-gray-500 font-mono pt-1">
            Email: {user?.email}
          </p>
        </div>
      </div>

      {/* 2. Key Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Film className="w-4 h-4 text-brand-red" />
            <span>Movies Watched</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.totalWatched || 14}</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Watch Time</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.totalHours || 34} hrs</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Star className="w-4 h-4 text-brand-gold" />
            <span>Avg Rating Given</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.averageRating || 8.8} / 10</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Bookmark className="w-4 h-4 text-purple-400" />
            <span>In Watchlist</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats?.watchlistCount || 8}</p>
        </div>
      </div>

      {/* 3. Visual Taste Profile (Visual Bar Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-brand-purple" />
              <h3 className="text-xl font-bold text-white">Visual Movie Taste Profile</h3>
            </div>
            <span className="text-xs text-purple-300 font-semibold px-2 py-0.5 rounded-full bg-purple-900/30 border border-purple-700/30">
              Heuristic Engine
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Calculated from your watch history, user ratings, and recurring thematic preferences.
          </p>

          {tasteProfile?.tasteDistribution && (
            <TasteProfileChart distribution={tasteProfile.tasteDistribution} />
          )}
        </div>

        {/* Favorite Directors & Actors */}
        <div className="space-y-6">
          {/* Favorite Directors */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h4 className="font-bold text-sm text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-gold" />
              <span>Top Directors</span>
            </h4>
            <div className="space-y-3">
              {tasteProfile?.favoriteDirectors?.map((dir: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-white">{dir.name}</span>
                  <span className="text-gray-400 font-mono text-xs">{dir.count} films logged</span>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Actors */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h4 className="font-bold text-sm text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-red" />
              <span>Top Actors</span>
            </h4>
            <div className="space-y-3">
              {tasteProfile?.favoriteActors?.map((act: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-white">{act.name}</span>
                  <span className="text-gray-400 font-mono text-xs">{act.count} films logged</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recently Watched Movies Timeline */}
      {recentlyWatched && recentlyWatched.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>Recently Watched Timeline</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {recentlyWatched.map((mov: Movie) => (
              <Link
                key={mov.id}
                href={`/movie/${mov.id}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden glass-panel border border-white/5 hover:border-white/20 transition p-2"
              >
                <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden mb-2">
                  <Image src={mov.posterUrl} alt={mov.title} fill className="object-cover group-hover:scale-105 transition" />
                </div>
                <p className="font-bold text-xs text-white truncate">{mov.title}</p>
                <p className="text-[11px] text-gray-400">{mov.releaseYear}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
