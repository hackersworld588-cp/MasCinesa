import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  Film,
  Sparkles,
  Heart,
  CheckCircle2,
  Clock,
  Layers,
  Zap,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Founder — Mohammad Aabid Husain | CineSa",
  description:
    "Meet Mohammad Aabid Husain, Founder and Chief Architect of CineSa from Jaipur, Rajasthan. Learn about our mission for 100% ad-free Indian cinema streaming.",
};

export default function AboutPage() {
  const displayPhone = "+91 9588879423";
  const rawPhone = "+919588879423";
  const whatsappUrl = "https://wa.me/919588879423?text=Hello%20Mohammad%20Aabid%20Husain,%20I%20am%20reaching%20out%20from%20CineSa!";

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cinema Home</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-crimson/20 border border-brand-crimson/40 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Vision & Creator
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Meet The Mind Behind <span className="text-brand-crimson">CineSa</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
          Building India&apos;s most refined, ad-free cinema discovery & streaming ecosystem from the heart of the Pink City.
        </p>
      </div>

      {/* Founder Spotlight Card */}
      <div className="relative rounded-3xl bg-surface/90 border border-white/10 p-6 sm:p-10 md:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar / Monogram Badge */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-brand-crimson via-brand-purple to-emerald-500 p-1 shadow-2xl flex-shrink-0">
            <div className="w-full h-full bg-surface-elevated rounded-[22px] flex flex-col items-center justify-center text-white">
              <span className="font-black text-4xl sm:text-5xl tracking-wider">AH</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 mt-1">
                Founder
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-lg flex items-center gap-1 border-2 border-surface">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Mohammad Aabid Husain
                </h2>
                <p className="text-brand-crimson font-bold text-sm sm:text-base mt-0.5">
                  Founder, Chief Architect & Cinema Curator
                </p>
              </div>

              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
              Main <strong className="text-white">Mohammad Aabid Husain</strong> hu, Jaipur (Rajasthan) se. 
              Maine CineSa ko isliye create kiya taaki har movie lover bina kisi subscription fees ya pop-up ad ke 
              apni manpasand South Indian action blockbusters, Hollywood Hindi dubbed movies, aur Bollywood comedy hits 
              ko Ultra HD quality mein bina kisi rukawat ke dekh sake.
            </p>

            {/* Direct Contacts */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 transition hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {displayPhone}</span>
              </a>

              <a
                href={`tel:${rawPhone}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 border border-white/15 text-white transition hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Direct Call: {displayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="mb-16">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          The 4 CineSa Guarantees by Mohammad Aabid Husain
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-surface/60 border border-white/10 hover:border-brand-crimson/40 transition">
            <div className="w-12 h-12 rounded-xl bg-brand-crimson/20 text-brand-crimson flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">1. Strict Non-Overlapping Categories</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hollywood movies kabhi bhi South Indian ya Bollywood section mein nahi aayengi. Har movie apne strict 
              verified genre mein rehti hai taaki catalog hamesha clean aur non-duplicate rahe.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-surface/60 border border-white/10 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">2. Exact Second &quot;Continue Watching&quot;</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Movie dekhte waqt agar aap page band kar dein ya kisi kaam se chale jayein, to CineSa aapki exact position 
              save rakhta hai. Agle time Resume dabate hi theek usi second se cinema start hota hai!
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-surface/60 border border-white/10 hover:border-brand-purple/40 transition">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/20 text-purple-300 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">3. 100% Ad-Free Cinema Experience</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Zero annoying pop-up redirects, zero shady banner ads, zero spam. Pure direct streaming playback powered by 
              official verified cinema publishers.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-surface/60 border border-white/10 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">4. Direct Founder Feedback Access</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Agar aapko koi nayi movie CineSa par add karwani hai ya koi issue face hota hai, aap seedhe Mohammad Aabid Husain 
              ke contact number (+91 9588879423) par WhatsApp ya call kar sakte hain.
            </p>
          </div>
        </div>
      </div>

      {/* Location & Headquarters Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surface via-surface-elevated to-surface border border-white/10 text-center flex flex-col items-center">
        <MapPin className="w-8 h-8 text-emerald-400 mb-3" />
        <h4 className="text-lg sm:text-xl font-bold text-white">
          Headquartered in Jaipur, Rajasthan
        </h4>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-lg">
          Designed, engineered and maintained with pride in the Pink City of India.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-brand-crimson hover:bg-red-600 text-white font-bold text-xs sm:text-sm transition"
          >
            Start Watching Movies
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
