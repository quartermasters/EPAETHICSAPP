import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../design/design-system';
import { StMichaelBranding } from '../../design/st-michael-branding';

export interface ContractorFooterProps {
  variant?: 'full' | 'minimal' | 'about';
  showLogo?: boolean;
  onContactPress?: () => void;
}

const ContractorFooter: React.FC<ContractorFooterProps> = ({
  variant = 'full',
  showLogo = false,
  onContactPress,
}) => {
  const handleContactPress = () => {
    if (onContactPress) {
      onContactPress();
    } else {
      // Default action - could open email or contact form
      Linking.openURL(`mailto:${StMichaelBranding.contact.supportEmail}?subject=EPA Ethics App Support`);
    }
  };

  const handleWebsitePress = () => {
    Linking.openURL(`https://${StMichaelBranding.contact.website}`);
  };

  const renderLogo = () => {
    if (!showLogo) return null;
    
    return (
      <View style={styles.logoContainer}>
        {/* Placeholder for St. Michael logo */}
        <View style={styles.logoPlaceholder}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>SM</Text>
          </View>
          <Text style={styles.logoCompanyText}>St. Michael Enterprises</Text>
        </View>
      </View>
    );
  };

  const renderMinimalFooter = () => (
    <View style={styles.minimalContainer}>
      <Text style={styles.minimalText}>
        {StMichaelBranding.attribution.footerText}
      </Text>
    </View>
  );

  const renderFullFooter = () => (
    <View style={styles.fullContainer}>
      {renderLogo()}
      
      <View style={styles.contentSection}>
        <Text style={styles.developerText}>
          Developed by {StMichaelBranding.company.tradeName}
        </Text>
        
        <Text style={styles.contractText}>
          EPA Contract {StMichaelBranding.contract.solicitationNumber}
        </Text>
        
        <Text style={styles.copyrightText}>
          {StMichaelBranding.attribution.copyrightText}
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Contact St. Michael Enterprises support"
          >
            <Ionicons name="mail-outline" size={16} color={StMichaelBranding.colors.navyBlue} />
            <Text style={styles.buttonText}>Contact Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.websiteButton}
            onPress={handleWebsitePress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Visit St. Michael Enterprises website"
          >
            <Ionicons name="globe-outline" size={16} color={StMichaelBranding.colors.navyBlue} />
            <Text style={styles.buttonText}>Visit Website</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderAboutFooter = () => (
    <View style={styles.aboutContainer}>
      {renderLogo()}
      
      <View style={styles.aboutContent}>
        <Text style={styles.aboutTitle}>About the Developer</Text>
        
        <Text style={styles.aboutDescription}>
          {StMichaelBranding.attribution.aboutText}
        </Text>
        
        <View style={styles.capabilitiesContainer}>
          <Text style={styles.capabilitiesTitle}>Core Capabilities:</Text>
          {StMichaelBranding.company.capabilities.map((capability, index) => (
            <View key={index} style={styles.capabilityItem}>
              <Ionicons name="checkmark-circle" size={16} color={StMichaelBranding.colors.burgundy} />
              <Text style={styles.capabilityText}>{capability}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.contractInfo}>
          <Text style={styles.contractInfoTitle}>Contract Information</Text>
          <Text style={styles.contractDetail}>
            Solicitation: {StMichaelBranding.contract.solicitationNumber}
          </Text>
          <Text style={styles.contractDetail}>
            Client: {StMichaelBranding.contract.client}
          </Text>
          <Text style={styles.contractDetail}>
            Type: {StMichaelBranding.contract.contractType}
          </Text>
        </View>
        
        <Text style={styles.copyrightText}>
          {StMichaelBranding.attribution.copyrightText}
        </Text>
      </View>
    </View>
  );

  switch (variant) {
    case 'minimal':
      return renderMinimalFooter();
    case 'about':
      return renderAboutFooter();
    default:
      return renderFullFooter();
  }
};

const styles = StyleSheet.create({
  // Minimal footer styles
  minimalContainer: {
    backgroundColor: Colors.neutral.gray50,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  
  minimalText: {
    fontSize: Typography.sizes.xs,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    fontFamily: Typography.fonts.primary,
    lineHeight: 16,
  },

  // Full footer styles
  fullContainer: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  logoPlaceholder: {
    alignItems: 'center',
  },

  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: StMichaelBranding.colors.navyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  logoText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold as any,
    color: Colors.neutral.white,
    fontFamily: Typography.fonts.primary,
  },

  logoCompanyText: {
    fontSize: Typography.sizes.sm,
    color: StMichaelBranding.colors.navyBlue,
    fontWeight: Typography.weights.medium as any,
    fontFamily: Typography.fonts.primary,
  },

  contentSection: {
    alignItems: 'center',
  },

  developerText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold as any,
    color: StMichaelBranding.colors.navyBlue,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    fontFamily: Typography.fonts.primary,
  },

  contractText: {
    fontSize: Typography.sizes.sm,
    color: StMichaelBranding.colors.burgundy,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    fontFamily: Typography.fonts.primary,
  },

  copyrightText: {
    fontSize: Typography.sizes.xs,
    color: Colors.neutral.gray600,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontFamily: Typography.fonts.primary,
    lineHeight: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: StMichaelBranding.colors.navyBlue,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 6,
  },

  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: StMichaelBranding.colors.navyBlue,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: Typography.sizes.sm,
    color: StMichaelBranding.colors.navyBlue,
    marginLeft: Spacing.sm,
    fontFamily: Typography.fonts.primary,
    fontWeight: Typography.weights.medium as any,
  },

  // About footer styles
  aboutContainer: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xl,
  },

  aboutContent: {
    marginTop: Spacing.lg,
  },

  aboutTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold as any,
    color: StMichaelBranding.colors.navyBlue,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontFamily: Typography.fonts.secondary,
  },

  aboutDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray700,
    lineHeight: 24,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    fontFamily: Typography.fonts.primary,
  },

  capabilitiesContainer: {
    marginBottom: Spacing.xl,
  },

  capabilitiesTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold as any,
    color: StMichaelBranding.colors.navyBlue,
    marginBottom: Spacing.md,
    fontFamily: Typography.fonts.primary,
  },

  capabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  capabilityText: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray700,
    marginLeft: Spacing.sm,
    fontFamily: Typography.fonts.primary,
  },

  contractInfo: {
    backgroundColor: Colors.neutral.gray50,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.xl,
  },

  contractInfoTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold as any,
    color: StMichaelBranding.colors.navyBlue,
    marginBottom: Spacing.md,
    fontFamily: Typography.fonts.primary,
  },

  contractDetail: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray700,
    marginBottom: Spacing.sm,
    fontFamily: Typography.fonts.primary,
  },
});

export default ContractorFooter;