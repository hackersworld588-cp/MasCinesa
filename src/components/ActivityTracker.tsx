"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ActivityTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // 1. Generate or fetch persistent visitor ID
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

    // 2. Fetch or hydrate user details from localStorage
    let savedUser: any = null;
    try {
      const raw = localStorage.getItem("cinesa_user_profile");
      if (raw) savedUser = JSON.parse(raw);
    } catch (e) {}

    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // 3. Detect device info
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobile = /mobile|iphone|android|ipad/i.test(ua);
    const device = isMobile
      ? /iphone|ipad/i.test(ua)
        ? "Mobile (iPhone / iOS)"
        : "Mobile (Android)"
      : /mac/i.test(ua)
      ? "Desktop (macOS)"
      : "Desktop (PC)";

    // 4. Send tracking beacon with user identity
    const sendBeacon = (user?: any) => {
      try {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "visit",
            details: `Viewing ${pathname === "/" ? "Home Cinema" : pathname}`,
            currentPage: pathname,
            device,
            clientVisitorId: visitorId,
            userId: user?.id || user?.userId || visitorId,
            userName: user?.name,
            userPhone: user?.phone,
          }),
        }).catch(() => {});
      } catch (e) {}
    };

    // Send immediately with local details
    sendBeacon(savedUser);

    // Also verify with server session in background
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          try {
            localStorage.setItem("cinesa_user_profile", JSON.stringify(data.user));
          } catch (e) {}
          if (!savedUser || savedUser.id !== data.user.id) {
            sendBeacon(data.user);
          }
        }
      })
      .catch(() => {});
  }, [pathname]);

  return null;
}
