import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@constants/theme';

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

/**
 * Root Layout Component
 * Sets up navigation structure and initializes app resources
 */
export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load any custom fonts if needed
        // await Font.loadAsync({
        //   'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        //   'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        // });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animationEnabled: true,
        }}
      >
        {/* Auth Stack */}
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />

        {/* Tabs Stack */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
