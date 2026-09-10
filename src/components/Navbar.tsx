"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Film,
  Sparkles,
  Search,
  Bookmark,
  Scale,
  Shield,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { UserSession } from "../types";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // 1. Immediately hydrate user from localStorage for 0ms delay
    try {
      const saved = localStorage.getItem("cinesa_user_profile");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {}

    // 2. Verify with server session in background
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          try {
            localStorage.setItem("cinesa_user_profile", JSON.stringify(data.user));
          } catch (e) {}
        }
      })
      .catch(() => {});

    // 3. Listen to login events across tabs / onboarding modal
    const handleLoginEvent = () => {
      try {
        const saved = localStorage.getItem("cinesa_user_profile");
        if (saved) setUser(JSON.parse(saved));
      } catch (e) {}
    };
    window.addEventListener("cinesa:user_login", handleLoginEvent);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cinesa:user_login", handleLoginEvent);
    };
  }, []);

  const handleRoleSwitch = async (role: "user" | "admin") => {
    setUserDropdown(false);
    await fetch("/api/auth/switch-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    window.location.reload();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Explore & Search", icon: Search },
    { href: "/watchlist", label: "Watchlist", icon: Bookmark },
    { href: "/about", label: "About Founder", icon: Shield },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center shadow-lg shadow-brand-red/30 group-hover:scale-105 transition">
            <Film className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              Cine<span className="text-brand-crimson">Sa</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-purple/30 text-purple-300 border border-brand-purple/40">
                AI
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/10 text-white font-semibold shadow-inner"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                pathname === "/admin"
                  ? "bg-amber-500/25 text-amber-300 border border-amber-500/60 shadow-lg shadow-amber-950/40"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Hub</span>
            </Link>
          )}
        </nav>

        {/* Right Side: AI Assistant Quick Button & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Quick Founder Link */}
          <Link
            href="/about"
            className="md:hidden flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 transition"
          >
            <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-emerald-400/50 flex-shrink-0">
              <Image src="/founder.jpg" alt="Founder" fill sizes="20px" className="object-cover object-top" />
            </div>
            <span className="text-[11px] font-semibold">Founder</span>
          </Link>

          {/* Quick AI Chat Link */}
          <Link
            href="/chat"
            className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-brand-purple/20 to-brand-crimson/20 border border-brand-purple/40 hover:border-brand-purple/70 text-white text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-purple-900/30 transition group"
          >
            <Sparkles className="w-4 h-4 text-brand-purple group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask CineMate</span>
          </Link>

          {/* User Profile / Role Dropdown OR Sign In Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                aria-expanded={userDropdown}
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-brand-purple/30 border border-white/20">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon className="w-5 h-5 text-gray-300 absolute inset-0 m-auto" />
                  )}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-gray-400 capitalize">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email || user.phone}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/30">
                      {user.role === "admin" ? "Platform Founder" : "Verified User"}
                    </span>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white transition"
                  >
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span>My Taste Profile</span>
                  </Link>

                  <Link
                    href="/watchlist"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white transition"
                  >
                    <Bookmark className="w-4 h-4 text-gray-400" />
                    <span>My Watchlist</span>
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition"
                    >
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Founder Admin Hub</span>
                    </Link>
                  )}

                  <div className="my-1 border-t border-white/10" />

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      setUser(null);
                      try {
                        localStorage.removeItem("cinesa_user_profile");
                      } catch (e) {}
                      window.location.href = "/login";
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-600 hover:to-red-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-red/30 transition hover:scale-[1.02]"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
