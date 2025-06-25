import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  AccessibilityInfo,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ContractorFooter from '../components/StMichael/ContractorFooter';

const { width } = Dimensions.get('window');

interface QuickActionProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  accessibilityHint: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  icon,
  onPress,
  accessibilityHint,
}) => (
  <TouchableOpacity
    style={styles.quickAction}
    onPress={onPress}
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel={title}
    accessibilityHint={accessibilityHint}
  >
    <View style={styles.quickActionIcon}>
      <Ionicons name={icon} size={24} color="#0066CC" />
    </View>
    <View style={styles.quickActionContent}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionDescription}>{description}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666666" />
  </TouchableOpacity>
);

const HomeScreen: React.FC = () => {
  const handleQuickAction = (action: string) => {
    AccessibilityInfo.announceForAccessibility(`Navigating to ${action}`);
    // Navigation will be handled by parent navigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        accessible={true}
        accessibilityLabel="EPA Ethics App Home Screen"
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>EPA</Text>
            <Text style={styles.logoSubtext}>Ethics</Text>
          </View>
          <Text style={styles.welcomeTitle}>Welcome to EthicsGo</Text>
          <Text style={styles.welcomeDescription}>
            Your guide to federal ethics awareness and compliance. 
            Access training materials, test your knowledge, and stay informed 
            about ethical standards in federal service.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <QuickAction
            title="Start Ethics Guide"
            description="Interactive guide to federal ethics"
            icon="book-outline"
            onPress={() => handleQuickAction('Ethics Guide')}
            accessibilityHint="Opens the interactive ethics guide"
          />
          
          <QuickAction
            title="Take a Quiz"
            description="Test your ethics knowledge"
            icon="help-circle-outline"
            onPress={() => handleQuickAction('Quiz')}
            accessibilityHint="Opens the ethics knowledge quiz"
          />
          
          <QuickAction
            title="Watch Training Videos"
            description="Whiteboard training sessions"
            icon="play-circle-outline"
            onPress={() => handleQuickAction('Videos')}
            accessibilityHint="Opens the training video library"
          />
          
          <QuickAction
            title="Browse Resources"
            description="FAQs, glossary, and documents"
            icon="library-outline"
            onPress={() => handleQuickAction('Resources')}
            accessibilityHint="Opens the resources and FAQ section"
          />
        </View>

        {/* Recent Updates */}
        <View style={styles.updatesSection}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <View style={styles.updateCard}>
            <Text style={styles.updateTitle}>New Training Video Available</Text>
            <Text style={styles.updateDescription}>
              "Gift and Travel Ethics" - Learn about acceptance rules and restrictions.
            </Text>
            <Text style={styles.updateDate}>Updated 2 days ago</Text>
          </View>
          <View style={styles.updateCard}>
            <Text style={styles.updateTitle}>Ethics Guide Updated</Text>
            <Text style={styles.updateDescription}>
              Added new scenarios and case studies for better understanding.
            </Text>
            <Text style={styles.updateDate}>Updated 1 week ago</Text>
          </View>
        </View>

        {/* Accessibility Notice */}
        <View style={styles.accessibilityNotice}>
          <Ionicons name="accessibility-outline" size={20} color="#0066CC" />
          <Text style={styles.accessibilityText}>
            This app is designed to be fully accessible. 
            Use screen readers, voice control, or keyboard navigation as needed.
          </Text>
        </View>

        {/* Contractor Footer */}
        <ContractorFooter variant="minimal" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  logoSubtext: {
    fontSize: 16,
    color: '#666666',
    marginTop: -4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width - 40,
  },
  quickActionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  updatesSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  updateCard: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0066CC',
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  updateDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
  updateDate: {
    fontSize: 12,
    color: '#999999',
  },
  accessibilityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF',
    margin: 20,
    borderRadius: 8,
  },
  accessibilityText: {
    flex: 1,
    fontSize: 14,
    color: '#0066CC',
    marginLeft: 12,
    lineHeight: 20,
  },
});

export default HomeScreen;