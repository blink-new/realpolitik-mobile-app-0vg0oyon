import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import NotificationDisplay from '@/components/NotificationDisplay';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <NotificationProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="create-plan" options={{ presentation: 'modal' }} />
          <Stack.Screen name="plan-details" options={{ presentation: 'modal' }} />
          <Stack.Screen name="project-details" options={{ presentation: 'modal' }} />
          <Stack.Screen name="post-project" options={{ presentation: 'modal' }} />
          <Stack.Screen name="idea-details" options={{ presentation: 'modal' }} />
          <Stack.Screen name="recommend-idea" options={{ presentation: 'modal' }} />
          <Stack.Screen name="news-details" options={{ presentation: 'modal' }} />
          <Stack.Screen name="post-news" options={{ presentation: 'modal' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <NotificationDisplay />
      </NotificationProvider>
    </AuthProvider>
  );
}