import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { colors, spacing, typography, borderRadius } from '@constants/theme';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  color?: string;
  height?: number;
  animated?: boolean;
  containerStyle?: ViewStyle;
}

/**
 * Animated Progress Bar Component
 * Shows progress with smooth spring animation
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  color = colors.primary,
  height = 8,
  animated = true,
  containerStyle,
}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animatedProgress.value = withSpring(Math.min(progress, 100), {
        damping: 10,
        mass: 1,
      });
    } else {
      animatedProgress.value = Math.min(progress, 100);
    }
  }, [progress, animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && (
            <Text style={styles.percentage}>{Math.round(animatedProgress.value)}%</Text>
          )}
        </View>
      )}
      <View style={[styles.barContainer, { height }]}>
        <Animated.View
          style={[
            styles.bar,
            animatedStyle,
            {
              height,
              backgroundColor: color,
              borderRadius: borderRadius.full,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  percentage: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  barContainer: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  bar: {
    alignSelf: 'flex-start',
  },
});
