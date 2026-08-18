import { db, isFirebaseConfigured } from "./config";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";
import { UserProfile, PracticeLog, SankalpaEntry, TransactionRecord, SessionCategory } from "@/types";
import { 
  getLocalUserProfile, 
  saveLocalUserProfile, 
  logLocalSession, 
  getLocalLogs, 
  getLocalSankalpaEntries, 
  saveLocalSankalpaEntry, 
  deleteLocalSankalpaEntry 
} from "@/lib/storage/localStorage";

export async function syncFirebaseUserProfile(user: {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}): Promise<UserProfile> {
  if (!isFirebaseConfigured || !db) {
    const local = getLocalUserProfile();
    local.displayName = user.displayName || local.displayName;
    local.email = user.email;
    local.photoURL = user.photoURL;
    saveLocalUserProfile(local);
    return local;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const newProfile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName || "Sādhaka",
        email: user.email,
        photoURL: user.photoURL,
        streakCount: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
        totalMinutesMeditated: 0,
        dailyGoalMinutes: 15,
        experienceLevel: "beginner",
        isSupporter: false,
      };
      await setDoc(userRef, { ...newProfile, createdAt: serverTimestamp() });
      saveLocalUserProfile(newProfile);
      return newProfile;
    }

    const data = snap.data() as UserProfile;
    saveLocalUserProfile(data);
    return data;
  } catch (err) {
    console.warn("Firestore user sync error, falling back to LocalStorage:", err);
    return getLocalUserProfile();
  }
}

export async function logPracticeSession(
  userId: string,
  category: SessionCategory,
  patternOrTitle: string,
  durationSeconds: number,
  notes?: string
): Promise<{ profile: UserProfile; streak: number; totalMinutes: number }> {
  if (!isFirebaseConfigured || !db) {
    const { profile } = logLocalSession(category, patternOrTitle, durationSeconds, notes);
    return {
      profile,
      streak: profile.streakCount,
      totalMinutes: profile.totalMinutesMeditated,
    };
  }

  try {
    const logsRef = collection(db, "users", userId, "practice_logs");
    await addDoc(logsRef, {
      category,
      patternOrTitle,
      durationSeconds,
      completed: true,
      notes: notes || "",
      timestamp: serverTimestamp(),
    });

    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);

    const now = new Date();
    const todayStr = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split("T")[0];

    let streak = 1;
    let totalMinutes = Math.round(durationSeconds / 60);
    let currentProfile = getLocalUserProfile();

    if (snap.exists()) {
      const data = snap.data();
      const lastActive = data.lastActiveDate;
      totalMinutes += data.totalMinutesMeditated || 0;

      if (lastActive === todayStr) {
        streak = data.streakCount || 1;
      } else if (lastActive) {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diff = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        streak = diff === 1 ? (data.streakCount || 0) + 1 : 1;
      }

      await updateDoc(userRef, {
        streakCount: streak,
        lastActiveDate: todayStr,
        totalMinutesMeditated: totalMinutes,
        updatedAt: serverTimestamp(),
      });

      currentProfile = {
        ...data,
        streakCount: streak,
        lastActiveDate: todayStr,
        totalMinutesMeditated: totalMinutes,
      } as UserProfile;
    }

    saveLocalUserProfile(currentProfile);
    return { profile: currentProfile, streak, totalMinutes };
  } catch (err) {
    console.warn("Firestore session log error, using LocalStorage fallback:", err);
    const { profile } = logLocalSession(category, patternOrTitle, durationSeconds, notes);
    return {
      profile,
      streak: profile.streakCount,
      totalMinutes: profile.totalMinutesMeditated,
    };
  }
}

export async function fetchPracticeLogs(userId: string): Promise<PracticeLog[]> {
  if (!isFirebaseConfigured || !db) {
    return getLocalLogs();
  }

  try {
    const logsRef = collection(db, "users", userId, "practice_logs");
    const q = query(logsRef, orderBy("timestamp", "desc"), limit(30));
    const snap = await getDocs(q);

    const logs: PracticeLog[] = snap.docs.map((docSnap: any) => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        userId,
        category: d.category,
        patternOrTitle: d.patternOrTitle,
        durationSeconds: d.durationSeconds,
        completed: d.completed,
        notes: d.notes,
        timestamp: d.timestamp?.toDate ? d.timestamp.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return logs;
  } catch (err) {
    console.warn("Error fetching Firestore practice logs:", err);
    return getLocalLogs();
  }
}

export async function addSankalpaEntry(
  userId: string,
  entry: Omit<SankalpaEntry, "id" | "createdAt">
): Promise<SankalpaEntry> {
  if (!isFirebaseConfigured || !db) {
    return saveLocalSankalpaEntry(entry);
  }

  try {
    const sankalpaRef = collection(db, "users", userId, "sankalpa");
    const docRef = await addDoc(sankalpaRef, {
      ...entry,
      createdAt: serverTimestamp(),
    });

    return {
      ...entry,
      id: docRef.id,
      createdAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("Firestore Sankalpa add error:", err);
    return saveLocalSankalpaEntry(entry);
  }
}

export async function recordPaymentTransaction(
  userId: string,
  transaction: TransactionRecord
): Promise<UserProfile> {
  const current = getLocalUserProfile();
  const updated: UserProfile = {
    ...current,
    isSupporter: true,
    supporterBadge: transaction.tierName,
  };

  saveLocalUserProfile(updated);

  if (isFirebaseConfigured && db && userId !== "guest") {
    try {
      const txRef = collection(db, "users", userId, "transactions");
      await addDoc(txRef, {
        ...transaction,
        timestamp: serverTimestamp(),
      });

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        isSupporter: true,
        supporterBadge: transaction.tierName,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Firestore transaction record error:", err);
    }
  }

  return updated;
}
