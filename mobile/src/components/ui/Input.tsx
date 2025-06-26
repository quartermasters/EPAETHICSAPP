import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Layout } from '../../design/design-system';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  testID?: string;
}

const Input = forwardRef<TextInput, InputProps>(({
  label,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'default',
  size = 'medium',
  disabled = false,
  required = false,
  multiline = false,
  secureTextEntry = false,
  showPasswordToggle = false,
  containerStyle,
  inputStyle,
  testID,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const getContainerStyle = () => {
    const baseStyle = [styles.container];
    
    if (containerStyle) {
      baseStyle.push(containerStyle);
    }
    
    return baseStyle;
  };

  const getInputContainerStyle = () => {
    const baseStyle = [styles.inputContainer, styles[variant], styles[size]];
    
    if (isFocused) {
      baseStyle.push(styles.focused);
    }
    
    if (error) {
      baseStyle.push(styles.error);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabled);
    }
    
    return baseStyle;
  };

  const getInputStyle = () => {
    const baseStyle = [styles.input, styles[`${size}Input`]];
    
    if (multiline) {
      baseStyle.push(styles.multilineInput);
    }
    
    if (inputStyle) {
      baseStyle.push(inputStyle);
    }
    
    return baseStyle;
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    
    return (
      <View style={styles.leftIconContainer}>
        <Ionicons
          name={leftIcon}
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
          color={error ? Colors.semantic.error : isFocused ? Colors.primary.epaBlue : Colors.neutral.gray500}
        />
      </View>
    );
  };

  const renderRightIcon = () => {
    if (showPasswordToggle && secureTextEntry) {
      return (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={handlePasswordToggle}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            color={Colors.neutral.gray500}
          />
        </TouchableOpacity>
      );
    }
    
    if (!rightIcon) return null;
    
    const IconComponent = onRightIconPress ? TouchableOpacity : View;
    
    return (
      <IconComponent
        style={styles.rightIconContainer}
        onPress={onRightIconPress}
        accessible={onRightIconPress ? true : false}
        accessibilityRole={onRightIconPress ? 'button' : 'none'}
      >
        <Ionicons
          name={rightIcon}
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
          color={error ? Colors.semantic.error : isFocused ? Colors.primary.epaBlue : Colors.neutral.gray500}
        />
      </IconComponent>
    );
  };

  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
    );
  };

  const renderHelperText = () => {
    if (error) {
      return (
        <Text
          style={styles.errorText}
          accessible={true}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      );
    }
    
    if (helperText) {
      return <Text style={styles.helperText}>{helperText}</Text>;
    }
    
    return null;
  };

  return (
    <View style={getContainerStyle()}>
      {renderLabel()}
      
      <View style={getInputContainerStyle()}>
        {renderLeftIcon()}
        
        <TextInput
          ref={ref}
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral.gray400}
          editable={!disabled}
          multiline={multiline}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessible={true}
          accessibilityLabel={label || placeholder}
          accessibilityHint={helperText}
          accessibilityState={{
            disabled,
            required,
          }}
          testID={testID}
          {...props}
        />
        
        {renderRightIcon()}
      </View>
      
      {renderHelperText()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  
  label: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium as any,
    color: Colors.accessible.text,
    marginBottom: Spacing.sm,
    fontFamily: Typography.fonts.primary,
  },
  
  required: {
    color: Colors.semantic.error,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.base,
    borderWidth: 1,
  },
  
  // Variant styles
  default: {
    backgroundColor: Colors.neutral.white,
    borderColor: Colors.neutral.gray300,
  },
  
  filled: {
    backgroundColor: Colors.neutral.gray50,
    borderColor: 'transparent',
  },
  
  outlined: {
    backgroundColor: 'transparent',
    borderColor: Colors.neutral.gray300,
    borderWidth: 2,
  },
  
  // Size variants
  small: {
    minHeight: 36,
    paddingHorizontal: Spacing.md,
  },
  
  medium: {
    minHeight: Layout.touchTargets.comfortable,
    paddingHorizontal: Spacing.lg,
  },
  
  large: {
    minHeight: Layout.touchTargets.large,
    paddingHorizontal: Spacing.xl,
  },
  
  // State styles
  focused: {
    borderColor: Colors.primary.epaBlue,
    shadowColor: Colors.primary.epaBlue,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  
  error: {
    borderColor: Colors.semantic.error,
    shadowColor: Colors.semantic.error,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  
  disabled: {
    backgroundColor: Colors.neutral.gray100,
    borderColor: Colors.neutral.gray200,
    opacity: 0.6,
  },
  
  // Input styles
  input: {
    flex: 1,
    fontFamily: Typography.fonts.primary,
    color: Colors.accessible.text,
    paddingVertical: 0,
  },
  
  smallInput: {
    fontSize: Typography.sizes.sm,
  },
  
  mediumInput: {
    fontSize: Typography.sizes.base,
  },
  
  largeInput: {
    fontSize: Typography.sizes.lg,
  },
  
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingVertical: Spacing.md,
  },
  
  // Icon containers
  leftIconContainer: {
    marginRight: Spacing.md,
  },
  
  rightIconContainer: {
    marginLeft: Spacing.md,
    padding: Spacing.xs,
  },
  
  // Helper text styles
  helperText: {
    fontSize: Typography.sizes.sm,
    color: Colors.accessible.textSecondary,
    marginTop: Spacing.sm,
    fontFamily: Typography.fonts.primary,
  },
  
  errorText: {
    fontSize: Typography.sizes.sm,
    color: Colors.semantic.error,
    marginTop: Spacing.sm,
    fontFamily: Typography.fonts.primary,
  },
});

Input.displayName = 'Input';

export default Input;