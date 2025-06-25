import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { User, Calendar, Tag } from 'lucide-react-native';
import Comments from '@/components/Comments';

const NEWS_DETAILS = {
  '1': {
    title: 'Senator Smith Announces Major Healthcare Reform Bill',
    author: 'RealPolitik News',
    date: '2024-03-15',
    summary: 'Senator Jane Smith today unveiled a landmark healthcare reform bill aimed at expanding coverage and reducing costs for millions of Americans.',
    fullContent: 'In a press conference held this morning, Senator Jane Smith introduced the \'Healthcare for All Act,\' a comprehensive piece of legislation designed to overhaul the current healthcare system. The bill proposes a public health insurance option, significant reductions in prescription drug costs, and increased funding for mental health services. Senator Smith emphasized that the bill is a crucial step towards ensuring every American has access to affordable, quality healthcare, regardless of their income or pre-existing conditions. The bill is expected to face strong opposition from pharmaceutical companies and private insurance providers, but Senator Smith expressed confidence in its passage, citing broad public support.',
    image: 'https://images.unsplash.com/photo-1584036561584-b03fde03676e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Senator Jane Smith',
    issues: ['Healthcare', 'Legislation'],
    type: 'Announcement',
    comments: [
      {
        id: '1',
        author: 'Healthcare Advocate',
        text: 'This is a monumental step forward for our country. Thank you, Senator Smith!',
        date: 'Mar 15, 2024',
        userType: 'public',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    ],
  },
  '2': {
    title: 'Mayor Chen Faces Scrutiny Over City Budget Deficit',
    author: 'Local Times',
    date: '2024-03-14',
    summary: 'Mayor Lisa Chen is under pressure after a new report revealed a significant deficit in the city\'s annual budget, raising concerns about fiscal management.',
    fullContent: 'A recently released independent audit has exposed a substantial budget deficit in the city of San Francisco, putting Mayor Lisa Chen\'s administration under intense scrutiny. The report highlights overspending in several departments and a significant shortfall in projected tax revenues. Critics are calling for immediate action and greater transparency from the Mayor\'s office. Mayor Chen acknowledged the challenges but assured the public that her team is working diligently to identify cost-saving measures and explore new revenue streams to address the deficit without impacting essential public services.',
    image: 'https://images.unsplash.com/photo-1556761175-5974ddf47cd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Mayor Lisa Chen',
    issues: ['Budget', 'Scandal'],
    type: 'Scandal',
    comments: [
      {
        id: '1',
        author: 'Concerned Citizen',
        text: 'This is a clear example of mismanagement. We need to hold our elected officials accountable.',
        date: 'Mar 14, 2024',
        userType: 'public',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Chief of Staff Resigns Amidst Internal Disagreements',
    author: 'Political Insider',
    date: '2024-03-12',
    summary: 'The Chief of Staff for Representative Michael Johnson has abruptly resigned, citing irreconcilable differences within the office.',
    fullContent: 'In a surprising turn of events, Sarah Jenkins, Chief of Staff for Representative Michael Johnson, announced her immediate resignation today. In a brief statement, Jenkins cited \'irreconcilable differences regarding strategic direction\' as the reason for her departure. This marks the third high-profile resignation from Representative Johnson\'s office in the past six months, raising questions about the internal dynamics and leadership within his team. Representative Johnson\'s office has yet to issue a formal statement regarding the resignation.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Rep. Michael Johnson',
    issues: ['Staffing', 'Resignation'],
    type: 'Personnel Change',
    comments: [
      {
        id: '1',
        author: 'Disappointed Voter',
        text: 'This is a clear sign of a dysfunctional office. We need to demand better from our representatives.',
        date: 'Mar 12, 2024',
        userType: 'public',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    ],
  },
  '4': {
    id: '4',
    title: 'New Director Appointed to Environmental Protection Agency',
    author: 'National Gazette',
    date: '2024-03-10',
    summary: 'The President has announced the appointment of Dr. Evelyn Reed as the new Director of the Environmental Protection Agency, signaling a renewed focus on climate initiatives.',
    fullContent: 'President John Adams today confirmed the appointment of Dr. Evelyn Reed, a renowned environmental scientist, as the new Director of the Environmental Protection Agency (EPA). Dr. Reed, known for her extensive research in sustainable energy and climate policy, is expected to lead the agency in a more aggressive pursuit of environmental protection and climate change mitigation. This appointment is seen as a clear signal from the administration about its commitment to addressing climate change and investing in green technologies.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Presidential Administration',
    issues: ['Appointments', 'Environment'],
    type: 'Personnel Change',
    comments: [
      {
        id: '1',
        author: 'Environmental Activist',
        text: 'This is a huge step forward for our country. We need to continue to push for more action on climate change.',
        date: 'Mar 10, 2024',
        userType: 'public',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
    ],
  },
};

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams();
  const newsItem = NEWS_DETAILS[id as string];

  if (!newsItem) {
    return (
      <View style={styles.container}>
        <Text>News item not found.</Text>
      </View>
    );
  }

  const handleCommentSubmit = (newComment) => {
    // In a real app, this would be saved to a database
    console.log('New comment submitted:', newComment);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#4A5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>News Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Image source={{ uri: newsItem.image }} style={styles.newsImage} />

      <View style={styles.content}>
        <Text style={styles.newsType}>{newsItem.type}</Text>
        <Text style={styles.newsTitle}>{newsItem.title}</Text>

        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <User size={16} color="#8E8E93" />
            <Text style={styles.metaText}>{newsItem.author}</Text>
          </View>
          <View style={styles.metaItem}>
            <Calendar size={16} color="#8E8E93" />
            <Text style={styles.metaText}>{newsItem.date}</Text>
          </View>
        </View>

        <Text style={styles.fullContent}>{newsItem.fullContent}</Text>

        <View style={styles.issuesContainer}>
          <Text style={styles.issuesLabel}>Related Issues:</Text>
          <View style={styles.issueTags}>
            {newsItem.issues.map((issue, index) => (
              <View key={index} style={styles.issueTag}>
                <Tag size={14} color="#667eea" />
                <Text style={styles.issueText}>{issue}</Text>
              </View>
            ))}
          </View>
        </View>

        <Comments comments={newsItem.comments} onCommentSubmit={handleCommentSubmit} />
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
  newsImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  content: {
    padding: 24,
  },
  newsType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 6,
  },
  fullContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
    marginBottom: 24,
  },
  issuesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 24,
  },
  issuesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  issueTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  issueTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  issueText: {
    fontSize: 14,
    color: '#3F51B5',
    fontWeight: '500',
    marginLeft: 4,
  },
});