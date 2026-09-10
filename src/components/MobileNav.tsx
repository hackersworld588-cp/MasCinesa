"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Search, MessageSquare, Bookmark } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/chat", label: "CineSa", icon: MessageSquare, special: true },
    { href: "/watchlist", label: "Watchlist", icon: Bookmark },
    { href: "/about", label: "Founder", isFounder: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.special) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5 relative group"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                    isActive
                      ? "bg-gradient-to-tr from-brand-purple to-brand-crimson scale-105 shadow-purple-900/50"
                      : "bg-brand-red text-white shadow-brand-red/40"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 text-white" />}
                </div>
                <span
                  className={`text-[10px] mt-1 font-semibold ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          if (item.isFounder) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
                  isActive ? "text-brand-crimson font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                <div
                  className={`relative w-5 h-5 rounded-full overflow-hidden transition-all ${
                    isActive
                      ? "ring-2 ring-brand-crimson scale-110"
                      : "ring-1 ring-white/30 opacity-80"
                  }`}
                >
                  <Image
                    src="/founder.jpg"
                    alt="Founder Mohammad Aabid Husain"
                    fill
                    sizes="20px"
                    className="object-cover object-top"
                  />
                </div>
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
                isActive ? "text-brand-crimson font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
