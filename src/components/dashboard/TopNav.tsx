'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export default function TopNav() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
      
        <div className="flex items-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
            </div>
            <input 
              className="w-full pl-10 pr-3 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-0 rounded-md dark:placeholder-gray-400 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input" 
              type="text" 
              placeholder="Search dashboard..." 
              aria-label="Search"
            />
          </div>
        </div>

      
        <div className="flex items-center space-x-4">
  
          <button
            onClick={toggleTheme}
            className="p-1 rounded-md focus:outline-none focus:shadow-outline-purple"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

        
          <button className="p-1 relative rounded-md focus:outline-none focus:shadow-outline-purple">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"></span>
          </button>

       
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center focus:outline-none"
              aria-label="Account" 
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
            </button>

            {isProfileMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 p-1 bg-white rounded-md shadow-lg dark:bg-gray-800 z-50"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <div className="py-1 border-b border-gray-100 dark:border-gray-700">
                  <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    Signed in as
                  </p>
                  <p className="px-4 pb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <Link 
                    href="/dashboard/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    Settings
                  </Link>
                </div>
                <div className="py-1 border-t border-gray-100 dark:border-gray-700">
                  <button 
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}