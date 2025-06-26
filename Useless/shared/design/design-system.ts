// EPA Ethics App Design System
// Based on EPA Design Guidelines and USWDS (U.S. Web Design System)

export const Colors = {
  // Primary EPA Brand Colors
  primary: {
    epaBlue: '#0066CC',
    epaDarkBlue: '#004B87',
    epaLightBlue: '#4A9EFF',
    epaSkyBlue: '#E8F4FD',
  },
  
  // Federal Government Colors (USWDS)
  government: {
    blue: '#005EA2',
    darkBlue: '#162E51',
    lightBlue: '#E7F6F8',
    red: '#D54309',
    green: '#00A91C',
    gold: '#FFBE2E',
    orange: '#FA9441',
  },

  // Semantic Colors
  semantic: {
    success: '#00A91C',
    warning: '#FFBE2E',
    error: '#D54309',
    info: '#0066CC',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    gray50: '#F8F9FA',
    gray100: '#F1F3F4',
    gray200: '#E8EAED',
    gray300: '#DADCE0',
    gray400: '#BDC1C6',
    gray500: '#9AA0A6',
    gray600: '#80868B',
    gray700: '#5F6368',
    gray800: '#3C4043',
    gray900: '#202124',
    black: '#000000',
  },

  // Accessibility Colors (WCAG AA Compliant)
  accessible: {
    text: '#202124',
    textSecondary: '#5F6368',
    textMuted: '#80868B',
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    border: '#DADCE0',
    focus: '#1A73E8',
    error: '#D93025',
    success: '#137333',
  },

  // High Contrast Theme
  highContrast: {
    background: '#000000',
    surface: '#1F1F1F',
    text: '#FFFFFF',
    textSecondary: '#E8EAED',
    primary: '#8AB4F8',
    error: '#F28B82',
    success: '#81C995',
    warning: '#FDD663',
  },
};

export const Typography = {
  // Font Families
  fonts: {
    primary: 'Source Sans Pro', // EPA preferred font
    secondary: 'Merriweather', // For headings
    monospace: 'Roboto Mono',
    fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // Font Sizes (responsive scale)
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Font Weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Text Styles for Different Use Cases
  styles: {
    h1: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.25,
      fontFamily: 'Merriweather',
    },
    h2: {
      fontSize: 30,
      fontWeight: 600,
      lineHeight: 1.3,
      fontFamily: 'Merriweather',
    },
    h3: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.35,
      fontFamily: 'Source Sans Pro',
    },
    h4: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.4,
      fontFamily: 'Source Sans Pro',
    },
    body: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: 'Source Sans Pro',
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: 'Source Sans Pro',
    },
    caption: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.4,
      fontFamily: 'Source Sans Pro',
    },
    button: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1,
      fontFamily: 'Source Sans Pro',
    },
  },
};

export const Spacing = {
  // Base spacing unit (4px)
  base: 4,
  
  // Spacing scale
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,

  // Component-specific spacing
  component: {
    buttonPadding: 12,
    inputPadding: 12,
    cardPadding: 16,
    sectionPadding: 24,
    screenPadding: 20,
  },
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const Shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const Breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export const Layout = {
  // Container max widths
  containers: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // Grid system
  grid: {
    columns: 12,
    gutter: 16,
  },

  // Touch targets (minimum 44px for accessibility)
  touchTargets: {
    minimum: 44,
    comfortable: 48,
    large: 56,
  },
};

export const Animations = {
  // Durations
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },

  // Easing curves
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    custom: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Common animations
  transitions: {
    default: 'all 250ms ease-in-out',
    color: 'color 150ms ease-in-out',
    background: 'background-color 150ms ease-in-out',
    border: 'border-color 150ms ease-in-out',
    transform: 'transform 250ms ease-in-out',
    opacity: 'opacity 250ms ease-in-out',
  },
};

