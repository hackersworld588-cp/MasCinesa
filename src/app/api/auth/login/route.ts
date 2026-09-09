import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password, name, isSignUp } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (isSignUp) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
      }

      const newUser = await db.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          passwordHash: password || "default_hash",
          role: "user",
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
        },
      });

      // Initialize default preferences
      await db.userPreference.create({
        data: {
          userId: newUser.id,
          favoriteGenres: JSON.stringify(["Science Fiction", "Thriller", "Action"]),
          tasteWeights: JSON.stringify({
            "Science Fiction": 80,
            "Thriller": 75,
            "Action": 60,
          }),
        },
      });

      // Initialize default watchlist
      await db.watchlist.create({
        data: {
          userId: newUser.id,
          title: "My Watchlist",
          isDefault: true,
        },
      });

      createSessionCookie(newUser.id);
      return NextResponse.json({ success: true, user: newUser });
    }

    // Sign in flow
    let user = await db.user.findUnique({ where: { email } });
    if (!user) {
      // Auto-fallback: create if demo credentials used
      user = await db.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          passwordHash: password || "demo_pass",
          role: email.includes("admin") ? "admin" : "user",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
      });
    }

    createSessionCookie(user.id);
    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
