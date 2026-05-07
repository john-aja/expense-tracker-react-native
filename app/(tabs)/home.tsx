import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { colors, spacing, typography, borderRadius, shadows } from '@constants/theme';
import { Card, TransactionCard, FAB } from '@components/index';
import { useTransactionStore } from '@store/transactionStore';
import { useAuthStore } from '@store/authStore';
import { formatCurrency, calculateSavingsPercentage } from '@utils/formatters';
import AddTransactionModal from './add-transaction';

/**
 * Home Screen
 * Dashboard showing balance, summary, and recent transactions
 */
export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    getRecentTransactions,
    getTotalIncome,
    getTotalExpense,
    getBalance,
    getMonthlyIncome,
    getMonthlyExpense,
  } = useTransactionStore();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const scrollOffset = useSharedValue(0);

  const recentTransactions = getRecentTransactions(5);
  const balance = getBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpense = getMonthlyExpense();
  const savingsRate = calculateSavingsPercentage(monthlyIncome, monthlyExpense);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, 200], [1, 0.8]),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hi, {user?.fullName.split(' ')[0]}! 👋</Text>
              <Text style={styles.subtitle}>Let's manage your money</Text>
            </View>
          </View>
        </Animated.View>

        {/* Balance Card */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Card variant="gradient" style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
            <View style={styles.balanceFooter}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceItemLabel}>Income</Text>
                <Text style={[styles.balanceItemAmount, { color: colors.success }]}>
                  +{formatCurrency(getTotalIncome())}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.balanceItem}>
                <Text style={styles.balanceItemLabel}>Expense</Text>
                <Text style={[styles.balanceItemAmount, { color: colors.danger }]}>
                  -{formatCurrency(getTotalExpense())}
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Monthly Summary */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <View style={styles.summaryGrid}>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryLabel}>This Month Income</Text>
                <Text style={[styles.summaryAmount, { color: colors.success }]}>
                  {formatCurrency(monthlyIncome)}
                </Text>
              </View>
            </Card>

            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryLabel}>This Month Expense</Text>
                <Text style={[styles.summaryAmount, { color: colors.danger }]}>
                  {formatCurrency(monthlyExpense)}
                </Text>
              </View>
            </Card>
          </View>
        </Animated.View>

        {/* Savings Rate */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <Card style={styles.savingsCard}>
            <View style={styles.savingsContent}>
              <View>
                <Text style={styles.savingsLabel}>Savings Rate</Text>
                <Text style={styles.savingsPercentage}>{Math.round(savingsRate)}%</Text>
              </View>
              <View
                style={[
                  styles.savingsIndicator,
                  { backgroundColor: savingsRate > 30 ? colors.success : colors.warning },
                ]}
              >
                <Text style={styles.savingsIndicatorText}>
                  {savingsRate > 30 ? '✓' : '⚠'}
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View entering={FadeInUp.delay(500).springify()}>
          <View style={styles.transactionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity onPress={() => router.push('/analytics')}>
                <Text style={styles.viewAll}>View All →</Text>
              </TouchableOpacity>
            </View>

            {recentTransactions.length > 0 ? (
              <View>
                {recentTransactions.map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    delay={index * 100}
                  />
                ))}
              </View>
            ) : (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No transactions yet. Add one to get started!</Text>
              </Card>
            )}
          </View>
        </Animated.View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <Animated.View style={[fabAnimatedStyle, styles.fabContainer]}>
        <FAB
          icon={<Text style={styles.fabIcon}>+</Text>}
          onPress={() => setIsAddModalVisible(true)}
        />
      </Animated.View>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  greeting: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  balanceCard: {
    marginBottom: spacing.xl,
    paddingVertical: spacing.xl,
  },
  balanceLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  balanceAmount: {
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceItemLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  balanceItemAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.grayLight,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
  },
  summaryContent: {
    alignItems: 'flex-start',
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  summaryAmount: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  savingsCard: {
    marginBottom: spacing.xl,
  },
  savingsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  savingsPercentage: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  savingsIndicator: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingsIndicatorText: {
    fontSize: 24,
  },
  warning: colors.danger,
  transactionsSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  viewAll: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 100,
  },
  fabIcon: {
    fontSize: 32,
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
});
