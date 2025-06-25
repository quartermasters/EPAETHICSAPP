# EPA Ethics Mobile App - React Native Rebuild Plan

## Current State Analysis

### Issues with Current Implementation
1. **Web-based architecture**: Cannot deploy to app stores
2. **Limited offline capability**: Requires internet connection
3. **Performance concerns**: Not optimized for mobile devices
4. **Accessibility gaps**: Missing native mobile accessibility features
5. **Security limitations**: Web-based security model insufficient for federal requirements

## React Native Rebuild Strategy

### Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│                React Native App                         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │ Navigation  │  │    State    │  │   Offline       │ │
│  │ (Stack/Tab) │  │ Management  │  │   Storage       │ │
│  │             │  │  (Redux)    │  │  (SQLite)       │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │ UI Library  │  │   Security  │  │  Accessibility  │ │
│  │(NativeBase)│  │ (Biometric) │  │  (React Native  │ │
│  │             │  │             │  │   Accessibility)│ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   Network   │  │ Push Notif  │  │    Analytics    │ │
│  │   (Axios)   │  │   (Expo)    │  │   (Firebase)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack Selection

#### Core Framework
```json
{
  "framework": "React Native",
  "version": "0.73.x",
  "platform": "Expo (Managed Workflow)",
  "typescript": "5.x",
  "reasons": [
    "Cross-platform development efficiency",
    "Strong accessibility support",
    "Federal compliance capabilities",
    "App store deployment ready",
    "Offline-first architecture"
  ]
}
```

#### Key Dependencies
```json
{
  "navigation": "@react-navigation/native@^6.x",
  "stateManagement": "@reduxjs/toolkit@^1.x",
  "ui": "native-base@^3.x",
  "storage": "expo-sqlite@^11.x",
  "security": "expo-local-authentication@^13.x",
  "accessibility": "react-native-accessibility-info@^3.x",
  "offline": "@react-native-async-storage/async-storage@^1.x",
  "networking": "axios@^1.x",
  "analytics": "@react-native-firebase/analytics@^18.x"
}
```

## Federal-Compliant Mobile Architecture

### Security Implementation
```typescript
// Federal security configuration
interface FederalMobileConfig {
  authentication: {
    biometric: boolean;
    pinCode: boolean;
    sessionTimeout: number; // 15 minutes for federal compliance
    maxFailedAttempts: number; // 3 attempts before lockout
  };
  storage: {
    encrypted: boolean;
    keychain: boolean; // iOS Keychain, Android Keystore
    biometricProtected: boolean;
  };
  networking: {
    certificatePinning: boolean;
    httpPublicKeyPinning: boolean;
    allowUntrustedCerts: false;
  };
  compliance: {
    jailbreakDetection: boolean;
    screenshotPrevention: boolean;
    backgroundProtection: boolean;
  };
}

// Implementation example
const federalConfig: FederalMobileConfig = {
  authentication: {
    biometric: true,
    pinCode: true,
    sessionTimeout: 900, // 15 minutes
    maxFailedAttempts: 3
  },
  storage: {
    encrypted: true,
    keychain: true,
    biometricProtected: true
  },
  networking: {
    certificatePinning: true,
    httpPublicKeyPinning: true,
    allowUntrustedCerts: false
  },
  compliance: {
    jailbreakDetection: true,
    screenshotPrevention: true,
    backgroundProtection: true
  }
};
```

### Accessibility Architecture
```typescript
// Section 508 compliance for mobile
interface MobileAccessibility {
  screenReader: {
    voiceOver: boolean; // iOS
    talkBack: boolean;  // Android
    labels: string[];   // Comprehensive ARIA labels
  };
  navigation: {
    tabOrder: 'logical';
    focusManagement: boolean;
    gestureAlternatives: boolean;
  };
  visual: {
    highContrast: boolean;
    fontSize: 'scalable';
    colorBlindSupport: boolean;
  };
  motor: {
    largerTouchTargets: boolean; // 44pt minimum
    gestureAlternatives: boolean;
    voiceControl: boolean;
  };
}

// React Native accessibility implementation
const AccessibleComponent = ({ title, onPress }) => (
  <TouchableOpacity
    accessible={true}
    accessibilityLabel={title}
    accessibilityRole="button"
    accessibilityHint="Double tap to navigate to this section"
    style={{
      minHeight: 44, // Federal touch target requirement
      minWidth: 44,
      padding: 12
    }}
    onPress={onPress}
  >
    <Text style={{ fontSize: 16 }}>{title}</Text>
  </TouchableOpacity>
);
```

