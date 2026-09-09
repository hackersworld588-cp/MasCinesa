"use client";

import React, { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Register service worker for PWA support
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("CineSa Service Worker registered:", reg.scope))
        .catch((err) => console.error("Service Worker registration failed:", err));
    }

    // Check if already in standalone mode (already installed)
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      // If deferredPrompt is not yet fired, open instructions modal
      setShowModal(true);
    }
  };

  if (isInstalled || isDismissed) return null;

  return (
    <>
      {/* Floating Bottom Install Banner for Mobile & Desktop */}
      <aside 
        aria-label="CineSa Mobile App installation"
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-[#12141c]/95 border border-red-500/30 backdrop-blur-xl p-4 rounded-2xl shadow-2xl shadow-red-950/30 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-red to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
            C
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white tracking-wide truncate flex items-center gap-1.5">
              CineSa Mobile App
              <span className="text-[10px] uppercase font-semibold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">
                APK / PWA
              </span>
            </h4>
            <p className="text-xs text-gray-400 truncate">
              Mobile me 1-click install karein full screen streaming ke liye
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3.5 py-1.5 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white text-xs font-bold rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
            </svg>
            Install
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Manual Install & APK Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141622] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center font-bold text-white text-lg">
                C
              </div>
              <div>
                <h3 className="font-bold text-white text-base">CineSa Android App Installation</h3>
                <p className="text-xs text-gray-400">Mobile phone me install karne ke aasan tareeqe</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="font-semibold text-white mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-red text-xs flex items-center justify-center">1</span>
                  Android Chrome se Direct Native Install:
                </div>
                <p className="text-xs text-gray-400 pl-7 leading-relaxed">
                  Apne phone ke Chrome browser me top-right ke <strong>3 dots (⋮)</strong> par click karein aur <strong>&apos;Install app&apos;</strong> ya <strong>&apos;Add to Home screen&apos;</strong> select karein. Yeh automatically aapke phone me WebAPK app install kar dega!
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="font-semibold text-white mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-500 text-xs flex items-center justify-center">2</span>
                  Standalone APK File Download:
                </div>
                <p className="text-xs text-gray-400 pl-7 leading-relaxed">
                  Google ke official <strong>PWABuilder.com</strong> ya <strong>Bubblewrap</strong> se direct signed <code className="text-red-400">.apk</code> generate karke WhatsApp/Drive se share aur install kar sakte hain.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-5 py-2.5 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all"
            >
              Samajh Gaya (Got it)
            </button>
          </div>
        </div>
      )}
    </>
  );
}