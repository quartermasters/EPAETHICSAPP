import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EthicsModule, QuizQuestion, VideoItem, UserProgress } from '../types/navigation';

interface EthicsState {
  modules: EthicsModule[];
  videos: VideoItem[];
  userProgress: UserProgress;
  currentModule: EthicsModule | null;
  isLoading: boolean;
  error: string | null;
}

type EthicsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MODULES'; payload: EthicsModule[] }
  | { type: 'SET_VIDEOS'; payload: VideoItem[] }
  | { type: 'SET_USER_PROGRESS'; payload: UserProgress }
  | { type: 'SET_CURRENT_MODULE'; payload: EthicsModule | null }
  | { type: 'UPDATE_MODULE_PROGRESS'; payload: { moduleId: string; progress: number } }
  | { type: 'COMPLETE_MODULE'; payload: string }
  | { type: 'SAVE_QUIZ_SCORE'; payload: { moduleId: string; score: number } };

const initialState: EthicsState = {
  modules: [],
  videos: [],
  userProgress: {
    completedModules: [],
    quizScores: {},
    totalProgress: 0,
    certificatesEarned: [],
    lastActivity: new Date(),
  },
  currentModule: null,
  isLoading: false,
  error: null,
};

const EthicsContext = createContext<{
  state: EthicsState;
  dispatch: React.Dispatch<EthicsAction>;
  loadInitialData: () => Promise<void>;
  saveProgress: () => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  loadInitialData: async () => {},
  saveProgress: async () => {},
});

function ethicsReducer(state: EthicsState, action: EthicsAction): EthicsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_MODULES':
      return { ...state, modules: action.payload };
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'SET_USER_PROGRESS':
      return { ...state, userProgress: action.payload };
    case 'SET_CURRENT_MODULE':
      return { ...state, currentModule: action.payload };
    case 'UPDATE_MODULE_PROGRESS':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload.moduleId
            ? { ...module, progress: action.payload.progress }
            : module
        ),
      };
    case 'COMPLETE_MODULE':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.payload
            ? { ...module, completed: true, progress: 100 }
            : module
        ),
        userProgress: {
          ...state.userProgress,
          completedModules: [...state.userProgress.completedModules, action.payload],
          lastActivity: new Date(),
        },
      };
    case 'SAVE_QUIZ_SCORE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          quizScores: {
            ...state.userProgress.quizScores,
            [action.payload.moduleId]: action.payload.score,
          },
          lastActivity: new Date(),
        },
      };
    default:
      return state;
  }
}

export function EthicsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ethicsReducer, initialState);

  const loadInitialData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Load user progress from AsyncStorage
      const savedProgress = await AsyncStorage.getItem('userProgress');
      if (savedProgress) {
        dispatch({ type: 'SET_USER_PROGRESS', payload: JSON.parse(savedProgress) });
      }

      // Load ethics modules data
      const modules: EthicsModule[] = [
        {
          id: 'federal-ethics-basics',
          title: 'Federal Ethics Basics',
          description: 'Learn the foundational principles of federal ethics and public service.',
          estimatedTime: '30 minutes',
          completed: false,
          progress: 0,
          content: [
            {
              id: '1',
              type: 'text',
              title: 'Introduction to Federal Ethics',
              content: 'Federal ethics rules are designed to ensure that government employees maintain the public trust and carry out their duties with integrity...',
            },
            {
              id: '2',
              type: 'text',
              title: 'Core Principles',
              content: 'The fundamental principles of federal ethics include: avoiding conflicts of interest, maintaining impartiality, and protecting government resources...',
            },
          ],
        },
        {
          id: 'conflict-of-interest',
          title: 'Conflict of Interest Rules',
          description: 'Understand and avoid conflicts of interest in your federal work.',
          estimatedTime: '45 minutes',
          completed: false,
          progress: 0,
          content: [
            {
              id: '1',
              type: 'text',
              title: 'What is a Conflict of Interest?',
              content: 'A conflict of interest occurs when a federal employee has a financial interest that could affect their official duties...',
            },
          ],
        },
        {
          id: 'gifts-travel',
          title: 'Gift and Travel Restrictions',
          description: 'Navigate the rules on accepting gifts and travel as a federal employee.',
          estimatedTime: '35 minutes',
          completed: false,
          progress: 0,
          content: [
            {
              id: '1',
              type: 'text',
              title: 'Gift Rules Overview',
              content: 'Federal employees are generally prohibited from accepting gifts from prohibited sources...',
            },
          ],
        },
        {
          id: 'post-employment',
          title: 'Post-Employment Limitations',
          description: 'Know the rules for employment after leaving federal service.',
          estimatedTime: '40 minutes',
          completed: false,
          progress: 0,
          content: [
            {
              id: '1',
              type: 'text',
              title: 'Post-Employment Restrictions',
              content: 'Former federal employees face certain restrictions on their activities after leaving government service...',
            },
          ],
        },
        {
          id: 'financial-disclosure',
          title: 'Financial Disclosure Requirements',
          description: 'Understand your obligations for financial disclosure reporting.',
          estimatedTime: '25 minutes',
          completed: false,
          progress: 0,
          content: [
            {
              id: '1',
              type: 'text',
              title: 'Financial Disclosure Overview',
              content: 'Certain federal employees must file annual financial disclosure reports...',
            },
          ],
        },
        {
          id: 'whistleblower-protections',
          title: 'Whistleblower Protections',
          description: 'Learn about protections for reporting misconduct and ethics violations.',
          estimatedTime: '30 minutes',
          completed: false,
          progress: 0,
          content: [
            {
              id: '1',
              type: 'text',
              title: 'Whistleblower Rights',
              content: 'Federal employees have the right to report violations of law, rule, or regulation...',
            },
          ],
        },
      ];

      dispatch({ type: 'SET_MODULES', payload: modules });

      // Load video data
      const videos: VideoItem[] = [
        {
          id: 'intro-ethics',
          title: 'Introduction to Ethics',
          description: 'A comprehensive overview of federal ethics principles.',
          duration: '15:30',
          thumbnailUrl: 'https://example.com/thumb1.jpg',
          videoUrl: 'https://example.com/video1.mp4',
          category: 'Ethics Basics',
          views: 1250,
          rating: 4.8,
        },
        {
          id: 'conflict-case-study',
          title: 'Conflict of Interest Case Study',
          description: 'Real-world examples of conflict of interest situations.',
          duration: '22:15',
          thumbnailUrl: 'https://example.com/thumb2.jpg',
          videoUrl: 'https://example.com/video2.mp4',
          category: 'Case Studies',
          views: 890,
          rating: 4.6,
        },
      ];

      dispatch({ type: 'SET_VIDEOS', payload: videos });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem('userProgress', JSON.stringify(state.userProgress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    saveProgress();
  }, [state.userProgress]);

  return (
    <EthicsContext.Provider value={{ state, dispatch, loadInitialData, saveProgress }}>
      {children}
    </EthicsContext.Provider>
  );
}

export const useEthics = () => {
  const context = useContext(EthicsContext);
  if (context === undefined) {
    throw new Error('useEthics must be used within an EthicsProvider');
  }
  return context;
};