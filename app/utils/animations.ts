import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';

export function webSafeAnimation<T>(animation: T): T | undefined {
  return isWeb ? undefined : animation;
}