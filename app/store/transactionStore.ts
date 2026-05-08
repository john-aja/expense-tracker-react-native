import { create } from 'zustand';
import { Transaction, TransactionType } from '../types/index';
import { DUMMY_TRANSACTIONS } from '@constants/index';

interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Selectors
  getTransactionsByType: (type: TransactionType) => Transaction[];
  getRecentTransactions: (limit: number) => Transaction[];
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getBalance: () => number;
  getMonthlyIncome: () => number;
  getMonthlyExpense: () => number;
}

/**
 * Transaction Store
 * Manages transaction state
 */
export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: DUMMY_TRANSACTIONS as Transaction[],
  isLoading: false,
  error: null,

  setTransactions: (transactions) => set({ transactions }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Selector: Get transactions by type
  getTransactionsByType: (type) => {
    const { transactions } = get();
    return transactions.filter((t) => t.type === type);
  },

  // Selector: Get recent transactions
  getRecentTransactions: (limit = 10) => {
    const { transactions } = get();
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
  },

  // Selector: Get total income
  getTotalIncome: () => {
    const { transactions } = get();
    return transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  },

  // Selector: Get total expense
  getTotalExpense: () => {
    const { transactions } = get();
    return transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  },

  // Selector: Get balance
  getBalance: () => {
    const { getTotalIncome, getTotalExpense } = get();
    return getTotalIncome() - getTotalExpense();
  },

  // Selector: Get monthly income
  getMonthlyIncome: () => {
    const { transactions } = get();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return transactions
      .filter(
        (t) =>
          t.type === 'income' &&
          new Date(t.date) >= startOfMonth &&
          new Date(t.date) <= now
      )
      .reduce((sum, t) => sum + t.amount, 0);
  },

  // Selector: Get monthly expense
  getMonthlyExpense: () => {
    const { transactions } = get();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return transactions
      .filter(
        (t) =>
          t.type === 'expense' &&
          new Date(t.date) >= startOfMonth &&
          new Date(t.date) <= now
      )
      .reduce((sum, t) => sum + t.amount, 0);
  },
}));
