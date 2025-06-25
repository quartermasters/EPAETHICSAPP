export type RootTabParamList = {
  Home: undefined;
  Training: undefined;
  Quiz: undefined;
  Videos: undefined;
  Resources: undefined;
};

export type EthicsStackParamList = {
  EthicsGuide: undefined;
  ModuleDetail: {
    moduleId: string;
    title: string;
  };
};

export type EthicsModule = {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  completed: boolean;
  progress: number;
  content: ModuleContent[];
  quiz?: QuizQuestion[];
};

export type ModuleContent = {
  id: string;
  type: 'text' | 'image' | 'video' | 'interactive';
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
};

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  views: number;
  rating: number;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
};

export type UserProgress = {
  completedModules: string[];
  quizScores: { [moduleId: string]: number };
  totalProgress: number;
  certificatesEarned: string[];
  lastActivity: Date;
};