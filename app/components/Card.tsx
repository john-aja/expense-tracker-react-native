import React from 'react';
import { View, StyleSheet, ViewStyle, GestureResponderEvent, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows } from '@constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'default' | 'gradient' | 'elevated';
  animated?: boolean;
  delay?: number;
}

/**
 * Animated Card Component
 * Displays content in a styled container with optional press animation
 */
export const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      style,
      onPress,
      variant = 'default',
      animated = true,
      delay = 0,
    },
    ref
  ) => {
    const scale = useSharedValue(1);

    const handlePressIn = () => {
      if (onPress) {
        scale.value = withSpring(0.98, { damping: 10, mass: 1 });
      }
    };

    const handlePressOut = () => {
      if (onPress) {
        scale.value = withSpring(1, { damping: 10, mass: 1 });
      }
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const getVariantStyle = (): ViewStyle => {
      const variants: Record<string, ViewStyle> = {
        default: {
          backgroundColor: colors.surface,
          borderRadius: borderRadius.lg,
          ...shadows.md,
        },
        gradient: {
          backgroundColor: colors.surfaceLight,
          borderRadius: borderRadius.lg,
          borderWidth: 1,
          borderColor: colors.grayLight,
          ...shadows.lg,
        },
        elevated: {
          backgroundColor: colors.surface,
          borderRadius: borderRadius.lg,
          ...shadows.xl,
        },
      };

      return variants[variant];
    };

    const cardContent = (
      <Animated.View
        ref={ref}
        style={[
          styles.card,
          getVariantStyle(),
          onPress && animatedStyle,
          style,
        ]}
        entering={animated ? FadeInDown.delay(delay).springify() : undefined}
      >
        {children}
      </Animated.View>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          {cardContent}
        </TouchableOpacity>
      );
    }

    return cardContent;
  }
);

Card.displayName = 'Card';

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
  },
});
