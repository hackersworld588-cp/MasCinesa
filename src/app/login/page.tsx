"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Film, Lock, Mail, User, Phone, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "founder">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [founderPassword, setFounderPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const isFounderMode = authMode === "founder";
      const payload = isFounderMode
        ? {
            email: "founder@cinesa.tv",
            phone: "+91 9588879423",
            password: founderPassword,
          }
        : {
            email,
            password,
            name,
            phone,
            isSignUp: authMode === "signup",
          };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed. Please check credentials.");
      } else {
        // Save user profile locally for instant recognition
        try {
          localStorage.setItem("cinesa_user_profile", JSON.stringify(data.user));
        } catch (e) {}

        if (data.user?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center p-4 pt-24 pb-16">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo & Heading */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center shadow-lg shadow-brand-red/30 group-hover:scale-105 transition">
              <Film className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              Cine<span className="text-brand-crimson">Sa</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-purple/30 text-purple-300 border border-brand-purple/40">
                AI
              </span>
            </span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {authMode === "founder"
              ? "Founder Admin Login"
              : authMode === "signup"
              ? "Create CineSa Account"
              : "Sign In to CineSa"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            {authMode === "founder"
              ? "Secure portal for Founder Mohammad Aabid Husain (Password Required)"
              : authMode === "signup"
              ? "Join for personal continue watching, watchlist & ad-free streaming"
              : "Sign in to resume watching right where you left off"}
          </p>
        </div>

        {/* 3 Tabs: Sign In | Sign Up | Founder Portal */}
        <div className="grid grid-cols-3 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMode("signin");
              setError("");
            }}
            className={`py-2 rounded-xl transition ${
              authMode === "signin"
                ? "bg-brand-crimson text-white shadow-md font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setError("");
            }}
            className={`py-2 rounded-xl transition ${
              authMode === "signup"
                ? "bg-brand-crimson text-white shadow-md font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("founder");
              setError("");
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              authMode === "founder"
                ? "bg-amber-500 text-black shadow-md font-black"
                : "text-amber-400 hover:text-amber-300"
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Founder</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FOUNDER MODE */}
            {authMode === "founder" ? (
              <>
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-amber-400 flex-shrink-0">
                    <Image
                      src="/founder.jpg"
                      alt="Mohammad Aabid Husain"
                      fill
                      sizes="40px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-300">Mohammad Aabid Husain</p>
                    <p className="text-[11px] text-gray-400">Founder & Chief Architect</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Founder Secret Password / PIN
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={founderPassword}
                      onChange={(e) => setFounderPassword(e.target.value)}
                      placeholder="Enter your secret founder password"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Protected by password authentication. Unauthorized access is blocked.
                  </p>
                </div>
              </>
            ) : (
              /* REGULAR USER SIGN IN / SIGN UP */
              <>
                {authMode === "signup" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Mobile Phone Number <span className="text-emerald-400 text-[11px]">(WhatsApp)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required={!email}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required={!phone}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm shadow-xl transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 ${
                authMode === "founder"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-amber-950/40"
                  : "bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-600 hover:to-red-700 text-white shadow-brand-red/30"
              }`}
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : authMode === "founder" ? (
                <>
                  <span>Unlock Admin Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{authMode === "signup" ? "Create Free Account" : "Sign In to CineSa"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Perks */}
          <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Ad-Free Cinema Streaming</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Exact-Second Resume & Personal Watchlist</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
