"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Smartphone, 
  Download, 
  QrCode, 
  Sparkles, 
  Wifi, 
  HelpCircle,
  CheckCircle2
} from "lucide-react";

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState<"instant" | "apk">("instant");
  const localIpUrl = "http://172.19.17.158:3000";
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&bgcolor=141622&color=ffffff&margin=10&data=" + encodeURIComponent(localIpUrl);

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-24 pb-20 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-4">
            <Smartphone className="w-4 h-4" />
            CineSa Mobile App for Android
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Install <span className="text-brand-crimson">CineSa</span> on Mobile
          </h1>
          <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Experience 4K streaming, free full movies, and AI recommendations directly from your phone’s home screen in full-screen mode.
          </p>
        </div>

        {/* App Showcase Card */}
        <div className="bg-[#12141c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            {/* Left: App Info */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-brand-red via-red-600 to-orange-500 p-0.5 shadow-xl shadow-red-950/50 shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-[#0b0c10] rounded-2xl flex items-center justify-center">
                  <span className="text-4xl font-black text-white tracking-wider">C</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  CineSa Android App
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                    Ready
                  </span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Version 1.0.0 • Free Movies & AI Discovery</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-300">
                    🎬 40+ Full Movies
                  </span>
                  <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-300">
                    ⚡ 60 FPS Fast UI
                  </span>
                  <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-300">
                    🛡️ No Ads / Safe
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <a
                href={localIpUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold rounded-xl shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 text-sm transition hover:scale-105"
              >
                <Smartphone className="w-4 h-4" />
                Open on Mobile
              </a>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("instant")}
            className={"px-5 py-2.5 rounded-xl font-bold text-sm transition " + (
              activeTab === "instant"
                ? "bg-brand-red text-white shadow-lg shadow-red-950/40"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            )}
          >
            Method 1: 1-Click Mobile Install (WebAPK)
          </button>
          <button
            onClick={() => setActiveTab("apk")}
            className={"px-5 py-2.5 rounded-xl font-bold text-sm transition " + (
              activeTab === "apk"
                ? "bg-brand-red text-white shadow-lg shadow-red-950/40"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            )}
          >
            Method 2: Standalone .APK File (PWABuilder)
          </button>
        </div>

        {/* Tab 1 Content: Instant Install */}
        {activeTab === "instant" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Steps (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-[#141622] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-red" />
                  Mobile me 1-Click Install Kaise Karein:
                </h3>

                <div className="space-y-4 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Same Wi-Fi se connect karein</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Ensure karein ki aapka mobile aur laptop ek hi Wi-Fi network par jude hain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone ke Chrome me ye link kholein</h4>
                      <div className="mt-1 flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg p-2 font-mono text-xs text-red-400">
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <span>{localIpUrl}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">&apos;Install CineSa&apos; par tap karein</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Screen ke neeche popup banner dikhega ya Chrome ke top-right <strong>3 dots (⋮)</strong> par jakar <strong>&apos;Install app&apos;</strong> ya <strong>&apos;Add to Home screen&apos;</strong> dabayein.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 font-bold flex items-center justify-center shrink-0 text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Native Android App Ready!</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Android background me automatic <strong>WebAPK</strong> bana kar aapke phone me CineSa icon add kar dega. Yeh full screen bina browser bar ke chalega!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Card (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#141622] border border-white/10 rounded-2xl p-6 text-center">
              <div className="p-3 bg-[#0b0c10] border border-white/10 rounded-2xl shadow-xl mb-4">
                {/* QR Image */}
                <img
                  src={qrUrl}
                  alt="Scan QR code to open CineSa on mobile"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-brand-red" />
                Scan QR Code with Phone
              </h4>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Phone ke camera ya Google Lens se scan karein aur direct mobile me install karein.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Standalone APK via PWABuilder */}
        {activeTab === "apk" && (
          <div className="bg-[#141622] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
                <Download className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Standalone .APK File Kaise Download Karein</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Google aur Microsoft ke official PWABuilder tool se 100% genuine signed Android APK generate karein
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Step 1</span>
                <h4 className="font-semibold text-white text-sm">Deploy URL</h4>
                <p className="text-xs text-gray-400">
                  CineSa ko Vercel ya Ngrok par deploy karein taaki public URL mil sake.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Step 2</span>
                <h4 className="font-semibold text-white text-sm">PWABuilder me Dalein</h4>
                <p className="text-xs text-gray-400">
                  <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-brand-red underline">
                    pwabuilder.com
                  </a> par URL paste karke &apos;Start&apos; dabayein.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Step 3</span>
                <h4 className="font-semibold text-white text-sm">Download .APK</h4>
                <p className="text-xs text-gray-400">
                  &apos;Android Package&apos; select karein aur ready-to-install CineSa.apk file download kar lein!
                </p>
              </div>
            </div>

            <div className="p-4 bg-orange-950/20 border border-orange-500/30 rounded-xl flex items-start gap-3 text-xs text-orange-200">
              <HelpCircle className="w-5 h-5 shrink-0 text-orange-400" />
              <div>
                <strong>Local Machine par APK compile kyu nahi ho rahi?</strong>
                <p className="mt-1 text-orange-200/80 leading-relaxed">
                  Ek Android .apk binary compile karne ke liye system par Java JDK aur 10GB+ Android SDK toolchain (aapt2, d8, gradle) ki zaroorat hoti hai jo is system par installed nahi hai. Isliye <strong>Method 1 (WebAPK)</strong> 100 times better aur faster hai jo direct phone me bina kisi extra software ke install ho jata hai!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}