import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Search, Filter, MapPin, ChevronDown, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'New Community Park in Downtown Springfield',
    politician: 'Mayor Lisa Chen',
    level: 'County',
    location: 'Springfield County',
    description: 'A proposal to convert the old industrial lot on 1st Street into a green space with a playground, community garden, and walking trails.',
    votes: 1256,
    status: 'Proposal',
  },
  {
    id: '2',
    title: 'Highway 101 Expansion Project',
    politician: 'State Senator John Miller',
    level: 'State',
    location: 'California',
    description: 'Expanding Highway 101 from 4 to 6 lanes between San Francisco and San Jose to reduce traffic congestion.',
    votes: 8342,
    status: 'Under Review',
  },
  {
    id: '3',
    title: 'Federal High-Speed Rail Initiative',
    politician: 'Presidential Candidate',
    level: 'Federal',
    location: 'USA',
    description: 'A national high-speed rail network connecting major cities across the United States.',
    votes: 150231,
    status: 'Proposed',
  },
];

const LEVELS = ['All', 'Federal', 'State', 'County', 'Town'];

export default function ProjectsScreen() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         project.politician.toLowerCase().includes(searchText.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || project.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const renderProject = ({ item }) => (
    <TouchableOpacity 
      style={styles.projectCard}
      onPress={() => router.push(`/project-details?id=${item.id}`)}
    >
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{item.title}</Text>
      </View>
      <Text style={styles.politicianName}>Proposed by {item.politician}</Text>
      <View style={styles.locationContainer}>
        <MapPin size={16} color="#8E8E93" />
        <Text style={styles.locationText}>{item.location} ({item.level})</Text>
      </View>
      <Text style={styles.projectDescription}>{item.description}</Text>
      <View style={styles.projectFooter}>
        <Text style={styles.voteCount}>{item.votes.toLocaleString()} Votes</Text>
        <TouchableOpacity style={styles.voteButton}>
          <Text style={styles.voteButtonText}>Vote Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Projects</Text>
        <Text style={styles.headerSubtitle}>Vote on initiatives in your community</Text>
      </View>

      {user?.userType === 'politician' && (
        <TouchableOpacity 
          style={styles.proposeButton}
          onPress={() => router.push('/post-project')}
        >
          <Text style={styles.proposeButtonText}>Propose New Project</Text>
        </TouchableOpacity>
      )}

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects or politicians..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Level:</Text>
        <View style={styles.filterOptions}>
          {LEVELS.map(level => (
            <TouchableOpacity 
              key={level}
              style={[styles.filterOption, selectedLevel === level && styles.selectedFilterOption]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[styles.filterOptionText, selectedLevel === level && styles.selectedFilterOptionText]}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.projectsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  proposeButton: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  proposeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 8,
    color: '#1C1C1E',
  },
  filterContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E9E9EB',
  },
  selectedFilterOption: {
    backgroundColor: '#667eea',
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  selectedFilterOptionText: {
    color: '#FFFFFF',
  },
  projectsList: {
    padding: 24,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectHeader: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  politicianName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#667eea',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
    marginBottom: 16,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 16,
  },
  voteCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  voteButton: {
    backgroundColor: '#48bb78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});