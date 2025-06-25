import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail, Lock, User, Building, Award } from 'lucide-react-native';
import { useAuth, UserType } from '@/contexts/AuthContext';

const USER_TYPES = [
  { value: 'general_public' as UserType, label: 'General Public', icon: '👤' },
  { value: 'party_staff' as UserType, label: 'Party Staff', icon: '🏛️' },
  { value: 'politician' as UserType, label: 'Politician', icon: '🎯' },
];

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    position: '',
    party: '',
  });
  const [userType, setUserType] = useState<UserType>('general_public');
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.name) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (userType !== 'general_public' && (!formData.position || !formData.party)) {
      Alert.alert('Error', 'Please fill in your position and party information');
      return;
    }

    setLoading(true);
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType,
        position: formData.position || undefined,
        party: formData.party || undefined,
      });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showAdditionalFields = userType === 'politician' || userType === 'party_staff';

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
        <KeyboardAvoidingView 
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.title}>Join RealPolitik</Text>
              <Text style={styles.subtitle}>Create your account</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.userTypeContainer}>
                <Text style={styles.label}>I am a:</Text>
                <View style={styles.userTypeButtons}>
                  {USER_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={[
                        styles.userTypeButton,
                        userType === type.value && styles.userTypeButtonActive,
                      ]}
                      onPress={() => setUserType(type.value)}
                    >
                      <Text style={styles.userTypeEmoji}>{type.icon}</Text>
                      <Text
                        style={[
                          styles.userTypeText,
                          userType === type.value && styles.userTypeTextActive,
                        ]}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name *</Text>
                <View style={styles.inputWrapper}>
                  <User size={20} color="rgba(255, 255, 255, 0.7)" />
                  <TextInput
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(value) => updateFormData('name', value)}
                    placeholder="Enter your full name"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email *</Text>
                <View style={styles.inputWrapper}>
                  <Mail size={20} color="rgba(255, 255, 255, 0.7)" />
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(value) => updateFormData('email', value)}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password *</Text>
                <View style={styles.inputWrapper}>
                  <Lock size={20} color="rgba(255, 255, 255, 0.7)" />
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    placeholder="Create a password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry
                  />
                </View>
              </View>

              {showAdditionalFields && (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Position *</Text>
                    <View style={styles.inputWrapper}>
                      <Award size={20} color="rgba(255, 255, 255, 0.7)" />
                      <TextInput
                        style={styles.input}
                        value={formData.position}
                        onChangeText={(value) => updateFormData('position', value)}
                        placeholder={userType === 'politician' ? 'e.g., Mayor, Senator' : 'e.g., Campaign Manager'}
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Party/Organization *</Text>
                    <View style={styles.inputWrapper}>
                      <Building size={20} color="rgba(255, 255, 255, 0.7)" />
                      <TextInput
                        style={styles.input}
                        value={formData.party}
                        onChangeText={(value) => updateFormData('party', value)}
                        placeholder="e.g., Democratic Party, Independent"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      />
                    </View>
                  </View>
                </>
              )}

              {userType === 'politician' && (
                <View style={styles.verificationNotice}>
                  <Text style={styles.verificationText}>
                    📋 Political candidates require identity verification before full access
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#667eea" />
                ) : (
                  <Text style={styles.signUpButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signInLink}
                onPress={() => router.push('/(auth)/signin')}
              >
                <Text style={styles.signInLinkText}>
                  Already have an account? <Text style={styles.signInLinkBold}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 40,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  form: {
    flex: 1,
    gap: 20,
  },
  userTypeContainer: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userTypeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  userTypeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  userTypeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  userTypeTextActive: {
    color: '#667eea',
  },
  inputContainer: {
    gap: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  verificationNotice: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  verificationText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  signUpButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667eea',
  },
  signInLink: {
    alignItems: 'center',
    paddingTop: 16,
  },
  signInLinkText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  signInLinkBold: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
});