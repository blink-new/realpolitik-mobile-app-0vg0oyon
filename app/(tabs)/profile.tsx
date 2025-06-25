import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Award,
  Building,
  CheckCircle 
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const getUserTypeDisplay = () => {
    switch (user?.userType) {
      case 'politician':
        return 'Politician';
      case 'party_staff':
        return 'Party Staff';
      default:
        return 'Citizen';
    }
  };

  const getVerificationStatus = () => {
    if (user?.userType === 'politician') {
      return user?.verified ? 'Verified' : 'Pending Verification';
    }
    return 'Active';
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: User, title: 'Personal Information', subtitle: 'Edit your profile' },
        { icon: Mail, title: 'Email Settings', subtitle: 'Manage notifications' },
        { icon: Shield, title: 'Privacy & Security', subtitle: 'Control your data' },
      ]
    },
    {
      title: 'App',
      items: [
        { icon: Settings, title: 'Preferences', subtitle: 'Customize your experience' },
        { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get assistance' },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={32} color="#667eea" />
              </View>
              {user?.userType === 'politician' && user?.verified && (
                <View style={styles.verifiedBadge}>
                  <CheckCircle size={16} color="#48bb78" />
                </View>
              )}
            </View>
            
            <View style={styles.profileDetails}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userType}>{getUserTypeDisplay()}</Text>
              {user?.position && (
                <Text style={styles.userPosition}>{user.position}</Text>
              )}
              {user?.party && (
                <Text style={styles.userParty}>{user.party}</Text>
              )}
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: user?.userType === 'politician' && !user?.verified 
                ? 'rgba(237, 137, 54, 0.2)' 
                : 'rgba(72, 187, 120, 0.2)' 
              }
            ]}>
              <Text style={[
                styles.statusText,
                { color: user?.userType === 'politician' && !user?.verified 
                  ? '#ed8936' 
                  : '#48bb78' 
                }
              ]}>
                {getVerificationStatus()}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Account Details */}
        <View style={styles.section}>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Mail size={20} color="#667eea" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{user?.email}</Text>
              </View>
            </View>

            {user?.position && (
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Award size={20} color="#764ba2" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Position</Text>
                  <Text style={styles.detailValue}>{user.position}</Text>
                </View>
              </View>
            )}

            {user?.party && (
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Building size={20} color="#48bb78" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Organization</Text>
                  <Text style={styles.detailValue}>{user.party}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Settings Sections */}
        {profileSections.map((section, sectionIndex) =>  (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={[
                    styles.settingRow,
                    itemIndex < section.items.length - 1 && styles.settingRowBorder
                  ]}
                >
                  <View style={styles.settingIcon}>
                    <item.icon size={20} color="#667eea" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={20} color="#C7C7CC" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userType: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 2,
  },
  userPosition: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  userParty: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  bottomSpacer: {
    height: 40,
  },
});