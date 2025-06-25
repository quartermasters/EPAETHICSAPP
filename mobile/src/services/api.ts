import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse, User, TrainingModule, Quiz, QuizAttempt, UserProgress, Resource, FAQ, Video } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error getting auth token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('user');
          // You might want to trigger a navigation to login here
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await this.api.post('/auth/login', {
        email,
        password,
      });
      
      if (response.data.success && response.data.data) {
        // Store token and user data
        await AsyncStorage.setItem('authToken', response.data.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await this.api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get current user',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  // Training modules endpoints
  async getTrainingModules(): Promise<ApiResponse<TrainingModule[]>> {
    try {
      const response: AxiosResponse<ApiResponse<TrainingModule[]>> = await this.api.get('/modules');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch training modules',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  async getTrainingModule(id: string): Promise<ApiResponse<TrainingModule>> {
    try {
      const response: AxiosResponse<ApiResponse<TrainingModule>> = await this.api.get(`/modules/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch training module',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  // Quiz endpoints
  async getModuleQuiz(moduleId: string): Promise<ApiResponse<Quiz>> {
    try {
      const response: AxiosResponse<ApiResponse<Quiz>> = await this.api.get(`/modules/${moduleId}/quiz`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch quiz',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  async submitQuizAttempt(quizId: string, answers: Record<string, string | string[]>): Promise<ApiResponse<QuizAttempt>> {
    try {
      const response: AxiosResponse<ApiResponse<QuizAttempt>> = await this.api.post(`/quizzes/${quizId}/attempts`, {
        answers,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to submit quiz',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  async getQuizAttempts(quizId: string): Promise<ApiResponse<QuizAttempt[]>> {
    try {
      const response: AxiosResponse<ApiResponse<QuizAttempt[]>> = await this.api.get(`/quizzes/${quizId}/attempts`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch quiz attempts',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  // Progress endpoints
  async getUserProgress(): Promise<ApiResponse<UserProgress[]>> {
    try {
      const response: AxiosResponse<ApiResponse<UserProgress[]>> = await this.api.get('/progress');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user progress',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  async updateModuleProgress(moduleId: string, progressData: Partial<UserProgress>): Promise<ApiResponse<UserProgress>> {
    try {
      const response: AxiosResponse<ApiResponse<UserProgress>> = await this.api.put(`/progress/${moduleId}`, progressData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update progress',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  // Resources endpoints
  async getResources(category?: string): Promise<ApiResponse<Resource[]>> {
    try {
      const params = category ? { category } : {};
      const response: AxiosResponse<ApiResponse<Resource[]>> = await this.api.get('/resources', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch resources',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  // FAQ endpoints
  async getFAQs(category?: string): Promise<ApiResponse<FAQ[]>> {
    try {
      const params = category ? { category } : {};
      const response: AxiosResponse<ApiResponse<FAQ[]>> = await this.api.get('/faqs', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch FAQs',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  // Video endpoints
  async getVideos(category?: string): Promise<ApiResponse<Video[]>> {
    try {
      const params = category ? { category } : {};
      const response: AxiosResponse<ApiResponse<Video[]>> = await this.api.get('/videos', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch videos',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  async getVideo(id: string): Promise<ApiResponse<Video>> {
    try {
      const response: AxiosResponse<ApiResponse<Video>> = await this.api.get(`/videos/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch video',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }

  // Search endpoint
  async search(query: string, type?: 'modules' | 'resources' | 'faqs' | 'videos'): Promise<ApiResponse<any[]>> {
    try {
      const params = { query, ...(type && { type }) };
      const response: AxiosResponse<ApiResponse<any[]>> = await this.api.get('/search', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Search failed',
        errors: error.response?.data?.errors || [error.message],
      };
    }
  }
}

export const apiService = new ApiService();
export default apiService;