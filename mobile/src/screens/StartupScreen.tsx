import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  AccessibilityInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../design/design-system';
import { StMichaelBranding } from '../design/st-michael-branding';

const { width, height } = Dimensions.get('window');

interface StartupScreenProps {
  onComplete: () => void;
}

const StartupScreen: React.FC<StartupScreenProps> = ({ onComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Announce for accessibility
    AccessibilityInfo.announceForAccessibility('EPA Ethics App is starting');

    // Start animations
    Animated.sequence([
      // Logo and title appear
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Wait for 8 seconds (total 10 seconds with animation)
      Animated.delay(8000),
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  }, [fadeAnim, scaleAnim, slideAnim, onComplete]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* EPA Logo and Title */}
        <Animated.View 
          style={[
            styles.logoSection,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          <Image
            source={require('../../assets/EPA_logo.svg.png')}
            style={styles.epaLogo}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel="EPA Logo - Environmental Protection Agency"
          />
          
          <Text style={styles.appTitle}>Ethics App</Text>
          <Text style={styles.appSubtitle}>Federal Ethics Awareness & Compliance</Text>
        </Animated.View>

        {/* Developer Attribution */}
        <Animated.View 
          style={[
            styles.developerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.developerContainer}>
            <View style={styles.quartermastersLogo}>
              <Text style={styles.quartermastersLogoText}>QM</Text>
            </View>
            <View style={styles.developerInfo}>
              <Text style={styles.developerTitle}>Developed by</Text>
              <Text style={styles.companyName}>{StMichaelBranding.company.developer}</Text>
              <Text style={styles.licenseInfo}>Licensed to {StMichaelBranding.company.licensee}</Text>
              <Text style={styles.contractInfo}>
                EPA Solicitation {StMichaelBranding.contract.solicitationNumber}
              </Text>
            </View>
          </View>
          
          <View style={styles.badgeContainer}>
            <View style={styles.complianceBadge}>
              <Text style={styles.badgeText}>Section 508</Text>
              <Text style={styles.badgeSubtext}>Accessible</Text>
            </View>
            <View style={styles.complianceBadge}>
              <Text style={styles.badgeText}>FedRAMP</Text>
              <Text style={styles.badgeSubtext}>Low</Text>
            </View>
          </View>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View 
          style={[
            styles.loadingSection,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.loadingBar}>
            <Animated.View 
              style={[
                styles.loadingProgress,
                {
                  transform: [{ scaleX: scaleAnim }]
                }
              ]} 
            />
          </View>
          <Text style={styles.loadingText}>Loading...</Text>
        </Animated.View>
      </View>

      {/* Bottom branding */}
      <Animated.View 
        style={[
          styles.footer,
          { opacity: fadeAnim }
        ]}
      >
        <Text style={styles.footerText}>
          {StMichaelBranding.attribution.copyrightText}
        </Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  epaLogo: {
    width: width * 0.6,
    height: width * 0.15,
    marginBottom: Spacing.xl,
  },
  appTitle: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold as any,
    color: Colors.primary.epaBlue,
    fontFamily: Typography.fonts.secondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: Typography.sizes.lg,
    color: Colors.neutral.gray600,
    fontFamily: Typography.fonts.primary,
    textAlign: 'center',
    lineHeight: 24,
  },
  developerSection: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  developerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  quartermastersLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563EB', // Blue for Quartermasters
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  quartermastersLogoText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold as any,
    color: Colors.neutral.white,
    fontFamily: Typography.fonts.primary,
  },
  developerInfo: {
    flex: 1,
  },
  developerTitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.neutral.gray600,
    fontFamily: Typography.fonts.primary,
    marginBottom: 2,
  },
  companyName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold as any,
    color: '#2563EB', // Quartermasters blue
    fontFamily: Typography.fonts.primary,
    marginBottom: 2,
  },
  licenseInfo: {
    fontSize: Typography.sizes.sm,
    color: StMichaelBranding.colors.navyBlue,
    fontFamily: Typography.fonts.primary,
    marginBottom: 2,
  },
  contractInfo: {
    fontSize: Typography.sizes.xs,
    color: StMichaelBranding.colors.burgundy,
    fontFamily: Typography.fonts.primary,
    fontWeight: Typography.weights.medium as any,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  complianceBadge: {
    backgroundColor: Colors.primary.epaBlue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 70,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold as any,
    color: Colors.neutral.white,
    fontFamily: Typography.fonts.primary,
  },
  badgeSubtext: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary.lightBlue,
    fontFamily: Typography.fonts.primary,
    marginTop: 2,
  },
  loadingSection: {
    alignItems: 'center',
    width: '100%',
  },
  loadingBar: {
    width: width * 0.6,
    height: 4,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  loadingProgress: {
    flex: 1,
    backgroundColor: Colors.primary.epaBlue,
    height: '100%',
    transformOrigin: 'left',
  },
  loadingText: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray600,
    fontFamily: Typography.fonts.primary,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  footerText: {
    fontSize: Typography.sizes.xs,
    color: Colors.neutral.gray500,
    textAlign: 'center',
    fontFamily: Typography.fonts.primary,
    lineHeight: 16,
    marginBottom: Spacing.xs,
  },
  versionText: {
    fontSize: Typography.sizes.xs,
    color: Colors.neutral.gray400,
    fontFamily: Typography.fonts.primary,
  },
});

export default StartupScreen;