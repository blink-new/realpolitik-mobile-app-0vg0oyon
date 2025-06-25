import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BarChart2, CheckCircle } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_POLLS = [
  {
    id: 'p1',
    question: 'Should the city invest in more bike lanes?',
    options: [
      { text: 'Yes, absolutely!', votes: 120 },
      { text: 'No, focus on roads.', votes: 80 },
      { text: 'Only in certain areas.', votes: 50 },
    ],
    totalVotes: 250,
    userVoted: null, // Stores the index of the option the user voted for
  },
  {
    id: 'p2',
    question: 'What is the most pressing issue in our community?',
    options: [
      { text: 'Affordable Housing', votes: 300 },
      { text: 'Public Safety', votes: 250 },
      { text: 'Education Quality', votes: 150 },
      { text: 'Job Opportunities', votes: 100 },
    ],
    totalVotes: 800,
    userVoted: null,
  },
];

const Polls = () => {
  const [polls, setPolls] = useState(MOCK_POLLS);
  const { user } = useAuth();

  const handleVote = (pollId: string, optionIndex: number) => {
    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId && poll.userVoted === null) {
          const updatedOptions = poll.options.map((option, idx) =>
            idx === optionIndex ? { ...option, votes: option.votes + 1 } : option
          );
          return { ...poll, options: updatedOptions, totalVotes: poll.totalVotes + 1, userVoted: optionIndex };
        }
        return poll;
      })
    );
  };

  const renderPoll = ({ item }: { item: typeof MOCK_POLLS[0] }) => (
    <View style={styles.pollCard}>
      <Text style={styles.pollQuestion}>{item.question}</Text>
      <View style={styles.optionsContainer}>
        {item.options.map((option, index) => {
          const percentage = item.totalVotes > 0 ? (option.votes / item.totalVotes) * 100 : 0;
          const isVoted = item.userVoted !== null;
          const isSelected = item.userVoted === index;

          return (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleVote(item.id, index)}
              disabled={isVoted}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>{option.text}</Text>
                {isVoted && (
                  <Text style={styles.voteCountText}>{option.votes} votes ({percentage.toFixed(1)}%)</Text>
                )}
              </View>
              {isVoted && (
                <View style={[styles.progressBar, { width: `${percentage}%` }]} />
              )}
              {isSelected && <CheckCircle size={20} color="#48bb78" style={styles.selectedIcon} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.totalVotesText}>Total Votes: {item.totalVotes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {user?.userType === 'politician' && (
        <Link href="/create-poll" asChild>
          <TouchableOpacity style={styles.createPollButton}>
            <Feather name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.createPollButtonText}>Create New Poll</Text>
          </TouchableOpacity>
        </Link>
      )}
      <FlatList
        data={polls}
        renderItem={renderPoll}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noPollsText}>No polls available at the moment.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  createPollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  createPollButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pollCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pollQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1C1C1E',
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
  voteCountText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    opacity: 0.7,
  },
  selectedIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
  },
  totalVotesText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'right',
    marginTop: 8,
  },
  noPollsText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 20,
  },
});

export default Polls;