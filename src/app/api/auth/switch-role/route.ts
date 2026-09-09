import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { role } = await req.json();

    const targetEmail = role === "admin" ? "admin@cinemate.io" : "demo@cinemate.io";
    const user = await db.user.findFirst({
      where: { email: targetEmail },
    });

    if (user) {
      createSessionCookie(user.id);
      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json({ error: "Target user not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
