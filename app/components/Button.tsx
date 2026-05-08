import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from "@constants/theme";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Animated Button Component
 * Provides smooth press feedback with spring animation
 */
export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      title,
      onPress,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      icon,
      style,
    },
    ref,
  ) => {
    const scale = useSharedValue(1);

    const handlePressIn = () => {
      scale.value = withSpring(0.95, { damping: 10, mass: 1 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 10, mass: 1 });
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const getButtonStyle = (): (ViewStyle | undefined)[] => {
      const baseStyle: ViewStyle = {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: borderRadius.lg,
        ...shadows.md,
      };

      const sizes: Record<string, ViewStyle> = {
        sm: {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        },
        md: {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
        },
        lg: {
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xl,
        },
      };

      const variants: Record<string, ViewStyle> = {
        primary: { backgroundColor: colors.primary },
        secondary: { backgroundColor: colors.secondary },
        success: { backgroundColor: colors.success },
        danger: { backgroundColor: colors.danger },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.primary,
        },
      };

      return [
        baseStyle,
        sizes[size],
        variants[variant],
        fullWidth ? { width: "100%" } : undefined,
        disabled ? { opacity: 0.5 } : undefined,
      ];
    };

    const getTextStyle = (): TextStyle => {
      const variants: Record<string, TextStyle> = {
        primary: { color: colors.white },
        secondary: { color: colors.white },
        success: { color: colors.white },
        danger: { color: colors.white },
        outline: { color: colors.primary },
      };

      return {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        marginLeft: icon ? spacing.sm : 0,
        ...variants[variant],
      };
    };

    return (
      <Animated.View
        style={[animatedStyle, { width: fullWidth ? "100%" : undefined }]}
      >
        <TouchableOpacity
          ref={ref}
          style={[getButtonStyle(), style]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={0.7}
        >
          {icon}
          <Text style={getTextStyle()}>{loading ? "Loading..." : title}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

Button.displayName = "Button";

const styles = StyleSheet.create({});
