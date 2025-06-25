import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Input from '../ui/Input';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import ContractorFooter from '../StMichael/ContractorFooter';
import apiService from '../../services/api';
import { authStorage } from '../../utils/storage';

interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      
      const response = await apiService.login(data.email, data.password);
      
      if (response.success && response.data) {
        await authStorage.saveAuthData(response.data.token, response.data.user);
        
        // Navigate to main app
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        setError('email', {
          type: 'manual',
          message: response.message || 'Login failed',
        });
      }
    } catch (error: any) {
      Alert.alert(
        'Login Error',
        error.message || 'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please contact your administrator to reset your password.',
      [{ text: 'OK' }]
    );
  };

  const handleRegister = () => {
    (navigation as any).navigate('Register');
  };

  if (isLoading) {
    return <LoadingSpinner message="Signing in..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>EPA</Text>
              <Text style={styles.logoSubtext}>Ethics</Text>
            </View>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>
              Access your ethics training and resources
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  leftIcon="mail-outline"
                  accessibilityLabel="Email address input"
                  accessibilityHint="Enter your EPA email address"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  textContentType="password"
                  leftIcon="lock-closed-outline"
                  rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  onRightIconPress={() => setShowPassword(!showPassword)}
                  accessibilityLabel="Password input"
                  accessibilityHint="Enter your password"
                />
              )}
            />

            <Button
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              style={styles.loginButton}
              accessibilityLabel="Sign in button"
              accessibilityHint="Tap to sign in to your account"
            />

            <Button
              title="Forgot Password?"
              variant="text"
              onPress={handleForgotPassword}
              style={styles.forgotButton}
              textStyle={styles.forgotButtonText}
              accessibilityLabel="Forgot password button"
              accessibilityHint="Tap for password reset instructions"
            />
          </View>

          {/* Register Section */}
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <Button
              title="Create Account"
              variant="outline"
              onPress={handleRegister}
              style={styles.registerButton}
              accessibilityLabel="Create account button"
              accessibilityHint="Tap to register for a new account"
            />
          </View>

          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#0066CC" />
            <Text style={styles.securityText}>
              Your information is protected with enterprise-grade security
            </Text>
          </View>

          <ContractorFooter variant="minimal" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  logoSubtext: {
    fontSize: 20,
    color: '#666666',
    marginTop: -8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  loginButton: {
    marginTop: 8,
  },
  forgotButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  forgotButtonText: {
    color: '#0066CC',
    fontSize: 14,
  },
  registerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  registerText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  registerButton: {
    width: '100%',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: '#0066CC',
    marginLeft: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;