import { format, parseISO, isToday, isYesterday, differenceInDays } from 'date-fns';

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number, currency = '₹'): string => {
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  return `${currency}${formatted}`;
};

/**
 * Format currency for short display (e.g., 1.2K, 1.5M)
 */
export const formatCurrencyShort = (amount: number, currency = '₹'): string => {
  const absAmount = Math.abs(amount);

  if (absAmount >= 1000000) {
    return `${currency}${(absAmount / 1000000).toFixed(1)}M`;
  } else if (absAmount >= 1000) {
    return `${currency}${(absAmount / 1000).toFixed(1)}K`;
  }

  return `${currency}${absAmount.toFixed(0)}`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);

    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    } else if (differenceInDays(new Date(), date) < 7) {
      return format(date, 'EEEE, h:mm a');
    }

    return format(date, 'MMM dd, yyyy');
  } catch {
    return dateString;
  }
};

/**
 * Format date for input fields
 */
export const formatDateForInput = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'yyyy-MM-dd');
  } catch {
    return '';
  }
};

/**
 * Calculate savings percentage
 */
export const calculateSavingsPercentage = (income: number, expense: number): number => {
  if (income === 0) return 0;
  return Math.max(0, Math.min(100, ((income - expense) / income) * 100));
};

/**
 * Get percentage of goal
 */
export const getGoalPercentage = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min(100, (current / target) * 100);
};

/**
 * Group transactions by date
 */
export const groupTransactionsByDate = (transactions: any[]): Record<string, any[]> => {
  return transactions.reduce(
    (acc, transaction) => {
      const date = format(parseISO(transaction.date), 'MMM dd, yyyy');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {} as Record<string, any[]>
  );
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Generate mock transaction data for current month
 */
export const generateMockMonthlyData = (): Array<{ date: string; amount: number }> => {
  const data = [];
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    data.push({
      date: format(new Date(today.getFullYear(), today.getMonth(), i), 'MMM dd'),
      amount: Math.floor(Math.random() * 3000) + 500,
    });
  }

  return data;
};
