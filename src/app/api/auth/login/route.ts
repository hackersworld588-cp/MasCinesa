import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/auth";
import { upsertTrackedUser, recordActivity } from "@/lib/tracking";

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, isSignUp } = await req.json();

    if (!email && !phone) {
      return NextResponse.json({ error: "Email or Phone number is required" }, { status: 400 });
    }

    const userEmail = email ? email.trim().toLowerCase() : `${(phone || "").replace(/\D/g, "")}@cinesa.user`;
    const userName = name ? name.trim() : (email ? email.split("@")[0] : "Cinema Fan");
    const userPhone = phone ? phone.trim() : undefined;

    // Check if this is the Founder (Mohammad Aabid Husain)
    const isFounder =
      userEmail.includes("admin") ||
      userEmail.includes("founder") ||
      (userPhone && userPhone.includes("9588879423")) ||
      userName.toLowerCase().includes("aabid");

    const role = isFounder ? "admin" : "user";
    const avatar = isFounder
      ? "/founder.jpg"
      : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`;

    const userId = isFounder ? "founder-aabid" : `user-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const sessionPayload = {
      userId,
      name: isFounder ? "Mohammad Aabid Husain" : userName,
      email: userEmail,
      phone: userPhone || (isFounder ? "+91 9588879423" : undefined),
      role: role as "user" | "admin",
      avatar,
    };

    // Save session in signed HTTP-only cookie
    createSessionCookie(sessionPayload);

    // Save into Live User Tracking Store for Founder Dashboard
    upsertTrackedUser({
      id: userId,
      name: sessionPayload.name,
      email: sessionPayload.email,
      phone: sessionPayload.phone,
      role: sessionPayload.role,
      avatar: sessionPayload.avatar,
      lastActive: new Date().toISOString(),
    });

    // Log Activity
    recordActivity({
      userId,
      userName: sessionPayload.name,
      userPhone: sessionPayload.phone,
      action: isSignUp ? "signup" : "login",
      details: isSignUp
        ? `New user registered: ${sessionPayload.name} (${sessionPayload.phone || sessionPayload.email})`
        : `User logged in: ${sessionPayload.name}`,
    });

    return NextResponse.json({ success: true, user: sessionPayload });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Authentication error" }, { status: 500 });
  }
}
