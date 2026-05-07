import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { colors, spacing, typography, borderRadius, shadows } from '@constants/theme';
import { Card, ProgressBar } from '@components/index';
import { useGoalsStore } from '@store/goalsStore';
import { BADGES } from '@constants/index';

/**
 * Goals Screen
 * Manage savings goals and view achievements
 */
export default function GoalsScreen() {
  const { badges } = useGoalsStore();
  const badgesList = Object.values(badges);
  const unlockedBadges = badgesList.filter((b) => b.isUnlocked);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Goals & Achievements</Text>
          <Text style={styles.subtitle}>Unlock badges and build financial habits</Text>
        </View>

        {/* Achievements Summary */}
        <Card variant="gradient" style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View>
              <Text style={styles.summaryLabel}>Badges Unlocked</Text>
              <Text style={styles.summaryValue}>
                {unlockedBadges.length}/{badgesList.length}
              </Text>
            </View>
            <View style={styles.progressRing}>
              <Text style={styles.progressRingText}>
                {Math.round((unlockedBadges.length / badgesList.length) * 100)}%
              </Text>
            </View>
          </View>
        </Card>

        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Unlocked Badges 🎉</Text>
            <View style={styles.badgeGrid}>
              {unlockedBadges.map((badge, index) => (
                <Animated.View
                  key={badge.id}
                  entering={ZoomIn.delay(index * 100).springify()}
                  style={styles.badgeItem}
                >
                  <Card variant="elevated" style={styles.badgeCard}>
                    <View style={styles.badgeContent}>
                      <Text style={styles.badgeIcon}>{badge.icon}</Text>
                      <Text style={styles.badgeTitle}>{badge.title}</Text>
                    </View>
                  </Card>
                </Animated.View>
              ))}
            </View>
          </View>
        )}

        {/* Locked Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locked Badges 🔒</Text>
          <View style={styles.badgeGrid}>
            {badgesList
              .filter((b) => !b.isUnlocked)
              .map((badge, index) => (
                <Animated.View
                  key={badge.id}
                  entering={FadeInDown.delay(index * 100).springify()}
                  style={styles.badgeItem}
                >
                  <Card variant="elevated" style={[styles.badgeCard, styles.lockedCard]}>
                    <View style={styles.badgeContent}>
                      <Text style={styles.badgeIconLocked}>{badge.icon}</Text>
                      <Text style={styles.badgeTitle}>{badge.title}</Text>
                      <Text style={styles.badgeDescription}>{badge.description}</Text>
                    </View>
                  </Card>
                </Animated.View>
              ))}
          </View>
        </View>

        {/* Create Goal CTA */}
        <Card style={styles.ctaCard}>
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Create Your First Goal</Text>
            <Text style={styles.ctaSubtitle}>Set savings targets and track progress</Text>
          </View>
        </Card>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
  },
  summaryCard: {
    marginBottom: spacing.xl,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  summaryValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  progressRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRingText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.success,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  badgeItem: {
    width: '31%',
  },
  badgeCard: {
    padding: spacing.md,
  },
  badgeContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  badgeIconLocked: {
    fontSize: 32,
    marginBottom: spacing.sm,
    opacity: 0.5,
  },
  badgeTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  badgeDescription: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  lockedCard: {
    opacity: 0.6,
  },
  ctaCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surfaceLight,
    borderWidth: 2,
    borderColor: colors.grayLight,
    borderStyle: 'dashed',
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  ctaSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
