import { Category, Badge } from '../types/index';
import { colors } from './theme';

/**
 * Default expense categories
 */
export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Food & Dining',
    icon: '🍔',
    color: colors.danger,
    type: 'expense',
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: '🚗',
    color: colors.dangerLight,
    type: 'expense',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: colors.secondary,
    type: 'expense',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: colors.secondaryLight,
    type: 'expense',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: '💡',
    color: colors.primaryLight,
    type: 'expense',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    color: colors.danger,
    type: 'expense',
  },
  {
    id: 'education',
    name: 'Education',
    icon: '📚',
    color: colors.primary,
    type: 'expense',
  },
  {
    id: 'other',
    name: 'Other',
    icon: '📌',
    color: colors.lightGray,
    type: 'expense',
  },
];

/**
 * Default income categories
 */
export const INCOME_CATEGORIES: Category[] = [
  {
    id: 'salary',
    name: 'Salary',
    icon: '💼',
    color: colors.success,
    type: 'income',
  },
  {
    id: 'freelance',
    name: 'Freelance',
    icon: '💻',
    color: colors.successLight,
    type: 'income',
  },
  {
    id: 'bonus',
    name: 'Bonus',
    icon: '🎁',
    color: colors.primary,
    type: 'income',
  },
  {
    id: 'investment',
    name: 'Investment',
    icon: '📈',
    color: colors.primaryLight,
    type: 'income',
  },
  {
    id: 'other',
    name: 'Other',
    icon: '📌',
    color: colors.successDark,
    type: 'income',
  },
];

/**
 * Gamification badges
 */
export const BADGES: Record<string, Badge> = {
  first_transaction: {
    id: 'first_transaction',
    title: 'Getting Started',
    description: 'Added your first transaction',
    icon: '🎯',
    isUnlocked: false,
  },
  seven_day_streak: {
    id: 'seven_day_streak',
    title: '7-Day Tracker',
    description: 'Tracked expenses for 7 consecutive days',
    icon: '🔥',
    isUnlocked: false,
  },
  monthly_goal: {
    id: 'monthly_goal',
    title: 'Goal Crusher',
    description: 'Achieved monthly spending goal',
    icon: '💎',
    isUnlocked: false,
  },
  high_saver: {
    id: 'high_saver',
    title: 'Money Master',
    description: 'Saved 50% of monthly income',
    icon: '🏆',
    isUnlocked: false,
  },
};

/**
 * Default dummy transactions for demo
 */
export const DUMMY_TRANSACTIONS = [
  {
    id: '1',
    userId: 'user-1',
    amount: 45.99,
    category: 'food',
    type: 'expense' as const,
    description: 'Dinner at restaurant',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '2',
    userId: 'user-1',
    amount: 2500,
    category: 'salary',
    type: 'income' as const,
    description: 'Monthly salary',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: '3',
    userId: 'user-1',
    amount: 120.5,
    category: 'shopping',
    type: 'expense' as const,
    description: 'Groceries shopping',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // yesterday
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: '4',
    userId: 'user-1',
    amount: 25,
    category: 'entertainment',
    type: 'expense' as const,
    description: 'Movie tickets',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: '5',
    userId: 'user-1',
    amount: 500,
    category: 'freelance',
    type: 'income' as const,
    description: 'Freelance project payment',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];
