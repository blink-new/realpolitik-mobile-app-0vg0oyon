import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useNotifications } from '@/contexts/NotificationContext';

export default function PostNewsScreen() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [fullContent, setFullContent] = useState('');
  const [politician, setPolitician] = useState('');
  const [issues, setIssues] = useState(''); // Comma separated
  const [type, setType] = useState('Announcement'); // Dropdown in real app
  const [image, setImage] = useState(''); // Image picker in real app

  const { addNotification } = useNotifications();

  const handlePostNews = () => {
    // In a real app, you would handle the form submission here
    console.log({ title, summary, fullContent, politician, issues, type, image });
    addNotification(`New News: ${title}`, 'info');
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post New Article</Text>
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
          placeholder="e.g., Senator Smith Announces New Bill"
        />
        <Text style={styles.label}>Summary</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={summary}
          onChangeText={setSummary}
          placeholder="A brief summary of the news..."
          multiline
        />
        <Text style={styles.label}>Full Content</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={fullContent}
          onChangeText={setFullContent}
          placeholder="The full news article content..."
          multiline
        />
        <Text style={styles.label}>Politician (Optional)</Text>
        <TextInput
          style={styles.input}
          value={politician}
          onChangeText={setPolitician}
          placeholder="e.g., Senator Jane Smith"
        />
        <Text style={styles.label}>Issues (comma-separated)</Text>
        <TextInput
          style={styles.input}
          value={issues}
          onChangeText={setIssues}
          placeholder="e.g., Healthcare, Legislation"
        />
        <Text style={styles.label}>Type</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="e.g., Announcement, Scandal, Personnel Change"
        />
        <Text style={styles.label}>Image URL (Optional)</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="e.g., https://example.com/image.jpg"
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePostNews}>
          <Text style={styles.postButtonText}>Post News</Text>
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
  postButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});