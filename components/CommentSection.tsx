import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { User, Send, MessageSquare } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

interface Comment {
  id: string;
  author: string;
  authorType: 'politician' | 'party_staff' | 'citizen';
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleAddComment = (parentId?: string) => {
    if (newComment.trim() === '') return;

    const authorName = user?.name || 'Anonymous';
    const authorType = user?.userType || 'citizen';

    onAddComment(newComment, parentId);
    setNewComment('');
    setReplyingTo(null);
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <User size={16} color="#4A5568" />
        <Text style={styles.commentAuthor}>{item.author}</Text>
        <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.commentContent}>{item.content}</Text>
      <TouchableOpacity style={styles.replyButton} onPress={() => setReplyingTo(item.id)}>
        <MessageSquare size={14} color="#667eea" />
        <Text style={styles.replyButtonText}>Reply</Text>
      </TouchableOpacity>

      {item.replies && item.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {item.replies.map(reply => (
            <View key={reply.id} style={styles.replyCommentContainer}>
              <View style={styles.commentHeader}>
                <User size={16} color="#4A5568" />
                <Text style={styles.commentAuthor}>{reply.author}</Text>
                <Text style={styles.commentTimestamp}>{reply.timestamp}</Text>
              </View>
              <Text style={styles.commentContent}>{reply.content}</Text>
            </View>
          ))}
        </View>
      )}

      {replyingTo === item.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder={`Replying to ${item.author}...`}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => handleAddComment(item.id)}>
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comments</Text>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noCommentsText}>No comments yet. Be the first to share your thoughts!</Text>
        }
      />

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleAddComment()}>
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 0,
  },
  sendButton: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  commentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginLeft: 8,
    marginRight: 8,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  commentContent: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 22,
    marginBottom: 8,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  replyButtonText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  repliesContainer: {
    marginTop: 12,
    marginLeft: 24,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E5EA',
    paddingLeft: 12,
  },
  replyCommentContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  noCommentsText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 20,
  },
});

export default CommentSection;
