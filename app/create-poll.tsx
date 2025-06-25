import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function CreatePollScreen() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');

  const handleCreatePoll = () => {
    // In a real app, you would handle the form submission here
    console.log({ question, options: [option1, option2, option3, option4].filter(Boolean) });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create New Poll</Text>
        <TouchableOpacity onPress={() => router.back()}>
            <Feather name="x" size={24} color="#4A5568" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Poll Question</Text>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="e.g., Should the city invest in more bike lanes?"
        />
        <Text style={styles.label}>Options (at least 2)</Text>
        <TextInput
          style={styles.input}
          value={option1}
          onChangeText={setOption1}
          placeholder="Option 1"
        />
        <TextInput
          style={styles.input}
          value={option2}
          onChangeText={setOption2}
          placeholder="Option 2"
        />
        <TextInput
          style={styles.input}
          value={option3}
          onChangeText={setOption3}
          placeholder="Option 3 (Optional)"
        />
        <TextInput
          style={styles.input}
          value={option4}
          onChangeText={setOption4}
          placeholder="Option 4 (Optional)"
        />
        <TouchableOpacity style={styles.createButton} onPress={handleCreatePoll}>
          <Text style={styles.createButtonText}>Create Poll</Text>
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
