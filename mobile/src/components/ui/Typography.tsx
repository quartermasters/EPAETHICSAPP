import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { Colors, Typography as TypographySystem } from '../../../shared/design/design-system';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodyLarge' | 'caption' | 'button' | 'label';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' | 'white';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  italic?: boolean;
  underline?: boolean;
  numberOfLines?: number;
  style?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'text' | 'header' | 'button' | 'label';
  testID?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight,
  italic = false,
  underline = false,
  numberOfLines,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'text',
  testID,
}) => {
  const getTextStyle = (): TextStyle[] => {
    const baseStyle = [styles.base];
    
    // Add variant styles
    baseStyle.push(styles[variant]);
    
    // Add color styles
    baseStyle.push(styles[`${color}Color`]);
    
    // Add alignment
    baseStyle.push({ textAlign: align });
    
    // Add weight if specified (overrides variant weight)
    if (weight) {
      baseStyle.push({ fontWeight: TypographySystem.weights[weight] as any });
    }
    
    // Add italic style
    if (italic) {
      baseStyle.push(styles.italic);
    }
    
    // Add underline style
    if (underline) {
      baseStyle.push(styles.underline);
    }
    
    // Add custom styles
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getAccessibilityRole = () => {
    if (accessibilityRole !== 'text') {
      return accessibilityRole;
    }
    
    // Auto-assign roles based on variant
    if (variant.startsWith('h')) {
      return 'header';
    }
    
    return 'text';
  };

  return (
    <Text
      style={getTextStyle()}
      numberOfLines={numberOfLines}
      accessible={true}
      accessibilityRole={getAccessibilityRole()}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: TypographySystem.fonts.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  // Variant styles
  h1: {
    fontSize: TypographySystem.styles.h1.fontSize,
    fontWeight: TypographySystem.styles.h1.fontWeight as any,
    lineHeight: TypographySystem.styles.h1.fontSize * TypographySystem.styles.h1.lineHeight,
    fontFamily: TypographySystem.styles.h1.fontFamily,
    marginBottom: 24,
  },
  
  h2: {
    fontSize: TypographySystem.styles.h2.fontSize,
    fontWeight: TypographySystem.styles.h2.fontWeight as any,
    lineHeight: TypographySystem.styles.h2.fontSize * TypographySystem.styles.h2.lineHeight,
    fontFamily: TypographySystem.styles.h2.fontFamily,
    marginBottom: 20,
  },
  
  h3: {
    fontSize: TypographySystem.styles.h3.fontSize,
    fontWeight: TypographySystem.styles.h3.fontWeight as any,
    lineHeight: TypographySystem.styles.h3.fontSize * TypographySystem.styles.h3.lineHeight,
    fontFamily: TypographySystem.styles.h3.fontFamily,
    marginBottom: 16,
  },
  
  h4: {
    fontSize: TypographySystem.styles.h4.fontSize,
    fontWeight: TypographySystem.styles.h4.fontWeight as any,
    lineHeight: TypographySystem.styles.h4.fontSize * TypographySystem.styles.h4.lineHeight,
    fontFamily: TypographySystem.styles.h4.fontFamily,
    marginBottom: 12,
  },
  
  h5: {
    fontSize: TypographySystem.sizes.lg,
    fontWeight: TypographySystem.weights.semibold as any,
    lineHeight: TypographySystem.sizes.lg * TypographySystem.lineHeights.normal,
    marginBottom: 12,
  },
  
  h6: {
    fontSize: TypographySystem.sizes.base,
    fontWeight: TypographySystem.weights.semibold as any,
    lineHeight: TypographySystem.sizes.base * TypographySystem.lineHeights.normal,
    marginBottom: 8,
  },
  
  body: {
    fontSize: TypographySystem.styles.body.fontSize,
    fontWeight: TypographySystem.styles.body.fontWeight as any,
    lineHeight: TypographySystem.styles.body.fontSize * TypographySystem.styles.body.lineHeight,
    fontFamily: TypographySystem.styles.body.fontFamily,
  },
  
  bodyLarge: {
    fontSize: TypographySystem.styles.bodyLarge.fontSize,
    fontWeight: TypographySystem.styles.bodyLarge.fontWeight as any,
    lineHeight: TypographySystem.styles.bodyLarge.fontSize * TypographySystem.styles.bodyLarge.lineHeight,
    fontFamily: TypographySystem.styles.bodyLarge.fontFamily,
  },
  
  caption: {
    fontSize: TypographySystem.styles.caption.fontSize,
    fontWeight: TypographySystem.styles.caption.fontWeight as any,
    lineHeight: TypographySystem.styles.caption.fontSize * TypographySystem.styles.caption.lineHeight,
    fontFamily: TypographySystem.styles.caption.fontFamily,
  },
  
  button: {
    fontSize: TypographySystem.styles.button.fontSize,
    fontWeight: TypographySystem.styles.button.fontWeight as any,
    lineHeight: TypographySystem.styles.button.fontSize * TypographySystem.styles.button.lineHeight,
    fontFamily: TypographySystem.styles.button.fontFamily,
  },
  
  label: {
    fontSize: TypographySystem.sizes.sm,
    fontWeight: TypographySystem.weights.medium as any,
    lineHeight: TypographySystem.sizes.sm * TypographySystem.lineHeights.normal,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Color variants
  primaryColor: {
    color: Colors.accessible.text,
  },
  
  secondaryColor: {
    color: Colors.accessible.textSecondary,
  },
  
  mutedColor: {
    color: Colors.accessible.textMuted,
  },
  
  errorColor: {
    color: Colors.semantic.error,
  },
  
  successColor: {
    color: Colors.semantic.success,
  },
  
  warningColor: {
    color: Colors.semantic.warning,
  },
  
  whiteColor: {
    color: Colors.neutral.white,
  },
  
  // Style modifiers
  italic: {
    fontStyle: 'italic',
  },
  
  underline: {
    textDecorationLine: 'underline',
  },
});

export default Typography;