// Shared types for EPA Ethics App

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'content_manager' | 'viewer';
  firstName: string;
  lastName: string;
  department?: string;
  lastLogin?: Date;
  mfaEnabled: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EthicsModule {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  icon: string;
  estimatedTime: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  transcript?: string;
  closedCaptions?: string;
  audioDescription?: string;
  isPublished: boolean;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Link' | 'Document' | 'Form';
  url?: string;
  filePath?: string;
  category: string;
  fileSize?: number;
  mimeType?: string;
  downloadCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface ContentUpdate {
  id: string;
  type: 'module' | 'video' | 'faq' | 'glossary' | 'resource';
  resourceId: string;
  title: string;
  description: string;
  publishedAt: Date;
  createdBy: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
  mfaCode?: string;
}

export interface LoginResponse {
  user: Omit<User, 'password'>;
  token: string;
  refreshToken: string;
  mfaRequired?: boolean;
}

export interface QuizResult {
  id: string;
  userId?: string;
  sessionId: string;
  score: number;
  totalQuestions: number;
  answers: QuizAnswer[];
  completedAt: Date;
  timeSpent: number; // in seconds
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface AccessibilityPreferences {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  reducedMotion: boolean;
  closedCaptions: boolean;
  audioDescription: boolean;
}

export interface AppSettings {
  appVersion: string;
  minSupportedVersion: string;
  maintenanceMode: boolean;
  featuresEnabled: {
    quiz: boolean;
    videos: boolean;
    offlineMode: boolean;
    analytics: boolean;
  };
  security: {
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
  };
}

export interface SecurityEvent {
  id: string;
  type: 'login_success' | 'login_failure' | 'password_change' | 'mfa_setup' | 'suspicious_activity';
  userId?: string;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  resolved: boolean;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isLoading: boolean;
  isDirty: boolean;
}

// Accessibility types for WCAG compliance
export interface AccessibilityFeature {
  id: string;
  type: 'screen_reader' | 'keyboard_navigation' | 'high_contrast' | 'large_text' | 'voice_control';
  enabled: boolean;
  settings?: Record<string, any>;
}

export interface Section508Compliance {
  altTextProvided: boolean;
  keyboardAccessible: boolean;
  colorContrastCompliant: boolean;
  captionsAvailable: boolean;
  transcriptsProvided: boolean;
  voiceOverSupported: boolean;
  lastAuditDate: Date;
  complianceScore: number; // 0-100
}

// Federal compliance types
export interface FedRAMPStatus {
  authorizationLevel: 'Low' | 'Moderate' | 'High';
  authorizationDate: Date;
  expirationDate: Date;
  cloudServiceProvider: string;
  complianceDocuments: string[];
  lastSecurityAssessment: Date;
  continuousMonitoringEnabled: boolean;
}

export interface PIIData {
  hasPersonalInfo: boolean;
  dataTypes: string[];
  retentionPeriod: number; // days
  encryptionStatus: 'encrypted' | 'not_encrypted' | 'partial';
  lastPrivacyReview: Date;
}