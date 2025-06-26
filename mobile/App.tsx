import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform, AccessibilityInfo } from 'react-native';

import StartupScreen from './src/screens/StartupScreen';
import HomeScreen from './src/screens/HomeScreen';
import EthicsGuideScreen from './src/screens/EthicsGuideScreen';
import ModuleDetailScreen from './src/screens/ModuleDetailScreen';
import VideoLibraryScreen from './src/screens/VideoLibraryScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';

const Tab = createBottomTabNavigator();
const EthicsStack = createStackNavigator();

// Ethics Guide Stack Navigator
function EthicsGuideStack() {
  return (
    <EthicsStack.Navigator screenOptions={{ headerShown: false }}>
      <EthicsStack.Screen name="EthicsGuideMain" component={EthicsGuideScreen} />
      <EthicsStack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
    </EthicsStack.Navigator>
  );
}

export default function App() {
  const [showStartup, setShowStartup] = useState(true);

  const handleStartupComplete = () => {
    setShowStartup(false);
    // Announce app launch for screen readers
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      AccessibilityInfo.announceForAccessibility('EPA Ethics App launched. Navigate using bottom tabs.');
    }
  };

  if (showStartup) {
    return (
      <SafeAreaProvider>
        <StartupScreen onComplete={handleStartupComplete} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Ethics Guide':
                  iconName = focused ? 'book' : 'book-outline';
                  break;
                case 'Videos':
                  iconName = focused ? 'play-circle' : 'play-circle-outline';
                  break;
                case 'Quiz':
                  iconName = focused ? 'help-circle' : 'help-circle-outline';
                  break;
                case 'Resources':
                  iconName = focused ? 'library' : 'library-outline';
                  break;
                default:
                  iconName = 'home-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0066CC', // EPA Blue
            tabBarInactiveTintColor: '#666666',
            headerStyle: {
              backgroundColor: '#0066CC',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
            tabBarAccessibilityLabel: `${route.name} tab`,
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 8,
              paddingBottom: 8,
              height: Platform.OS === 'ios' ? 85 : 65,
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'EPA Ethics',
              headerAccessibilityLabel: 'EPA Ethics Home Screen'
            }}
          />
          <Tab.Screen 
            name="Ethics Guide" 
            component={EthicsGuideStack}
            options={{ 
              title: 'Ethics Guide',
              headerAccessibilityLabel: 'Ethics Guide Screen'
            }}
          />
          <Tab.Screen 
            name="Videos" 
            component={VideoLibraryScreen}
            options={{ 
              title: 'Training Videos',
              headerAccessibilityLabel: 'Training Videos Screen'
            }}
          />
          <Tab.Screen 
            name="Quiz" 
            component={QuizScreen}
            options={{ 
              title: 'Test Knowledge',
              headerAccessibilityLabel: 'Test Your Knowledge Quiz Screen'
            }}
          />
          <Tab.Screen 
            name="Resources" 
            component={ResourcesScreen}
            options={{ 
              title: 'Resources',
              headerAccessibilityLabel: 'Resources and FAQ Screen'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}