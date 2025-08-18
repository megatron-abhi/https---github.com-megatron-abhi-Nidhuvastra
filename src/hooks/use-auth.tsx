
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface MockUser {
    uid: string;
    phoneNumber: string | null;
}

interface AuthContextType {
  user: User | MockUser | null;
  loading: boolean;
  setMockUser: (user: MockUser | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setMockUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a mock user in session storage first
    const mockUserJson = sessionStorage.getItem('mockUser');
    if (mockUserJson) {
        setUser(JSON.parse(mockUserJson));
        setLoading(false);
        return; // Don't set up the real auth listener if a mock user is active
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!sessionStorage.getItem('mockUser')) { // Ensure mock user wasn't set in another tab
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setMockUser = (mockUser: MockUser | null) => {
      if (mockUser) {
          sessionStorage.setItem('mockUser', JSON.stringify(mockUser));
          setUser(mockUser);
      } else {
          sessionStorage.removeItem('mockUser');
          // This will trigger a re-check of real auth state on next load
          // For now, just set user to null
          setUser(null);
      }
  }

  return (
    <AuthContext.Provider value={{ user, loading, setMockUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);