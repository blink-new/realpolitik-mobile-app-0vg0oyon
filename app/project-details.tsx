import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { MapPin, User, BarChart2, CheckSquare } from 'lucide-react-native';

const PROJECT_DETAILS = {
  '1': {
    title: 'New Community Park in Downtown Springfield',
    politician: 'Mayor Lisa Chen',
    level: 'County',
    location: 'Springfield County',
    description: 'A proposal to convert the old industrial lot on 1st Street into a green space with a playground, community garden, and walking trails. The project aims to increase green space, provide recreational opportunities, and improve community well-being.',
    votes: 1256,
    status: 'Proposal',
    details: 'The project will be funded through a combination of city funds and a state grant for urban renewal. Construction is estimated to take 18 months. The community will be involved in the design process through a series of public workshops.',
  },
  // Add more project details as needed
};

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const project = PROJECT_DETAILS[id as string];

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#4A5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        
        <View style={styles.metaSection}>
          <View style={styles.metaItem}>
            <User size={16} color="#667eea" />
            <Text style={styles.metaText}>Proposed by {project.politician}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={16} color="#667eea" />
            <Text style={styles.metaText}>{project.location} ({project.level})</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{project.description}</Text>

        <Text style={styles.sectionTitle}>Additional Details</Text>
        <Text style={styles.description}>{project.details}</Text>

        <View style={styles.votingSection}>
          <Text style={styles.votingTitle}>Cast Your Vote</Text>
          <Text style={styles.voteCount}>{project.votes.toLocaleString()} votes so far</Text>
          <View style={styles.voteButtons}>
            <TouchableOpacity style={styles.voteButtonSupport}>
              <CheckSquare size={20} color="#FFFFFF" />
              <Text style={styles.voteButtonText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.voteButtonOppose}>
              <Feather name="x-square" size={20} color="#FFFFFF" />
              <Text style={styles.voteButtonText}>Oppose</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    padding: 24,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  metaSection: {
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
  },
  votingSection: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  votingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  voteCount: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 16,
  },
  voteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  voteButtonSupport: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#48bb78',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  voteButtonOppose: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
