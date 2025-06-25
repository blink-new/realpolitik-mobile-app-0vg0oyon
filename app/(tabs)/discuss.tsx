import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, TrendingUp, Users, Clock, ChevronRight, Plus } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_DISCUSSIONS = [
  {
    id: 1,
    title: "New Infrastructure Bill Discussion",
    category: "Policy",
    participants: 142,
    replies: 67,
    timeAgo: "2h ago",
    trending: true,
    preview: "What are your thoughts on the proposed highway expansion project?",
  },
  {
    id: 2,
    title: "Local School Board Elections",
    category: "Elections",
    participants: 89,
    replies: 34,
    timeAgo: "5h ago",
    trending: false,
    preview: "Candidates have been announced for the upcoming school board elections...",
  },
  {
    id: 3,
    title: "Climate Action Plan Feedback",
    category: "Environment",
    participants: 203,
    replies: 156,
    timeAgo: "1d ago",
    trending: true,
    preview: "Share your input on the city's new climate initiatives and green energy proposals.",
  },
  {
    id: 4,
    title: "Budget Allocation Priorities",
    category: "Budget",
    participants: 156,
    replies: 89,
    timeAgo: "2d ago",
    trending: false,
    preview: "How should we prioritize spending in the upcoming fiscal year?",
  },
];

export default function DiscussScreen() {
  const { user } = useAuth();

  const getDiscussionAccess = () => {
    switch (user?.userType) {
      case 'politician':
        return {
          canCreate: true,
          canModerate: true,
          badge: '🎯 Politician',
        };
      case 'party_staff':
        return {
          canCreate: true,
          canModerate: false,
          badge: '🏛️ Party Staff',
        };
      default:
        return {
          canCreate: true,
          canModerate: false,
          badge: '👤 Citizen',
        };
    }
  };

  const access = getDiscussionAccess();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Political Discussions</Text>
              <Text style={styles.headerSubtitle}>
                Engage in meaningful civic conversations
              </Text>
            </View>
            <View style={styles.userBadge}>
              <Text style={styles.userBadgeText}>{access.badge}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Create Discussion Button */}
        {access.canCreate && (
          <View style={styles.section}>
            <TouchableOpacity style={styles.createButton}>
              <Plus size={20} color="#667eea" />
              <Text style={styles.createButtonText}>Start a Discussion</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Topics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {['Policy', 'Elections', 'Environment', 'Budget', 'Healthcare', 'Education'].map((category) => (
              <TouchableOpacity key={category} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Discussions List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Discussions</Text>
          <View style={styles.discussionsList}>
            {MOCK_DISCUSSIONS.map((discussion) => (
              <TouchableOpacity key={discussion.id} style={styles.discussionCard}>
                <View style={styles.discussionHeader}>
                  <View style={styles.discussionMeta}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{discussion.category}</Text>
                    </View>
                    {discussion.trending && (
                      <View style={styles.trendingBadge}>
                        <TrendingUp size={12} color="#48bb78" />
                        <Text style={styles.trendingText}>Trending</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.timeAgo}>{discussion.timeAgo}</Text>
                </View>

                <Text style={styles.discussionTitle}>{discussion.title}</Text>
                <Text style={styles.discussionPreview}>{discussion.preview}</Text>

                <View style={styles.discussionStats}>
                  <View style={styles.stat}>
                    <Users size={16} color="#8E8E93" />
                    <Text style={styles.statText}>{discussion.participants}</Text>
                  </View>
                  <View style={styles.stat}>
                    <MessageCircle size={16} color="#8E8E93" />
                    <Text style={styles.statText}>{discussion.replies}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Clock size={16} color="#8E8E93" />
                    <Text style={styles.statText}>Active</Text>
                  </View>
                  <ChevronRight size={16} color="#C7C7CC" style={styles.chevron} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Guidelines */}
        <View style={styles.section}>
          <View style={styles.guidelinesCard}>
            <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
            <Text style={styles.guidelinesText}>
              Keep discussions respectful, factual, and focused on policy. 
              Personal attacks and misinformation are not tolerated.
            </Text>
          </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#667eea',
  },
  discussionsList: {
    gap: 16,
  },
  discussionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  discussionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#667eea',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(72, 187, 120, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#48bb78',
  },
  timeAgo: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  discussionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
    lineHeight: 24,
  },
  discussionPreview: {
    fontSize: 14,
    color: '#48484A',
    lineHeight: 20,
    marginBottom: 16,
  },
  discussionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 'auto',
  },
  guidelinesCard: {
    backgroundColor: '#FFF8E1',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB000',
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5000',
    marginBottom: 8,
  },
  guidelinesText: {
    fontSize: 14,
    color: '#8B5000',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});