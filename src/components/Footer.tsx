"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Film, Heart, MapPin, Phone, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  const displayPhone = "+91 9588879423";
  const rawPhone = "+919588879423";
  const whatsappUrl = "https://wa.me/919588879423?text=Hello%20Mohammad%20Aabid%20Husain,%20I%20visited%20CineSa!";

  return (
    <footer className="w-full bg-surface-muted/60 border-t border-white/10 mt-16 pt-12 pb-24 md:pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/10">
          {/* Col 1: Brand & Founder Highlight (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center shadow-lg shadow-brand-red/30 group-hover:scale-105 transition">
                <Film className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                Cine<span className="text-brand-crimson">Sa</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-purple/30 text-purple-300 border border-brand-purple/40">
                  AI
                </span>
              </span>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              India&apos;s ultimate ad-free cinema experience. Discover South Indian Hindi dubbed blockbusters,
              official Hollywood releases, and Bollywood classics powered by AI recommendations.
            </p>

            {/* Founder Credit Card */}
            <div className="mt-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-crimson to-emerald-500 p-0.5 flex-shrink-0">
                <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-surface">
                  <Image
                    src="/founder.jpg"
                    alt="Mohammad Aabid Husain"
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate">Mohammad Aabid Husain</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Founder
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-400 inline" />
                  Jaipur, Rajasthan, India
                </p>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore CineSa
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home Cinema
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition">
                  Browse All 125+ Movies
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="hover:text-white transition">
                  Your Watchlist
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-white transition flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                  <span>Ask CineMate AI</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition font-medium text-emerald-400">
                  About Founder & Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Founder Contact (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Connect With Founder
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Direct line to founder Mohammad Aabid Husain for suggestions, cinema additions, or partnerships:
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {displayPhone}</span>
              </a>

              <a
                href={`tel:${rawPhone}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-semibold transition"
              >
                <Phone className="w-4 h-4 text-gray-300" />
                <span>Direct Call: {displayPhone}</span>
              </a>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registered in Jaipur, Rajasthan (302001)</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brand-crimson fill-brand-crimson" />
            <span>by <strong className="text-gray-200">Mohammad Aabid Husain</strong> in Jaipur. © {new Date().getFullYear()} CineSa.</span>
          </p>

          <p className="text-[11px] text-gray-400 text-center sm:text-right max-w-md">
            CineSa is an ad-free educational cinema discovery platform. All media streams are embedded via official YouTube feeds.
          </p>
        </div>
      </div>
    </footer>
  );
}
