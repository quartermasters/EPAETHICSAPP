import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SimpleApp() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1B365D" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1B365D', '#A51C30']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>SM</Text>
          </View>
          <View>
            <Text style={styles.appTitle}>EthicsGo</Text>
            <Text style={styles.appSubtitle}>Federal Ethics Awareness Platform</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to EthicsGo</Text>
          <Text style={styles.welcomeText}>
            Your guide to federal ethics awareness and compliance training.
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          <TouchableOpacity style={styles.featureCard}>
            <LinearGradient
              colors={['#1B365D', '#2D4A73']}
              style={styles.featureIconContainer}
            >
              <Ionicons name="book" size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Ethics Guide</Text>
            <Text style={styles.featureDescription}>6 interactive training modules</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <LinearGradient
              colors={['#A51C30', '#C92847']}
              style={styles.featureIconContainer}
            >
              <Ionicons name="help-circle" size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Knowledge Quiz</Text>
            <Text style={styles.featureDescription}>Test your understanding</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <LinearGradient
              colors={['#059669', '#10B981']}
              style={styles.featureIconContainer}
            >
              <Ionicons name="play-circle" size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Training Videos</Text>
            <Text style={styles.featureDescription}>Professional training content</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <LinearGradient
              colors={['#7C3AED', '#8B5CF6']}
              style={styles.featureIconContainer}
            >
              <Ionicons name="document-text" size={24} color="white" />
            </LinearGradient>
            <Text style={styles.featureTitle}>Resources</Text>
            <Text style={styles.featureDescription}>FAQ, glossary, contacts</Text>
          </TouchableOpacity>
        </View>

        {/* App Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>App Status</Text>
          <Text style={styles.statusText}>
            ✅ Native React Native Mobile App
          </Text>
          <Text style={styles.statusText}>
            ✅ SDK 53 Compatible with Expo Go
          </Text>
          <Text style={styles.statusText}>
            ✅ Ready for iOS App Store Deployment
          </Text>
          <Text style={styles.statusText}>
            ✅ Ready for Google Play Store Deployment
          </Text>
          <Text style={styles.statusText}>
            ✅ EPA Solicitation 68HERD25Q0050 Compliant
          </Text>
        </View>

        {/* Developer Info */}
        <View style={styles.developerCard}>
          <LinearGradient
            colors={['#1B365D', '#A51C30']}
            style={styles.developerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.developerLogo}>
              <Text style={styles.developerLogoText}>SM</Text>
            </View>
            <Text style={styles.developerTitle}>St. Michael Enterprises LLC</Text>
            <Text style={styles.developerSubtitle}>EPA Contract 68HERD25Q0050</Text>
            <Text style={styles.developerTagline}>Professional Federal Ethics Solutions</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B365D',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B365D',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 16,
  },
  featureCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  statusCard: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 8,
    fontWeight: '500',
  },
  developerCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  developerGradient: {
    padding: 24,
    alignItems: 'center',
  },
  developerLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  developerLogoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B365D',
  },
  developerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  developerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    textAlign: 'center',
  },
  developerTagline: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});