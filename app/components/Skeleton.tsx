import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { colors, spacing, borderRadius } from "@constants/theme";

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  containerStyle?: ViewStyle;
}

/**
 * Skeleton Loader Component
 * Shows animated placeholder while loading data
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius: radius = borderRadius.md,
  containerStyle,
}) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      false, // smoother instead of reversing
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedValue.value, [0, 1], [0.3, 0.7], "clamp"),
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: radius,
        },
        animatedStyle,
        containerStyle,
      ]}
    />
  );
};

/**
 * Transaction Card Skeleton
 * Placeholder for transaction list
 */
export const TransactionCardSkeleton: React.FC<{ delay?: number }> = ({
  delay = 0,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Skeleton
        width={48}
        height={48}
        borderRadius={12}
        containerStyle={{ marginRight: spacing.md }}
      />
      <View style={{ flex: 1 }}>
        <Skeleton
          width="60%"
          height={16}
          containerStyle={{ marginBottom: spacing.sm }}
        />
        <Skeleton width="40%" height={14} />
      </View>
    </View>
  );
};

/**
 * Dashboard Summary Skeleton
 * Placeholder for summary cards
 */
export const DashboardSummarySkeleton: React.FC = () => {
  return (
    <View style={styles.summaryContainer}>
      <Skeleton
        width="100%"
        height={120}
        borderRadius={16}
        containerStyle={{ marginBottom: spacing.lg }}
      />
      <View style={styles.row}>
        <Skeleton width="48%" height={100} borderRadius={16} />
        <Skeleton width="48%" height={100} borderRadius={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.surfaceLight,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  summaryContainer: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
});
