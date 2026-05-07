import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle, Text } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  required?: boolean;
}

/**
 * Text Input Component
 * Styled input field with label, error display, and optional icon
 */
export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      icon,
      containerStyle,
      required,
      placeholderTextColor,
      ...props
    },
    ref
  ) => {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}
        <View
          style={[
            styles.inputWrapper,
            error && styles.inputError,
          ]}
        >
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              icon && styles.inputWithIcon,
            ]}
            placeholderTextColor={placeholderTextColor || colors.textTertiary}
            {...props}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  required: {
    color: colors.danger,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.grayLight,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: typography.fontSize.md,
    color: colors.text,
    fontWeight: typography.fontWeight.regular,
  },
  inputWithIcon: {
    marginLeft: spacing.sm,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.danger,
    marginTop: spacing.sm,
    fontWeight: typography.fontWeight.medium,
  },
});
