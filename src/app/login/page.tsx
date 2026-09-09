"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Lock, Mail, User, Shield, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
        body: JSON.stringify({ email, password, name, isSignUp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFastDemoLogin = async (role: "user" | "admin") => {
    setLoading(true);
    setError("");
    try {
      const demoEmail = role === "admin" ? "admin@cinesa.io" : "demo@cinesa.io";
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: demoEmail,
          password: "demo_password",
          name: role === "admin" ? "CineSa Admin" : "Cinephile Alex",
          isSignUp: false,
        }),
      });
      if (res.ok) {
        router.push(role === "admin" ? "/admin" : "/");
        router.refresh();
      }
    } catch (e) {
      setError("Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center mx-auto shadow-lg shadow-brand-red/30">
            <Film className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isSignUp ? "Create Your CineSa Account" : "Welcome Back to CineSa"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            AI-driven film intelligence and personal recommendation engine
          </p>
        </div>

        {/* 1-Click Demo Buttons */}
        <div className="p-4 rounded-2xl glass-panel border border-brand-purple/30 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-300 text-center">
            ⚡ 1-Click Instant Evaluation
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFastDemoLogin("user")}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span>Demo Cinephile</span>
            </button>
            <button
              onClick={() => handleFastDemoLogin("admin")}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-yellow-300 transition flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-yellow-400" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Auth Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@cinesa.io"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-sm transition shadow-lg glow-red flex items-center justify-center gap-2"
            >
              <span>{loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Tab */}
          <div className="text-center pt-2 border-t border-white/5">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-xs text-gray-400 hover:text-white transition"
            >
              {isSignUp ? (
                <span>
                  Already have an account? <strong className="text-brand-crimson">Sign In</strong>
                </span>
              ) : (
                <span>
                  Don&apos;t have an account? <strong className="text-brand-crimson">Sign Up</strong>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
