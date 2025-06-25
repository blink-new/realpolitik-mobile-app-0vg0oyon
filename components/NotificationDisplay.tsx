import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNotifications } from '@/contexts/NotificationContext';
import { CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react-native';

const NotificationDisplay = () => {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color="#48bb78" />;
      case 'info':
        return <Info size={20} color="#667eea" />;
      case 'warning':
        return <AlertTriangle size={20} color="#f6ad55" />;
      case 'error':
        return <XCircle size={20} color="#ef4444" />;
      default:
        return <Info size={20} color="#667eea" />;
    }
  };

  return (
    <View style={styles.container}>
      {notifications.map((notif) => (
        <View key={notif.id} style={[styles.notificationCard, styles[notif.type]]}>
          {getIcon(notif.type)}
          <Text style={styles.notificationText}>{notif.message}</Text>
          <TouchableOpacity onPress={() => removeNotification(notif.id)} style={styles.closeButton}>
            <Feather name="x" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    width: '100%',
    zIndex: 1000,
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationText: {
    flex: 1,
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    marginLeft: 10,
    padding: 5,
  },
  success: {
    backgroundColor: '#48bb78',
  },
  info: {
    backgroundColor: '#667eea',
  },
  warning: {
    backgroundColor: '#f6ad55',
  },
  error: {
    backgroundColor: '#ef4444',
  },
});

export default NotificationDisplay;
