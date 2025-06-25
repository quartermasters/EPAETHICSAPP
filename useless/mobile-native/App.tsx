import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import EthicsGuideScreen from './src/screens/EthicsGuideScreen';
import ModuleDetailScreen from './src/screens/ModuleDetailScreen';
import QuizScreen from './src/screens/QuizScreen';
import VideosScreen from './src/screens/VideosScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Context
import { EthicsProvider } from './src/context/EthicsContext';

// Types
import { RootTabParamList, EthicsStackParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<EthicsStackParamList>();

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

function EthicsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1B365D',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="EthicsGuide"
        component={EthicsGuideScreen}
        options={{ title: 'Ethics Guide' }}
      />
      <Stack.Screen
        name="ModuleDetail"
        component={ModuleDetailScreen}
        options={{ title: 'Ethics Module' }}
      />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Training') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Quiz') {
            iconName = focused ? 'brain' : 'bulb-outline';
          } else if (route.name === 'Videos') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'Resources') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#A51C30',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#1B365D',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'EthicsGo',
          headerTitle: 'EPA Ethics Training',
        }}
      />
      <Tab.Screen
        name="Training"
        component={EthicsStack}
        options={{
          headerShown: false,
          title: 'Training',
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: 'Quiz',
          headerTitle: 'Test Your Knowledge',
        }}
      />
      <Tab.Screen
        name="Videos"
        component={VideosScreen}
        options={{
          title: 'Videos',
          headerTitle: 'Training Videos',
        }}
      />
      <Tab.Screen
        name="Resources"
        component={ResourcesScreen}
        options={{
          title: 'Resources',
          headerTitle: 'Ethics Resources',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // App initialization
        console.log('EthicsGo app starting...');
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <EthicsProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#1B365D" />
        <MainTabNavigator />
      </NavigationContainer>
    </EthicsProvider>
  );
}