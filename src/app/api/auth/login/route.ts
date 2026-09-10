import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/auth";
import { upsertTrackedUser, recordActivity } from "@/lib/tracking";

// Secret passwords exclusively known to Founder Mohammad Aabid Husain
const VALID_FOUNDER_PASSWORDS = ["Aabid@9588", "aabid9588", "founder9588"];

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, isSignUp, quickOnboarding } = await req.json();

    if (!email && !phone) {
      return NextResponse.json({ error: "Email or Mobile Phone number is required" }, { status: 400 });
    }

    const rawEmail = (email || "").trim().toLowerCase();
    const rawPhone = (phone || "").trim();
    const rawName = (name || "").trim();
    const cleanPhoneDigits = rawPhone.replace(/\D/g, "");

    // Check if this request is attempting to access Founder / Admin credentials
    const isClaimingFounder =
      rawEmail === "founder@cinesa.tv" ||
      rawEmail === "admin@cinesa.io" ||
      cleanPhoneDigits.includes("9588879423");

    if (isClaimingFounder) {
      // STRICT VERIFICATION: Founder password is MANDATORY
      if (!password || !VALID_FOUNDER_PASSWORDS.includes(password.trim())) {
        return NextResponse.json(
          { error: "Access Denied: Incorrect Founder Secret Password. Please enter the valid passkey." },
          { status: 401 }
        );
      }

      // Valid Founder login
      const founderSession = {
        userId: "founder-aabid",
        name: "Mohammad Aabid Husain",
        email: "founder@cinesa.tv",
        phone: "+91 9588879423",
        role: "admin" as const,
        avatar: "/founder.jpg",
      };

      createSessionCookie(founderSession);
      upsertTrackedUser({
        id: founderSession.userId,
        name: founderSession.name,
        email: founderSession.email,
        phone: founderSession.phone,
        role: "admin",
        avatar: founderSession.avatar,
        lastActive: new Date().toISOString(),
      });

      recordActivity({
        userId: founderSession.userId,
        userName: founderSession.name,
        userPhone: founderSession.phone,
        action: "login",
        details: "Founder Mohammad Aabid Husain authenticated securely into Admin Control Hub",
      });

      return NextResponse.json({ success: true, user: founderSession });
    }

    // Regular User Flow
    const userEmail = rawEmail || `${cleanPhoneDigits || "viewer"}@cinesa.user`;
    const userName = rawName || (rawEmail ? rawEmail.split("@")[0] : "Cinema Lover");
    const userId = `user-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;

    const userSession = {
      userId,
      name: userName,
      email: userEmail,
      phone: rawPhone ? (rawPhone.startsWith("+") ? rawPhone : `+91 ${rawPhone}`) : undefined,
      role: "user" as const,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
    };

    createSessionCookie(userSession);

    // Record user in Founder's live tracking system
    upsertTrackedUser({
      id: userId,
      name: userSession.name,
      email: userSession.email,
      phone: userSession.phone,
      role: "user",
      avatar: userSession.avatar,
      lastActive: new Date().toISOString(),
    });

    recordActivity({
      userId,
      userName: userSession.name,
      userPhone: userSession.phone,
      action: isSignUp || quickOnboarding ? "signup" : "login",
      details: quickOnboarding
        ? `New user joined via welcome prompt: ${userSession.name} (${userSession.phone || userSession.email})`
        : isSignUp
        ? `Registered account: ${userSession.name} (${userSession.phone || userSession.email})`
        : `User logged in: ${userSession.name}`,
    });

    return NextResponse.json({ success: true, user: userSession });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Authentication error" }, { status: 500 });
  }
}
