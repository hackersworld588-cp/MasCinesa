"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Sparkles, Heart, ArrowRight, ShieldCheck, Film } from "lucide-react";

export default function FounderSection() {
  const phoneNumber = "+919588879423";
  const displayPhone = "+91 9588879423";
  const whatsappUrl = "https://wa.me/919588879423?text=Hello%20Mohammad%20Aabid%20Husain,%20I%20visited%20CineSa%20and%20loved%20the%20platform!";

  return (
    <section className="relative py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-crimson/10 via-brand-purple/10 to-emerald-500/10 rounded-3xl blur-3xl -z-10 pointer-events-none" />

      <div className="relative rounded-3xl bg-surface/80 border border-white/10 p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Subtle decorative top badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-crimson/20 border border-brand-crimson/40 text-brand-crimson">
            <Sparkles className="w-3.5 h-3.5" />
            Meet The Creator
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Founder
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Founder Identity & Bio (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-4">
              {/* Founder Avatar with Glowing Border */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-brand-crimson via-brand-purple to-emerald-400 p-0.5 shadow-xl shadow-brand-crimson/20 flex-shrink-0">
                <div className="w-full h-full bg-surface-elevated rounded-[14px] flex items-center justify-center font-black text-2xl sm:text-3xl text-white tracking-wider">
                  AH
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-surface flex items-center justify-center text-[10px] text-white" title="Online & Available">
                  ✓
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  Mohammad Aabid Husain
                </h2>
                <p className="text-brand-crimson font-semibold text-sm sm:text-base mt-0.5 flex items-center gap-2">
                  <span>Founder & Chief Architect — CineSa</span>
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 mt-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Jaipur, Rajasthan, India</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">Pink City</span>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-2">
              <strong className="text-white font-semibold">Mohammad Aabid Husain</strong> ne CineSa ko ek mission ke saath develop kiya hai: Indian cinema lovers ko 
              <span className="text-emerald-400 font-semibold"> 100% Free & Ad-Free</span> premium streaming experience dena. Jahan South Indian blockbusters, 
              Hollywood Hindi dubbed hits, aur Bollywood classics bina kisi intrusive pop-up ya ad disturbance ke ek jagah mil sakein.
            </p>

            <p className="text-xs sm:text-sm text-gray-400 mt-3 flex items-center gap-1.5">
              <span>Platform built with</span>
              <Heart className="w-4 h-4 text-brand-crimson fill-brand-crimson inline" />
              <span>for cinema enthusiasts across India & worldwide.</span>
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Call Founder Directly */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 border border-white/15 text-white transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {displayPhone}</span>
              </a>

              {/* Read Full Story / About */}
              <Link
                href="/about"
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition"
              >
                <span>Full Founder Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Key Founder Pillars Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Film className="w-4 h-4 text-brand-crimson" />
              Founder&apos;s Guarantees to Users
            </h3>

            <div className="space-y-3 mt-1">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Strict Non-Overlapping Genres</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Hollywood movies sirf Hollywood mein, Comedy sirf Comedy mein — zero duplicate confusion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-brand-purple/20 text-purple-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Exact Second Playback Resume</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Jahan se movie pause ya close ki thi, agle visit par theek usi second se play hogi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-brand-crimson/20 text-brand-crimson flex items-center justify-center font-bold text-xs flex-shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Direct Founder Accessibility</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Koi suggestion ya new movie request ho to Mohammad Aabid Husain se direct connect karein.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Pill */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span>Direct Helpline:</span>
              <a href={`tel:${phoneNumber}`} className="text-emerald-400 font-bold hover:underline">
                {displayPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
