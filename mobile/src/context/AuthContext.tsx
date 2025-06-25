import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { authStorage } from '../utils/storage';
import apiService from '../services/api';
import { logger } from '../utils/logger';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<boolean>;
  checkAuthStatus: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  department?: string;
  employeeId?: string;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const token = await authStorage.getAuthToken();
      const userData = await authStorage.getUserData();

      if (token && userData) {
        // Verify token is still valid by making an API call
        const response = await apiService.getCurrentUser();
        
        if (response.success && response.data) {
          dispatch({ type: 'SET_TOKEN', payload: token });
          dispatch({ type: 'SET_USER', payload: response.data });
          dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        } else {
          // Token is invalid, clear stored data
          await authStorage.clearAuthData();
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      logger.error('Error checking auth status:', error);
      await authStorage.clearAuthData();
      dispatch({ type: 'LOGOUT' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.login(email, password);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        await authStorage.saveAuthData(token, user);
        
        dispatch({ type: 'SET_TOKEN', payload: token });
        dispatch({ type: 'SET_USER', payload: user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        
        logger.info('User logged in successfully:', user.email);
        return true;
      } else {
        logger.warn('Login failed:', response.message);
        return false;
      }
    } catch (error) {
      logger.error('Login error:', error);
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.register(userData);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        await authStorage.saveAuthData(token, user);
        
        dispatch({ type: 'SET_TOKEN', payload: token });
        dispatch({ type: 'SET_USER', payload: user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        
        logger.info('User registered successfully:', user.email);
        return true;
      } else {
        logger.warn('Registration failed:', response.message);
        return false;
      }
    } catch (error) {
      logger.error('Registration error:', error);
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Call logout API endpoint
      await apiService.logout();
      
      // Clear local storage
      await authStorage.clearAuthData();
      
      // Update state
      dispatch({ type: 'LOGOUT' });
      
      logger.info('User logged out successfully');
    } catch (error) {
      logger.error('Logout error:', error);
      // Still clear local data even if API call fails
      await authStorage.clearAuthData();
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: 'SET_USER', payload: updatedUser });
      
      // Update stored user data
      authStorage.saveAuthData(state.token || '', updatedUser);
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    checkAuthStatus,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;