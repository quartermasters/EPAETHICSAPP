import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '../design/design-system';
import { TrainingModule, UserProgress } from '../types';
import { sampleTrainingModules } from '../data/sampleEthicsContent';
import Button from '../components/ui/Button';

const { width } = Dimensions.get('window');

interface ModuleDetailRouteParams {
  moduleId: string;
  moduleTitle: string;
}

const ModuleDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ModuleDetailRouteParams;
  
  const [module, setModule] = useState<TrainingModule | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Find the module from sample data
    const foundModule = sampleTrainingModules.find(m => m.id === params.moduleId);
    if (foundModule) {
      setModule(foundModule);
    }
  }, [params.moduleId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleStartModule = () => {
    Alert.alert(
      'Start Training Module',
      `This would begin the interactive training for "${module?.title}". In the full version, this would include interactive content, quizzes, and progress tracking.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => {
          // In a real app, this would navigate to the interactive module content
          Alert.alert('Demo Mode', 'Interactive module content would be displayed here.');
        }}
      ]
    );
  };

  const handleNextSection = () => {
    if (module && currentSection < module.content.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  if (!module) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back to Ethics Guide"
          >
            <Ionicons name="arrow-back" size={24} color={Colors.primary.epaBlue} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Module not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentContent = module.content[currentSection];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back to Ethics Guide"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary.epaBlue} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Module Header */}
        <View style={styles.moduleHeader}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.moduleDescription}>{module.description}</Text>
          
          <View style={styles.moduleMetrics}>
            <View style={styles.metric}>
              <Ionicons name="time-outline" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.metricText}>{module.estimatedDuration}</Text>
            </View>
            <View style={styles.metric}>
              <Ionicons name="book-outline" size={16} color={Colors.neutral.gray600} />
              <Text style={styles.metricText}>{module.content.length} sections</Text>
            </View>
            {module.isRequired && (
              <View style={styles.metric}>
                <Ionicons name="alert-circle-outline" size={16} color={Colors.status.error} />
                <Text style={[styles.metricText, { color: Colors.status.error }]}>Required</Text>
              </View>
            )}
          </View>
        </View>

        {/* Learning Objectives */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Objectives</Text>
          {module.learningObjectives.map((objective, index) => (
            <View key={index} style={styles.objectiveItem}>
              <Ionicons name="checkmark-circle-outline" size={16} color={Colors.primary.epaBlue} />
              <Text style={styles.objectiveText}>{objective}</Text>
            </View>
          ))}
        </View>

        {/* Current Section Content */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{currentContent.title}</Text>
            <Text style={styles.sectionCounter}>
              {currentSection + 1} of {module.content.length}
            </Text>
          </View>
          
          <Text style={styles.sectionContent}>{currentContent.content}</Text>

          {/* Key Points */}
          {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
            <View style={styles.keyPointsContainer}>
              <Text style={styles.keyPointsTitle}>Key Points:</Text>
              {currentContent.keyPoints.map((point, index) => (
                <View key={index} style={styles.keyPointItem}>
                  <Ionicons name="diamond" size={8} color={Colors.primary.epaBlue} />
                  <Text style={styles.keyPointText}>{point}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Navigation Controls */}
        <View style={styles.navigationSection}>
          <View style={styles.navigationButtons}>
            <Button
              title="Previous"
              onPress={handlePreviousSection}
              disabled={currentSection === 0}
              variant="outline"
              size="sm"
              icon="chevron-back"
              accessible={true}
              accessibilityLabel="Go to previous section"
            />
            
            <View style={styles.progressIndicator}>
              {module.content.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    index === currentSection && styles.progressDotActive
                  ]}
                />
              ))}
            </View>
            
            <Button
              title="Next"
              onPress={handleNextSection}
              disabled={currentSection === module.content.length - 1}
              variant="primary"
              size="sm"
              icon="chevron-forward"
              accessible={true}
              accessibilityLabel="Go to next section"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Button
            title="Start Interactive Training"
            onPress={handleStartModule}
            variant="primary"
            size="lg"
            icon="play-circle"
            accessible={true}
            accessibilityLabel={`Start interactive training for ${module.title}`}
          />
          
          <View style={styles.secondaryActions}>
            <Button
              title="Download for Offline"
              onPress={() => Alert.alert('Demo Mode', 'Offline download would be available in the full version.')}
              variant="outline"
              size="md"
              icon="download-outline"
              accessible={true}
              accessibilityLabel="Download module for offline viewing"
            />
          </View>
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          <View style={styles.resourceItem}>
            <Ionicons name="document-text-outline" size={20} color={Colors.primary.epaBlue} />
            <Text style={styles.resourceText}>Federal Ethics Regulation Guide</Text>
          </View>
          <View style={styles.resourceItem}>
            <Ionicons name="link-outline" size={20} color={Colors.primary.epaBlue} />
            <Text style={styles.resourceText}>EPA Ethics Policy Website</Text>
          </View>
          <View style={styles.resourceItem}>
            <Ionicons name="call-outline" size={20} color={Colors.primary.epaBlue} />
            <Text style={styles.resourceText}>Ethics Helpline: 1-800-EPA-ETHICS</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.primary.epaBlue,
    marginLeft: Spacing.sm,
    fontWeight: Typography.weights.medium as any,
  },
  scrollView: {
    flex: 1,
  },
  moduleHeader: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  moduleTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold as any,
    color: Colors.neutral.gray900,
    marginBottom: Spacing.md,
    lineHeight: 32,
  },
  moduleDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray700,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  moduleMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: Typography.sizes.sm,
    color: Colors.neutral.gray600,
    marginLeft: Spacing.sm,
  },
  section: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xl,
    marginTop: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold as any,
    color: Colors.neutral.gray900,
  },
  sectionCounter: {
    fontSize: Typography.sizes.sm,
    color: Colors.neutral.gray500,
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  sectionContent: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray700,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  objectiveText: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray700,
    marginLeft: Spacing.md,
    flex: 1,
    lineHeight: 22,
  },
  keyPointsContainer: {
    backgroundColor: Colors.primary.lightBlue,
    padding: Spacing.lg,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.epaBlue,
  },
  keyPointsTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold as any,
    color: Colors.primary.darkBlue,
    marginBottom: Spacing.md,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  keyPointText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary.darkBlue,
    marginLeft: Spacing.md,
    flex: 1,
    lineHeight: 20,
  },
  navigationSection: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xl,
    marginTop: Spacing.md,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressIndicator: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral.gray300,
  },
  progressDotActive: {
    backgroundColor: Colors.primary.epaBlue,
  },
  actionSection: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.xl,
    marginTop: Spacing.md,
  },
  secondaryActions: {
    marginTop: Spacing.lg,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  resourceText: {
    fontSize: Typography.sizes.base,
    color: Colors.neutral.gray700,
    marginLeft: Spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: Typography.sizes.lg,
    color: Colors.neutral.gray600,
  },
});

export default ModuleDetailScreen;