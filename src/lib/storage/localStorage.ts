import { UserProfile, PracticeLog, SankalpaEntry, SessionCategory } from "@/types";

const PROFILE_KEY = "sadhana_user_profile";
const LOGS_KEY = "sadhana_practice_logs";
const SANKALPA_KEY = "sadhana_sankalpa_entries";

export function getLocalUserProfile(): UserProfile {
  if (typeof window === "undefined") {
    return createDefaultGuestProfile();
  }

  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) {
    const defaultProfile = createDefaultGuestProfile();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
    return defaultProfile;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return createDefaultGuestProfile();
  }
}

export function saveLocalUserProfile(profile: UserProfile): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
}

export function logLocalSession(
  category: SessionCategory,
  patternOrTitle: string,
  durationSeconds: number,
  notes?: string
): { profile: UserProfile; log: PracticeLog } {
  const profile = getLocalUserProfile();
  const logs = getLocalLogs();

  const now = new Date();
  const todayStr = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split("T")[0];

  let streak = profile.streakCount || 0;
  const lastActive = profile.lastActiveDate;
  const addedMinutes = Math.round(durationSeconds / 60);
  const totalMinutes = (profile.totalMinutesMeditated || 0) + addedMinutes;

  if (!lastActive) {
    streak = 1;
  } else if (lastActive === todayStr) {
    // Already practiced today, preserve streak
    if (streak === 0) streak = 1;
  } else {
    const lastDate = new Date(lastActive);
    const todayDate = new Date(todayStr);
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      streak += 1; // Consecutive day
    } else if (diffDays > 1) {
      streak = 1; // Reset streak
    }
  }

  const updatedProfile: UserProfile = {
    ...profile,
    streakCount: streak,
    lastActiveDate: todayStr,
    totalMinutesMeditated: totalMinutes,
  };

  saveLocalUserProfile(updatedProfile);

  const newLog: PracticeLog = {
    id: `log_${Date.now()}`,
    userId: profile.uid,
    category,
    patternOrTitle,
    durationSeconds,
    completed: true,
    notes,
    timestamp: now.toISOString(),
  };

  logs.unshift(newLog);
  if (typeof window !== "undefined") {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs.slice(0, 100))); // Keep last 100
  }

  return { profile: updatedProfile, log: newLog };
}

export function getLocalLogs(): PracticeLog[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LOGS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getLocalSankalpaEntries(): SankalpaEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(SANKALPA_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalSankalpaEntry(entry: Omit<SankalpaEntry, "id" | "createdAt">): SankalpaEntry {
  const entries = getLocalSankalpaEntries();
  const newEntry: SankalpaEntry = {
    ...entry,
    id: `sankalpa_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  entries.unshift(newEntry);
  if (typeof window !== "undefined") {
    localStorage.setItem(SANKALPA_KEY, JSON.stringify(entries));
  }
  return newEntry;
}

export function deleteLocalSankalpaEntry(id: string): void {
  const entries = getLocalSankalpaEntries().filter((e) => e.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(SANKALPA_KEY, JSON.stringify(entries));
  }
}

function createDefaultGuestProfile(): UserProfile {
  return {
    uid: "guest_sadhaka_108",
    displayName: "Sādhaka (Guest)",
    email: null,
    photoURL: null,
    streakCount: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    totalMinutesMeditated: 15,
    dailyGoalMinutes: 15,
    experienceLevel: "beginner",
  };
}
