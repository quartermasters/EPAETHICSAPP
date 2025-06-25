import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEthics } from '../context/EthicsContext';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { state } = useEthics();
  const { modules, userProgress } = state;

  const completedModules = userProgress.completedModules.length;
  const totalModules = modules.length;
  const overallProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const handleAPIStatus = () => {
    Alert.alert(
      'API Connection',
      'This is a demonstration app. In production, this would connect to EPA backend services.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section with St. Michael Branding */}
      <LinearGradient
        colors={['#1B365D', '#A51C30']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>SM</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>EthicsGo</Text>
            <Text style={styles.appSubtitle}>Federal Ethics Awareness Platform</Text>
          </View>
        </View>
      </LinearGradient>

      {/* API Status */}
      <TouchableOpacity style={styles.apiStatus} onPress={handleAPIStatus}>
        <View style={styles.statusIndicator} />
        <Text style={styles.apiStatusText}>API Connection: Demo Mode</Text>
      </TouchableOpacity>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to EthicsGo</Text>
        <Text style={styles.welcomeText}>
          Stay compliant with federal ethics regulations. Access training, quizzes, videos, and resources.
        </Text>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {completedModules} of {totalModules} modules completed
          </Text>
          <Text style={styles.progressPercentage}>{Math.round(overallProgress)}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${overallProgress}%` }]} />
        </View>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresGrid}>
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('Training')}
          accessibilityLabel="Ethics Guide - Interactive training modules"
          accessibilityRole="button"
        >
          <LinearGradient
            colors={['#1B365D', '#2D4A73']}
            style={styles.featureIconContainer}
          >
            <Ionicons name="book" size={24} color="white" />
          </LinearGradient>
          <Text style={styles.featureTitle}>Ethics Guide</Text>
          <Text style={styles.featureDescription}>Interactive training modules</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('Quiz')}
          accessibilityLabel="Test Your Knowledge - Quiz system"
          accessibilityRole="button"
        >
          <LinearGradient
            colors={['#A51C30', '#C92847']}
            style={styles.featureIconContainer}
          >
            <Ionicons name="bulb" size={24} color="white" />
          </LinearGradient>
          <Text style={styles.featureTitle}>Test Your Knowledge</Text>
          <Text style={styles.featureDescription}>Quiz system</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('Videos')}
          accessibilityLabel="Training Videos - Whiteboard sessions"
          accessibilityRole="button"
        >
          <LinearGradient
            colors={['#1B365D', '#A51C30']}
            style={styles.featureIconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="play-circle" size={24} color="white" />
          </LinearGradient>
          <Text style={styles.featureTitle}>Training Videos</Text>
          <Text style={styles.featureDescription}>Whiteboard sessions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('Resources')}
          accessibilityLabel="Resources - FAQ, Glossary, Documents"
          accessibilityRole="button"
        >
          <LinearGradient
            colors={['#4A5568', '#718096']}
            style={styles.featureIconContainer}
          >
            <Ionicons name="folder" size={24} color="white" />
          </LinearGradient>
          <Text style={styles.featureTitle}>Resources</Text>
          <Text style={styles.featureDescription}>FAQ, Glossary, Documents</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with St. Michael Info */}
      <View style={styles.footer}>
        <View style={styles.developerInfo}>
          <View style={styles.developerLogo}>
            <Text style={styles.developerLogoText}>SM</Text>
          </View>
          <View style={styles.developerText}>
            <Text style={styles.developerName}>Developed by St. Michael Enterprises LLC</Text>
            <Text style={styles.contractInfo}>EPA Contract 68HERD25Q0050</Text>
            <Text style={styles.tagline}>Professional Federal Ethics Solutions</Text>
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
  headerGradient: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoCircle: {
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
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B365D',
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  apiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  apiStatusText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B365D',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
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
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B365D',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#A51C30',
    borderRadius: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  featureCard: {
    width: (width - 56) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    marginTop: 32,
    marginBottom: 24,
  },
  developerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  developerLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  developerLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B365D',
  },
  developerText: {
    alignItems: 'center',
  },
  developerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B365D',
    textAlign: 'center',
  },
  contractInfo: {
    fontSize: 14,
    color: '#A51C30',
    marginTop: 2,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
});