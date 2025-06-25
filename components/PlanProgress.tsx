import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react-native';
import { Feather } from '@expo/vector-icons';

const PlanProgress = ({ updates, status, milestones, onCompleteMilestone }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'Completed':
        return <CheckCircle size={24} color="#48bb78" />;
      case 'In Progress':
        return <Clock size={24} color="#f6ad55" />;
      case 'Stalled':
        return <AlertCircle size={24} color="#ef4444" />;
      default:
        return <CheckCircle size={24} color="#48bb78" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        <View style={styles.statusBadge}>
          {getStatusIcon()}
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Implementation Milestones</Text>
      <View style={styles.milestonesContainer}>
        {milestones.map((milestone, index) => (
          <View key={index} style={styles.milestoneItem}>
            <View style={styles.milestoneMarker} />
            <View style={styles.milestoneContent}>
              <Text style={styles.milestonePhase}>{milestone.phase}</Text>
              <Text style={styles.milestoneTimeline}>{milestone.timeline}</Text>
              <Text style={styles.milestoneDescription}>{milestone.description}</Text>
              {!milestone.completed && (
                <TouchableOpacity 
                  style={styles.completeButton}
                  onPress={() => onCompleteMilestone(index)}
                >
                  <Feather name="check-circle" size={16} color="#FFFFFF" />
                  <Text style={styles.completeButtonText}>Mark as Complete</Text>
                </TouchableOpacity>
              )}
              {milestone.completed && (
                <View style={styles.completedBadge}>
                  <Feather name="check" size={16} color="#48bb78" />
                  <Text style={styles.completedBadgeText}>Completed</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Updates</Text>
      <View style={styles.updatesContainer}>
        {updates.map((update, index) => (
          <View key={index} style={styles.updateItem}>
            <View style={styles.updateMarker} />
            <View style={styles.updateContent}>
              <Text style={styles.updateDate}>{update.date}</Text>
              <Text style={styles.updateText}>{update.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  statusContainer: {
    marginBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  milestonesContainer: {
    marginBottom: 24,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  milestoneMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#667eea',
    marginRight: 16,
    marginTop: 4,
  },
  milestoneContent: {
    flex: 1,
  },
  milestonePhase: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  milestoneTimeline: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#48bb78',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  completedBadgeText: {
    color: '#48bb78',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  updatesContainer: {},
  updateItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  updateMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#667eea',
    marginRight: 16,
    marginTop: 4,
  },
  updateContent: {
    flex: 1,
  },
  updateDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 4,
  },
  updateText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
  },
});

export default PlanProgress;