export const ComponentStyles = {
  // Button variants
  buttons: {
    primary: {
      backgroundColor: Colors.primary.epaBlue,
      color: Colors.neutral.white,
      borderRadius: BorderRadius.base,
      padding: `${Spacing.component.buttonPadding}px ${Spacing.lg}px`,
      fontSize: Typography.styles.button.fontSize,
      fontWeight: Typography.styles.button.fontWeight,
      minHeight: Layout.touchTargets.comfortable,
    },
    secondary: {
      backgroundColor: 'transparent',
      color: Colors.primary.epaBlue,
      borderColor: Colors.primary.epaBlue,
      borderWidth: 2,
      borderRadius: BorderRadius.base,
      padding: `${Spacing.component.buttonPadding}px ${Spacing.lg}px`,
      fontSize: Typography.styles.button.fontSize,
      fontWeight: Typography.styles.button.fontWeight,
      minHeight: Layout.touchTargets.comfortable,
    },
    success: {
      backgroundColor: Colors.semantic.success,
      color: Colors.neutral.white,
      borderRadius: BorderRadius.base,
      padding: `${Spacing.component.buttonPadding}px ${Spacing.lg}px`,
      fontSize: Typography.styles.button.fontSize,
      fontWeight: Typography.styles.button.fontWeight,
      minHeight: Layout.touchTargets.comfortable,
    },
    danger: {
      backgroundColor: Colors.semantic.error,
      color: Colors.neutral.white,
      borderRadius: BorderRadius.base,
      padding: `${Spacing.component.buttonPadding}px ${Spacing.lg}px`,
      fontSize: Typography.styles.button.fontSize,
      fontWeight: Typography.styles.button.fontWeight,
      minHeight: Layout.touchTargets.comfortable,
    },
  },

  // Input styles
  inputs: {
    default: {
      backgroundColor: Colors.neutral.white,
      borderColor: Colors.neutral.gray300,
      borderWidth: 1,
      borderRadius: BorderRadius.base,
      padding: Spacing.component.inputPadding,
      fontSize: Typography.sizes.base,
      color: Colors.accessible.text,
      minHeight: Layout.touchTargets.comfortable,
    },
    focused: {
      borderColor: Colors.primary.epaBlue,
      boxShadow: `0 0 0 3px ${Colors.primary.epaSkyBlue}`,
    },
    error: {
      borderColor: Colors.semantic.error,
      boxShadow: `0 0 0 3px rgba(213, 67, 9, 0.1)`,
    },
  },

  // Card styles
  cards: {
    default: {
      backgroundColor: Colors.neutral.white,
      borderRadius: BorderRadius.md,
      padding: Spacing.component.cardPadding,
      boxShadow: Shadows.base,
      borderWidth: 1,
      borderColor: Colors.neutral.gray200,
    },
    elevated: {
      backgroundColor: Colors.neutral.white,
      borderRadius: BorderRadius.md,
      padding: Spacing.component.cardPadding,
      boxShadow: Shadows.lg,
    },
  },
};

export const AccessibilityFeatures = {
  // Focus styles
  focus: {
    outline: `3px solid ${Colors.primary.epaBlue}`,
    outlineOffset: 2,
  },

  // Screen reader only content
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },

  // High contrast adjustments
  highContrastAdjustments: {
    forcedColors: 'active',
    outline: '2px solid',
    outlineOffset: '2px',
  },

  // Motion preferences
  reducedMotion: {
    animation: 'none',
    transition: 'none',
  },
};

export const EPABranding = {
  // EPA Logo specifications
  logo: {
    primary: '/assets/epa-logo-primary.svg',
    white: '/assets/epa-logo-white.svg',
    horizontal: '/assets/epa-logo-horizontal.svg',
    minWidth: 120,
    maxWidth: 240,
  },

  // EPA Seal specifications
  seal: {
    standard: '/assets/epa-seal.svg',
    minSize: 60,
    maxSize: 120,
  },

  // Official EPA Colors
  officialColors: {
    blue: '#0066CC',
    green: '#00A91C',
    navy: '#162E51',
    gray: '#5B616B',
  },

  // Typography hierarchy for EPA documents
  documentStyles: {
    title: {
      fontFamily: 'Merriweather',
      fontSize: 36,
      fontWeight: 700,
      color: Colors.primary.epaBlue,
      marginBottom: Spacing['2xl'],
    },
    subtitle: {
      fontFamily: 'Source Sans Pro',
      fontSize: 24,
      fontWeight: 600,
      color: Colors.neutral.gray700,
      marginBottom: Spacing.lg,
    },
    sectionHeader: {
      fontFamily: 'Source Sans Pro',
      fontSize: 20,
      fontWeight: 600,
      color: Colors.primary.epaBlue,
      marginBottom: Spacing.md,
      borderBottom: `2px solid ${Colors.primary.epaBlue}`,
      paddingBottom: Spacing.sm,
    },
  },
};

// Theme definitions
export const Themes = {
  light: {
    colors: {
      background: Colors.neutral.white,
      surface: Colors.neutral.gray50,
      text: Colors.accessible.text,
      textSecondary: Colors.accessible.textSecondary,
      primary: Colors.primary.epaBlue,
      border: Colors.accessible.border,
    },
  },
  dark: {
    colors: {
      background: Colors.neutral.gray900,
      surface: Colors.neutral.gray800,
      text: Colors.neutral.white,
      textSecondary: Colors.neutral.gray300,
      primary: Colors.primary.epaLightBlue,
      border: Colors.neutral.gray600,
    },
  },
  highContrast: {
    colors: {
      background: Colors.highContrast.background,
      surface: Colors.highContrast.surface,
      text: Colors.highContrast.text,
      textSecondary: Colors.highContrast.textSecondary,
      primary: Colors.highContrast.primary,
      border: Colors.highContrast.text,
    },
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Breakpoints,
  Layout,
  Animations,
  ComponentStyles,
  AccessibilityFeatures,
  EPABranding,
  Themes,
};