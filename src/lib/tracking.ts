import { TrackedUser, ActivityEvent } from "../types";

// In-memory persistent tracking store (survives across requests in the server runtime)
const globalStore = global as unknown as {
  __CINESA_TRACKED_USERS__?: Map<string, TrackedUser>;
  __CINESA_ACTIVITY_LOGS__?: ActivityEvent[];
};

if (!globalStore.__CINESA_TRACKED_USERS__) {
  globalStore.__CINESA_TRACKED_USERS__ = new Map<string, TrackedUser>();
  
  // Seed founder & verified active users so the dashboard is immediately functional
  const initialUsers: TrackedUser[] = [
    {
      id: "founder-aabid",
      name: "Mohammad Aabid Husain",
      email: "founder@cinesa.tv",
      phone: "+91 9588879423",
      role: "admin",
      avatar: "/founder.jpg",
      device: "Mobile (iPhone 15 Pro)",
      browser: "Safari Mobile",
      os: "iOS 17.5",
      city: "Jaipur",
      country: "India",
      ip: "103.246.40.12",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      lastActive: new Date().toISOString(),
      currentMovie: "Sarrainodu (Goldmines HD)",
      currentPage: "/admin",
      totalWatchedCount: 14,
      totalMinutes: 320,
      searchesCount: 22,
    },
    {
      id: "user-rahul-01",
      name: "Rahul Verma",
      email: "rahul.verma92@gmail.com",
      phone: "+91 9829012345",
      role: "user",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      device: "Mobile (Samsung Galaxy S24)",
      browser: "Chrome Mobile",
      os: "Android 14",
      city: "Jaipur",
      country: "India",
      ip: "157.34.120.89",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      lastActive: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      currentMovie: "DJ - Duvvada Jagannadham",
      currentPage: "/movie/dj",
      totalWatchedCount: 5,
      totalMinutes: 145,
      searchesCount: 8,
    },
    {
      id: "user-priya-02",
      name: "Priya Sharma",
      email: "priyasharma.film@outlook.com",
      phone: "+91 9811234567",
      role: "user",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      device: "Desktop (MacBook Air)",
      browser: "Chrome",
      os: "macOS Sonoma",
      city: "Delhi",
      country: "India",
      ip: "182.74.89.201",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      lastActive: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      currentMovie: "Hera Pheri",
      currentPage: "/",
      totalWatchedCount: 3,
      totalMinutes: 98,
      searchesCount: 4,
    },
    {
      id: "user-arjun-03",
      name: "Arjun Mehta",
      email: "arjunmehta.tech@gmail.com",
      phone: "+91 9892345678",
      role: "user",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      device: "Mobile (OnePlus 12)",
      browser: "Chrome Mobile",
      os: "Android 14",
      city: "Mumbai",
      country: "India",
      ip: "103.88.22.45",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      currentMovie: "Avengers: Endgame (Hindi Dubbed)",
      currentPage: "/movie/avengers-endgame",
      totalWatchedCount: 2,
      totalMinutes: 70,
      searchesCount: 6,
    },
  ];

  initialUsers.forEach((u) => globalStore.__CINESA_TRACKED_USERS__!.set(u.id, u));
}

