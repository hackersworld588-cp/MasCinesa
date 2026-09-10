import { cookies } from "next/headers";
import { UserSession } from "../types";

const SESSION_COOKIE_NAME = "cinemate_session";

export interface SessionPayload {
  userId: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  avatar?: string;
  phone?: string;
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = cookies();
    const sessionVal = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionVal) {
      return null;
    }

    const parsed = JSON.parse(sessionVal);
    if (!parsed?.userId) return null;

    return {
      id: parsed.userId,
      name: parsed.name || "CineSa Viewer",
      email: parsed.email || "viewer@cinesa.tv",
      role: parsed.role || "user",
      avatar: parsed.avatar || undefined,
      phone: parsed.phone || undefined,
    };
  } catch (e) {
    return null;
  }
}

export function createSessionCookie(payload: SessionPayload | string) {
  const cookieStore = cookies();
  const sessionData: SessionPayload =
    typeof payload === "string"
      ? {
          userId: payload,
          name: "CineSa Viewer",
          email: "viewer@cinesa.tv",
          role: "user",
        }
      : payload;

  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
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
