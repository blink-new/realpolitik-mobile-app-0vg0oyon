import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Comments = ({ comments: initialComments, onCommentSubmit }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') return;
    const newCommentObject = {
      id: Math.random().toString(),
      author: 'You', // In a real app, this would be the logged-in user
      text: newComment,
      date: 'Just now',
      userType: 'public',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    };
    setComments([...comments, newCommentObject]);
    onCommentSubmit(newCommentObject);
    setNewComment('');
  };

  const renderComment = ({ item }) => (
    <View style={[styles.commentContainer, item.userType === 'politician' && styles.politicianComment]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.authorName}>{item.author}</Text>
          {item.userType === 'politician' && (
            <View style={styles.politicianBadge}>
              <Text style={styles.politicianBadgeText}>Official</Text>
            </View>
          )}
          <Text style={styles.commentDate}>{item.date}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Public Feedback</Text>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add your comment..."
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
          <Feather name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  politicianComment: {
    backgroundColor: '#E8EAF6',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  politicianBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  politicianBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  submitButton: {
    backgroundColor: '#667eea',
    padding: 12,
    borderRadius: 24,
  },
});

export default Comments;
