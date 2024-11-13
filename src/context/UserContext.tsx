import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  role: 'employer' | 'worker';
  balance?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  switchRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    role: 'worker', // Changed to worker
    balance: 3240
  });

  const switchRole = () => {
    if (user) {
      setUser({
        ...user,
        role: user.role === 'employer' ? 'worker' : 'employer'
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, switchRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}