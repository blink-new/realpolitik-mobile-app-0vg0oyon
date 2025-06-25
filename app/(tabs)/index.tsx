import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Vote, TrendingUp, Users, Calendar, Bell, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  const getUserTypeGreeting = () => {
    switch (user?.userType) {
      case 'politician':
        return `Welcome back, ${user.position || 'Politician'} ${user.name}`;
      case 'party_staff':
        return `Welcome back, ${user.name}`;
      default:
        return `Welcome, ${user?.name}`;
    }
  };

  const getQuickActions = () => {
    if (user?.userType === 'politician') {
      return [
        { icon: Users, title: 'Constituents', subtitle: 'Connect with voters', color: '#667eea' },
        { icon: Calendar, title: 'Events', subtitle: 'Manage appearances', color: '#764ba2' },
        { icon: TrendingUp, title: 'Polls', subtitle: 'View approval ratings', color: '#48bb78' },
        { icon: Bell, title: 'Updates', subtitle: 'Share announcements', color: '#ed8936' },
      ];
    } else if (user?.userType === 'party_staff') {
      return [
        { icon: Users, title: 'Campaigns', subtitle: 'Manage campaigns', color: '#667eea' },
        { icon: Calendar, title: 'Schedule', subtitle: 'Plan events', color: '#764ba2' },
        { icon: TrendingUp, title: 'Analytics', subtitle: 'Track performance', color: '#48bb78' },
        { icon: Bell, title: 'Alerts', subtitle: 'Important updates', color: '#ed8936' },
      ];
    } else {
      return [
        { icon: Vote, title: 'Vote', subtitle: 'Upcoming elections', color: '#667eea' },
        { icon: Users, title: 'Representatives', subtitle: 'Contact officials', color: '#764ba2' },
        { icon: TrendingUp, title: 'Issues', subtitle: 'Follow hot topics', color: '#48bb78' },
        { icon: Bell, title: 'Alerts', subtitle: 'Stay informed', color: '#ed8936' },
      ];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.userName}>{getUserTypeGreeting()}</Text>
              {user?.userType === 'politician' && user?.party && (
                <Text style={styles.userMeta}>{user.party}</Text>
              )}
              {user?.userType === 'party_staff' && user?.position && (
                <Text style={styles.userMeta}>{user.position} • {user.party}</Text>
              )}
            </View>
            <View style={styles.headerIcon}>
              <Vote size={32} color="#FFFFFF" />
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {getQuickActions().map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#FFFFFF" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
                <ChevronRight size={20} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityIcon}>
                <TrendingUp size={20} color="#667eea" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Local Election Updates</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <Text style={styles.activityDescription}>
              New candidates have filed for the upcoming city council election. Registration deadline is approaching.
            </Text>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityIcon}>
                <Users size={20} color="#48bb78" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Town Hall Meeting</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
            <Text style={styles.activityDescription}>
              Community discussion about the new infrastructure proposal scheduled for next Thursday.
            </Text>
          </View>
        </View>

        {/* User Type Specific Banner */}
        {user?.userType === 'politician' && !user?.verified && (
          <View style={styles.section}>
            <View style={styles.verificationBanner}>
              <View style={styles.verificationIcon}>
                <Bell size={20} color="#ed8936" />
              </View>
              <View style={styles.verificationContent}>
                <Text style={styles.verificationTitle}>Verification Required</Text>
                <Text style={styles.verificationText}>
                  Complete identity verification to access all politician features
                </Text>
              </View>
            </View>
          </View>
        )}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 4,
    lineHeight: 30,
  },
  userMeta: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginTop: 4,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  quickActions: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    color: '#1C1C1E',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  activityDescription: {
    fontSize: 14,
    color: '#48484A',
    lineHeight: 20,
  },
  verificationBanner: {
    backgroundColor: '#FFF8E1',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#ed8936',
  },
  verificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(237, 137, 54, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  verificationContent: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ed8936',
    marginBottom: 4,
  },
  verificationText: {
    fontSize: 14,
    color: '#8B5000',
    lineHeight: 18,
  },
});