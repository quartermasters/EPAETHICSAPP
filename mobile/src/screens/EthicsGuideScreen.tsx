import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { TrainingModule, UserProgress } from '../types';
import apiService from '../services/api';
import { offlineStorage } from '../utils/storage';
import { accessibilityUtils } from '../utils/accessibility';
import { sampleTrainingModules, sampleUserProgress } from '../data/sampleEthicsContent';

interface ModuleCardProps {
  module: TrainingModule;
  progress?: UserProgress;
  onPress: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, progress, onPress }) => {
  const getStatusIcon = () => {
    switch (progress?.status) {
      case 'completed':
        return { name: 'checkmark-circle' as const, color: '#10B981' };
      case 'in_progress':
        return { name: 'play-circle' as const, color: '#F59E0B' };
      default:
        return { name: 'radio-button-off' as const, color: '#6B7280' };
    }
  };

  const getStatusText = () => {
    switch (progress?.status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return `${progress.progressPercentage}% Complete`;
      default:
        return 'Not Started';
    }
  };

  const statusIcon = getStatusIcon();
  const statusText = getStatusText();

  return (
    <TouchableOpacity
      style={styles.moduleCard}
      onPress={onPress}
      {...accessibilityUtils.getButtonAccessibility(
        accessibilityUtils.formatModuleStatusForAccessibility(
          module.title,
          progress?.status || 'not_started',
          progress?.progressPercentage
        ),
        `Tap to open ${module.title}`
      )}
    >
      <View style={styles.moduleHeader}>
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.moduleDescription} numberOfLines={2}>
            {module.description}
          </Text>
        </View>
        <View style={styles.moduleStatus}>
          <Ionicons
            name={statusIcon.name}
            size={24}
            color={statusIcon.color}
            {...accessibilityUtils.getImageAccessibility(`Status: ${statusText}`)}
          />
        </View>
      </View>

      <View style={styles.moduleFooter}>
        <View style={styles.moduleDetails}>
          <View style={styles.moduleDetail}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.moduleDetailText}>
              {accessibilityUtils.formatDurationForAccessibility(module.estimatedDuration)}
            </Text>
          </View>
          {module.isRequired && (
            <View style={styles.moduleDetail}>
              <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
              <Text style={[styles.moduleDetailText, { color: '#DC2626' }]}>
                Required
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.moduleStatusText}>{statusText}</Text>
      </View>

      {progress && progress.progressPercentage > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress.progressPercentage}%` }
              ]}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const EthicsGuideScreen: React.FC = () => {
  const navigation = useNavigation();
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setIsLoading(true);
      }

      // For demo purposes, use sample data instead of API calls
      // In production, this would call the actual API
      
      // Simulate network delay for realistic demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load sample data
      setModules(sampleTrainingModules);
      setUserProgress(sampleUserProgress);
      
      // Cache modules for offline access
      await offlineStorage.saveOfflineData('training_modules', sampleTrainingModules);
      
    } catch (error) {
      console.error('Error loading modules:', error);
      
      Alert.alert(
        'Demo Mode',
        'This is a demonstration version with sample ethics content.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleModulePress = async (module: TrainingModule) => {
    try {
      accessibilityUtils.announceForAccessibility(`Opening ${module.title}`);
      
      // Navigate to module detail screen
      (navigation as any).navigate('ModuleDetail', { 
        moduleId: module.id,
        moduleTitle: module.title,
      });
    } catch (error) {
      console.error('Error opening module:', error);
      Alert.alert(
        'Error',
        'Failed to open training module. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const getModuleProgress = (moduleId: string): UserProgress | undefined => {
    return userProgress.find(p => p.moduleId === moduleId);
  };

  const getProgressSummary = () => {
    const total = modules.length;
    const completed = userProgress.filter(p => p.status === 'completed').length;
    const inProgress = userProgress.filter(p => p.status === 'in_progress').length;
    
    return { total, completed, inProgress };
  };

  const handleRefresh = () => {
    loadModules(true);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading training modules..." />;
  }

  if (modules.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="book-outline" size={64} color="#9CA3AF" />
          <Text style={styles.emptyStateTitle}>No Training Modules Available</Text>
          <Text style={styles.emptyStateDescription}>
            Training modules will appear here when they are available.
          </Text>
          <Button
            title="Refresh"
            onPress={() => loadModules()}
            style={styles.refreshButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const summary = getProgressSummary();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        {...accessibilityUtils.getTextAccessibility('Ethics training modules list')}
      >
        {/* Progress Summary */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Your Training Progress</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryNumber}>{summary.completed}</Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryNumber}>{summary.inProgress}</Text>
              <Text style={styles.summaryLabel}>In Progress</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryNumber}>{summary.total}</Text>
              <Text style={styles.summaryLabel}>Total Modules</Text>
            </View>
          </View>
          {summary.total > 0 && (
            <View style={styles.overallProgress}>
              <Text style={styles.progressText}>
                Overall Progress: {Math.round((summary.completed / summary.total) * 100)}%
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(summary.completed / summary.total) * 100}%` }
                  ]}
                />
              </View>
            </View>
          )}
        </Card>

        {/* Module List */}
        <View style={styles.modulesList}>
          <Text style={styles.sectionTitle}>Training Modules</Text>
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={getModuleProgress(module.id)}
              onPress={() => handleModulePress(module)}
            />
          ))}
        </View>

        {/* Help Section */}
        <Card style={styles.helpCard}>
          <View style={styles.helpHeader}>
            <Ionicons name="help-circle-outline" size={24} color="#0066CC" />
            <Text style={styles.helpTitle}>Need Help?</Text>
          </View>
          <Text style={styles.helpText}>
            If you have questions about the training modules or need technical assistance, 
            please contact your ethics office or IT support.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  overallProgress: {
    marginTop: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066CC',
    borderRadius: 4,
  },
  modulesList: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  moduleInfo: {
    flex: 1,
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  moduleStatus: {
    alignItems: 'center',
  },
  moduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  moduleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  moduleDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  moduleStatusText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 12,
  },
  helpCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F0F8FF',
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    marginLeft: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  refreshButton: {
    paddingHorizontal: 32,
  },
});

export default EthicsGuideScreen;