# EthicsGo - EPA Federal Ethics Mobile App

**Native React Native Application for App Store Deployment**

Developed by **St. Michael Enterprises LLC** under EPA Contract **68HERD25Q0050**

## 🏗️ App Store Ready Architecture

This is a **true native mobile application** built with React Native and Expo that can be deployed to:
- ✅ **iOS App Store**
- ✅ **Google Play Store** 
- ✅ **EPA Internal Marketplace**

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`

### Development Setup

1. **Install Dependencies**
   ```bash
   cd mobile-native
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```

4. **Run on Android Emulator**
   ```bash
   npm run android
   ```

### Production Builds

1. **Configure EAS Build**
   ```bash
   eas build:configure
   ```

2. **Build for iOS App Store**
   ```bash
   npm run build:ios
   ```

3. **Build for Google Play Store**
   ```bash
   npm run build:android
   ```

4. **Submit to App Stores**
   ```bash
   npm run submit:ios
   npm run submit:android
   ```

## 📱 Features

### ✅ **Fully Implemented Features**
- **Native Mobile App** - True React Native with Expo
- **Section 508 Accessibility** - Screen reader support, keyboard navigation
- **St. Michael Branding** - Professional EPA contractor styling
- **Offline Capability** - Local data storage with AsyncStorage
- **Progress Tracking** - User training progress persistence
- **Interactive Modules** - 6 federal ethics training modules
- **Quiz System** - Knowledge assessment with scoring
- **Video Library** - Training video management
- **Resource Center** - FAQ, glossary, documents, contacts
- **Professional UI/UX** - Federal design compliance

### 🏢 **EPA Requirements Compliance**
- ✅ **App Store Deployment Ready**
- ✅ **Cross-platform (iOS/Android)**
- ✅ **Section 508 Accessibility**
- ✅ **FedRAMP Low Architecture** (cloud deployment ready)
- ✅ **EPA Branding & Content**
- ✅ **No User Login Required** (public access)
- ✅ **Offline Functionality**

## 🔧 Technical Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation 6
- **State Management**: React Context + useReducer
- **Data Storage**: Expo AsyncStorage (offline)
- **Styling**: React Native StyleSheet + LinearGradient
- **Icons**: Expo Vector Icons
- **Fonts**: Inter font family
- **Build System**: EAS Build
- **App Distribution**: Expo Application Services

## 📁 Project Structure

```
mobile-native/
├── App.tsx                 # Main app component
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── EthicsGuideScreen.tsx
│   │   ├── ModuleDetailScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── VideosScreen.tsx
│   │   ├── ResourcesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── context/           # State management
│   │   └── EthicsContext.tsx
│   └── types/             # TypeScript definitions
│       └── navigation.ts
├── assets/                # Images, fonts, icons
├── app.config.js         # Expo configuration
├── eas.json              # EAS Build configuration
└── package.json          # Dependencies and scripts
```

## 🎯 Key Differences from Web Version

### ❌ **Previous Web App Issues**
- Could NOT be deployed to app stores
- Express.js server dependency
- Browser-only compatibility
- No native mobile features

### ✅ **New Native App Benefits**
- **App Store Ready** - Can be published to iOS/Android stores
- **True Native Performance** - Native UI components and animations
- **Offline First** - Works without internet connection
- **Device Integration** - Access to native device capabilities
- **Professional Mobile UX** - Platform-specific design patterns
- **Push Notifications Ready** - Can send training reminders
- **Biometric Authentication Ready** - Future security enhancement

## 📊 Compliance Status

### Section 508 Accessibility ✅
- Screen reader support with proper ARIA labels
- Keyboard navigation throughout the app
- High contrast text and color combinations
- Focus management and tab order
- Alternative text for all images
- Semantic HTML structure

### FedRAMP Low Ready 🔄
- Stateless client application
- No sensitive data storage on device
- HTTPS communication ready
- Audit logging integration points
- Authentication integration ready

### EPA Requirements ✅
- Federal ethics content structure
- 6 core training modules
- Interactive quiz system
- Video training library
- Resource documentation
- Progress tracking and certificates

## 🚀 Deployment Guide

### iOS App Store Submission

1. **Apple Developer Account**
   - EPA or St. Michael LLC Apple Developer membership
   - App Store Connect access

2. **App Store Metadata**
   - App name: "EthicsGo - EPA Ethics Training"
   - Bundle ID: `gov.epa.ethics.mobile`
   - Category: Education/Government
   - Age rating: 4+ (Educational content)

3. **Submission Process**
   ```bash
   eas build --platform ios --profile production
   eas submit --platform ios
   ```

### Google Play Store Submission

1. **Google Play Console Account**
   - EPA or St. Michael LLC Google Play Developer account
   - Play Console access

2. **App Metadata**
   - Package name: `gov.epa.ethics.mobile`
   - Category: Education
   - Content rating: Everyone

3. **Submission Process**
   ```bash
   eas build --platform android --profile production
   eas submit --platform android
   ```

### EPA Internal Marketplace

1. **Enterprise Distribution**
   - iOS: Enterprise Developer Program enrollment
   - Android: Internal app sharing or private channel

2. **Internal Deployment**
   - Custom distribution via EPA IT infrastructure
   - MDM integration for government devices

## 🔒 Security Considerations

### Data Privacy
- No personal information collected
- All data stored locally on device
- Optional progress sharing
- Compliance with federal privacy requirements

### Communication Security
- HTTPS-only API communication
- Certificate pinning for production
- No sensitive data transmission
- Audit trail for compliance

## 🧪 Testing

### Manual Testing
- Test on iOS and Android devices
- Accessibility testing with screen readers
- Offline functionality verification
- Performance testing on various devices

### Automated Testing
- Unit tests for core functionality
- Integration tests for data flow
- Accessibility testing with automated tools
- Performance benchmarking

## 📞 Support

### Development Team
**St. Michael Enterprises LLC**
- Technical Lead: [Name]
- Mobile Developer: [Name]
- Accessibility Specialist: [Name]

### EPA Coordination
- Ethics Office: ethics@epa.gov
- Technical Coordinator: [EPA Contact]
- Contract Officer: [Contract Officer]

## 📄 Documentation

- [Technical Architecture](./docs/architecture.md)
- [Accessibility Guide](./docs/accessibility.md)
- [Deployment Guide](./docs/deployment.md)
- [User Manual](./docs/user-guide.md)

---

**Contract Information**
- EPA Solicitation: 68HERD25Q0050
- Contractor: St. Michael Enterprises LLC
- Classification: For Official Use Only
- Distribution: EPA Project Team, St. Michael LLC Team