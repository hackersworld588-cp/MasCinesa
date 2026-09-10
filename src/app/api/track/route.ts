import { NextResponse } from "next/server";
import { recordActivity, upsertTrackedUser } from "@/lib/tracking";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      action = "visit",
      details = "Visited page",
      device,
      browser,
      os,
      city,
      currentMovie,
      currentPage = "/",
      clientVisitorId,
    } = body;

    // Check if user is logged in
    const currentUser = await getCurrentUser();

    // Fallback visitor identification
    const userAgent = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);
    const detectedDevice =
      device ||
      (isMobile
        ? /iphone|ipad/i.test(userAgent)
          ? "Mobile (iOS)"
          : "Mobile (Android)"
        : /mac/i.test(userAgent)
        ? "Desktop (macOS)"
        : "Desktop (Windows)");

    const userId = currentUser?.id || clientVisitorId || `visitor-${ip.replace(/\./g, "-")}`;
    const userName = currentUser?.name || (clientVisitorId ? `Guest (${clientVisitorId.slice(-4)})` : "Visitor");
    const userPhone = currentUser?.phone;
    const userEmail = currentUser?.email || "anonymous@cinesa.tv";

    // 1. Update user entry in tracking store
    upsertTrackedUser({
      id: userId,
      name: userName,
      email: userEmail,
      phone: userPhone,
      role: currentUser?.role || "user",
      avatar: currentUser?.avatar,
      device: detectedDevice,
      browser: browser || (userAgent.includes("Chrome") ? "Chrome" : userAgent.includes("Safari") ? "Safari" : "Browser"),
      os: os || (isMobile ? "Mobile" : "Desktop"),
      city: city || "Jaipur",
      country: "India",
      ip,
      currentPage,
      currentMovie,
    });

    // 2. Log activity event
    recordActivity({
      userId,
      userName,
      userPhone,
      action,
      details,
      device: detectedDevice,
      location: `${city || "Jaipur"}, India`,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
