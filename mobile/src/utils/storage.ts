import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types';

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  OFFLINE_DATA: 'offlineData',
  APP_SETTINGS: 'appSettings',
  MODULE_PROGRESS: 'moduleProgress',
  QUIZ_CACHE: 'quizCache',
} as const;

// Secure storage for sensitive data
export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Secure storage set error:', error);
      // Fallback to AsyncStorage
      await AsyncStorage.setItem(key, value);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Secure storage get error:', error);
      // Fallback to AsyncStorage
      return await AsyncStorage.getItem(key);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Secure storage remove error:', error);
      // Fallback to AsyncStorage
      await AsyncStorage.removeItem(key);
    }
  },
};

// Auth storage utilities
export const authStorage = {
  async saveAuthData(token: string, user: User): Promise<void> {
    try {
      await Promise.all([
        secureStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user)),
      ]);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw new Error('Failed to save authentication data');
    }
  },

  async getAuthToken(): Promise<string | null> {
    try {
      return await secureStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        secureStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      const user = await this.getUserData();
      return !!(token && user);
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
};

// App settings storage
export const settingsStorage = {
  async getSettings(): Promise<any> {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  },

  async saveSetting(key: string, value: any): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = { ...currentSettings, [key]: value };
      await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  },

  async removeSetting(key: string): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      delete currentSettings[key];
      await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(currentSettings));
    } catch (error) {
      console.error('Error removing setting:', error);
    }
  },
};

// Offline data storage
export const offlineStorage = {
  async saveOfflineData(key: string, data: any): Promise<void> {
    try {
      const offlineData = await this.getOfflineData();
      offlineData[key] = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(offlineData));
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  },

  async getOfflineData(): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_DATA);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting offline data:', error);
      return {};
    }
  },

  async getOfflineItem(key: string): Promise<any> {
    try {
      const offlineData = await this.getOfflineData();
      return offlineData[key]?.data || null;
    } catch (error) {
      console.error('Error getting offline item:', error);
      return null;
    }
  },

  async removeOfflineItem(key: string): Promise<void> {
    try {
      const offlineData = await this.getOfflineData();
      delete offlineData[key];
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(offlineData));
    } catch (error) {
      console.error('Error removing offline item:', error);
    }
  },

  async clearExpiredData(maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<void> {
    try {
      const offlineData = await this.getOfflineData();
      const now = Date.now();
      
      Object.keys(offlineData).forEach(key => {
        const item = offlineData[key];
        if (item.timestamp && (now - item.timestamp) > maxAge) {
          delete offlineData[key];
        }
      });
      
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(offlineData));
    } catch (error) {
      console.error('Error clearing expired data:', error);
    }
  },
};

// Progress tracking storage
export const progressStorage = {
  async saveModuleProgress(moduleId: string, progress: any): Promise<void> {
    try {
      const progressData = await this.getProgressData();
      progressData[moduleId] = {
        ...progress,
        lastUpdated: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.MODULE_PROGRESS, JSON.stringify(progressData));
    } catch (error) {
      console.error('Error saving module progress:', error);
    }
  },

  async getModuleProgress(moduleId: string): Promise<any> {
    try {
      const progressData = await this.getProgressData();
      return progressData[moduleId] || null;
    } catch (error) {
      console.error('Error getting module progress:', error);
      return null;
    }
  },

  async getProgressData(): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MODULE_PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting progress data:', error);
      return {};
    }
  },

  async clearProgress(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.MODULE_PROGRESS);
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  },
};

// Quiz cache storage
export const quizCache = {
  async saveQuiz(quizId: string, quiz: any): Promise<void> {
    try {
      const cacheData = await this.getCacheData();
      cacheData[quizId] = {
        quiz,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.QUIZ_CACHE, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving quiz to cache:', error);
    }
  },

  async getQuiz(quizId: string): Promise<any> {
    try {
      const cacheData = await this.getCacheData();
      return cacheData[quizId]?.quiz || null;
    } catch (error) {
      console.error('Error getting quiz from cache:', error);
      return null;
    }
  },

  async getCacheData(): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.QUIZ_CACHE);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting cache data:', error);
      return {};
    }
  },

  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.QUIZ_CACHE);
    } catch (error) {
      console.error('Error clearing quiz cache:', error);
    }
  },
};

// General storage utilities
export const storageUtils = {
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
      // Also clear secure storage
      await authStorage.clearAuthData();
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },

  async getStorageSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  },

  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },
};