## App Structure and Navigation

### Federal Navigation Pattern
```typescript
// Navigation structure for federal compliance
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main tab navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0066CC', // EPA blue
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 80, // Larger for accessibility
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: "Home - Main dashboard"
        }}
      />
      <Tab.Screen 
        name="Training" 
        component={TrainingStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: "Training - Ethics modules"
        }}
      />
      <Tab.Screen 
        name="Quiz" 
        component={QuizStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="quiz" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: "Quiz - Test your knowledge"
        }}
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="library" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: "Resources - FAQ and documents"
        }}
      />
    </Tab.Navigator>
  );
}
```

### Screen Components Architecture
```typescript
// Ethics Training Module Component
interface EthicsModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  completed: boolean;
  sections: EthicsSection[];
  accessibility: {
    audioDescription?: string;
    transcript?: string;
    alternativeFormats?: string[];
  };
}

const EthicsModuleScreen: React.FC = () => {
  const [modules, setModules] = useState<EthicsModule[]>([]);
  const [progress, setProgress] = useState<Map<string, number>>(new Map());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text 
          style={styles.header}
          accessible={true}
          accessibilityRole="header"
        >
          Federal Ethics Training
        </Text>
        
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            progress={progress.get(module.id) || 0}
            onPress={() => navigateToModule(module.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
```

## Offline Capability Implementation

### SQLite Database Schema
```sql
-- Offline database schema
CREATE TABLE IF NOT EXISTS ethics_modules (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  estimated_time INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
  id TEXT PRIMARY KEY,
  module_id TEXT,
  section_id TEXT,
  completion_percentage REAL DEFAULT 0,
  completed_at DATETIME,
  sync_status TEXT DEFAULT 'pending',
  FOREIGN KEY (module_id) REFERENCES ethics_modules (id)
);

CREATE TABLE IF NOT EXISTS quiz_responses (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  user_response TEXT,
  correct_answer TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  sync_status TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS offline_content (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL, -- 'video', 'document', 'image'
  local_path TEXT NOT NULL,
  remote_url TEXT,
  download_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  file_size INTEGER
);
```

### Sync Strategy
```typescript
// Offline synchronization implementation
class OfflineSyncManager {
  private db: SQLiteDatabase;
  private networkService: NetworkService;

  async syncUserProgress(): Promise<void> {
    try {
      const pendingProgress = await this.getPendingProgress();
      
      for (const progress of pendingProgress) {
        const response = await this.networkService.syncProgress(progress);
        if (response.success) {
          await this.markProgressSynced(progress.id);
        }
      }
    } catch (error) {
      console.error('Sync failed:', error);
      // Continue offline operation
    }
  }

  async downloadEssentialContent(): Promise<void> {
    const essentialModules = [
      'federal-ethics-basics',
      'conflict-of-interest',
      'emergency-procedures'
    ];

    for (const moduleId of essentialModules) {
      await this.downloadModuleContent(moduleId);
    }
  }

  async isContentAvailableOffline(moduleId: string): Promise<boolean> {
    const result = await this.db.executeSql(
      'SELECT COUNT(*) as count FROM ethics_modules WHERE id = ?',
      [moduleId]
    );
    return result[0].rows.item(0).count > 0;
  }
}
```

## Federal UI Component Library

