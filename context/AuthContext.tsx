import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface AuthContextType {
  token: string | null;
  user: any;
  isLoading: boolean;
  login: (newToken: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

// Helper for storage cross-platform
const getItem = async (key: string) => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
};

const setItem = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
};

const deleteItem = async (key: string) => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = await getItem('userToken');
        const savedUser = await getItem('userData');
        
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Session restoration error", e);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (newToken: string, userData: any) => {
    try {
      await setItem('userToken', newToken);
      await setItem('userData', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
    } catch (e) {
      console.error("Failed to save session", e);
    }
  };

  const logout = async () => {
    try {
      await deleteItem('userToken');
      await deleteItem('userData');
      setToken(null);
      setUser(null);
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};