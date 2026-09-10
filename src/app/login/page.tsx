"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Film, Lock, Mail, User, Phone, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, phone, isSignUp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed");
      } else {
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

  const handleFounderLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "founder@cinesa.tv",
          phone: "+91 9588879423",
          name: "Mohammad Aabid Husain",
          password: "founder_secure_pass",
          isSignUp: false,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Founder login failed");
      }
    } catch (e) {
      setError("Founder login error");
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
            {isSignUp ? "Create Your CineSa Account" : "Welcome Back to CineSa"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            {isSignUp
              ? "Join to personalize your cinema experience and watchlist"
              : "Sign in to resume movies and access personalized recommendations"}
          </p>
        </div>

        {/* Founder 1-Click Access Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-brand-crimson/15 to-purple-500/10 border border-amber-500/30 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-amber-400/50 flex-shrink-0">
                <Image
                  src="/founder.jpg"
                  alt="Mohammad Aabid Husain"
                  fill
                  sizes="36px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  Founder Portal
                </p>
                <p className="text-[11px] text-gray-400">Mohammad Aabid Husain</p>
              </div>
            </div>

            <button
              onClick={handleFounderLogin}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-md transition hover:scale-[1.02] flex items-center gap-1"
            >
              <span>Admin Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => {
              setIsSignUp(false);
              setError("");
            }}
            className={`py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
              !isSignUp ? "bg-brand-crimson text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setError("");
            }}
            className={`py-2 text-xs sm:text-sm font-semibold rounded-xl transition ${
              isSignUp ? "bg-brand-crimson text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Main Auth Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
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
                    required={isSignUp}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson"
                  />
                </div>
              </div>
            )}

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
                Mobile Phone Number <span className="text-gray-500 text-[11px]">(Optional for WhatsApp reachout)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-600 hover:to-red-700 text-white font-bold text-sm shadow-xl shadow-brand-red/30 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span>{isSignUp ? "Create Free Account" : "Sign In to CineSa"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Core Feature Perks */}
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
