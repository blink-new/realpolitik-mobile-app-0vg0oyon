import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Mail, Phone, Star, CheckCircle, Award, Building, MapPin, Calendar, Info } from 'lucide-react-native';
import { router } from 'expo-router';
import PoliticianPlans from '@/components/PoliticianPlans';
import { useNotifications } from '@/contexts/NotificationContext';

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
    bio: "Senator Jane Smith has served in the U.S. Senate since 2018, focusing on progressive policies and environmental protection. She is a champion for affordable healthcare and quality education for all.",
    committee: "Committee on Health, Education, Labor, and Pensions",
    office: "123 Senate Office Building, Washington, D.C.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
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
    bio: "Representative Michael Johnson is a fiscal conservative dedicated to reducing national debt and supporting small businesses. He is a veteran of the U.S. Army and a strong advocate for military families.",
    committee: "Committee on Ways and Means",
    office: "456 House Office Building, Washington, D.C.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
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
    bio: "Mayor Lisa Chen is a lifelong San Franciscan committed to addressing the city's most pressing issues. Her administration is focused on creating affordable housing, improving public transit, and ensuring safe neighborhoods.",
    committee: "N/A",
    office: "City Hall, San Francisco, CA",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function RepresentativeProfileScreen() {
  const { id } = useLocalSearchParams();
  const representative = MOCK_REPRESENTATIVES.find(r => r.id.toString() === id);
  const [activeTab, setActiveTab] = useState('details');
  const [isFollowing, setIsFollowing] = useState(false); // New state for follow status
  const { addNotification } = useNotifications();

  if (!representative) {
    return (
      <View style={styles.container}>
        <Text>Representative not found.</Text>
      </View>
    );
  }

  const renderContent = () => {
    if (activeTab === 'details') {
      return (
        <>
          {/* Bio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{representative.bio}</Text>
          </View>

          {/* Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsCard}>
              <DetailRow icon={Award} label="Committee" value={representative.committee} />
              <DetailRow icon={MapPin} label="Office" value={representative.office} />
              <DetailRow icon={Calendar} label="Next Town Hall" value={representative.nextTownHall} />
            </View>
          </View>

          {/* Key Issues */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Issues</Text>
            <View style={styles.issuesContainer}>
              {representative.issues.map((issue, index) => (
                <View key={index} style={styles.issueTag}>
                  <Text style={styles.issueText}>{issue}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.contactButton}>
                <Phone size={20} color="#667eea" />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Mail size={20} color="#667eea" />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }
    if (activeTab === 'plans') {
      return <PoliticianPlans />;
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      addNotification(`You are now following ${representative.name}`, 'success');
    } else {
      addNotification(`You have unfollowed ${representative.name}`, 'info');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Image source={{ uri: representative.image }} style={styles.avatar} />
            <Text style={styles.name}>{representative.name}</Text>
            <Text style={styles.position}>{representative.position}</Text>
            <View style={styles.partyContainer}>
              <Building size={14} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.party}>{representative.party}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={handleFollowToggle}
            >
              <Text style={styles.followButtonText}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Key Info */}
        <View style={styles.keyInfoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>District</Text>
            <Text style={styles.infoBoxValue}>{representative.district}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>Rating</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Star size={16} color="#FFB000" fill="#FFB000" />
              <Text style={[styles.infoBoxValue, {marginLeft: 4}]}>{representative.rating}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>Status</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckCircle size={16} color="#48bb78" />
              <Text style={[styles.infoBoxValue, {marginLeft: 4}]}>Verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'details' && styles.activeTab]}
            onPress={() => setActiveTab('details')}
          >
            <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'plans' && styles.activeTab]}
            onPress={() => setActiveTab('plans')}
          >
            <Text style={[styles.tabText, activeTab === 'plans' && styles.activeTabText]}>Plans</Text>
          </TouchableOpacity>
        </View>

        {renderContent()}

        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ icon: Icon, label, value }) => (
  <View style={styles.detailRow}>
    <Icon size={20} color="#667eea" />
    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  partyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  party: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  followButton: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  followingButton: {
    backgroundColor: '#48bb78',
  },
  followButtonText: {
    color: '#667eea',
    fontWeight: 'bold',
    fontSize: 16,
  },
  keyInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoBox: {
    alignItems: 'center',
    gap: 4,
  },
  infoBoxLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  infoBoxValue: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    marginTop: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#667eea',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3C3C43',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  issuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  issueTag: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  issueText: {
    color: '#3F51B5',
    fontWeight: '600',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 16,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
});