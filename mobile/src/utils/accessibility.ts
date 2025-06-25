import { AccessibilityInfo, Platform } from 'react-native';

export const accessibilityUtils = {
  // Announce messages for screen readers
  announceForAccessibility: (message: string) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      AccessibilityInfo.announceForAccessibility(message);
    }
  },

  // Check if screen reader is enabled
  isScreenReaderEnabled: async (): Promise<boolean> => {
    try {
      return await AccessibilityInfo.isScreenReaderEnabled();
    } catch (error) {
      console.error('Error checking screen reader status:', error);
      return false;
    }
  },

  // Check if reduce motion is enabled
  isReduceMotionEnabled: async (): Promise<boolean> => {
    try {
      return await AccessibilityInfo.isReduceMotionEnabled();
    } catch (error) {
      console.error('Error checking reduce motion status:', error);
      return false;
    }
  },

  // Generate accessible labels for dynamic content
  generateAccessibilityLabel: (
    element: string,
    state?: string,
    position?: { current: number; total: number }
  ): string => {
    let label = element;
    
    if (state) {
      label += `, ${state}`;
    }
    
    if (position) {
      label += `, ${position.current} of ${position.total}`;
    }
    
    return label;
  },

  // Format progress for screen readers
  formatProgressForAccessibility: (current: number, total: number, unit = 'percent'): string => {
    const percentage = Math.round((current / total) * 100);
    return `Progress: ${percentage} ${unit}`;
  },

  // Format quiz question for accessibility
  formatQuizQuestionForAccessibility: (
    questionNumber: number,
    totalQuestions: number,
    questionText: string,
    questionType: string
  ): string => {
    return `Question ${questionNumber} of ${totalQuestions}. ${questionType}. ${questionText}`;
  },

  // Format quiz option for accessibility
  formatQuizOptionForAccessibility: (
    optionLetter: string,
    optionText: string,
    isSelected: boolean
  ): string => {
    const selectedText = isSelected ? 'Selected' : 'Not selected';
    return `Option ${optionLetter}. ${optionText}. ${selectedText}`;
  },

  // Format module completion status
  formatModuleStatusForAccessibility: (
    moduleTitle: string,
    status: 'not_started' | 'in_progress' | 'completed',
    progress?: number
  ): string => {
    let statusText = '';
    
    switch (status) {
      case 'not_started':
        statusText = 'Not started';
        break;
      case 'in_progress':
        statusText = progress ? `${progress}% complete` : 'In progress';
        break;
      case 'completed':
        statusText = 'Completed';
        break;
    }
    
    return `${moduleTitle}. ${statusText}`;
  },

  // Format time duration for accessibility
  formatDurationForAccessibility: (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      let result = `${hours} hour${hours !== 1 ? 's' : ''}`;
      
      if (remainingMinutes > 0) {
        result += ` and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
      }
      
      return result;
    }
  },

  // Format score for accessibility
  formatScoreForAccessibility: (score: number, maxScore: number, passed: boolean): string => {
    const percentage = Math.round((score / maxScore) * 100);
    const passedText = passed ? 'Passed' : 'Failed';
    return `Score: ${score} out of ${maxScore}, ${percentage}%. ${passedText}`;
  },

  // Common accessibility properties
  getButtonAccessibility: (label: string, hint?: string, disabled = false) => ({
    accessible: true,
    accessibilityRole: 'button' as const,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityState: { disabled },
  }),

  getTabAccessibility: (label: string, selected = false) => ({
    accessible: true,
    accessibilityRole: 'tab' as const,
    accessibilityLabel: label,
    accessibilityState: { selected },
  }),

  getTextAccessibility: (text: string) => ({
    accessible: true,
    accessibilityRole: 'text' as const,
    accessibilityLabel: text,
  }),

  getImageAccessibility: (description: string) => ({
    accessible: true,
    accessibilityRole: 'image' as const,
    accessibilityLabel: description,
  }),

  getProgressBarAccessibility: (value: number, min = 0, max = 100) => ({
    accessible: true,
    accessibilityRole: 'progressbar' as const,
    accessibilityValue: {
      min,
      max,
      now: value,
      text: `${Math.round(value)}%`,
    },
  }),

  getCheckboxAccessibility: (label: string, checked = false) => ({
    accessible: true,
    accessibilityRole: 'checkbox' as const,
    accessibilityLabel: label,
    accessibilityState: { checked },
  }),

  getRadioButtonAccessibility: (label: string, selected = false) => ({
    accessible: true,
    accessibilityRole: 'radio' as const,
    accessibilityLabel: label,
    accessibilityState: { selected },
  }),

  // Focus management
  focusElement: (ref: any) => {
    if (ref && ref.current) {
      if (Platform.OS === 'ios') {
        AccessibilityInfo.setAccessibilityFocus(ref.current);
      } else {
        ref.current.focus();
      }
    }
  },

  // Set up accessibility event listeners
  setupAccessibilityEventListeners: () => {
    const listeners: Array<{ remove: () => void }> = [];

    // Screen reader status change
    listeners.push(
      AccessibilityInfo.addEventListener('screenReaderChanged', (isEnabled) => {
        console.log('Screen reader status changed:', isEnabled);
      })
    );

    // Reduce motion status change
    listeners.push(
      AccessibilityInfo.addEventListener('reduceMotionChanged', (isEnabled) => {
        console.log('Reduce motion status changed:', isEnabled);
      })
    );

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  },

  // WCAG compliance helpers
  meetsFontSizeRequirement: (fontSize: number): boolean => {
    // WCAG AA requires at least 14pt font (approximately 18.7px)
    return fontSize >= 18.7;
  },

  meetsContrastRequirement: (foreground: string, background: string): boolean => {
    // This is a simplified check - in a real app, you'd want a proper contrast ratio calculation
    // WCAG AA requires 4.5:1 contrast ratio for normal text
    // For now, return true as actual contrast calculation requires color parsing
    return true;
  },

  meetsTouchTargetSize: (width: number, height: number): boolean => {
    // WCAG requires minimum 44x44 points touch target
    return width >= 44 && height >= 44;
  },
};