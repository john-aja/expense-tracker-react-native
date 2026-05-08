import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import Animated, { FadeInRight, ZoomIn } from 'react-native-reanimated';
import { Transaction } from '../types/index';
import { Card } from './Card';
import { colors, spacing, typography } from '@constants/theme';
import { formatCurrency, formatDate } from '@utils/formatters';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@constants/index';
import { webSafeAnimation } from '../utils/animations';

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: (event: GestureResponderEvent) => void;
  delay?: number;
}

/**
 * Transaction Card Component
 * Displays a single transaction with animated entry
 */
export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
  delay = 0,
}) => {
  // Find category to get icon
  const categories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  const category = categories.find((c) => c.id === transaction.category);
  const categoryIcon = category?.icon || '📌';

  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? colors.success : colors.text;
  const amountSign = isIncome ? '+' : '-';

  return (
    <Animated.View entering={webSafeAnimation(FadeInRight.delay(delay).springify())}>
      <Card onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{categoryIcon}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.category}>{category?.name || 'Other'}</Text>
            <Text style={styles.description}>{transaction.description}</Text>
          </View>

          <View style={styles.rightContent}>
            <Text style={[styles.amount, { color: amountColor }]}>
              {amountSign}
              {formatCurrency(transaction.amount)}
            </Text>
            <Text style={styles.date}>{formatDate(transaction.date)}</Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
  },
});
