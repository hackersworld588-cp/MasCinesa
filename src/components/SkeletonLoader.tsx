import React from "react";

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col w-full rounded-2xl overflow-hidden glass-panel border border-white/5 animate-pulse">
      <div className="aspect-[2/3] w-full bg-white/5" />
      <div className="p-3.5 space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-3.5 w-16 bg-white/10 rounded" />
          <div className="h-3.5 w-8 bg-white/10 rounded" />
        </div>
        <div className="h-4.5 w-3/4 bg-white/15 rounded" />
        <div className="h-3 w-1/2 bg-white/5 rounded" />
      </div>
    </div>
  );
}

export function MovieRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="py-6 px-4 sm:px-8 md:px-12 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="h-7 w-48 bg-white/10 rounded-lg animate-pulse" />
      </div>
      <div className="flex gap-4 sm:gap-6 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[170px] sm:w-[220px] md:w-[240px]">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[80vh] bg-surface-muted animate-pulse flex items-end pb-16 px-6 sm:px-12">
      <div className="max-w-2xl space-y-4 w-full">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-white/10 rounded-lg" />
          <div className="h-6 w-16 bg-white/10 rounded-lg" />
        </div>
        <div className="h-12 w-3/4 bg-white/15 rounded-xl" />
        <div className="h-16 w-full bg-white/10 rounded-lg" />
        <div className="flex gap-4 pt-2">
          <div className="h-12 w-36 bg-white/20 rounded-xl" />
          <div className="h-12 w-36 bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
