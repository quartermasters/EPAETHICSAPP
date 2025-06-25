import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEthics } from '../context/EthicsContext';

export default function ProfileScreen() {
  const { state } = useEthics();
  const { modules, userProgress } = state;

  const completedModules = userProgress.completedModules.length;
  const totalModules = modules.length;
  const overallProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const handleShareProgress = async () => {
    try {
      await Share.share({
        message: `I've completed ${completedModules} out of ${totalModules} federal ethics training modules using the EPA EthicsGo app! 📚`,
        title: 'Ethics Training Progress',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleExportCertificate = () => {
    if (completedModules === totalModules) {
      Alert.alert(
        'Export Certificate',
        'This would export your Federal Ethics Training completion certificate.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Certificate Not Available',
        `Complete all ${totalModules} modules to earn your certificate. You have ${totalModules - completedModules} modules remaining.`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your training progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would reset the user's progress
            Alert.alert('Progress Reset', 'Your training progress has been reset.');
          },
        },
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'For technical support or questions about the app, please contact:\n\nSt. Michael Enterprises LLC\nsupport@stmichaelenterprises.com\n\nFor ethics questions, contact:\nEPA Ethics Office\nethics@epa.gov',
      [{ text: 'OK' }]
    );
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return '#10B981';
    if (progress >= 50) return '#3B82F6';
    if (progress > 0) return '#F59E0B';
    return '#E5E7EB';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#1B365D', '#A51C30']}
        style={styles.profileHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#1B365D" />
          </View>
        </View>
        <Text style={styles.userName}>EPA User</Text>
        <Text style={styles.userRole}>Federal Employee</Text>
      </LinearGradient>

      {/* Progress Summary */}
      <View style={styles.progressSummary}>
        <Text style={styles.sectionTitle}>Training Progress</Text>
        
        <View style={styles.progressCard}>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>{completedModules}</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>{totalModules - completedModules}</Text>
              <Text style={styles.progressLabel}>Remaining</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>{Math.round(overallProgress)}%</Text>
              <Text style={styles.progressLabel}>Progress</Text>
            </View>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${overallProgress}%`, backgroundColor: getProgressColor(overallProgress) }]} />
          </View>
          
          <Text style={styles.progressDescription}>
            {overallProgress === 100 
              ? 'Congratulations! You have completed all training modules.'
              : `${totalModules - completedModules} modules remaining to complete your federal ethics training.`
            }
          </Text>
        </View>
      </View>

      {/* Module Status */}
      <View style={styles.moduleStatus}>
        <Text style={styles.sectionTitle}>Module Status</Text>
        
        {modules.map((module, index) => {
          const isCompleted = userProgress.completedModules.includes(module.id);
          const progress = module.progress || 0;
          
          return (
            <View key={module.id} style={styles.moduleStatusCard}>
              <View style={styles.moduleStatusHeader}>
                <View style={styles.moduleStatusInfo}>
                  <Text style={styles.moduleStatusTitle}>{module.title}</Text>
                  <Text style={styles.moduleStatusProgress}>
                    {isCompleted ? 'Completed' : `${Math.round(progress)}% complete`}
                  </Text>
                </View>
                <View style={[
                  styles.moduleStatusIcon,
                  { backgroundColor: isCompleted ? '#10B981' : progress > 0 ? '#3B82F6' : '#E5E7EB' }
                ]}>
                  <Ionicons
                    name={isCompleted ? 'checkmark' : progress > 0 ? 'play' : 'book-outline'}
                    size={16}
                    color={isCompleted || progress > 0 ? 'white' : '#9CA3AF'}
                  />
                </View>
              </View>
              
              {!isCompleted && progress > 0 && (
                <View style={styles.moduleProgressContainer}>
                  <View style={styles.moduleProgressBar}>
                    <View style={[styles.moduleProgressFill, { width: `${progress}%` }]} />
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions</Text>
        
        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleExportCertificate}
          accessibilityLabel="Export training certificate"
          accessibilityRole="button"
        >
          <View style={[styles.actionIcon, { backgroundColor: '#10B981' }]}>
            <Ionicons name="ribbon" size={20} color="white" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Export Certificate</Text>
            <Text style={styles.actionDescription}>
              Download your federal ethics training certificate
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleShareProgress}
          accessibilityLabel="Share training progress"
          accessibilityRole="button"
        >
          <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
            <Ionicons name="share" size={20} color="white" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Share Progress</Text>
            <Text style={styles.actionDescription}>
              Share your training accomplishments
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleContactSupport}
          accessibilityLabel="Contact support"
          accessibilityRole="button"
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F59E0B' }]}>
            <Ionicons name="help-circle" size={20} color="white" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Contact Support</Text>
            <Text style={styles.actionDescription}>
              Get help with the app or ethics questions
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleResetProgress}
          accessibilityLabel="Reset training progress"
          accessibilityRole="button"
        >
          <View style={[styles.actionIcon, { backgroundColor: '#EF4444' }]}>
            <Ionicons name="refresh" size={20} color="white" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Reset Progress</Text>
            <Text style={styles.actionDescription}>
              Clear all training progress and start over
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.appInfoCard}>
          <View style={styles.appInfoHeader}>
            <View style={styles.appLogo}>
              <Text style={styles.appLogoText}>SM</Text>
            </View>
            <View style={styles.appDetails}>
              <Text style={styles.appName}>EthicsGo</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
            </View>
          </View>
          
          <Text style={styles.appDescription}>
            Federal Ethics Awareness Platform developed by St. Michael Enterprises LLC 
            under EPA Contract 68HERD25Q0050.
          </Text>
          
          <View style={styles.appMetadata}>
            <Text style={styles.appMetadataText}>
              Professional Federal Ethics Solutions
            </Text>
            <Text style={styles.appMetadataText}>
              Section 508 Compliant • FedRAMP Low
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressSummary: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B365D',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  moduleStatus: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  moduleStatusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleStatusInfo: {
    flex: 1,
  },
  moduleStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  moduleStatusProgress: {
    fontSize: 14,
    color: '#64748B',
  },
  moduleStatusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleProgressContainer: {
    marginTop: 12,
  },
  moduleProgressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  moduleProgressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  appInfo: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  appInfoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1B365D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appLogoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  appVersion: {
    fontSize: 14,
    color: '#64748B',
  },
  appDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  appMetadata: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
    gap: 4,
  },
  appMetadataText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});