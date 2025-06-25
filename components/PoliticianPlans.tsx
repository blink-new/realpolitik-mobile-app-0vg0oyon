import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const MOCK_PLANS = [
  {
    id: '1',
    title: 'Universal Basic Income Initiative',
    description: 'A plan to provide a basic income to all citizens, ensuring a safety net and stimulating the economy.',
    goals: ['Reduce poverty', 'Increase consumer spending', 'Improve public health'],
    estimatedCost: '1.2 Trillion',
    timeline: '2024-2026',
  },
  {
    id: '2',
    title: 'Green Energy Transition Act',
    description: 'A comprehensive strategy to transition the state to 100% renewable energy sources by 2035.',
    goals: ['Combat climate change', 'Create green jobs', 'Reduce reliance on fossil fuels'],
    estimatedCost: '500 Billion',
    timeline: '2024-2035',
  },
];

const PoliticianPlans = () => {
  const renderPlan = ({ item }) => (
    <View style={styles.planContainer}>
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDescription}>{item.description}</Text>
      <View style={styles.planDetails}>
        <View style={styles.detailItem}>
          <Feather name="target" size={16} color="#4A5568" />
          <Text style={styles.detailText}>Goals: {item.goals.join(', ')}</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="dollar-sign" size={16} color="#4A5568" />
          <Text style={styles.detailText}>Cost: {item.estimatedCost}</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="calendar" size={16} color="#4A5568" />
          <Text style={styles.detailText}>Timeline: {item.timeline}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <FlatList
            data={MOCK_PLANS}
            renderItem={renderPlan}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <Link href="/create-plan" asChild>
                    <TouchableOpacity style={styles.createPlanButton}>
                        <Feather name="plus" size={20} color="#FFFFFF" />
                        <Text style={styles.createPlanButtonText}>Create New Plan</Text>
                    </TouchableOpacity>
                </Link>
            )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  createPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  createPlanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  planContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
  },
  planDetails: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#4A5568',
  },
});

export default PoliticianPlans;