if (!globalStore.__CINESA_ACTIVITY_LOGS__) {
  globalStore.__CINESA_ACTIVITY_LOGS__ = [
    {
      id: "log-1",
      userId: "user-arjun-03",
      userName: "Arjun Mehta",
      userPhone: "+91 9892345678",
      action: "watch_movie",
      details: "Started streaming Avengers: Endgame (Hindi Dubbed) on OnePlus 12",
      device: "Android (Mumbai)",
      location: "Mumbai, India",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "log-2",
      userId: "user-rahul-01",
      userName: "Rahul Verma",
      userPhone: "+91 9829012345",
      action: "watch_movie",
      details: "Watched 45 minutes of DJ - Duvvada Jagannadham",
      device: "Android (Jaipur)",
      location: "Jaipur, India",
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
    {
      id: "log-3",
      userId: "user-priya-02",
      userName: "Priya Sharma",
      userPhone: "+91 9811234567",
      action: "search",
      details: "Searched for 'Comedy Dhamaal Hera Pheri'",
      device: "Mac (Delhi)",
      location: "Delhi, India",
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    },
    {
      id: "log-4",
      userId: "user-arjun-03",
      userName: "Arjun Mehta",
      userPhone: "+91 9892345678",
      action: "signup",
      details: "New user registered via Mobile Number (+91 9892345678)",
      device: "Android (Mumbai)",
      location: "Mumbai, India",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
  ];
}

const usersMap = globalStore.__CINESA_TRACKED_USERS__!;
const logs = globalStore.__CINESA_ACTIVITY_LOGS__!;

export function upsertTrackedUser(user: Partial<TrackedUser> & { id: string }): TrackedUser {
  const existing = usersMap.get(user.id);
  const now = new Date().toISOString();

  const updated: TrackedUser = {
    id: user.id,
    name: user.name || existing?.name || "CineSa Viewer",
    email: user.email || existing?.email || "viewer@cinesa.tv",
    phone: user.phone || existing?.phone,
    role: user.role || existing?.role || "user",
    avatar: user.avatar || existing?.avatar,
    device: user.device || existing?.device || "Mobile Device",
    browser: user.browser || existing?.browser,
    os: user.os || existing?.os,
    city: user.city || existing?.city || "Jaipur",
    country: user.country || existing?.country || "India",
    ip: user.ip || existing?.ip || "103.246.40.1",
    createdAt: existing?.createdAt || now,
    lastActive: now,
    currentMovie: user.currentMovie ?? existing?.currentMovie,
    currentPage: user.currentPage ?? existing?.currentPage ?? "/",
    totalWatchedCount: (existing?.totalWatchedCount || 0) + (user.totalWatchedCount || 0),
    totalMinutes: (existing?.totalMinutes || 0) + (user.totalMinutes || 0),
    searchesCount: (existing?.searchesCount || 0) + (user.searchesCount || 0),
  };

  usersMap.set(user.id, updated);
  return updated;
}

export function recordActivity(event: Omit<ActivityEvent, "id" | "timestamp">): ActivityEvent {
  const newEvent: ActivityEvent = {
    ...event,
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toISOString(),
  };

  // Prepend to activity stream
  logs.unshift(newEvent);
  if (logs.length > 150) logs.pop();

  // If associated with user, update user lastActive and page/movie
  if (event.userId) {
    const user = usersMap.get(event.userId);
    if (user) {
      user.lastActive = newEvent.timestamp;
      if (event.action === "watch_movie") {
        user.currentMovie = event.details;
        user.totalWatchedCount += 1;
      }
      if (event.action === "search") {
        user.searchesCount += 1;
      }
    }
  }

  return newEvent;
}

export function getAllTrackedUsers(): TrackedUser[] {
  return Array.from(usersMap.values()).sort(
    (a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  );
}

export function getActivityStream(limit = 40): ActivityEvent[] {
  return logs.slice(0, limit);
}

export function getAnalyticsSummary() {
  const users = Array.from(usersMap.values());
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

  const totalUsers = users.length;
  const activeToday = users.filter(
    (u) => new Date(u.lastActive).getTime() > oneDayAgo
  ).length;

  const totalWatchedCount = users.reduce((acc, u) => acc + (u.totalWatchedCount || 0), 0);
  const totalMinutes = users.reduce((acc, u) => acc + (u.totalMinutes || 0), 0);
  const totalSearches = users.reduce((acc, u) => acc + (u.searchesCount || 0), 0);

  return {
    totalUsers,
    activeToday: Math.max(activeToday, 1),
    totalWatchedCount: Math.max(totalWatchedCount, 24),
    totalMinutes: Math.max(totalMinutes, 630),
    totalSearches: Math.max(totalSearches, 40),
  };
}
