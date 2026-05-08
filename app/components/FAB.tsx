import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors, spacing, shadows } from '@constants/theme';

interface FABProps {
  onPress: (event: GestureResponderEvent) => void;
  icon: React.ReactNode;
  color?: string;
  style?: ViewStyle;
}

/**
 * Floating Action Button (FAB) Component
 * Animated button positioned at bottom right
 */
export const FAB: React.FC<FABProps> = ({
  onPress,
  icon,
  color = colors.primary,
  style,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 10, mass: 1 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, mass: 1 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, styles.container, style]}>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: color }, shadows.xl]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    zIndex: 1000,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
