import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, typography } from '@constants/theme';
import { Card } from '@components/index';

/**
 * Analytics Screen
 * View detailed spending analytics and trends
 */
export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>View your spending trends</Text>
        </View>

        <Card variant="elevated" style={styles.comingSoon}>
          <View style={styles.centerContent}>
            <Text style={styles.emoji}>📊</Text>
            <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
            <Text style={styles.comingSoonText}>
              Detailed analytics with charts and trends
            </Text>
          </View>
        </Card>

        <Card variant="elevated" style={styles.comingSoon}>
          <View style={styles.centerContent}>
            <Text style={styles.emoji}>📈</Text>
            <Text style={styles.comingSoonTitle}>Monthly Reports</Text>
            <Text style={styles.comingSoonText}>
              Comprehensive spending breakdown by category
            </Text>
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
    marginBottom: spacing.xxl,
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
  comingSoon: {
    marginBottom: spacing.lg,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  comingSoonTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
