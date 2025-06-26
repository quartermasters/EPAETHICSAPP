// St. Michael Enterprises LLC Branding Integration
// For EPA Ethics App Development - Contract 68HERD25Q0050

export const StMichaelBranding = {
  // Company Information
  company: {
    legalName: 'St. Michael Enterprises LLC',
    tradeName: 'St. Michael LLC',
    businessType: 'Small Business Enterprise',
    naicsCode: '513210',
    capabilities: [
      'Federal Software Development',
      'Section 508 Accessibility Compliance',
      'FedRAMP Security Implementation',
      'Mobile Application Development',
      'Government IT Consulting'
    ],
  },

  // Contract Information
  contract: {
    solicitationNumber: '68HERD25Q0050',
    client: 'U.S. Environmental Protection Agency',
    contractType: 'Total Small Business Set-Aside',
    pscCode: '7A20',
    projectTitle: 'EPA Ethics Mobile App Development - EthicsGo',
  },

  // St. Michael Brand Colors (from logo analysis)
  colors: {
    // Primary Brand Colors
    navyBlue: '#1B365D',        // Main brand color from logo
    burgundy: '#A51C30',        // Secondary brand color from logo
    white: '#FFFFFF',           // Background/text color
    
    // Extended Palette
    lightNavy: '#2C4A6B',       // Lighter shade of navy
    darkNavy: '#0F1F30',        // Darker shade of navy
    lightBurgundy: '#B8253E',   // Lighter shade of burgundy
    darkBurgundy: '#7A1525',    // Darker shade of burgundy
    
    // Neutral Supporting Colors
    lightGray: '#F5F5F5',       // Light backgrounds
    mediumGray: '#CCCCCC',      // Borders and dividers
    darkGray: '#666666',        // Secondary text
    charcoal: '#333333',        // Primary text
  },

  // Logo Specifications
  logo: {
    primaryLogo: '/assets/st-michael-logo-primary.png',
    whiteLogo: '/assets/st-michael-logo-white.png',
    iconOnly: '/assets/st-michael-icon.png',
    
    // Logo Usage Guidelines
    minWidth: 80,               // Minimum width in pixels
    maxWidth: 200,              // Maximum width in pixels
    clearSpace: 16,             // Minimum clear space around logo
    
    // Color Variations
    versions: {
      fullColor: 'Use on white or light backgrounds',
      white: 'Use on dark backgrounds',
      navy: 'Single color version for navy backgrounds',
      burgundy: 'Single color version for burgundy backgrounds',
    },
  },

  // Typography Recommendations
  typography: {
    primary: 'Source Sans Pro',     // Clean, professional, government-appropriate
    secondary: 'Merriweather',      // For headings and emphasis
    monospace: 'Roboto Mono',       // For code and technical content
    
    // Font weights
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Professional Styling Guidelines
  design: {
    // Design principles aligned with federal work
    principles: [
      'Clean and Professional',
      'Accessible and Inclusive',
      'Trustworthy and Reliable',
      'Government-Appropriate',
      'User-Centered Design'
    ],
    
    // Border radius for consistency
    borderRadius: {
      small: 4,
      medium: 6,
      large: 8,
      circle: 50,
    },
    
    // Spacing system
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    
    // Shadows for depth
    shadows: {
      subtle: '0 1px 3px rgba(27, 54, 93, 0.1)',
      medium: '0 4px 6px rgba(27, 54, 93, 0.15)',
      strong: '0 8px 16px rgba(27, 54, 93, 0.2)',
    },
  },

  // Component Styling with St. Michael Branding
  components: {
    // Primary buttons using St. Michael navy
    primaryButton: {
      backgroundColor: '#1B365D',
      color: '#FFFFFF',
      hover: '#2C4A6B',
      focus: '#0F1F30',
    },
    
    // Secondary buttons using burgundy accent
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#A51C30',
      border: '#A51C30',
      hover: '#B8253E',
    },
    
    // Professional cards
    card: {
      backgroundColor: '#FFFFFF',
      border: '#CCCCCC',
      shadow: '0 2px 4px rgba(27, 54, 93, 0.1)',
    },
    
    // Navigation elements
    navigation: {
      background: '#1B365D',
      text: '#FFFFFF',
      accent: '#A51C30',
      hover: '#2C4A6B',
    },
  },

  // Compliance and Professional Standards
  compliance: {
    accessibility: {
      colorContrast: 'WCAG AA compliant color combinations',
      focusIndicators: 'High contrast focus rings',
      screenReaderSupport: 'Full semantic markup',
    },
    
    federal: {
      section508: 'Full Section 508 compliance',
      fedramp: 'FedRAMP Low security standards',
      uswds: 'U.S. Web Design System compatibility',
    },
    
    quality: {
      codeStandards: 'Enterprise-grade code quality',
      testing: 'Comprehensive test coverage',
      documentation: 'Complete technical documentation',
      security: 'Federal security best practices',
    },
  },

  // Footer/Attribution Information
  attribution: {
    developer: 'Developed by St. Michael Enterprises LLC',
    contract: 'EPA Contract 68HERD25Q0050',
    year: '2024',
    rights: 'All rights reserved to the U.S. Environmental Protection Agency',
    
    // Footer content for apps
    footerText: 'Developed by St. Michael Enterprises LLC under EPA Contract 68HERD25Q0050',
    copyrightText: '© 2024 U.S. Environmental Protection Agency. All rights reserved.',
    
    // About page content
    aboutText: `This application was developed by St. Michael Enterprises LLC, a small business specializing in federal IT solutions, under EPA solicitation 68HERD25Q0050. St. Michael LLC is committed to delivering high-quality, accessible, and secure software solutions for government agencies.`,
  },

  // Contact Information (Template)
  contact: {
    companyName: 'St. Michael Enterprises LLC',
    email: 'contact@stmichaelenterprises.com',
    website: 'www.stmichaelenterprises.com',
    supportEmail: 'support@stmichaelenterprises.com',
    
    // For emergency/critical issues
    emergencyContact: {
      phone: '[Emergency Phone Number]',
      email: 'emergency@stmichaelenterprises.com',
      response: '24-hour response for critical issues',
    },
  },
};

export default StMichaelBranding;