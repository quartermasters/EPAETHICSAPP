import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../../design/design-system';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  onPress,
  disabled = false,
  style,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) => {
  const getCardStyle = (): ViewStyle[] => {
    const baseStyle = [styles.card];
    
    // Add variant styles
    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.elevated);
        break;
      case 'outlined':
        baseStyle.push(styles.outlined);
        break;
      case 'filled':
        baseStyle.push(styles.filled);
        break;
      default:
        baseStyle.push(styles.default);
        break;
    }
    
    // Add padding styles
    switch (padding) {
      case 'none':
        break;
      case 'small':
        baseStyle.push(styles.paddingSmall);
        break;
      case 'large':
        baseStyle.push(styles.paddingLarge);
        break;
      default:
        baseStyle.push(styles.paddingMedium);
        break;
    }
    
    // Add disabled style if needed
    if (disabled) {
      baseStyle.push(styles.disabled);
    }
    
    // Add custom styles
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={getCardStyle()}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      testID={testID}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.neutral.white,
  },
  
  // Variant styles
  default: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    shadowColor: Colors.neutral.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  elevated: {
    shadowColor: Colors.neutral.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  
  outlined: {
    borderWidth: 2,
    borderColor: Colors.primary.epaBlue,
    backgroundColor: Colors.neutral.white,
  },
  
  filled: {
    backgroundColor: Colors.primary.epaSkyBlue,
    borderWidth: 1,
    borderColor: Colors.primary.epaLightBlue,
  },
  
  // Padding variants
  paddingSmall: {
    padding: Spacing.md,
  },
  
  paddingMedium: {
    padding: Spacing.lg,
  },
  
  paddingLarge: {
    padding: Spacing.xl,
  },
  
  // State styles
  disabled: {
    opacity: 0.6,
    backgroundColor: Colors.neutral.gray100,
  },
});

export default Card;