import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEthics } from '../context/EthicsContext';

const { width } = Dimensions.get('window');

export default function EthicsGuideScreen({ navigation }: any) {
  const { state, dispatch } = useEthics();
  const { modules, userProgress } = state;

  const handleModulePress = (module: any) => {
    dispatch({ type: 'SET_CURRENT_MODULE', payload: module });
    navigation.navigate('ModuleDetail', {
      moduleId: module.id,
      title: module.title,
    });
  };

  const getModuleIcon = (moduleId: string) => {
    const iconMap: { [key: string]: string } = {
      'federal-ethics-basics': 'book',
      'conflict-of-interest': 'warning',
      'gifts-travel': 'gift',
      'post-employment': 'briefcase',
      'financial-disclosure': 'document-text',
      'whistleblower-protections': 'shield-checkmark',
    };
    return iconMap[moduleId] || 'book';
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return '#E2E8F0';
    if (progress < 50) return '#F59E0B';
    if (progress < 100) return '#3B82F6';
    return '#10B981';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Indicator */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Training Progress</Text>
        <View style={styles.progressSteps}>
          {modules.map((module, index) => {
            const isCompleted = userProgress.completedModules.includes(module.id);
            const isActive = module.progress > 0 && !isCompleted;
            
            return (
              <View key={module.id} style={styles.progressStep}>
                <View
                  style={[
                    styles.progressDot,
                    isCompleted && styles.progressDotCompleted,
                    isActive && styles.progressDotActive,
                  ]}
                >
                  {isCompleted && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                {index < modules.length - 1 && (
                  <View
                    style={[
                      styles.progressLine,
                      isCompleted && styles.progressLineCompleted,
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>
        <Text style={styles.progressSubtitle}>
          {userProgress.completedModules.length} of {modules.length} modules completed
        </Text>
      </View>

      {/* Modules Header */}
      <View style={styles.modulesHeader}>
        <Text style={styles.modulesTitle}>Ethics Training Modules</Text>
        <Text style={styles.modulesSubtitle}>
          Complete all modules to earn your Federal Ethics Certificate
        </Text>
      </View>

      {/* Modules Grid */}
      <View style={styles.modulesGrid}>
        {modules.map((module, index) => {
          const isCompleted = userProgress.completedModules.includes(module.id);
          const progress = module.progress || 0;
          
          return (
            <TouchableOpacity
              key={module.id}
              style={[
                styles.moduleCard,
                isCompleted && styles.moduleCardCompleted,
              ]}
              onPress={() => handleModulePress(module)}
              accessibilityLabel={`${module.title} - ${module.description}`}
              accessibilityRole="button"
            >
              <LinearGradient
                colors={
                  isCompleted
                    ? ['#10B981', '#059669']
                    : progress > 0
                    ? ['#3B82F6', '#2563EB']
                    : ['#64748B', '#475569']
                }
                style={styles.moduleIconContainer}
              >
                <Ionicons
                  name={getModuleIcon(module.id) as any}
                  size={28}
                  color="white"
                />
              </LinearGradient>

              <View style={styles.moduleContent}>
                <View style={styles.moduleHeader}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    </View>
                  )}
                </View>
                
                <Text style={styles.moduleDescription} numberOfLines={2}>
                  {module.description}
                </Text>
                
                <View style={styles.moduleFooter}>
                  <Text style={styles.moduleTime}>
                    <Ionicons name="time" size={14} color="#64748B" /> {module.estimatedTime}
                  </Text>
                  
                  <View style={styles.moduleProgressContainer}>
                    <View style={styles.moduleProgressBar}>
                      <View
                        style={[
                          styles.moduleProgressFill,
                          {
                            width: `${progress}%`,
                            backgroundColor: getProgressColor(progress),
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.moduleProgressText}>{Math.round(progress)}%</Text>
                  </View>
                </View>
              </View>

              {/* Module number badge */}
              <View style={styles.moduleNumber}>
                <Text style={styles.moduleNumberText}>{index + 1}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Learning Path Info */}
      <View style={styles.learningPathCard}>
        <LinearGradient
          colors={['#1B365D', '#A51C30']}
          style={styles.learningPathGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="trophy" size={32} color="white" />
          <Text style={styles.learningPathTitle}>Federal Ethics Certificate</Text>
          <Text style={styles.learningPathDescription}>
            Complete all 6 modules to earn your Federal Ethics Training Certificate
          </Text>
          <View style={styles.certificateProgress}>
            <Text style={styles.certificateProgressText}>
              {userProgress.completedModules.length}/6 Modules Complete
            </Text>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  progressSection: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: '#3B82F6',
  },
  progressDotCompleted: {
    backgroundColor: '#10B981',
  },
  progressLine: {
    width: 32,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  progressLineCompleted: {
    backgroundColor: '#10B981',
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  modulesHeader: {
    padding: 20,
    paddingBottom: 16,
  },
  modulesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B365D',
    marginBottom: 8,
  },
  modulesSubtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  modulesGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  moduleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  moduleCardCompleted: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  moduleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moduleContent: {
    flex: 1,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  completedBadge: {
    padding: 2,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  moduleFooter: {
    gap: 12,
  },
  moduleTime: {
    fontSize: 12,
    color: '#64748B',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moduleProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  moduleProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  moduleProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    minWidth: 32,
  },
  moduleNumber: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B365D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  moduleNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  learningPathCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  learningPathGradient: {
    padding: 24,
    alignItems: 'center',
  },
  learningPathTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  learningPathDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  certificateProgress: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  certificateProgressText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});