### EPA-Compliant Design System
```typescript
// Federal design tokens
const EPADesignTokens = {
  colors: {
    primary: '#0066CC',    // EPA Blue
    secondary: '#2E8B57',  // EPA Green
    accent: '#FF6B35',     // EPA Orange
    text: '#212121',       // High contrast text
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: '#D32F2F',
    warning: '#F57C00',
    success: '#388E3C'
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 30 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 26 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
    caption: { fontSize: 14, fontWeight: '400', lineHeight: 18 }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  accessibility: {
    minTouchTarget: 44,
    contrastRatio: 4.5,
    focusIndicatorWidth: 3
  }
};

// Federal-compliant button component
const FederalButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  accessibilityLabel,
  ...props
}) => {
  const buttonStyles = {
    primary: {
      backgroundColor: EPADesignTokens.colors.primary,
      color: '#FFFFFF'
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: EPADesignTokens.colors.primary,
      borderWidth: 2,
      color: EPADesignTokens.colors.primary
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyles[variant],
        disabled && styles.buttonDisabled,
        {
          minHeight: EPADesignTokens.accessibility.minTouchTarget,
          minWidth: EPADesignTokens.accessibility.minTouchTarget
        }
      ]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...props}
    >
      <Text style={[styles.buttonText, buttonStyles[variant]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```

## Performance Optimization

### Bundle Optimization
```javascript
// Metro configuration for federal deployment
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    alias: {
      '@components': './src/components',
      '@screens': './src/screens',
      '@utils': './src/utils',
      '@assets': './src/assets'
    }
  }
};

// Code splitting strategy
const LazyQuizScreen = React.lazy(() => import('@screens/QuizScreen'));
const LazyVideoScreen = React.lazy(() => import('@screens/VideoScreen'));
```

### Memory Management
```typescript
// Memory optimization for large content
class ContentManager {
  private cache = new Map<string, any>();
  private maxCacheSize = 50; // MB

  async loadContent(contentId: string): Promise<any> {
    if (this.cache.has(contentId)) {
      return this.cache.get(contentId);
    }

    const content = await this.fetchContent(contentId);
    
    // Implement LRU cache
    if (this.getCacheSize() > this.maxCacheSize) {
      this.evictOldContent();
    }
    
    this.cache.set(contentId, content);
    return content;
  }

  private evictOldContent(): void {
    const firstKey = this.cache.keys().next().value;
    this.cache.delete(firstKey);
  }
}
```

## Testing Strategy

### Federal Testing Requirements
```typescript
// Accessibility testing
import { render, fireEvent } from '@testing-library/react-native';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('EthicsModuleScreen Accessibility', () => {
  it('should meet WCAG 2.1 AA standards', async () => {
    const { container } = render(<EthicsModuleScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support screen reader navigation', () => {
    const { getByA11yLabel } = render(<EthicsModuleScreen />);
    const moduleButton = getByA11yLabel('Federal Ethics Basics module');
    
    fireEvent.press(moduleButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ModuleDetail');
  });
});

// Security testing
describe('Security Features', () => {
  it('should prevent screenshots in sensitive screens', () => {
    const { getByTestId } = render(<QuizScreen />);
    expect(ScreenshotPrevention.isEnabled()).toBe(true);
  });

  it('should detect jailbroken devices', async () => {
    const isJailbroken = await JailbreakDetection.check();
    if (isJailbroken) {
      expect(SecurityManager.shouldBlockAccess()).toBe(true);
    }
  });
});
```

## Deployment Configuration

### App Store Configuration
```typescript
// app.config.ts for federal deployment
export default {
  expo: {
    name: "EPA Ethics - EthicsGo",
    slug: "epa-ethics-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/epa-icon.png",
    scheme: "gov.epa.ethics",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/epa-splash.png",
      resizeMode: "contain",
      backgroundColor: "#0066CC"
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://ethics-updates.epa.gov"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "gov.epa.ethics.mobile",
      buildNumber: "1.0.0",
      config: {
        usesNonExemptEncryption: false
      },
      infoPlist: {
        NSFaceIDUsageDescription: "Use Face ID to secure access to ethics training",
        NSCameraUsageDescription: "Camera access for document scanning features"
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/epa-adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "gov.epa.ethics.mobile",
      versionCode: 1,
      permissions: [
        "USE_BIOMETRIC",
        "USE_FINGERPRINT",
        "CAMERA"
      ]
    },
    extra: {
      eas: {
        projectId: "epa-ethics-project-id"
      }
    },
    plugins: [
      "expo-biometric-authentication",
      "expo-secure-store",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow EPA Ethics app to access camera for document scanning"
        }
      ]
    ]
  }
};
```

This comprehensive rebuild plan ensures the mobile app meets all federal requirements while providing a superior user experience and maintaining EPA compliance standards.