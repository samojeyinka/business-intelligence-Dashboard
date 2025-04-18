'use client';
import { create } from 'zustand';

interface ThemeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(newMode));
    }
    return { darkMode: newMode };
  }),
}));

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedMode = localStorage.getItem('darkMode') === 'true';
  useThemeStore.setState({ darkMode: savedMode });
}