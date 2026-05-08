import { create } from 'zustand';
import { Goal, Badge } from '../types/index';
import { BADGES } from '@constants/index';

interface GoalsStore {
  goals: Goal[];
  badges: Record<string, Badge>;
  isLoading: boolean;
  error: string | null;

  // Goal Actions
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  removeGoal: (id: string) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;

  // Badge Actions
  setBadges: (badges: Record<string, Badge>) => void;
  unlockBadge: (badgeId: string) => void;

  // State Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Selectors
  getUnlockedBadges: () => Badge[];
  getLockedBadges: () => Badge[];
  getTotalGoalProgress: () => number;
}

/**
 * Goals Store
 * Manages savings goals and achievements/badges
 */
export const useGoalsStore = create<GoalsStore>((set, get) => ({
  goals: [],
  badges: BADGES,
  isLoading: false,
  error: null,

  setGoals: (goals) => set({ goals }),

  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),

  removeGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    })),

  updateGoal: (id, updates) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    })),

  setBadges: (badges) => set({ badges }),

  unlockBadge: (badgeId) =>
    set((state) => ({
      badges: {
        ...state.badges,
        [badgeId]: {
          ...state.badges[badgeId],
          isUnlocked: true,
          unlockedAt: new Date().toISOString(),
        },
      },
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Selector: Get unlocked badges
  getUnlockedBadges: () => {
    const { badges } = get();
    return Object.values(badges).filter((b) => b.isUnlocked);
  },

  // Selector: Get locked badges
  getLockedBadges: () => {
    const { badges } = get();
    return Object.values(badges).filter((b) => !b.isUnlocked);
  },

  // Selector: Get total goal progress (average)
  getTotalGoalProgress: () => {
    const { goals } = get();
    if (goals.length === 0) return 0;
    const totalProgress = goals.reduce(
      (sum, goal) => sum + Math.min(100, (goal.currentAmount / goal.targetAmount) * 100),
      0
    );
    return Math.round(totalProgress / goals.length);
  },
}));
