export type DoshaType = "vata" | "pitta" | "kapha" | "tridoshic" | "vata_pitta" | "pitta_kapha" | "vata_kapha";

export type ChakraName = "muladhara" | "svadhisthana" | "manipura" | "anahata" | "vishuddha" | "ajna" | "sahasrara";

export type SessionCategory = "pranayama" | "sound_therapy" | "dhyana" | "mantra_japa" | "yoga_nidra";

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  primaryDosha?: string;
  streakCount: number;
  lastActiveDate: string | null;
  totalMinutesMeditated: number;
  dailyGoalMinutes: number;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  isSupporter?: boolean;
  supporterBadge?: string;
  createdAt?: any;
}

export interface PracticeLog {
  id?: string;
  userId: string;
  category: SessionCategory;
  patternOrTitle: string;
  durationSeconds: number;
  completed: boolean;
  moodBefore?: number;
  moodAfter?: number;
  notes?: string;
  timestamp: string; // ISO date string
}

export interface SankalpaEntry {
  id: string;
  userId: string;
  intention: string;
  category: "clarity" | "healing" | "discipline" | "devotion" | "peace";
  tags: string[];
  gratitudeNote?: string;
  createdAt: string;
}

export interface SolfeggioItem {
  hz: number;
  title: string;
  sanskritName: string;
  chakra: ChakraName;
  description: string;
  benefits: string[];
  color: string;
}

export interface ChakraInfo {
  id: ChakraName;
  name: string;
  sanskritName: string;
  bijaMantra: string;
  element: string;
  frequencyHz: number;
  color: string;
  hexColor: string;
  location: string;
  petalCount: number;
  description: string;
  affirmation: string;
  balancedSigns: string;
  unbalancedSigns: string;
  mudra: string;
}

export interface SupporterTier {
  id: string;
  name: string;
  sanskritName: string;
  amountINR: number;
  badge: string;
  description: string;
  features: string[];
}

export interface TransactionRecord {
  id: string;
  userId: string;
  orderId: string;
  paymentId: string;
  amountINR: number;
  tierName: string;
  status: "created" | "verified" | "failed";
  timestamp: string;
}
