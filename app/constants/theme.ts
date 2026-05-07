/**
 * Theme Configuration
 * Dark theme with modern color palette
 */

export const colors = {
  // Primary
  primary: '#6366F1', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',

  // Secondary
  secondary: '#EC4899', // Pink
  secondaryLight: '#F472B6',
  secondaryDark: '#DB2777',

  // Success (for income)
  success: '#10B981', // Emerald
  successLight: '#34D399',
  successDark: '#059669',

  // Danger (for expense)
  danger: '#EF4444', // Red
  dangerLight: '#F87171',
  dangerDark: '#DC2626',

  // Neutral
  dark: '#0F0F0F',
  darkGray: '#1A1A1A',
  gray: '#2D2D2D',
  grayLight: '#404040',
  lightGray: '#6B7280',
  white: '#FFFFFF',

  // Backgrounds
  background: '#0F0F0F',
  surface: '#1A1A1A',
  surfaceLight: '#2D2D2D',

  // Text
  text: '#FFFFFF',
  textSecondary: '#A0AEC0',
  textTertiary: '#64748B',

  // Gradients (use as strings)
  gradientPrimary: ['#6366F1', '#4F46E5'],
  gradientSuccess: ['#10B981', '#059669'],
  gradientDanger: ['#EF4444', '#DC2626'],
  gradientPurple: ['#7C3AED', '#6366F1'],

  // Transparent
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.75,
  },
  // Font weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 8.0,
    elevation: 10,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 16.0,
    elevation: 15,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;
