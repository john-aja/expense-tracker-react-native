# Money Tracker - Personal Finance App

A modern, production-ready mobile application for personal finance management built with React Native and Expo.

## 🚀 Features

### Core Functionality
- **Authentication**: Email/password login and registration with validation
- **Dashboard**: Real-time balance display, monthly income/expense summary, recent transactions
- **Transactions**: Add, categorize, and track income and expenses
- **Analytics**: View spending trends and detailed breakdowns
- **Goals**: Set savings goals and track progress
- **Gamification**: Unlock badges for achieving financial milestones
- **Profile**: User settings and account management

### UI/UX Features
- Modern dark theme with gradient accents
- Smooth animations using React Native Reanimated
- Responsive design for various screen sizes
- Animated transitions and micro-interactions
- Skeleton loaders for better UX
- Modal forms with validation feedback

### Technical Highlights
- TypeScript for type safety
- Zustand for state management
- Expo Router for navigation
- React Native Reanimated v3 for animations
- Gesture Handler for touch interactions
- Async Storage for local persistence
- Supabase integration ready (authentication placeholders)

## 📋 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Animations**: React Native Reanimated + Gesture Handler
- **Backend**: Supabase (auth + database)
- **Storage**: Async Storage
- **Charts**: React Native Chart Kit
- **UI Components**: Custom built with React Native

## 📁 Project Structure

```
money-tracker/
├── app/
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/              # Main app screens
│   │   ├── home.tsx
│   │   ├── analytics.tsx
│   │   ├── goals.tsx
│   │   ├── profile.tsx
│   │   └── add-transaction.tsx
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── TransactionCard.tsx
│   │   ├── Skeleton.tsx
│   │   ├── FAB.tsx
│   │   └── index.ts
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and backend services
│   ├── store/             # Zustand state management
│   │   ├── authStore.ts
│   │   ├── transactionStore.ts
│   │   └── goalsStore.ts
│   ├── types/             # TypeScript interfaces
│   │   └── index.ts
│   ├── constants/         # App constants
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── formatters.ts
│   └── _layout.tsx        # Root layout
├── assets/                 # Images and static assets
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone and navigate to project**
```bash
cd tracking-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Update .env with your Supabase credentials** (optional, currently using mock data)
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. **Start the development server**
```bash
npx expo start
```

6. **Run on device or emulator**
- Android: Press `a`
- iOS: Press `i`
- Web: Press `w`

## 🎨 Theme System

The app uses a centralized theme configuration located at `app/constants/theme.ts`:

- **Colors**: Dark theme with primary indigo, secondary pink, success emerald, danger red
- **Spacing**: Consistent 8px base unit
- **Typography**: Responsive font sizes and weights
- **Border Radius**: Rounded corners (8px - full)
- **Shadows**: Multiple shadow levels for depth

### Customizing Theme
Edit `app/constants/theme.ts` to modify colors, spacing, and typography globally.

## 📱 Available Screens

### Authentication
- **Login**: Email and password authentication
- **Register**: New account creation with validation

### Main App (Tabs)
- **Home**: Dashboard with balance, summary, and recent transactions
- **Analytics**: Spending trends and category breakdown (placeholder)
- **Goals**: Savings goals and achievement badges
- **Profile**: User settings and account management

## 🔐 Authentication

Currently uses mock authentication. To integrate Supabase:

1. Update `app/services/` with Supabase client
2. Replace mock login/register logic in auth screens
3. Update `useAuthStore` to persist auth state with Async Storage

## 💾 State Management

### Auth Store (`useAuthStore`)
- User profile
- Authentication status
- Login/logout actions

### Transaction Store (`useTransactionStore`)
- Transaction list
- Income/expense calculations
- Monthly summaries

### Goals Store (`useGoalsStore`)
- Savings goals
- Achievement badges
- Progress tracking

## 🎬 Animation & Interactions

### Key Animation Libraries
- **React Native Reanimated**: Smooth animations with 60 FPS
- **Gesture Handler**: Touch interactions and gestures
- **Built-in Animations**: Fade, Slide, Zoom, Spring effects

### Common Patterns
- Button press feedback with scale animation
- Page transitions with fade/slide
- Card entrance animations with staggered delays
- Progress bar animations with spring physics

## 📊 Sample Data

The app includes dummy transaction data in `app/constants/index.ts` for demonstration. Replace with real API calls as needed.

## 🔧 Development

### Type Safety
Run type checking:
```bash
npm run type-check
```

### Project Structure
- Keep components in `app/components/`
- Add new screens to `app/(tabs)/` or `app/(auth)/`
- Store utilities in `app/utils/`
- Add types in `app/types/`

### Best Practices
- Use TypeScript interfaces for all data
- Leverage Zustand stores for global state
- Create reusable, composable components
- Use theme constants for styling
- Add proper error handling and validation

## 📚 Documentation

### Component Development
Each component is self-contained with:
- Props interface
- Clear JSDoc comments
- Proper TypeScript types
- Animation examples

### Adding New Features
1. Create types in `app/types/`
2. Add store logic in `app/store/`
3. Build components in `app/components/`
4. Create screens in appropriate folder
5. Update navigation as needed

## 🚢 Deployment

### Building for Production

**Android:**
```bash
eas build --platform android
```

**iOS:**
```bash
eas build --platform ios
```

**Web:**
```bash
expo export --platform web
```

## 📖 Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/routing/introduction/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Supabase](https://supabase.com/docs)

## 🤝 Contributing

This is a demonstration project. Feel free to fork and extend with additional features like:
- Recurring transactions
- Budget limits
- Multi-currency support
- Export to CSV/PDF
- Data visualization charts
- Push notifications
- Biometric authentication

## 📄 License

MIT

## 🎯 Future Enhancements

- [ ] Implement Supabase authentication
- [ ] Add charts and graphs (line, pie, bar)
- [ ] Recurring transactions
- [ ] Budget management
- [ ] Multi-account support
- [ ] Data export functionality
- [ ] Push notifications
- [ ] Biometric login
- [ ] Dark mode toggle
- [ ] Multi-language support

---

**Built with ❤️ using React Native and Expo**
