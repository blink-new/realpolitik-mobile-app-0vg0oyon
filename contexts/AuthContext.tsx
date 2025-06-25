import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserType = 'politician' | 'party_staff' | 'general_public';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  position?: string; // For politicians and party staff
  party?: string; // For politicians and party staff
  verified?: boolean; // For politicians
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, userType: UserType) => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    name: string;
    userType: UserType;
    position?: string;
    party?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string, userType: UserType) => {
    setLoading(true);
    try {
      // Mock authentication - in real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0].replace(/[._]/g, ' '),
        userType,
        ...(userType === 'politician' && {
          position: 'Mayor',
          party: 'Democratic Party',
          verified: true
        }),
        ...(userType === 'party_staff' && {
          position: 'Campaign Manager',
          party: 'Democratic Party'
        })
      };

      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    name: string;
    userType: UserType;
    position?: string;
    party?: string;
  }) => {
    setLoading(true);
    try {
      // Mock registration - in real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        position: userData.position,
        party: userData.party,
        verified: userData.userType === 'politician' ? false : undefined // Politicians need verification
      };

      setUser(newUser);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}