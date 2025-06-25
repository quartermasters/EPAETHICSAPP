/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // EPA Brand Colors
      colors: {
        // Primary EPA Colors
        epa: {
          blue: '#0066CC',
          'dark-blue': '#004B87',
          'light-blue': '#4A9EFF',
          'sky-blue': '#E8F4FD',
        },
        
        // Federal Government Colors (USWDS)
        federal: {
          blue: '#005EA2',
          'dark-blue': '#162E51',
          'light-blue': '#E7F6F8',
          red: '#D54309',
          green: '#00A91C',
          gold: '#FFBE2E',
          orange: '#FA9441',
        },
        
        // Semantic Colors
        success: '#00A91C',
        warning: '#FFBE2E',
        error: '#D54309',
        info: '#0066CC',
        
        // Neutral Palette
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F4',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#BDC1C6',
          500: '#9AA0A6',
          600: '#80868B',
          700: '#5F6368',
          800: '#3C4043',
          900: '#202124',
        },
      },
      
      // Typography
      fontFamily: {
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
      
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
      },
      
      // Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border Radius
      borderRadius: {
        'sm': '0.25rem',
        'base': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      
      // Box Shadows
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'focus': '0 0 0 3px rgba(0, 102, 204, 0.3)',
        'error': '0 0 0 3px rgba(213, 67, 9, 0.1)',
      },
      
      // Animation
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Accessibility
      screens: {
        'reduce-motion': { 'raw': '(prefers-reduced-motion: reduce)' },
        'high-contrast': { 'raw': '(prefers-contrast: high)' },
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom plugin for accessibility utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Screen reader only
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        },
        
        // Focus visible utilities
        '.focus-visible-ring': {
          '&:focus-visible': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: theme('boxShadow.focus'),
          },
        },
        
        // High contrast utilities
        '.forced-colors-adjust': {
          'forced-color-adjust': 'auto',
        },
        
        // Touch target utilities
        '.touch-target': {
          minHeight: '44px',
          minWidth: '44px',
        },
        
        '.touch-target-lg': {
          minHeight: '48px',
          minWidth: '48px',
        },
        
        // Skip link utility
        '.skip-link': {
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: theme('colors.epa.blue'),
          color: 'white',
          padding: '8px',
          textDecoration: 'none',
          borderRadius: '4px',
          zIndex: '100',
          
          '&:focus': {
            top: '6px',
          },
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
  
  // Dark mode support
  darkMode: ['class', '[data-theme="dark"]'],
  
  // High contrast mode support
  variants: {
    extend: {
      backgroundColor: ['forced-colors'],
      textColor: ['forced-colors'],
      borderColor: ['forced-colors'],
    },
  },
};