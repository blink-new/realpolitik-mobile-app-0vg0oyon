import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { Search, Filter, Bookmark, Share2, MessageCircle, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Senator Smith Announces Major Healthcare Reform Bill',
    author: 'RealPolitik News',
    date: '2024-03-15',
    summary: 'Senator Jane Smith today unveiled a landmark healthcare reform bill aimed at expanding coverage and reducing costs for millions of Americans.',
    image: 'https://images.unsplash.com/photo-1584036561584-b03fde03676e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Senator Jane Smith',
    issues: ['Healthcare', 'Legislation'],
    type: 'Announcement',
  },
  {
    id: '2',
    title: 'Mayor Chen Faces Scrutiny Over City Budget Deficit',
    author: 'Local Times',
    date: '2024-03-14',
    summary: 'Mayor Lisa Chen is under pressure after a new report revealed a significant deficit in the city\'s annual budget, raising concerns about fiscal management.',
    image: 'https://images.unsplash.com/photo-1556761175-5974ddf47cd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Mayor Lisa Chen',
    issues: ['Budget', 'Scandal'],
    type: 'Scandal',
  },
  {
    id: '3',
    title: 'Chief of Staff Resigns Amidst Internal Disagreements',
    author: 'Political Insider',
    date: '2024-03-12',
    summary: 'The Chief of Staff for Representative Michael Johnson has abruptly resigned, citing irreconcilable differences within the office.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Rep. Michael Johnson',
    issues: ['Staffing', 'Resignation'],
    type: 'Personnel Change',
  },
  {
    id: '4',
    title: 'New Director Appointed to Environmental Protection Agency',
    author: 'National Gazette',
    date: '2024-03-10',
    summary: 'The President has announced the appointment of Dr. Evelyn Reed as the new Director of the Environmental Protection Agency, signaling a renewed focus on climate initiatives.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    politician: 'Presidential Administration',
    issues: ['Appointments', 'Environment'],
    type: 'Personnel Change',
  },
];

const NEWS_TYPES = ['All', 'Announcement', 'Scandal', 'Personnel Change'];

export default function NewsScreen() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredNews = MOCK_NEWS.filter(newsItem => {
    const matchesSearch = newsItem.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         newsItem.summary.toLowerCase().includes(searchText.toLowerCase()) ||
                         newsItem.politician.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = selectedType === 'All' || newsItem.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity style={styles.newsCard} onPress={() => router.push(`/news-details?id=${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsType}>{item.type}</Text>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSummary}>{item.summary}</Text>
        <View style={styles.newsFooter}>
          <Text style={styles.newsAuthor}>{item.author}</Text>
          <Text style={styles.newsDate}>{item.date}</Text>
        </View>
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
        <Text style={styles.headerTitle}>Political News</Text>
        <Text style={styles.headerSubtitle}>Stay informed on the latest political developments</Text>
      </View>

      {user?.userType === 'politician' && (
        <TouchableOpacity 
          style={styles.postNewsButton}
          onPress={() => router.push('/post-news')}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.postNewsButtonText}>Post New Article</Text>
        </TouchableOpacity>
      )}

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search news..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, selectedType !== 'All' && styles.filterButtonActive]}
          onPress={() => setSelectedType(selectedType === 'All' ? NEWS_TYPES[1] : 'All')}
        >
          <Filter size={20} color={selectedType !== 'All' ? '#667eea' : '#8E8E93'} />
        </TouchableOpacity>
      </View>

      {selectedType !== 'All' && (
        <View style={styles.filtersContainer}>
          {renderFilterButton(NEWS_TYPES, selectedType, setSelectedType, 'News Type')}
        </View>
      )}

      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.newsList}
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
  postNewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  postNewsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
  newsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 16,
  },
  newsType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  newsSummary: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsAuthor: {
    fontSize: 12,
    color: '#8E8E93',
  },
  newsDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
});