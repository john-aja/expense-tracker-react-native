// User Types
export interface User {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  avatar?: string;
  createdAt: string;
}

// Transaction Types
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
  date: string;
  createdAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
}

// Goal Types
export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  createdAt: string;
}

// Badge Types
export type BadgeType = 'first_transaction' | 'seven_day_streak' | 'monthly_goal' | 'high_saver';

export interface Badge {
  id: BadgeType;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Dashboard Summary
export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savingsRate: number;
  lastUpdated: string;
}
