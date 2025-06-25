import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Star,
  CheckCircle,
  Users,
  Calendar,
  Filter
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_REPRESENTATIVES = [
  {
    id: 1,
    name: "Senator Jane Smith",
    party: "Democratic Party",
    position: "U.S. Senator",
    district: "State of California",
    rating: 4.2,
    verified: true,
    phone: "(202) 224-3553",
    email: "senator.smith@senate.gov",
    nextTownHall: "Feb 15, 2024",
    issues: ["Healthcare", "Environment", "Education"],
    image: "👩‍💼",
  },
  {
    id: 2,
    name: "Rep. Michael Johnson",
    party: "Republican Party",
    position: "House Representative",
    district: "California 12th District",
    rating: 3.8,
    verified: true,
    phone: "(202) 225-5765",
    email: "rep.johnson@house.gov",
    nextTownHall: "Feb 22, 2024",
    issues: ["Economy", "Infrastructure", "Veterans"],
    image: "👨‍💼",
  },
  {
    id: 3,
    name: "Mayor Lisa Chen",
    party: "Nonpartisan",
    position: "Mayor",
    district: "San Francisco",
    rating: 4.5,
    verified: true,
    phone: "(415) 554-4000",
    email: "mayor.chen@sfgov.org",
    nextTownHall: "Feb 8, 2024",
    issues: ["Housing", "Transportation", "Public Safety"],
    image: "👩‍⚖️",
  },
];

export default function RepresentativesScreen() {
  const { user } = useAuth();

  const getScreenContent = () => {
    if (user?.userType === 'politician') {
      return {
        title: "Fellow Representatives",
        subtitle: "Connect with other elected officials",
      };
    } else if (user?.userType === 'party_staff') {
      return {
        title: "Political Network",
        subtitle: "Manage relationships with representatives",
      };
    } else {
      return {
        title: "Your Representatives",
        subtitle: "Contact your elected officials",
      };
    }
  };

  const content = getScreenContent();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{content.title}</Text>
            <Text style={styles.headerSubtitle}>{content.subtitle}</Text>
          </View>
        </LinearGradient>

        {/* Search and Filters */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Search size={20} color="#8E8E93" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name, district, or issue"
                placeholderTextColor="#8E8E93"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#667eea" />
            </TouchableOpacity>
          </View>

          <View style={styles.locationInfo}>
            <MapPin size={16} color="#8E8E93" />
            <Text style={styles.locationText}>San Francisco, CA</Text>
            <TouchableOpacity>
              <Text style={styles.changeLocation}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Representatives List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Area</Text>
          <View style={styles.representativesList}>
            {MOCK_REPRESENTATIVES.map((rep) => (
              <Link key={rep.id} href={`/(tabs)/representatives/${rep.id}`} asChild>
                <TouchableOpacity>
                  <View style={styles.repCard}>
                    <View style={styles.repHeader}>
                      <View style={styles.repAvatar}>
                        <Text style={styles.repAvatarText}>{rep.image}</Text>
                        {rep.verified && (
                          <View style={styles.verifiedBadge}>
                            <CheckCircle size={14} color="#48bb78" />
                          </View>
                        )}
                      </View>
                      
                      <View style={styles.repInfo}>
                        <Text style={styles.repName}>{rep.name}</Text>
                        <Text style={styles.repPosition}>{rep.position}</Text>
                        <Text style={styles.repDistrict}>{rep.district}</Text>
                        <Text style={styles.repParty}>{rep.party}</Text>
                      </View>

                      <View style={styles.repRating}>
                        <Star size={16} color="#FFB000" fill="#FFB000" />
                        <Text style={styles.ratingText}>{rep.rating}</Text>
                      </View>
                    </View>

                    <View style={styles.issuesContainer}>
                      <Text style={styles.issuesLabel}>Key Issues:</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.issues}>
                          {rep.issues.map((issue, index) => (
                            <View key={index} style={styles.issueTag}>
                              <Text style={styles.issueText}>{issue}</Text>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>

                    <View style={styles.repDetails}>
                      <View style={styles.detailRow}>
                        <Calendar size={16} color="#8E8E93" />
                        <Text style={styles.detailText}>Next Town Hall: {rep.nextTownHall}</Text>
                      </View>
                    </View>

                    <View style={styles.contactActions}>
                      <TouchableOpacity style={styles.contactButton}>
                        <Phone size={18} color="#667eea" />
                        <Text style={styles.contactButtonText}>Call</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.contactButton}>
                        <Mail size={18} color="#667eea" />
                        <Text style={styles.contactButtonText}>Email</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.contactButton}>
                        <ExternalLink size={18} color="#667eea" />
                        <Text style={styles.contactButtonText}>Website</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>

        {/* Tips for Engagement */}
        <View style={styles.section}>
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 Engagement Tips</Text>
            <Text style={styles.tipsText}>
              • Be specific about issues that affect you{'\n'}
              • Include your address to verify constituency{'\n'}
              • Attend town halls for face-to-face discussion{'\n'}
              • Follow up on previous communications
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  changeLocation: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 'auto',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  representativesList: {
    gap: 20,
  },
  repCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  repHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  repAvatar: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  repAvatarText: {
    fontSize: 24,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repInfo: {
    flex: 1,
  },
  repName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  repPosition: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 2,
  },
  repDistrict: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  repParty: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  repRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  issuesContainer: {
    marginBottom: 16,
  },
  issuesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  issues: {
    flexDirection: 'row',
    gap: 8,
  },
  issueTag: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  issueText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },
  repDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  tipsCard: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1565C0',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 40,
  },
});