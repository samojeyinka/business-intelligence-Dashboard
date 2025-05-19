// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, AuthUser, LoginCredentials, RegisterCredentials } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next'; // You'll need to install this package

// Initial auth state - explicitly set isLoading to true initially
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true
  error: null,
};

// Create context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();

  // Check if user is already logged in on mount - only runs ONCE
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedKeepLoggedIn = localStorage.getItem('keepLoggedIn');
    
    // Set a small timeout to ensure consistent timing
    setTimeout(() => {
      if (storedUser && (storedKeepLoggedIn === 'true')) {
        try {
          const user = JSON.parse(storedUser) as AuthUser;
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          // Invalid stored user, clear localStorage
          localStorage.removeItem('user');
          localStorage.removeItem('keepLoggedIn');
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    }, 100);
  }, []); // Empty dependency array ensures this only runs once

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const userData = await response.json();

      // Save to state and localStorage
      setState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      // Store user data and keepLoggedIn preference
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('keepLoggedIn', credentials.keepLoggedIn.toString());

      // Set last activity timestamp if not keepLoggedIn
      if (!credentials.keepLoggedIn) {
        localStorage.setItem('lastActivity', Date.now().toString());
      }

      router.push('/dashboard');
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };

  // Register function
  const register = async (userData: RegisterCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      // Successful registration
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));

      // Redirect to login
      router.push('/auth/login');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      }));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call the logout API endpoint to clear the HTTP-only cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important for cookies
      });
      
      // Clear the cookie on the client side as well
      deleteCookie('user_token');
      
      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('keepLoggedIn');
      localStorage.removeItem('lastActivity');

      // Reset state
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      // Navigate to login page
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, we should still try to clean up
      localStorage.removeItem('user');
      localStorage.removeItem('keepLoggedIn');
      localStorage.removeItem('lastActivity');
      deleteCookie('user_token');
      
      router.replace('/auth/login');
    }
  };

  // Clear error
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  // Context value
  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for consuming the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}