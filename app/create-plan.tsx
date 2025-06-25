import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function CreatePlanScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [timeline, setTimeline] = useState('');

  const handleCreatePlan = () => {
    // In a real app, you would handle the form submission here
    console.log({ title, description, goals, estimatedCost, timeline });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create New Plan</Text>
        <TouchableOpacity onPress={() => router.back()}>
            <Feather name="x" size={24} color="#4A5568" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Universal Basic Income Initiative"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="A brief summary of the plan..."
          multiline
        />
        <Text style={styles.label}>Goals (comma-separated)</Text>
        <TextInput
          style={styles.input}
          value={goals}
          onChangeText={setGoals}
          placeholder="e.g., Reduce poverty, Stimulate economy"
        />
        <Text style={styles.label}>Estimated Cost</Text>
        <TextInput
          style={styles.input}
          value={estimatedCost}
          onChangeText={setEstimatedCost}
          placeholder="e.g., $1.2 Trillion"
        />
        <Text style={styles.label}>Timeline</Text>
        <TextInput
          style={styles.input}
          value={timeline}
          onChangeText={setTimeline}
          placeholder="e.g., 2024-2026"
        />
        <TouchableOpacity style={styles.createButton} onPress={handleCreatePlan}>
          <Text style={styles.createButtonText}>Create Plan</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
