"use client";

import React, { useState, useEffect } from "react";
import { Film, Sparkles, CheckCircle2, ArrowRight, X, Phone, User } from "lucide-react";

export default function UserOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user already logged in or dismissed
    try {
      const savedUser = localStorage.getItem("cinesa_user_profile");
      const dismissed = localStorage.getItem("cinesa_onboarding_dismissed");
      const isDismissedRecently = dismissed && Date.now() - parseInt(dismissed, 10) < 24 * 60 * 60 * 1000;

      if (!savedUser && !isDismissedRecently) {
        // Show after 1.5 seconds of browsing so it feels natural
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !phone.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          quickOnboarding: true,
        }),
      });

      const data = await res.json();
      if (data.user) {
        localStorage.setItem("cinesa_user_profile", JSON.stringify(data.user));
        // Trigger storage event so Navbar updates immediately
        window.dispatchEvent(new Event("cinesa:user_login"));
      }

      setIsOpen(false);
    } catch (e) {
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      localStorage.setItem("cinesa_onboarding_dismissed", Date.now().toString());
    } catch (e) {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleDismiss}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-surface border border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center mx-auto shadow-lg shadow-brand-red/30">
            <Film className="w-6 h-6 text-white stroke-[2.5]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Welcome to <span className="text-brand-crimson">CineSa</span>! 🍿
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mx-auto">
            Personalize your 100% ad-free cinema experience, save your watchlist, and resume movies at the exact second.
          </p>
        </div>

        {/* Quick Details Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Your Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              WhatsApp / Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Used for movie request updates from founder Mohammad Aabid Husain.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-600 hover:to-red-700 text-white font-bold text-sm shadow-xl shadow-brand-red/30 transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Saving details...</span>
            ) : (
              <>
                <span>Start Watching Free</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Guest Skip Option */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleDismiss}
            className="text-xs text-gray-400 hover:text-white transition underline"
          >
            Skip and browse as Guest
          </button>
        </div>

        {/* Perks */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-around text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Zero Pop-ups
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Resume Anytime
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            100% Free
          </span>
        </div>
      </div>
    </div>
  );
}
