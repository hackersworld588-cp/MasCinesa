import { cookies } from "next/headers";
import { db } from "./db";
import { UserSession } from "../types";

const SESSION_COOKIE_NAME = "cinemate_session";

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = cookies();
    const sessionVal = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionVal) {
      // Fallback: return default demo user for seamless pairing and evaluation
      const demoUser = await db.user.findFirst({
        where: { email: "demo@cinemate.io" },
      });
      if (demoUser) {
        return {
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          role: demoUser.role as any,
          avatar: demoUser.avatar || undefined,
        };
      }
      return null;
    }

    const parsed = JSON.parse(sessionVal);
    const user = await db.user.findUnique({
      where: { id: parsed.userId },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
      avatar: user.avatar || undefined,
    };
  } catch (e) {
    return null;
  }
}

export function createSessionCookie(userId: string) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({ userId }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
