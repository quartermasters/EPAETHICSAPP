export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'employee' | 'admin';
  department?: string;
  employeeId?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  content: ModuleContent;
  moduleOrder: number;
  estimatedDuration: number; // in minutes
  isRequired: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleContent {
  sections: ModuleSection[];
  resources?: Resource[];
  videos?: Video[];
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'interactive';
  order: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  passingScore: number;
  maxAttempts: number;
  timeLimit?: number; // in minutes
  isActive: boolean;
  questions: QuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  order: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  attemptNumber: number;
  score: number;
  maxScore: number;
  answers: Record<string, string | string[]>;
  startedAt: Date;
  completedAt?: Date;
  passed: boolean;
}

export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
  startedAt?: Date;
  completedAt?: Date;
  timeSpent: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'faq';
  url?: string;
  filePath?: string;
  category: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number; // in seconds
  thumbnail?: string;
  category: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type RootStackParamList = {
  Home: undefined;
  'Ethics Guide': undefined;
  Videos: undefined;
  Quiz: undefined;
  Resources: undefined;
  Login: undefined;
  ModuleDetail: { moduleId: string };
  QuizDetail: { quizId: string };
  VideoPlayer: { videoId: string };
};

export interface NavigationProps {
  navigation: any;
  route: any;
}