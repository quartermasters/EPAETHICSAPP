import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, EPABranding } from '../../../shared/design/design-system';

export interface EPAHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showLogo?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel: string;
  };
  variant?: 'default' | 'branded' | 'minimal';
  accessibilityLabel?: string;
}

const EPAHeader: React.FC<EPAHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  showLogo = true,
  rightAction,
  variant = 'default',
  accessibilityLabel,
}) => {
  const renderLogo = () => {
    if (!showLogo) return null;
    
    return (
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>EPA</Text>
        </View>
        {variant === 'branded' && (
          <Text style={styles.logoSubtext}>U.S. Environmental Protection Agency</Text>
        )}
      </View>
    );
  };

  const renderBackButton = () => {
    if (!showBackButton) return null;
    
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        accessibilityHint="Navigate to previous screen"
      >
        <Ionicons name="arrow-back" size={24} color={Colors.neutral.white} />
      </TouchableOpacity>
    );
  };

  const renderTitle = () => {
    if (!title && !subtitle) return null;
    
    return (
      <View style={styles.titleContainer}>
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  const renderRightAction = () => {
    if (!rightAction) return null;
    
    return (
      <TouchableOpacity
        style={styles.rightAction}
        onPress={rightAction.onPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={rightAction.accessibilityLabel}
      >
        <Ionicons name={rightAction.icon} size={24} color={Colors.neutral.white} />
      </TouchableOpacity>
    );
  };

  const getHeaderStyle = () => {
    const baseStyle = [styles.header];
    
    switch (variant) {
      case 'branded':
        baseStyle.push(styles.brandedHeader);
        break;
      case 'minimal':
        baseStyle.push(styles.minimalHeader);
        break;
      default:
        baseStyle.push(styles.defaultHeader);
        break;
    }
    
    return baseStyle;
  };

  return (
    <SafeAreaView style={getHeaderStyle()}>
      <View
        style={styles.content}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel={accessibilityLabel || `EPA Ethics App ${title ? `- ${title}` : ''}`}
      >
        {/* Left Section */}
        <View style={styles.leftSection}>
          {renderBackButton()}
          {renderLogo()}
        </View>

        {/* Center Section */}
        {renderTitle()}

        {/* Right Section */}
        <View style={styles.rightSection}>
          {renderRightAction()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary.epaBlue,
  },
  
  defaultHeader: {
    paddingBottom: Spacing.md,
  },
  
  brandedHeader: {
    paddingBottom: Spacing.lg,
  },
  
  minimalHeader: {
    paddingBottom: Spacing.sm,
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    minHeight: 56,
  },
  
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 40,
  },
  
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.md,
    marginLeft: -Spacing.sm,
  },
  
  logoContainer: {
    alignItems: 'center',
  },
  
  logoPlaceholder: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  
  logoText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold as any,
    color: Colors.primary.epaBlue,
    fontFamily: Typography.fonts.secondary,
    letterSpacing: 1,
  },
  
  logoSubtext: {
    fontSize: Typography.sizes.xs,
    color: Colors.neutral.white,
    fontFamily: Typography.fonts.primary,
    textAlign: 'center',
    opacity: 0.9,
  },
  
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold as any,
    color: Colors.neutral.white,
    fontFamily: Typography.fonts.primary,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.neutral.white,
    fontFamily: Typography.fonts.primary,
    textAlign: 'center',
    opacity: 0.9,
    marginTop: Spacing.xs,
  },
  
  rightAction: {
    padding: Spacing.sm,
  },
});

export default EPAHeader;