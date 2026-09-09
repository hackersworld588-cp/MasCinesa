"use client";

import React from "react";

interface TasteDistribution {
  [genre: string]: number;
}

interface TasteProfileChartProps {
  distribution: TasteDistribution;
}

const GENRE_COLORS: { [key: string]: { bar: string; text: string; bg: string } } = {
  "Science Fiction": {
    bar: "from-cyan-500 to-blue-600",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  Thriller: {
    bar: "from-brand-red to-purple-700",
    text: "text-red-400",
    bg: "bg-red-500/10",
  },
  Mystery: {
    bar: "from-purple-500 to-indigo-600",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  Drama: {
    bar: "from-amber-500 to-yellow-600",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  Action: {
    bar: "from-orange-500 to-red-600",
    text: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  Comedy: {
    bar: "from-emerald-500 to-teal-600",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  Romance: {
    bar: "from-pink-500 to-rose-600",
    text: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  Animation: {
    bar: "from-violet-500 to-fuchsia-600",
    text: "text-violet-400",
    bg: "bg-violet-500/10",
  },
};

export default function TasteProfileChart({ distribution }: TasteProfileChartProps) {
  const sorted = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-4 w-full">
      {sorted.map(([genre, percentage]) => {
        const theme = GENRE_COLORS[genre] || {
          bar: "from-brand-purple to-brand-crimson",
          text: "text-gray-300",
          bg: "bg-white/5",
        };

        return (
          <div key={genre} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className={`flex items-center gap-2 ${theme.text}`}>
                <span className={`w-2 h-2 rounded-full ${theme.bg} border border-current`} />
                {genre}
              </span>
              <span className="font-mono text-gray-300">{percentage}%</span>
            </div>

            {/* Visual Bar with Gradient Fill */}
            <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden border border-white/5 relative">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${theme.bar} transition-all duration-1000 ease-out shadow-sm`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
