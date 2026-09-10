"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ActivityTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Generate or fetch persistent visitor ID
    let visitorId = "";
    try {
      visitorId = localStorage.getItem("cinesa_visitor_id") || "";
      if (!visitorId) {
        visitorId = `vis-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 6)}`;
        localStorage.setItem("cinesa_visitor_id", visitorId);
      }
    } catch (e) {
      visitorId = "vis-anonymous";
    }

    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Detect device info
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobile = /mobile|iphone|android|ipad/i.test(ua);
    const device = isMobile
      ? /iphone|ipad/i.test(ua)
        ? "Mobile (iOS)"
        : "Mobile (Android)"
      : /mac/i.test(ua)
      ? "Desktop (macOS)"
      : "Desktop (PC)";

    // Send tracking beacon
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "visit",
          details: `Visited ${pathname === "/" ? "Home Cinema" : pathname}`,
          currentPage: pathname,
          device,
          clientVisitorId: visitorId,
        }),
      }).catch(() => {});
    } catch (e) {}
  }, [pathname]);

  return null;
}
