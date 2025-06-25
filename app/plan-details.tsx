import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Calendar, DollarSign, Target, User, CheckCircle } from 'lucide-react-native';
import PlanProgress from '@/components/PlanProgress';
import Comments from '@/components/Comments';
import { useNotifications } from '@/contexts/NotificationContext';

// This would normally come from a database or API
const PLAN_DETAILS = {
  '1': {
    title: 'Universal Basic Income Initiative',
    description: 'A comprehensive plan to provide a basic income to all citizens, ensuring a safety net and stimulating the economy through direct cash transfers.',
    fullDescription: 'This initiative proposes implementing a Universal Basic Income (UBI) program that would provide every American citizen with a monthly payment of $1,000. The program aims to reduce poverty, increase economic security, and provide a foundation for innovation and entrepreneurship. The UBI would be funded through a combination of progressive taxation, elimination of redundant welfare programs, and revenue from digital services taxes.',
    goals: ['Reduce poverty by 40%', 'Increase consumer spending', 'Improve public health outcomes', 'Support innovation and entrepreneurship'],
    estimatedCost: '1.2 Trillion annually',
    timeline: '2024-2026 implementation, full rollout by 2027',
    politician: 'Senator Jane Smith',
    party: 'Democratic',
    status: 'Under Review',
    lastUpdated: 'January 15, 2024',
    keyMilestones: [
      { phase: 'Pilot Program', timeline: 'Q2 2024', description: 'Launch in 3 test states', completed: false },
      { phase: 'Expansion', timeline: 'Q1 2025', description: 'Expand to 15 states', completed: false },
      { phase: 'National Rollout', timeline: 'Q1 2026', description: 'Full national implementation', completed: false },
    ],
    progressUpdates: [
      { date: 'Feb 1, 2024', text: 'Initial proposal submitted to the Senate.' },
      { date: 'Feb 15, 2024', text: 'Gained co-sponsorship from 5 new senators.' },
      { date: 'Mar 5, 2024', text: 'Public hearings scheduled for next month.' },
    ],
    comments: [
      {
        id: '1',
        author: 'John Citizen',
        text: 'This is a fantastic idea! It would make a huge difference for my family.',
        date: 'Mar 10, 2024',
        userType: 'public',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      {
        id: '2',
        author: 'Senator Jane Smith',
        text: 'Thank you for your support, John! We are working hard to make this a reality.',
        date: 'Mar 11, 2024',
        userType: 'politician',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
    ],
  },
  '2': {
    title: 'Green Energy Transition Act',
    description: 'A comprehensive strategy to transition the state to 100% renewable energy sources by 2035.',
    fullDescription: 'This transformative legislation will accelerate America\'s transition to clean energy through massive investments in solar, wind, and battery storage infrastructure. The plan includes job retraining programs for fossil fuel workers, tax incentives for clean energy adoption, and federal procurement policies that prioritize renewable energy.',
    goals: ['Achieve 100% clean electricity by 2035', 'Create 2 million green jobs', 'Reduce carbon emissions by 75%', 'Achieve energy independence'],
    estimatedCost: '500 Billion over 10 years',
    timeline: '2024-2035 full transition',
    politician: 'Senator Jane Smith',
    party: 'Democratic',
    status: 'In Committee',
    lastUpdated: 'January 10, 2024',
    keyMilestones: [
      { phase: 'Infrastructure Investment', timeline: 'Q3 2024', description: 'Begin massive renewable infrastructure buildout', completed: false },
      { phase: 'Job Training Programs', timeline: 'Q1 2025', description: 'Launch worker retraining initiatives', completed: false },
      { phase: 'Grid Modernization', timeline: 'Q2 2026', description: 'Upgrade national electricity grid', completed: false },
      { phase: 'Full Transition', timeline: 'Q4 2035', description: 'Achieve 100% renewable energy goal', completed: false },
    ],
    progressUpdates: [
      { date: 'Jan 20, 2024', text: 'Bill introduced in the House.' },
      { date: 'Feb 10, 2024', text: 'Referred to the Committee on Energy and Commerce.' },
    ],
  },
  '3': {
    title: 'Small Business Tax Relief Program',
    description: 'Comprehensive tax cuts and incentives for small businesses to boost economic growth.',
    fullDescription: 'This program provides immediate tax relief to small businesses through reduced corporate tax rates, expanded deductions for business expenses, and simplified tax filing procedures. Small businesses with revenues under $5 million will benefit from a 50% reduction in federal tax rates, along with accelerated depreciation schedules and enhanced R&D tax credits.',
    goals: ['Reduce small business tax burden by 50%', 'Create 500,000 new jobs', 'Increase business formation by 25%', 'Boost local economic growth'],
    estimatedCost: '300 Billion over 5 years',
    timeline: '2024-2025 implementation',
    politician: 'Rep. John Doe',
    party: 'Republican',
    status: 'Drafted',
    lastUpdated: 'January 8, 2024',
    keyMilestones: [
      { phase: 'Legislative Introduction', timeline: 'Q2 2024', description: 'Introduce bill in House of Representatives', completed: false },
      { phase: 'Committee Review', timeline: 'Q3 2024', description: 'Committee markup and amendments', completed: false },
      { phase: 'House Vote', timeline: 'Q4 2024', description: 'Full House vote on legislation', completed: false },
      { phase: 'Implementation', timeline: 'Q1 2025', description: 'Begin tax relief program rollout', completed: false },
    ],
    progressUpdates: [],
  },
  '4': {
    title: 'National Infrastructure Modernization',
    description: 'A massive infrastructure overhaul including roads, bridges, broadband, and public transit.',
    fullDescription: 'This comprehensive infrastructure plan addresses America\'s crumbling roads, bridges, airports, and digital infrastructure. The plan includes $800 billion for transportation infrastructure, $400 billion for broadband expansion, $500 billion for water systems, and $300 billion for modernizing the electrical grid. The initiative will create millions of jobs while improving American competitiveness.',
    goals: ['Repair 40,000 miles of roads', 'Replace 10,000+ bridges', 'Expand broadband to rural areas', 'Modernize public transit systems'],
    estimatedCost: '2 Trillion over 8 years',
    timeline: '2024-2030 implementation',
    politician: 'Rep. John Doe',
    party: 'Republican',
    status: 'Under Review',
    lastUpdated: 'January 12, 2024',
    keyMilestones: [
      { phase: 'Planning & Design', timeline: 'Q2 2024', description: 'Complete infrastructure assessments and project planning', completed: false },
      { phase: 'Phase 1 Construction', timeline: 'Q1 2025', description: 'Begin critical repairs and broadband expansion', completed: false },
      { phase: 'Phase 2 Modernization', timeline: 'Q1 2027', description: 'Launch major modernization projects', completed: false },
      { phase: 'Project Completion', timeline: 'Q4 2030', description: 'Complete all infrastructure improvements', completed: false },
    ],
    progressUpdates: [
      { date: 'Jan 25, 2024', text: 'Bipartisan working group formed to draft the bill.' },
    ],
  },
};

export default function PlanDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [planDetails, setPlanDetails] = useState(PLAN_DETAILS[id as string]);
  const [activeTab, setActiveTab] = useState('details');
  const { addNotification } = useNotifications();

  if (!planDetails) {
    return (
      <View style={styles.container}>
        <Text>Plan not found.</Text>
      </View>
    );
  }

  const handleCompleteMilestone = (milestoneIndex: number) => {
    const updatedMilestones = [...planDetails.keyMilestones];
    updatedMilestones[milestoneIndex].completed = true;

    setPlanDetails({
      ...planDetails,
      keyMilestones: updatedMilestones,
    });

    addNotification(
      `Milestone Completed: ${planDetails.keyMilestones[milestoneIndex].phase} for ${planDetails.title}`,
      'success'
    );
  };

  const handleCommentSubmit = (newComment) => {
    // In a real app, this would be saved to a database
    console.log('New comment submitted:', newComment);
  };

  const renderContent = () => {
    if (activeTab === 'details') {
      return (
        <>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>{planDetails.fullDescription}</Text>

          <Text style={styles.sectionTitle}>Key Goals</Text>
          <View style={styles.goalsList}>
            {planDetails.goals.map((goal, index) => (
              <View key={index} style={styles.goalItem}>
                <Target size={16} color="#667eea" />
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
          </View>

          <View style={styles.metaSection}>
            <View style={styles.metaItem}>
              <DollarSign size={20} color="#4A5568" />
              <View style={styles.metaContent}>
                <Text style={styles.metaLabel}>Estimated Cost</Text>
                <Text style={styles.metaValue}>{planDetails.estimatedCost}</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Calendar size={20} color="#4A5568" />
              <View style={styles.metaContent}>
                <Text style={styles.metaLabel}>Timeline</Text>
                <Text style={styles.metaValue}>{planDetails.timeline}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Implementation Timeline</Text>
          <View style={styles.milestonesList}>
            {planDetails.keyMilestones.map((milestone, index) => (
              <View key={index} style={styles.milestoneItem}>
                <View style={styles.milestoneMarker} />
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestonePhase}>{milestone.phase}</Text>
                  <Text style={styles.milestoneTimeline}>{milestone.timeline}</Text>
                  <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.lastUpdated}>Last updated: {planDetails.lastUpdated}</Text>

          <Comments comments={planDetails.comments} onCommentSubmit={handleCommentSubmit} />
        </>
      );
    }
    if (activeTab === 'progress') {
      return (
        <PlanProgress 
          updates={planDetails.progressUpdates} 
          status={planDetails.status} 
          milestones={planDetails.keyMilestones}
          onCompleteMilestone={handleCompleteMilestone}
        />
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#4A5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.planTitle}>{planDetails.title}</Text>
          <View style={styles.statusBadge}>
            <CheckCircle size={16} color="#48bb78" />
            <Text style={styles.statusText}>{planDetails.status}</Text>
          </View>
        </View>

        <View style={styles.politicianInfo}>
          <User size={20} color="#667eea" />
          <Text style={styles.politicianText}>Proposed by {planDetails.politician} ({planDetails.party})</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'details' && styles.activeTab]}
            onPress={() => setActiveTab('details')}
          >
            <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'progress' && styles.activeTab]}
            onPress={() => setActiveTab('progress')}
          >
            <Text style={[styles.tabText, activeTab === 'progress' && styles.activeTabText]}>Progress</Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  headerSpacer: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 16,
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
  content: {
    padding: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F0FFF4',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#48bb78',
    marginLeft: 4,
  },
  politicianInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  politicianText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '500',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 8,
  },
  goalsList: {
    marginBottom: 8,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalText: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 8,
    flex: 1,
  },
  metaSection: {
    marginVertical: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  metaContent: {
    marginLeft: 12,
  },
  metaLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  milestonesList: {
    marginBottom: 16,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  milestoneMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#667eea',
    marginRight: 12,
    marginTop: 4,
  },
  milestoneContent: {
    flex: 1,
  },
  milestonePhase: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  milestoneTimeline: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
});