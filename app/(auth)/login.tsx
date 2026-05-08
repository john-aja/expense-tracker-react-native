import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Button, Input } from '@components/index';
import { colors, spacing, typography, borderRadius } from '@constants/theme';
import { isValidEmail } from '@utils/formatters';
import { useAuthStore } from '@store/authStore';
import { webSafeAnimation } from '../utils/animations';

/**
 * Login Screen
 * User authentication with email and password
 */
export default function LoginScreen() {
  const router = useRouter();
  const { setAuthenticated, setUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data
      const mockUser = {
        id: 'user-1',
        email,
        fullName: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      setAuthenticated(true);

      // Navigate to home screen
      router.replace('/(tabs)/home');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={webSafeAnimation(FadeInDown.delay(100).springify())}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Track your finances with ease</Text>
          </View>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={webSafeAnimation(FadeInDown.delay(200).springify())}>
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              required
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
              editable={!loading}
              required
            />

            {errors.submit && (
              <Text style={styles.errorMessage}>{errors.submit}</Text>
            )}

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.button}
            />
          </View>
        </Animated.View>

        {/* Forgot Password */}
        <Animated.View entering={webSafeAnimation(FadeInUp.delay(300).springify())}>
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Register Link */}
        <Animated.View entering={webSafeAnimation(FadeInUp.delay(400).springify())}>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
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
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.xxl,
  },
  button: {
    marginTop: spacing.lg,
  },
  errorMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.danger,
    marginBottom: spacing.md,
    fontWeight: typography.fontWeight.medium,
  },
  forgotContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  forgotText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});
