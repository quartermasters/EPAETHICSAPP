import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEthics } from '../context/EthicsContext';

const { width } = Dimensions.get('window');

export default function ModuleDetailScreen({ route, navigation }: any) {
  const { moduleId, title } = route.params;
  const { state, dispatch } = useEthics();
  const [currentSection, setCurrentSection] = useState(0);
  
  const module = state.modules.find(m => m.id === moduleId);
  const isCompleted = state.userProgress.completedModules.includes(moduleId);
  
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  if (!module) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Module not found</Text>
      </View>
    );
  }

  const totalSections = module.content.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      dispatch({
        type: 'UPDATE_MODULE_PROGRESS',
        payload: {
          moduleId,
          progress: ((currentSection + 2) / totalSections) * 100,
        },
      });
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = () => {
    Alert.alert(
      'Module Complete!',
      'Congratulations! You have completed this ethics module. Would you like to take the quiz?',
      [
        {
          text: 'Later',
          style: 'cancel',
          onPress: () => {
            dispatch({ type: 'COMPLETE_MODULE', payload: moduleId });
            navigation.goBack();
          },
        },
        {
          text: 'Take Quiz',
          onPress: () => {
            dispatch({ type: 'COMPLETE_MODULE', payload: moduleId });
            navigation.navigate('Quiz', { moduleId });
          },
        },
      ]
    );
  };

  const currentContent = module.content[currentSection];

  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <View style={styles.progressHeader}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            Section {currentSection + 1} of {totalSections}
          </Text>
          <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={['#1B365D', '#A51C30']}
            style={[styles.progressBar, { width: `${progress}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>

      {/* Content Area */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollContainer}
      >
        <View style={styles.contentCard}>
          {/* Section Title */}
          <Text style={styles.sectionTitle}>{currentContent.title}</Text>
          
          {/* Content Type Indicator */}
          <View style={styles.contentTypeIndicator}>
            <Ionicons
              name={
                currentContent.type === 'text' ? 'document-text' :
                currentContent.type === 'video' ? 'play-circle' :
                currentContent.type === 'image' ? 'image' : 'flask'
              }
              size={16}
              color="#64748B"
            />
            <Text style={styles.contentTypeText}>
              {currentContent.type.charAt(0).toUpperCase() + currentContent.type.slice(1)} Content
            </Text>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {currentContent.type === 'text' && (
              <Text style={styles.contentText}>{currentContent.content}</Text>
            )}
            
            {currentContent.type === 'interactive' && (
              <View style={styles.interactiveContent}>
                <LinearGradient
                  colors={['#EBF4FF', '#DBEAFE']}
                  style={styles.interactiveBox}
                >
                  <Ionicons name="lightbulb" size={32} color="#3B82F6" />
                  <Text style={styles.interactiveTitle}>Interactive Exercise</Text>
                  <Text style={styles.interactiveText}>{currentContent.content}</Text>
                  <TouchableOpacity style={styles.interactiveButton}>
                    <Text style={styles.interactiveButtonText}>Start Exercise</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}

            {/* Key Points Section */}
            <View style={styles.keyPointsSection}>
              <Text style={styles.keyPointsTitle}>Key Points to Remember</Text>
              <View style={styles.keyPointsList}>
                <View style={styles.keyPoint}>
                  <View style={styles.keyPointBullet} />
                  <Text style={styles.keyPointText}>
                    Federal employees must maintain the highest ethical standards
                  </Text>
                </View>
                <View style={styles.keyPoint}>
                  <View style={styles.keyPointBullet} />
                  <Text style={styles.keyPointText}>
                    Always consult ethics officials when in doubt
                  </Text>
                </View>
                <View style={styles.keyPoint}>
                  <View style={styles.keyPointBullet} />
                  <Text style={styles.keyPointText}>
                    Document your decision-making process
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Module Info Card */}
        <View style={styles.moduleInfoCard}>
          <Text style={styles.moduleInfoTitle}>About This Module</Text>
          <Text style={styles.moduleInfoText}>{module.description}</Text>
          <View style={styles.moduleInfoStats}>
            <View style={styles.moduleInfoStat}>
              <Ionicons name="time" size={16} color="#64748B" />
              <Text style={styles.moduleInfoStatText}>{module.estimatedTime}</Text>
            </View>
            <View style={styles.moduleInfoStat}>
              <Ionicons name="book" size={16} color="#64748B" />
              <Text style={styles.moduleInfoStatText}>{totalSections} sections</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.navigationFooter}>
        <TouchableOpacity
          style={[styles.navButton, currentSection === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentSection === 0}
          accessibilityLabel="Previous section"
        >
          <Ionicons 
            name="chevron-back" 
            size={20} 
            color={currentSection === 0 ? '#CBD5E1' : '#64748B'} 
          />
          <Text style={[styles.navButtonText, currentSection === 0 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          accessibilityLabel={currentSection === totalSections - 1 ? "Complete module" : "Next section"}
        >
          <LinearGradient
            colors={['#1B365D', '#A51C30']}
            style={styles.nextButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextButtonText}>
              {currentSection === totalSections - 1 ? 'Complete' : 'Next'}
            </Text>
            <Ionicons 
              name={currentSection === totalSections - 1 ? 'checkmark' : 'chevron-forward'} 
              size={20} 
              color="white" 
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  errorText: {
    fontSize: 18,
    color: '#64748B',
  },
  progressHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 16,
    color: '#1B365D',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
  },
  contentScrollContainer: {
    padding: 20,
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 32,
  },
  contentTypeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  contentTypeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  mainContent: {
    gap: 24,
  },
  contentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },
  interactiveContent: {
    marginVertical: 8,
  },
  interactiveBox: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  interactiveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  interactiveText: {
    fontSize: 14,
    color: '#3730A3',
    textAlign: 'center',
    lineHeight: 20,
  },
  interactiveButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  interactiveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  keyPointsSection: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#A51C30',
  },
  keyPointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  keyPointsList: {
    gap: 12,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  keyPointBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A51C30',
    marginTop: 8,
  },
  keyPointText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  moduleInfoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  moduleInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  moduleInfoText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  moduleInfoStats: {
    flexDirection: 'row',
    gap: 20,
  },
  moduleInfoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moduleInfoStatText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  navigationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  navButtonTextDisabled: {
    color: '#CBD5E1',
  },
  nextButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});