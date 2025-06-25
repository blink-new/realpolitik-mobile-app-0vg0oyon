import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Search, Filter, Calendar, DollarSign, Target } from 'lucide-react-native';
import { router } from 'expo-router';

// Extended mock data with more plans from different politicians and parties
const ALL_PLANS = [
  {
    id: '1',
    title: 'Universal Basic Income Initiative',
    description: 'A plan to provide a basic income to all citizens, ensuring a safety net and stimulating the economy.',
    goals: ['Reduce poverty', 'Increase consumer spending', 'Improve public health'],
    estimatedCost: '1.2 Trillion',
    timeline: '2024-2026',
    politician: 'Senator Jane Smith',
    party: 'Democratic',
    topics: ['Social Policy', 'Economy'],
  },
  {
    id: '2',
    title: 'Green Energy Transition Act',
    description: 'A comprehensive strategy to transition the state to 100% renewable energy sources by 2035.',
    goals: ['Combat climate change', 'Create green jobs', 'Reduce reliance on fossil fuels'],
    estimatedCost: '500 Billion',
    timeline: '2024-2035',
    politician: 'Senator Jane Smith',
    party: 'Democratic',
    topics: ['Environment', 'Energy', 'Jobs'],
  },
  {
    id: '3',
    title: 'Small Business Tax Relief Program',
    description: 'Comprehensive tax cuts and incentives for small businesses to boost economic growth.',
    goals: ['Support small businesses', 'Create jobs', 'Boost local economies'],
    estimatedCost: '300 Billion',
    timeline: '2024-2025',
    politician: 'Rep. John Doe',
    party: 'Republican',
    topics: ['Economy', 'Tax Policy', 'Small Business'],
  },
  {
    id: '4',
    title: 'National Infrastructure Modernization',
    description: 'A massive infrastructure overhaul including roads, bridges, broadband, and public transit.',
    goals: ['Modernize infrastructure', 'Create jobs', 'Improve connectivity'],
    estimatedCost: '2 Trillion',
    timeline: '2024-2030',
    politician: 'Rep. John Doe',
    party: 'Republican',
    topics: ['Infrastructure', 'Jobs', 'Technology'],
  },
  {
    id: '5',
    title: 'Healthcare for All Initiative',
    description: 'Expanding healthcare access and affordability for every American citizen.',
    goals: ['Universal healthcare', 'Reduce medical costs', 'Improve health outcomes'],
    estimatedCost: '800 Billion',
    timeline: '2024-2028',
    politician: 'Gov. Sarah Johnson',
    party: 'Democratic',
    topics: ['Healthcare', 'Social Policy'],
  },
  {
    id: '6',
    title: 'Education Excellence Program',
    description: 'Comprehensive education reform focusing on STEM, vocational training, and teacher support.',
    goals: ['Improve education quality', 'Support teachers', 'Prepare students for future jobs'],
    estimatedCost: '450 Billion',
    timeline: '2024-2029',
    politician: 'Gov. Sarah Johnson',
    party: 'Democratic',
    topics: ['Education', 'STEM', 'Workforce Development'],
  },
];

const PARTIES = ['All', 'Democratic', 'Republican'];
const TOPICS = ['All', 'Economy', 'Healthcare', 'Education', 'Environment', 'Infrastructure', 'Social Policy'];

export default function BrowsePlansScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedParty, setSelectedParty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlans = ALL_PLANS.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchText.toLowerCase()) ||
                         plan.politician.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesParty = selectedParty === 'All' || plan.party === selectedParty;
    const matchesTopic = selectedTopic === 'All' || plan.topics.includes(selectedTopic);
    
    return matchesSearch && matchesParty && matchesTopic;
  });

  const renderPlan = ({ item }) => (
    <TouchableOpacity 
      style={styles.planCard}
      onPress={() => router.push(`/plan-details?id=${item.id}`)}
    >
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>{item.title}</Text>
        <View style={styles.partyBadge}>
          <Text style={[styles.partyBadgeText, { color: item.party === 'Democratic' ? '#0066CC' : '#CC0000' }]}>
            {item.party}
          </Text>
        </View>
      </View>
      
      <Text style={styles.politicianName}>by {item.politician}</Text>
      <Text style={styles.planDescription}>{item.description}</Text>
      
      <View style={styles.planMeta}>
        <View style={styles.metaItem}>
          <DollarSign size={16} color="#4A5568" />
          <Text style={styles.metaText}>{item.estimatedCost}</Text>
        </View>
        <View style={styles.metaItem}>
          <Calendar size={16} color="#4A5568" />
          <Text style={styles.metaText}>{item.timeline}</Text>
        </View>
      </View>
      
      <View style={styles.topicsContainer}>
        {item.topics.map((topic, index) => (
          <View key={index} style={styles.topicTag}>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (items, selectedItem, onSelect, label) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>{label}</Text>
      <View style={styles.filterOptions}>
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterOption,
              selectedItem === item && styles.selectedFilterOption
            ]}
            onPress={() => onSelect(item)}
          >
            <Text style={[
              styles.filterOptionText,
              selectedItem === item && styles.selectedFilterOptionText
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse Plans</Text>
        <Text style={styles.headerSubtitle}>Discover political plans and initiatives</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search plans, politicians, or topics..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, showFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={showFilters ? '#667eea' : '#8E8E93'} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          {renderFilterButton(PARTIES, selectedParty, setSelectedParty, 'Party')}
          {renderFilterButton(TOPICS, selectedTopic, setSelectedTopic, 'Topic')}
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredPlans.length} plan{filteredPlans.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filteredPlans}
        renderItem={renderPlan}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.plansList}
        showsVerticalScrollIndicator={false}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 8,
    color: '#1C1C1E',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  selectedFilterOption: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#4A5568',
  },
  selectedFilterOptionText: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  resultsCount: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  plansList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 12,
  },
  partyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
  },
  partyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  politicianName: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 12,
  },
  planMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 4,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  topicTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#667eea',
  },
  topicText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});