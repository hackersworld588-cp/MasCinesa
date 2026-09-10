"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Users,
  Film,
  Clock,
  Search,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Download,
  RefreshCw,
  Sparkles,
  Smartphone,
  Laptop,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { TrackedUser, ActivityEvent } from "@/types";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passkey, setPasskey] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "activity" | "settings">("users");

  const fetchAdminData = async (overridePasskey?: string) => {
    setLoading(true);
    setError("");
    try {
      const p = overridePasskey || passkey || (typeof window !== "undefined" ? localStorage.getItem("cinesa_admin_passkey") || "" : "");
      const res = await fetch(`/api/admin${p ? `?passkey=${encodeURIComponent(p)}` : ""}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Access denied. Please provide Founder passkey.");
      } else {
        setData(json);
        if (p && typeof window !== "undefined") {
          localStorage.setItem("cinesa_admin_passkey", p);
        }
      }
    } catch (e) {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUnlockWithPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdminData(passkey);
  };

  const handleQuickFounderLogin = () => {
    setPasskey("aabid9588");
    fetchAdminData("aabid9588");
  };

  const handleExportCSV = async () => {
    try {
      const p = passkey || (typeof window !== "undefined" ? localStorage.getItem("cinesa_admin_passkey") || "aabid9588" : "aabid9588");
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "export_csv", passkey: p }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cinesa_users_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      alert("Failed to export CSV");
    }
  };

  if (error && !data) {
    return (
      <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-brand-crimson/30 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-crimson/20 border border-brand-crimson/40 flex items-center justify-center mx-auto text-brand-crimson">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Founder Admin Access</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              This portal is exclusively reserved for Founder <strong>Mohammad Aabid Husain</strong>.
            </p>
          </div>

          <form onSubmit={handleUnlockWithPasskey} className="space-y-3">
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter Founder Passkey (e.g. aabid9588)"
              className="w-full px-4 py-3 rounded-xl bg-surface-muted border border-white/10 text-white text-sm focus:outline-none focus:border-brand-crimson text-center"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-crimson hover:bg-red-600 text-white font-bold text-sm shadow-lg transition"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={handleQuickFounderLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-xs transition flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>1-Click Unlock for Mohammad Aabid Husain</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const users: TrackedUser[] = data?.users || [];
  const activityLogs: ActivityEvent[] = data?.activityStream || [];
  const stats = data?.stats || {
    totalUsers: 4,
    activeToday: 4,
    totalWatchedCount: 24,
    totalMinutes: 633,
    totalSearches: 40,
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-28 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface/80 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-brand-crimson/50 shadow-xl flex-shrink-0">
            <Image
              src="/founder.jpg"
              alt="Mohammad Aabid Husain"
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/40">
                Founder Portal
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                Live Tracking Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Mohammad Aabid Husain — Control Hub
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jaipur, Rajasthan</span>
              <span>•</span>
              <span>Direct Phone: +91 9588879423</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => fetchAdminData()}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Live Data</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Download Users (.CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total App Users</span>
            <Users className="w-4 h-4 text-brand-crimson" />
          </div>
          <p className="text-2xl sm:text-4xl font-black text-white">{stats.totalUsers}</p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>Tracked & Recorded</span>
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Today</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-4xl font-black text-amber-400">{stats.activeToday}</p>
          <p className="text-[11px] text-gray-400 mt-1">Users online in last 24h</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Movies Streamed</span>
            <Film className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-4xl font-black text-emerald-400">{stats.totalWatchedCount}</p>
          <p className="text-[11px] text-gray-400 mt-1">{stats.totalMinutes} minutes total watchtime</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Searches & Inquiries</span>
            <Search className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-4xl font-black text-purple-300">{stats.totalSearches}</p>
          <p className="text-[11px] text-gray-400 mt-1">Catalog searches processed</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "users"
              ? "bg-brand-crimson text-white shadow-lg shadow-brand-red/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Live Users & Contacts ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "activity"
              ? "bg-brand-crimson text-white shadow-lg shadow-brand-red/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Real-Time Activity Stream</span>
        </button>
      </div>

      {/* TAB 1: Live Users Table */}
      {activeTab === "users" && (
        <div className="rounded-3xl bg-surface/80 border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Registered Users & Active Visitors</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Every person who opened or watched movies on CineSa with their contact information and devices.
              </p>
            </div>

            <span className="text-xs text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              ● {users.length} Active Profiles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-gray-300">
              <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">User / Name</th>
                  <th className="py-3.5 px-4 sm:px-6">Contact & WhatsApp</th>
                  <th className="py-3.5 px-4 sm:px-6">Device & Location</th>
                  <th className="py-3.5 px-4 sm:px-6">Current / Last Movie</th>
                  <th className="py-3.5 px-4 sm:px-6">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => {
                  const whatsappCleanPhone = u.phone?.replace(/\D/g, "");
                  const whatsappLink = whatsappCleanPhone
                    ? `https://wa.me/${whatsappCleanPhone}?text=Hello%20${encodeURIComponent(u.name)},%20I%20am%20Mohammad%20Aabid%20Husain%20(Founder%20of%20CineSa)!%20Thank%20you%20for%20watching%20movies%20on%20our%20platform.`
                    : null;

                  return (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      {/* User Identity */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-surface-elevated ring-1 ring-white/15 flex-shrink-0">
                            {u.avatar ? (
                              <Image src={u.avatar} alt={u.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-white">
                                {u.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {u.role === "admin" && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  Founder
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-gray-500">{u.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact & WhatsApp */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex flex-col gap-1">
                          {u.phone ? (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-emerald-400">{u.phone}</span>
                              {whatsappLink && (
                                <a
                                  href={whatsappLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold transition"
                                  title="Chat with user on WhatsApp"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">No phone recorded</span>
                          )}

                          <a
                            href={`mailto:${u.email}`}
                            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 truncate max-w-[200px]"
                          >
                            <Mail className="w-3 h-3 text-gray-500" />
                            <span>{u.email}</span>
                          </a>
                        </div>
                      </td>

                      {/* Device & Location */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 text-xs text-gray-200">
                            {u.device?.includes("Mobile") ? (
                              <Smartphone className="w-3.5 h-3.5 text-brand-purple" />
                            ) : (
                              <Laptop className="w-3.5 h-3.5 text-blue-400" />
                            )}
                            <span className="font-medium">{u.device || "Mobile Device"}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            <span>{u.city || "Jaipur"}, {u.country || "India"}</span>
                          </p>
                        </div>
                      </td>

                      {/* Watched Movie */}
                      <td className="py-4 px-4 sm:px-6">
                        <div>
                          <p className="font-medium text-white truncate max-w-[220px]">
                            {u.currentMovie || "Browsing Catalog"}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {u.totalWatchedCount} streams • {u.totalMinutes} mins
                          </p>
                        </div>
                      </td>

                      {/* Last Active */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="text-xs text-gray-300 font-mono">
                          {new Date(u.lastActive).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <p className="text-[10px] text-gray-500">
                          {new Date(u.lastActive).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Real-Time Activity Feed */}
      {activeTab === "activity" && (
        <div className="rounded-3xl bg-surface/80 border border-white/10 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Live Event Log</h3>
            <span className="text-xs text-gray-400">Auto-logged stream of user actions</span>
          </div>

          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-crimson/20 text-brand-crimson flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ▶
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{log.userName}</span>
                      {log.userPhone && (
                        <span className="text-xs text-emerald-400 font-mono">({log.userPhone})</span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-300 uppercase font-semibold">
                        {log.action}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{log.details}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {log.device} • {log.location}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-gray-400 flex-shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
