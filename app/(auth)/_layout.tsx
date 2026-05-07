import React from 'react';
import { Stack } from 'expo-router';

/**
 * Auth Stack Layout
 * Handles authentication screens (login, register)
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F0F0F' },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
