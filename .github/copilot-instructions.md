# Money Tracker - Copilot Instructions

This file contains workspace-specific guidelines for developing the Money Tracker personal finance application.

## Project Overview

**Money Tracker** is a production-ready React Native mobile app for personal finance management, built with Expo, TypeScript, and modern state management.

### Tech Stack
- React Native with Expo SDK 50+
- TypeScript for type safety
- Expo Router for navigation
- Zustand for state management
- React Native Reanimated v3 for animations
- Supabase for backend (auth + database)

## Code Organization

### Directory Structure
```
app/
  ├── (auth)/          # Authentication screens
  ├── (tabs)/          # Main application tabs
  ├── components/      # Reusable UI components
  ├── services/        # API and backend services
  ├── store/          # Zustand stores
  ├── types/          # TypeScript interfaces
  ├── constants/      # Theme, categories, badges
  ├── utils/          # Helper functions
  └── hooks/          # Custom React hooks
```

## Development Guidelines

### Component Development
- All components use TypeScript with proper interfaces
- Components are located in `app/components/` (reusable) or within screen folders (screen-specific)
- Use React Native Reanimated for all animations
- Leverage theme constants from `app/constants/theme.ts`
- Components should be responsive and support all screen sizes

### State Management
- Use Zustand stores in `app/store/` for global state
- Each store has a clear single responsibility:
  - `authStore.ts` - User authentication
  - `transactionStore.ts` - Transaction data
  - `goalsStore.ts` - Goals and badges
- Prefer store selectors over direct state access

### Styling
- Never use hardcoded values; reference `app/constants/theme.ts`
- Maintain dark theme as default
- Use the spacing scale (xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32)
- Apply shadows from theme for consistent depth

### Navigation
- Use Expo Router with file-based routing
- Auth screens in `app/(auth)/`
- Main app screens in `app/(tabs)/`
- Protect routes with `useAuthStore` checks

### Type Safety
- Define interfaces in `app/types/index.ts` for all models
- Use proper TypeScript instead of `any`
- Update types when adding new features

### Animations
- Use React Native Reanimated for all animations
- Prefer spring physics over linear animations
- Add delay props for staggered animations
- Ensure animations don't impact performance

## Common Tasks

### Adding a New Screen
1. Create screen file in appropriate folder (`app/(tabs)/` or `app/(auth)/`)
2. Use Animated.View for entering animations
3. Import and use theme constants
4. Update routing in layout files

### Creating a New Component
1. Create TypeScript file in `app/components/`
2. Define props interface
3. Add JSDoc comments
4. Export from `app/components/index.ts`
5. Use theme constants and Reanimated

### Adding Backend Integration
1. Create service in `app/services/`
2. Update store to use service functions
3. Add error handling
4. Update types as needed

### Form Validation
- Use utility functions in `app/utils/formatters.ts`
- Provide clear error messages
- Validate on blur and submit
- Show loading state during submission

## Best Practices

### Performance
- Use `useMemo` and `useCallback` for expensive operations
- Lazy load screens with Expo Router
- Minimize re-renders with proper store selectors
- Use FlatList for long lists instead of ScrollView

### UX
- Always show loading states
- Provide meaningful error messages
- Add success feedback (toast/alert)
- Use skeleton loaders for data fetching
- Ensure touch targets are at least 44x44pt

### Code Quality
- Add descriptive comments for complex logic
- Keep functions focused and single-purpose
- Use meaningful variable names
- Export components from index files
- Follow the existing code style

### Testing & Debugging
- Test on multiple screen sizes
- Use `console.log` sparingly (remove in production)
- Test auth flows thoroughly
- Verify animations run smoothly (60 FPS)

## File Naming Conventions

- Components: PascalCase (e.g., `TransactionCard.tsx`)
- Hooks: camelCase prefixed with "use" (e.g., `useTransactionData.ts`)
- Utilities: camelCase (e.g., `formatters.ts`)
- Stores: camelCase with "Store" suffix (e.g., `authStore.ts`)
- Types: PascalCase (e.g., `Transaction`)

## Environment & Configuration

### Environment Variables
Create `.env` file from `.env.example`:
```
EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Configuration Files
- `app.json` - Expo configuration
- `tsconfig.json` - TypeScript settings
- `babel.config.js` - Babel and module resolver
- `package.json` - Dependencies and scripts

## Theme System

All styling uses `app/constants/theme.ts`:
- Colors for consistent palette
- Spacing scale for layouts
- Typography for fonts
- Border radius presets
- Shadow definitions

Example usage:
```typescript
import { colors, spacing, typography } from '@constants/theme';

const styles = StyleSheet.create({
  button: {
    padding: spacing.md,
    backgroundColor: colors.primary,
    fontSize: typography.fontSize.md,
  },
});
```

## Deployment

### Android Build
```bash
eas build --platform android
```

### iOS Build
```bash
eas build --platform ios
```

### Web Build
```bash
expo export --platform web
```

## Useful Commands

```bash
npm start              # Start Expo development server
npm run android        # Run on Android
npm run ios           # Run on iOS
npm run web           # Run on web
npm run type-check    # Check TypeScript
npm run lint          # Run ESLint
```

## Version Control

### Commit Message Format
- Use clear, descriptive messages
- Start with verb: feat, fix, refactor, docs, style
- Reference issue numbers when applicable
- Examples: "feat: add transaction analytics", "fix: auth store reset on logout"

### Branch Naming
- feature/description
- fix/description
- refactor/description

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Zustand Store](https://github.com/pmndrs/zustand)
- [Project README](../README.md)

---

**Last Updated**: May 2026
