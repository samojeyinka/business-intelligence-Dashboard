'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';


const INACTIVITY_TIMEOUT = 60 * 1000;

export function useAutoLogout() {
  const { logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

 
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }


    const keepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';
    
    if (!keepLoggedIn) {
      localStorage.setItem('lastActivity', Date.now().toString());
      
      timeoutRef.current = setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT);
    }
  };


  useEffect(() => {
   
    const keepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';

    if (!keepLoggedIn) {

      const lastActivity = localStorage.getItem('lastActivity');
      
      if (lastActivity) {
        const lastActivityTime = parseInt(lastActivity, 10);
        const currentTime = Date.now();

        if (currentTime - lastActivityTime > INACTIVITY_TIMEOUT) {
          logout();
          return;
        }
      }
      

      const events = [
        'mousedown', 'mousemove', 'keypress', 
        'scroll', 'touchstart', 'click'
      ];
      

      resetTimer();

      events.forEach(event => {
        window.addEventListener(event, resetTimer);
      });
      

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        events.forEach(event => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [logout]);
}