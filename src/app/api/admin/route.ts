import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAllTrackedUsers, getActivityStream, getAnalyticsSummary, upsertTrackedUser } from "@/lib/tracking";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const passkey = url.searchParams.get("passkey");
    const user = await getCurrentUser();

    // Allow access if logged in as Admin or if founder passkey provided
    const isAuthorized =
      (user && user.role === "admin") ||
      passkey === "aabid9588" ||
      passkey === "founder2026";

    if (!isAuthorized) {
      return NextResponse.json({ error: "Admin authorization required" }, { status: 403 });
    }

    const trackedUsers = getAllTrackedUsers();
    const activityStream = getActivityStream(50);
    const analytics = getAnalyticsSummary();

    return NextResponse.json({
      stats: {
        totalUsers: trackedUsers.length,
        activeToday: analytics.activeToday,
        totalWatchedCount: analytics.totalWatchedCount,
        totalMinutes: analytics.totalMinutes,
        totalSearches: analytics.totalSearches,
        totalMovies: 126,
      },
      users: trackedUsers,
      activityStream,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, passkey, userId, note } = body;
    const user = await getCurrentUser();

    const isAuthorized =
      (user && user.role === "admin") ||
      passkey === "aabid9588" ||
      passkey === "founder2026";

    if (!isAuthorized) {
      return NextResponse.json({ error: "Admin authorization required" }, { status: 403 });
    }

    // 1. Export CSV
    if (action === "export_csv") {
      const users = getAllTrackedUsers();
      const headers = "Name,Email,Phone,Device,City,Country,Last Active,Movies Watched,Minutes Watched\n";
      const rows = users
        .map(
          (u) =>
            `"${u.name}","${u.email}","${u.phone || "N/A"}","${u.device || "Mobile"}","${u.city || "Jaipur"}","${u.country || "India"}","${new Date(u.lastActive).toLocaleString()}","${u.totalWatchedCount}","${u.totalMinutes}"`
        )
        .join("\n");

      return new NextResponse(headers + rows, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="cinesa_users.csv"',
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
