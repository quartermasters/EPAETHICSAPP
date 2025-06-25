# EPA EthicsGo Mobile App - Setup Guide

## Quick Fix for Current Issues

### 1. Install EAS CLI Globally
```bash
npm install -g @expo/cli
npm install -g eas-cli
```

### 2. Install Dependencies
```bash
cd mobile-native
npm install
```

### 3. Start Development Server
```bash
npm start
```

### 4. Build for Production (After EAS CLI is installed)
```bash
# iOS
npm run build:ios

# Android  
npm run build:android
```

## Alternative: Simplified Development Version

If you encounter dependency issues, here's a simplified version that will work immediately:

### Create Simplified Package.json
```json
{
  "name": "epa-ethics-mobile",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "@expo/vector-icons": "^13.0.0",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/stack": "^6.3.17",
    "@react-navigation/bottom-tabs": "^6.5.8",
    "react-native-screens": "~3.22.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-gesture-handler": "~2.12.0",
    "expo-linear-gradient": "~12.3.0",
    "@react-native-async-storage/async-storage": "1.18.2",
    "expo-font": "~11.4.0",
    "expo-splash-screen": "~0.20.5"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }
}
```

### Installation Steps
1. Delete `node_modules` and `package-lock.json`
2. Replace package.json with simplified version above
3. Run `npm install`
4. Run `npm start`

## Testing the App

### Development Testing
```bash
# Start Expo development server
npm start

# Scan QR code with Expo Go app on your phone
# OR press 'i' for iOS simulator
# OR press 'a' for Android emulator
```

### App Store Build Testing
```bash
# Install EAS CLI first
npm install -g eas-cli

# Login to Expo account (required for builds)
eas login

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Key Features Implemented

✅ **App Store Ready Architecture**
- True React Native app (not web app)
- iOS and Android compatible
- Can be published to app stores

✅ **Complete EPA Features**
- 6 Ethics training modules
- Interactive quiz system
- Video training library
- Resources (FAQ, glossary, contacts)
- User progress tracking
- Offline functionality

✅ **Section 508 Accessibility**
- Screen reader support
- Keyboard navigation
- High contrast text
- Proper focus management

✅ **Professional Federal UI**
- St. Michael Enterprises branding
- EPA contract information
- Government-appropriate styling
- No emojis (professional appearance)

## Troubleshooting

### Common Issues

**Issue**: `'eas' is not recognized`
**Solution**: Install EAS CLI globally: `npm install -g eas-cli`

**Issue**: Package version conflicts
**Solution**: Use the simplified package.json above

**Issue**: Build failures
**Solution**: Ensure you have an Expo account and are logged in: `eas login`

**Issue**: iOS simulator not starting
**Solution**: Make sure Xcode is installed (macOS only)

**Issue**: Android emulator not starting  
**Solution**: Make sure Android Studio is installed and emulator is set up

## Production Deployment

### App Store Submission Requirements

**iOS App Store:**
- Apple Developer account ($99/year)
- App Store Connect access
- iOS app bundle built with EAS

**Google Play Store:**
- Google Play Developer account ($25 one-time)
- Play Console access
- Android APK/AAB built with EAS

**EPA Internal Marketplace:**
- Enterprise distribution setup
- Internal app sharing configuration
- MDM integration for government devices

## Support

For technical issues with this React Native app:
- Check Expo documentation: https://docs.expo.dev/
- React Navigation docs: https://reactnavigation.org/
- Contact St. Michael Enterprises technical team

This React Native application fully meets EPA's requirement for App Store-deployable mobile apps and resolves the critical compliance gap identified in the previous web-based version.