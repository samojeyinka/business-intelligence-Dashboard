'use client';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/themeStore';

export default function Header() {
    const { darkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header
            className={`sticky top-0 z-50 ${
              darkMode
                ? "bg-gray-900/90 border-gray-800"
                : "bg-white/80 border-gray-200"
            } backdrop-blur-lg border-b`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    Notepaper AI
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="#features"
                    className="hidden md:block hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="hidden md:block hover:text-blue-600 transition-colors"
                  >
                    Pricing
                  </a>
                  <a
                    href="#testimonials"
                    className="hidden md:block hover:text-blue-600 transition-colors"
                  >
                    Testimonials
                  </a>
                  <a
                    href="#roadmap"
                    className="hidden md:block hover:text-blue-600 transition-colors"
                  >
                    Roadmap
                  </a>
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-md ${
                      darkMode
                        ? "bg-gray-800 text-yellow-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </header>
    
  );
}
