import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  AccessibilityRole,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Layout } from '../../design/design-system';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  testID,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabledText);
    } else {
      baseStyle.push(styles[`${variant}Text`]);
    }
    
    return baseStyle;
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconColor = disabled || loading 
      ? Colors.neutral.gray400 
      : variant === 'primary' || variant === 'success' || variant === 'danger'
        ? Colors.neutral.white
        : Colors.primary.epaBlue;
    
    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    
    return (
      <Ionicons 
        name={icon} 
        size={iconSize} 
        color={iconColor}
        style={iconPosition === 'right' ? styles.iconRight : styles.iconLeft}
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' || variant === 'success' || variant === 'danger' 
              ? Colors.neutral.white 
              : Colors.primary.epaBlue
            } 
          />
          <Text style={[getTextStyle(), styles.loadingText]}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        {icon && iconPosition === 'left' && renderIcon()}
        <Text style={getTextStyle()}>{title}</Text>
        {icon && iconPosition === 'right' && renderIcon()}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ 
        disabled: disabled || loading,
        busy: loading 
      }}
      testID={testID}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Size variants
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: Layout.touchTargets.comfortable,
  },
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: Layout.touchTargets.large,
  },
  
  // Style variants
  primary: {
    backgroundColor: Colors.primary.epaBlue,
    borderColor: Colors.primary.epaBlue,
  },
  secondary: {
    backgroundColor: Colors.neutral.gray100,
    borderColor: Colors.neutral.gray300,
  },
  success: {
    backgroundColor: Colors.semantic.success,
    borderColor: Colors.semantic.success,
  },
  danger: {
    backgroundColor: Colors.semantic.error,
    borderColor: Colors.semantic.error,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary.epaBlue,
    borderWidth: 2,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  
  // Disabled state
  disabled: {
    backgroundColor: Colors.neutral.gray200,
    borderColor: Colors.neutral.gray300,
  },
  
  // Full width
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    fontFamily: Typography.fonts.primary,
    fontWeight: Typography.weights.semibold,
    textAlign: 'center',
  },
  
  // Text size variants
  smallText: {
    fontSize: Typography.sizes.sm,
  },
  mediumText: {
    fontSize: Typography.sizes.base,
  },
  largeText: {
    fontSize: Typography.sizes.lg,
  },
  
  // Text color variants
  primaryText: {
    color: Colors.neutral.white,
  },
  secondaryText: {
    color: Colors.neutral.gray700,
  },
  successText: {
    color: Colors.neutral.white,
  },
  dangerText: {
    color: Colors.neutral.white,
  },
  outlineText: {
    color: Colors.primary.epaBlue,
  },
  ghostText: {
    color: Colors.primary.epaBlue,
  },
  
  // Disabled text
  disabledText: {
    color: Colors.neutral.gray400,
  },
  
  // Content and loading
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: Spacing.sm,
  },
  
  // Icon styles
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});

export default Button;